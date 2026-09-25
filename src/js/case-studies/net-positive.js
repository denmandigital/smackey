export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: 'Foran Mining is a copper-zinc-gold-silver exploration and development company, committed to supporting a greener future, empowering communities and creating circular economies, while also safeguarding the environment.',
    url: 'https://foranmining.com',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Foran Mining' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website' },
      { type: 'text', span: 6, heading: 'Year',    body: '2022' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI / brand design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Challenge',
    body: 'Foran had a desire to stand out from their competitors in a traditionally staid resource sector. The company wanted to better express their company values and share their unique vision for sustainable mining with investors, stakeholders, and indigenous partners.',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Approach',
    body: 'Their novel approach to mining based on sustainable value chains and circular economies called for a brand that reflected the boldness of their ambitions. Our strategy narrowed in on key concepts of strength, commitment, and the infinite finding its simplest form in a ring symbol used in their logotype and elsewhere.',
  },

  // Outcome callout
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    heading: 'Outcomes',
    body: '<ul><li>To reach key audiences including investors and potential employees, a balance was struck between high impact visuals conveying emotion, to clarifying technical reports, metallurgical results and feasibility studies.</li><li>Foran’s McIllvenna Bay project was listed by the federal government as a project of national importance and referred to the Major Projects Office for streamlined regulatory and permitting support.</li><li>In 2026 Foran Mining was aquired by Elodrado Gold.</li></ul>',
  },

  { type: 'image', span: 12, src: 'assets/projects/foran/foran-responsive.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/foran/foran-logotype.png' },
  { type: 'spacer', span: 12, height: 30 },
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    body: '<h2>Colour Palette</h2><p>The brand palette is driven by an energetic citrus orange, conveying enthusiasm, creativity, success, change, determination, and balance. It’s paired with neutral black, white, and greys. A secondary palette of blues and ivory provide accents.</p>',
  },
  
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/foran/foran-palette.png' },
  
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/foran/foran-typography.png' },

  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    body: '<h2>Typography</h2><p>The same geometric sans typeface used in the wordmark is used throughout their written assets. Four highly readable weights in title and sentence case drive type systems developed to create effective information hierarchies and dynamic layouts on both screen and in print.</p>',
  },
  { type: 'spacer', span: 12, height: 40 },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/foran/foran-home.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/foran/foran-ethos.jpg' },
  { type: 'image', span: 12, src: 'assets/projects/foran/foran-screens-perspective.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/8.5', src: 'https://player.vimeo.com/video/841292720' },
  { type: 'image', span: 5, src: 'assets/projects/foran/foran-poster.png' },
  { type: 'image', span: 7, src: 'assets/projects/foran/foran-poster-details.png', contain: true },
  
];