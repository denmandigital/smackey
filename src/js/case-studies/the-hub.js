export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>The Centre for Civic Engagement is a charity that aims to generate dialogue and debate on Canada’s future. They organize the Munk Debates – a high profile public lecture and educational discussion series on major public policy issues facing Canada and the world.</p><p>In 2021 they brought together leading Canadian journalists, pundits, and editors to create <em>The Hub</em>, a digital first publication providing original news and analysis exploring economics, culture, technology, geopolitics, public policy, law and governance, and a platform for debate among competing visions of Canada’s future.</p>',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Centre for Civic Engagement' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Digital Publication' },
      { type: 'text', span: 6, heading: 'Year',    body: '2021' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI / brand design direction</li><li>Technical direction</li></ul>' },
    ],
  },

  { type: 'spacer', span: 12, height: 40 },
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Challenge',
    body: 'Establish a brand that felt both modern <em>and</em> rooted in tradition, and a flexible publishing platform to deliver their news, analysis, and debate to a news-savvy audience.',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Approach',
    body: 'As a charitable news organization, The Hub was limited in how it could raise money. We built a flexible platform that let it move between memberships, subscriptions, paid newsletters and donations as its needs changed.',
  },

  // Outcome callout — full width
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    heading: 'Outcome',
    body: 'We built and ran The Hub’s platform through its early years. As its audience grew, it took digital in-house, and in 2024 it relaunched with its own team.',
  },

  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/thehub/thehub-responsive.png' },

  { type: 'spacer', span: 12, height: 20 },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/thehub/the_hub_visual_identity.png', contain: true },
  {
    type: 'text',
    span: 6, spanSm: 12,
    variant: 'callout',
    center: true,
    body: '<p>The logomark was designed to communicate depth, stability, perspective, and clarity. Its shape evokes the image of an open broadsheet newspaper. A custom drawn H, creates the depth perspective of the mark containing it, presenting a strong, clear, collegial representation of the brand name.</p>',
  },

  { type: 'spacer', span: 12, height: 40 },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/thehub/thehub_side_brand_colours.png', contain: true },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/thehub/thehub_typography.png', contain: true },
  { type: 'spacer', span: 12, height: 40 },
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    body: '<p>A deep navy anchors the palette, supported by two gradients and a bright red reserved for calls-to-action. The typography is chosen for legibility and organized into systems that make information easy to scan.</p>',
  },
  { type: 'spacer', span: 12, height: 40 },


  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/thehub/thehub_homepage.png' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/thehub/thehub_newsdispatch.png' },

  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/8.75', src: 'https://player.vimeo.com/video/721609588' },
  
  { type: 'image', span: 12, src: 'assets/projects/thehub/thehub_email_campaigns.png' },

  { type: 'image', span: 12, src: 'assets/projects/thehub/screens-perspective_thehub.jpg' },
  
];