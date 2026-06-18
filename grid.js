import * as THREE from 'three';

/* ============================================================
   TUNABLES
============================================================ */
const ITEM_W = 360;   // px — geometry/texture aspect only (16:10)
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
  const cW = CENTRE_FRAC * innerWidth;              // centred item rendered width
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
   PORTFOLIO DATA
   Add client, title, cat, and optionally overview/challenge/approach/outcome
   to each entry. Leave fields as '' to show placeholder text in the case study.
============================================================ */
const PALETTE = [
  ['#1b3a4b', '#3b6978'], ['#4a2545', '#a4508b'], ['#2d3142', '#bfc0c0'],
  ['#0b3d2e', '#1e8a5b'], ['#3a2618', '#c08552'], ['#1a1a2e', '#6c5ce7'],
  ['#37123c', '#71677c'], ['#102542', '#f87060'], ['#222a2f', '#d9b26a'],
  ['#1f2d3d', '#5bc0be'], ['#2b2118', '#b08968'], ['#0f1f2e', '#48a9a6'],
];

const PROJECTS = [
  { file: 'index-addiction.jpg',            client: 'Centre for Motivation and Change',              title: 'Addiction. The Next Step',            cat: ''                 },
  { file: 'index-backstory.jpg',            client: 'APTN / Mooswa Films',              title: 'Backstory',            cat: ''                 },
  { file: 'index-bchydro.jpg',              client: 'BC Hydro',      title: 'History Revealed',             cat: ''                 },
  { file: 'index-capturingreality.jpg',     client: 'National Film Board of Canada',              title: 'Capturing Reality',    cat: ''                 },
  { file: 'index-cbc-vancouver.jpg',        client: 'CBC Vancouver / Rethink',           title: 'Vancouver’s Talking',        cat: ''                 },
  { file: 'index-food-for-thought.jpg',     client: 'APTN / Mooswa Films',              title: 'Food for Thought',     cat: ''                 },
  { file: 'index-foran.jpg',                client: 'Foran Mining',              title: 'Net Positive',                cat: ''                 },
  { file: 'index-frontier.jpg',             client: 'Discovery / Netflix',              title: 'Frontier | Dark Providence',             cat: ''                 },
  { file: 'index-hunting-in-canada.jpg',    client: 'APTN / Mooswa Films',              title: 'Hunting in Canada',    cat: 'Editorial'        },
  { file: 'index-kennys.jpg',               client: 'Documentary / Relevision',              title: "Kenny's Jazz Pad",              cat: ''                 },
  { file: 'index-legacies150.jpg',          client: 'National Film Board of Canada',              title: 'Legacies 150',         cat: 'Brand Strategy'   },
  { file: 'index-myrefugeeclaim.jpg',       client: 'Kinbrace / UNHCR',              title: 'My Refugee Claim',     cat: 'Digital Product'  },
  { file: 'index-nar.jpg',                  client: 'APTN / Realworld Media',           title: 'Norther Air Rescue',                  cat: ''                 },
  { file: 'index-nativeplanet.jpg',         client: 'APTN / Realworld Media',              title: 'Native Planet',        cat: ''                 },
  { file: 'index-pinepoint.jpg',            client: 'National Film Board of Canada',              title: 'Pinepoint',            cat: 'Data Story'       },
  { file: 'index-powertogive.jpg',          client: 'Power to Give Foundation',              title: 'Philanthropy Reimagined',        cat: ''                 },
  { file: 'index-powertothepeople.jpg',     client: 'APTN / Realworld Media',              title: 'Power to the People',  cat: ''                 },
  { file: 'index-reelcanada.jpg',           client: 'Reel Canada',   title: 'A World of Canadian Film',          cat: ''                 },
  { file: 'index-similkameen.jpg',          client: 'National Film Board',              title: 'Similkameen Crossroads',          cat: 'Environmental'    },
  { file: 'index-smashball.jpg',            client: 'Volleyball Canada',              title: 'Smashball Trainer',            cat: ''                 },
  { file: 'index-stashing-their-cash.jpg',  client: 'CBC News',              title: 'Stashing Their Cash',  cat: ''                 },
  { file: 'index-the-conversation.jpg',     client: 'Telus / FNHA / Realworld Media',              title: 'The Conversation',     cat: ''                 },
  { file: 'index-the-hub.jpg',              client: 'Centre for Civic Engagement',              title: 'The Hub',              cat: ''                 },
  { file: 'index-truth-and-lies.jpg',       client: 'CBC News',              title: 'Truth & Lies',       cat: 'Editorial'        },
  { file: 'index-uninterrupted.jpg',        client: 'Canada Wild Productions / Agentic',              title: 'Uninterrupted',        cat: ''                 },
  { file: 'index-waterworlds.jpg',          client: 'APTN / Water Worlds Productions',              title: 'Water Worlds',          cat: 'Environmental'    },
].map(p => ({ ...p, src: 'images/' + p.file }));

