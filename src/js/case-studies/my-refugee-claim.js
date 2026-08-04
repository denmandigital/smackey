export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: 'My Refugee Claim is a digital resource created to help refugee claimants get informed, connected, and prepared as they navigate Canada’s complex refugee protection process.',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Kinbrace / UNHCR' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Year',    body: '2023' },
      { type: 'text', span: 6, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    heading: 'Challenge',
    body: 'Refugee claimants coming to Canada face a highly demanding legal process, usually with limited time, limited support, and very little familiarity with how things work here. Information exists, but it’s fragmented across government sites, legal documents, and nonprofit resources. Nothing speaks directly to claimants in plain language.',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Approach',
    body: 'We conducted multi-day discovery sessions with settlement workers, content creators from Kinbrace, and immigration lawyers who work directly with refugee claimants. Their input shaped the initial scope and ensured legal and procedural accuracy. With an MVP prototype, we ran usability testing with individuals who had recently gone through the refugee claim process. Their insights revealed friction points and blind spots that informed subsequent iterations.',
  },

  // Outcome callout
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Outcomes',
    body: '<ul><li>A centralized, claimant-first digital guide used nationwide</li><li>Clearer understanding for claimants navigating a stressful process</li><li>Strong alignment between nonprofit, government, and legal stakeholders</li><li>A platform that can scale with new languages and policy changes</li><li>Improved workflow for agencies who refer claimants to the site</li></ul>',
  },

  // Takeaway callout
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    heading: 'Takeaways',
    body: 'This project reinforced the importance of designing with—not just for—vulnerable communities. It also sharpened my approach to multi-stakeholder collaboration in environments where accuracy and clarity are equally critical. And it reaffirmed the value of building systems that can evolve: content, technology, and governance all working together. In this case great work was rewarded with an <a href="https://www.anthemawards.com/winners/list/entry/#!humanitarian-action-services/education-or-literacy-platform/my-refugee-claim/0/kinbrace/453645" target="_blank">Anthem Award</a>.',
  },


  { type: 'spacer', span: 12, height: 40 },
  { type: 'image', span: 12, src: 'assets/case-studies/myrefugeeclaim/cs-mrc-responsive.png' },

  
  { type: 'image', span: 12, src: 'assets/case-studies/myrefugeeclaim/cs-mrc-illustrations-2.png' },
  
  { type: 'vimeo', span: 12, aspect: '16/11.15', autoplay: true, src: 'https://player.vimeo.com/video/812203483' },
  
  { type: 'image', span: 6, spanSm: 12, src: 'assets/case-studies/myrefugeeclaim/cs-mrc-readytours-01.png' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/case-studies/myrefugeeclaim/cs-mrc-readytours-02.png' },
  
  { type: 'image', span: 12, src: 'assets/case-studies/myrefugeeclaim/cs-mrc-basisofclaimform.jpg' },
  
  { type: 'vimeo', span: 12, aspect: '16/10.66', src: 'https://player.vimeo.com/video/812199615' },
  
  
];
