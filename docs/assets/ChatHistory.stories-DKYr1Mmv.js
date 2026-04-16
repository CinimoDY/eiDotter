import{j as i}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./iframe-BU4rT9RF.js";import{C as M}from"./ChatHistory-CAqmexYc.js";import{c as R}from"./registry-CyM9n0D0.js";import"./preload-helper-Dp1pzeXC.js";import"./cn-CvUv5FIJ.js";import"./ChatMessage-B__xi9g9.js";/* empty css                  */const F={title:"Components/Chat/ChatHistory",component:M,parameters:{layout:"padded",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:R.ChatHistory},tags:["autodocs"]},c=[{id:"1",role:"system",content:"ADOS Chat v1.0 — Type a command to begin."},{id:"2",role:"user",content:"help"},{id:"3",role:"assistant",content:`Available commands:
  dir     — list files
  type    — display file contents
  cls     — clear screen
  ver     — show version`},{id:"4",role:"user",content:"ver"},{id:"5",role:"assistant",content:`eiDotter Design System v0.14.0
DOS Compatibility Mode: ENABLED`}],e={args:{messages:c}},s={args:{messages:[]}},t={args:{messages:[...c,{id:"6",role:"user",content:"dir"},{id:"7",role:"assistant",content:"Scanning directory"}],isStreaming:!0}},A=()=>{const[a,m]=l.useState(c),[E,d]=l.useState(!1),j=()=>{const n=String(a.length+1);m(o=>[...o,{id:n,role:"user",content:`Command #${n}`}]),d(!0),setTimeout(()=>{const o=String(a.length+2);m(I=>[...I,{id:o,role:"assistant",content:`Response to command #${n}`}]),d(!1)},1500)};return i.jsxs("div",{style:{height:"300px",display:"flex",flexDirection:"column"},children:[i.jsx(M,{messages:a,isStreaming:E,style:{flex:1,border:"1px solid var(--color-semantic-border-default)"}}),i.jsx("button",{onClick:j,style:{marginTop:"8px",background:"var(--color-cga-amber, #ffb000)",color:"#000",border:"none",padding:"4px 12px",fontFamily:"inherit",cursor:"pointer"},children:"Add Message"})]})},r={render:A};var p,g,u;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    messages: sampleMessages
  }
}`,...(u=(g=e.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var y,f,S;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    messages: []
  }
}`,...(S=(f=s.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var x,v,h;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(h=(v=t.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var b,C,D;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: InteractiveRender
}`,...(D=(C=r.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const L=["Default","Empty","Streaming","Interactive"];export{e as Default,s as Empty,r as Interactive,t as Streaming,L as __namedExportsOrder,F as default};
