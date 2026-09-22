import * as THREE from 'three';
import { PROJECTS as _PROJECTS } from './projects.js';
import { createSMBlock } from './SMBlock.js';

const _caseStudyModules = import.meta.glob('./case-studies/*.js');

// Fisher-Yates shuffle — new order every page load
const PROJECTS = _PROJECTS.slice();
for (let i = PROJECTS.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [PROJECTS[i], PROJECTS[j]] = [PROJECTS[j], PROJECTS[i]];
}
// Tag each project with its texture-array index (stable after shuffle)
PROJECTS.forEach((p, i) => { p._idx = i; });

/* ============================================================
   TUNABLES
============================================================ */

const BG_COLOR = 0xeae8e4;   // scene background, and fallback for card covers
const ITEM_W = 320;   // px — geometry/texture aspect only (16:10)
const ITEM_H = 225;
const RADIUS = 30;    // px — corner radius in screen pixels (constant across all sizes)
const FOV = 42;
const CONVEX = 0.00012;       // concave dish depth (subtle)

const CENTRE_FRAC = 0.4;        // centred item width as a fraction of the viewport
const GAP_C = 36;         // gap (px) held between adjacent items — shrinks outward with them
const SIZE_MIN = 0.12;       // smallest item scale, relative to the centre item
const SIZE_POW = 1.4;        // how fast items shrink toward the edge

const FLING = 11;         // momentum carried from a flick into the snap target
const SNAP_MIN = 0.34;       // s — shortest snap tween
const SNAP_MAX = 0.85;       // s — longest snap tween

// derived per-viewport layout (recomputed on resize)
const NMAX = 30;                // rings tabulated per axis
let PITCH_X, PITCH_Y, S0, HALF_DIAG, Xtab, Ytab;

// item scale at a given rendered distance from centre (1 at centre → SIZE_MIN at edge)
function falloff(d) {
  const t = THREE.MathUtils.clamp(d / HALF_DIAG, 0, 1);
  return SIZE_MIN + (1 - SIZE_MIN) * Math.pow(1 - t, SIZE_POW);
}

// build a 1-D remap table: ring n sits exactly GAP_C beyond ring n-1's edge,
// using each item's *shrunk* size → a constant gap, so nothing ever overlaps.
function buildTable(unit) {      // unit = centre width (X) or centre height (Y)
  const tab = [0];
  for (let n = 1; n < NMAX; n++) {
    const prev = tab[n - 1];
    const wPrev = unit * falloff(prev);
    let pos = prev + wPrev + GAP_C;                 // first guess
    for (let k = 0; k < 4; k++) {                    // settle (size depends on position)
      const wHere = unit * falloff(pos);
      pos = prev + 0.5 * wPrev + GAP_C + 0.5 * wHere;
    }
    tab[n] = pos;
  }
  return tab;
}

function computeLayout() {
  const cW = Math.max(320, CENTRE_FRAC * innerWidth);  // centred item rendered width (min 320px)
  document.documentElement.style.setProperty('--card-w', cW + 'px');
  const cH = cW * (ITEM_H / ITEM_W);
  PITCH_X = cW + GAP_C;                           // flat pitch (snapping granularity)
  PITCH_Y = cH + GAP_C;
  S0 = cW / ITEM_W;                          // mesh scale that yields the centre width
  HALF_DIAG = 0.5 * Math.hypot(innerWidth, innerHeight);
  Xtab = buildTable(cW);
  Ytab = buildTable(cH);
}
computeLayout();

// map a continuous flat coordinate → rendered coordinate via the size-aware table
function remap(f, pitch, tab) {
  const a = Math.abs(f) / pitch;                    // continuous ring index
  const i = Math.min(Math.floor(a), NMAX - 2);
  const v = tab[i] + (tab[i + 1] - tab[i]) * (a - i);
  return Math.sign(f) * v;
}

/* ============================================================
   PORTFOLIO DATA — edit content in projects.js
============================================================ */
const PALETTE = [
  ['#1b3a4b', '#3b6978'], ['#4a2545', '#a4508b'], ['#2d3142', '#bfc0c0'],
  ['#0b3d2e', '#1e8a5b'], ['#3a2618', '#c08552'], ['#1a1a2e', '#6c5ce7'],
  ['#37123c', '#71677c'], ['#102542', '#f87060'], ['#222a2f', '#d9b26a'],
  ['#1f2d3d', '#5bc0be'], ['#2b2118', '#b08968'], ['#0f1f2e', '#48a9a6'],
];

const N = PROJECTS.length;
let activeProjects = PROJECTS;
let activeN = N;

