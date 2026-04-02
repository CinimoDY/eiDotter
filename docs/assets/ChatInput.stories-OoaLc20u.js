import{C}from"./ChatInput-DXVddb4v.js";import{c as f}from"./registry-BMuWnSIt.js";import"./jsx-runtime-D_zvdyIk.js";import"./iframe-CMgb2h7h.js";import"./preload-helper-Dp1pzeXC.js";/* empty css                  */const x={title:"Components/Chat/ChatInput",component:C,parameters:{layout:"padded",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:f.ChatInput},tags:["autodocs"]},o={args:{onSend:e=>console.log("Send:",e)}},s={args:{onSend:e=>console.log("Send:",e),placeholder:"Type a command..."}},r={args:{onSend:e=>console.log("Send:",e),prompt:"$"}},a={args:{onSend:e=>console.log("Send:",e),disabled:!0}};var n,t,d;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    onSend: (msg: string) => console.log('Send:', msg)
  }
}`,...(d=(t=o.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};var c,m,p;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    onSend: (msg: string) => console.log('Send:', msg),
    placeholder: 'Type a command...'
  }
}`,...(p=(m=s.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var l,g,u;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    onSend: (msg: string) => console.log('Send:', msg),
    prompt: '$'
  }
}`,...(u=(g=r.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var i,S,h;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    onSend: (msg: string) => console.log('Send:', msg),
    disabled: true
  }
}`,...(h=(S=a.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const T=["Default","WithPlaceholder","CustomPrompt","Disabled"];export{r as CustomPrompt,o as Default,a as Disabled,s as WithPlaceholder,T as __namedExportsOrder,x as default};
