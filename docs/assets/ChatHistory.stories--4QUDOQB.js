import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{r,t as i}from"./registry-EhIcK3QA.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ChatHistory-DPYbUCua.js";var c,l,u,d,f,p,m,h,g,_;function v(){return(v=t((()=>{c=e(n(),1),o(),r(),l=a(),u={title:`Components/Chat/ChatHistory`,component:s,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:i.ChatHistory},tags:[`autodocs`]},d=[{id:`1`,role:`system`,content:`ADOS Chat v1.0 — Type a command to begin.`},{id:`2`,role:`user`,content:`help`},{id:`3`,role:`assistant`,content:`Available commands:
  dir     — list files
  type    — display file contents
  cls     — clear screen
  ver     — show version`},{id:`4`,role:`user`,content:`ver`},{id:`5`,role:`assistant`,content:`eiDotter Design System v0.14.0
DOS Compatibility Mode: ENABLED`}],f={args:{messages:d}},p={args:{messages:[]}},m={args:{messages:[...d,{id:`6`,role:`user`,content:`dir`},{id:`7`,role:`assistant`,content:`Scanning directory`}],isStreaming:!0}},h=()=>{let[e,t]=(0,c.useState)(d),[n,r]=(0,c.useState)(!1);return(0,l.jsxs)(`div`,{style:{height:`300px`,display:`flex`,flexDirection:`column`},children:[(0,l.jsx)(s,{messages:e,isStreaming:n,style:{flex:1,border:`1px solid var(--color-semantic-border-default)`}}),(0,l.jsx)(`button`,{onClick:()=>{let n=String(e.length+1);t(e=>[...e,{id:n,role:`user`,content:`Command #${n}`}]),r(!0),setTimeout(()=>{let i=String(e.length+2);t(e=>[...e,{id:i,role:`assistant`,content:`Response to command #${n}`}]),r(!1)},1500)},style:{marginTop:`8px`,background:`var(--color-cga-amber, #ffb000)`,color:`#000`,border:`none`,padding:`4px 12px`,fontFamily:`inherit`,cursor:`pointer`},children:`Add Message`})]})},g={render:h},_=[`Default`,`Empty`,`Streaming`,`Interactive`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    messages: sampleMessages
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    messages: []
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    messages: [...sampleMessages, {
      id: '6',
      role: 'user',
      content: 'dir'
    }, {
      id: '7',
      role: 'assistant',
      content: 'Scanning directory'
    }],
    isStreaming: true
  }
}`,...m.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: InteractiveRender
}`,...g.parameters?.docs?.source}}}})))()}v();export{f as Default,p as Empty,g as Interactive,m as Streaming,_ as __namedExportsOrder,u as default};