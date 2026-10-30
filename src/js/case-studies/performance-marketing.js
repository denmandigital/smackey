export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>Allocadia began as a fast-growing MarTech startup based in Vancouver. Its Marketing Performance Management (MPM) platform helps teams build marketing plans, manage marketing investments, and measure results. Over 16,000 marketers use it to manage billions of dollars in global marketing budgets.</p><p>Denman supported Allocadia’s marketing team for six years. Our work together included creating online marketing initiatives, web-based tools, and stand-alone special interactive projects. Primarily, though, we provided ongoing design and technical development of their corporate website, working together with them throughout the year to refine and optimize the platform.</p><p>In 2020, I led the redesign of the website from the ground up, implementing the company’s new visual identity and brand system. I reimagined the information architecture and user experience around six new platform pillars, and created a refreshed user interface with subtle motion design.</p><p>BrandMaker acquired Allocadia in 2021, and the combined business rebranded as UpTempo in 2022.</p>',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Allocadia' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website' },
      { type: 'text', span: 6, heading: 'Years',    body: '2016—2021' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Digital strategy</li><li>UX / UI design</li><li>Web development</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },
  { type: 'image', span: 12, src: 'assets/projects/allocadia/allocadia-responsive.png' },
  { type: 'image', span: 12, src: 'assets/projects/allocadia/allocadia_ux.png' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/allocadia/allocadia_single-image.png' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/allocadia/allocadia_sidebyside.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/5.4', src: 'https://player.vimeo.com/video/704676668?autopause=0' },
  
  { type: 'image', span: 12, src: 'assets/projects/allocadia/screens-perspective_allocadia.jpg' },
  
];