import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{I as p}from"./Input-Jasg4huw.js";import{c as V}from"./registry-CyM9n0D0.js";import"./iframe-BU4rT9RF.js";import"./preload-helper-Dp1pzeXC.js";import"./useFocusRing-BUJkGnC-.js";import"./Hidden-BtSPQEnR.js";import"./RSPContexts-SZ1G5yGu.js";import"./Form-BOFgr5P6.js";import"./useFormReset-t8qNwJTk.js";import"./useControlledState-CBiFfBQk.js";import"./useLabels-B-MZOg_d.js";import"./cn-CvUv5FIJ.js";const z={title:"Components/Input",component:p,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:V.Input},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","error"],defaultValue:"default"},disabled:{control:"boolean",defaultValue:!1},placeholder:{control:"text",defaultValue:"Enter text..."},type:{control:"select",options:["text","password","email","number"],defaultValue:"text"}}},r={args:{placeholder:"Enter text..."}},a={args:{variant:"error",placeholder:"Invalid input..."}},t={args:{disabled:!0,placeholder:"Disabled input..."}},o={args:{defaultValue:"C:\\DOS\\COMMAND.COM"}},s={args:{type:"password",placeholder:"Enter password..."}},l={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",width:"300px"},children:[e.jsx(p,{placeholder:"Default input"}),e.jsx(p,{variant:"error",placeholder:"Error input"}),e.jsx(p,{disabled:!0,placeholder:"Disabled input"})]})};var n,d,c;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...(c=(d=r.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var i,u,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    placeholder: 'Invalid input...'
  }
}`,...(m=(u=a.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var f,g,x;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: 'Disabled input...'
  }
}`,...(x=(g=t.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var h,D,b;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    defaultValue: 'C:\\\\DOS\\\\COMMAND.COM'
  }
}`,...(b=(D=o.parameters)==null?void 0:D.docs)==null?void 0:b.source}}};var v,E,y;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    type: 'password',
    placeholder: 'Enter password...'
  }
}`,...(y=(E=s.parameters)==null?void 0:E.docs)==null?void 0:y.source}}};var S,w,I;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(I=(w=l.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};const B=["Default","Error","Disabled","WithValue","Password","AllStates"];export{l as AllStates,r as Default,t as Disabled,a as Error,s as Password,o as WithValue,B as __namedExportsOrder,z as default};
