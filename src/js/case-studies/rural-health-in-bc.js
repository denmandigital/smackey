export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: 'The Rural Coordination Centre of BC is dedicated to improving healthcare outcomes for rural British Columbians. It is supported by the Joint Standing Committee on Rural Issues, a partnership of the BC government and Doctors of BC serving all rural, remote and Indigenous communities in British Columbia. The organization provides valued resources and relationship building tools to rural health care providers and their website serves as a hub for these services.',
    url: 'https://rccbc.ca',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client', body: 'Rural Coordination Centre of British Columbia' },
      { type: 'text', span: 6, heading: 'Agency', body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type', body: 'Website, Brand Design, Communication Design' },
      { type: 'text', span: 6, heading: 'Year', body: '2025-2026' },
      { type: 'text', span: 12, heading: 'Roles', body: '<ul><li>Digital strategy</li><li>UX / UI design</li><li>Brand design</li><li>Communication design</li></ul>' },
    ],
  },

  { type: 'image', span: 12, src: 'assets/projects/rccbc/rccbc_responsive-screens.png', alt: 'RCCbc responsive devices' },

  { type: 'image', span: 12, src: 'assets/projects/rccbc/rccbc_ux.png', alt: 'UX design screens' },

  {
    type: 'text',
    span: 12,
    center: true,
    variant: 'callout',
    body: '<p>RCCbc approached us to address significant design and technical concerns they had with their website and identify areas for improvement. We joined with the organization’s communications team to understand their strategic objectives and after a full design, content, and technology audit, we created and implemented a website refresh roadmap that aligned with their goals.</p>',
    
  },


  // { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/rccbc/rccbc-home.png', alt: 'UX design screens' },

  // Video
  { type: 'video', span: 6, spanSm: 12, autoplay: true, aspect: '16/11.4', src: 'assets/projects/rccbc/rccbc-homepage-hero-compressed.mp4', title: 'RCCbc Homepage Hero' },
  // Video
  { type: 'video', span: 6, spanSm: 12, autoplay: true, aspect: '16/11.4', src: 'assets/projects/rccbc/rccbc-pentagram-plus.mp4', title: 'RCCbc Pentragram Plus' },

  {
    type: 'text',
    span: 12,
    center: true,
    variant: 'callout',
    body: '<h2>Partnership Framework</h2><p>We helped RCCbc clarify messaging around their complex partnership framework called Partnership Pentagram Plus, that brings together six essential partner perspectives to create socially accountable health system transformation. It was adapted from an existing World Health Organization model to include First Nations and other relevant community partners. We then designed an interactive infographic to explain the partnership model and convey its key ideas step by step.</p>',
  },


  { type: 'image', span: 12, src: 'assets/projects/rccbc/rccbc-parallax-bg.jpg', alt: 'RCCbc screens' },


  { type: 'image', span: 8, spanSm: 12, offset: 2, offsetSm: 0, src: 'assets/projects/rccbc/RTVS-HHN-lockup.png', alt: 'Real-Time Virtual Support / HHN Sub-brand lockup' },

  {
    type: 'text',
    span: 6,
    variant: 'callout',
    body: '<h2>RTVS Sub-Brand Refresh</h2><p>The refreshed identity anchors Real-Time Virtual Support (RTVS) under the Rural Coordination Centre of BC (RCCbc) as it evolves into the Health Hybrid Network (HHN). It keeps RCCbc’s hummingbird symbol, created by Coast Salish artist Douglas “Bear,” which is familiar to the RTVS community and rich in meaning. The palette extends RCCbc’s primary colours with nature-infused tones drawn from land, water, and natural systems, and each peer pathway has its own unique colour.</p>',
  },
  
  {
    type: 'imageGallery',
    span: 6,
    aspect: '4/3',
    duration: 3000,
    images: [
      { src: 'assets/projects/rccbc/p.3.png', alt: 'RTVS Visual Identity System Guidelines – Pathways Colour Palette' },
      { src: 'assets/projects/rccbc/p.3-1.png', alt: 'RTVS Visual Identity System Guidelines - Analogous Colour Palette' },
      { src: 'assets/projects/rccbc/p.3-2.png', alt: 'RTVS Visual Identity System Guidelines - Typography' }
    ],
  },
  {
    type: 'imageGallery',
    span: 6,
    aspect: '4/3',
    duration: 3000,
    images: [
      { src: 'assets/projects/rccbc/p.4-2.png', alt: 'RTVS Visual Identity System Guidelines - Instant Access large badge' },
      { src: 'assets/projects/rccbc/p.4-3.png', alt: 'RTVS Visual Identity System Guidelines - Quick Access large badge' },
      { src: 'assets/projects/rccbc/p.4-4.png', alt: 'RTVS Visual Identity System Guidelines - Consultation to Conversation large badge' },
      { src: 'assets/projects/rccbc/p.4-5.png', alt: 'RTVS Visual Identity System Guidelines - Instant Access medium badge' },
      { src: 'assets/projects/rccbc/p.4-6.png', alt: 'RTVS Visual Identity System Guidelines - Quick Access medium badge' },
      { src: 'assets/projects/rccbc/p.4-7.png', alt: 'RTVS Visual Identity System Guidelines - Peer Pathways pills' },
    ],
  },
  {
    type: 'text',
    span: 6,
    variant: 'callout',
    body: '<h2>RTVS Peer Pathways</h2><p>The hexagon is widely seen as a symbol of balance, harmony, and structure. Its six equal sides convey stability and equilibrium, qualities that mirror how the RTVS peer pathways connect to one another. Building on this, we developed a flexible design system for the Instant Access, Quick Access, and Consultation to Conversation pathways, one that adapts to a range of formats across every touchpoint.</p>',
  },


  { type: 'image', span: 12, src: 'assets/projects/rccbc/RTVS-comms-package.png', alt: 'RCCbc Communications Package' },

];