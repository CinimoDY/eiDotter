import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";import{n as o,t as s}from"./registry-BqccLuet.js";import{n as c,t as l}from"./ChatHistory-dl7qFqDP.js";import{n as u,t as d}from"./ChatInput-VUF03j5Y.js";import{n as f,t as p}from"./Terminal-Bz_xF-_k.js";var m,h,g=e((()=>{n(),i(),c(),u(),m=r(),h=({messages:e,onSend:t,isStreaming:n=!1,inputPrompt:r,userPrefix:i,assistantPrefix:o,placeholder:s,disabled:c=!1,className:u,...f})=>(0,m.jsxs)(`div`,{className:a(`flex flex-col h-full min-h-0`,u),...f,children:[(0,m.jsx)(l,{className:`flex-1 min-h-0`,messages:e,isStreaming:n,userPrefix:i,assistantPrefix:o}),(0,m.jsx)(d,{className:`shrink-0`,onSend:t,prompt:r,placeholder:s,disabled:c})]}),h.__docgenInfo={description:`Complete DOS-themed chat interface composing ChatHistory and ChatInput.

Designed to be placed inside a Terminal component for the full DOS window
experience, but works standalone too.

\`\`\`tsx
<Terminal title="ADOS Chat">
  <ChatContainer messages={messages} onSend={send} isStreaming={loading} />
</Terminal>
\`\`\``,methods:[],displayName:`ChatContainer`,props:{messages:{required:!0,tsType:{name:`Array`,elements:[{name:`ChatMessageEntry`}],raw:`ChatMessageEntry[]`},description:`Array of messages to display`},onSend:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(message: string) => void`,signature:{arguments:[{type:{name:`string`},name:`message`}],return:{name:`void`}}},description:`Called when the user sends a message`},isStreaming:{required:!1,tsType:{name:`boolean`},description:`Whether the last assistant message is still streaming`,defaultValue:{value:`false`,computed:!1}},inputPrompt:{required:!1,tsType:{name:`string`},description:`Prompt character for the input field`},userPrefix:{required:!1,tsType:{name:`string`},description:`Prefix shown before user messages`},assistantPrefix:{required:!1,tsType:{name:`string`},description:`Prefix shown before assistant messages`},placeholder:{required:!1,tsType:{name:`string`},description:`Placeholder text for the input field`},disabled:{required:!1,tsType:{name:`boolean`},description:`Whether the input is disabled`,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name`}}}})),_,v,y,b,x,S,C,w,T,E;e((()=>{_=t(n(),1),g(),f(),o(),v=r(),y={title:`Components/Chat/ChatContainer`,component:h,parameters:{layout:`fullscreen`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:s.ChatContainer},tags:[`autodocs`]},b=[{id:`1`,role:`system`,content:`ADOS Chat v1.0 — Welcome to the DOS terminal.`},{id:`2`,role:`user`,content:`hello`},{id:`3`,role:`assistant`,content:`Greetings, user. How may I assist you today?`}],x={args:{messages:b,onSend:e=>console.log(`Send:`,e)},decorators:[e=>(0,v.jsx)(`div`,{style:{height:`400px`,padding:`16px`},children:(0,v.jsx)(e,{})})]},S={render:()=>(0,v.jsx)(`div`,{style:{height:`500px`,padding:`16px`},children:(0,v.jsx)(p,{title:`ADOS Chat`,children:(0,v.jsx)(h,{messages:b,onSend:e=>console.log(`Send:`,e),placeholder:`Type a command...`})})})},C=()=>{let[e,t]=(0,_.useState)(b),[n,r]=(0,_.useState)(!1);return(0,v.jsx)(`div`,{style:{height:`500px`,padding:`16px`},children:(0,v.jsx)(p,{title:`ADOS Chat v1.0`,children:(0,v.jsx)(h,{messages:e,onSend:e=>{let n={id:String(Date.now()),role:`user`,content:e};t(e=>[...e,n]),r(!0),setTimeout(()=>{let n={id:String(Date.now()+1),role:`assistant`,content:`Processing "${e}"...\n\nCommand executed successfully.\nReady for next input.`};t(e=>[...e,n]),r(!1)},2e3)},isStreaming:n,disabled:n,placeholder:`Enter command...`})})})},w={render:C},T={render:()=>(0,v.jsx)(`div`,{style:{height:`400px`,padding:`16px`},children:(0,v.jsx)(p,{title:`ADOS Chat`,children:(0,v.jsx)(h,{messages:[],onSend:e=>console.log(`Send:`,e),placeholder:`Start chatting...`})})})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    height: '500px',
    padding: '16px'
  }}>
      <Terminal title="ADOS Chat">
        <ChatContainer messages={initialMessages} onSend={msg => console.log('Send:', msg)} placeholder="Type a command..." />
      </Terminal>
    </div>
}`,...S.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: FullDemoRender
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    height: '400px',
    padding: '16px'
  }}>
      <Terminal title="ADOS Chat">
        <ChatContainer messages={[]} onSend={msg => console.log('Send:', msg)} placeholder="Start chatting..." />
      </Terminal>
    </div>
}`,...T.parameters?.docs?.source}}},E=[`Default`,`InsideTerminal`,`FullDemo`,`Empty`]}))();export{x as Default,T as Empty,w as FullDemo,S as InsideTerminal,E as __namedExportsOrder,y as default};