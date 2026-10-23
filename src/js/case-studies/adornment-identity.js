export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>The BC Society for the Museum of Costume (SMOC) maintains a large collection of historic fashion, traditional costume and textiles from the 18th century to the present. With funding from Digital Museums Canada (DMC), SMOC was able to bring this collection online, giving students, fashion enthusiasts and the public outside Vancouver access to its historical holdings.</p><p><em>Adornment & Identity: An Interactive Exploration of Women’s Fashion, 1750–2000</em> explores clothing as a historical artifact.</p>',
    url: 'https://fashionhistory.ca',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'SMOC / Digital Museums Canada' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Interactive Storytelling, Interactive Documentary' },
      { type: 'text', span: 6, heading: 'Year',    body: '2026' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Digital strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    heading: 'Challenge',
    body: '<h2>More than digitizing garments.</h2><p>Fashion historians curated each exhibit around garments chosen for their cultural significance and the personal stories they carried. The goal was an engaging experience that captured the historical weight and human context of every piece for audiences from fashion students and academics to the general public, without compromising historical accuracy.</p>',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    spanMd: 12,
    variant: 'callout',
    heading: 'Solution',
    body: '<h2>Balancing engagement with historical accuracy.</h2><p>Working closely with SMOC’s historians and curators, we designed an interactive experience that let visitors explore each garment’s story at their own depth, from a quick glance to an academic deep dive. Photographs, 3D models, video, and scroll-based narratives brought each garment and its story to life. We validated concepts through two rounds of user testing with fashion students, tested feasibility with technical prototypes, and developed content with fashion historians and educators. I directed the overall experience design and technical implementation, and designed the virtual space floorplan that modellers and a 3D programmer built out.</p>',
  },

  // Outcome callout
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    spanMd: 12,
    variant: 'callout',
    heading: 'Outcomes',
    body: '<h2>An immersive virtual museum with four interactive exhibits.</h2><ul><li>Interactive 3d clone of a House of Worth evening gown from 1900</li><li>Three short documentary films exploring the personal histories behind selected garments</li><li>Educational curriculum written for fashion students, downloadable historical sewing patterns, and a glossary of fashion history and terminology</li><li>Accessible version of the experience, built to WCAG 2.2 AA standards</li></ul><p><em>Adornment & Identity</em> is an Anthem Award finalist in the Digital & Innovative Experiences in Education, Art, and Culture category.</p>',
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
    body: '<h2 class="my-0">Dressed for History</h2><p><em>Women’s fashion 1750–2000</em></p><p>Just as fashion constantly evolves, it is continuously informed and held together by a common thread: the past. This exhibit highlights the importance of collecting and preserving the clothing of the past in order to inform the future.</p>',
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
    body: '<h2 class="my-0">Deconstructing Worth</h2><p><em>The making of early haute couture</em></p><p>How clothing is made constantly evolves, and can tell us much about a particular place and time. This exhibit invites users to examine how one historical couture dress—an evening gown designed in Paris by Charles Frederick Worth in 1900—was constructed.</p>',
  },
  { type: 'spacer', span: 12, height: 40 },
  
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    center: true,
    variant: 'callout',
    body: '<h2 class="my-0">Mirror Image</h2><p><em>Clothing as a reflection of the times</em></p><p>This exhibit compares two dresses from distinct periods in fashion history, examining their design, materials and construction within the social, political and cultural context of each era.</p>',
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
    body: '<h2 class="my-0">Woven Together</h2><p><em>Stories that unfold the fabric of the past</em></p><p>Historical artefacts gain much of their power from the stories attached to them. The garments in this exhibit are unremarkable on their own, but take on historical significance through the experiences of the people who wore them.</p>',
  },
  { type: 'spacer', span: 12, height: 40 },


  
  { type: 'image', span: 12, src: 'assets/projects/adornment/ai-screens-perspective.jpg' },
  

  
];
