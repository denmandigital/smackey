export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>Across Canada, an epidemic of drugs and addiction are disproportionately harming Indigenous people, nowhere more than in British Columbia where this crisis is fuelling a tragic increase in overdose deaths. The Conversation is an empowering docuseries where substance use survivors, their families and friends, engage in a raw and emotive ‘conversation’ about their life, addiction, and how they found a pathway to healing.</p><p>The series can be streamed from the digital platform which also showcases care models and resources for healing through an Indigenous lens.</p>',
    url: 'https://pathwaystohealing.tv',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Telus / FNHA / Real World Films' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Interactive Documentary' },
      { type: 'text', span: 6, heading: 'Year',    body: '2024' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI / brand design</li><li>Web development</li></ul>' },
    ],
  },

  { type: 'image', span: 12, src: 'assets/projects/theconversation/theconversation-responsive.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/1087171201' },
  { type: 'vimeo', span: 6, spanSm: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/1087172109' },
  { type: 'vimeo', span: 6, spanSm: 12, autoplay: true, aspect: '16/9', src: 'https://player.vimeo.com/video/1087173472' },
  
  { type: 'image', span: 12, src: 'assets/projects/theconversation/the-conversation-screens.jpg' },
  
];