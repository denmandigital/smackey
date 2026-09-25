export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: `<p><em>Capturing Reality</em> is an NFB film exploring of the art of documentary. Directed by Pepita Ferrari, the film features 38 of the world's leading documentarians, including Errol Morris, Werner Herzog, and Albert Maysles discussing the nuances of the form, explaining the challenges of their craft, and providing insights into their filmmaking.</p><p>The companion interactive documentary showcases 163 interview clips organized and searchable by topics related to documentary craft, and by the filmmakers featured. Viewers can navigate freely through the content, watching all of the interviews with a particular filmmaker, or those related to a specific topic.</p>`,
    url: 'https://capturingreality.nfb.ca/',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'National Film Board of Canada' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Interactive Documentary' },
      { type: 'text', span: 6, heading: 'Year',    body: '2014' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/capturingreality/capturing-reality-responsive.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/339386110' },

];