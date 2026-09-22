export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: 'A large-scale outdoor digital display was installed on the CBC Vancouver plaza, giving passers-by a glimpse into the issues being discussed by fellow citizens in real time. Keywords of Tweets from multiple regional data points popped up in ‘chat bubbles’ on screen, surrounded by smaller subject-related bubbles. The more a topic was discussed, the larger it appeared on screen. The longer a topic drove the discussion online, the longer it stayed at the forefront of the experience.',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'CBC Vancouver' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital / Rethink' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Outdoor digital display' },
      { type: 'text', span: 6, heading: 'Year',    body: '2018' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>UX / UI design</li><li>App development</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/cbcvancouver/VancouverTalksAbout-Sunrise-Timelapse.gif' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/8.75', src: 'https://player.vimeo.com/video/704361767' },
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/9', src: 'https://player.vimeo.com/video/332490003' },
  
  
  
];