/* ============================================================
   COVER TEXTURE
   Photo (if loaded) or generated colour art, with card text overlaid.
============================================================ */
function makeCover(p, idx, w = 1024, img = null) {
  const c = document.createElement('canvas');
  c.width = w; c.height = Math.round(w * (ITEM_H / ITEM_W));
  const x = c.getContext('2d');
  const cw = c.width, ch = c.height;

  if (img) {
    // cover-fit the photo, then a top scrim so card text stays legible
    const ir = img.naturalWidth / img.naturalHeight, cr = cw / ch;
    let dw, dh;
    if (ir > cr) { dh = ch; dw = ch * ir; } else { dw = cw; dh = cw / ir; }
    x.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    const sg = x.createLinearGradient(0, 0, 0, ch * 0.58);
    sg.addColorStop(0, 'rgba(6,7,9,0)');
    sg.addColorStop(1, 'rgba(6,7,9,0)');
    x.fillStyle = sg; x.fillRect(0, 0, cw, ch);
  } else {
    const [a, b] = PALETTE[idx % PALETTE.length];
    const g = x.createLinearGradient(0, 0, cw, ch);
    g.addColorStop(0, a); g.addColorStop(1, b);
    x.fillStyle = g; x.fillRect(0, 0, cw, ch);
    let seed = idx * 9301 + 49297;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    x.globalAlpha = 0.12;
    for (let i = 0; i < 6; i++) {
      x.fillStyle = '#ffffff';
      x.beginPath();
      x.arc(rnd() * cw, rnd() * ch, 50 + rnd() * 190, 0, Math.PI * 2);
      x.fill();
    }
    x.globalAlpha = 1;
  }

  // Vertically + horizontally centred label: title → client
  const titleSize = w * 0.066, clientSize = w * (innerWidth <= 640 ? 0.0286 : 0.026), titleClientGap = w * 0.010;
  const totalH = titleSize + (p.client ? titleClientGap + clientSize : 0);
  let ty = ch / 2 - totalH / 2;
  x.textAlign = 'center'; x.textBaseline = 'top';
  x.fillStyle = '#fff';
  x.font = `800 ${titleSize}px "Open Sans", Helvetica, Arial`;
  x.fillText(p.title, cw / 2, ty);
  ty += titleSize + titleClientGap;
  if (p.client) {
    x.fillStyle = 'rgba(255,255,255,.6)';
    x.font = `500 ${clientSize}px "Open Sans", Helvetica, Arial`;
    x.letterSpacing = '1px';
    x.fillText(p.client.toUpperCase(), cw / 2, ty);
    x.letterSpacing = '0px';
  }

  if (p.casestudy) {
    const r = w * (innerWidth <= 640 ? 0.026 : 0.018);
    const pad = innerWidth <= 640 ? 3.4 : 2.4;
    const sx = cw - r * pad, sy = r * pad;
    x.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      const radius = i % 2 === 0 ? r : r * 0.42;
      x[i === 0 ? 'moveTo' : 'lineTo'](sx + Math.cos(a) * radius, sy + Math.sin(a) * radius);
    }
    x.closePath();
    x.fillStyle = 'rgba(255,255,255,.95)';
    x.fill();
  }

  return c;
}

function makeIntroTexture(w = 1024) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = Math.round(w * (ITEM_H / ITEM_W));
  const ctx = c.getContext('2d');
  const cw = c.width, ch = c.height;

  ctx.fillStyle = '#f5f3ef';
  ctx.fillRect(0, 0, cw, ch);

  const nameSize  = Math.round(cw * 0.088);
  const roleSize  = Math.round(cw * 0.030);
  const tagSize   = Math.round(cw * 0.030);
  const instrSize = Math.round(cw * 0.022);
  const gap       = cw * 0.018;
  const divGap    = gap * 1.4;
  const divLen    = cw * 0.10;

  // Measure tag lines first so we can vertically centre the whole block
  ctx.font = `400 ${tagSize}px "Open Sans", Helvetica, Arial`;
  //const tagText  = 'An archive of works spanning more than two decades.';
  const tagText  = 'A personal archive spanning more than two decades.';
  const tagMaxW  = cw * 0.52;
  const tagWords = tagText.split(' ');
  const tagLines = [];
  let tagLine = '';
  for (const word of tagWords) {
    const test = tagLine ? tagLine + ' ' + word : word;
    if (ctx.measureText(test).width > tagMaxW && tagLine) { tagLines.push(tagLine); tagLine = word; }
    else { tagLine = test; }
  }
  if (tagLine) tagLines.push(tagLine);

  const tagBlockH = tagLines.length * tagSize * 1.45;
  const totalH = nameSize + gap * 0.5 + roleSize
    + divGap + 1 + divGap
    + tagBlockH
    + divGap + 1 + divGap
    + instrSize;

  let y = (ch - totalH) / 2;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  ctx.fillStyle = '#1a1a1a';
  ctx.font = `700 ${nameSize}px "Open Sans", Helvetica, Arial`;
  ctx.fillText('Steve Mackey', cw / 2, y);
  y += nameSize + gap * 0.5;

  ctx.fillStyle = 'rgba(0,0,0,0.40)';
  ctx.font = `500 ${roleSize}px "Open Sans", Helvetica, Arial`;
  ctx.letterSpacing = '1.5px';
  ctx.fillText('EXPERIENCE DESIGNER & TECHNOLOGIST', cw / 2, y);
  ctx.letterSpacing = '0px';
  y += roleSize + divGap;

  ctx.strokeStyle = 'rgba(0,0,0,0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cw / 2 - divLen / 2, y); ctx.lineTo(cw / 2 + divLen / 2, y); ctx.stroke();
  y += 1 + divGap;

  ctx.fillStyle = 'rgba(0,0,0,0.50)';
  ctx.font = `400 ${tagSize}px "Open Sans", Helvetica, Arial`;
  tagLines.forEach((ln, i) => ctx.fillText(ln, cw / 2, y + i * tagSize * 1.45));
  y += tagBlockH + divGap;

  ctx.strokeStyle = 'rgba(0,0,0,0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cw / 2 - divLen / 2, y); ctx.lineTo(cw / 2 + divLen / 2, y); ctx.stroke();
  y += 1 + divGap;

  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.font = `400 ${instrSize}px "Open Sans", Helvetica, Arial`;
  ctx.fillText('Scroll in any direction to explore', cw / 2, y);

  return c;
}

/* ============================================================
   THREE.JS SCENE — orthographic-feel perspective so 1 unit ≈ 1px
============================================================ */
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(BG_COLOR);

const camera = new THREE.PerspectiveCamera(FOV, innerWidth / innerHeight, 1, 6000);
// Distance chosen so at z=0 the visible height == innerHeight px  →  1 world unit ≈ 1px.
function camDistance() { return (innerHeight / 2) / Math.tan(THREE.MathUtils.degToRad(FOV) / 2); }
camera.position.set(0, 0, camDistance());
camera.lookAt(0, 0, 0);

