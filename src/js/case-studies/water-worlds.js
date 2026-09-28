export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p><em>Water Worlds</em> is a television documentary series narrated by award-winning actress, Tantoo Cardinal (Killers of the Flower Moon). Each episode takes audiences on an adventure below the surface of the water, introducing them to a wide variety of unique aquatic ecosystems and the environmental issues facing them.</p><p>The Water Worlds story is told through design, motion graphics, and a companion website providing both promotional content for the show and an engaging interactive experience.</p>',
    url: 'https://waterworlds.ca/',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'APTN / Water Worlds Productions' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Interactive Documentary' },
      { type: 'text', span: 6, heading: 'Year',    body: '2024' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },

  { type: 'image', span: 12, src: 'assets/projects/waterworlds/waterworlds-responsive.png' },
  { type: 'image', span: 12, src: 'assets/projects/waterworlds/water_worlds_UX_Screens.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/1046569910?autopause=0' },
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/1046571262?autopause=0' },
  
  { type: 'image', span: 12, src: 'assets/projects/waterworlds/water-worlds_screens.jpg' },
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/9', src: 'https://player.vimeo.com/video/1046572575' },
  
];