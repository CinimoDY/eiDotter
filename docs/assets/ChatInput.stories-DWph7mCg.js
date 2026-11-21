import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{r as t,t as n}from"./registry-EhIcK3QA.js";import{n as r,t as i}from"./ChatInput-BHMU2gUB.js";var a,o,s,c,l,u;function d(){return(d=e((()=>{r(),t(),a={title:`Components/Chat/ChatInput`,component:i,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:n.ChatInput},tags:[`autodocs`]},o={args:{onSend:e=>console.log(`Send:`,e)}},s={args:{onSend:e=>console.log(`Send:`,e),placeholder:`Type a command...`}},c={args:{onSend:e=>console.log(`Send:`,e),prompt:`$`}},l={args:{onSend:e=>console.log(`Send:`,e),disabled:!0}},u=[`Default`,`WithPlaceholder`,`CustomPrompt`,`Disabled`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    onSend: (msg: string) => console.log('Send:', msg)
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    onSend: (msg: string) => console.log('Send:', msg),
    placeholder: 'Type a command...'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    onSend: (msg: string) => console.log('Send:', msg),
    prompt: '$'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    onSend: (msg: string) => console.log('Send:', msg),
    disabled: true
  }
}`,...l.parameters?.docs?.source}}}})))()}d();export{c as CustomPrompt,o as Default,l as Disabled,s as WithPlaceholder,u as __namedExportsOrder,a as default};