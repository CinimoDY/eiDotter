import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{r,t as i}from"./registry-EhIcK3QA.js";import"./keyframes-D-6fbS_z.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";var o,s,c;function l(){return(l=t((()=>{o=e(n(),1),s=a(),c=({prompt:e=`C:\\>`,onCommand:t,autoFocus:n=!1,className:r=``,placeholder:i,disabled:a=!1})=>{let[c,l]=(0,o.useState)(``),u=(0,o.useRef)(null);return(0,o.useEffect)(()=>{n&&u.current&&u.current.focus()},[n]),(0,s.jsxs)(`div`,{className:`command-prompt ${a?`command-prompt--disabled`:``} ${r}`.trim(),onClick:()=>{!a&&u.current&&u.current.focus()},children:[(0,s.jsx)(`span`,{className:`command-prompt__prompt`,"aria-hidden":`true`,children:e}),(0,s.jsxs)(`div`,{className:`command-prompt__input-wrapper`,children:[(0,s.jsx)(`input`,{ref:u,className:`command-prompt__input`,value:c,onChange:e=>l(e.target.value),onKeyDown:e=>{e.key===`Enter`&&c.trim()&&!a&&(t(c.trim()),l(``))},autoFocus:n,spellCheck:!1,autoComplete:`off`,autoCapitalize:`off`,autoCorrect:`off`,placeholder:i,disabled:a,"aria-label":`Command input`,size:c.length||i?.length||1}),(0,s.jsx)(`span`,{className:`command-prompt__cursor`,"aria-hidden":`true`,children:`_`})]})]})},c.__docgenInfo={description:`DOS-styled CommandPrompt component with authentic terminal aesthetics\r
\r
Features:\r
- Configurable prompt string (e.g., "C:\\>", "$")\r
- Enter key triggers onCommand callback\r
- Blinking cursor for DOS feel\r
- Auto-focus support\r
- WCAG 2.1 AA compliant`,methods:[],displayName:`CommandPrompt`,props:{prompt:{required:!1,tsType:{name:`string`},description:`The prompt string displayed before cursor\r
@default "C:\\>"`,defaultValue:{value:`'C:\\\\>'`,computed:!1}},onCommand:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(command: string) => void`,signature:{arguments:[{type:{name:`string`},name:`command`}],return:{name:`void`}}},description:`Called when user presses Enter with command text`},autoFocus:{required:!1,tsType:{name:`boolean`},description:`Auto-focus the input on mount`,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Optional class name`,defaultValue:{value:`''`,computed:!1}},placeholder:{required:!1,tsType:{name:`string`},description:`Placeholder text when input is empty`},disabled:{required:!1,tsType:{name:`boolean`},description:`Whether the command prompt is disabled`,defaultValue:{value:`false`,computed:!1}}}}})))()}var u,d,f,p,m,h,g,_,v,y,b;function x(){return(x=t((()=>{u=e(n(),1),l(),r(),d=a(),f={title:`Components/CommandPrompt`,component:c,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:i.CommandPrompt},tags:[`autodocs`],argTypes:{prompt:{control:`text`,defaultValue:`C:\\>`},autoFocus:{control:`boolean`,defaultValue:!1},disabled:{control:`boolean`,defaultValue:!1},placeholder:{control:`text`},onCommand:{action:`command`}}},p={args:{prompt:`C:\\>`,onCommand:e=>console.log(`Command:`,e)}},m={args:{prompt:`$`,onCommand:e=>console.log(`Command:`,e)}},h={args:{prompt:`user@dos:~$`,onCommand:e=>console.log(`Command:`,e)}},g={args:{prompt:`C:\\>`,disabled:!0,onCommand:e=>console.log(`Command:`,e)}},_={args:{prompt:`C:\\>`,placeholder:`Type a command...`,onCommand:e=>console.log(`Command:`,e)}},v={args:{prompt:`C:\\>`,placeholder:`Type a command, or HELP for a list of every command`,onCommand:e=>console.log(`Command:`,e)},render:e=>(0,d.jsx)(`div`,{style:{width:240,maxWidth:`100%`},children:(0,d.jsx)(c,{...e})})},y={render:function(){let[e,t]=(0,u.useState)([]);return(0,d.jsx)(`div`,{style:{width:`400px`,fontFamily:`"Perfect DOS VGA 437", monospace`},children:(0,d.jsxs)(`div`,{style:{background:`#000`,color:`#AAAAAA`,padding:`16px`,minHeight:`200px`},children:[e.map((e,t)=>(0,d.jsx)(`div`,{style:{marginBottom:`4px`},children:e},t)),(0,d.jsx)(c,{prompt:`C:\\>`,onCommand:e=>{t(t=>[...t,`C:\\> ${e}`,`Executed: ${e}`])},autoFocus:!0})]})})}},b=[`Default`,`CustomPrompt`,`UnixPrompt`,`Disabled`,`WithPlaceholder`,`LongPlaceholder`,`Interactive`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    prompt: 'C:\\\\>',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    prompt: '$',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    prompt: 'user@dos:~$',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    prompt: 'C:\\\\>',
    disabled: true,
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    prompt: 'C:\\\\>',
    placeholder: 'Type a command...',
    onCommand: cmd => console.log('Command:', cmd)
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    prompt: 'C:\\\\>',
    placeholder: 'Type a command, or HELP for a list of every command',
    onCommand: cmd => console.log('Command:', cmd)
  },
  render: args => <div style={{
    width: 240,
    maxWidth: '100%'
  }}>
      <CommandPrompt {...args} />
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: function InteractiveStory() {
    const [history, setHistory] = useState<string[]>([]);
    const handleCommand = (command: string) => {
      setHistory(prev => [...prev, \`C:\\\\> \${command}\`, \`Executed: \${command}\`]);
    };
    return <div style={{
      width: '400px',
      fontFamily: '"Perfect DOS VGA 437", monospace'
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
}`,...y.parameters?.docs?.source}}}})))()}x();export{m as CustomPrompt,p as Default,g as Disabled,y as Interactive,v as LongPlaceholder,h as UnixPrompt,_ as WithPlaceholder,b as __namedExportsOrder,f as default};