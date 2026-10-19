export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: 'Reel Canada is a charitable organization that uses national education programs and workforce development initiatives to bring Canadian film to tens of thousands of teachers and students, and millions of people across the country, each year. Its mission is to showcase the power and diversity of cinema and prompt audiences to ask what it means to be Canadian.',
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
    body: '<h2>A Canadian cultural leader.</h2><p>Reel Canada’s digital presence had fallen out of step with its ambition to lead the conversation on Canadian cinema, culture, and national identity. Over time, the platforms had become cluttered and hard to navigate, internal jargon had crept into the user experience, and key data, including the Canadian Film Collection, lived in multiple databases with no single source of truth.</p>',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Approach',
    body: '<h2>Data and audience driven.</h2><p>We started with a content and technology audit of the existing platforms. Working with key stakeholders, we used analytics and audience needs to identify the most valuable content, challenging  long-held internal assumptions while advocating the users. We removed outdated and irrelevant material, reorganized the program structure, and moved topical content to social channels.</p>',
  },

  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Solutions',
    body: '<h2>User centred design.</h2><ul><li>Promoted a new information architecture and mega menu navigation system providing  quick access to individual pages within sections organized by audience needs</li><li>Led overall design direction and transformation of inherited brand elements into a Figma design system of components, styles, and variables that streamlined developer handoff and kept the brand consistent across products</li><li>Rebuilt a custom outdated plugin that syncs data from Salesforce to their websites establishing a single source of truth for all film and event data</li><li>Led the design and development of a block-based content management system, giving Reel Canada’s team the flexibility to build and update pages in English and French without developer support</li></ul>',
  },

  // Outcome callout — full width
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Outcomes',
    body: '<h2>A lasting partnership.</h2><p>Following a well-received 2023 launch, we became Reel Canada’s agency of record, supporting the continued evolution of their flagship website and the National Canadian Film Day event site.</p><ul><li>145% website traffic increase and 500,000+ students reached in the first year</li><li>40% increase in educator sign-ups</li><li>National media partnership with CBC</li></ul><br><p>The most notable success was <em>Reel Opportunities</em>, a digital workforce initiative that attracts young adults to careers in Canada’s film industry and accounted for two-thirds of total website traffic in the first year. It includes an interactive career-pathway tool, a career-planning quiz, and a searchable, filterable directory of film-related job profiles.</p>',
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
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/10.66', src: 'https://player.vimeo.com/video/810732633?autopause=0' },
];
