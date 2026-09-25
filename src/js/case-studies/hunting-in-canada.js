export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: 'APTN’s Moosemeat & Marmalade, hosts Art Napoleon and Dan Hayes create amazing dishes that reflect their diverse cultures and culinary traditions. They are both passionate cooks with deep love of food and a keen interest in where it comes from. Both men also grew up hunting and the show often follows them into the field to procure 100% natural food. Exploring these themes, this experience explores the history and changing nature of hunting in Canada.',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'APTN / Mooswa Films' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Interactive Storytelling' },
      { type: 'text', span: 6, heading: 'Year',    body: '2018' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/huntingincanada/hic-responsive.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/721572323' },
  
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/huntingincanada/hic-guide-entry-1.png' },
  
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/huntingincanada/hic-guide-entry-2.png' },
  
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    body: 'Each entry in the Field Guide features well-researched written content, and custom illustrations, habitat maps, and small interactive modules.',
  },

  { type: 'image', span: 12, src: 'assets/projects/huntingincanada/hic-illustrations.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/huntingincanada/screens-perspective_hunting.jpg' },
  
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/10.8', src: 'https://player.vimeo.com/video/341406705' },
  
];