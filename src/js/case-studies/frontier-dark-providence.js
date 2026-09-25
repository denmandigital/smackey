export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>Frontier is a historical action-drama series starring Jason Momoa that dramatizes the chaotic and violent struggle to control wealth and power in the North American fur trade in the late 18th century.</p><p><em>Frontier | Dark Providence</em> is a rich, immersive, interactive experience that promoted the series in advance of its premiere on Discovery Canada and on Netflix, and served as a digital extension for fans of the show wanting to dive deeper into the motivations of the characters.</p>',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Discovery, Netflix' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital,<br>Switch United' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Interactive Storytelling' },
      { type: 'text', span: 6, heading: 'Year',    body: '2016' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Web development</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/frontier/frontier-responsive.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/721229239' },
  
  { type: 'image', span: 12, src: 'assets/projects/frontier/screens-perspective_frontier.jpg' },

  {
    type: 'text',
    span: 12,
    variant: 'callout',
    body: 'After selecting a character featured on the menu, and entering their story, the audience is invited to interact with the video using their keyboard. Each key activates a different visual effects layer within the video, which, in turn, exposes a deeper narrative truth in the story.',
  },

  { type: 'image', span: 12, src: 'assets/projects/frontier/frontier-stills.jpg' },
  
  
  { type: 'image', span: 12, src: 'assets/projects/frontier/frontier-studio.jpg' },
  
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/9', src: 'https://player.vimeo.com/video/205339161' },
];