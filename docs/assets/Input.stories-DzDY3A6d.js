import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as N}from"./index-qdalL59a.js";import"./_commonjsHelpers-CqkleIqs.js";const e=N.forwardRef(({variant:d="default",className:C="",disabled:p,...j},A)=>{const M=["input",`input--${d}`,p&&"input--disabled",C].filter(Boolean).join(" ");return r.jsx("input",{ref:A,className:M,disabled:p,"aria-invalid":d==="error",...j})});e.displayName="Input";e.__docgenInfo={description:`DOS-styled Input component with authentic terminal aesthetics\r
\r
Features:\r
- Extends native HTML input attributes\r
- Error variant for validation states\r
- DOS-authentic styling with CGA colors\r
- WCAG 2.1 AA compliant focus states`,methods:[],displayName:"Input",props:{variant:{required:!1,tsType:{name:"union",raw:"'default' | 'error'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'error'"}]},description:"Visual variant for validation states",defaultValue:{value:"'default'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional class name",defaultValue:{value:"''",computed:!1}}},composes:["Omit"]};const q={title:"Components/Input",component:e,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","error"],defaultValue:"default"},disabled:{control:"boolean",defaultValue:!1},placeholder:{control:"text",defaultValue:"Enter text..."},type:{control:"select",options:["text","password","email","number"],defaultValue:"text"}}},a={args:{placeholder:"Enter text..."}},t={args:{variant:"error",placeholder:"Invalid input..."}},s={args:{disabled:!0,placeholder:"Disabled input..."}},o={args:{defaultValue:"C:\\DOS\\COMMAND.COM"}},l={args:{type:"password",placeholder:"Enter password..."}},n={render:()=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",width:"300px"},children:[r.jsx(e,{placeholder:"Default input"}),r.jsx(e,{variant:"error",placeholder:"Error input"}),r.jsx(e,{disabled:!0,placeholder:"Disabled input"})]})};var i,u,c;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...(c=(u=a.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};var m,f,h;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    placeholder: 'Invalid input...'
  }
}`,...(h=(f=t.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var x,g,v;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: 'Disabled input...'
  }
}`,...(v=(g=s.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var D,b,y;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    defaultValue: 'C:\\\\DOS\\\\COMMAND.COM'
  }
}`,...(y=(b=o.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var E,w,S;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    type: 'password',
    placeholder: 'Enter password...'
  }
}`,...(S=(w=l.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var I,O,V;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(V=(O=n.parameters)==null?void 0:O.docs)==null?void 0:V.source}}};const G=["Default","Error","Disabled","WithValue","Password","AllStates"];export{n as AllStates,a as Default,s as Disabled,t as Error,l as Password,o as WithValue,G as __namedExportsOrder,q as default};
