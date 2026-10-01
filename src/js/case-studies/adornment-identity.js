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
      { type: 'text', span: 6, heading: 'Client',  body: 'The BC Society for the Museum of Original Costume' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Interactive Story' },
      { type: 'text', span: 6, heading: 'Year',    body: '2026' },
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


  { type: 'image', span: 12, src: 'assets/projects/adornment/adornment-responsive.png' },
  
  { type: 'vimeo', span: 12, aspect: '16/10', autoplay: true, src: 'https://player.vimeo.com/video/1231806231?autopause=0' },
  
  { type: 'spacer', span: 12, height: 40 },

  {
    type: 'text',
    span: 6,
    spanSm: 12,
    center: true,
    variant: 'callout',
    body: '<h2>Dressed for History</h2><p><em>Women’s fashion 1750–2000</em></p><p>Just as fashion constantly evolves, it is continuously informed and held together by a common thread: the past. This exhibit highlights the importance of collecting and preserving the clothing of the past in order to inform the future.</p>',
  },

  { type: 'video', span: 6, spanSm: 12, aspect: '16/10', autoplay: true, src: 'assets/projects/adornment/dressed-for-history-compressed.mp4' },
  { type: 'spacer', span: 12, height: 40 },
  { type: 'vimeo', span: 6, spanSm: 12, aspect: '16/10', autoplay: true, src: 'https://player.vimeo.com/video/1231801301?autopause=0' },
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    center: true,
    variant: 'callout',
    body: '<h2>Deconstructing Worth</h2><p><em>The making of early haute couture</em><p>How clothing is made constantly evolves, and can tell us much about a particular place and time. This exhibit invites users to examine how one historical couture dress—an evening gown designed in Paris by Charles Frederick Worth in 1900—was constructed.</p>',
  },
  { type: 'spacer', span: 12, height: 40 },
  
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    center: true,
    variant: 'callout',
    body: '<h2>Mirror Image</h2><p><em>Clothing as a reflection of the times</em><p>This exhibit compares two dresses from distinct periods in fashion history, examining their design, materials and construction within the social, political and cultural context of each era.</p>',
  },
  { type: 'vimeo', span: 6, spanSm: 12, aspect: '16/10', autoplay: true, src: 'https://player.vimeo.com/video/1231801037?autopause=0' },
  
  { type: 'spacer', span: 12, height: 40 },

  { type: 'vimeo', span: 6, spanSm: 12, aspect: '16/10', autoplay: true, src: 'https://player.vimeo.com/video/1231847664?autopause=0' },
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    center: true,
    variant: 'callout',
    body: '<h2>Woven Together</h2><p><em>Stories that unfold the fabric of the past</em><p>Historical artefacts gain much of their power from the stories attached to them. The garments in this exhibit are unremarkable on their own, but take on historical significance through the experiences of the people who wore them.</p>',
  },
  { type: 'spacer', span: 12, height: 40 },


  
  { type: 'image', span: 12, src: 'assets/projects/adornment/ai-screens-perspective.jpg' },

  
];
