export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>Similkameen Crossroads is a personal documentary project by filmmaker Tyler Hagan, exploring the tension between his Métis identity, suburban Christian upbringing, and the complicated history of the Church in Indigenous communities.</p><p>In the Similkameen Valley near Hedley, British Columbia, a century-old white chapel sits quietly among the mountains, just off the highway. Hagan’s still and moving images of the church and surrounding landscape, combined with an intimate audio essay featuring voices from his exploration of place, faith, and identity, form the basis of this interactive documentary.</p>',
    url: 'https://similkameen.denmandigital.com/en/',
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
      { type: 'text', span: 6, heading: 'Year',    body: '2021' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design</li><li>Technical direction</li></ul>' },
    ],
  },

  { type: 'image', span: 12, src: 'assets/projects/similkameen/similkameen-responsive.png' },
  
  { type: 'image', span: 4, spanSm:12, src: 'assets/projects/similkameen/similkameen-1.jpg' },
  { type: 'image', span: 4, spanSm:12, src: 'assets/projects/similkameen/similkameen-2.jpg' },
  { type: 'image', span: 4, spanSm:12, src: 'assets/projects/similkameen/similkameen-3.jpg' },

  { type: 'image', span: 12, src: 'assets/projects/similkameen/similkameen_church_burned_down.jpg' },
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    body: 'On June 26, 2021 St. Anne, the church at the center of the story, was burned to the ground – a casualty of the anger which spread across Canada with the discovery of unmarked graves at Catholic residential schools.',
  },

  { type: 'image', span: 12, src: 'assets/projects/similkameen/screens_perspective_similkameen.jpg' },


  // Video
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/9', src: 'https://player.vimeo.com/video/725470857' },
  
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    body: 'Similkameen Crossroads was an FWA Site of the Day winner, and a Webby Awards Honoree in the Websites - Religion and Spirituality category.',
  },
  
];