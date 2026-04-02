import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{C as r}from"./Card-tjcr2FiJ.js";import{c as X}from"./registry-BMuWnSIt.js";const Y={title:"Components/Card",component:r,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:X.Card},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","elevated","bordered","glow","interactive","minimal","callout"]},title:{control:"text"},children:{control:"text"}}},a={args:{title:"CARD.TXT",children:"This is a DOS-themed card component for displaying content."}},t={args:{variant:"elevated",title:"ELEVATED.EXE",children:"An elevated card with a drop shadow effect."}},n={args:{variant:"bordered",title:"BORDERED.SYS",children:"A card with yellow accent border."}},o={args:{variant:"glow",title:"PHOSPHOR.CRT",children:"A card with amber phosphor glow effect."}},i={args:{title:"FILE.DAT",children:"Card content goes here.",footer:e.jsx("span",{children:"Press any key to continue..."})}},s={args:{children:"A card without a title header."}},c={args:{variant:"interactive",children:"A theme-aware card with hover state for clickable content."}},d={args:{variant:"minimal",children:"A simple content container — just border and background."}},l={args:{variant:"callout",children:"A left-accent card for quotes, key insights, and highlighted content."}},m={render:()=>e.jsxs("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap"},children:[e.jsx(r,{title:"DEFAULT",children:"Default variant"}),e.jsx(r,{title:"ELEVATED",variant:"elevated",children:"Elevated variant"}),e.jsx(r,{title:"BORDERED",variant:"bordered",children:"Bordered variant"}),e.jsx(r,{title:"GLOW",variant:"glow",children:"Glow variant"}),e.jsx(r,{variant:"interactive",children:"Interactive variant"}),e.jsx(r,{variant:"minimal",children:"Minimal variant"}),e.jsx(r,{variant:"callout",children:"Callout variant"})]})};var p,h,v;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    title: 'CARD.TXT',
    children: 'This is a DOS-themed card component for displaying content.'
  }
}`,...(v=(h=a.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var u,g,E;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: 'elevated',
    title: 'ELEVATED.EXE',
    children: 'An elevated card with a drop shadow effect.'
  }
}`,...(E=(g=t.parameters)==null?void 0:g.docs)==null?void 0:E.source}}};var f,w,C;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'bordered',
    title: 'BORDERED.SYS',
    children: 'A card with yellow accent border.'
  }
}`,...(C=(w=n.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var A,D,x;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    variant: 'glow',
    title: 'PHOSPHOR.CRT',
    children: 'A card with amber phosphor glow effect.'
  }
}`,...(x=(D=o.parameters)==null?void 0:D.docs)==null?void 0:x.source}}};var T,S,y;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    title: 'FILE.DAT',
    children: 'Card content goes here.',
    footer: <span>Press any key to continue...</span>
  }
}`,...(y=(S=i.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var b,R,j;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    children: 'A card without a title header.'
  }
}`,...(j=(R=s.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var O,L,k;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    variant: 'interactive',
    children: 'A theme-aware card with hover state for clickable content.'
  }
}`,...(k=(L=c.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};var B,F,G;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    variant: 'minimal',
    children: 'A simple content container — just border and background.'
  }
}`,...(G=(F=d.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var I,P,V;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    variant: 'callout',
    children: 'A left-accent card for quotes, key insights, and highlighted content.'
  }
}`,...(V=(P=l.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};var W,M,H;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  }}>
      <Card title="DEFAULT">Default variant</Card>
      <Card title="ELEVATED" variant="elevated">Elevated variant</Card>
      <Card title="BORDERED" variant="bordered">Bordered variant</Card>
      <Card title="GLOW" variant="glow">Glow variant</Card>
      <Card variant="interactive">Interactive variant</Card>
      <Card variant="minimal">Minimal variant</Card>
      <Card variant="callout">Callout variant</Card>
    </div>
}`,...(H=(M=m.parameters)==null?void 0:M.docs)==null?void 0:H.source}}};const _=["Default","Elevated","Bordered","Glow","WithFooter","NoTitle","Interactive","Minimal","Callout","AllVariants"];export{m as AllVariants,n as Bordered,l as Callout,a as Default,t as Elevated,o as Glow,c as Interactive,d as Minimal,s as NoTitle,i as WithFooter,_ as __namedExportsOrder,Y as default};
