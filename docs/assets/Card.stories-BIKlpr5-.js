import{j as e}from"./jsx-runtime-D_zvdyIk.js";const a=({title:i,children:_,footer:c,variant:L="default",className:B="",...V})=>{const F=["card",`card--${L}`,B].filter(Boolean).join(" ");return e.jsxs("div",{className:F,...V,children:[i&&e.jsx("div",{className:"card__header",children:e.jsx("span",{className:"card__title",children:i})}),e.jsx("div",{className:"card__body",children:_}),c&&e.jsx("div",{className:"card__footer",children:c})]})};a.__docgenInfo={description:"",methods:[],displayName:"Card",props:{title:{required:!1,tsType:{name:"string"},description:"Optional card title displayed in header"},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Card content"},footer:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Optional footer content"},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'elevated' | 'bordered' | 'glow'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'elevated'"},{name:"literal",value:"'bordered'"},{name:"literal",value:"'glow'"}]},description:"Visual variant of the card",defaultValue:{value:"'default'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name",defaultValue:{value:"''",computed:!1}}}};const P={title:"Components/Card",component:a,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","elevated","bordered","glow"]},title:{control:"text"},children:{control:"text"}}},r={args:{title:"CARD.TXT",children:"This is a DOS-themed card component for displaying content."}},t={args:{variant:"elevated",title:"ELEVATED.EXE",children:"An elevated card with a drop shadow effect."}},s={args:{variant:"bordered",title:"BORDERED.SYS",children:"A card with yellow accent border."}},d={args:{variant:"glow",title:"PHOSPHOR.CRT",children:"A card with amber phosphor glow effect."}},o={args:{title:"FILE.DAT",children:"Card content goes here.",footer:e.jsx("span",{children:"Press any key to continue..."})}},n={args:{children:"A card without a title header."}},l={render:()=>e.jsxs("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap"},children:[e.jsx(a,{title:"DEFAULT",children:"Default variant"}),e.jsx(a,{title:"ELEVATED",variant:"elevated",children:"Elevated variant"}),e.jsx(a,{title:"BORDERED",variant:"bordered",children:"Bordered variant"}),e.jsx(a,{title:"GLOW",variant:"glow",children:"Glow variant"})]})};var p,m,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    title: 'CARD.TXT',
    children: 'This is a DOS-themed card component for displaying content.'
  }
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var h,v,f;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: 'elevated',
    title: 'ELEVATED.EXE',
    children: 'An elevated card with a drop shadow effect.'
  }
}`,...(f=(v=t.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var g,E,w;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: 'bordered',
    title: 'BORDERED.SYS',
    children: 'A card with yellow accent border.'
  }
}`,...(w=(E=s.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};var D,T,x;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    variant: 'glow',
    title: 'PHOSPHOR.CRT',
    children: 'A card with amber phosphor glow effect.'
  }
}`,...(x=(T=d.parameters)==null?void 0:T.docs)==null?void 0:x.source}}};var R,y,A;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    title: 'FILE.DAT',
    children: 'Card content goes here.',
    footer: <span>Press any key to continue...</span>
  }
}`,...(A=(y=o.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var C,S,O;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'A card without a title header.'
  }
}`,...(O=(S=n.parameters)==null?void 0:S.docs)==null?void 0:O.source}}};var j,b,N;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(N=(b=l.parameters)==null?void 0:b.docs)==null?void 0:N.source}}};const W=["Default","Elevated","Bordered","Glow","WithFooter","NoTitle","AllVariants"];export{l as AllVariants,s as Bordered,r as Default,t as Elevated,d as Glow,n as NoTitle,o as WithFooter,W as __namedExportsOrder,P as default};
