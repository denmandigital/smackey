export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>Power to Give is on a mission to help Canadian philanthropists give better. The organization builds personal relationships with philanthropic families and innovative charitable organizations to change the way giving is done and create the most impact possible.</p><p>We joined with the organization’s leadership team to help tell their story and connect with their network of philanthropists.</p>',
    url: 'https://powertogive.ca',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Power to Give Foundation' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website' },
      { type: 'text', span: 6, heading: 'Year',    body: '2024' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },

  { type: 'image', span: 12, src: 'assets/projects/powertogive/powertogive-responsive.png' },
  { type: 'image', span: 12, src: 'assets/projects/powertogive/powertogive_ux.png' },
  { type: 'image', span: 12, src: 'assets/projects/powertogive/powertogive_brochure.jpg' },
  
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    body: 'The initial engagement included the creation of a dynamic new website, a comprehensive client onboarding document, and branded email newsletters.',
  },
  { type: 'image', span: 12, src: 'assets/projects/powertogive/powertogive_newsletter.png' },

  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/1008938152' },
  
  { type: 'image', span: 12, src: 'assets/projects/powertogive/powertogive_screens.jpg' },
  
];