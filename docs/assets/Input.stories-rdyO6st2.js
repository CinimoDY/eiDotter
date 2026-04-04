import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{I as n}from"./Input-JzZ9XmGx.js";import{c as V}from"./registry-BXQUvPFZ.js";import"./iframe-DLEjTnR4.js";import"./preload-helper-Dp1pzeXC.js";import"./cn-CvUv5FIJ.js";const P={title:"Components/Input",component:n,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:V.Input},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","error"],defaultValue:"default"},disabled:{control:"boolean",defaultValue:!1},placeholder:{control:"text",defaultValue:"Enter text..."},type:{control:"select",options:["text","password","email","number"],defaultValue:"text"}}},r={args:{placeholder:"Enter text..."}},a={args:{variant:"error",placeholder:"Invalid input..."}},t={args:{disabled:!0,placeholder:"Disabled input..."}},s={args:{defaultValue:"C:\\DOS\\COMMAND.COM"}},o={args:{type:"password",placeholder:"Enter password..."}},l={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",width:"300px"},children:[e.jsx(n,{placeholder:"Default input"}),e.jsx(n,{variant:"error",placeholder:"Error input"}),e.jsx(n,{disabled:!0,placeholder:"Disabled input"})]})};var p,d,c;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...(c=(d=r.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var u,i,m;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    placeholder: 'Invalid input...'
  }
}`,...(m=(i=a.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var f,g,x;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: 'Disabled input...'
  }
}`,...(x=(g=t.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var h,D,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    defaultValue: 'C:\\\\DOS\\\\COMMAND.COM'
  }
}`,...(b=(D=s.parameters)==null?void 0:D.docs)==null?void 0:b.source}}};var v,E,y;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    type: 'password',
    placeholder: 'Enter password...'
  }
}`,...(y=(E=o.parameters)==null?void 0:E.docs)==null?void 0:y.source}}};var S,w,I;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(I=(w=l.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};const R=["Default","Error","Disabled","WithValue","Password","AllStates"];export{l as AllStates,r as Default,t as Disabled,a as Error,o as Password,s as WithValue,R as __namedExportsOrder,P as default};
