export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>Knowledge Network is an independent educational public broadcaster, providing commercial-free programming across Canada. Their shows support lifelong learning, present diverse points of view and global perspectives, and enlighten audiences on the important issues of our time.</p>',
    url: 'https://about.knowledge.ca',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Knowledge Network' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website' },
      { type: 'text', span: 6, heading: 'Year',    body: '2025' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    heading: 'Challenge',
    body: '<h2>Cutting the cord.</h2><p>Knowledge Network’s previous public-facing website was embedded within their streaming platform. It was outdated, unimaginative, and weighed down by years of accumulated content without a clear strategy behind it. Separating the corporate and streaming experiences was an intentional decision, creating space to properly serve the donor and stakeholder audiences the organization depends on, with a site that could stand on its own while still feeling connected to the new streaming platform being built at the same time.</p>',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 7,
    spanMd: 12,
    variant: 'callout',
    heading: 'Solution',
    body: '<h2>A blended team.</h2><p>Following a full content audit and stakeholder workshops, we established a roadmap and aligned on priorities. I led experience design and directed a blended team of Knowledge Network’s internal designers alongside our own designers and developers. Knowledge Network’s designers brought intimate brand knowledge and direct visibility into the streaming platform as it was being built, which required close collaboration and adaptability from both teams. Their internal review process added coordination overhead we accounted for early to keep production on track.</p>',
  },

  // Outcome callout
  {
    type: 'text',
    span: 5,
    spanMd: 12,
    variant: 'callout',
    heading: 'Outcomes',
    body: '<h2>Distinct, yet connected.</h2><p>The site launched in sync with the streaming platform, delivering a consistent brand experience across both. Clear information architecture reduces friction for donors and stakeholders, independent producers have a dedicated intake process, and a flexible custom CMS lets the Knowledge Network team manage content on their own.</p>',
  },


  { type: 'spacer', span: 12, height: 40 },
  { type: 'image', span: 12, src: 'assets/projects/knowledge/knowledge-responsive.png' },
  { type: 'image', span: 12, src: 'assets/projects/knowledge/knowledge-ux-screens.png' },
  
  { type: 'vimeo', span: 12, aspect: '16/9', autoplay: true, src: 'https://player.vimeo.com/video/1233122138?autopause=0' },
  
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/knowledge/knowledge-our-story-hero.jpg' },
  // { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/knowledge/knowldege-funding.jpg' },
  { type: 'vimeo', span: 6, spanSm: 12, aspect: '16/9', autoplay: true, src: 'https://player.vimeo.com/video/1233136922?autopause=0' },
  { type: 'vimeo', span: 6, spanSm: 12, aspect: '16/9', autoplay: true, src: 'https://player.vimeo.com/video/1233129782?autopause=0' },
  
  // { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/knowledge/knowledge-our-programming.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/knowledge/knowledge-rewards-and-benefits.jpg' },
  
  { type: 'image', span: 12, src: 'assets/projects/knowledge/knowledge-screens.png' },
  { type: 'image', span: 12, contain: true, src: 'assets/projects/knowledge/knowledge-cms-guide.png' },
  
];
