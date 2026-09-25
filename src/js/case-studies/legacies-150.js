export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p><em>Legacies 150</em> brings together thirteen interactive essays pondering what it means to be Canadian a century and a half into Confederation. These first-person stories explore where we come from, who we are, and what kind of nation we are becoming. They are personal reflections on our common journey—the legacies that we’ve inherited and the ones we aspire to leave for future generations.</p><p>The project was a massive collaboration between NFB producers, the writers, filmmakers, and photographers who created the stories, and a diverse group of design and development teams working from different points across the country.</p>',
    url: '',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'National Film Board of Canada' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Interactive Storytelling' },
      { type: 'text', span: 6, heading: 'Year',    body: '2017' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>UX / UI design</li><li>Web development</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/legacies150/legacies150-responsive.png' },
  
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/legacies150/legacies_150_side_by_side_1.jpg' },
  {
    type: 'text',
    span: 6, spanSm: 12,
    variant: 'callout',
    body: '<h2>Convictions</h2><p>A century ago, Peter Wiebe’s Mennonite ancestors left Canada for Mexico. Now, his family is making a return trip.</p>',
  },
  { type: 'spacer', span: 12, height: 20 },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/legacies150/legacies_150_side_by_side_2.jpg' },
  {
    type: 'text',
    span: 6, spanSm: 12,
    variant: 'callout',
    body: '<h2>Tetepiskat</h2><p>From her family’s ancestral hunting camp, Natasha Kanapé Fontaine sends a message across time and generations.</p>',
  },
  { type: 'spacer', span: 12, height: 20 },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/legacies150/legacies_150_side_by_side_3.jpg' },
  {
    type: 'text',
    span: 6, spanSm: 12,
    variant: 'callout',
    body: '<h2>Portrait of a Family</h2><p>David McKinstry and his husband didn’t plan to set a legal precedent. They just wanted kids to call their own.</p>',
  },
  { type: 'spacer', span: 12, height: 20 },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/legacies150/legacies_150_side_by_side_4.jpg' },
  {
    type: 'text',
    span: 6, spanSm: 12,
    variant: 'callout',
    body: '<h2>The Cache</h2><p>Bonnie and Michelline Ammaaq live north of the Arctic Circle in Igloolik, but in 1986 they left... or rather, returned to the land.</p>',
  },
  { type: 'spacer', span: 12, height: 20 },
  { type: 'image', span: 12, src: 'assets/projects/legacies150/screens-perspective_legacies.jpg' },

  // Video
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/10.66', src: 'https://player.vimeo.com/video/236637593' },
  
  
];