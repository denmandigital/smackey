export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>The Documentary Organization of Canada (DOC) is the collective voice of Canada’s independent documentary creators, representing six regional chapters from coast to coast.</p><p>Working with DOC’s executive team and regional boards, we rethought how their website could better serve their membership. The new site gives members tools to connect with each other, find production support and crew, register for professional workshops and events, and get their films in front of distributors and audiences. A new membership management system consolidated member management, events, and communications into one place. Membership has more than doubled since launch.</p>',
    url: 'https://docorg.ca',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Documentary Organization of Canada' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website' },
      { type: 'text', span: 6, heading: 'Year',    body: '2021' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  // { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/doc/doc-responsive.png' },
  { type: 'image', span: 12, src: 'assets/projects/doc/doc-ux.png' },
  { type: 'image', span: 12, src: 'assets/projects/doc/doc-screens.png' },
  
  // Video
  // { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/560618015?autopause=0' },
  
  { type: 'image', span: 12, src: 'assets/projects/doc/doc-screens-perspective.jpg' },
  
];