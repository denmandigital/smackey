export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>British Columbia Construction Association (BCCA) is the provincial voice of BC’s construction industry. Their Builders Code initiative is a baseline code of conduct for workers. It is founded on the belief that shaping positive worksite behaviour and a company culture that respects equity, diversity and inclusion not only leads to better productivity and safety outcomes, but helps to attract and keep the best workers.</p>',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'British Columbia Construction Association' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Mobile App' },
      { type: 'text', span: 6, heading: 'Year',    body: 2019 },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Challenge',
    body: '<p>Construction crew members are a tough training audience. Skeptical of corporate messaging and resistant to conventional formats, getting meaningful EDI content to land on an active worksite is a difficult ask. BCCA needed an approach that felt relevant and approachable to workers on the ground, without being preachy, heavy-handed, or hard to access.</p>',
  },
  // Sollution text
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Solution',
    body: '<p>A mobile culture training app called <em>Cool or Tool?</em> was created to help crew workers understand what is acceptable worksite behaviour through fun, light-hearted game play. Its 20 real-life workplace scenarios depicted model behavior or actions that compromised safety and productivity. Players judged the action and decided if the behaviour exhibited was “cool” or if the character at the center of the scene was acting like a “tool.”</p>',
  },

  { type: 'spacer', span: 12, height: 40 },
  { type: 'image', span: 12, src: 'assets/projects/coolortool/cool-or-tool-screens.png' },

  
  { type: 'spacer', span: 2, height: 40 },
  { type: 'vimeo', span: 3, spanSm: 12, aspect: '7.5/16', autoplay: true, src: 'https://player.vimeo.com/video/704637210?autopause=0' },
  {
    type: 'text',
    span: 5,
    spanSm: 12,
    center: true,
    variant: 'callout',
    body: '<h2>Gameplay</h2><p>The scenarios featured a playful cast of animated characters based on the physical tools construction workers use everyday. These characters could be helpful and polite or rude and obnoxious. Right or wrong, players received a brief explanation of why the behaviour shown was positive or negative, along with a description of the real impact it could have on a worksite.</p>',
  },
  { type: 'spacer', span: 12, height: 40 },
  { type: 'image', span: 12, src: 'assets/projects/coolortool/phone-perspective_coolortool.jpg' },
  { type: 'spacer', span: 12, height: 40 },

  { type: 'spacer', span: 2, height: 40 },
  {
    type: 'text',
    span: 5,
    spanSm: 12,
    center: true,
    variant: 'callout',
    body: '<h2>Scoring</h2><p>Players received an app notification twice daily telling them that it was time to play. After answering the scenario, they were directed to a personal scoreboard that tracked cumulative performance and flagged any missed scenarios to return to.</p>',
  },
  { type: 'vimeo', span: 3, spanSm: 12, aspect: '7.5/16', autoplay: true, src: 'https://player.vimeo.com/video/704651145?autopause=0' },
  
  { type: 'spacer', span: 12, height: 40 },

  {
    type: 'text',
    span: 12,
    variant: 'callout',
    body: '<p><em>Cool or Tool?</em> was publicly available, but most users were invited by their employer. Companies registering for an account received a unique code to distribute to their crew, placing employees into a crew-specific game. Supervisors gained access to a web-based dashboard where they could monitor employee progress and engagement in real time, giving employers a meaningful window into how their crews were responding to the training.</p><p>The app ran successfully until 2024, when it was decommissioned.</p>',
  },
  { type: 'image', span: 12, src: 'assets/projects/coolortool/cool-or-tool-dashboard.png' },

  
];
