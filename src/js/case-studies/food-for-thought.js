export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p><em>Moosemeat & Marmalade</em> is an APTN original series following bush cook Art Napoleon and classically trained British chef Dan Hayes as they explore food, culture, and tradition across Canada. <em>Food for Thought</em> is an interactive documentary companion to Season 3, examining how the foods Canadians eat are grown, harvested, and distributed, and what’s at stake when those systems break down.</p>',
    url: 'https://moosemeatandmarmalade.com/foodforthought/',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'APTN / Mooswa Films' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Interactive Documentary' },
      { type: 'text', span: 6, heading: 'Year',    body: '2018' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design</li><li>Technical direction</li></ul>' },
    ],
  },

  { type: 'spacer', span: 12, height: 40 },
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    heading: 'Challenge',
    body: '<p>Designed to reach a broader audience, the challenge was building an interactive companion experience that matched the warmth, humour, and curiosity of Art and Dan’s on-screen presence while delivering substantive content on a complex subject without feeling heavy or preachy.</p>',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 7,
    spanMd: 12,
    variant: 'callout',
    heading: 'Approach',
    body: '<p>I led experience design and directed the UI and technical delivery. The experience unfolded across four regional chapters, each mixing documentary video, researched facts, infographics, and animation as users scrolled from problem to solution, ending with concrete ways to take action. Dan explored salmon fishing and aquaculture on the west coast and the dairy industry in Eastern Canada, while Art reported on prairie grain production and wild and traditional foods in Canada’s far north. Their voices ran throughout, keeping the tone grounded in the show’s blend of humour, tradition, and genuine curiosity.</p>',
  },

  // Outcome callout
  {
    type: 'text',
    span: 5,
    spanMd: 12,
    variant: 'callout',
    heading: 'Outcomes',
    body: '<p><em>Food For Thought</em> was well received by audiences and the industry alike. The project took home an Applied Arts Award for Best Entertainment, Arts and Tourism (Single), and earned Canadian Screen Award nominations for Best Cross-Platform Project and Best Host, Web Series or Program.</p>',
  },


// It’s comprised of four “deep-dive” interactive stories, each examining an essential Canadian food source. Dan Hayes travels to the west coast to look at Salmon fishing and aquaculture, and to Eastern Canada to explore the dairy industry, while Art Napoleon visits the central prairies to learn about grain production, and to Canada’s far-north to report on wild and traditional foods.


  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/foodforthought/foodforthought-responsive.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/8.75', src: 'https://player.vimeo.com/video/704697293?autopause=0' },
  
  { type: 'image', span: 12, src: 'assets/projects/foodforthought/fft_wireframes.png' },
  { type: 'image', span: 12, src: 'assets/projects/foodforthought/mm4-food-for-thought-screens.jpg' },
  
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/foodforthought/c-mm4-food-for-thought.jpg' },
  // { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/foodforthought/d-mm4-food-for-thought.jpg' },

  { type: 'video', span: 6, autoplay: true, loop: false, aspect: '16/9', src: '/assets/projects/foodforthought/wheat-chart-compressed.mp4' },
  { type: 'video', span: 6, autoplay: true, loop: false, aspect: '16/9', src: '/assets/projects/foodforthought/salmon-chart-compressed.mp4' },
  // { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/foodforthought/g-mm4-food-for-thought.jpg' },

  

  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/foodforthought/f-mm4-food-for-thought.jpg' },
  
  
  
  { type: 'image', span: 12, src: 'assets/projects/foodforthought/screens-perspective_fft.jpg' },
  
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/10', src: 'https://player.vimeo.com/video/285148959' },
  
];