/* ---------- contour / topographic line background ---------- */
function makeContourLines() {
  const mat = new THREE.LineBasicMaterial({
    color: 0x1b1c20,
    transparent: true,
    opacity: 0.09,
    depthWrite: false,
    depthTest: false,
  });

  const grp = new THREE.Group();

  const EXTENT  = 4000; // half-width in world units
  const SPACING = 440;  // world units between lines
  const N_PTS   = 400;  // vertices per line — enough to follow dish curvature smoothly

  const hH = [
    { amp: 70, freq: 1, phase: 0.00 },
    { amp: 35, freq: 2, phase: 1.30 },
    { amp: 17, freq: 3, phase: 2.60 },
    { amp:  9, freq: 5, phase: 0.85 },
    { amp:  5, freq: 7, phase: 1.75 },
  ];
  const vH = [
    { amp: 70, freq: 1, phase: 0.60 },
    { amp: 35, freq: 2, phase: 1.90 },
    { amp: 17, freq: 3, phase: 3.20 },
    { amp:  9, freq: 5, phase: 1.45 },
    { amp:  5, freq: 7, phase: 2.35 },
  ];

  const n = Math.ceil(EXTENT / SPACING) * 2 + 1;

  function addLine(verts) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    const ln = new THREE.Line(geo, mat);
    ln.renderOrder = -1;
    grp.add(ln);
  }

  // Horizontal contours
  for (let i = 0; i < n; i++) {
    const y0 = (i - Math.floor(n / 2)) * SPACING;
    const scale = 0.72 + 0.28 * Math.sin(i * 2.399);
    const verts = [];
    for (let j = 0; j <= N_PTS; j++) {
      const x = -EXTENT + (j / N_PTS) * EXTENT * 2;
      const t = (j / N_PTS) * Math.PI * 2;
      const dy = hH.reduce((s, h) => s + h.amp * scale * Math.sin(h.freq * t + h.phase), 0);
      const y = y0 + dy;
      const z = CONVEX * (x * x + y * y) - 1;
      verts.push(x, y, z);
    }
    addLine(verts);
  }

  // Vertical contours
  for (let i = 0; i < n; i++) {
    const x0 = (i - Math.floor(n / 2)) * SPACING;
    const scale = 0.72 + 0.28 * Math.sin(i * 2.399 + 1.1);
    const verts = [];
    for (let j = 0; j <= N_PTS; j++) {
      const y = -EXTENT + (j / N_PTS) * EXTENT * 2;
      const t = (j / N_PTS) * Math.PI * 2;
      const dx = vH.reduce((s, h) => s + h.amp * scale * Math.sin(h.freq * t + h.phase), 0);
      const x = x0 + dx;
      const z = CONVEX * (x * x + y * y) - 1;
      verts.push(x, y, z);
    }
    addLine(verts);
  }

  return grp;
}

const contourGroup = makeContourLines();
scene.add(contourGroup);

/* ---------- textures (start as generated art, photos swap in on load) ---------- */
const textures = PROJECTS.map((p, i) => {
  const t = new THREE.CanvasTexture(makeCover(p, i));
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
});

PROJECTS.forEach((p, i) => {
  const img = new Image();
  img.onload = () => {
    textures[i].image = makeCover(p, i, 1024, img);
    textures[i].needsUpdate = true;
  };
  img.onerror = () => console.warn('Card image not found, using generated art:', p.src);
  img.src = p.src;
});

const introTexture = new THREE.CanvasTexture(makeIntroTexture());
introTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
document.fonts.ready.then(() => {
  introTexture.image = makeIntroTexture();
  introTexture.needsUpdate = true;
});

