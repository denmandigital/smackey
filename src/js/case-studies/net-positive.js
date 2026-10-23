export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: 'Foran Mining is a copper-zinc-gold-silver exploration and development company focused on sustainable mining, community partnership and circular economies. They are developing the world’s first carbon neutral copper mine at McIlvenna Bay in Saskatchewan, Canada.',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Foran Mining' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Brand Design' },
      { type: 'text', span: 6, heading: 'Year',    body: '2022' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Digital strategy</li><li>UX / UI / brand design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Challenge',
    body: 'In a traditionally staid resource sector, Foran wanted to distinguish itself and communicate its vision for sustainable mining to investors, stakeholders, prospective employees, and Indigenous partners. Foran needed a website that balanced bold ambition with the technical detail investors rely on.',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Approach',
    body: 'Foran’s approach to mining is built on sustainable value chains and circular economies. Working with Foran’s appointed steering committee, our strategy centred on key concepts of strength, commitment, and the infinite.',
  },

  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Solution',
    body: '<p>A ring symbol was designed to express Foran’s brand ideas and the future the company is working to create. Flexible enough for many uses, it finds its principal expression as the “o” in Foran’s wordmark.</p><p>I directed the brand identity, user experience, and visual design of the website. Hands-on, I designed and built an interactive scrollytelling experience for the Ethos section, and created an illustrated, interactive map explaining Foran’s mining infrastructure.</p>',
  },

  // Outcome callout
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Outcomes',
    body: '<ul><li>A brand and website that conveyed Foran’s ambitions by balancing high-impact, emotional visuals with technical reports, metallurgical results and feasibility studies</li><li>In September 2025, the federal government referred Foran’s McIlvenna Bay project to the Major Projects Office as one of five potential projects of national interest</li><li>In April 2026, Eldorado Gold acquired Foran in a C$3.8-billion deal</li></ul>',
  },
  { type: 'spacer', span: 12, height: 40 },
  { type: 'image', span: 12, src: 'assets/projects/foran/foran-responsive.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/foran/foran-logotype.png' },
  { type: 'spacer', span: 12, height: 30 },
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    center: true,
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
    center: true,
    variant: 'callout',
    body: '<h2>Typography</h2><p>The same geometric sans typeface used in the wordmark is used throughout their written assets. Four highly readable weights in title and sentence case drive type systems developed to create effective information hierarchies and dynamic layouts on both screen and in print.</p>',
  },
  { type: 'spacer', span: 12, height: 40 },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/foran/foran-home.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/foran/foran-ethos.jpg' },
  { type: 'image', span: 12, src: 'assets/projects/foran/foran-screens-perspective.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/8.45', src: 'https://player.vimeo.com/video/841292720?autopause=0' },
  { type: 'image', span: 5, src: 'assets/projects/foran/foran-poster.png' },
  { type: 'image', span: 7, src: 'assets/projects/foran/foran-poster-details.png', contain: true },
  
];