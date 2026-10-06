export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>The BC Society for the Museum of Costume (SMOC) maintains a large collection of historic fashion, traditional costume and textiles from the 18th century to the present. With funding from Digital Museums Canada, SMOC brought this collection online, giving students, academics and the public outside Vancouver access to its historical holdings.</p><p><em>Adornment & Identity: An Interactive Exploration of Women’s Fashion, 1750–2000</em> explores clothing as a historical artifact.</p>',
    url: 'https://fashionhistory.ca',
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
    heading: 'Objectives',
    body: '<p>The goal was to engage and inform visitors through an immersive experience that explores the cultural and historical context behind each garment and the people who wore them. Employing a range of media and digital storytelling techniques including 3D modelling, video, and scroll-based narratives, all content was grounded in primary research and expert review from fashion historians. The experience also included curated learning activities designed for student audiences.</p>',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Approach',
    body: '<p>Working closely with SMOC, we developed a user-centred approach to digital storytelling, balancing engagement with historical accuracy. We ran two rounds of user testing with fashion students to validate concepts, built technical prototypes to test feasibility, and developed content with input from fashion historians and educators. I designed the virtual space floorplan and interaction UX, which a modeler and 3D programmer brought to life.</p>',
  },

  // Outcome callout
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Outcomes',
    body: '<ul><li>An immersive virtual museum with four interactive exhibits</li><li>A fully accessible version of the experience, meeting the WCAG 2.2 AA standards</li><li>An interactive 3D model of a House of Worth evening gown from 1900</li><li>Three short films exploring the personal histories behind selected garments</li></ul>',
  },


  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/adornment/adornment-responsive.png' },
  
  { type: 'vimeo', span: 12, aspect: '16/10', autoplay: true, src: 'https://player.vimeo.com/video/1231806231?autopause=0' },
  
  { type: 'image', span: 12, src: 'assets/projects/adornment/floorplan-model.png' },

  {
    type: 'text',
    span: 6,
    spanSm: 12,
    center: true,
    variant: 'callout',
    body: '<h2>Dressed for History</h2><p><em>Women’s fashion 1750–2000</em></p><p>Just as fashion constantly evolves, it is continuously informed and held together by a common thread: the past. This exhibit highlights the importance of collecting and preserving the clothing of the past in order to inform the future.</p>',
  },

  { type: 'vimeo', span: 6, spanSm: 12, aspect: '16/10', autoplay: true, src: 'https://player.vimeo.com/video/1231911203?autopause=0' },
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
