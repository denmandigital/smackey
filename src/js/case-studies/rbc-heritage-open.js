export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>Installed in the tents at the 2013/2014 RBC Heritage Golf Classic and RBC Canadian Open, this touchscreen app let golf fans watch videos, flip through photo galleries, and learn about their favourite players while discovering fun facts about the tournament and RBC’s involvement. A simplified, customized hospitality version was also created to enable course staff to help fans track the real-time location and score of their favourite players.</p>',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'RBC' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Touchscreen Application' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'NGX Interactive' },
      { type: 'text', span: 6, heading: 'Year',    body: '2013' },
      { type: 'text', span: 12, heading: 'Role',   body: 'App development' },
    ],
  },

    { type: 'spacer', span: 12, height: 40 },
  
    // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/1233206378?autopause=0' },
    
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/rbcgolf/RBC_HHI_01.jpg' },
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/rbcgolf/RBC_HHI_02.jpg' },
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/rbcgolf/RBC_HHI_03.jpg' },
  
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/rbcgolf/RBC_HHI_04.png' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/rbcgolf/RBC_HHI_05.png' },
  
 
];