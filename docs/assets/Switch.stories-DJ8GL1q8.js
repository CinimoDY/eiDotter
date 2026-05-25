import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./registry-BqccLuet.js";import{n as o,t as s}from"./Switch-C7pbcGeb.js";var c,l,u,d,f,p,m,h,g,_,v;e((()=>{o(),c=t(n(),1),i(),l=r(),u={title:`Components/Switch`,component:s,parameters:{layout:`centered`,projectMeta:a.Switch},tags:[`autodocs`],argTypes:{checked:{control:`boolean`,description:`Whether the switch is checked (controlled)`},defaultChecked:{control:`boolean`,description:`Default checked state (uncontrolled)`},disabled:{control:`boolean`,description:`Whether the switch is disabled`},onCheckedChange:{action:`checkedChange`,description:`Callback when switch state changes`}}},d={args:{"aria-label":`Toggle setting`}},f={args:{defaultChecked:!0,"aria-label":`Toggle setting`}},p={args:{disabled:!0,"aria-label":`Toggle setting`}},m={args:{disabled:!0,defaultChecked:!0,"aria-label":`Toggle setting`}},h={render:e=>(0,l.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,l.jsx)(s,{...e,"aria-labelledby":`switch-label`}),(0,l.jsx)(`label`,{id:`switch-label`,style:{color:`var(--color-semantic-text-primary)`},children:`Enable CRT effects`})]})},g={render:function(){let[e,t]=c.useState(!1);return(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`,alignItems:`center`},children:[(0,l.jsx)(s,{checked:e,onCheckedChange:t,"aria-label":`Controlled switch`}),(0,l.jsxs)(`span`,{style:{color:`var(--color-semantic-text-primary)`,fontSize:`14px`},children:[`Status: `,e?`ON`:`OFF`]})]})}},_={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,l.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,l.jsx)(s,{"aria-label":`Unchecked`}),(0,l.jsx)(`span`,{style:{color:`var(--color-semantic-text-primary)`,fontSize:`14px`},children:`Unchecked`})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,l.jsx)(s,{defaultChecked:!0,"aria-label":`Checked`}),(0,l.jsx)(`span`,{style:{color:`var(--color-semantic-text-primary)`,fontSize:`14px`},children:`Checked`})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,l.jsx)(s,{disabled:!0,"aria-label":`Disabled unchecked`}),(0,l.jsx)(`span`,{style:{color:`var(--color-semantic-text-disabled)`,fontSize:`14px`},children:`Disabled (unchecked)`})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,l.jsx)(s,{disabled:!0,defaultChecked:!0,"aria-label":`Disabled checked`}),(0,l.jsx)(`span`,{style:{color:`var(--color-semantic-text-disabled)`,fontSize:`14px`},children:`Disabled (checked)`})]})]})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Toggle setting'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    defaultChecked: true,
    'aria-label': 'Toggle setting'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    'aria-label': 'Toggle setting'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultChecked: true,
    'aria-label': 'Toggle setting'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  }}>
      <Switch {...args} aria-labelledby="switch-label" />
      <label id="switch-label" style={{
      color: 'var(--color-semantic-text-primary)'
    }}>
        Enable CRT effects
      </label>
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: function ControlledSwitch() {
    const [checked, setChecked] = React.useState(false);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      alignItems: 'center'
    }}>
        <Switch checked={checked} onCheckedChange={setChecked} aria-label="Controlled switch" />
        <span style={{
        color: 'var(--color-semantic-text-primary)',
        fontSize: '14px'
      }}>
          Status: {checked ? 'ON' : 'OFF'}
        </span>
      </div>;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
        <Switch aria-label="Unchecked" />
        <span style={{
        color: 'var(--color-semantic-text-primary)',
        fontSize: '14px'
      }}>
          Unchecked
        </span>
      </div>
      <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
        <Switch defaultChecked aria-label="Checked" />
        <span style={{
        color: 'var(--color-semantic-text-primary)',
        fontSize: '14px'
      }}>
          Checked
        </span>
      </div>
      <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
        <Switch disabled aria-label="Disabled unchecked" />
        <span style={{
        color: 'var(--color-semantic-text-disabled)',
        fontSize: '14px'
      }}>
          Disabled (unchecked)
        </span>
      </div>
      <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
        <Switch disabled defaultChecked aria-label="Disabled checked" />
        <span style={{
        color: 'var(--color-semantic-text-disabled)',
        fontSize: '14px'
      }}>
          Disabled (checked)
        </span>
      </div>
    </div>
}`,..._.parameters?.docs?.source}}},v=[`Default`,`Checked`,`Disabled`,`DisabledChecked`,`WithLabel`,`Controlled`,`AllStates`]}))();export{_ as AllStates,f as Checked,g as Controlled,d as Default,p as Disabled,m as DisabledChecked,h as WithLabel,v as __namedExportsOrder,u as default};