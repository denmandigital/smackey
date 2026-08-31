export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>BC Hydro worked with Indigenous communities in the Peace Region of British Columbia to preserve the unique physical record of their history from the impacts of the Site C hydroelectric project. More than 500 archaeological sites were established and hundreds of thousands of artifacts uncovered and presented in a  exhibition which traveled to the remote indigenous communities involved, before finding a permanent home at Fort St. John North Peace Museum.</p><p>The focus of our work within the exhibition was the development of an immersive touch-screen application that lets users explore the growing database of thousands of artifacts found at archeological sites around the river.',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'BC Hydro' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Touch-screen Application' },
      { type: 'text', span: 6, heading: 'Year',    body: '2021' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design</li><li>Web development</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/historyrevealed/responsive_bc-hydro.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/historyrevealed/bc-hydro_single-img.jpg' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/8', src: 'https://player.vimeo.com/video/721578563' },

  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/721577871' },
  
  { type: 'image', span: 12, src: 'assets/projects/historyrevealed/screens-perspective_BCHydro.jpg' },
  
];