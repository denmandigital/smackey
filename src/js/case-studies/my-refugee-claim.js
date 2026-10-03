export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p><em>My Refugee Claim</em> is a digital resource created to help refugee claimants get informed, connected, and prepared as they navigate Canada’s complex refugee protection process.</p>',
    url: 'https://myrefugeeclaim.ca'
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Kinbrace / UNHCR' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website, Digital Publication' },
      { type: 'text', span: 6, heading: 'Year',    body: '2023' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    heading: 'Challenge',
    body: '<p>Refugee claimants face a demanding legal process with little time, little support, and little familiarity with how things work in Canada. The information they need exists, but it’s scattered across government sites, legal documents, and nonprofit resources, and none of it is written for claimants in plain language. <em>My Refugee Claim</em> was built to change that.</p>',
  },
  // Approach text + UI screenshot — 4 + 8
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Approach',
    body: 'We ran multi-day discovery sessions with settlement workers, content creators and immigration lawyers who work directly with claimants. Their input set the scope and kept the content legally and procedurally accurate. We then tested an MVP prototype with people who had recently been through the claim process, surfacing friction points and blind spots that shaped later iterations. I designed the information architecture and user experience, and directed the development of a flexible, block-based content management system that could scale with new languages and changes to government policies.',
  },

  // Outcome callout
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Outcomes',
    body: '<ul><li>A plain-language guide for claimants in thirteen languages, used nationwide</li><li>Integrated registrations for Ready Tour, a virtual workshop helping claimants prepare for their hearings, with HubSpot to automate follow-up communications</li><li>AI text to speech integration, available in eleven languages</li><li><a href="https://www.anthemawards.com/winners/list/entry/#!humanitarian-action-services/education-or-literacy-platform/my-refugee-claim/0/kinbrace/453645" target="_blank">Anthem Award winner</a></li></ul>',
  },

  // Takeaway callout
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    heading: 'Takeaways',
    body: '<ul><li>Design with vulnerable communities, not just for them</li><li>In high-stakes work, get accuracy and clarity right together, with every stakeholder in the room</li><li>Build systems that can evolve with content, technology, and governance moving in step</li></ul>',
  },


  { type: 'spacer', span: 12, height: 40 },
  { type: 'image', span: 12, src: 'assets/projects/myrefugeeclaim/cs-mrc-responsive.png' },

  { type: 'image', span: 12, src: 'assets/projects/myrefugeeclaim/cs-mrc-illustrations-2.png' },

  {
    type: 'text',
    span: 12,
    variant: 'callout',
    body: 'Hand-sketched illustrations give the guide a welcoming, approachable feel, paired with a consistent colour palette that codes related content for easy navigation.',
  },

  { type: 'vimeo', span: 12, aspect: '16/11.15', autoplay: true, src: 'https://player.vimeo.com/video/812203483?autopause=0' },
  
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/myrefugeeclaim/cs-mrc-readytours-01.png' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/myrefugeeclaim/cs-mrc-readytours-02.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/myrefugeeclaim/cs-mrc-basisofclaimform.jpg' },
  
  { type: 'vimeo', span: 12, aspect: '16/10.66', src: 'https://player.vimeo.com/video/812199615' },
  
  
];
