import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{R as V}from"./index-qdalL59a.js";import"./_commonjsHelpers-CqkleIqs.js";const a=({checked:t,defaultChecked:r=!1,onCheckedChange:l,disabled:i=!1,name:f,value:U,className:G="",...K})=>{const[L,B]=V.useState(r),b=t!==void 0,c=b?t:L,g=()=>{if(i)return;const s=!c;b||B(s),l==null||l(s)},H=s=>{(s.key===" "||s.key==="Enter")&&(s.preventDefault(),g())},J=["switch",c&&"switch--checked",i&&"switch--disabled",G].filter(Boolean).join(" ");return e.jsxs("button",{type:"button",role:"switch","aria-checked":c,"aria-disabled":i,className:J,onClick:g,onKeyDown:H,disabled:i,...K,children:[e.jsx("span",{className:"switch__track",children:e.jsx("span",{className:"switch__thumb"})}),f&&e.jsx("input",{type:"hidden",name:f,value:c?U||"on":""})]})};a.__docgenInfo={description:`DOS-styled Switch component with authentic terminal aesthetics

Features:
- Controlled and uncontrolled modes
- Disabled state
- Full keyboard accessibility
- WCAG 2.1 AA compliant
- DOS-authentic styling with CGA colors`,methods:[],displayName:"Switch",props:{checked:{required:!1,tsType:{name:"boolean"},description:"Whether the switch is checked"},defaultChecked:{required:!1,tsType:{name:"boolean"},description:"Default checked state (uncontrolled)",defaultValue:{value:"false",computed:!1}},onCheckedChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:"Callback when the switch state changes"},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the switch is disabled",defaultValue:{value:"false",computed:!1}},name:{required:!1,tsType:{name:"string"},description:"Name for form submission"},value:{required:!1,tsType:{name:"string"},description:"Value for form submission"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name",defaultValue:{value:"''",computed:!1}},"aria-label":{required:!1,tsType:{name:"string"},description:"Accessible label for screen readers"},"aria-labelledby":{required:!1,tsType:{name:"string"},description:"ID of element that labels this switch"}}};const X={title:"Components/Switch",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{checked:{control:"boolean",description:"Whether the switch is checked (controlled)"},defaultChecked:{control:"boolean",description:"Default checked state (uncontrolled)"},disabled:{control:"boolean",description:"Whether the switch is disabled"},onCheckedChange:{action:"checkedChange",description:"Callback when switch state changes"}}},n={args:{"aria-label":"Toggle setting"}},o={args:{defaultChecked:!0,"aria-label":"Toggle setting"}},d={args:{disabled:!0,"aria-label":"Toggle setting"}},p={args:{disabled:!0,defaultChecked:!0,"aria-label":"Toggle setting"}},h={render:t=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(a,{...t,"aria-labelledby":"switch-label"}),e.jsx("label",{id:"switch-label",style:{color:"var(--color-semantic-text-primary)"},children:"Enable CRT effects"})]})},u={render:function(){const[r,l]=V.useState(!1);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",alignItems:"center"},children:[e.jsx(a,{checked:r,onCheckedChange:l,"aria-label":"Controlled switch"}),e.jsxs("span",{style:{color:"var(--color-semantic-text-primary)",fontSize:"14px"},children:["Status: ",r?"ON":"OFF"]})]})}},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(a,{"aria-label":"Unchecked"}),e.jsx("span",{style:{color:"var(--color-semantic-text-primary)",fontSize:"14px"},children:"Unchecked"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(a,{defaultChecked:!0,"aria-label":"Checked"}),e.jsx("span",{style:{color:"var(--color-semantic-text-primary)",fontSize:"14px"},children:"Checked"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(a,{disabled:!0,"aria-label":"Disabled unchecked"}),e.jsx("span",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"14px"},children:"Disabled (unchecked)"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(a,{disabled:!0,defaultChecked:!0,"aria-label":"Disabled checked"}),e.jsx("span",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"14px"},children:"Disabled (checked)"})]})]})};var x,y,k;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Toggle setting'
  }
}`,...(k=(y=n.parameters)==null?void 0:y.docs)==null?void 0:k.source}}};var C,v,w;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    defaultChecked: true,
    'aria-label': 'Toggle setting'
  }
}`,...(w=(v=o.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var S,D,j;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    disabled: true,
    'aria-label': 'Toggle setting'
  }
}`,...(j=(D=d.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var T,I,z;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultChecked: true,
    'aria-label': 'Toggle setting'
  }
}`,...(z=(I=p.parameters)==null?void 0:I.docs)==null?void 0:z.source}}};var q,A,N;h.parameters={...h.parameters,docs:{...(q=h.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(N=(A=h.parameters)==null?void 0:A.docs)==null?void 0:N.source}}};var _,O,W;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(W=(O=u.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var F,R,E;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(E=(R=m.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};const Y=["Default","Checked","Disabled","DisabledChecked","WithLabel","Controlled","AllStates"];export{m as AllStates,o as Checked,u as Controlled,n as Default,d as Disabled,p as DisabledChecked,h as WithLabel,Y as __namedExportsOrder,X as default};
