import * as THREE from 'three';
import { PROJECTS as _PROJECTS } from './projects.js';
import { createSMBlock } from './SMBlock.js';
import Player from '@vimeo/player';

document.body.classList.add('js');

const _caseStudyModules = import.meta.glob('./case-studies/*.js');

// Fisher-Yates shuffle — new order every page load
const PROJECTS = _PROJECTS.slice();
for (let i = PROJECTS.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [PROJECTS[i], PROJECTS[j]] = [PROJECTS[j], PROJECTS[i]];
}
// Tag each project with its texture-array index (stable after shuffle)
PROJECTS.forEach((p, i) => { p._idx = i; });

// Finite positions for both CS mode and filtered archive — spiral outward from (0,0), sorted by distance
const GRID_POSITIONS = (() => {
  const pos = [];
  for (let cy = -8; cy <= 8; cy++)
    for (let cx = -8; cx <= 8; cx++)
      if (cx !== 0 || cy !== 0) pos.push({ cx, cy });
  pos.sort((a, b) => (Math.hypot(a.cx, a.cy) - Math.hypot(b.cx, b.cy)) || (Math.abs(a.cx) - Math.abs(b.cx)) || (Math.abs(a.cy) - Math.abs(b.cy)));
  return pos;
})();


/* ============================================================
   TUNABLES
============================================================ */

const ITEM_W = 320;   // px — geometry/texture aspect only (16:10)
const ITEM_H = 225;
const RADIUS = 30;    // px — corner radius in screen pixels (constant across all sizes)
const FOV = 42;
const CONVEX = 0.00012;       // concave dish depth (subtle)

const CENTRE_FRAC = 0.4;        // centred item width as a fraction of the viewport
const GAP_C = 36;         // gap (px) held between adjacent items — shrinks outward with them
const SIZE_MIN = 0.12;       // smallest item scale, relative to the centre item
const SIZE_POW = 1.4;        // how fast items shrink toward the edge

const SNAP_MIN = 0.34;       // s — rubber-band snap-back duration
const COAST_FRICTION = 0.95; // velocity multiplier per frame at 60fps (~5% remains after 1s)
const COAST_STOP = 0.8;      // px/frame — coast ends and snap begins below this speed

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
let gridFade = 1.0; // 0→1 fade-in when filters change
const GRID_FADE_DUR = 0.35; // seconds

/* ============================================================
   VIEWED TRACKING — persisted in localStorage
============================================================ */
const viewedSlugs = new Set();

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
  const titleSize = w * 0.066, clientSize = w * (innerWidth <= 640 ? 0.0286 : 0.026), titleClientGap = w * 0.015;
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

  if (viewedSlugs.has(p.slug)) {
    // Normalize r so the circle is ~11 screen px radius regardless of card scale
    const cardW = Math.max(320, CENTRE_FRAC * innerWidth);
    const r = w * 11 / cardW;
    const pad = 2.4;
    const bx = cw - r * pad;
    const by = r * pad;
    x.beginPath();
    x.arc(bx, by, r * 1.15, 0, Math.PI * 2);
    x.fillStyle = 'rgba(241, 239, 232, 0.75)';
    x.fill();
    x.font = `600 ${r * 1.5}px "Open Sans", Arial`;
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.fillStyle = 'rgba(25, 26, 29, 1)';
    x.fillText('✓', bx - r * 0.08, by + r * 0.1);
  }

  return c;
}

function makeIntroTexture(w = 1024) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = Math.round(w * (ITEM_H / ITEM_W));
  return c;
}

function drawIntroCanvas(wmOpacity) {
  const ctx = introBaseCanvas.getContext('2d');
  const cw = introBaseCanvas.width, ch = introBaseCanvas.height;
  ctx.clearRect(0, 0, cw, ch);
  if (wmOpacity > 0.001 && wmStamp) {
    const sz = Math.min(cw, ch) * 0.38;
    ctx.globalAlpha = wmOpacity * 0.13;
    ctx.drawImage(wmStamp, (cw - sz) / 2, (ch - sz) / 2, sz, sz);
    ctx.globalAlpha = 1;
  }
}

/* ============================================================
   THREE.JS SCENE — orthographic-feel perspective so 1 unit ≈ 1px
============================================================ */
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeae8e4);

const camera = new THREE.PerspectiveCamera(FOV, innerWidth / innerHeight, 1, 6000);
// Distance chosen so at z=0 the visible height == innerHeight px  →  1 world unit ≈ 1px.
function camDistance() { return (innerHeight / 2) / Math.tan(THREE.MathUtils.degToRad(FOV) / 2); }
camera.position.set(0, 0, camDistance());
camera.lookAt(0, 0, 0);

/* ---------- background image plane ---------- */
let bgMesh = null;
let bgTexture = null;

function updateBgCover() {
  if (!bgMesh || !bgTexture) return;
  const PAD = 160;
  const w = innerWidth  + PAD * 2;
  const h = innerHeight + PAD * 2;
  bgMesh.scale.set(w, h, 1);
  const imgAspect = bgTexture.image.width / bgTexture.image.height;
  const scrAspect = w / h;
  if (imgAspect > scrAspect) {
    const s = scrAspect / imgAspect;
    bgTexture.repeat.set(s, 1);
    bgTexture.offset.set((1 - s) / 2, 0);
  } else {
    const s = imgAspect / scrAspect;
    bgTexture.repeat.set(1, s);
    bgTexture.offset.set(0, (1 - s) / 2);
  }
}

new THREE.TextureLoader().load('/assets/grid-bg.jpg', (tex) => {
  console.log(tex);
  tex.colorSpace = THREE.NoColorSpace;
  bgTexture = tex;
  const geo = new THREE.PlaneGeometry(1, 1);
  const mat = new THREE.MeshBasicMaterial({ map: tex, depthWrite: false, depthTest: false });
  bgMesh = new THREE.Mesh(geo, mat);
  bgMesh.position.z = -2;
  bgMesh.renderOrder = -2;
  scene.add(bgMesh);
  updateBgCover();
});

/* ---------- textures (start as generated art, photos swap in on load) ---------- */
const textures = PROJECTS.map((p, i) => {
  const t = new THREE.CanvasTexture(makeCover(p, i));
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
});

// Keep Image refs alive so decoded pixel data isn't freed; used for zero-flash zoom bg
const _bgPreloads = new Map(PROJECTS.map(p => [p.src, new Image()]));
PROJECTS.forEach((p, i) => {
  const img = _bgPreloads.get(p.src);
  img.onload = () => {
    textures[i].image = makeCover(p, i, 1024, img);
    textures[i].needsUpdate = true;
  };
  img.onerror = () => console.warn('Card image not found, using generated art:', p.src);
  img.src = p.src;
});

function markViewed(p) {
  if (viewedSlugs.has(p.slug)) return;
  viewedSlugs.add(p.slug);
  const img = _bgPreloads.get(p.src);
  const loaded = img && img.complete && img.naturalWidth > 0 ? img : null;
  textures[p._idx].image = makeCover(p, p._idx, 1024, loaded);
  textures[p._idx].needsUpdate = true;
}