/* ---------- rounded-rect shader material ---------- */
const VERT = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D map;
uniform vec2  uSize;
uniform float uRadius;
uniform float uHover;
uniform float uFade;
float sdRoundRect(vec2 p, vec2 b, float r){
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}
void main(){
  vec2 p = (vUv - 0.5) * uSize;
  float d = sdRoundRect(p, uSize * 0.5, uRadius);
  float aa = fwidth(d) + 0.0001;
  float alpha = 1.0 - smoothstep(-aa, aa, d);
  if (alpha <= 0.001) discard;
  vec3 col = texture2D(map, vUv).rgb;
  gl_FragColor = vec4(col, alpha * uFade);
}`;

function makeMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      map:     { value: textures[0] },
      uSize:   { value: new THREE.Vector2(ITEM_W, ITEM_H) },
      uRadius: { value: RADIUS },
      uHover:  { value: 0 },
      uFade:   { value: 1 },
    },
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
  });
}

/* ---------- pool of recycled item meshes ---------- */
const group = new THREE.Group();
scene.add(group);
const unit = new THREE.PlaneGeometry(1, 1);

let cols, rows, halfCols, halfRows, pool = [];
function buildPool() {
  pool.forEach(m => { group.remove(m); m.material.dispose(); });
  pool = [];
  cols = Math.ceil(innerWidth / PITCH_X) + 10;  // buffer: outer rings compress inward
  rows = Math.ceil(innerHeight / PITCH_Y) + 10;
  halfCols = Math.floor(cols / 2);
  halfRows = Math.floor(rows / 2);
  for (let ly = 0; ly < rows; ly++) {
    for (let lx = 0; lx < cols; lx++) {
      const m = new THREE.Mesh(unit, makeMaterial());
      m.userData = { lx, ly, key: null, hover: 0 };
      group.add(m);
      pool.push(m);
    }
  }
}
buildPool();

const pmod = (a, n) => ((a % n) + n) % n;
const projIndex = (cx, cy) => pmod(cx * 31 + cy * 131, activeN);

/* ============================================================
   INTERACTION — drag / wheel / arrow keys, inertia, snap
============================================================ */
// scroll = grid translation in px (screen space, +x right, +y up)
const scroll = { x: 0, y: 0 };
const vel = { x: 0, y: 0 };
const drag = { active: false, lastX: 0, lastY: 0, moved: 0 };

const nearestMultiple = (v, pitch) => Math.round(v / pitch) * pitch;

// Single ease-in-out tween for every settle (snap / arrows / click).
// Smootherstep: gentle in and out with no overshoot.
const tween = { active: false, x0: 0, y0: 0, x1: 0, y1: 0, t: 0, dur: 0.5 };
function startTween(tx, ty) {
  tween.x0 = scroll.x; tween.y0 = scroll.y;
  tween.x1 = tx; tween.y1 = ty;
  const dist = Math.hypot(tx - scroll.x, ty - scroll.y);
  tween.dur = THREE.MathUtils.clamp(SNAP_MIN + dist / 3500, SNAP_MIN, SNAP_MAX);
  tween.t = 0; tween.active = true;
}
function snapNearest(useVel) {
  const px = scroll.x + (useVel ? vel.x * FLING : 0);
  const py = scroll.y + (useVel ? vel.y * FLING : 0);
  startTween(nearestMultiple(px, PITCH_X), nearestMultiple(py, PITCH_Y));
}

function pt(e) { const t = e.touches ? e.touches[0] : e; return { x: t.clientX, y: t.clientY }; }

function onDown(e) {
  if (zoomed) return;
  drag.active = true; drag.moved = 0; tween.active = false;
  vel.x = vel.y = 0;
  const p = pt(e); drag.lastX = p.x; drag.lastY = p.y;
  document.body.classList.add('dragging');
}
function onMove(e) {
  if (!drag.active) return;
  const p = pt(e);
  const dx = p.x - drag.lastX, dy = p.y - drag.lastY;
  drag.lastX = p.x; drag.lastY = p.y;
  drag.moved += Math.abs(dx) + Math.abs(dy);
  scroll.x += dx;
  scroll.y -= dy;          // screen-down → grid-down (world -y)
  vel.x = dx; vel.y = -dy;
}
function onUp() {
  if (!drag.active) return;
  drag.active = false;
  document.body.classList.remove('dragging');
  snapNearest(true);       // carry flick momentum into the snap target
}

canvas.addEventListener('mousedown', onDown);
addEventListener('mousemove', onMove);
addEventListener('mouseup', onUp);
canvas.addEventListener('touchstart', onDown, { passive: true });
addEventListener('touchmove', onMove, { passive: false });
addEventListener('touchend', onUp);

let wheelTimer = null;
let wheeling = false;
addEventListener('wheel', (e) => {
  if (zoomed || menuOpen) return;
  e.preventDefault();
  tween.active = false;
  wheeling = true;
  cta.classList.remove('show'); ctaShown = false;
  scroll.x -= e.deltaX;
  scroll.y += e.deltaY;    // wheel-down pans content up
  vel.x = vel.y = 0;
  clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => { wheeling = false; snapNearest(false); }, 90);
}, { passive: false });

/* ---------- raycast hover / click ---------- */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(-2, -2);
let hovered = null;
addEventListener('mousemove', (e) => {
  if (innerWidth <= 640) return;
  const p = pt(e);
  mouse.x = (p.x / innerWidth) * 2 - 1;
  mouse.y = -(p.y / innerHeight) * 2 + 1;
});
canvas.addEventListener('click', (e) => {
  if (zoomed || drag.moved > 6) return;
  if (innerWidth <= 640) {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / innerHeight) * 2 + 1;
  }
  raycaster.setFromCamera(mouse, camera);
  const hit = raycaster.intersectObjects(pool, false)[0];
  if (!hit) return;
  const c = hit.object.userData.cell;
  const ccx = Math.round(-scroll.x / PITCH_X);
  const ccy = Math.round(-scroll.y / PITCH_Y);
  if (c.x === ccx && c.y === ccy && centreProject) openZoom(centreProject);   // centre card → zoom
  else startTween(-c.x * PITCH_X, -c.y * PITCH_Y);           // otherwise snap to centre
});

addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { if (zoomed) zoomClose.click(); else closeMenu(); return; }
  if (zoomed) return;
  if (e.key === 'Enter' && centreProject) { openZoom(centreProject); return; }
  const ccx = Math.round(-scroll.x / PITCH_X);
  const ccy = Math.round(-scroll.y / PITCH_Y);
  let nx = ccx, ny = ccy;
  if (e.key === 'ArrowRight') nx = ccx + 1;
  else if (e.key === 'ArrowLeft') nx = ccx - 1;
  else if (e.key === 'ArrowUp') ny = ccy + 1;
  else if (e.key === 'ArrowDown') ny = ccy - 1;
  else return;
  e.preventDefault();
  startTween(-nx * PITCH_X, -ny * PITCH_Y);
});

/* ============================================================
   CTA + ZOOM
   "See Case Study" button over the centre card; click expands
   that card to fill the viewport minus the GAP_C margin.
============================================================ */
const cta = document.getElementById('cta');
const ctaBtn = document.getElementById('ctaBtn');
const zoom = document.getElementById('zoom');
const zoomMeta = document.getElementById('zoomMeta');
const zoomCat = document.getElementById('zoomCat');
const zoomTitle = document.getElementById('zoomTitle');
const zoomClient = document.getElementById('zoomClient');
const zoomClose = document.getElementById('zoomClose');
const zoomScroll = document.getElementById('zoomScroll');
const zoomContent = document.getElementById('zoomContent');
const zoomHero   = document.getElementById('zoomHero');
const zoomHeroBg = document.getElementById('zoomHeroBg');

function blockStyle(b, extra = {}) {
  const props = {};
  if (b.span)   props['--span']    = b.span;
  if (b.spanMd) props['--span-md'] = b.spanMd;
  if (b.spanSm) props['--span-sm'] = b.spanSm;
  if (b.aspect) props['--aspect']  = b.aspect;
  Object.assign(props, extra);
  const s = Object.entries(props).map(([k, v]) => `${k}:${v}`).join(';');
  return s ? ` style="${s}"` : '';
}

function renderBlock(b) {
  const span = blockStyle(b);
  if (b.type === 'container') {
    return `<div class="cs-container"${span}>${(b.children || []).map(renderBlock).join('')}</div>`;
  }
  if (b.type === 'text') {
    const mod = b.variant === 'callout' ? ' cs-block--callout' : b.variant === 'intro' ? ' cs-block--intro' : '';
    const bodyHtml = /^\s*</.test(b.body) ? b.body : `<p>${b.body}</p>`;
    const btnHtml = (b.variant === 'intro' && b.url)
      ? `<a class="cs-project-link" href="${b.url}" target="_blank" rel="noopener noreferrer">View the work</a>`
      : '';
    return `<div class="cs-block${mod}"${span}>${b.heading ? `<h3>${b.heading}</h3>` : ''}${bodyHtml}${btnHtml}</div>`;
  }
  if (b.type === 'image') {
    return `<figure class="cs-block cs-block--image"${span}><img src="${b.src}" alt="${b.alt || ''}" loading="lazy"></figure>`;
  }
  if (b.type === 'video') {
    const attrs = b.autoplay ? 'autoplay muted loop playsinline' : 'controls playsinline';
    const mod = b.autoplay ? ' cs-block--video-autoplay' : '';
    return `<figure class="cs-block cs-block--video${mod}"${span}><video src="${b.src}" ${attrs}></video></figure>`;
  }
  if (b.type === 'vimeo') {
    let vimeoSrc = b.src;
    const sep = vimeoSrc.includes('?') ? '&' : '?';
    if (b.autoplay) {
      vimeoSrc += `${sep}autoplay=1&loop=1&muted=1&background=1`;
    } else {
      vimeoSrc += `${sep}title=0&byline=0&portrait=0&play_button_position=center`;
    }
    return `<figure class="cs-block cs-block--vimeo"${span}><iframe src="${vimeoSrc}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe></figure>`;
  }
  if (b.type === 'spacer') {
    const h = typeof b.height === 'number' ? `${b.height}px` : (b.height || '40px');
    return `<div class="cs-block cs-block--spacer"${blockStyle(b, { height: h })}></div>`;
  }
  return '';
}

