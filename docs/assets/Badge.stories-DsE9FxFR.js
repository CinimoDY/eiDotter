import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as r}from"./Badge-UHvusZz8.js";import{c as J}from"./registry-CyM9n0D0.js";import"./iframe-DuFfgGUU.js";import"./preload-helper-Dp1pzeXC.js";import"./cn-CvUv5FIJ.js";const $={title:"Components/Badge",component:r,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:J.Badge},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","success","warning","error","info","accent","brand","blue","indigo","purple","pink","orange"]},size:{control:"select",options:["sm","md","lg"]},dot:{control:"boolean"},children:{control:"text"}}},a={args:{children:"Badge"}},n={args:{variant:"success",children:"Online"}},s={args:{variant:"warning",children:"Pending"}},t={args:{variant:"error",children:"Offline"}},i={args:{variant:"info",children:"New"}},d={args:{variant:"accent",children:"Featured"}},c={args:{dot:!0,children:"Active"}},o={render:()=>e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[e.jsx(r,{variant:"default",children:"Default"}),e.jsx(r,{variant:"success",children:"Success"}),e.jsx(r,{variant:"warning",children:"Warning"}),e.jsx(r,{variant:"error",children:"Error"}),e.jsx(r,{variant:"info",children:"Info"}),e.jsx(r,{variant:"accent",children:"Accent"})]})},l={render:()=>e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx(r,{size:"sm",children:"SM"}),e.jsx(r,{size:"md",children:"MD"}),e.jsx(r,{size:"lg",children:"LG"})]})},g={render:()=>e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[e.jsx(r,{dot:!0,variant:"default",children:"Active"}),e.jsx(r,{dot:!0,variant:"success",children:"Online"}),e.jsx(r,{dot:!0,variant:"warning",children:"Idle"}),e.jsx(r,{dot:!0,variant:"error",children:"Offline"}),e.jsx(r,{dot:!0,variant:"info",children:"Syncing"})]})},p={render:()=>e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[e.jsx(r,{variant:"brand",children:"Brand"}),e.jsx(r,{variant:"gray",children:"Gray"}),e.jsx(r,{variant:"blue",children:"Blue"}),e.jsx(r,{variant:"indigo",children:"Indigo"}),e.jsx(r,{variant:"purple",children:"Purple"}),e.jsx(r,{variant:"pink",children:"Pink"}),e.jsx(r,{variant:"orange",children:"Orange"})]})};var u,m,v;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    children: 'Badge'
  }
}`,...(v=(m=a.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var x,B,f;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    children: 'Online'
  }
}`,...(f=(B=n.parameters)==null?void 0:B.docs)==null?void 0:f.source}}};var h,j,y;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    children: 'Pending'
  }
}`,...(y=(j=s.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var S,w,W;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    children: 'Offline'
  }
}`,...(W=(w=t.parameters)==null?void 0:w.docs)==null?void 0:W.source}}};var A,O,D;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    children: 'New'
  }
}`,...(D=(O=i.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};var I,z,b;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    variant: 'accent',
    children: 'Featured'
  }
}`,...(b=(z=d.parameters)==null?void 0:z.docs)==null?void 0:b.source}}};var k,E,P;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    dot: true,
    children: 'Active'
  }
}`,...(P=(E=c.parameters)==null?void 0:E.docs)==null?void 0:P.source}}};var M,G,V;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="accent">Accent</Badge>
    </div>
}`,...(V=(G=o.parameters)==null?void 0:G.docs)==null?void 0:V.source}}};var C,F,L;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  }}>
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
      <Badge size="lg">LG</Badge>
    </div>
}`,...(L=(F=l.parameters)==null?void 0:F.docs)==null?void 0:L.source}}};var N,R,_;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  }}>
      <Badge dot variant="default">Active</Badge>
      <Badge dot variant="success">Online</Badge>
      <Badge dot variant="warning">Idle</Badge>
      <Badge dot variant="error">Offline</Badge>
      <Badge dot variant="info">Syncing</Badge>
    </div>
}`,...(_=(R=g.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};var T,q,H;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  }}>
      <Badge variant="brand">Brand</Badge>
      <Badge variant="gray">Gray</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="indigo">Indigo</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="pink">Pink</Badge>
      <Badge variant="orange">Orange</Badge>
    </div>
}`,...(H=(q=p.parameters)==null?void 0:q.docs)==null?void 0:H.source}}};const ee=["Default","Success","Warning","Error","Info","Accent","WithDot","AllVariants","AllSizes","WithDots","V37Colors"];export{d as Accent,l as AllSizes,o as AllVariants,a as Default,t as Error,i as Info,n as Success,p as V37Colors,s as Warning,c as WithDot,g as WithDots,ee as __namedExportsOrder,$ as default};
