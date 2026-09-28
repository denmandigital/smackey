export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: 'Reel Canada promotes Canadian film through national education programs and workforce development initiatives, reaching tens of thousands of teachers and students, and millions of Canadians, each year.',
    url: 'https://reelcanada.ca'
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Reel Canada' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website' },
      { type: 'text', span: 6, heading: 'Year',    body: '2023' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Challenge',
    body: 'Reel Canada’s web platforms had grown unwieldy and disorganized over the years. Navigation was confusing, finding films in the catalogue was slow and complicated, and data, including the film library, lived in several places with no single source of truth.',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Approach',
    body: 'We started with a content and technology audit of the existing platforms. Working with key stakeholders, we used analytics and audience needs to identify the most valuable content. We then removed outdated and irrelevant material, reorganized the program structure, and moved topical content to social channels.',
  },

  // Outcome callout — full width
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    heading: 'Outcome',
    body: '<ul><li>500,000+ students reached in the first year</li><li>40% increase in educator sign-ups</li><li>National media partnership with CBC</li></ul>',
  },

  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/reelcanada/cs-reelcanada-responsive.png' },
  
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/reelcanada/cs-reelcanada-01a.png' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/reelcanada/cs-reelcanada-01b.png' },
  
  { type: 'video', span: 12, autoplay: true, src: 'assets/projects/reelcanada/cs-reelcanada_tableau.mp4' },
  
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/reelcanada/cs-reelcanada-careers.png' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/reelcanada/cs-reelcanada-careers-quiz.png' },


  
  // Full-width screenshots
  { type: 'image', span: 12, src: 'assets/projects/reelcanada/cs-reelcanada-education.png' },
  { type: 'image', span: 12, src: 'assets/projects/reelcanada/cs-reelcanada-02.jpg' },


  // Three equal images — 4 + 4 + 4
  // { type: 'image', span: 4, src: 'assets/projects/reelcanada/cs-reelcanada-07.jpg' },
  // { type: 'image', span: 4, src: 'assets/projects/reelcanada/cs-reelcanada-08.jpg' },
  // { type: 'image', span: 4, src: 'assets/projects/reelcanada/cs-reelcanada-09.jpg' },

  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/10.66', src: 'https://player.vimeo.com/video/810732633' },
];
