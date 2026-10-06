export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p><em>Journey of a Drug</em> and <em>Role of Pharmacy</em> are part of the “Story of Medicines”, an interactive media exhibit at the Interpretive Centre of UBC’s Faculty of Pharmaceutical Science. At seven feet wide, they are two of the largest interactive multi-touch walls in Canada.</p><p>Story of Medicines was the recipient of a Summit Creative Award.</p>',
    
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'University of British Columbia' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'NGX Interactive' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Touchscreen Application' },
      { type: 'text', span: 6, heading: 'Year',    body: '2013' },
      { type: 'text', span: 12, heading: 'Role',   body: 'App development' },
    ],
  },

    { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/storyofmedicines/journey-of-a-drug-05.jpg' },
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/storyofmedicines/journey-of-a-drug-04.jpg' },
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/storyofmedicines/journey-of-a-drug-01.jpg' },

  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/storyofmedicines/role-of-pharmacy-01.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/storyofmedicines/role-of-pharmacy-02.jpg' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/8.5', src: 'https://player.vimeo.com/video/49650537?autopause=0' },
 
];