let wmStamp = null;  // set after intro monogram scene is ready (below)
let introBaseCanvas = makeIntroTexture();
const introTexture = new THREE.CanvasTexture(introBaseCanvas);
introTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

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
  vec4 texel = texture2D(map, vUv);
  gl_FragColor = vec4(texel.rgb, texel.a * alpha * uFade);
}`;

function makeMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      map:     { value: textures[0] },
      uSize:   { value: new THREE.Vector2(ITEM_W, ITEM_H) },
      uRadius: { value: RADIUS },
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
const isFiniteGrid = () => filterCaseStudies || hasActiveFilters();
const projIndex = (cx, cy) => {
  if (activeN === 0) return 0;
  if (filterCaseStudies) {
    const i = GRID_POSITIONS.findIndex(p => p.cx === cx && p.cy === cy);
    return (i >= 0 && i < activeN) ? i : -1;
  }
  if (hasActiveFilters()) {
    // (0,0) holds the first filtered project; GRID_POSITIONS[i] holds project i+1
    if (cx === 0 && cy === 0) return 0;
    const i = GRID_POSITIONS.findIndex(p => p.cx === cx && p.cy === cy);
    return (i >= 0 && i + 1 < activeN) ? i + 1 : -1;
  }
  return pmod(cx * 31 + cy * 131, activeN);
};
// Returns true if this cell should display a card (always true in infinite archive; bounded in finite modes)
const isValidCSCell = (cx, cy) => {
  if (!isFiniteGrid()) return true;
  if (cx === 0 && cy === 0) return true;
  const positions = filterCaseStudies ? GRID_POSITIONS : GRID_POSITIONS;
  const limit = hasActiveFilters() && !filterCaseStudies ? activeN - 1 : activeN;
  return positions.some((p, i) => p.cx === cx && p.cy === cy && i < limit);
};

/* ============================================================
   INTERACTION — drag / wheel / arrow keys, inertia, snap
============================================================ */
// scroll = grid translation in px (screen space, +x right, +y up)
const scroll = { x: 0, y: 0 };
const rawScroll = { x: 0, y: 0 }; // unresisted position; scroll is the rubber-banded display value
const vel = { x: 0, y: 0 };
const velSmooth = { x: 0, y: 0 }; // EMA of drag velocity — used to seed coasting
let coasting = false;
const drag = { active: false, lastX: 0, lastY: 0, moved: 0 };

const nearestMultiple = (v, pitch) => Math.round(v / pitch) * pitch;

// Single ease-in-out tween for every settle (snap / arrows / click).
// Smootherstep: gentle in and out with no overshoot.
const tween = { active: false, x0: 0, y0: 0, x1: 0, y1: 0, t: 0, dur: 0.5, easeOut: false };
function startTween(tx, ty, easeOut = false) {
  tween.x0 = scroll.x; tween.y0 = scroll.y;
  tween.x1 = tx; tween.y1 = ty;
  const dist = Math.hypot(tx - scroll.x, ty - scroll.y);
  tween.dur = easeOut ? SNAP_MIN : THREE.MathUtils.clamp(0.42 + dist / 1200, 0.42, 0.85);
  tween.easeOut = easeOut;
  tween.t = 0; tween.active = true;
}
function rubberBand(natural, max) {
  if (Math.abs(natural) <= max) return natural;
  const sign = Math.sign(natural);
  const over = Math.abs(natural) - max;
  // Asymptotic: resistance increases continuously; approaches max*0.38 ceiling
  return sign * (max + over / (1 + over / (max * 0.38)));
}
function rubberBandRange(val, min, max) {
  if (val >= min && val <= max) return val;
  const span = Math.max(max - min, PITCH_X * 0.5);
  if (val < min) { const over = min - val; return min - over / (1 + over / (span * 0.38)); }
  const over = val - max;
  return max + over / (1 + over / (span * 0.38));
}
function getFiniteBounds() {
  if (!isFiniteGrid()) return null;
  const positions = filterCaseStudies ? GRID_POSITIONS : GRID_POSITIONS;
  const extraCount = hasActiveFilters() && !filterCaseStudies ? Math.max(0, activeN - 1) : activeN;
  const cells = [{ cx: 0, cy: 0 }, ...positions.slice(0, extraCount)];
  let minX = 0, maxX = 0, minY = 0, maxY = 0;
  for (const { cx, cy } of cells) {
    const tx = -cx * PITCH_X, ty = -cy * PITCH_Y;
    if (tx < minX) minX = tx; if (tx > maxX) maxX = tx;
    if (ty < minY) minY = ty; if (ty > maxY) maxY = ty;
  }
  return { minX, maxX, minY, maxY };
}

function snapNearest(allowEaseOut = true) {
  const px = scroll.x;
  const py = scroll.y;
  if (isFiniteGrid()) {
    const positions = filterCaseStudies ? GRID_POSITIONS : GRID_POSITIONS;
    // CS: intro at (0,0) + N project cells; filtered archive: project[0] at (0,0) + N-1 project cells
    const extraCount = hasActiveFilters() && !filterCaseStudies ? Math.max(0, activeN - 1) : activeN;
    const cells = [{ cx: 0, cy: 0 }, ...positions.slice(0, extraCount)];
    let bestD = Infinity, bestTx = 0, bestTy = 0;
    for (const { cx, cy } of cells) {
      const tx = -cx * PITCH_X, ty = -cy * PITCH_Y;
      const d = (px - tx) ** 2 + (py - ty) ** 2;
      if (d < bestD) { bestD = d; bestTx = tx; bestTy = ty; }
    }
    // Ease-out snap-back when dragged past the grid boundary (not for wheel — uses distance-scaled duration)
    let overBounds = false;
    if (allowEaseOut) {
      if (filterCaseStudies) {
        overBounds = Math.abs(scroll.x) > PITCH_X || Math.abs(scroll.y) > PITCH_Y;
      } else if (hasActiveFilters()) {
        const b = getFiniteBounds();
        overBounds = scroll.x < b.minX || scroll.x > b.maxX || scroll.y < b.minY || scroll.y > b.maxY;
      }
    }
    startTween(bestTx, bestTy, overBounds);
    return;
  }
  startTween(nearestMultiple(px, PITCH_X), nearestMultiple(py, PITCH_Y));
}

function pt(e) { const t = e.touches ? e.touches[0] : e; return { x: t.clientX, y: t.clientY }; }

function onDown(e) {
  if (zoomed) return;
  drag.active = true; drag.moved = 0; tween.active = false;
  coasting = false;
  vel.x = vel.y = 0;
  velSmooth.x = velSmooth.y = 0;
  rawScroll.x = scroll.x; rawScroll.y = scroll.y;
  const p = pt(e); drag.lastX = p.x; drag.lastY = p.y;
  document.body.classList.add('dragging');
}
function onMove(e) {
  if (!drag.active) return;
  const p = pt(e);
  const dx = p.x - drag.lastX, dy = p.y - drag.lastY;
  drag.lastX = p.x; drag.lastY = p.y;
  drag.moved += Math.abs(dx) + Math.abs(dy);
  rawScroll.x += dx;
  rawScroll.y -= dy;       // screen-down → grid-down (world -y)
  velSmooth.x = velSmooth.x * 0.7 + dx * 0.3;
  velSmooth.y = velSmooth.y * 0.7 + (-dy) * 0.3;
  if (filterCaseStudies) {
    scroll.x = rubberBand(rawScroll.x, PITCH_X);
    scroll.y = rubberBand(rawScroll.y, PITCH_Y);
    // Zero out velocity when past boundary so fling doesn't add energy against the snap-back
    vel.x = Math.abs(rawScroll.x) > PITCH_X ? 0 : dx;
    vel.y = Math.abs(rawScroll.y) > PITCH_Y ? 0 : -dy;
  } else if (hasActiveFilters()) {
    const b = getFiniteBounds();
    scroll.x = rubberBandRange(rawScroll.x, b.minX, b.maxX);
    scroll.y = rubberBandRange(rawScroll.y, b.minY, b.maxY);
    vel.x = (rawScroll.x < b.minX || rawScroll.x > b.maxX) ? 0 : dx;
    vel.y = (rawScroll.y < b.minY || rawScroll.y > b.maxY) ? 0 : -dy;
  } else {
    scroll.x = rawScroll.x;
    scroll.y = rawScroll.y;
    vel.x = dx; vel.y = -dy;
  }
}
function onUp() {
  if (!drag.active) return;
  drag.active = false;
  document.body.classList.remove('dragging');
  if (Math.hypot(velSmooth.x, velSmooth.y) > COAST_STOP) {
    vel.x = velSmooth.x;
    vel.y = velSmooth.y;
    coasting = true;
  } else {
    snapNearest();
  }
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
  if (tween.active) { rawScroll.x = scroll.x; rawScroll.y = scroll.y; }
  tween.active = false;
  coasting = false;
  wheeling = true;
  cta.classList.remove('show'); ctaShown = false; ctaBtn.setAttribute('tabindex', '-1');
  rawScroll.x -= e.deltaX;
  rawScroll.y += e.deltaY; // wheel-down pans content up
  vel.x = vel.y = 0;
  if (filterCaseStudies) {
    scroll.x = rubberBand(rawScroll.x, PITCH_X);
    scroll.y = rubberBand(rawScroll.y, PITCH_Y);
  } else if (hasActiveFilters()) {
    const b = getFiniteBounds();
    scroll.x = rubberBandRange(rawScroll.x, b.minX, b.maxX);
    scroll.y = rubberBandRange(rawScroll.y, b.minY, b.maxY);
  } else {
    scroll.x = rawScroll.x;
    scroll.y = rawScroll.y;
  }
  clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => {
    rawScroll.x = scroll.x; rawScroll.y = scroll.y;
    wheeling = false; snapNearest(false);
  }, 90);
}, { passive: false });

/* ---------- raycast hover / click ---------- */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(-2, -2); // hover detection only — stays off-screen on touch
const prlxTarget = { x: 0, y: 0 };      // parallax target — centred by default, mouse-only
let hovered = null;
addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse') return;
  if (innerWidth <= 640) return;
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / innerHeight) * 2 + 1;
  prlxTarget.x = mouse.x;
  prlxTarget.y = mouse.y;
});
canvas.addEventListener('click', (e) => {
  if (zoomed || drag.moved > 6) return;
  const tapVec = new THREE.Vector2(
    (e.clientX / innerWidth) * 2 - 1,
    -(e.clientY / innerHeight) * 2 + 1
  );
  raycaster.setFromCamera(tapVec, camera);
  const hit = raycaster.intersectObjects(pool, false)[0];
  if (!hit) return;
  const c = hit.object.userData.cell;
  const ccx = Math.round(-scroll.x / PITCH_X);
  const ccy = Math.round(-scroll.y / PITCH_Y);
  if (c.x === ccx && c.y === ccy && centreProject) openZoom(centreProject);   // centre card → zoom
  else if ((c.x !== ccx || c.y !== ccy) && isValidCSCell(c.x, c.y)) startTween(-c.x * PITCH_X, -c.y * PITCH_Y); // snap to centre
});

addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { if (zoomed) closeZoom(); else closeMenu(); return; }
  if (zoomed) {
    if (e.key === 'Tab') {
      const focusable = [...zoom.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    return;
  }
  const active = document.activeElement;
  const interactiveHasFocus = active && active !== document.body && active !== document.documentElement && active !== canvas;
  if (e.key === 'Enter' && centreProject && !interactiveHasFocus) { openZoom(centreProject); return; }
  const ccx = Math.round(-scroll.x / PITCH_X);
  const ccy = Math.round(-scroll.y / PITCH_Y);
  let nx = ccx, ny = ccy;
  if (e.key === 'ArrowRight') nx = ccx + 1;
  else if (e.key === 'ArrowLeft') nx = ccx - 1;
  else if (e.key === 'ArrowUp') ny = ccy + 1;
  else if (e.key === 'ArrowDown') ny = ccy - 1;
  else return;
  e.preventDefault();
  if (!isValidCSCell(nx, ny)) return;
  startTween(-nx * PITCH_X, -ny * PITCH_Y);
});

/* ============================================================
   CTA + ZOOM
   "See Case Study" button over the centre card; click expands
   that card to fill the viewport minus the GAP_C margin.
============================================================ */
const cta = document.getElementById('cta');
const ctaBtn = document.getElementById('ctaBtn');
const introEl = document.getElementById('intro');

(function () {
  const years = PROJECTS.map(p => p.year).filter(Boolean);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const chip = document.getElementById('archiveChip');
  if (chip) chip.textContent = PROJECTS.length + ' projects | ' + maxYear + '–' + minYear;
})();

const zoom = document.getElementById('zoom');
zoom.setAttribute('inert', '');
document.getElementById('project-grid-html').setAttribute('inert', '');
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
    const center = (b.variant === 'callout' && b.center) ? ' cs-block--v-center' : '';
    const bodyHtml = /^\s*</.test(b.body) ? b.body : `<p>${b.body}</p>`;
    const btnHtml = (b.variant === 'intro' && b.url)
      ? `<a class="cs-project-link" href="${b.url}" target="_blank" rel="noopener noreferrer">View the work</a>`
      : '';
    return `<div class="cs-block${mod}${center}"${span}>${b.heading ? `<h3>${b.heading}</h3>` : ''}${bodyHtml}${btnHtml}</div>`;
  }
  if (b.type === 'image') {
    const contain = b.contain ? ' cs-block--image-contain' : '';
    return `<figure class="cs-block cs-block--image${contain}"${span}><img src="${b.src}" alt="${b.alt || ''}" loading="lazy"></figure>`;
  }
  if (b.type === 'video') {
    const once = b.autoplay && b.loop === false;
    const loop = b.autoplay && !once ? ' loop' : '';
    const attrs = b.autoplay ? `autoplay muted${loop} playsinline` : 'controls playsinline';
    const mod = b.autoplay ? ' cs-block--video-autoplay' : '';
    const onceAttr = once ? ' data-autoplay-once' : '';
    return `<figure class="cs-block cs-block--video${mod}"${span}><video src="${b.src}"${onceAttr} ${attrs}></video></figure>`;
  }
  if (b.type === 'vimeo') {
    let vimeoSrc = b.src;
    const sep = vimeoSrc.includes('?') ? '&' : '?';
    if (b.autoplay) {
      vimeoSrc += `${sep}loop=1&muted=1&background=1`;
    } else {
      vimeoSrc += `${sep}title=0&byline=0&portrait=0&play_button_position=center`;
    }
    const autoAttr = b.autoplay ? ' data-vimeo-autoplay' : '';
    return `<figure class="cs-block cs-block--vimeo"${span}><iframe src="${vimeoSrc}"${autoAttr} frameborder="0" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe></figure>`;
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
let ctaTimer = null;
ctaBtn.setAttribute('tabindex', '-1');
let introShown = false;
let introPageLoadAnimDone = false;
let introAnimTimeout = null;
const introAboutBtn = document.getElementById('introAboutBtn');
introAboutBtn.setAttribute('tabindex', '-1');
let zoomSlug = null;         // slug of currently open project (guards async content loads)
let zoomTriggerEl = null;    // element focused before zoom opened; restored on close

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
  const zm = mobile ? 12 : GAP_C;
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

const DEFAULT_TITLE = 'Steve Mackey — Design & Technology Director';
const DEFAULT_DESC  = document.getElementById('metaDesc').content;
const metaDesc    = document.getElementById('metaDesc');
const metaOgTitle = document.getElementById('metaOgTitle');
const metaOgDesc  = document.getElementById('metaOgDesc');
const metaTwTitle = document.getElementById('metaTwTitle');
const metaTwDesc  = document.getElementById('metaTwDesc');

function setPageMeta(title, desc) {
  document.title = title;
  metaDesc.content    = desc;
  metaOgTitle.content = title;
  metaOgDesc.content  = desc;
  metaTwTitle.content = title;
  metaTwDesc.content  = desc;
}

function openZoom(p, skipHistory = false) {
  if (zoomed || !p) return;
  markViewed(p);
  zoomed = true;
  zoomTriggerEl = document.activeElement;
  zoom.removeAttribute('inert');
  zoom.setAttribute('aria-hidden', 'false');
  document.body.classList.remove('hovering');
  // backgroundImage, backgroundColor already pre-painted in the render loop while hidden;
  // set again here as a safety net for edge cases (deep links, popstate)
  zoomHeroBg.style.backgroundImage = `url("${p.src}")`;
  zoomHeroBg.style.transform = 'scale(1)';
  zoomHeroBg.classList.remove('fading');
  zoom.classList.remove('fading');
  zoom.style.backgroundColor = p.accentColourPrimary;
  zoomContent.style.backgroundColor = p.accentColourPrimary;
  zoomContent.style.transform = 'translateY(0)';
  zoomCat.textContent = p.category.join(', ');
  zoomTitle.textContent = p.title;
  zoomClient.textContent = p.client || '';
  zoomSlug = p.slug;
  zoomContent.innerHTML = '';
  
  document.documentElement.style.setProperty('--text-colour', p.textColour === 'light' ? 'var(--text-light)' : 'var(--text-dark)');
  document.documentElement.style.setProperty('--accent-colour', p.textColour === 'dark' ? 'var(--ink)' : p.accentColourPrimary);
  
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
  zoomClose.style.transition = 'none';
  zoomClose.style.opacity = '0';
  requestAnimationFrame(() => { zoomClose.style.transition = ''; });
  zoom.style.opacity = '1';
  zoom.classList.add('open');
  zoomAnim.dir = 1; zoomAnim.active = true;
  setPageMeta(
    `${p.title} — ${p.client || 'Steve Mackey'}`,
    p.client ? `${p.title} by ${p.client}. A project by Steve Mackey — Design & Technology Director.` : `${p.title} — a project by Steve Mackey, Design & Technology Director.`
  );
  if (!skipHistory) history.pushState({ slug: p.slug }, '', '/' + p.slug);
}

let csObserver = null;
let vimeoPlayers = [];
let vimeoObserver = null;

function initVimeoPlayers() {
  if (vimeoObserver) { vimeoObserver.disconnect(); vimeoObserver = null; }
  vimeoPlayers.forEach(({ player }) => { player.destroy().catch(() => {}); });
  vimeoPlayers = [];

  const iframes = zoomContent.querySelectorAll('iframe[data-vimeo-autoplay]');
  if (!iframes.length) return;

  iframes.forEach(iframe => {
    const player = new Player(iframe);
    player.ready().then(() => player.pause()).catch(() => {});
    vimeoPlayers.push({ player, iframe });
  });

  vimeoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const match = vimeoPlayers.find(v => v.iframe === entry.target);
      if (!match) return;
      if (entry.isIntersecting) {
        match.player.play().catch(() => {});
      } else {
        match.player.pause().catch(() => {});
      }
    });
  }, { root: zoomScroll, threshold: 0.3 });

  vimeoPlayers.forEach(({ iframe }) => vimeoObserver.observe(iframe));
}

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
  initVimeoPlayers();

  // One-shot autoplay videos: reset and replay each time they enter the viewport
  const onceVideos = zoomContent.querySelectorAll('video[data-autoplay-once]');
  if (onceVideos.length) {
    const onceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const v = entry.target;
          v.currentTime = 0;
          v.play().catch(() => {});
        } else {
          entry.target.pause();
        }
      });
    }, { root: zoomScroll, threshold: 0.3 });
    onceVideos.forEach(v => onceObserver.observe(v));
  }
}

function closeZoom(skipHistory = false) {
  if (!zoomed || zoomAnim.dir < 0) return;
  if (csObserver) { csObserver.disconnect(); csObserver = null; }
  if (vimeoObserver) { vimeoObserver.disconnect(); vimeoObserver = null; }
  vimeoPlayers.forEach(({ player }) => { player.destroy().catch(() => {}); });
  vimeoPlayers = [];
  if (!skipHistory) history.pushState(null, '', filterCaseStudies ? '/' : '/archive');
  setPageMeta(DEFAULT_TITLE, DEFAULT_DESC);
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
const navBurger = document.getElementById('navBurger');
let menuOpen = false;
navMenu.setAttribute('inert', '');

function openMenu(skipHistory = false) {
  menuOpen = true;
  closeFilterPanel();
  nav.classList.add('open');
  navMenu.removeAttribute('inert');
  navMenu.setAttribute('aria-hidden', 'false');
  navBurger.setAttribute('aria-label', 'Close menu');
  navMenu.scrollTop = 0;
  if (!skipHistory) history.pushState({ menu: true }, '', '/about');
}

function closeMenu(skipHistory = false) {
  menuOpen = false;
  nav.classList.remove('open');
  navMenu.setAttribute('inert', '');
  navMenu.setAttribute('aria-hidden', 'true');
  navBurger.setAttribute('aria-label', 'Open menu');
  if (innerWidth > 640) navBurger.focus();
  if (!skipHistory) history.pushState(null, '', filterCaseStudies ? '/' : '/archive');
}

navBurger.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
introAboutBtn.addEventListener('click', () => openMenu());

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


// Render the monogram once to an offscreen canvas for use as a texture watermark
wmStamp = (() => {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const sc = new THREE.Scene();
  sc.add(new THREE.AmbientLight(0xffffff, 1.4));
  const dl = new THREE.DirectionalLight(0xffffff, 1.2);
  dl.position.set(2, 3, 3);
  sc.add(dl);
  const cube = createSMBlock({ size: 1 });
  cube.rotation.y = -Math.PI / 4;
  sc.add(cube);
  const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  cam.position.set(0, 0, 2.2);
  const r = new THREE.WebGLRenderer({ canvas: c, antialias: true, alpha: true });
  r.setSize(256, 256, false);
  r.render(sc, cam);
  r.dispose();
  return c;
})();

let wmOpacity = 0;

let brandRaf = null, brandReturnRaf = null, brandYRaf = null, brandTargetY = 0, brandTargetX = 0;

function brandDrift() {
  const dy = brandTargetY - brandCube.position.y;
  const dx = brandTargetX - brandCube.position.x;
  brandCube.position.y += dy * 0.12;
  brandCube.position.x += dx * 0.12;
  if (!brandRaf && !brandReturnRaf) brandRenderer.render(brandScene, brandCamera);
  brandYRaf = (Math.abs(dy) > 0.0002 || Math.abs(dx) > 0.0002) ? requestAnimationFrame(brandDrift) : null;
}

addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  brandTargetY = (0.5 - e.clientY / innerHeight) * 0.28;
  brandTargetX = (e.clientX / innerWidth - 0.5) * 0.28;
  if (!brandRaf && !brandReturnRaf && !brandYRaf) brandDrift();
});

function brandSpin() {
  brandRaf = requestAnimationFrame(brandSpin);
  brandCube.rotation.y -= 0.015 * (1 + 0.70 * Math.cos(4 * brandCube.rotation.y));
  brandCube.position.y += (brandTargetY - brandCube.position.y) * 0.12;
  brandCube.position.x += (brandTargetX - brandCube.position.x) * 0.12;
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
  if (menuOpen) closeMenu(true);
  if (filterPanelOpen) closeFilterPanel();
  clearChipFilters();
  activateFilter('casestudies');
  startTween(0, 0);
  history.pushState(null, '', '/');
});

// ── Filter system ──────────────────────────────────────────
const _byCount = (items, key) => {
  const counts = {};
  _PROJECTS.forEach(p => (p[key] || []).forEach(v => { counts[v] = (counts[v] || 0) + 1; }));
  return [...new Set(items)].filter(Boolean).sort((a, b) => (counts[b] || 0) - (counts[a] || 0));
};
const ALL_CATEGORIES = _byCount(_PROJECTS.flatMap(p => p.category), 'category');
const ALL_INDUSTRIES  = _byCount(_PROJECTS.flatMap(p => p.industry),  'industry');

let filterCaseStudies = false;
let filterCategories  = new Set(); // multi-select within; cleared when date selected
let filterIndustries  = new Set(); // multi-select within; cleared when date selected
let filterDateRange   = null;      // null | 'recent' | 'mid' | 'older' — selecting clears categories + industry

const hasActiveFilters = () => filterCategories.size > 0 || filterIndustries.size > 0 || filterDateRange !== null;

function computeActiveProjects() {
  let result = PROJECTS.slice(); // preserve page-load shuffle order within same year
  if (filterCaseStudies) result = result.filter(p => p.casestudy);
  if (filterCategories.size) result = result.filter(p => p.category.some(c => filterCategories.has(c)));
  if (filterIndustries.size) result = result.filter(p => p.industry.some(i => filterIndustries.has(i)));
  if (filterDateRange) {
    const now = new Date().getFullYear();
    result = result.filter(p => {
      if (p.year === null) return false;
      if (filterDateRange === 'recent') return p.year >= now - 4;
      if (filterDateRange === 'mid')    return p.year >= now - 10 && p.year <= now - 5;
      if (filterDateRange === 'older')  return p.year <= now - 11;
      return true;
    });
  }
  return result;
}

function applyFilters(flashScene = false) {
  activeProjects = computeActiveProjects();
  activeN = activeProjects.length;
  pool.forEach(m => { m.userData.key = null; });
  lastCenterKey = null;
  if (!flashScene) gridFade = 0;
  if (!hasActiveFilters() && !filterCaseStudies) {
    rawScroll.x = 0; rawScroll.y = 0;
    startTween(0, 0);
  } else {
    snapNearest();
  }
  updateFilterBadge();
  if (flashScene) {
    const s = document.getElementById('scene');
    s.classList.remove('ready');
    requestAnimationFrame(() => s.classList.add('ready'));
  }
  const announcer = document.getElementById('filterAnnouncer');
  if (announcer) announcer.textContent = activeN === 0
    ? 'No projects match the selected filters'
    : `Showing ${activeN} project${activeN === 1 ? '' : 's'}`;
}

// Archive / ★ Case Studies nav buttons
const filterBtns = document.querySelectorAll('.filter-btn');
function triggerIntroAnimation() {
  introEl.classList.remove('intro-animating');
  void introEl.offsetWidth; // force reflow so removing/re-adding restarts the animation
  introEl.classList.add('intro-animating');
  clearTimeout(introAnimTimeout);
  introAnimTimeout = setTimeout(() => introEl.classList.remove('intro-animating'), 6500);
}

const navFilterEl = document.getElementById('navFilter');

function positionFilterIndicator(instant = false) {
  const active = navFilterEl.querySelector('.filter-btn.active');
  if (!active) return;
  if (instant) navFilterEl.classList.add('ind-instant');
  navFilterEl.style.setProperty('--ind-x', `${active.offsetLeft}px`);
  navFilterEl.style.setProperty('--ind-w', `${active.offsetWidth}px`);
  if (instant) requestAnimationFrame(() => navFilterEl.classList.remove('ind-instant'));
}

function activateFilter(filter) {
  filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
  const modeChanged = filterCaseStudies !== (filter === 'casestudies');
  filterCaseStudies = (filter === 'casestudies');
  introEl.classList.toggle('mode-archive', !filterCaseStudies);
  applyFilters(modeChanged);
  positionFilterIndicator();
  if (modeChanged && introShown) triggerIntroAnimation();
}
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    clearChipFilters();
    activateFilter(btn.dataset.filter);
    startTween(0, 0);
    const url = btn.dataset.filter === 'all' ? '/archive' : '/';
    history.pushState({ filter: btn.dataset.filter }, '', url);
    if (menuOpen) closeMenu(true);
  });
});

// Intercept in-content casestudies links (e.g. about bio)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href*="casestudies"]:not(.filter-btn)');
  if (!a) return;
  e.preventDefault();
  activateFilter('casestudies');
  history.pushState({ filter: 'casestudies' }, '', '/');
  if (menuOpen) closeMenu(true);
});

// Back/forward navigation
addEventListener('popstate', () => {
  const path = location.pathname.slice(1); // e.g. '' | 'archive' | 'about' | 'project-slug'
  const isArchive = path === 'archive';
  const isAbout = path === 'about';
  const slug = (!isArchive && !isAbout && path) ? path : '';

  if (isAbout) {
    if (!menuOpen) openMenu(true);
    return;
  }

  if (menuOpen) closeMenu(true);

  if (slug) {
    const p = PROJECTS.find(proj => proj.slug === slug);
    if (p && !zoomed) openZoom(p, true);
  } else {
    if (zoomed) closeZoom(true);
  }
  activateFilter(isArchive ? 'all' : 'casestudies');
});

// ── Filter panel ────────────────────────────────────────────
const navFilterBtn  = document.getElementById('navFilterBtn');
const filterMenuEl  = document.getElementById('filterMenu');
const filterBadgeEl = document.getElementById('filterBadge');
const activeFiltersEl = document.getElementById('activeFilters');
let filterPanelOpen = false;
filterMenuEl.setAttribute('inert', '');

function dateRangeLabel(range) {
  const now = new Date().getFullYear();
  if (range === 'recent') return `${now}–${now - 4}`;
  if (range === 'mid')    return `${now - 5}–${now - 10}`;
  if (range === 'older')  return `${now - 11} & earlier`;
  return range;
}

function updateActiveFilterChips() {
  if (!activeFiltersEl) return;
  const chips = [];
  filterCategories.forEach(c => chips.push({ label: c, type: 'category', value: c }));
  filterIndustries.forEach(i => chips.push({ label: i, type: 'industry', value: i }));
  if (filterDateRange) chips.push({ label: dateRangeLabel(filterDateRange), type: 'date', value: filterDateRange });
  activeFiltersEl.innerHTML = chips.map(ch =>
    `<button class="active-filter-chip" data-type="${ch.type}" data-value="${ch.value}">${ch.label}<span class="chip-x" aria-hidden="true">&#x2715;</span></button>`
  ).join('');
  activeFiltersEl.classList.toggle('visible', chips.length > 0);
}

