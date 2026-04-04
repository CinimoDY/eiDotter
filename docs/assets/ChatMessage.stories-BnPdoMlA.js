import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{C as s}from"./ChatMessage-DfCvkyte.js";import{c as b}from"./registry-BXQUvPFZ.js";/* empty css                  */const q={title:"Components/Chat/ChatMessage",component:s,parameters:{layout:"padded",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:b.ChatMessage},tags:["autodocs"],argTypes:{role:{control:"select",options:["user","assistant","system"]},isStreaming:{control:"boolean"}}},r={args:{role:"user",content:"dir C:\\Projects"}},t={args:{role:"assistant",content:`Volume in drive C has no label.
Directory of C:\\Projects

03/15/2026  10:24 AM    <DIR>    eidotter
03/15/2026  10:24 AM    <DIR>    rizomorf
               2 Dir(s)  42,069,420 bytes free`}},o={args:{role:"system",content:"Connection established. ADOS Chat v1.0"}},a={args:{role:"assistant",content:"Processing your request",isStreaming:!0}},n={args:{role:"user",content:"custom prefix example",userPrefix:"$"}},c={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[e.jsx(s,{role:"system",content:"ADOS Chat v1.0 initialized"}),e.jsx(s,{role:"user",content:"What can you do?"}),e.jsx(s,{role:"assistant",content:"I can help you navigate the DOS filesystem, run programs, and answer questions about your system."}),e.jsx(s,{role:"user",content:"Show me the current directory"}),e.jsx(s,{role:"assistant",content:"Loading...",isStreaming:!0})]})};var i,m,l;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    role: 'user',
    content: 'dir C:\\\\Projects'
  }
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var u,d,p;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    role: 'assistant',
    content: 'Volume in drive C has no label.\\nDirectory of C:\\\\Projects\\n\\n03/15/2026  10:24 AM    <DIR>    eidotter\\n03/15/2026  10:24 AM    <DIR>    rizomorf\\n               2 Dir(s)  42,069,420 bytes free'
  }
}`,...(p=(d=t.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var g,y,h;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    role: 'system',
    content: 'Connection established. ADOS Chat v1.0'
  }
}`,...(h=(y=o.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var C,x,f;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    role: 'assistant',
    content: 'Processing your request',
    isStreaming: true
  }
}`,...(f=(x=a.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var S,D,j;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    role: 'user',
    content: 'custom prefix example',
    userPrefix: '$'
  }
}`,...(j=(D=n.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var v,M,A;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  }}>
      <ChatMessage role="system" content="ADOS Chat v1.0 initialized" />
      <ChatMessage role="user" content="What can you do?" />
      <ChatMessage role="assistant" content="I can help you navigate the DOS filesystem, run programs, and answer questions about your system." />
      <ChatMessage role="user" content="Show me the current directory" />
      <ChatMessage role="assistant" content="Loading..." isStreaming />
    </div>
}`,...(A=(M=c.parameters)==null?void 0:M.docs)==null?void 0:A.source}}};const w=["User","Assistant","System","Streaming","CustomPrefixes","AllRoles"];export{c as AllRoles,t as Assistant,n as CustomPrefixes,a as Streaming,o as System,r as User,w as __namedExportsOrder,q as default};
