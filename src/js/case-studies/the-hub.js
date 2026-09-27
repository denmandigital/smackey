export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>The Centre for Civic Engagement is a charity that aims to generate dialogue and debate on Canada’s future. They organize the Munk Debates – a high profile public lecture and educational discussion series on major public policy issues facing Canada and the world.</p><p>In 2021 they brought together leading Canadian journalists, pundits, and editors to create <em>The Hub</em>, a digital first publication providing original news and analysis exploring economics, culture, technology, geopolitics, public policy, law and governance, and a platform for vigorous debate among competing visions of Canada’s future.</p>',
    url: '',
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
      { type: 'text', span: 6, heading: 'Year',    body: 'yyyy' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI / brand design direction</li><li>Technical direction</li></ul>' },
    ],
  },

  { type: 'image', span: 12, src: 'assets/projects/xxx/xxx-responsive.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/1008938152' },
  
  { type: 'image', span: 12, src: 'assets/projects/xxx/screens-perspective_xxx.jpg' },
  
];