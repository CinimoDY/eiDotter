import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{I as r}from"./Icon-CtGTmgBb.js";import{c as z}from"./registry-CyM9n0D0.js";import"./iframe-BU4rT9RF.js";import"./preload-helper-Dp1pzeXC.js";import"./cn-CvUv5FIJ.js";const y=["Info","Warning","Error","Done","Close","Check","Chevron Up","Chevron Down","App","Cancel","Fullscreen","Add"],b={title:"Components/Icon",component:r,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:z.Icon},tags:["autodocs"],argTypes:{name:{control:"select",options:y},size:{control:"select",options:["L","S"]},color:{control:"select",options:["var(--color-semantic-text-primary)","var(--color-semantic-link-default)","var(--color-semantic-link-hover)","var(--color-semantic-text-disabled)"]},onClick:{action:"clicked"}}},o={args:{name:"Info",size:"L"}},a={render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(120px, 1fr))",gap:"8px",padding:"16px",maxWidth:"800px",textAlign:"center"},children:y.map(i=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",padding:"12px 4px",borderRadius:"2px",border:"1px solid var(--color-semantic-border-default)"},children:[e.jsx(r,{name:i,size:"L"}),e.jsx("div",{style:{fontSize:"10px",fontFamily:"var(--typography-font-family-primary)",lineHeight:1.2,wordBreak:"break-word"},children:i})]},i))})},n={render:()=>e.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[e.jsx(r,{name:"Info",size:"S"}),e.jsx(r,{name:"Info",size:"L"})]})},s={render:()=>e.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[e.jsx(r,{name:"Info",size:"L"}),e.jsx(r,{name:"Info",size:"L",color:"var(--color-semantic-link-default)"}),e.jsx(r,{name:"Info",size:"L",color:"var(--color-semantic-link-hover)"}),e.jsx(r,{name:"Info",size:"L",color:"var(--color-semantic-text-disabled)"})]})};var t,l,c;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    name: 'Info',
    size: 'L'
  }
}`,...(c=(l=o.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,p,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '8px',
    padding: '16px',
    maxWidth: '800px',
    textAlign: 'center'
  }}>
      {ICON_NAMES.map(name => <div key={name} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      padding: '12px 4px',
      borderRadius: '2px',
      border: '1px solid var(--color-semantic-border-default)'
    }}>
          <Icon name={name} size="L" />
          <div style={{
        fontSize: '10px',
        fontFamily: 'var(--typography-font-family-primary)',
        lineHeight: 1.2,
        wordBreak: 'break-word' as const
      }}>
            {name}
          </div>
        </div>)}
    </div>
}`,...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var x,f,g;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  }}>
      <Icon name="Info" size="S" />
      <Icon name="Info" size="L" />
    </div>
}`,...(g=(f=n.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var u,v,I;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  }}>
      <Icon name="Info" size="L" />
      <Icon name="Info" size="L" color="var(--color-semantic-link-default)" />
      <Icon name="Info" size="L" color="var(--color-semantic-link-hover)" />
      <Icon name="Info" size="L" color="var(--color-semantic-text-disabled)" />
    </div>
}`,...(I=(v=s.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};const A=["Default","IconGrid","Sizes","Colors"];export{s as Colors,o as Default,a as IconGrid,n as Sizes,A as __namedExportsOrder,b as default};
