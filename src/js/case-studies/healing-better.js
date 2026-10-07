export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>St. Paul’s Foundation raises over $55 million annually in support of Providence Health Care, advancing capital projects, groundbreaking research, and patient care across PHC sites. The Foundation is the driving force behind the new St. Paul’s Hospital in Vancouver, the largest healthcare capital project in Western Canada.</p><p>Our engagement spanned three initiatives: a content audit that led to a simplified navigation system and new information architecture; a new microsite for the <em>Healing Better</em> campaign supporting the new hospital build; and a transition to FundraiseUp, an AI-powered fundraising platform designed to improve donor conversion and streamline giving.</p>',
    url: 'https://helpstpauls.com',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'St. Paul’s Foundation' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Website' },
      { type: 'text', span: 6, heading: 'Year',    body: '2026' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>Experience strategy</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'image', span: 12, src: 'assets/projects/spf/spf-responsive.png' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: true, aspect: '16/9.15', src: 'https://player.vimeo.com/video/1233595873?autopause=0' },
  
  { type: 'vimeo', span: 6, spanSm: 12, autoplay: true, aspect: '16/9.25', src: 'https://player.vimeo.com/video/1233597031?autopause=0' },
  { type: 'vimeo', span: 6, spanSm: 12, autoplay: true, aspect: '16/9.25', src: 'https://player.vimeo.com/video/1233598071?autopause=0' },
  
  { type: 'image', span: 12, src: 'assets/projects/spf/spf-screens-perspective.jpg' },
  
];