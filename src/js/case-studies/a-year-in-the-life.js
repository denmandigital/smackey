export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>This touch screen app for the Kluane National Park and Reserve Visitors Centre Bear Program traces the movements of Grizzly Bear 18, an 11 year-old female Kluane Grizzly using GPS data collected from her collar every 5 hours over the course of a year. Users learn about Bear 18’s habits, like where and how far she travelled, her food sources, the birth of a cub and where she denned for the winter.</p>',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Parks Canada' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'NGX Interactive' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Touchscreen Application' },
      { type: 'text', span: 6, heading: 'Year',    body: '2014' },
      { type: 'text', span: 12, heading: 'Role',   body: 'App development' },
    ],
  },

    { type: 'spacer', span: 12, height: 40 },
    
    // Video
    { type: 'video', span: 12, autoplay: true, aspect: '16/9', src: 'assets/projects/kluanegrizzly/KLU_BEAR_compressed.mp4' },

  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/kluanegrizzly/kluane-01.png' },
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/kluanegrizzly/kluane-02.png' },
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/kluanegrizzly/kluane-03.png' },
  
 
];