activeFiltersEl.addEventListener('click', e => {
  const chip = e.target.closest('.active-filter-chip');
  if (!chip) return;
  const { type, value } = chip.dataset;
  if (type === 'category') {
    filterCategories.delete(value);
    filterMenuEl.querySelectorAll(`[data-category="${value}"]`).forEach(c => {
      c.classList.remove('active'); c.setAttribute('aria-pressed', 'false');
    });
  } else if (type === 'industry') {
    filterIndustries.delete(value);
    filterMenuEl.querySelectorAll(`[data-industry="${value}"]`).forEach(c => {
      c.classList.remove('active'); c.setAttribute('aria-pressed', 'false');
    });
  } else if (type === 'date') {
    filterDateRange = null;
    filterMenuEl.querySelectorAll('[data-daterange]').forEach(c => {
      c.classList.remove('active'); c.setAttribute('aria-pressed', 'false');
    });
  }
  applyFilters();
  updateFilterBadge();
});

function updateFilterBadge() {
  const count = filterCategories.size + filterIndustries.size + (filterDateRange ? 1 : 0);
  filterBadgeEl.textContent = count || '';
  filterBadgeEl.classList.toggle('visible', count > 0);
  // Keep clear button in sync
  const clearBtn = document.getElementById('filterClearBtn');
  const filterTitle = document.getElementById('filterTitle');
  if (clearBtn) clearBtn.style.display = count > 0 ? 'block' : 'none';
  if (filterTitle) filterTitle.style.display = count > 0 ? 'none' : 'block';
  updateActiveFilterChips();
}

