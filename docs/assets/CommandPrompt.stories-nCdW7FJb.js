import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./iframe-DuFfgGUU.js";/* empty css                  */import{c as H}from"./registry-CyM9n0D0.js";import"./preload-helper-Dp1pzeXC.js";const h=({prompt:e="C:\\>",onCommand:C,autoFocus:a=!1,className:f="",placeholder:r,disabled:n=!1})=>{const[s,y]=u.useState(""),t=u.useRef(null);u.useEffect(()=>{a&&t.current&&t.current.focus()},[a]);const q=g=>{g.key==="Enter"&&s.trim()&&!n&&(C(s.trim()),y(""))},B=()=>{!n&&t.current&&t.current.focus()};return o.jsxs("div",{className:`command-prompt ${n?"command-prompt--disabled":""} ${f}`.trim(),onClick:B,role:"textbox","aria-label":"Command prompt",children:[o.jsx("span",{className:"command-prompt__prompt","aria-hidden":"true",children:e}),o.jsxs("div",{className:"command-prompt__input-wrapper",children:[o.jsx("input",{ref:t,className:"command-prompt__input",value:s,onChange:g=>y(g.target.value),onKeyDown:q,autoFocus:a,spellCheck:!1,autoComplete:"off",autoCapitalize:"off",autoCorrect:"off",placeholder:r,disabled:n,"aria-label":"Command input",size:s.length||1}),o.jsx("span",{className:"command-prompt__cursor","aria-hidden":"true",children:"█"})]})]})};h.__docgenInfo={description:`DOS-styled CommandPrompt component with authentic terminal aesthetics\r
\r
Features:\r
- Configurable prompt string (e.g., "C:\\>", "$")\r
- Enter key triggers onCommand callback\r
- Blinking cursor for DOS feel\r
- Auto-focus support\r
- WCAG 2.1 AA compliant`,methods:[],displayName:"CommandPrompt",props:{prompt:{required:!1,tsType:{name:"string"},description:`The prompt string displayed before cursor\r
@default "C:\\>"`,defaultValue:{value:"'C:\\\\>'",computed:!1}},onCommand:{required:!0,tsType:{name:"signature",type:"function",raw:"(command: string) => void",signature:{arguments:[{type:{name:"string"},name:"command"}],return:{name:"void"}}},description:"Called when user presses Enter with command text"},autoFocus:{required:!1,tsType:{name:"boolean"},description:"Auto-focus the input on mount",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional class name",defaultValue:{value:"''",computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:"Placeholder text when input is empty"},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the command prompt is disabled",defaultValue:{value:"false",computed:!1}}}};const z={title:"Components/CommandPrompt",component:h,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:H.CommandPrompt},tags:["autodocs"],argTypes:{prompt:{control:"text",defaultValue:"C:\\>"},autoFocus:{control:"boolean",defaultValue:!1},disabled:{control:"boolean",defaultValue:!1},placeholder:{control:"text"},onCommand:{action:"command"}}},m={args:{prompt:"C:\\>",onCommand:e=>console.log("Command:",e)}},d={args:{prompt:"$",onCommand:e=>console.log("Command:",e)}},c={args:{prompt:"user@dos:~$",onCommand:e=>console.log("Command:",e)}},p={args:{prompt:"C:\\>",disabled:!0,onCommand:e=>console.log("Command:",e)}},l={args:{prompt:"C:\\>",placeholder:"Type a command...",onCommand:e=>console.log("Command:",e)}},i={render:function(){const[C,a]=u.useState([]),f=r=>{a(n=>[...n,`C:\\> ${r}`,`Executed: ${r}`])};return o.jsx("div",{style:{width:"400px",fontFamily:'"Flexi IBM VGA True", monospace'},children:o.jsxs("div",{style:{background:"#000",color:"#AAAAAA",padding:"16px",minHeight:"200px"},children:[C.map((r,n)=>o.jsx("div",{style:{marginBottom:"4px"},children:r},n)),o.jsx(h,{prompt:"C:\\>",onCommand:f,autoFocus:!0})]})})}};var x,v,A;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    prompt: 'C:\\\\>',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...(A=(v=m.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};var b,P,S;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    prompt: '$',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...(S=(P=d.parameters)==null?void 0:P.docs)==null?void 0:S.source}}};var j,T,_;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    prompt: 'user@dos:~$',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...(_=(T=c.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var k,$,w;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    prompt: 'C:\\\\>',
    disabled: true,
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...(w=($=p.parameters)==null?void 0:$.docs)==null?void 0:w.source}}};var V,E,D;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    prompt: 'C:\\\\>',
    placeholder: 'Type a command...',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...(D=(E=l.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var F,I,N;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function InteractiveStory() {
    const [history, setHistory] = useState<string[]>([]);
    const handleCommand = (command: string) => {
      setHistory(prev => [...prev, \`C:\\\\> \${command}\`, \`Executed: \${command}\`]);
    };
    return <div style={{
      width: '400px',
      fontFamily: '"Flexi IBM VGA True", monospace'
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
}`,...(N=(I=i.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};const K=["Default","CustomPrompt","UnixPrompt","Disabled","WithPlaceholder","Interactive"];export{d as CustomPrompt,m as Default,p as Disabled,i as Interactive,c as UnixPrompt,l as WithPlaceholder,K as __namedExportsOrder,z as default};
