import{i as e}from"./preload-helper-Cs4UwXAW.js";import{n as t,t as n}from"./registry-BqccLuet.js";import{n as r,t as i}from"./ChatInput-VUF03j5Y.js";var a,o,s,c,l,u;e((()=>{r(),t(),a={title:`Components/Chat/ChatInput`,component:i,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:n.ChatInput},tags:[`autodocs`]},o={args:{onSend:e=>console.log(`Send:`,e)}},s={args:{onSend:e=>console.log(`Send:`,e),placeholder:`Type a command...`}},c={args:{onSend:e=>console.log(`Send:`,e),prompt:`$`}},l={args:{onSend:e=>console.log(`Send:`,e),disabled:!0}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}},u=[`Default`,`WithPlaceholder`,`CustomPrompt`,`Disabled`]}))();export{c as CustomPrompt,o as Default,l as Disabled,s as WithPlaceholder,u as __namedExportsOrder,a as default};