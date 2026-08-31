export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: 'Addiction. The Next Step is a rich media, interactive toolkit that delivers world-class therapy and support directly to families struggling with substance use disorder. The project was produced in conjunction with the documentary, <em>Wasted: An Alcoholic Therapist’s Fight for Recovery in a Flawed Treatment System</em>, which examines the enormous changes happening in addiction research and treatment, and details therapist Mike Pond’s alcoholism and recovery using compassionate, evidence-based methods created by the Center for Motivation and Change.',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Center for Motivation and Change' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website' },
      { type: 'text', span: 6, heading: 'Year',    body: '2017' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design</li><li>Web development</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/addiction/addiction-responsive.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/10.66', src: 'https://player.vimeo.com/video/225482597' },
  
  { type: 'image', span: 12, src: 'assets/projects/addiction/screens-perspective_addiction.jpg' },
  
];