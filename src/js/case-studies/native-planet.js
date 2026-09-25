export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p><em>Native Planet</em> is a television documentary series spotlighting indigenous cultures on the front lines of environmental conflict. First Nations host Simon Baker takes audiences around the world to meet charismatic Aboriginal leaders waging a passionate defence of their land, people, and way of life.</p><p>The digital platform promotes the series and hosts a collection of in-depth interactive stories adapted from content produced for television.</p>',
    url: 'https://nativeplanet.tv',
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
      { type: 'text', span: 6, heading: 'Year',    body: '2017' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design</li><li>Web development</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/nativeplanet/nativeplanet-responsive.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/nativeplanet/native-planet_wireframes.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/8.7', src: 'https://player.vimeo.com/video/705551452' },
  
  { type: 'image', span: 12, src: 'assets/projects/nativeplanet/nativeplanet-screens-perspective.jpg' },
  
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/9', src: 'https://player.vimeo.com/video/282761076' },
  
];