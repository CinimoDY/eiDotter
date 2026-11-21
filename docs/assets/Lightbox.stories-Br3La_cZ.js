import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Button-DYwuDaLT.js";import{n as o,t as s}from"./Lightbox-CoF722Pe.js";var c,l,u,d,f,p,m,h,g,_,v,y;function b(){return(b=t((()=>{c=e(n(),1),o(),i(),l=r(),u=[{src:`https://placehold.co/1200x800/000/ffb000?text=ONE`,alt:`One`,caption:`First image — Lightbox demo`},{src:`https://placehold.co/1200x800/000/ffb000?text=TWO`,alt:`Two`,caption:`Second image`},{src:`https://placehold.co/1200x800/000/ffb000?text=THREE`,alt:`Three`,caption:`Third image`}],d={title:`Components/Lightbox`,component:s,parameters:{layout:`centered`},tags:[`autodocs`]},f=({images:e,label:t})=>{let[n,r]=(0,c.useState)(!1);return(0,l.jsxs)(`div`,{children:[(0,l.jsx)(a,{onClick:()=>r(!0),children:t}),(0,l.jsx)(s,{images:e,isOpen:n,onClose:()=>r(!1)})]})},p={render:()=>(0,l.jsx)(f,{images:u,label:`OPEN LIGHTBOX`})},m={render:()=>(0,l.jsx)(f,{images:[u[0]],label:`OPEN SINGLE`})},h=e=>`data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="1600" viewBox="0 0 600 1600"><rect width="600" height="1600" fill="#000"/><rect width="600" height="120" fill="#ffb000"/><text x="300" y="80" font-family="monospace" font-size="56" text-anchor="middle" fill="#000">TOP EDGE</text><text x="300" y="820" font-family="monospace" font-size="72" text-anchor="middle" fill="#ffb000">${e}</text><rect y="1480" width="600" height="120" fill="#ffb000"/></svg>`)}`,g=[{src:h(`PORTRAIT 1`),alt:`Synthetic tall portrait placeholder, one`,width:600,height:1600,caption:`A tall portrait figure with a long caption. Together with the prev/next row on phone widths it is taller than the dialog body, so the body scrolls; the TOP EDGE band must be reachable at scroll position 0.`},{src:h(`PORTRAIT 2`),alt:`Synthetic tall portrait placeholder, two`,width:600,height:1600,caption:`Second portrait`}],_=async(e,t=3e3)=>{let n=Date.now();for(;;){let r=e();if(r)return r;if(Date.now()-n>t)throw Error(`TallPortrait: timed out waiting for the lightbox`);await new Promise(e=>setTimeout(e,50))}},v={render:()=>(0,l.jsx)(f,{images:g,label:`OPEN TALL PORTRAIT`}),play:async({canvasElement:e})=>{(await _(()=>Array.from(e.querySelectorAll(`button`)).find(e=>e.textContent?.includes(`OPEN TALL PORTRAIT`)))).click();let t=await _(()=>document.querySelector(`.eidotter-lightbox__container > .eidotter-dialog__body`)),n=await _(()=>t.querySelector(`.eidotter-lightbox__figure`));t.scrollTop=0;let r=parseFloat(getComputedStyle(t).paddingTop)||0;if(n.offsetTop<r-.5)throw Error(`TallPortrait: figure top is ${r-n.offsetTop}px above the body's scroll origin (unreachable)`)}},y=[`Default`,`SingleImage`,`TallPortrait`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <LightboxDemo images={SAMPLE_IMAGES} label="OPEN LIGHTBOX" />
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <LightboxDemo images={[SAMPLE_IMAGES[0]]} label="OPEN SINGLE" />
}`,...m.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <LightboxDemo images={TALL_IMAGES} label="OPEN TALL PORTRAIT" />,
  play: async ({
    canvasElement
  }) => {
    const trigger = await waitFor(() => Array.from(canvasElement.querySelectorAll('button')).find(b => b.textContent?.includes('OPEN TALL PORTRAIT')));
    trigger.click();
    const body = await waitFor(() => document.querySelector<HTMLElement>('.eidotter-lightbox__container > .eidotter-dialog__body'));
    const figure = await waitFor(() => body.querySelector<HTMLElement>('.eidotter-lightbox__figure'));
    body.scrollTop = 0;
    const padTop = parseFloat(getComputedStyle(body).paddingTop) || 0;
    // offsetTop ignores the pop-in transform; the body is the offsetParent.
    if (figure.offsetTop < padTop - 0.5) {
      throw new Error(\`TallPortrait: figure top is \${padTop - figure.offsetTop}px above the body's scroll origin (unreachable)\`);
    }
  }
}`,...v.parameters?.docs?.source},description:{story:`A figure taller than the dialog body (DMNC-1612). The body scrolls and the
figure starts at the body's content top, so the top of the image is never
above the scroll origin. The play function opens the lightbox and fails if
the figure's top edge sits above the body's padding at scrollTop 0. View it
at the phone375 viewport to see the scrolling case.`,...v.parameters?.docs?.description}}}})))()}b();export{p as Default,m as SingleImage,v as TallPortrait,y as __namedExportsOrder,d as default};