function filterNavHeight() {
  filterMenuEl.style.maxHeight = '';  // clear so scrollHeight is unconstrained
  const navTopH = document.getElementById('navTop').offsetHeight;
  const naturalH = navTopH + filterMenuEl.scrollHeight + 8;
  const maxH = innerWidth <= 640 ? innerHeight - 24 : innerHeight - 80;
  const targetH = Math.min(naturalH, maxH);
  // Only cap filterMenu when the nav itself is hitting the viewport limit
  if (targetH < naturalH) {
    filterMenuEl.style.maxHeight = (targetH - navTopH - 8) + 'px';
  }
  return { navTopH, targetH };
}

function openFilterPanel() {
  if (menuOpen) closeMenu(true);
  filterPanelOpen = true;
  nav.classList.add('filter-open');
  activeFiltersEl.classList.add('panel-open');
  filterMenuEl.removeAttribute('inert');
  filterMenuEl.setAttribute('aria-hidden', 'false');
  // Interrupt any ongoing height transition and measure at unconstrained height
  // so flex children aren't squeezed mid-animation (e.g. switching from about menu).
  nav.style.transition = 'none';
  nav.style.height = '2000px';       // overflow:hidden keeps this invisible
  void nav.offsetHeight;             // force reflow — children now have room
  const { navTopH, targetH } = filterNavHeight();
  nav.style.height = navTopH + 'px'; // snap to closed height as animation start point
  void nav.offsetHeight;             // force reflow — establishes "from" for transition
  nav.style.transition = '';         // restore transition
  nav.style.height = targetH + 'px'; // animate open
}

