export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p><em>Power to the People</em> is a television documentary series exploring how indigenous people, values and wisdom are guiding the way to a sustainable, clean energy future. Host Melina Laboucan Massimo takes viewers to indigenous communities across Canada to explore the inspired clean energy initiatives they are developing, and see how they’re empowering themselves and their way of life.</p><p>The companion digital platform promotes the series and hosts a collection of in-depth through a collection of fun, educational interactive activities aimed at creating better informed energy consumers.</p>',
    url: 'https://powertothepeople.tv',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'APTN / Real World Films' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website' },
      { type: 'text', span: 6, heading: 'Year',    body: '2019' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design</li><li>Web development</li></ul>' },
    ],
  },
  
  { type: 'image', span: 12, src: 'assets/projects/powertothepeople/pttp-responsive.png' },
  
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/powertothepeople/pttp-screen-1.png' },
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/powertothepeople/pttp-screen-2.png' },
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/powertothepeople/pttp-screen-3.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/powertothepeople/pttp-carbon-calculator.jpg' },
  { type: 'image', span: 12, src: 'assets/projects/powertothepeople/pttp-quiz.jpg' },
  { type: 'image', span: 12, src: 'assets/projects/powertothepeople/pttp-poll.jpg' },

  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/8.75', src: 'https://player.vimeo.com/video/724653523' },
];