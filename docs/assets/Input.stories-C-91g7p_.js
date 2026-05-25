import{i as e}from"./preload-helper-Cs4UwXAW.js";import{z as t}from"./iframe-BZiwcFj0.js";import{t as n}from"./jsx-runtime-C2T8EUXA.js";import{n as r,t as i}from"./registry-BqccLuet.js";import{n as a,t as o}from"./Input-CQOFWoy2.js";var s,c,l,u,d,f,p,m,h;e((()=>{t(),a(),r(),s=n(),c={title:`Components/Input`,component:o,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:i.Input},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`default`,`error`],defaultValue:`default`},disabled:{control:`boolean`,defaultValue:!1},placeholder:{control:`text`,defaultValue:`Enter text...`},type:{control:`select`,options:[`text`,`password`,`email`,`number`],defaultValue:`text`}}},l={args:{placeholder:`Enter text...`}},u={args:{variant:`error`,placeholder:`Invalid input...`}},d={args:{disabled:!0,placeholder:`Disabled input...`}},f={args:{defaultValue:`C:\\DOS\\COMMAND.COM`}},p={args:{type:`password`,placeholder:`Enter password...`}},m={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,width:`300px`},children:[(0,s.jsx)(o,{placeholder:`Default input`}),(0,s.jsx)(o,{variant:`error`,placeholder:`Error input`}),(0,s.jsx)(o,{disabled:!0,placeholder:`Disabled input`})]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    placeholder: 'Invalid input...'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: 'Disabled input...'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: 'C:\\\\DOS\\\\COMMAND.COM'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'password',
    placeholder: 'Enter password...'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '300px'
  }}>
      <Input placeholder="Default input" />
      <Input variant="error" placeholder="Error input" />
      <Input disabled placeholder="Disabled input" />
    </div>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Error`,`Disabled`,`WithValue`,`Password`,`AllStates`]}))();export{m as AllStates,l as Default,d as Disabled,u as Error,p as Password,f as WithValue,h as __namedExportsOrder,c as default};