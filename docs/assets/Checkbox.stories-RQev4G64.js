import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{C as a}from"./Checkbox-CnB40NeN.js";import{c as E}from"./registry-BMuWnSIt.js";/* empty css                  */const N={title:"Components/Checkbox",component:a,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:E.Checkbox},tags:["autodocs"],argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"},label:{control:"text"}}},r={args:{label:"Enable feature"}},s={args:{label:"Feature enabled",defaultChecked:!0}},l={args:{label:"Disabled option",disabled:!0}},o={args:{label:"Disabled and checked",defaultChecked:!0,disabled:!0}},t={args:{"aria-label":"Toggle option"}},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx(a,{label:"Unchecked"}),e.jsx(a,{label:"Checked",defaultChecked:!0}),e.jsx(a,{label:"Disabled",disabled:!0}),e.jsx(a,{label:"Disabled checked",defaultChecked:!0,disabled:!0})]})};var c,n,b;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    label: 'Enable feature'
  }
}`,...(b=(n=r.parameters)==null?void 0:n.docs)==null?void 0:b.source}}};var i,u,p;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: 'Feature enabled',
    defaultChecked: true
  }
}`,...(p=(u=s.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var m,h,k;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: 'Disabled option',
    disabled: true
  }
}`,...(k=(h=l.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};var g,x,C;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Disabled and checked',
    defaultChecked: true,
    disabled: true
  }
}`,...(C=(x=o.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var f,D,j;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Toggle option'
  }
}`,...(j=(D=t.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var S,y,v;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(v=(y=d.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};const R=["Default","Checked","Disabled","DisabledChecked","NoLabel","AllStates"];export{d as AllStates,s as Checked,r as Default,l as Disabled,o as DisabledChecked,t as NoLabel,R as __namedExportsOrder,N as default};
