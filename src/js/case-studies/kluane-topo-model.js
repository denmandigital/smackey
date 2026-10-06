export const blocks = [
  // Two-column intro text — 5 + 7
  {
    type: 'text',
    span: 8,
    spanMd: 7,
    spanSm: 12,
    variant: 'intro',
    body: '<p>In the Kluane National Park and Reserve’s Da Ku Cultural Centre, three iPad tablets are installed around a 10ft by 8ft topographic model of the park allowing visitors to virtually explore the park’s geography and unique features including lakes, rivers, mountains and glaciers. Parks staff can configure each tablet to default to the unique vantage point visitors have of the topographic model form their standing position. The app also includes a broad range of interpretive content related to understanding the unique aspects of the park as well as First Nations heritage.</p>',
  },
  {
    type: 'container',
    span: 4,
    spanMd: 5,
    spanSm: 12,
    children: [
      { type: 'text', span: 6, heading: 'Client',  body: 'Parks Canada' },
      { type: 'text', span: 6, heading: 'Agency',  body: 'NGX Interactive' },
      { type: 'text', span: 6, heading: 'Type',    body: 'iPad Application' },
      { type: 'text', span: 6, heading: 'Year',    body: '2014' },
      { type: 'text', span: 12, heading: 'Role',   body: 'App development' },
    ],
  },

    { type: 'spacer', span: 12, height: 40 },
    
    
  { type: 'image', span: 12, spanSm: 12, src: 'assets/projects/kluanetopo/KLU_TPM_01.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/kluanetopo/KLU_TPM_02.jpg' },
  { type: 'image', span: 6, spanSm: 12, src: 'assets/projects/kluanetopo/KLU_TPM_03.jpg' },
  
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/kluanetopo/kluane6.jpg' },
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/kluanetopo/kluane7.jpg' },
  { type: 'image', span: 4, spanSm: 12, src: 'assets/projects/kluanetopo/kluane8.jpg' },
  
 
];