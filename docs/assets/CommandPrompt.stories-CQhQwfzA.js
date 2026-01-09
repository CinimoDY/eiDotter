import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as i}from"./index-qdalL59a.js";import"./_commonjsHelpers-CqkleIqs.js";const h=({prompt:e="C:\\>",onCommand:u,autoFocus:r=!1,className:C="",placeholder:a,disabled:o=!1})=>{const[f,y]=i.useState(""),t=i.useRef(null);i.useEffect(()=>{r&&t.current&&t.current.focus()},[r]);const F=g=>{g.key==="Enter"&&f.trim()&&!o&&(u(f.trim()),y(""))},H=()=>{!o&&t.current&&t.current.focus()};return n.jsxs("div",{className:`command-prompt ${o?"command-prompt--disabled":""} ${C}`.trim(),onClick:H,role:"textbox","aria-label":"Command prompt",children:[n.jsx("span",{className:"command-prompt__prompt","aria-hidden":"true",children:e}),n.jsx("input",{ref:t,className:"command-prompt__input",value:f,onChange:g=>y(g.target.value),onKeyDown:F,autoFocus:r,spellCheck:!1,autoComplete:"off",autoCapitalize:"off",autoCorrect:"off",placeholder:a,disabled:o,"aria-label":"Command input"}),n.jsx("span",{className:"command-prompt__cursor","aria-hidden":"true",children:"█"})]})};h.__docgenInfo={description:`DOS-styled CommandPrompt component with authentic terminal aesthetics\r
\r
Features:\r
- Configurable prompt string (e.g., "C:\\>", "$")\r
- Enter key triggers onCommand callback\r
- Blinking cursor for DOS feel\r
- Auto-focus support\r
- WCAG 2.1 AA compliant`,methods:[],displayName:"CommandPrompt",props:{prompt:{required:!1,tsType:{name:"string"},description:`The prompt string displayed before cursor\r
@default "C:\\>"`,defaultValue:{value:"'C:\\\\>'",computed:!1}},onCommand:{required:!0,tsType:{name:"signature",type:"function",raw:"(command: string) => void",signature:{arguments:[{type:{name:"string"},name:"command"}],return:{name:"void"}}},description:"Called when user presses Enter with command text"},autoFocus:{required:!1,tsType:{name:"boolean"},description:"Auto-focus the input on mount",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional class name",defaultValue:{value:"''",computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:"Placeholder text when input is empty"},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the command prompt is disabled",defaultValue:{value:"false",computed:!1}}}};const G={title:"Components/CommandPrompt",component:h,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{prompt:{control:"text",defaultValue:"C:\\>"},autoFocus:{control:"boolean",defaultValue:!1},disabled:{control:"boolean",defaultValue:!1},placeholder:{control:"text"},onCommand:{action:"command"}}},s={args:{prompt:"C:\\>",onCommand:e=>console.log("Command:",e)}},m={args:{prompt:"$",onCommand:e=>console.log("Command:",e)}},d={args:{prompt:"user@dos:~$",onCommand:e=>console.log("Command:",e)}},c={args:{prompt:"C:\\>",disabled:!0,onCommand:e=>console.log("Command:",e)}},l={args:{prompt:"C:\\>",placeholder:"Type a command...",onCommand:e=>console.log("Command:",e)}},p={render:function(){const[u,r]=i.useState([]),C=a=>{r(o=>[...o,`C:\\> ${a}`,`Executed: ${a}`])};return n.jsx("div",{style:{width:"400px",fontFamily:'"Perfect DOS VGA 437", Consolas, monospace'},children:n.jsxs("div",{style:{background:"#000",color:"#AAAAAA",padding:"16px",minHeight:"200px"},children:[u.map((a,o)=>n.jsx("div",{style:{marginBottom:"4px"},children:a},o)),n.jsx(h,{prompt:"C:\\>",onCommand:C,autoFocus:!0})]})})}};var x,v,A;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    prompt: 'C:\\\\>',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...(A=(v=s.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};var b,S,P;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    prompt: '$',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...(P=(S=m.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var k,$,j;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    prompt: 'user@dos:~$',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...(j=($=d.parameters)==null?void 0:$.docs)==null?void 0:j.source}}};var D,T,V;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    prompt: 'C:\\\\>',
    disabled: true,
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...(V=(T=c.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};var _,w,E;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    prompt: 'C:\\\\>',
    placeholder: 'Type a command...',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...(E=(w=l.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};var q,N,O;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: function InteractiveStory() {
    const [history, setHistory] = useState<string[]>([]);
    const handleCommand = (command: string) => {
      setHistory(prev => [...prev, \`C:\\\\> \${command}\`, \`Executed: \${command}\`]);
    };
    return <div style={{
      width: '400px',
      fontFamily: '"Perfect DOS VGA 437", Consolas, monospace'
    }}>
        <div style={{
        background: '#000',
        color: '#AAAAAA',
        padding: '16px',
        minHeight: '200px'
      }}>
          {history.map((line, i) => <div key={i} style={{
          marginBottom: '4px'
        }}>{line}</div>)}
          <CommandPrompt prompt="C:\\>" onCommand={handleCommand} autoFocus />
        </div>
      </div>;
  }
}`,...(O=(N=p.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};const R=["Default","CustomPrompt","UnixPrompt","Disabled","WithPlaceholder","Interactive"];export{m as CustomPrompt,s as Default,c as Disabled,p as Interactive,d as UnixPrompt,l as WithPlaceholder,R as __namedExportsOrder,G as default};