const N = PROJECTS.length;

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
  const titleSize = w * 0.066, clientSize = w * 0.026, titleClientGap = w * 0.010;
  const totalH = titleSize + (p.client ? titleClientGap + clientSize : 0);
  let ty = ch / 2 - totalH / 2;
  x.textAlign = 'center'; x.textBaseline = 'top';
  x.fillStyle = '#fff';
  x.font = `600 ${titleSize}px Helvetica, Arial`;
  x.fillText(p.title, cw / 2, ty);
  ty += titleSize + titleClientGap;
  if (p.client) {
    x.fillStyle = 'rgba(255,255,255,.6)';
    x.font = `600 ${clientSize}px Helvetica, Arial`;
    x.fillText(p.client.toUpperCase(), cw / 2, ty);
  }
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
scene.background = new THREE.Color(0xf1efe8);

const camera = new THREE.PerspectiveCamera(FOV, innerWidth / innerHeight, 1, 6000);
// Distance chosen so at z=0 the visible height == innerHeight px  →  1 world unit ≈ 1px.
function camDistance() { return (innerHeight / 2) / Math.tan(THREE.MathUtils.degToRad(FOV) / 2); }
camera.position.set(0, 0, camDistance());
camera.lookAt(0, 0, 0);

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
const projIndex = (cx, cy) => pmod(cx * 31 + cy * 131, N);

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
  if (zoomed) return;      // allow scroll inside #zoomScroll when overlay is open
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
  const p = pt(e);
  mouse.x = (p.x / innerWidth) * 2 - 1;
  mouse.y = -(p.y / innerHeight) * 2 + 1;
});
canvas.addEventListener('click', (e) => {
  if (zoomed || drag.moved > 6) return;
  raycaster.setFromCamera(mouse, camera);
  const hit = raycaster.intersectObjects(pool, false)[0];
  if (!hit) return;
  const c = hit.object.userData.cell;
  const ccx = Math.round(-scroll.x / PITCH_X);
  const ccy = Math.round(-scroll.y / PITCH_Y);
  if (c.x === ccx && c.y === ccy) openZoom(centreProject);   // centre card → zoom
  else startTween(-c.x * PITCH_X, -c.y * PITCH_Y);           // otherwise snap to centre
});

addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeZoom(); return; }
  if (zoomed) return;
  if (e.key === 'Enter') { openZoom(centreProject); return; }
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

function buildCaseStudy(p) {
  return `
    <p class="cs-lead">${p.overview || 'Case study content coming soon. Add an <code>overview</code> field to the project entry in the PROJECTS array, or replace this with imported content.'}</p>
    <div class="cs-grid">
      <div class="cs-block"><h3>Challenge</h3><p>${p.challenge || 'Describe the brief, constraints, or problem space here.'}</p></div>
      <div class="cs-block"><h3>Approach</h3><p>${p.approach || 'Describe the creative or strategic approach taken.'}</p></div>
      <div class="cs-block"><h3>Outcome</h3><p>${p.outcome || 'Share results, impact, or what was delivered.'}</p></div>
      <div class="cs-block"><h3>Category</h3><p>${p.cat || '—'}</p></div>
    </div>`;
}

let centreProject = PROJECTS[0];
let centrePxW = CENTRE_FRAC * innerWidth;   // actual screen px width of centre card (updated per frame)
let centrePxH = centrePxW * (ITEM_H / ITEM_W);
let zoomed = false;          // true while open OR animating (blocks grid interaction)
let ctaShown = false;

// rAF-driven zoom: p = 0 (matches the centre card) → 1 (full inset)
const zoomAnim = { active: false, p: 0, dir: 1, dur: 0.55 };
let zoomCard = { tx: 0, ty: 0, sx: 1, sy: 1 };

// Place the button at the bottom-centre of the centre card
function positionCTA() {
  const cH = CENTRE_FRAC * innerWidth * (ITEM_H / ITEM_W);
  cta.style.top = ((innerHeight + cH) / 2 - 34) + 'px';
}

