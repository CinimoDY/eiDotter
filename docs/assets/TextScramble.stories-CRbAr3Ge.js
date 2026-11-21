import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./cn-CHNjZLmO.js";import{n as o,t as s}from"./useTextScramble-Da-_48fW.js";var c,l,u;function d(){return(d=t((()=>{c=e(n(),1),i(),s(),l=r(),u=(0,c.forwardRef)(({children:e,speed:t,characters:n,delay:r,className:i,...s},c)=>{let{text:u,isScrambling:d}=o(e,{speed:t,characters:n,delay:r});return(0,l.jsx)(`span`,{ref:c,className:a(`eidotter-text-scramble`,d&&`eidotter-text-scramble--scrambling`,i),...s,children:u})}),u.displayName=`TextScramble`,u.__docgenInfo={description:``,methods:[],displayName:`TextScramble`,props:{children:{required:!0,tsType:{name:`string`},description:`The text to display with scramble effect`},speed:{required:!1,tsType:{name:`number`},description:`Milliseconds per character position (default: 40)`},characters:{required:!1,tsType:{name:`string`},description:`Character set to use for scramble effect`},delay:{required:!1,tsType:{name:`number`},description:`Milliseconds before scramble starts (default: 0)`}},composes:[`Omit`]}})))()}var f,p,m,h,g,_,v,y,b,x,S;function C(){return(C=t((()=>{f=e(n(),1),d(),p=r(),m={title:`Components/TextScramble`,component:u,tags:[`autodocs`],argTypes:{speed:{control:{type:`range`,min:10,max:100,step:5}},delay:{control:{type:`range`,min:0,max:2e3,step:100}},characters:{control:`text`}}},h={args:{children:`SYSTEM ONLINE`,speed:40}},g={args:{children:`LOADING COMPLETE`,speed:80}},_={args:{children:`READY`,speed:20}},v={args:{children:`ENCRYPTED DATA`,characters:`01`,speed:30}},y={args:{children:`DELAYED MESSAGE`,speed:40,delay:1e3}},b=()=>{let e=[`C:\\> DIR`,`VOLUME IN DRIVE C IS DOS`,`DIRECTORY OF C:\\`,`3 FILE(S)  1,024 BYTES FREE`],[t,n]=(0,f.useState)(0);return(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,p.jsx)(u,{speed:30,children:e[t]}),(0,p.jsx)(`button`,{onClick:()=>n(t=>(t+1)%e.length),style:{marginTop:`16px`,padding:`4px 12px`,cursor:`pointer`,width:`fit-content`},children:`Next message`})]})},x={render:()=>(0,p.jsx)(b,{})},S=[`Default`,`SlowReveal`,`FastScramble`,`CustomCharacters`,`WithDelay`,`DynamicText`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'SYSTEM ONLINE',
    speed: 40
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'LOADING COMPLETE',
    speed: 80
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'READY',
    speed: 20
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'ENCRYPTED DATA',
    characters: '01',
    speed: 30
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'DELAYED MESSAGE',
    speed: 40,
    delay: 1000
  }
}`,...y.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <DynamicTextDemo />
}`,...x.parameters?.docs?.source}}}})))()}C();export{v as CustomCharacters,h as Default,x as DynamicText,_ as FastScramble,g as SlowReveal,y as WithDelay,S as __namedExportsOrder,m as default};