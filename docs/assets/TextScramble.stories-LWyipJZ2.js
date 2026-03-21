import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as F}from"./iframe-K6BYEX5l.js";import{u as v}from"./useTextScramble-D4wkdfsb.js";import"./preload-helper-Dp1pzeXC.js";import"./prefersReducedMotion-lKH2k1Yv.js";const p=({children:r,speed:i,characters:d,delay:l,className:L="",...Y})=>{const{text:M,isScrambling:j}=v(r,{speed:i,characters:d,delay:l}),q=["text-scramble",j&&"text-scramble--scrambling",L].filter(Boolean).join(" ");return e.jsx("span",{className:q,...Y,children:M})};p.__docgenInfo={description:"",methods:[],displayName:"TextScramble",props:{children:{required:!0,tsType:{name:"string"},description:"The text to display with scramble effect"},speed:{required:!1,tsType:{name:"number"},description:"Milliseconds per character position (default: 40)"},characters:{required:!1,tsType:{name:"string"},description:"Character set to use for scramble effect"},delay:{required:!1,tsType:{name:"number"},description:"Milliseconds before scramble starts (default: 0)"},className:{defaultValue:{value:"''",computed:!1},required:!1}},composes:["Omit"]};const W={title:"Components/TextScramble",component:p,tags:["autodocs"],argTypes:{speed:{control:{type:"range",min:10,max:100,step:5}},delay:{control:{type:"range",min:0,max:2e3,step:100}},characters:{control:"text"}}},s={args:{children:"SYSTEM ONLINE",speed:40}},a={args:{children:"LOADING COMPLETE",speed:80}},t={args:{children:"READY",speed:20}},c={args:{children:"ENCRYPTED DATA",characters:"01",speed:30}},n={args:{children:"DELAYED MESSAGE",speed:40,delay:1e3}},w=()=>{const r=["C:\\> DIR","VOLUME IN DRIVE C IS DOS","DIRECTORY OF C:\\","3 FILE(S)  1,024 BYTES FREE"],[i,d]=F.useState(0);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsx(p,{speed:30,children:r[i]}),e.jsx("button",{onClick:()=>d(l=>(l+1)%r.length),style:{marginTop:"16px",padding:"4px 12px",cursor:"pointer",width:"fit-content"},children:"Next message"})]})},o={render:()=>e.jsx(w,{})};var m,u,x;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    children: 'SYSTEM ONLINE',
    speed: 40
  }
}`,...(x=(u=s.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var E,g,h;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    children: 'LOADING COMPLETE',
    speed: 80
  }
}`,...(h=(g=a.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var S,D,f;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    children: 'READY',
    speed: 20
  }
}`,...(f=(D=t.parameters)==null?void 0:D.docs)==null?void 0:f.source}}};var T,y,b;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    children: 'ENCRYPTED DATA',
    characters: '01',
    speed: 30
  }
}`,...(b=(y=c.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var C,N,A;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'DELAYED MESSAGE',
    speed: 40,
    delay: 1000
  }
}`,...(A=(N=n.parameters)==null?void 0:N.docs)==null?void 0:A.source}}};var I,O,R;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <DynamicTextDemo />
}`,...(R=(O=o.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};const k=["Default","SlowReveal","FastScramble","CustomCharacters","WithDelay","DynamicText"];export{c as CustomCharacters,s as Default,o as DynamicText,t as FastScramble,a as SlowReveal,n as WithDelay,k as __namedExportsOrder,W as default};