// Store card start + full-viewport end geometry for the FLIP animation
function applyZoomGeometry() {
  const cW = centrePxW, cH = centrePxH;
  zoomCard = {
    l0: (innerWidth  - cW) / 2,  t0: (innerHeight - cH) / 2,  w0: cW,  h0: cH,
    l1: GAP_C,                   t1: GAP_C,
    w1: innerWidth  - 2 * GAP_C, h1: innerHeight - 2 * GAP_C,
  };
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

function smoothScrollTo(el, target, ms) {
  const start = el.scrollTop, dist = target - start, t0 = performance.now();
  (function step(now) {
    const p = Math.min((now - t0) / ms, 1);
    const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    el.scrollTop = start + dist * e;
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}

function openZoom(p) {
  if (zoomed || !p) return;
  zoomed = true;
  document.body.classList.remove('hovering');
  zoom.style.backgroundImage = `url("${p.src}")`;
  zoomCat.textContent = p.cat || '';
  zoomTitle.textContent = p.title;
  zoomClient.textContent = p.client || '';
  zoomContent.innerHTML = buildCaseStudy(p);
  zoomContent.classList.remove('visible');
  zoomScroll.scrollTop = 0;
  zoomMeta.style.transition = 'none';
  zoomMeta.style.opacity = '0';
  applyZoomGeometry();
  zoomAnim.p = 0; setZoomTransform(0);
  zoom.style.opacity = '1';
  zoom.classList.add('open');
  zoomAnim.dir = 1; zoomAnim.active = true;
}

function closeZoom() {
  if (!zoomed || zoomAnim.dir < 0) return;
  zoomContent.classList.remove('visible');
  zoomMeta.style.transition = 'none';
  zoomMeta.style.opacity = '0';
  smoothScrollTo(zoomScroll, 0, 400);
  // Close target is the default (non-hovered) card size
  const cW = CENTRE_FRAC * innerWidth, cH = cW * (ITEM_H / ITEM_W);
  zoomCard.l0 = (innerWidth - cW) / 2;
  zoomCard.t0 = (innerHeight - cH) / 2;
  zoomCard.w0 = cW; zoomCard.h0 = cH;
  zoomAnim.dir = -1; zoomAnim.active = true;
}

ctaBtn.addEventListener('click', () => openZoom(centreProject));
zoomClose.addEventListener('click', closeZoom);
positionCTA();

/* ============================================================
   RENDER LOOP
============================================================ */
const nowEl = document.getElementById('now');
const nowTitle = document.getElementById('nowTitle');
const nowMeta = document.getElementById('nowMeta');
let lastCenterKey = null;
let lastT = performance.now();

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
      zoomMeta.style.transition = '';
      zoomMeta.style.opacity = '1';
      setTimeout(() => smoothScrollTo(zoomScroll, zoomScroll.clientHeight / 2, 2000), 500);
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
  const hit = (!drag.active) ? raycaster.intersectObjects(pool, false)[0] : null;
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
    m.position.set(x, y, z);
    m.rotation.y = -Math.atan(2 * CONVEX * x);
    m.rotation.x = Math.atan(2 * CONVEX * y);

    const fall = falloff(Math.hypot(x, y));

    // Hover lift
    const target = (m === hovered) ? 1 : 0;
    m.userData.hover += (target - m.userData.hover) * 0.18;
    const s = S0 * fall * (1 + m.userData.hover * 0.05);
    m.scale.set(ITEM_W * s, ITEM_H * s, 1);
    if (cellX === ccx && cellY === ccy) { centrePxW = ITEM_W * s; centrePxH = ITEM_H * s; }
    m.material.uniforms.uRadius.value = RADIUS / S0;
    m.material.uniforms.uHover.value = m.userData.hover;
    m.material.uniforms.uFade.value = 1;   // edge fade handled by the body::before vignette

    // Assign the right project only when this slot's cell changes
    const key = cellX + ',' + cellY;
    if (m.userData.key !== key) {
      m.userData.key = key;
      m.userData.cell = { x: cellX, y: cellY };
      m.material.uniforms.map.value = textures[projIndex(cellX, cellY)];
    }
  }

  // Bottom HUD reflects the centred project
  const centerKey = ccx + ',' + ccy;
  if (centerKey !== lastCenterKey) {
    lastCenterKey = centerKey;
    centreProject = PROJECTS[projIndex(ccx, ccy)];
    nowTitle.textContent = centreProject.title;
    nowMeta.textContent = centreProject.cat;
  }

  // Show the "See Case Study" button only when settled on a centre card
  const settled = !drag.active && !tween.active && !zoomed && !wheeling;
  if (settled !== ctaShown) { ctaShown = settled; cta.classList.toggle('show', settled); }

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
  lastCenterKey = null;
  if (zoomed) { applyZoomGeometry(); setZoomTransform(zoomAnim.p); }  // refit to new viewport
});

animate();
setTimeout(() => document.getElementById('loader').classList.add('hidden'), 300);
