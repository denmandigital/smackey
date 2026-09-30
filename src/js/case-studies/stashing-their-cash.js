export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>In one of the biggest ever leaks of financial data, the International Consortium of Investigative Journalists released data on over 120,000 secret offshore entities in 10 different jurisdictions to their cross-border news teams at CBC News, The Guardian, Le Monde, the Washington Post, and others. This resulted in billions of dollars recovered from offshore tax cheats.</p><p>Using simplified, non-financial language, clarifying information graphics, and an engaging game layer that puts the user into the role of the investor, this interactive shows how the wealthy move money offshore in order to evade taxation, and how they bring it back how without being detected, in six simple steps.</p>',
    url: '',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'CBC News' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'App' },
      { type: 'text', span: 6, heading: 'Year',    body: '2016' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design</li><li>Web development</li></ul>' },
    ],
  },

  { type: 'image', span: 12, src: 'assets/projects/stashingtheircash/responsive_stashing.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/stashingtheircash/screens-perspective_stashing.jpg' },

  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/153203163?autopause=0' },
  
  
];