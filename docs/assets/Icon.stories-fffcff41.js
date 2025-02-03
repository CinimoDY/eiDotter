import{j as e}from"./jsx-runtime-50395f49.js";import{I as s,m as I}from"./Icon-5c360554.js";import"./index-9fa1aa67.js";const k={title:"Components/Icon",component:s,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{name:{control:"select",options:Object.keys(I),description:"The name of the icon to display"},size:{control:"select",options:["small","base","large","touch",16,24,32,44],description:"The size of the icon. Can be a token name or custom size in pixels"},color:{control:"select",options:["var(--color-system-foreground)","var(--color-system-link-default)","var(--color-system-link-hover)","var(--color-system-link-dim)"],description:"The color of the icon using our system tokens"},onClick:{action:"clicked"}}},a={args:{name:"Info",size:"base"}},r={render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(100px, 1fr))",gap:"var(--spacing-lg)",padding:"var(--spacing-lg)",maxWidth:"var(--dimension-content-max-width)",textAlign:"center"},children:Object.keys(I).map(i=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"var(--spacing-xs)"},children:[e.jsx(s,{name:i,size:"base"}),e.jsx("div",{style:{fontSize:"var(--typography-sizes-small)",fontFamily:"var(--typography-fonts-dos), var(--typography-fonts-fallback)"},children:i})]},i))})},o={render:()=>e.jsxs("div",{style:{display:"flex",gap:"var(--spacing-lg)",padding:"var(--spacing-lg)",alignItems:"center"},children:[e.jsx(s,{name:"Info",size:"small"}),e.jsx(s,{name:"Info",size:"base"}),e.jsx(s,{name:"Info",size:"large"}),e.jsx(s,{name:"Info",size:"touch"})]})},n={render:()=>e.jsxs("div",{style:{display:"flex",gap:"var(--spacing-lg)",padding:"var(--spacing-lg)",alignItems:"center"},children:[e.jsx(s,{name:"Info",size:"base"}),e.jsx(s,{name:"Info",size:"base",color:"var(--color-system-link-default)"}),e.jsx(s,{name:"Info",size:"base",color:"var(--color-system-link-hover)"}),e.jsx(s,{name:"Info",size:"base",color:"var(--color-system-link-dim)"})]})};var t,l,c;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    name: 'Info',
    size: 'base'
  }
}`,...(c=(l=a.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var m,d,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: 'var(--spacing-lg)',
    padding: 'var(--spacing-lg)',
    maxWidth: 'var(--dimension-content-max-width)',
    textAlign: 'center'
  }}>\r
      {Object.keys(manifest).map(name => <div key={name} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--spacing-xs)'
    }}>\r
          <Icon name={name as keyof typeof manifest} size="base" />\r
          <div style={{
        fontSize: 'var(--typography-sizes-small)',
        fontFamily: 'var(--typography-fonts-dos), var(--typography-fonts-fallback)'
      }}>\r
            {name}\r
          </div>\r
        </div>)}\r
    </div>
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var g,f,v;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--spacing-lg)',
    padding: 'var(--spacing-lg)',
    alignItems: 'center'
  }}>\r
      <Icon name="Info" size="small" />\r
      <Icon name="Info" size="base" />\r
      <Icon name="Info" size="large" />\r
      <Icon name="Info" size="touch" />\r
    </div>
}`,...(v=(f=o.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var y,x,u;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--spacing-lg)',
    padding: 'var(--spacing-lg)',
    alignItems: 'center'
  }}>\r
      <Icon name="Info" size="base" />\r
      <Icon name="Info" size="base" color="var(--color-system-link-default)" />\r
      <Icon name="Info" size="base" color="var(--color-system-link-hover)" />\r
      <Icon name="Info" size="base" color="var(--color-system-link-dim)" />\r
    </div>
}`,...(u=(x=n.parameters)==null?void 0:x.docs)==null?void 0:u.source}}};const j=["Default","IconGrid","Sizes","Colors"];export{n as Colors,a as Default,r as IconGrid,o as Sizes,j as __namedExportsOrder,k as default};