function closeFilterPanel() {
  filterPanelOpen = false;
  nav.classList.remove('filter-open');
  activeFiltersEl.classList.remove('panel-open');
  filterMenuEl.setAttribute('inert', '');
  filterMenuEl.setAttribute('aria-hidden', 'true');
  filterMenuEl.style.maxHeight = '';
  nav.style.height = '';
}

function buildFilterMenu() {
  const now = new Date().getFullYear();
  const dateSection = `<div class="filter-section">
  <span class="filter-section-label" id="filter-label-date">Date</span>
  <div class="filter-chips" role="group" aria-labelledby="filter-label-date">
    <button class="filter-chip" data-daterange="recent" aria-pressed="false">${now}–${now - 4}</button>
    <button class="filter-chip" data-daterange="mid" aria-pressed="false">${now - 5}–${now - 10}</button>
    <button class="filter-chip" data-daterange="older" aria-pressed="false">${now - 11} &amp; earlier</button>
  </div>
</div>`;

  const catChips = ALL_CATEGORIES.map(c =>
    `<button class="filter-chip" data-category="${c}" aria-pressed="false">${c}</button>`
  ).join('');
  const catSection = `<div class="filter-section">
  <span class="filter-section-label" id="filter-label-type">Project type</span>
  <div class="filter-chips" role="group" aria-labelledby="filter-label-type">${catChips}</div>
</div>`;

  const indChips = ALL_INDUSTRIES.map(i =>
    `<button class="filter-chip" data-industry="${i}" aria-pressed="false">${i}</button>`
  ).join('');
  const indSection = `<div class="filter-section">
  <span class="filter-section-label" id="filter-label-industry">Industry</span>
  <div class="filter-chips" role="group" aria-labelledby="filter-label-industry">${indChips}</div>
</div>`;

  const header = `<div id="filterHeader">
  <span id="filterTitle">Filters</span>
  <button id="filterClearBtn">Clear All Filters</button>
  <button id="filterCloseBtn" aria-label="Close filters">&#x2715;</button>
</div>`;

  filterMenuEl.innerHTML = header + dateSection + catSection + indSection;

  filterMenuEl.addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (chip) {
      if (filterCaseStudies) {
        filterCaseStudies = false;
        filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
        introEl.classList.add('mode-archive');
        history.pushState({ filter: 'all' }, '', '/archive');
        positionFilterIndicator();
      }
      if (chip.dataset.daterange) {
        // Date clears categories + industries, then toggles
        filterCategories.clear();
        filterIndustries.clear();
        filterMenuEl.querySelectorAll('[data-category], [data-industry]').forEach(c => {
          c.classList.remove('active'); c.setAttribute('aria-pressed', 'false');
        });
        const range = chip.dataset.daterange;
        filterDateRange = (filterDateRange === range) ? null : range;
        filterMenuEl.querySelectorAll('[data-daterange]').forEach(c => {
          const on = c.dataset.daterange === filterDateRange;
          c.classList.toggle('active', on); c.setAttribute('aria-pressed', String(on));
        });
      } else if (chip.dataset.category) {
        // Category clears date + industries, then multi-toggles within
        filterDateRange = null;
        filterIndustries.clear();
        filterMenuEl.querySelectorAll('[data-daterange], [data-industry]').forEach(c => {
          c.classList.remove('active'); c.setAttribute('aria-pressed', 'false');
        });
        const c = chip.dataset.category;
        filterCategories.has(c) ? filterCategories.delete(c) : filterCategories.add(c);
        const catOn = filterCategories.has(c);
        chip.classList.toggle('active', catOn); chip.setAttribute('aria-pressed', String(catOn));
      } else if (chip.dataset.industry) {
        // Industry clears date + categories, then multi-toggles within
        filterDateRange = null;
        filterCategories.clear();
        filterMenuEl.querySelectorAll('[data-daterange], [data-category]').forEach(c => {
          c.classList.remove('active'); c.setAttribute('aria-pressed', 'false');
        });
        const i = chip.dataset.industry;
        filterIndustries.has(i) ? filterIndustries.delete(i) : filterIndustries.add(i);
        const indOn = filterIndustries.has(i);
        chip.classList.toggle('active', indOn); chip.setAttribute('aria-pressed', String(indOn));
      }
      applyFilters();
      return;
    }
    if (e.target.id === 'filterClearBtn') {
      clearChipFilters();
      applyFilters();
    }
    if (e.target.id === 'filterCloseBtn') {
      closeFilterPanel();
    }
  });
}

