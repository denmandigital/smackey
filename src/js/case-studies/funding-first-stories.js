export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: 'The Indigenous Screen Office (ISO) is an independent national advocacy and funding organization serving First Nations, Inuit and Métis creators of screen content in Canada. Their mandate is to foster narrative sovereignty and cultural revitalization by increasing the share of Indigenous screen-based productions, while promoting Indigenous values and participation across the media landscape.',
    url: 'https://iso-bea.ca',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Indigenous Screen Office' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website' },
      { type: 'text', span: 6, heading: 'Year',    body: '2024' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  
  {
    type: 'text',
    span: 12,
    spanSm: 12,
    variant: 'callout',
    heading: 'Challenge',
    body: '<p>ISO’s previous funding application system was complicated, confusing for applicants, and hard for administrators to maintain. Resources were buried, and the organization’s web presence didn’t reflect its work.</p>',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Approach',
    body: '<p>We worked with ISO to understand its funding process, internal nomenclature and unique pain points, including an audit of existing content, third-party integrations and functional requirements. I developed user journey maps and prototypes, incorporating user feedback throughout, informing a redesigned platform built around how ISO’s funding process actually works.</p>',
  },

  // Outcome callout
  {
    type: 'text',
    span:6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Outcomes',
    body: '<ul><li>Custom-built funding calendar admin system that automatically organizes funds based on fund type and opening and closing dates</li><li>Stepped application qualification checklist, reducing unqualified or incomplete submissions</li><li>Flexible, block-based admin system for easy site administration in English and French</li></ul>',
  },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'image', span: 12, src: 'assets/projects/iso/iso-responsive.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/iso/iso-ux.png' },
  
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/iso/iso-home.jpg' },
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/iso/iso-funding-opportunities.jpg' },
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/iso/iso-get-inspired.jpg' },
  
  { type: 'image', span: 12, src: 'assets/projects/iso/iso-screens-perspective.jpg' },

  // Video
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/9', src: 'https://player.vimeo.com/video/907945251' },
  
  
];