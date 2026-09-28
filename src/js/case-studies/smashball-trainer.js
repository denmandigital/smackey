export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>Volleyball Canada is a national association dedicated to improving performance and growing participation in volleyball across Canada.</p><p>They have developed programming around Smashball, a modified version of Volleyball designed for boys and girls between the ages of 6-12. Smashball Trainer is a mobile app that gives coaches everything they need to teach this exciting game and provide kids with the motivation and skills to become the next generation of champions.</p>',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Volleyball Canada' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'App' },
      { type: 'text', span: 6, heading: 'Year',    body: '2019' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },

  { type: 'image', span: 3, spanMd: 6, spanSm: 12, src: 'assets/projects/smashball/smashball_devices-parallax-1.png' },
  { type: 'image', span: 3, spanMd: 6, spanSm: 12, src: 'assets/projects/smashball/smashball_devices-parallax-2.png' },
  { type: 'image', span: 3, spanMd: 6, spanSm: 12, src: 'assets/projects/smashball/smashball_devices-parallax-3.png' },
  { type: 'image', span: 3, spanMd: 6, spanSm: 12, src: 'assets/projects/smashball/smashball_devices-parallax-4.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/smashball/phone-perspective_lightbg_smashball.jpg' },
];