function clearChipFilters() {
  filterCategories.clear();
  filterIndustries.clear();
  filterDateRange = null;
  filterMenuEl.querySelectorAll('.filter-chip').forEach(c => {
    c.classList.remove('active'); c.setAttribute('aria-pressed', 'false');
  });
}

buildFilterMenu();

navFilterBtn.addEventListener('click', () => filterPanelOpen ? closeFilterPanel() : openFilterPanel());

// Close filter panel on outside click
let usingKeyboard = false;
document.addEventListener('pointerdown', () => { usingKeyboard = false; });
document.addEventListener('keydown', (ev) => { if (ev.key === 'Tab' || ev.key === 'Enter' || ev.key === ' ') usingKeyboard = true; });

document.addEventListener('pointerdown', e => {
  if (filterPanelOpen && !nav.contains(e.target)) closeFilterPanel();
});

/* ============================================================
   RENDER LOOP
============================================================ */
const nowTitle = document.getElementById('nowTitle');
const nowMeta = document.getElementById('nowMeta');
let lastCenterKey = null;
let lastT = performance.now();
let prlxX = 0, prlxY = 0;   // smoothed mouse parallax (-1..1)

// Sync filter and menu state from URL on load (must be after lastCenterKey is declared)
// Deep-linked non-case-study projects must open in archive mode so the project
// remains visible after the zoom closes and the scroll position is computed correctly.
const _dlPath = location.pathname.slice(1);
const _dlProject = _dlPath && _dlPath !== 'archive' && _dlPath !== 'about'
  ? PROJECTS.find(p => p.slug === _dlPath) : null;
