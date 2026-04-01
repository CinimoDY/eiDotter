import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{B as e}from"./Button-BENNdNEf.js";import{c as mr}from"./registry-BH4hA_P8.js";/* empty css                  */const fr={title:"Components/Button",component:e,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:mr.Button},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost","link"],defaultValue:"primary"},size:{control:"select",options:["small","medium","large"],defaultValue:"medium"},type:{control:"select",options:["button","submit","reset"],defaultValue:"button"},disabled:{control:"boolean",defaultValue:!1},loading:{control:"boolean",defaultValue:!1},fullWidth:{control:"boolean",defaultValue:!1},children:{control:"text",defaultValue:"Button"},onClick:{action:"clicked"}}},a={args:{children:"Default Button"}},t={args:{variant:"primary",children:"Primary Button"}},o={args:{variant:"secondary",children:"Secondary Button"}},n={args:{variant:"ghost",children:"Ghost Button"}},s={args:{variant:"link",children:"Link Button"}},l={args:{size:"small",children:"Small Button"}},i={args:{size:"medium",children:"Medium Button"}},c={args:{size:"large",children:"Large Button"}},d={args:{disabled:!0,children:"Disabled Button"}},p={args:{loading:!0,children:"Loading Button"}},m={args:{fullWidth:!0,children:"Full Width Button"},parameters:{layout:"fullscreen"}},u={render:()=>r.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[r.jsx(e,{variant:"primary",children:"Primary"}),r.jsx(e,{variant:"secondary",children:"Secondary"}),r.jsx(e,{variant:"ghost",children:"Ghost"}),r.jsx(e,{variant:"link",children:"Link"})]})},g={render:()=>r.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap"},children:[r.jsx(e,{size:"small",children:"Small"}),r.jsx(e,{size:"medium",children:"Medium"}),r.jsx(e,{size:"large",children:"Large"})]})},y={render:()=>r.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[r.jsx(e,{children:"Normal"}),r.jsx(e,{disabled:!0,children:"Disabled"}),r.jsx(e,{loading:!0,children:"Loading"})]})},x={render:()=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px",padding:"32px",background:"var(--color-cga-black, #020003)",borderRadius:"4px"},children:[r.jsx("div",{style:{fontFamily:"var(--typography-font-family-primary, monospace)",color:"var(--color-semantic-text-primary, #b87c1a)",fontSize:"12px",marginBottom:"8px"},children:"Hover and click each variant to compare phosphor glow intensity and spring feel."}),r.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[r.jsx(e,{variant:"primary",children:"Primary"}),r.jsx("span",{style:{fontFamily:"monospace",color:"var(--color-cga-brown, #5f340e)",fontSize:"11px"},children:"3-layer bloom + warmup flicker + scanline crawl"})]}),r.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[r.jsx(e,{variant:"secondary",children:"Secondary"}),r.jsx("span",{style:{fontFamily:"monospace",color:"var(--color-cga-brown, #5f340e)",fontSize:"11px"},children:"2-layer bloom + warmup flicker"})]}),r.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[r.jsx(e,{variant:"ghost",children:"Ghost"}),r.jsx("span",{style:{fontFamily:"monospace",color:"var(--color-cga-brown, #5f340e)",fontSize:"11px"},children:"1-layer bloom + fast warmup"})]}),r.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[r.jsx(e,{variant:"link",children:"Link"}),r.jsx("span",{style:{fontFamily:"monospace",color:"var(--color-cga-brown, #5f340e)",fontSize:"11px"},children:"text-shadow glow only"})]})]}),parameters:{layout:"padded"}},f={render:()=>r.jsxs("form",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[r.jsx(e,{type:"submit",variant:"primary",children:"Submit"}),r.jsx(e,{type:"reset",variant:"secondary",children:"Reset"}),r.jsx(e,{type:"button",variant:"ghost",children:"Cancel"})]})};var h,v,B;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: 'Default Button'
  }
}`,...(B=(v=a.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var S,b,w;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...(w=(b=t.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var j,k,z;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}`,...(z=(k=o.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var W,L,F;n.parameters={...n.parameters,docs:{...(W=n.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}`,...(F=(L=n.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};var D,I,P;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    variant: 'link',
    children: 'Link Button'
  }
}`,...(P=(I=s.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};var V,G,M;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    size: 'small',
    children: 'Small Button'
  }
}`,...(M=(G=l.parameters)==null?void 0:G.docs)==null?void 0:M.source}}};var A,R,C;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    children: 'Medium Button'
  }
}`,...(C=(R=i.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};var E,H,N;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    size: 'large',
    children: 'Large Button'
  }
}`,...(N=(H=c.parameters)==null?void 0:H.docs)==null?void 0:N.source}}};var _,O,T;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
}`,...(T=(O=d.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var q,J,K;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: 'Loading Button'
  }
}`,...(K=(J=p.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,X;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    fullWidth: true,
    children: 'Full Width Button'
  },
  parameters: {
    layout: 'fullscreen'
  }
}`,...(X=(U=m.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,Z,$;u.parameters={...u.parameters,docs:{...(Y=u.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>  
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
}`,...($=(Z=u.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var rr,er,ar;g.parameters={...g.parameters,docs:{...(rr=g.parameters)==null?void 0:rr.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
}`,...(ar=(er=g.parameters)==null?void 0:er.docs)==null?void 0:ar.source}}};var tr,or,nr;y.parameters={...y.parameters,docs:{...(tr=y.parameters)==null?void 0:tr.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
}`,...(nr=(or=y.parameters)==null?void 0:or.docs)==null?void 0:nr.source}}};var sr,lr,ir;x.parameters={...x.parameters,docs:{...(sr=x.parameters)==null?void 0:sr.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '32px',
    background: 'var(--color-cga-black, #020003)',
    borderRadius: '4px'
  }}>
      <div style={{
      fontFamily: 'var(--typography-font-family-primary, monospace)',
      color: 'var(--color-semantic-text-primary, #b87c1a)',
      fontSize: '12px',
      marginBottom: '8px'
    }}>
        Hover and click each variant to compare phosphor glow intensity and spring feel.
      </div>
      <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary">Primary</Button>
        <span style={{
        fontFamily: 'monospace',
        color: 'var(--color-cga-brown, #5f340e)',
        fontSize: '11px'
      }}>3-layer bloom + warmup flicker + scanline crawl</span>
      </div>
      <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="secondary">Secondary</Button>
        <span style={{
        fontFamily: 'monospace',
        color: 'var(--color-cga-brown, #5f340e)',
        fontSize: '11px'
      }}>2-layer bloom + warmup flicker</span>
      </div>
      <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="ghost">Ghost</Button>
        <span style={{
        fontFamily: 'monospace',
        color: 'var(--color-cga-brown, #5f340e)',
        fontSize: '11px'
      }}>1-layer bloom + fast warmup</span>
      </div>
      <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="link">Link</Button>
        <span style={{
        fontFamily: 'monospace',
        color: 'var(--color-cga-brown, #5f340e)',
        fontSize: '11px'
      }}>text-shadow glow only</span>
      </div>
    </div>,
  parameters: {
    layout: 'padded'
  }
}`,...(ir=(lr=x.parameters)==null?void 0:lr.docs)==null?void 0:ir.source}}};var cr,dr,pr;f.parameters={...f.parameters,docs:{...(cr=f.parameters)==null?void 0:cr.docs,source:{originalSource:`{
  render: () => <form style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button type="submit" variant="primary">Submit</Button>
      <Button type="reset" variant="secondary">Reset</Button>
      <Button type="button" variant="ghost">Cancel</Button>
    </form>
}`,...(pr=(dr=f.parameters)==null?void 0:dr.docs)==null?void 0:pr.source}}};const hr=["Default","Primary","Secondary","Ghost","Link","Small","Medium","Large","Disabled","Loading","FullWidth","AllVariants","AllSizes","AllStates","PhosphorStates","FormButtons"];export{g as AllSizes,y as AllStates,u as AllVariants,a as Default,d as Disabled,f as FormButtons,m as FullWidth,n as Ghost,c as Large,s as Link,p as Loading,i as Medium,x as PhosphorStates,t as Primary,o as Secondary,l as Small,hr as __namedExportsOrder,fr as default};
