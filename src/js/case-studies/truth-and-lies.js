export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>Months after US Navy SEALs killed Osama bin Laden, the news media had written the first draft of history. For the tenth anniversary of 9/11, CBC’s investigative documentary program <em>The Fifth Estate</em> set out to tell the deeper story of political and diplomatic intrigue that began years before the attacks and ended in a bloody ambush in Pakistan on May 2, 2011.</p><p>Truth &amp; Lies – The Last Days of Osama bin Laden, is an interactive documentary that traces the hunt for bin Laden, brings the raid on Abbottabad to life, and cuts through contradictory accounts.</p>',

  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'CBC News' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'Fulscrn' },
      { type: 'text', span: 6, heading: 'Type',    body: 'Interactive Documentary, App' },
      { type: 'text', span: 6, heading: 'Year',    body: '2012' },
      { type: 'text', span: 12, heading: 'Roles',   body: '<ul><li>UX / UI design</li><li>App development</li></ul>' },
    ],
  },

  { type: 'image', span: 12, src: 'assets/projects/truthandlies/responsive-desktop-tablet_truth.png' },
  
  { type: 'image', span: 12, src: 'assets/projects/truthandlies/screens-perspective_truth.jpg' },
  
  // Video
  { type: 'vimeo', span: 12, autoplay: false, aspect: '16/10.2', src: 'https://player.vimeo.com/video/339435879' },
  
  
];