activateFilter(
  location.pathname === '/archive' || (_dlProject && !_dlProject.casestudy) ? 'all' : 'casestudies'
);
positionFilterIndicator(true);
if (location.pathname === '/about') openMenu(true);

function animate() {
  requestAnimationFrame(animate);

  const nowT = performance.now();
  let dt = (nowT - lastT) / 1000; lastT = nowT;
  dt = Math.min(dt, 0.05);
  if (gridFade < 1) gridFade = Math.min(1, gridFade + dt / GRID_FADE_DUR);

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
      if (usingKeyboard) zoomClose.focus();
      if (innerWidth > 640) setTimeout(() => smoothScrollTo(zoomScroll, zoomScroll.clientHeight / 2, 2000), 1000);
    }
    if (zoomAnim.dir < 0 && zoomAnim.p <= 0) {
      zoomAnim.active = false;
      zoom.classList.remove('open');
      zoom.style.opacity = '';
      zoom.setAttribute('inert', '');
      zoom.setAttribute('aria-hidden', 'true');
      zoomed = false;
      if (zoomTriggerEl) { zoomTriggerEl.focus(); zoomTriggerEl = null; }
    }
  }

  // Coast: free-scroll with friction after drag release, then snap once slow enough
  if (coasting) {
    const friction = Math.pow(COAST_FRICTION, dt * 60);
    vel.x *= friction;
    vel.y *= friction;
    rawScroll.x += vel.x;
    rawScroll.y += vel.y;
    if (filterCaseStudies) {
      scroll.x = rubberBand(rawScroll.x, PITCH_X);
      scroll.y = rubberBand(rawScroll.y, PITCH_Y);
    } else if (hasActiveFilters()) {
      const b = getFiniteBounds();
      scroll.x = rubberBandRange(rawScroll.x, b.minX, b.maxX);
      scroll.y = rubberBandRange(rawScroll.y, b.minY, b.maxY);
    } else {
      scroll.x = rawScroll.x;
      scroll.y = rawScroll.y;
    }
    if (Math.hypot(vel.x, vel.y) < COAST_STOP) {
      coasting = false;
      snapNearest();
    }
  }

  // Advance the snap tween — smootherstep normally, ease-out cubic for rubber-band snap-back
  if (!drag.active && !coasting && tween.active) {
    tween.t += dt / tween.dur;
    const p = Math.min(tween.t, 1);
    const e = tween.easeOut
      ? 1 - (1 - p) * (1 - p) * (1 - p)        // ease-out cubic: rubber-band snap-back
      : (1 - Math.cos(Math.PI * p)) / 2;        // sine ease-in-out: gentle ramp, moderate peak, smooth settle
    scroll.x = tween.x0 + (tween.x1 - tween.x0) * e;
    scroll.y = tween.y0 + (tween.y1 - tween.y0) * e;
    if (p >= 1) { scroll.x = tween.x1; scroll.y = tween.y1; rawScroll.x = tween.x1; rawScroll.y = tween.y1; tween.active = false; }
  }

  // Which cell currently sits at screen centre
  const ccx = Math.round(-scroll.x / PITCH_X);
  const ccy = Math.round(-scroll.y / PITCH_Y);

  raycaster.setFromCamera(mouse, camera);
  const hit = (!drag.active && !zoomed) ? raycaster.intersectObjects(pool, false)[0] : null;
  const hitObj = hit ? hit.object : null;
  if (hitObj !== hovered) {
    hovered = hitObj;
    const cell = hitObj?.userData.cell;
    const isIntroCard = cell && cell.x === 0 && cell.y === 0 && !hasActiveFilters();
    document.body.classList.toggle('hovering', !!hitObj && !isIntroCard);
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
    const isEmpty = !isValidCSCell(cellX, cellY);
    m.material.uniforms.uFade.value = isEmpty ? 0 : (0.55 + 0.45 * fall) * gridFade;

    // Assign the right project only when this slot's cell changes
    const key = cellX + ',' + cellY;
    if (m.userData.key !== key) {
      m.userData.key = key;
      m.userData.cell = { x: cellX, y: cellY };
      if (isEmpty) {
        m.userData.projIdx = -1;
      } else if (activeN === 0) {
        m.material.uniforms.map.value = introTexture;
        m.userData.projIdx = -1;
      } else {
        const isIntro = cellX === 0 && cellY === 0 && !hasActiveFilters();
        const pi = isIntro ? -1 : projIndex(cellX, cellY);
        m.material.uniforms.map.value = (isIntro || pi < 0) ? introTexture : textures[activeProjects[pi]._idx];
        m.userData.projIdx = pi;
      }
    }

  }

  // Bottom HUD reflects the centred project
  const centerKey = ccx + ',' + ccy;
  if (centerKey !== lastCenterKey) {
    lastCenterKey = centerKey;
    if (activeN === 0) {
      centreProject = null;
      nowTitle.textContent = 'No results';
      nowMeta.textContent = 'Try a different filter combination';
    } else if (ccx === 0 && ccy === 0 && !hasActiveFilters()) {
      centreProject = null;
      nowTitle.textContent = '';
      nowMeta.textContent = 'Scroll in any direction to explore';
    } else {
      const _pi = projIndex(ccx, ccy);
      centreProject = _pi >= 0 ? activeProjects[_pi] : null;
      if (!centreProject) {
        nowTitle.textContent = '';
        nowMeta.textContent = '';
      } else {
        nowTitle.textContent = centreProject.title;
        nowMeta.textContent = centreProject.category.join(', ');
        ctaBtn.textContent = centreProject.casestudy ? 'View Case Study' : 'View Project';
        // Pre-paint the zoom hero while the panel is hidden so the image is already
        // rendered when openZoom makes it visible — skip when zoomed so a resize
        // can't overwrite the open project's colours with a different project's.
        if (!zoomed) {
          zoomHeroBg.style.backgroundImage = `url("${centreProject.src}")`;
          zoom.style.backgroundColor = centreProject.accentColourPrimary;
          zoomContent.style.backgroundColor = centreProject.accentColourPrimary;
        }
        // Decode this and adjacent images so they're always ready
        [[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx, dy]) => {
          const pi2 = projIndex(ccx + dx, ccy + dy);
          const np = pi2 >= 0 ? activeProjects[pi2] : null;
          _bgPreloads.get(np?.src)?.decode?.().catch(() => {});
        });
      }
    }
  }

  const tweenTargetCcx = Math.round(-tween.x1 / PITCH_X);
  const tweenTargetCcy = Math.round(-tween.y1 / PITCH_Y);
  const tweenChangesCell = tween.active && (tweenTargetCcx !== ccx || tweenTargetCcy !== ccy);
  const tweeningAway = tween.active && (tween.x1 !== 0 || tween.y1 !== 0);

  // Show CTA when settled on any project card — (0,0) counts as a project when filters are active
  const settled = !(drag.active && drag.moved > 6) && !coasting && !tweenChangesCell && !zoomed && !wheeling && activeN > 0 && ((ccx !== 0 || ccy !== 0) || hasActiveFilters());
  if (settled !== ctaShown) {
    ctaShown = settled;
    clearTimeout(ctaTimer);
    if (settled) {
      ctaTimer = setTimeout(() => { cta.classList.add('show'); ctaBtn.setAttribute('tabindex', '0'); }, 250);
    } else {
      cta.classList.remove('show'); ctaBtn.setAttribute('tabindex', '-1');
    }
  }

  const introSettled = !(drag.active && drag.moved > 3) && !coasting && !tweeningAway && !zoomed && !wheeling && ccx === 0 && ccy === 0 && !hasActiveFilters();
  if (introSettled !== introShown) {
    introShown = introSettled;
    introEl.setAttribute('aria-hidden', String(!introSettled));
    introEl.classList.toggle('show', introSettled);
    introAboutBtn.setAttribute('tabindex', introSettled ? '0' : '-1');
    if (introSettled && !introPageLoadAnimDone) { introPageLoadAnimDone = true; triggerIntroAnimation(); }
  }

  // Watermark: fade in when intro card is off-centre, fade out when at centre
  const wmTarget = (ccx === 0 && ccy === 0 && !hasActiveFilters()) ? 0 : 1;
  const prevWm = wmOpacity;
  wmOpacity += (wmTarget - wmOpacity) * 0.07;
  if (Math.abs(wmOpacity - prevWm) > 0.001) {
    drawIntroCanvas(wmOpacity);
    introTexture.needsUpdate = true;
  }

  // Smooth mouse toward current position (~3% per frame); frozen at 0 while zoom panel is active or on mobile
  if (!zoomed && innerWidth > 640) {
    prlxX += (prlxTarget.x - prlxX) * 0.03;
    prlxY += (prlxTarget.y - prlxY) * 0.03;
  }

  // Background image parallaxes gently behind the cards
  if (bgMesh) {
    bgMesh.position.x = scroll.x * 0.03 + prlxX * -14;
    bgMesh.position.y = scroll.y * 0.03 + prlxY * -14;
  }

  renderer.render(scene, camera);
}

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.position.z = camDistance();
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  updateBgCover();
  computeLayout();
  buildPool();
  positionCTA();
  positionFilterIndicator(true);
  snapNearest();
  lastCenterKey = null;
  if (zoomed) { applyZoomGeometry(); setZoomTransform(zoomAnim.p); }  // refit to new viewport
});

