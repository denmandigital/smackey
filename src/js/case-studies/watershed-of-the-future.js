export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>The <em>Watershed of the Future</em> is a fun and educational multi-player simulation game geared to young museum visitors, grades 6 to 8. Players are tasked with saving Lake Winnipeg by making decisions that shrink the algal bloom. The game is comprised of 8 touch screens mounted on a circular table, an overhead projector and a full sound system. Visitors can play individually or in multi-player mode.</p>',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Manitoba Museum' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'NGX Interactive, Aldrich Pears' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Touchscreen Application' },
      { type: 'text', span: 6, heading: 'Year',    body: '2014' },
      { type: 'text', span: 12, heading: 'Role',   body: 'App development' },
    ],
  },

    { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/watershed/TMM-00.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/watershed/TMM-01.jpg' },

  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/watershed/TMM-03.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/watershed/TMM-04.jpg' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/9', src: 'https://player.vimeo.com/video/98166166?autopause=0' },
 
];