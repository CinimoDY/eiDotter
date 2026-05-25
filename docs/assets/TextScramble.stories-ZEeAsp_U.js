import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";import{n as o,t as s}from"./useTextScramble-BcHXIWtz.js";var c=e((()=>{})),l,u,d,f=e((()=>{l=t(n(),1),i(),s(),c(),u=r(),d=(0,l.forwardRef)(({children:e,speed:t,characters:n,delay:r,className:i,...s},c)=>{let{text:l,isScrambling:d}=o(e,{speed:t,characters:n,delay:r});return(0,u.jsx)(`span`,{ref:c,className:a(`eidotter-text-scramble`,d&&`eidotter-text-scramble--scrambling`,i),...s,children:l})}),d.displayName=`TextScramble`,d.__docgenInfo={description:``,methods:[],displayName:`TextScramble`,props:{children:{required:!0,tsType:{name:`string`},description:`The text to display with scramble effect`},speed:{required:!1,tsType:{name:`number`},description:`Milliseconds per character position (default: 40)`},characters:{required:!1,tsType:{name:`string`},description:`Character set to use for scramble effect`},delay:{required:!1,tsType:{name:`number`},description:`Milliseconds before scramble starts (default: 0)`}},composes:[`Omit`]}})),p,m,h,g,_,v,y,b,x,S,C;e((()=>{p=t(n(),1),f(),m=r(),h={title:`Components/TextScramble`,component:d,tags:[`autodocs`],argTypes:{speed:{control:{type:`range`,min:10,max:100,step:5}},delay:{control:{type:`range`,min:0,max:2e3,step:100}},characters:{control:`text`}}},g={args:{children:`SYSTEM ONLINE`,speed:40}},_={args:{children:`LOADING COMPLETE`,speed:80}},v={args:{children:`READY`,speed:20}},y={args:{children:`ENCRYPTED DATA`,characters:`01`,speed:30}},b={args:{children:`DELAYED MESSAGE`,speed:40,delay:1e3}},x=()=>{let e=[`C:\\> DIR`,`VOLUME IN DRIVE C IS DOS`,`DIRECTORY OF C:\\`,`3 FILE(S)  1,024 BYTES FREE`],[t,n]=(0,p.useState)(0);return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,m.jsx)(d,{speed:30,children:e[t]}),(0,m.jsx)(`button`,{onClick:()=>n(t=>(t+1)%e.length),style:{marginTop:`16px`,padding:`4px 12px`,cursor:`pointer`,width:`fit-content`},children:`Next message`})]})},S={render:()=>(0,m.jsx)(x,{})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'SYSTEM ONLINE',
    speed: 40
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'LOADING COMPLETE',
    speed: 80
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'READY',
    speed: 20
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'ENCRYPTED DATA',
    characters: '01',
    speed: 30
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'DELAYED MESSAGE',
    speed: 40,
    delay: 1000
  }
}`,...b.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <DynamicTextDemo />
}`,...S.parameters?.docs?.source}}},C=[`Default`,`SlowReveal`,`FastScramble`,`CustomCharacters`,`WithDelay`,`DynamicText`]}))();export{y as CustomCharacters,g as Default,S as DynamicText,v as FastScramble,_ as SlowReveal,b as WithDelay,C as __namedExportsOrder,h as default};