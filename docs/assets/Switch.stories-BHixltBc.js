import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as a}from"./Switch-CPbP3sT6.js";import{R as F}from"./iframe-Cnx5oUV1.js";import{c as U}from"./registry-B_NR6ZmP.js";import"./preload-helper-Dp1pzeXC.js";const M={title:"Components/Switch",component:a,parameters:{layout:"centered",projectMeta:U.Switch},tags:["autodocs"],argTypes:{checked:{control:"boolean",description:"Whether the switch is checked (controlled)"},defaultChecked:{control:"boolean",description:"Default checked state (uncontrolled)"},disabled:{control:"boolean",description:"Whether the switch is disabled"},onCheckedChange:{action:"checkedChange",description:"Callback when switch state changes"}}},t={args:{"aria-label":"Toggle setting"}},s={args:{defaultChecked:!0,"aria-label":"Toggle setting"}},r={args:{disabled:!0,"aria-label":"Toggle setting"}},l={args:{disabled:!0,defaultChecked:!0,"aria-label":"Toggle setting"}},c={render:d=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(a,{...d,"aria-labelledby":"switch-label"}),e.jsx("label",{id:"switch-label",style:{color:"var(--color-semantic-text-primary)"},children:"Enable CRT effects"})]})},i={render:function(){const[n,E]=F.useState(!1);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",alignItems:"center"},children:[e.jsx(a,{checked:n,onCheckedChange:E,"aria-label":"Controlled switch"}),e.jsxs("span",{style:{color:"var(--color-semantic-text-primary)",fontSize:"14px"},children:["Status: ",n?"ON":"OFF"]})]})}},o={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(a,{"aria-label":"Unchecked"}),e.jsx("span",{style:{color:"var(--color-semantic-text-primary)",fontSize:"14px"},children:"Unchecked"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(a,{defaultChecked:!0,"aria-label":"Checked"}),e.jsx("span",{style:{color:"var(--color-semantic-text-primary)",fontSize:"14px"},children:"Checked"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(a,{disabled:!0,"aria-label":"Disabled unchecked"}),e.jsx("span",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"14px"},children:"Disabled (unchecked)"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(a,{disabled:!0,defaultChecked:!0,"aria-label":"Disabled checked"}),e.jsx("span",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"14px"},children:"Disabled (checked)"})]})]})};var p,h,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Toggle setting'
  }
}`,...(m=(h=t.parameters)==null?void 0:h.docs)==null?void 0:m.source}}};var x,g,u;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    defaultChecked: true,
    'aria-label': 'Toggle setting'
  }
}`,...(u=(g=s.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var b,f,y;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    disabled: true,
    'aria-label': 'Toggle setting'
  }
}`,...(y=(f=r.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var k,C,S;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultChecked: true,
    'aria-label': 'Toggle setting'
  }
}`,...(S=(C=l.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var v,j,w;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(w=(j=c.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var D,I,T;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(T=(I=i.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var z,R,O;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(O=(R=o.parameters)==null?void 0:R.docs)==null?void 0:O.source}}};const q=["Default","Checked","Disabled","DisabledChecked","WithLabel","Controlled","AllStates"];export{o as AllStates,s as Checked,i as Controlled,t as Default,r as Disabled,l as DisabledChecked,c as WithLabel,q as __namedExportsOrder,M as default};