async function loadCaseStudyHtml(p) {
  const loader = _caseStudyModules[`./case-studies/${p.slug}.js`];
  if (loader) {
    const { blocks } = await loader();
    const lead = blocks.find(b => b.type === 'text' && b.variant === 'lead');
    const rest = blocks.filter(b => !(b.type === 'text' && b.variant === 'lead'));
    const leadHtml = lead ? `<p class="cs-lead">${lead.body}</p>` : '';
    const bodyHtml = rest.map(renderBlock).join('');
    return leadHtml + `<div class="cs-body">${bodyHtml}</div>`;
  }
  return '<p class="cs-lead">Case study content coming soon.</p>';
}

let centreProject = PROJECTS[0];
let centrePxW = CENTRE_FRAC * innerWidth;   // actual screen px width of centre card (updated per frame)
let centrePxH = centrePxW * (ITEM_H / ITEM_W);
let zoomed = false;          // true while open OR animating (blocks grid interaction)
let ctaShown = false;
let zoomSlug = null;         // slug of currently open project (guards async content loads)

// rAF-driven zoom: p = 0 (matches the centre card) → 1 (full inset)
const zoomAnim = { active: false, p: 0, dir: 1, dur: 0.55 };
let zoomCard = { tx: 0, ty: 0, sx: 1, sy: 1 };

// Place the button at the bottom-centre of the centre card
function positionCTA() {
  const cW = Math.max(ITEM_W, CENTRE_FRAC * innerWidth);
  const cH = cW * (ITEM_H / ITEM_W);
  const cardBottom = (innerHeight + cH) / 2;
  cta.style.top = (innerHeight > innerWidth ? cardBottom - 42 : cardBottom - 50) + 'px';
}

// Store card start + full-viewport end geometry for the FLIP animation
function applyZoomGeometry() {
  const cW = centrePxW, cH = centrePxH;
  const mobile = innerWidth <= 640;
  const zm = mobile ? 16 : GAP_C;
  zoomCard = {
    l0: (innerWidth  - cW) / 2,  t0: (innerHeight - cH) / 2,  w0: cW,  h0: cH,
    l1: zm,                      t1: zm,
    w1: innerWidth  - 2 * zm,    h1: innerHeight - 2 * zm,
  };
  zoomHero.style.height = mobile ? cH + 'px' : '';
}

function setZoomTransform(p) {
  const e = p * p * p * (p * (p * 6 - 15) + 10);            // smootherstep
  const c = zoomCard;
  zoom.style.left   = (c.l0 + (c.l1 - c.l0) * e) + 'px';
  zoom.style.top    = (c.t0 + (c.t1 - c.t0) * e) + 'px';
  zoom.style.width  = (c.w0 + (c.w1 - c.w0) * e) + 'px';
  zoom.style.height = (c.h0 + (c.h1 - c.h0) * e) + 'px';
  zoom.style.transform = '';
}

let scrollToken = 0;

