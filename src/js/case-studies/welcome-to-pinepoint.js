export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>Imagine your hometown never changed. That no one ever grew old or moved on. Part book, part film, part family photo album, <em>Welcome to Pine Point</em> unearths a place frozen in time and discovers what happens when an entire community is erased from the map.</p><p>Created by the internationally renowned creative team, The Goggles, this poignant, award-winning interactive documentary tells the story of a mining town in Canada’s Northwest Territories and the generation of people who called it home from 1962-1988.</p>',
    url: 'https://pinepoint.nfb.ca/',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'National Film Board of Canada' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Web App, Interactive Documentary' },
      { type: 'text', span: 6, heading: 'Year',    body: '2020' },
      { type: 'text', span: 12, heading: 'Roles',   body: 'Web development' },
    ],
  },

  { type: 'image', span: 12, src: 'assets/projects/pinepoint/pinepoint-responsive.png' },
  
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    body: 'Originally created in Flash in 2010, the project’s continued success enticed the NFB to keep up with  technological changes. Re-engineered in React, the final iteration is as a responsive web app accessible across all devices.',
  },

  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/721557130' },
  
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/pinepoint/pinepoint-screen-1.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/pinepoint/pinepoint-screen-2.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/pinepoint/pinepoint-screen-3.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/pinepoint/pinepoint-screen-4.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/pinepoint/pinepoint-screen-5.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/pinepoint/pinepoint-screen-6.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/pinepoint/pinepoint-screen-7.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/pinepoint/pinepoint-screen-8.jpg' },
  
  { type: 'image', span: 12, src: 'assets/projects/pinepoint/screens-perspective_pinepoint.jpg' },
  
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/9', src: 'https://player.vimeo.com/video/721564857' },

];