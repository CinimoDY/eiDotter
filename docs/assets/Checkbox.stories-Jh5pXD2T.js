import{i as e}from"./preload-helper-Cs4UwXAW.js";import{z as t}from"./iframe-BZiwcFj0.js";import{t as n}from"./jsx-runtime-C2T8EUXA.js";import{n as r,t as i}from"./registry-BqccLuet.js";import{n as a,t as o}from"./Checkbox-CnXfLN9q.js";var s,c,l,u,d,f,p,m,h;e((()=>{t(),a(),r(),s=n(),c={title:`Components/Checkbox`,component:o,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:i.Checkbox},tags:[`autodocs`],argTypes:{checked:{control:`boolean`},disabled:{control:`boolean`},label:{control:`text`}}},l={args:{label:`Enable feature`}},u={args:{label:`Feature enabled`,defaultChecked:!0}},d={args:{label:`Disabled option`,disabled:!0}},f={args:{label:`Disabled and checked`,defaultChecked:!0,disabled:!0}},p={args:{"aria-label":`Toggle option`}},m={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`},children:[(0,s.jsx)(o,{label:`Unchecked`}),(0,s.jsx)(o,{label:`Checked`,defaultChecked:!0}),(0,s.jsx)(o,{label:`Disabled`,disabled:!0}),(0,s.jsx)(o,{label:`Disabled checked`,defaultChecked:!0,disabled:!0})]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Enable feature'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Feature enabled',
    defaultChecked: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled option',
    disabled: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled and checked',
    defaultChecked: true,
    disabled: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Toggle option'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" defaultChecked disabled />
    </div>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Checked`,`Disabled`,`DisabledChecked`,`NoLabel`,`AllStates`]}))();export{m as AllStates,u as Checked,l as Default,d as Disabled,f as DisabledChecked,p as NoLabel,h as __namedExportsOrder,c as default};