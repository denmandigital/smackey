export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>BCCA’s Builders Code sets a standard code of conduct for workers on construction sites in BC. Their in-person training programs aim to create positive worksite cultures that promote diversity, equity, and inclusion (DEI), improve the safety, productivity and retention of skilled tradespeople, and reduce project risk.</p>',
    url: 'https://training.builderscode.ca/builders-code-courses/',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client', body: 'British Columbia Construction Association' },
      { type: 'text', span: 6, heading: 'Agency', body: 'Denman Digital' },
      { type: 'text', span: 6, heading: 'Type', body: 'LMS, self-directed training' },
      { type: 'text', span: 6, heading: 'Year', body: '2023—2025' },
      { type: 'text', span: 12, heading: 'Roles', body: '<ul><li>Instructional design</li><li>UX / UI design direction</li><li>Technical direction</li></ul>' },
    ],
  },
  { type: 'spacer', span: 12, height: 40 },
  {
    type: 'text',
    span: 12,
    variant: 'callout',
    heading: 'Challenge',
    body: '<p>Inspired by the success of these programs, BCCA tasked Denman with expanding their uptake by adapting them for self-directed training. Reimagining an intimate in-person training session as an interactive digital experience meant adapting traditional training content – the instructors words and supporting materials such as powerpoint slides and handouts – for online delivery.</p>',
  },

  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Solution',
    body: '<p>The result is <em>The Future of Construction Culture – Know Your Part</em>, self-directed training in the Builders Code brand that offers practical insights and guidance to improve how employees work together. Built on the Thinkific LMS, the course matches each lesson to the format that suits it best: on-screen text and graphics, high-quality video with descriptive motion graphics, audio-driven interactive slides, and form-based quizzes and knowledge checks. Learners receive a certificate on completion.</p>',
  },

  // Outcome callout
  {
    type: 'text',
    span: 6,
    spanSm: 12,
    variant: 'callout',
    heading: 'Outcomes',
    body: 'After the first module’s success, BCCA invested in its own e-learning system, built on WooCommerce and LearnDash LMS, to scale B2B sales through corporate seats and affiliate programs. We helped migrate and adapt the original module, then developed three more: <em>Psychological Safety in Construction</em>, <em>A Guide for Newcomers</em>, and <em>Tools for a Successful Career in Construction.</em>',
  },


  { type: 'spacer', span: 12, height: 40 },
  { type: 'image', span: 12, src: 'assets/projects/builderscodetraining/future-of-construction-responsive.png' },


  { type: 'vimeo', span: 12, aspect: '16/9', autoplay: true, src: 'https://player.vimeo.com/video/856971088?autopause=0' },


  {
    type: 'text',
    span: 12,
    variant: 'callout',
    body: 'BCCA’s multiple audiences required different approaches to learning. After defining how particular learners would approach the training we created unique user pathways, determined key communication touch points for each, and customized the content at each stage to meet their individual requirements.',
  },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/builderscodetraining/future-of-construction-journey.png' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/builderscodetraining/future-of-construction-landing.png' },

  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/builderscodetraining/Goehring-BCCA-BuildingBuilders_3692 1.png' },
  {
    type: 'text',
    span: 6,
    variant: 'callout',
    center: true,
    body: 'BCCA’s trainers are at the center of the experience. We worked with them to script, art direct, and rehearse each video segment, capturing the intimacy of in-person learning while delivering key takeaways in a clear, supportive way.',
  },


  {
    type: 'text',
    span: 12,
    variant: 'callout',
    center: true,
    body: 'In the third and fourth modules, we changed things up by adding scenario-based storytelling. Simple illustrations and voice-over show fictional characters handling situations poorly, then well. The contrast gave learners a visual break and sparked their imagination.',
  },

  { type: 'image', span: 3, spanMd: 4, src: 'assets/projects/builderscodetraining/04.c.scenario-01.png' },
  { type: 'image', span: 3, spanMd: 4, src: 'assets/projects/builderscodetraining/04.c.scenario-03.png' },
  { type: 'image', span: 3, spanMd: 4, src: 'assets/projects/builderscodetraining/04.c.scenario-05.png' },
  { type: 'image', span: 3, spanMd: 4, src: 'assets/projects/builderscodetraining/04.c.scenario-06.png' },
  { type: 'image', span: 3, spanMd: 4, src: 'assets/projects/builderscodetraining/04.c.scenario-07.png' },
  { type: 'image', span: 3, spanMd: 4, src: 'assets/projects/builderscodetraining/04.c.scenario-09.png' },
  { type: 'image', span: 3, spanMd: 4, src: 'assets/projects/builderscodetraining/04.c.scenario-10.png' },
  { type: 'image', span: 3, spanMd: 4, src: 'assets/projects/builderscodetraining/04.c.scenario-12.png' },



  { type: 'image', span: 12, src: 'assets/projects/builderscodetraining/future-of-construction-screens-perspective.jpg' },



];
