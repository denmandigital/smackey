export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>Northern Link is an innovative company providing cutting-edge network infrastructure solutions, top-tier products, and technical expertise to customers across North America.</p><p>Working with the company’s executive and marketing teams, we created a website that introduces their value proposition and communicates their global experience. At the heart of the site is an extensive product catalogue built on WooCommerce, configured in catalogue mode to reflect their B2B sales model while keeping the door open for future transactional capability. We also developed a suite of product tools, including a Cable Pathway Estimator that helps contractors calculate how much cable they need for a job.</p>',
    url: 'https://northernlink.com',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Northern Link' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website' },
      { type: 'text', span: 6, heading: 'Year',    body: '2023' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },

  { type: 'image', span: 12, src: 'assets/projects/northernlink/northernlink-responsive.png' },
  { type: 'image', span: 12, src: 'assets/projects/northernlink/northernlink-ux.png' },
  { type: 'image', span: 12, src: 'assets/projects/northernlink/northernlink-screens.png' },
  
  // Video
  { type: 'video', span: 6, spanSm: 12, autoplay: true, aspect: '16/9', src: 'assets/projects/northernlink/northernlink-home-compressed.mp4' },
  { type: 'video', span: 6, spanSm: 12, autoplay: true, aspect: '16/9', src: 'assets/projects/northernlink/northernlink-products-compressed.mp4' },
  
  { type: 'image', span: 12, src: 'assets/projects/northernlink/northernlink-screens-perspective.jpg' },
  
];