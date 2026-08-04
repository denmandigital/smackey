// SMBlock.js
// The SM monogram (from s.svg / m.svg) mapped flat onto all six faces of a
// cube — four sides alternating light-grey S / dark-grey M, S on top,
// M on the bottom. Letters are flat vector shapes: no extrusion, no bevels.
//
// Pure three.js core — no addons or loaders required.
//
// Usage:
//   import { createSMBlock } from './SMBlock.js';
//   const block = createSMBlock();
//   scene.add(block);
//   // in your render loop: block.rotation.y += 0.005;

import * as THREE from 'three';

// Outlines traced from s.svg / m.svg (viewBox 0 0 60 60), straight segments only.
const VIEW = 60;

const M_OUTLINE = [
  [60, 60], [42, 60], [42, 18], [39, 18], [39, 60], [21, 60], [21, 18],
  [18, 18], [18, 60], [0, 60], [0, 0], [60, 0],
];

const S_OUTLINE = [
  [60, 18], [18, 18], [18, 21], [60, 21], [60, 60], [0, 60], [0, 42],
  [42, 42], [42, 39], [0, 39], [0, 0], [60, 0],
];

const DEFAULT_COLORS = {
  s: 0xeae8e4,      // S letter (s.svg fill is #9D9C98)
  m: 0x191a1d,      // dark grey (matches m.svg fill)
  block: 0xeae8e4,  // block body — matches the page background
};

function letterGeometry(outline, scale) {
  const shape = new THREE.Shape();
  outline.forEach(([x, y], i) => {
    const px = (x - VIEW / 2) * scale;
    const py = (VIEW / 2 - y) * scale; // flip SVG y-down to three.js y-up, centered
    if (i === 0) shape.moveTo(px, py);
    else shape.lineTo(px, py);
  });
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

/**
 * @param {object} [options]
 * @param {number} [options.size=1]      Edge length of the cube.
 * @param {number} [options.coverage=57/60] Letter size as a fraction of the face.
 *   The default insets each letter 1.5 SVG units per side, so the gap between
 *   letters across a cube edge is 3 units — the same as the slots in the M.
 * @param {object} [options.colors]      { s, m, block } hex colors.
 * @returns {THREE.Group}
 */
export function createSMBlock({
  size = 1,
  coverage = 57 / 60,
  colors = DEFAULT_COLORS,
} = {}) {
  const group = new THREE.Group();

  // Unlit so the body renders at exactly colors.block from every angle —
  // the slot lines inside the letters stay flush with the page background.
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(size, size, size),
    new THREE.MeshBasicMaterial({ color: colors.block })
  );
  group.add(base);

  const scale = (coverage * size) / VIEW;
  const geometries = {
    S: letterGeometry(S_OUTLINE, scale),
    M: letterGeometry(M_OUTLINE, scale),
  };
  const materials = {
    S: new THREE.MeshStandardMaterial({ color: colors.s, roughness: 0.7 }),
    M: new THREE.MeshStandardMaterial({ color: colors.m, roughness: 0.7 }),
  };

  const half = size / 2 + size * 0.001; // sit just off the face to avoid z-fighting

  // Six faces: [letter, position, rotation]
  const faces = [
    ['S', [0, 0, half], [0, 0, 0]],                    // front  (+Z)
    ['M', [half, 0, 0], [0, Math.PI / 2, 0]],          // right  (+X)
    ['S', [0, 0, -half], [0, Math.PI, 0]],             // back   (-Z)
    ['M', [-half, 0, 0], [0, -Math.PI / 2, 0]],        // left   (-X)
    ['S', [0, half, 0], [-Math.PI / 2, 0, 0]],         // top    (+Y)
    ['M', [0, -half, 0], [Math.PI / 2, 0, 0]],         // bottom (-Y)
  ];

  faces.forEach(([letter, position, rotation]) => {
    const mesh = new THREE.Mesh(geometries[letter], materials[letter]);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    group.add(mesh);
  });

  return group;
}