function smoothScrollTo(el, target, ms) {
  const token = ++scrollToken;
  const start = el.scrollTop, dist = target - start, t0 = performance.now();
  (function step(now) {
    if (scrollToken !== token) return;
    const p = Math.min((now - t0) / ms, 1);
    const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    el.scrollTop = start + dist * e;
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}

zoomScroll.addEventListener('wheel',     () => { scrollToken++; }, { passive: true });
zoomScroll.addEventListener('touchmove', () => { scrollToken++; }, { passive: true });
zoomScroll.addEventListener('scroll', () => {
  const progress = Math.min(zoomScroll.scrollTop / zoomScroll.clientHeight, 1);
  zoomHeroBg.style.transform = `scale(${1 + progress * 0.12})`;
}, { passive: true });

function openZoom(p, skipHistory = false) {
  if (zoomed || !p) return;
  zoomed = true;
  document.body.classList.remove('hovering');
  zoomHeroBg.style.backgroundImage = `url("${p.src}")`;
  zoomHeroBg.style.transform = 'scale(1)';
  zoomHeroBg.classList.remove('fading');
  zoom.classList.remove('fading');
  zoom.style.backgroundColor = p.accentColourPrimary;
  zoomContent.style.backgroundColor = p.accentColourPrimary;
  zoomContent.style.transform = 'translateY(0)';
  zoomCat.textContent = p.cat || '';
  zoomTitle.textContent = p.title;
  zoomClient.textContent = p.client || '';
  zoomSlug = p.slug;
  zoomContent.innerHTML = '';
  
  document.documentElement.style.setProperty('--text-colour', p.textColour === 'light' ? 'var(--text-light)' : 'var(--text-dark)');
  
  loadCaseStudyHtml(p).then(html => {
    if (zoomSlug === p.slug) { zoomContent.innerHTML = html; observeBlocks(); }
  });
  zoomContent.classList.remove('visible');
  zoomContent.style.transform = 'translateY(0)';
  zoomScroll.scrollTop = 0;
  zoomMeta.style.transition = 'none';
  zoomMeta.style.opacity = '0';
  zoomMeta.style.transform = 'translateY(0)';
  applyZoomGeometry();
  zoomAnim.p = 0; setZoomTransform(0);
  zoomClose.style.opacity = '0';
  zoom.style.opacity = '1';
  zoom.classList.add('open');
  zoomAnim.dir = 1; zoomAnim.active = true;
  if (!skipHistory) history.pushState({ slug: p.slug }, '', '#' + p.slug);
}

let csObserver = null;
function observeBlocks() {
  if (csObserver) csObserver.disconnect();
  const els = zoomContent.querySelectorAll('.cs-block, .cs-container');
  if (!els.length) return;
  csObserver = new IntersectionObserver((entries) => {
    entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      .forEach((entry, i) => {
        entry.target.style.transitionDelay = `${i * 60}ms`;
        entry.target.classList.add('cs-visible');
        csObserver.unobserve(entry.target);
      });
  }, { root: zoomScroll, threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  els.forEach(el => csObserver.observe(el));
}

function closeZoom(skipHistory = false) {
  if (!zoomed || zoomAnim.dir < 0) return;
  if (csObserver) { csObserver.disconnect(); csObserver = null; }
  if (!skipHistory) history.pushState(null, '', location.pathname + location.search);
  // Freeze parallax immediately so the card sits exactly where the panel will land
  prlxX = 0; prlxY = 0;
  zoomHeroBg.classList.add('fading');
  zoom.classList.add('fading');
  zoomClose.style.transition = 'none';
  zoomClose.style.opacity = '0';
  requestAnimationFrame(() => { zoomClose.style.transition = ''; });
  zoomContent.classList.remove('visible');
  zoomMeta.style.transition = 'none';
  zoomMeta.style.opacity = '0';
  zoomMeta.style.transform = 'translateY(0)';
  zoomHeroBg.style.transform = 'scale(1)';
  const mobile = innerWidth <= 640;
  if (mobile) {
    zoomScroll.scrollTop = 0;
  } else {
    smoothScrollTo(zoomScroll, 0, 400);
  }
  // Close target is the default (non-hovered) card size — same min-width guard as the render loop
  const cW = Math.max(ITEM_W, CENTRE_FRAC * innerWidth), cH = cW * (ITEM_H / ITEM_W);
  zoomCard.l0 = (innerWidth - cW) / 2;
  zoomCard.t0 = (innerHeight - cH) / 2;
  zoomCard.w0 = cW; zoomCard.h0 = cH;
  zoomHero.style.height = mobile ? cH + 'px' : '';
  zoomAnim.dir = -1; zoomAnim.active = true;
}

ctaBtn.addEventListener('click', () => openZoom(centreProject));
zoomClose.addEventListener('click', () => closeZoom());
positionCTA();

// Burger menu toggle
const nav = document.getElementById('nav');
const navMenu = document.getElementById('navMenu');
let menuOpen = false;

function openMenu() {
  menuOpen = true;
  nav.classList.add('open');
  navMenu.setAttribute('aria-hidden', 'false');
  navBurger.setAttribute('aria-label', 'Close menu');
}

function closeMenu() {
  menuOpen = false;
  nav.classList.remove('open');
  navMenu.setAttribute('aria-hidden', 'true');
  navBurger.setAttribute('aria-label', 'Open menu');
}

navBurger.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());

document.querySelectorAll('a.js-email').forEach(a => {
  a.href = `mailto:${a.dataset.u}@${a.dataset.d}`;
});

// Brand cube — Three.js SM monogram, spins only on hover
const brandCanvas = document.getElementById('brandCanvas');
const brandRenderer = new THREE.WebGLRenderer({ canvas: brandCanvas, antialias: true, alpha: true });
brandRenderer.setPixelRatio(Math.min(devicePixelRatio, 2));
brandRenderer.setSize(30, 30);

const brandScene = new THREE.Scene();
const brandCamera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
brandCamera.position.set(0, 0, 2.2);
brandScene.add(new THREE.AmbientLight(0xffffff, 1.4));
const brandLight = new THREE.DirectionalLight(0xffffff, 1.2);
brandLight.position.set(2, 3, 3);
brandScene.add(brandLight);

const brandCube = createSMBlock({ size: 1 });
brandCube.rotation.y = -Math.PI / 4;  // S+M corner facing forward at rest
brandScene.add(brandCube);
brandRenderer.render(brandScene, brandCamera);  // draw static frame immediately

let brandRaf = null, brandReturnRaf = null, brandYRaf = null, brandTargetY = 0, brandTargetX = 0;

function brandDrift() {
  const dy = brandTargetY - brandCube.position.y;
  const dx = brandTargetX - brandCube.position.x;
  brandCube.position.y += dy * 0.06;
  brandCube.position.x += dx * 0.06;
  if (!brandRaf && !brandReturnRaf) brandRenderer.render(brandScene, brandCamera);
  brandYRaf = (Math.abs(dy) > 0.0002 || Math.abs(dx) > 0.0002) ? requestAnimationFrame(brandDrift) : null;
}

addEventListener('mousemove', e => {
  brandTargetY = (0.5 - e.clientY / innerHeight) * 0.14;
  brandTargetX = (e.clientX / innerWidth - 0.5) * 0.14;
  if (!brandRaf && !brandReturnRaf && !brandYRaf) brandDrift();
});

function brandSpin() {
  brandRaf = requestAnimationFrame(brandSpin);
  brandCube.rotation.y -= 0.015 * (1 + 0.70 * Math.cos(4 * brandCube.rotation.y));
  brandCube.position.y += (brandTargetY - brandCube.position.y) * 0.06;
  brandCube.position.x += (brandTargetX - brandCube.position.x) * 0.06;
  brandRenderer.render(brandScene, brandCamera);
}

function brandReturn() {
  // S-left M-right orientation repeats every π — find the nearest one
  const n = Math.round((brandCube.rotation.y + Math.PI / 4) / Math.PI);
  const target = -Math.PI / 4 + n * Math.PI;
  const from = brandCube.rotation.y;
  const dist = target - from;
  let t = 0;
  (function step() {
    t = Math.min(t + 0.055, 1);
    brandCube.rotation.y = from + dist * (1 - Math.pow(1 - t, 3));
    brandCube.position.y += (brandTargetY - brandCube.position.y) * 0.06;
    brandCube.position.x += (brandTargetX - brandCube.position.x) * 0.06;
    brandRenderer.render(brandScene, brandCamera);
    brandReturnRaf = t < 1 ? requestAnimationFrame(step) : null;
  })();
}

brandCanvas.addEventListener('mouseenter', () => {
  if (brandReturnRaf) { cancelAnimationFrame(brandReturnRaf); brandReturnRaf = null; }
  if (!brandRaf) brandSpin();
});
brandCanvas.addEventListener('mouseleave', () => {
  if (brandRaf) { cancelAnimationFrame(brandRaf); brandRaf = null; }
  brandReturn();
});
brandCanvas.addEventListener('click', () => {
  if (zoomed) closeZoom();
  if (menuOpen) closeMenu();
  activateFilter('all');
  startTween(0, 0);
  history.pushState(null, '', location.pathname);
});

// Project filter
const filterBtns = document.querySelectorAll('.filter-btn');
let filterCaseStudies = false;
function setFilter(caseStudiesOnly) {
  filterCaseStudies = caseStudiesOnly;
  activeProjects = caseStudiesOnly ? PROJECTS.filter(p => p.casestudy) : PROJECTS;
  activeN = activeProjects.length;
  pool.forEach(m => { m.userData.key = null; });
  lastCenterKey = null;
  snapNearest(false);
  const s = document.getElementById('scene');
  s.classList.remove('ready');
  requestAnimationFrame(() => s.classList.add('ready'));
}
function activateFilter(filter) {
  filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
  setFilter(filter === 'casestudies');
}
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const filter = btn.dataset.filter;
    activateFilter(filter);
    const url = filter === 'casestudies' ? location.pathname + '?casestudies' : location.pathname;
    history.pushState({ filter }, '', url);
    if (menuOpen) closeMenu();
  });
});

