import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as L}from"./iframe-BU4rT9RF.js";import{c as q}from"./cn-CvUv5FIJ.js";import{u as G}from"./useTextScramble-Bz9_l-iJ.js";import"./preload-helper-Dp1pzeXC.js";import"./prefersReducedMotion-lKH2k1Yv.js";const i=L.forwardRef(({children:r,speed:d,characters:m,delay:p,className:Y,...M},j)=>{const{text:w,isScrambling:F}=G(r,{speed:d,characters:m,delay:p});return e.jsx("span",{ref:j,className:q("eidotter-text-scramble",F&&"eidotter-text-scramble--scrambling",Y),...M,children:w})});i.displayName="TextScramble";i.__docgenInfo={description:"",methods:[],displayName:"TextScramble",props:{children:{required:!0,tsType:{name:"string"},description:"The text to display with scramble effect"},speed:{required:!1,tsType:{name:"number"},description:"Milliseconds per character position (default: 40)"},characters:{required:!1,tsType:{name:"string"},description:"Character set to use for scramble effect"},delay:{required:!1,tsType:{name:"number"},description:"Milliseconds before scramble starts (default: 0)"}},composes:["Omit"]};const U={title:"Components/TextScramble",component:i,tags:["autodocs"],argTypes:{speed:{control:{type:"range",min:10,max:100,step:5}},delay:{control:{type:"range",min:0,max:2e3,step:100}},characters:{control:"text"}}},s={args:{children:"SYSTEM ONLINE",speed:40}},a={args:{children:"LOADING COMPLETE",speed:80}},t={args:{children:"READY",speed:20}},c={args:{children:"ENCRYPTED DATA",characters:"01",speed:30}},n={args:{children:"DELAYED MESSAGE",speed:40,delay:1e3}},P=()=>{const r=["C:\\> DIR","VOLUME IN DRIVE C IS DOS","DIRECTORY OF C:\\","3 FILE(S)  1,024 BYTES FREE"],[d,m]=L.useState(0);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsx(i,{speed:30,children:r[d]}),e.jsx("button",{onClick:()=>m(p=>(p+1)%r.length),style:{marginTop:"16px",padding:"4px 12px",cursor:"pointer",width:"fit-content"},children:"Next message"})]})},o={render:()=>e.jsx(P,{})};var l,u,x;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    children: 'SYSTEM ONLINE',
    speed: 40
  }
}`,...(x=(u=s.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var E,g,h;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    children: 'LOADING COMPLETE',
    speed: 80
  }
}`,...(h=(g=a.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var S,D,T;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    children: 'READY',
    speed: 20
  }
}`,...(T=(D=t.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var f,y,b;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    children: 'ENCRYPTED DATA',
    characters: '01',
    speed: 30
  }
}`,...(b=(y=c.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var C,N,R;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'DELAYED MESSAGE',
    speed: 40,
    delay: 1000
  }
}`,...(R=(N=n.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var A,I,O;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <DynamicTextDemo />
}`,...(O=(I=o.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};const z=["Default","SlowReveal","FastScramble","CustomCharacters","WithDelay","DynamicText"];export{c as CustomCharacters,s as Default,o as DynamicText,t as FastScramble,a as SlowReveal,n as WithDelay,z as __namedExportsOrder,U as default};
