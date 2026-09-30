export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>Text goes here</p>',
    url: ''
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Client Name' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Agency Name' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Digital Publication' },
      { type: 'text', span: 6, heading: 'Year',    body: '----' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    heading: 'Challenge',
    body: '<p>Challenge text...</p>',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Approach',
    body: '<p>Approach text...</p>',
  },

  // Outcome callout
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Outcomes',
    body: '<ul><li>List item 1</li><li>List item 2</li><li>List item 3</li></ul>',
  },


  { type: 'spacer', span: 12, height: 40 },
  { type: 'image', span: 12, src: 'assets/projects/xxx/xxx-responsive.png' },

  {
    type: 'text',
    span: 12,
    variant: 'callout',
    body: 'Callout text.',
  },

  { type: 'vimeo', span: 12, aspect: '16/11.15', autoplay: true, src: 'https://player.vimeo.com/video/812203483?autopause=0' },
  
  { type: 'vimeo', span: 12, aspect: '16/10.66', src: 'https://player.vimeo.com/video/812199615' },
  
  
];
