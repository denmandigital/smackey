export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p><em>Northern Air Rescue</em> is a 13-part documentary series following the real-life operations of Missinippi Airways, an Indigenous-owned airline in Canada’s far north. Each week features pilots and aeromedical crew performing emergency medivac missions through some of the most challenging conditions in the world.</p><p>We worked with the show’s creators to develop the series’ branding and a companion digital platform that promotes the series and introduces audiences to its primary characters, themes, and action.</p>',
    url: 'https://northernairrescue.tv'
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'APTN / Real World Films' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Interactive Documentary' },
      { type: 'text', span: 6, heading: 'Year',    body: '2024' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/northernairrescue/nar-responsive.png' },
  
  // Video
  { type: 'video', span: 12, autoplay: true, src: 'assets/projects/northernairrescue/northern_air_rescue_opening_title_sequence_1080p.mp4' },
  
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    body: 'A logomark was designed around the energy and magic of the northern lights, with the base of the phenomenon formed by a negative space silhouette of a plane.',
  },

  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/northernairrescue/nar-brand-design.png', contain: true },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/northernairrescue/nar-full-img.png' },
  
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    body: 'Users select from six “deep-dive” interactive stories that combine informative creative writing, documentary photography and video, and information modules.',
  },

  { type: 'video', span: 12, autoplay: true, src: 'assets/projects/northernairrescue/northern_air_rescue_explore_cards_1080p.mp4' },
  
  { type: 'image', span: 12, src: 'assets/projects/northernairrescue/nar-ux.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/northernairrescue/nar-parallax-screens.jpg' },
  
];