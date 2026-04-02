import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as f}from"./iframe-CMgb2h7h.js";import{C as P}from"./ChatHistory-vBbTx9Ir.js";import{C as _}from"./ChatInput-DXVddb4v.js";import{T as h}from"./Terminal-SOQB4jYo.js";import{c as I}from"./registry-BMuWnSIt.js";import"./preload-helper-Dp1pzeXC.js";import"./ChatMessage-DfCvkyte.js";/* empty css                  */import"./Icon-CqEaCbnm.js";const a=({messages:s,onSend:n,isStreaming:r=!1,inputPrompt:i,userPrefix:p,assistantPrefix:o,placeholder:g,disabled:t=!1,className:u="",...b})=>{const q=["chat-container",u].filter(Boolean).join(" ");return e.jsxs("div",{className:q,...b,children:[e.jsx(P,{className:"chat-container__history",messages:s,isStreaming:r,userPrefix:p,assistantPrefix:o}),e.jsx(_,{className:"chat-container__input",onSend:n,prompt:i,placeholder:g,disabled:t})]})};a.__docgenInfo={description:`Complete DOS-themed chat interface composing ChatHistory and ChatInput.

Designed to be placed inside a Terminal component for the full DOS window
experience, but works standalone too.

\`\`\`tsx
<Terminal title="ADOS Chat">
  <ChatContainer messages={messages} onSend={send} isStreaming={loading} />
</Terminal>
\`\`\``,methods:[],displayName:"ChatContainer",props:{messages:{required:!0,tsType:{name:"Array",elements:[{name:"ChatMessageEntry"}],raw:"ChatMessageEntry[]"},description:"Array of messages to display"},onSend:{required:!0,tsType:{name:"signature",type:"function",raw:"(message: string) => void",signature:{arguments:[{type:{name:"string"},name:"message"}],return:{name:"void"}}},description:"Called when the user sends a message"},isStreaming:{required:!1,tsType:{name:"boolean"},description:"Whether the last assistant message is still streaming",defaultValue:{value:"false",computed:!1}},inputPrompt:{required:!1,tsType:{name:"string"},description:"Prompt character for the input field"},userPrefix:{required:!1,tsType:{name:"string"},description:"Prefix shown before user messages"},assistantPrefix:{required:!1,tsType:{name:"string"},description:"Prefix shown before assistant messages"},placeholder:{required:!1,tsType:{name:"string"},description:"Placeholder text for the input field"},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the input is disabled",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name",defaultValue:{value:"''",computed:!1}}}};const z={title:"Components/Chat/ChatContainer",component:a,parameters:{layout:"fullscreen",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:I.ChatContainer},tags:["autodocs"]},S=[{id:"1",role:"system",content:"ADOS Chat v1.0 — Welcome to the DOS terminal."},{id:"2",role:"user",content:"hello"},{id:"3",role:"assistant",content:"Greetings, user. How may I assist you today?"}],d={args:{messages:S,onSend:s=>console.log("Send:",s)},decorators:[s=>e.jsx("div",{style:{height:"400px",padding:"16px"},children:e.jsx(s,{})})]},l={render:()=>e.jsx("div",{style:{height:"500px",padding:"16px"},children:e.jsx(h,{title:"ADOS Chat",children:e.jsx(a,{messages:S,onSend:s=>console.log("Send:",s),placeholder:"Type a command..."})})})},m={render:()=>{const[s,n]=f.useState(S),[r,i]=f.useState(!1),p=o=>{const g={id:String(Date.now()),role:"user",content:o};n(t=>[...t,g]),i(!0),setTimeout(()=>{const t={id:String(Date.now()+1),role:"assistant",content:`Processing "${o}"...

Command executed successfully.
Ready for next input.`};n(u=>[...u,t]),i(!1)},2e3)};return e.jsx("div",{style:{height:"500px",padding:"16px"},children:e.jsx(h,{title:"ADOS Chat v1.0",children:e.jsx(a,{messages:s,onSend:p,isStreaming:r,disabled:r,placeholder:"Enter command..."})})})}},c={render:()=>e.jsx("div",{style:{height:"400px",padding:"16px"},children:e.jsx(h,{title:"ADOS Chat",children:e.jsx(a,{messages:[],onSend:s=>console.log("Send:",s),placeholder:"Start chatting..."})})})};var x,y,C;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(C=(y=d.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var v,T,D;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    height: '500px',
    padding: '16px'
  }}>
      <Terminal title="ADOS Chat">
        <ChatContainer messages={initialMessages} onSend={msg => console.log('Send:', msg)} placeholder="Type a command..." />
      </Terminal>
    </div>
}`,...(D=(T=l.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var M,j,w;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => {
    const [messages, setMessages] = useState<ChatMessageEntry[]>(initialMessages);
    const [streaming, setStreaming] = useState(false);
    const handleSend = (text: string) => {
      const userMsg: ChatMessageEntry = {
        id: String(Date.now()),
        role: 'user',
        content: text
      };
      setMessages(prev => [...prev, userMsg]);
      setStreaming(true);

      // Simulate AI response
      setTimeout(() => {
        const aiMsg: ChatMessageEntry = {
          id: String(Date.now() + 1),
          role: 'assistant',
          content: \`Processing "\${text}"...\\n\\nCommand executed successfully.\\nReady for next input.\`
        };
        setMessages(prev => [...prev, aiMsg]);
        setStreaming(false);
      }, 2000);
    };
    return <div style={{
      height: '500px',
      padding: '16px'
    }}>
        <Terminal title="ADOS Chat v1.0">
          <ChatContainer messages={messages} onSend={handleSend} isStreaming={streaming} disabled={streaming} placeholder="Enter command..." />
        </Terminal>
      </div>;
  }
}`,...(w=(j=m.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var A,E,O;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div style={{
    height: '400px',
    padding: '16px'
  }}>
      <Terminal title="ADOS Chat">
        <ChatContainer messages={[]} onSend={msg => console.log('Send:', msg)} placeholder="Start chatting..." />
      </Terminal>
    </div>
}`,...(O=(E=c.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};const J=["Default","InsideTerminal","FullDemo","Empty"];export{d as Default,c as Empty,m as FullDemo,l as InsideTerminal,J as __namedExportsOrder,z as default};