// Intercept any in-content filter links (e.g. about bio)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href*="casestudies"]:not(.filter-btn)');
  if (!a) return;
  e.preventDefault();
  activateFilter('casestudies');
  history.pushState({ filter: 'casestudies' }, '', location.pathname + '?casestudies');
  if (menuOpen) closeMenu();
});

// Back/forward navigation
addEventListener('popstate', () => {
  const slug = location.hash.slice(1);
  if (slug) {
    const p = PROJECTS.find(proj => proj.slug === slug);
    if (p && !zoomed) openZoom(p, true);
  } else {
    if (zoomed) closeZoom(true);
  }
  activateFilter(location.search.includes('casestudies') ? 'casestudies' : 'all');
});

/* ============================================================
   RENDER LOOP
============================================================ */
const nowEl = document.getElementById('now');
const nowTitle = document.getElementById('nowTitle');
const nowMeta = document.getElementById('nowMeta');
let lastCenterKey = null;
let lastT = performance.now();
let prlxX = 0, prlxY = 0;   // smoothed mouse parallax (-1..1)

// Sync filter from URL on load (must be after lastCenterKey is declared)
if (location.search.includes('casestudies')) activateFilter('casestudies');

function animate() {
  requestAnimationFrame(animate);

  const nowT = performance.now();
  let dt = (nowT - lastT) / 1000; lastT = nowT;
  dt = Math.min(dt, 0.05);

  // Advance the zoom open/close animation
  if (zoomAnim.active) {
    zoomAnim.p = THREE.MathUtils.clamp(zoomAnim.p + (dt / zoomAnim.dur) * zoomAnim.dir, 0, 1);
    setZoomTransform(zoomAnim.p);
    if (zoomAnim.dir > 0 && zoomAnim.p >= 1) {
      zoomAnim.active = false;
      zoomContent.classList.add('visible');
      zoomContent.style.transform = 'translateY(-30px)';
      zoomMeta.style.transition = '';
      zoomMeta.style.opacity = '1';
      zoomMeta.style.transform = 'translateY(-30px)';
      zoomClose.style.opacity = '1';
      if (innerWidth > 640) setTimeout(() => smoothScrollTo(zoomScroll, zoomScroll.clientHeight / 2, 2000), 1000);
    }
    if (zoomAnim.dir < 0 && zoomAnim.p <= 0) {
      zoomAnim.active = false;
      zoom.classList.remove('open');
      zoom.style.opacity = '';
      zoomed = false;
    }
  }

  // Advance the ease-in-out snap tween
  if (!drag.active && tween.active) {
    tween.t += dt / tween.dur;
    const p = Math.min(tween.t, 1);
    const e = p * p * p * (p * (p * 6 - 15) + 10);   // smootherstep
    scroll.x = tween.x0 + (tween.x1 - tween.x0) * e;
    scroll.y = tween.y0 + (tween.y1 - tween.y0) * e;
    if (p >= 1) { scroll.x = tween.x1; scroll.y = tween.y1; tween.active = false; }
  }

  // Which cell currently sits at screen centre
  const ccx = Math.round(-scroll.x / PITCH_X);
  const ccy = Math.round(-scroll.y / PITCH_Y);

  raycaster.setFromCamera(mouse, camera);
  const hit = (!drag.active && !zoomed) ? raycaster.intersectObjects(pool, false)[0] : null;
  const hitObj = hit ? hit.object : null;
  if (hitObj !== hovered) {
    hovered = hitObj;
    document.body.classList.toggle('hovering', !!hitObj);
  }

  // Position + warp every pooled item
  for (const m of pool) {
    const cellX = ccx + m.userData.lx - halfCols;
    const cellY = ccy + m.userData.ly - halfRows;
    // Flat (un-warped) position — used for snapping & cell identity
    const fx = cellX * PITCH_X + scroll.x;
    const fy = cellY * PITCH_Y + scroll.y;

    // Size-aware spacing: each axis is remapped so neighbours sit exactly
    // GAP_C apart edge-to-edge. Spacing tightens outward as items shrink.
    const x = remap(fx, PITCH_X, Xtab);
    const y = remap(fy, PITCH_Y, Ytab);

    // Slight concave dish: centre furthest from camera, edges curve toward you
    const z = CONVEX * (x * x + y * y);
    const fall = falloff(Math.hypot(x, y));
    const pShift = 10 + (1 - fall) * 20;   // 10 at centre → 30 at edge
    m.position.set(x + prlxX * -pShift, y + prlxY * -pShift, z);
    m.rotation.y = -Math.atan(2 * CONVEX * x);
    m.rotation.x = Math.atan(2 * CONVEX * y);

    // Hover lift — disabled while zoom panel is open or closing
    const target = (!zoomed && m === hovered) ? 1 : 0;
    m.userData.hover += (target - m.userData.hover) * 0.18;
    const s = S0 * fall * (1 + m.userData.hover * 0.05);
    m.scale.set(ITEM_W * s, ITEM_H * s, 1);
    if (cellX === ccx && cellY === ccy) { centrePxW = ITEM_W * s; centrePxH = ITEM_H * s; }
    m.material.uniforms.uRadius.value = RADIUS / S0;
    m.material.uniforms.uHover.value = m.userData.hover;
    m.material.uniforms.uFade.value = 0.55 + 0.45 * fall;

    // Assign the right project only when this slot's cell changes
    const key = cellX + ',' + cellY;
    if (m.userData.key !== key) {
      m.userData.key = key;
      m.userData.cell = { x: cellX, y: cellY };
      m.material.uniforms.map.value = (cellX === 0 && cellY === 0 && !filterCaseStudies)
        ? introTexture
        : textures[activeProjects[projIndex(cellX, cellY)]._idx];
    }
  }

  // Bottom HUD reflects the centred project
  const centerKey = ccx + ',' + ccy;
  if (centerKey !== lastCenterKey) {
    lastCenterKey = centerKey;
    if (ccx === 0 && ccy === 0 && !filterCaseStudies) {
      centreProject = null;
      nowTitle.textContent = '';
      nowMeta.textContent = 'Scroll in any direction to explore';
    } else {
      centreProject = activeProjects[projIndex(ccx, ccy)];
      nowTitle.textContent = centreProject.title;
      nowMeta.textContent = centreProject.cat;
      ctaBtn.textContent = centreProject.casestudy ? 'View Case Study' : 'View Project';
    }
  }

  // Show the CTA button only when settled on a non-intro centre card
  const settled = !drag.active && !tween.active && !zoomed && !wheeling && (ccx !== 0 || ccy !== 0);
  if (settled !== ctaShown) { ctaShown = settled; cta.classList.toggle('show', settled); }

  // Smooth mouse toward current position (~3% per frame); frozen at 0 while zoom panel is active or on mobile
  if (!zoomed && innerWidth > 640) {
    prlxX += (mouse.x - prlxX) * 0.03;
    prlxY += (mouse.y - prlxY) * 0.03;
  }

  // Cards shift gently with mouse; contour lines shift more (feel further away)
  contourGroup.position.x = scroll.x * 0.06 + prlxX * -28;
  contourGroup.position.y = scroll.y * 0.06 + prlxY * -28;

  renderer.render(scene, camera);
}

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.position.z = camDistance();
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  computeLayout();
  buildPool();
  positionCTA();
  snapNearest(false);
  lastCenterKey = null;
  if (zoomed) { applyZoomGeometry(); setZoomTransform(zoomAnim.p); }  // refit to new viewport
});

animate();
setTimeout(() => {
  document.getElementById('loader').classList.add('hidden');
  requestAnimationFrame(() => canvas.classList.add('ready'));
}, 300);

// Deep-link: snap the grid and open the zoom for a project referenced in the URL hash
const initSlug = location.hash.slice(1);
if (initSlug) {
  const initProject = PROJECTS.find(p => p.slug === initSlug);
  if (initProject) {
    const idx = activeProjects.indexOf(initProject);
    let bestCell = { cx: 0, cy: 0 }, bestDist = Infinity;
    for (let cy = -6; cy <= 6; cy++) {
      for (let cx = -6; cx <= 6; cx++) {
        if (projIndex(cx, cy) === idx) {
          const d = Math.hypot(cx, cy);
          if (d < bestDist) { bestDist = d; bestCell = { cx, cy }; }
        }
      }
    }
    scroll.x = -bestCell.cx * PITCH_X;
    scroll.y = -bestCell.cy * PITCH_Y;
    // Wait two frames so the render loop sets centrePxW/centrePxH before openZoom reads them
    requestAnimationFrame(() => requestAnimationFrame(() => openZoom(initProject, true)));
  }
}