animate();
setTimeout(() => {
  document.getElementById('loader').classList.add('hidden');
  const _startSlug = location.pathname.slice(1);
  const gridDelay = !_startSlug ? 3100 : 0; // home page only: wait for intro word animation
  setTimeout(() => requestAnimationFrame(() => canvas.classList.add('ready')), gridDelay);
}, 300);

// HTML project grid — SEO / progressive enhancement
(function buildProjectGrid() {
  const grid = document.querySelector('#project-grid-html .pg-grid');
  if (!grid) return;
  const sorted = [..._PROJECTS].sort((a, b) => {
    if (a.year === null && b.year === null) return 0;
    if (a.year === null) return 1;
    if (b.year === null) return -1;
    return b.year - a.year;
  });
  grid.innerHTML = sorted.map(p => {
    const yearTag = p.year ? `<span class="pg-card-year">${p.year}</span>` : '';
    const catTags = p.category.map(c => `<span class="pg-card-cat">${c}</span>`).join('');
    const clientHtml = p.client ? `<p class="pg-card-client">${p.client}</p>` : '';
    const csClass = p.casestudy ? ' pg-card--casestudy' : '';
    return `<article class="pg-card${csClass}" style="--pg-accent:${p.accentColourPrimary}">
  <a href="#${p.slug}" class="pg-card-link">
    <div class="pg-card-img"><img src="${p.src}" alt="${p.title}${p.client ? ' — ' + p.client : ''}" loading="lazy"></div>
    <div class="pg-card-overlay">
      <div class="pg-card-tags">${yearTag}${catTags}</div>
      <h2 class="pg-card-title">${p.title}</h2>
      ${clientHtml}
    </div>
  </a>
</article>`;
  }).join('');

  grid.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    e.preventDefault();
    const slug = link.getAttribute('href').slice(1);
    const p = _PROJECTS.find(pr => pr.slug === slug);
    if (p) openZoom(p);
  });
})();

// Deep-link: snap the grid and open the zoom for a project referenced in the URL path
const initSlug = (location.pathname !== '/archive') ? location.pathname.slice(1) : '';
if (initSlug) {
  const initProject = PROJECTS.find(p => p.slug === initSlug);
  if (initProject) {
    const idx = activeProjects.indexOf(initProject);
    let bestCell = null, bestDist = Infinity;
    for (let cy = -6; cy <= 6; cy++) {
      for (let cx = -6; cx <= 6; cx++) {
        // Skip (0,0) when not in casestudies mode — that cell renders the intro card, not a project
        if (cx === 0 && cy === 0 && !hasActiveFilters()) continue;
        if (projIndex(cx, cy) === idx) {
          const d = Math.hypot(cx, cy);
          if (d < bestDist) { bestDist = d; bestCell = { cx, cy }; }
        }
      }
    }
    if (!bestCell) bestCell = { cx: 1, cy: 0 };  // fallback: shouldn't happen with N≤26
    // Cancel any tween started by activateFilter (e.g. ?casestudies on load) so it can't
    // override the scroll position we're about to set.
    tween.active = false;
    scroll.x = rawScroll.x = -bestCell.cx * PITCH_X;
    scroll.y = rawScroll.y = -bestCell.cy * PITCH_Y;
    // Wait two frames so the render loop sets centrePxW/centrePxH before openZoom reads them
    requestAnimationFrame(() => requestAnimationFrame(() => openZoom(initProject, true)));
  }
}
