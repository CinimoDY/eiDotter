import{j as e}from"./jsx-runtime-bb4eca5c.js";import"./index-9ab4f09c.js";import"./_commonjsHelpers-725317a4.js";const a=({value:c,max:m=100,variant:M="default",size:E="medium",showLabel:W=!1,className:$="","aria-label":k,...B})=>{const i=Math.min(100,Math.max(0,c/m*100)),d=Math.round(i/5),C=20-d,I=["progress",`progress--${M}`,`progress--${E}`,$].filter(Boolean).join(" ");return e.jsxs("div",{className:I,role:"progressbar","aria-valuenow":c,"aria-valuemin":0,"aria-valuemax":m,"aria-label":k||`Progress: ${Math.round(i)}%`,...B,children:[e.jsxs("span",{className:"progress__bar",children:[e.jsx("span",{className:"progress__fill",children:"█".repeat(d)}),e.jsx("span",{className:"progress__empty",children:"░".repeat(C)})]}),W&&e.jsxs("span",{className:"progress__label",children:[Math.round(i),"%"]})]})};a.__docgenInfo={description:"",methods:[],displayName:"Progress",props:{value:{required:!0,tsType:{name:"number"},description:"Progress value from 0 to 100"},max:{required:!1,tsType:{name:"number"},description:"Maximum value (default 100)",defaultValue:{value:"100",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'success' | 'warning' | 'error'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"}]},description:"Visual variant",defaultValue:{value:"'default'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"Size of the progress bar",defaultValue:{value:"'medium'",computed:!1}},showLabel:{required:!1,tsType:{name:"boolean"},description:"Show percentage label",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name",defaultValue:{value:"''",computed:!1}},"aria-label":{required:!1,tsType:{name:"string"},description:"Accessible label for screen readers"}}};const G={title:"Components/Progress",component:a,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{value:{control:{type:"range",min:0,max:100,step:5}},variant:{control:"select",options:["default","success","warning","error"]},size:{control:"select",options:["small","medium","large"]},showLabel:{control:"boolean"}}},r={args:{value:50}},s={args:{value:75,showLabel:!0}},l={args:{value:100,variant:"success",showLabel:!0}},o={args:{value:60,variant:"warning",showLabel:!0}},t={args:{value:25,variant:"error",showLabel:!0}},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx(a,{value:80,showLabel:!0}),e.jsx(a,{value:100,variant:"success",showLabel:!0}),e.jsx(a,{value:60,variant:"warning",showLabel:!0}),e.jsx(a,{value:25,variant:"error",showLabel:!0})]})},u={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx(a,{value:50,size:"small",showLabel:!0}),e.jsx(a,{value:50,size:"medium",showLabel:!0}),e.jsx(a,{value:50,size:"large",showLabel:!0})]})};var p,g,v;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    value: 50
  }
}`,...(v=(g=r.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var f,b,h;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    value: 75,
    showLabel: true
  }
}`,...(h=(b=s.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var w,x,L;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    value: 100,
    variant: 'success',
    showLabel: true
  }
}`,...(L=(x=l.parameters)==null?void 0:x.docs)==null?void 0:L.source}}};var y,j,S;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    value: 60,
    variant: 'warning',
    showLabel: true
  }
}`,...(S=(j=o.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var P,_,z;t.parameters={...t.parameters,docs:{...(P=t.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    value: 25,
    variant: 'error',
    showLabel: true
  }
}`,...(z=(_=t.parameters)==null?void 0:_.docs)==null?void 0:z.source}}};var T,V,q;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <Progress value={80} showLabel />
      <Progress value={100} variant="success" showLabel />
      <Progress value={60} variant="warning" showLabel />
      <Progress value={25} variant="error" showLabel />
    </div>
}`,...(q=(V=n.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var N,A,D;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <Progress value={50} size="small" showLabel />
      <Progress value={50} size="medium" showLabel />
      <Progress value={50} size="large" showLabel />
    </div>
}`,...(D=(A=u.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};const H=["Default","WithLabel","Success","Warning","Error","AllVariants","AllSizes"];export{u as AllSizes,n as AllVariants,r as Default,t as Error,l as Success,o as Warning,s as WithLabel,H as __namedExportsOrder,G as default};
