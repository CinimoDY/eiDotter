import{j as e}from"./jsx-runtime-bb4eca5c.js";import"./index-9ab4f09c.js";import"./_commonjsHelpers-725317a4.js";const a=({checked:N,defaultChecked:A,onChange:d,label:n,disabled:i=!1,name:E,value:L,className:V="","aria-label":w,...F})=>{const U=B=>{i||d==null||d(B.target.checked)},W=["checkbox",i&&"checkbox--disabled",V].filter(Boolean).join(" ");return e.jsxs("label",{className:W,children:[e.jsx("input",{type:"checkbox",className:"checkbox__input",checked:N,defaultChecked:A,onChange:U,disabled:i,name:E,value:L,"aria-label":w||n,...F}),e.jsx("span",{className:"checkbox__box","aria-hidden":"true"}),n&&e.jsx("span",{className:"checkbox__label",children:n})]})};a.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{checked:{required:!1,tsType:{name:"boolean"},description:"Whether the checkbox is checked"},defaultChecked:{required:!1,tsType:{name:"boolean"},description:"Default checked state for uncontrolled usage"},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:"Callback when checked state changes"},label:{required:!1,tsType:{name:"string"},description:"Label text for the checkbox"},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the checkbox is disabled",defaultValue:{value:"false",computed:!1}},name:{required:!1,tsType:{name:"string"},description:"Name attribute for form submission"},value:{required:!1,tsType:{name:"string"},description:"Value attribute for form submission"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name",defaultValue:{value:"''",computed:!1}},"aria-label":{required:!1,tsType:{name:"string"},description:"Accessible label for screen readers"}}};const $={title:"Components/Checkbox",component:a,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"},label:{control:"text"}}},s={args:{label:"Enable feature"}},r={args:{label:"Feature enabled",defaultChecked:!0}},l={args:{label:"Disabled option",disabled:!0}},t={args:{label:"Disabled and checked",defaultChecked:!0,disabled:!0}},c={args:{"aria-label":"Toggle option"}},o={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx(a,{label:"Unchecked"}),e.jsx(a,{label:"Checked",defaultChecked:!0}),e.jsx(a,{label:"Disabled",disabled:!0}),e.jsx(a,{label:"Disabled checked",defaultChecked:!0,disabled:!0})]})};var u,b,p;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    label: 'Enable feature'
  }
}`,...(p=(b=s.parameters)==null?void 0:b.docs)==null?void 0:p.source}}};var m,h,k;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: 'Feature enabled',
    defaultChecked: true
  }
}`,...(k=(h=r.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};var f,x,g;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Disabled option',
    disabled: true
  }
}`,...(g=(x=l.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var C,y,D;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    label: 'Disabled and checked',
    defaultChecked: true,
    disabled: true
  }
}`,...(D=(y=t.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};var j,T,v;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Toggle option'
  }
}`,...(v=(T=c.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var S,_,q;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(q=(_=o.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};const z=["Default","Checked","Disabled","DisabledChecked","NoLabel","AllStates"];export{o as AllStates,r as Checked,s as Default,l as Disabled,t as DisabledChecked,c as NoLabel,z as __namedExportsOrder,$ as default};
