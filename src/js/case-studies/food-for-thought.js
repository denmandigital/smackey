export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>APTN’s Moosemeat & Marmalade, hosts Art Napoleon and Dan Hayes create amazing dishes that reflect their diverse cultures and culinary traditions. Their deep love of food and the people they feed inspired them to explore where their ingredients come from and how they are produced.</p><p><em>Food for Thought</em> is an in-depth exploration of how food is produced in Canada. It’s comprised of four “deep-dive” interactive stories, each examining an essential Canadian food source. Dan Hayes travels to the west coast to look at Salmon fishing and aquaculture, and to Eastern Canada to explore the dairy industry, while Art Napoleon visits the central prairies to learn about grain production, and to Canada’s far-north to report on wild and traditional foods.</p>',
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
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design</li><li>Web development</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/foodforthought/foodforthought-responsive.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/foodforthought/fft_wireframes.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/8.75', src: 'https://player.vimeo.com/video/704697293' },
  
  
  { type: 'image', span: 12, src: 'assets/projects/foodforthought/screens-perspective_fft.jpg' },
  
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/10', src: 'https://player.vimeo.com/video/285148959' },
  
];