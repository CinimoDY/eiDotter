import{j as i}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./iframe-CMgb2h7h.js";import{C as D}from"./ChatHistory-vBbTx9Ir.js";import{c as A}from"./registry-BMuWnSIt.js";import"./preload-helper-Dp1pzeXC.js";import"./ChatMessage-DfCvkyte.js";/* empty css                  */const _={title:"Components/Chat/ChatHistory",component:D,parameters:{layout:"padded",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:A.ChatHistory},tags:["autodocs"]},c=[{id:"1",role:"system",content:"ADOS Chat v1.0 — Type a command to begin."},{id:"2",role:"user",content:"help"},{id:"3",role:"assistant",content:`Available commands:
  dir     — list files
  type    — display file contents
  cls     — clear screen
  ver     — show version`},{id:"4",role:"user",content:"ver"},{id:"5",role:"assistant",content:`eiDotter Design System v0.14.0
DOS Compatibility Mode: ENABLED`}],e={args:{messages:c}},s={args:{messages:[]}},n={args:{messages:[...c,{id:"6",role:"user",content:"dir"},{id:"7",role:"assistant",content:"Scanning directory"}],isStreaming:!0}},t={render:()=>{const[r,m]=l.useState(c),[E,d]=l.useState(!1),j=()=>{const a=String(r.length+1);m(o=>[...o,{id:a,role:"user",content:`Command #${a}`}]),d(!0),setTimeout(()=>{const o=String(r.length+2);m(k=>[...k,{id:o,role:"assistant",content:`Response to command #${a}`}]),d(!1)},1500)};return i.jsxs("div",{style:{height:"300px",display:"flex",flexDirection:"column"},children:[i.jsx(D,{messages:r,isStreaming:E,style:{flex:1,border:"1px solid var(--color-semantic-border-default)"}}),i.jsx("button",{onClick:j,style:{marginTop:"8px",background:"var(--color-cga-amber, #ffb000)",color:"#000",border:"none",padding:"4px 12px",fontFamily:"inherit",cursor:"pointer"},children:"Add Message"})]})}};var g,p,u;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    messages: sampleMessages
  }
}`,...(u=(p=e.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var y,f,S;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    messages: []
  }
}`,...(S=(f=s.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var x,h,v;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(v=(h=n.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var b,M,C;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const [messages, setMessages] = useState<ChatMessageEntry[]>(sampleMessages);
    const [streaming, setStreaming] = useState(false);
    const addMessage = () => {
      const id = String(messages.length + 1);
      setMessages(prev => [...prev, {
        id,
        role: 'user',
        content: \`Command #\${id}\`
      }]);
      setStreaming(true);
      setTimeout(() => {
        const replyId = String(messages.length + 2);
        setMessages(prev => [...prev, {
          id: replyId,
          role: 'assistant',
          content: \`Response to command #\${id}\`
        }]);
        setStreaming(false);
      }, 1500);
    };
    return <div style={{
      height: '300px',
      display: 'flex',
      flexDirection: 'column'
    }}>
        <ChatHistory messages={messages} isStreaming={streaming} style={{
        flex: 1,
        border: '1px solid var(--color-semantic-border-default)'
      }} />
        <button onClick={addMessage} style={{
        marginTop: '8px',
        background: 'var(--color-cga-amber, #ffb000)',
        color: '#000',
        border: 'none',
        padding: '4px 12px',
        fontFamily: 'inherit',
        cursor: 'pointer'
      }}>
          Add Message
        </button>
      </div>;
  }
}`,...(C=(M=t.parameters)==null?void 0:M.docs)==null?void 0:C.source}}};const w=["Default","Empty","Streaming","Interactive"];export{e as Default,s as Empty,t as Interactive,n as Streaming,w as __namedExportsOrder,_ as default};
