export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p><em>Cool Daddy</em> is a documentary about legendary Canadian jazz singer, Kenny Coleman. The film looks back on his career – late nights playing in smokey clubs, while exploring the last days of his life. Now he is an elderly man suffering from Parkinson’s disease, struggling to have a meaningful relationship with his son who now wants to follow in his footsteps as a singer.</p><p><em>Kenny’s Jazz Pad</em> was conceived as virtual nightclub that captured the glamour of Las Vegas hotspots, such as The Flamingo, where Kenny performed in the early 1960s.</p>',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Documentary / Relevision' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Interactive Storytelling' },
      { type: 'text', span: 6, heading: 'Year',    body: '2019' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/kennysjazzpad/kjp-responsive.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/8.75', src: 'https://player.vimeo.com/video/703870653' },
  
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/kennysjazzpad/01-Kennys-jazz-pad-exterior.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/kennysjazzpad/02b-Kennys-jazz-pad-LoungeSinger.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/kennysjazzpad/03-Kennys-jazz-pad-Theatre.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/kennysjazzpad/04-Kennys-wall-of-fame.png' },
  
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/8.45', src: 'https://player.vimeo.com/video/338775388' },
  
];