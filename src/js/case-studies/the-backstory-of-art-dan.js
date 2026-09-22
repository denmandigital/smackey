export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    variant: 'intro',
    spanSm: 12,
    body: '<p>Art Napoleon and Dan Hayes are the hosts of APTN’s food and lifestyle series, Moosemeat & Marmalade. One is a blue-blooded, classically trained chef from London, the other a rough and tumble indigenous bush cook from the Moberly Lake reservation in Northern Canada. Each week they explore culture, culinary traditions, and really good food together. And while they both share a deep passion for hunting, fishing, and food, their radically different backgrounds mean they don’t always see eye to eye.</p><p>The Backstory of Art & Dan promotes the show through a side-by-side biography of each man’s life, told through their own unique heartfelt anecdotes, family photos and videos, and other artifacts of a life lived.</p>',
    url: 'https://moosemeatandmarmalade.com/backstory/'
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'APTN / Mooswa Films' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website' },
      { type: 'text', span: 6, heading: 'Year',    body: '2017' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design</li><li>Web development</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/backstory/backstory-responsive.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/206498889' },
  
  { type: 'image', span: 12, src: 'assets/projects/backstory/screens-perspective_backstory.jpg' },
  
];