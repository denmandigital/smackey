export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p><em>Uninterrupted</em> blends cinematic storytelling with high-tech art installation. Projection-mapped onto the underside of Vancouver’s Cambie Bridge, a half-hour film by Vancouver director Nettie Wild turned the bridge into a river and brought the mystery of the Pacific salmon run to the heart of the city.</p><p><em>The Uninterrupted Journey</em> is an interactive story that takes users on the salmon’s epic migration, and invites them to have their names featured in a dynamic animated data visualization that was projected each evening on the bridge.</p>',
    url: 'https://uninterrupted.ca/'
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Canada Wild Productions / Agentic' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Interactive story, Installation' },
      { type: 'text', span: 6, heading: 'Year',    body: '2017' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>UX / UI design</li><li>Web development</li></ul>' },
    ],
  },

  { type: 'image', span: 12, src: 'assets/projects/uninterrupted/uninterrupted-responsive.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/uninterrupted/screens-perspective_uninterrupted.jpg' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/225621053?autopause=0' },
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/9', src: 'https://player.vimeo.com/video/236457502' },
];