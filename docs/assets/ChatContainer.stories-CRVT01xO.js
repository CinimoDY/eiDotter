import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as x}from"./iframe-BU4rT9RF.js";import{c as E}from"./cn-CvUv5FIJ.js";import{C as P}from"./ChatHistory-CAqmexYc.js";import{C as I}from"./ChatInput-AaqFQcqA.js";import{T as h}from"./Terminal-qrnaLV4B.js";import{c as N}from"./registry-CyM9n0D0.js";import"./preload-helper-Dp1pzeXC.js";import"./ChatMessage-B__xi9g9.js";/* empty css                  */import"./Button-Ctavax2i.js";import"./useFocusRing-BUJkGnC-.js";import"./Hidden-BtSPQEnR.js";import"./usePress-Bjtlcj0Z.js";import"./index-CqfCC26D.js";import"./index-C2QVYWFi.js";import"./Icon-CtGTmgBb.js";const a=({messages:s,onSend:r,isStreaming:n=!1,inputPrompt:o,userPrefix:c,assistantPrefix:i,placeholder:g,disabled:t=!1,className:u,...M})=>e.jsxs("div",{className:E("flex flex-col h-full min-h-0 bg-dos-bg-primary",u),...M,children:[e.jsx(P,{className:"flex-1 min-h-0",messages:s,isStreaming:n,userPrefix:c,assistantPrefix:i}),e.jsx(I,{className:"shrink-0",onSend:r,prompt:o,placeholder:g,disabled:t})]});a.__docgenInfo={description:`Complete DOS-themed chat interface composing ChatHistory and ChatInput.

Designed to be placed inside a Terminal component for the full DOS window
experience, but works standalone too.

\`\`\`tsx
<Terminal title="ADOS Chat">
  <ChatContainer messages={messages} onSend={send} isStreaming={loading} />
</Terminal>
\`\`\``,methods:[],displayName:"ChatContainer",props:{messages:{required:!0,tsType:{name:"Array",elements:[{name:"ChatMessageEntry"}],raw:"ChatMessageEntry[]"},description:"Array of messages to display"},onSend:{required:!0,tsType:{name:"signature",type:"function",raw:"(message: string) => void",signature:{arguments:[{type:{name:"string"},name:"message"}],return:{name:"void"}}},description:"Called when the user sends a message"},isStreaming:{required:!1,tsType:{name:"boolean"},description:"Whether the last assistant message is still streaming",defaultValue:{value:"false",computed:!1}},inputPrompt:{required:!1,tsType:{name:"string"},description:"Prompt character for the input field"},userPrefix:{required:!1,tsType:{name:"string"},description:"Prefix shown before user messages"},assistantPrefix:{required:!1,tsType:{name:"string"},description:"Prefix shown before assistant messages"},placeholder:{required:!1,tsType:{name:"string"},description:"Placeholder text for the input field"},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the input is disabled",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name"}}};const Z={title:"Components/Chat/ChatContainer",component:a,parameters:{layout:"fullscreen",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:N.ChatContainer},tags:["autodocs"]},f=[{id:"1",role:"system",content:"ADOS Chat v1.0 — Welcome to the DOS terminal."},{id:"2",role:"user",content:"hello"},{id:"3",role:"assistant",content:"Greetings, user. How may I assist you today?"}],d={args:{messages:f,onSend:s=>console.log("Send:",s)},decorators:[s=>e.jsx("div",{style:{height:"400px",padding:"16px"},children:e.jsx(s,{})})]},l={render:()=>e.jsx("div",{style:{height:"500px",padding:"16px"},children:e.jsx(h,{title:"ADOS Chat",children:e.jsx(a,{messages:f,onSend:s=>console.log("Send:",s),placeholder:"Type a command..."})})})},R=()=>{const[s,r]=x.useState(f),[n,o]=x.useState(!1),c=i=>{const g={id:String(Date.now()),role:"user",content:i};r(t=>[...t,g]),o(!0),setTimeout(()=>{const t={id:String(Date.now()+1),role:"assistant",content:`Processing "${i}"...

Command executed successfully.
Ready for next input.`};r(u=>[...u,t]),o(!1)},2e3)};return e.jsx("div",{style:{height:"500px",padding:"16px"},children:e.jsx(h,{title:"ADOS Chat v1.0",children:e.jsx(a,{messages:s,onSend:c,isStreaming:n,disabled:n,placeholder:"Enter command..."})})})},m={render:R},p={render:()=>e.jsx("div",{style:{height:"400px",padding:"16px"},children:e.jsx(h,{title:"ADOS Chat",children:e.jsx(a,{messages:[],onSend:s=>console.log("Send:",s),placeholder:"Start chatting..."})})})};var S,y,C;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    messages: initialMessages,
    onSend: (msg: string) => console.log('Send:', msg)
  },
  decorators: [Story => <div style={{
    height: '400px',
    padding: '16px'
  }}>
        <Story />
      </div>]
}`,...(C=(y=d.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var T,v,D;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    height: '500px',
    padding: '16px'
  }}>
      <Terminal title="ADOS Chat">
        <ChatContainer messages={initialMessages} onSend={msg => console.log('Send:', msg)} placeholder="Type a command..." />
      </Terminal>
    </div>
}`,...(D=(v=l.parameters)==null?void 0:v.docs)==null?void 0:D.source}}};var j,b,w;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: FullDemoRender
}`,...(w=(b=m.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var O,A,q;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div style={{
    height: '400px',
    padding: '16px'
  }}>
      <Terminal title="ADOS Chat">
        <ChatContainer messages={[]} onSend={msg => console.log('Send:', msg)} placeholder="Start chatting..." />
      </Terminal>
    </div>
}`,...(q=(A=p.parameters)==null?void 0:A.docs)==null?void 0:q.source}}};const ee=["Default","InsideTerminal","FullDemo","Empty"];export{d as Default,p as Empty,m as FullDemo,l as InsideTerminal,ee as __namedExportsOrder,Z as default};
