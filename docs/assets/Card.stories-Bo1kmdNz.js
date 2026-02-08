import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{C as r}from"./Card-CXpfckQ2.js";import{c as L}from"./registry-DmuPb2r9.js";const G={title:"Components/Card",component:r,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:L.Card},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","elevated","bordered","glow"]},title:{control:"text"},children:{control:"text"}}},a={args:{title:"CARD.TXT",children:"This is a DOS-themed card component for displaying content."}},t={args:{variant:"elevated",title:"ELEVATED.EXE",children:"An elevated card with a drop shadow effect."}},o={args:{variant:"bordered",title:"BORDERED.SYS",children:"A card with yellow accent border."}},n={args:{variant:"glow",title:"PHOSPHOR.CRT",children:"A card with amber phosphor glow effect."}},s={args:{title:"FILE.DAT",children:"Card content goes here.",footer:e.jsx("span",{children:"Press any key to continue..."})}},d={args:{children:"A card without a title header."}},i={render:()=>e.jsxs("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap"},children:[e.jsx(r,{title:"DEFAULT",children:"Default variant"}),e.jsx(r,{title:"ELEVATED",variant:"elevated",children:"Elevated variant"}),e.jsx(r,{title:"BORDERED",variant:"bordered",children:"Bordered variant"}),e.jsx(r,{title:"GLOW",variant:"glow",children:"Glow variant"})]})};var c,l,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    title: 'CARD.TXT',
    children: 'This is a DOS-themed card component for displaying content.'
  }
}`,...(p=(l=a.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var m,h,u;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: 'elevated',
    title: 'ELEVATED.EXE',
    children: 'An elevated card with a drop shadow effect.'
  }
}`,...(u=(h=t.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var v,g,E;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: 'bordered',
    title: 'BORDERED.SYS',
    children: 'A card with yellow accent border.'
  }
}`,...(E=(g=o.parameters)==null?void 0:g.docs)==null?void 0:E.source}}};var f,w,D;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'glow',
    title: 'PHOSPHOR.CRT',
    children: 'A card with amber phosphor glow effect.'
  }
}`,...(D=(w=n.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var A,C,T;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    title: 'FILE.DAT',
    children: 'Card content goes here.',
    footer: <span>Press any key to continue...</span>
  }
}`,...(T=(C=s.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var x,R,y;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    children: 'A card without a title header.'
  }
}`,...(y=(R=d.parameters)==null?void 0:R.docs)==null?void 0:y.source}}};var S,O,b;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  }}>
      <Card title="DEFAULT">Default variant</Card>
      <Card title="ELEVATED" variant="elevated">Elevated variant</Card>
      <Card title="BORDERED" variant="bordered">Bordered variant</Card>
      <Card title="GLOW" variant="glow">Glow variant</Card>
    </div>
}`,...(b=(O=i.parameters)==null?void 0:O.docs)==null?void 0:b.source}}};const P=["Default","Elevated","Bordered","Glow","WithFooter","NoTitle","AllVariants"];export{i as AllVariants,o as Bordered,a as Default,t as Elevated,n as Glow,d as NoTitle,s as WithFooter,P as __namedExportsOrder,G as default};
