import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./registry-BqccLuet.js";import{t as o}from"./keyframes-BF4aC914.js";var s=e((()=>{})),c,l,u,d=e((()=>{c=t(n(),1),o(),s(),l=r(),u=({prompt:e=`C:\\>`,onCommand:t,autoFocus:n=!1,className:r=``,placeholder:i,disabled:a=!1})=>{let[o,s]=(0,c.useState)(``),u=(0,c.useRef)(null);return(0,c.useEffect)(()=>{n&&u.current&&u.current.focus()},[n]),(0,l.jsxs)(`div`,{className:`command-prompt ${a?`command-prompt--disabled`:``} ${r}`.trim(),onClick:()=>{!a&&u.current&&u.current.focus()},role:`textbox`,"aria-label":`Command prompt`,children:[(0,l.jsx)(`span`,{className:`command-prompt__prompt`,"aria-hidden":`true`,children:e}),(0,l.jsxs)(`div`,{className:`command-prompt__input-wrapper`,children:[(0,l.jsx)(`input`,{ref:u,className:`command-prompt__input`,value:o,onChange:e=>s(e.target.value),onKeyDown:e=>{e.key===`Enter`&&o.trim()&&!a&&(t(o.trim()),s(``))},autoFocus:n,spellCheck:!1,autoComplete:`off`,autoCapitalize:`off`,autoCorrect:`off`,placeholder:i,disabled:a,"aria-label":`Command input`,size:o.length||1}),(0,l.jsx)(`span`,{className:`command-prompt__cursor`,"aria-hidden":`true`,children:`█`})]})]})},u.__docgenInfo={description:`DOS-styled CommandPrompt component with authentic terminal aesthetics\r
\r
Features:\r
- Configurable prompt string (e.g., "C:\\>", "$")\r
- Enter key triggers onCommand callback\r
- Blinking cursor for DOS feel\r
- Auto-focus support\r
- WCAG 2.1 AA compliant`,methods:[],displayName:`CommandPrompt`,props:{prompt:{required:!1,tsType:{name:`string`},description:`The prompt string displayed before cursor\r
@default "C:\\>"`,defaultValue:{value:`'C:\\\\>'`,computed:!1}},onCommand:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(command: string) => void`,signature:{arguments:[{type:{name:`string`},name:`command`}],return:{name:`void`}}},description:`Called when user presses Enter with command text`},autoFocus:{required:!1,tsType:{name:`boolean`},description:`Auto-focus the input on mount`,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Optional class name`,defaultValue:{value:`''`,computed:!1}},placeholder:{required:!1,tsType:{name:`string`},description:`Placeholder text when input is empty`},disabled:{required:!1,tsType:{name:`boolean`},description:`Whether the command prompt is disabled`,defaultValue:{value:`false`,computed:!1}}}}})),f,p,m,h,g,_,v,y,b,x;e((()=>{f=t(n(),1),d(),i(),p=r(),m={title:`Components/CommandPrompt`,component:u,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:a.CommandPrompt},tags:[`autodocs`],argTypes:{prompt:{control:`text`,defaultValue:`C:\\>`},autoFocus:{control:`boolean`,defaultValue:!1},disabled:{control:`boolean`,defaultValue:!1},placeholder:{control:`text`},onCommand:{action:`command`}}},h={args:{prompt:`C:\\>`,onCommand:e=>console.log(`Command:`,e)}},g={args:{prompt:`$`,onCommand:e=>console.log(`Command:`,e)}},_={args:{prompt:`user@dos:~$`,onCommand:e=>console.log(`Command:`,e)}},v={args:{prompt:`C:\\>`,disabled:!0,onCommand:e=>console.log(`Command:`,e)}},y={args:{prompt:`C:\\>`,placeholder:`Type a command...`,onCommand:e=>console.log(`Command:`,e)}},b={render:function(){let[e,t]=(0,f.useState)([]);return(0,p.jsx)(`div`,{style:{width:`400px`,fontFamily:`"Flexi IBM VGA True", monospace`},children:(0,p.jsxs)(`div`,{style:{background:`#000`,color:`#AAAAAA`,padding:`16px`,minHeight:`200px`},children:[e.map((e,t)=>(0,p.jsx)(`div`,{style:{marginBottom:`4px`},children:e},t)),(0,p.jsx)(u,{prompt:`C:\\>`,onCommand:e=>{t(t=>[...t,`C:\\> ${e}`,`Executed: ${e}`])},autoFocus:!0})]})})}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    prompt: 'C:\\\\>',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    prompt: '$',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    prompt: 'user@dos:~$',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    prompt: 'C:\\\\>',
    disabled: true,
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    prompt: 'C:\\\\>',
    placeholder: 'Type a command...',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x=[`Default`,`CustomPrompt`,`UnixPrompt`,`Disabled`,`WithPlaceholder`,`Interactive`]}))();export{g as CustomPrompt,h as Default,v as Disabled,b as Interactive,_ as UnixPrompt,y as WithPlaceholder,x as __namedExportsOrder,m as default};