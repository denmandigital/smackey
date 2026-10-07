export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>The Centre for Civic Engagement is a charity that aims to generate dialogue and debate on Canada’s future. It organizes the Munk Debates, a high-profile public debate series on major policy issues facing Canada and the world.</p><p>In 2021 it brought together leading Canadian journalists, pundits and editors to create <em>The Hub</em>, a digital-first publication covering economics, culture, technology, geopolitics, public policy, and law and governance, and a platform for debate among competing visions of Canada’s future.</p>',
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
    body: 'The Hub needed a brand that felt both modern and rooted in tradition, and a flexible publishing platform for news, analysis and debate aimed at a news-savvy audience. As a charitable news organization, it was also limited in how it could raise money.',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Solution',
    body: 'We developed the brand and design system, then built a flexible publishing platform capable of handling subscriptions, memberships, tiered newsletter sign-ups, and donations. I led the research behind the commerce model and designed the platform’s information architecture and user experience.',
  },

  // Outcome callout — full width
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    heading: 'Outcome',
    body: 'We built and ran the platform through The Hub’s early years. It grew its audience over this period, and in 2024 moved digital in-house and relaunched.',
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
    body: '<p>The logomark evokes an open broadsheet newspaper. A custom-drawn H sits within it, set in perspective to give the mark depth.</p>',
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
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/8.75', src: 'https://player.vimeo.com/video/721609588?autopause=0' },
  
  { type: 'image', span: 12, src: 'assets/projects/thehub/thehub_email_campaigns.png' },

  { type: 'image', span: 12, src: 'assets/projects/thehub/screens-perspective_thehub.jpg' },
  
];