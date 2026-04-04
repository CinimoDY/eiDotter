import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{B as e}from"./Button-ldI8bcNF.js";import{c as Gr}from"./registry-BXQUvPFZ.js";import"./useFocusRing-B9CBo9Hr.js";import"./iframe-DLEjTnR4.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BVbWfVPw.js";import"./index-DCDPYD8f.js";import"./cn-CvUv5FIJ.js";/* empty css                  */const Hr={title:"Components/Button",component:e,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:Gr.Button},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","tertiary","destructive","ghost","link"],defaultValue:"primary"},size:{control:"select",options:["xs","sm","md","lg","xl"],defaultValue:"md"},type:{control:"select",options:["button","submit","reset"],defaultValue:"button"},disabled:{control:"boolean",defaultValue:!1},loading:{control:"boolean",defaultValue:!1},fullWidth:{control:"boolean",defaultValue:!1},iconOnly:{control:"boolean",defaultValue:!1},children:{control:"text",defaultValue:"Button"},onClick:{action:"clicked"}}},a={args:{children:"Default Button"}},t={args:{variant:"primary",children:"Primary Button"}},o={args:{variant:"secondary",children:"Secondary Button"}},n={args:{variant:"tertiary",children:"Tertiary Button"}},s={args:{variant:"destructive",children:"Destructive Button"}},i={args:{variant:"ghost",children:"Ghost Button"}},l={args:{variant:"link",children:"Link Button"}},c={args:{size:"xs",children:"XS Button"}},d={args:{size:"sm",children:"SM Button"}},p={args:{size:"md",children:"MD Button"}},u={args:{size:"lg",children:"LG Button"}},m={args:{size:"xl",children:"XL Button"}},y={args:{disabled:!0,children:"Disabled Button"}},g={args:{loading:!0,children:"Loading Button"}},x={args:{fullWidth:!0,children:"Full Width Button"},parameters:{layout:"fullscreen"}},v={args:{iconOnly:!0,children:"X","aria-label":"Close"}},h={render:()=>r.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[r.jsx(e,{variant:"primary",children:"Primary"}),r.jsx(e,{variant:"secondary",children:"Secondary"}),r.jsx(e,{variant:"tertiary",children:"Tertiary"}),r.jsx(e,{variant:"destructive",children:"Destructive"}),r.jsx(e,{variant:"ghost",children:"Ghost"}),r.jsx(e,{variant:"link",children:"Link"})]})},f={render:()=>r.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap"},children:[r.jsx(e,{size:"xs",children:"XS"}),r.jsx(e,{size:"sm",children:"SM"}),r.jsx(e,{size:"md",children:"MD"}),r.jsx(e,{size:"lg",children:"LG"}),r.jsx(e,{size:"xl",children:"XL"})]})},B={render:()=>r.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[r.jsx(e,{children:"Normal"}),r.jsx(e,{disabled:!0,children:"Disabled"}),r.jsx(e,{loading:!0,children:"Loading"})]})},S={render:()=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px",padding:"32px",background:"var(--color-cga-black, #020003)",borderRadius:"4px"},children:[r.jsx("div",{style:{fontFamily:"var(--typography-font-family-primary, monospace)",color:"var(--color-semantic-text-primary, #b87c1a)",fontSize:"12px",marginBottom:"8px"},children:"Hover and click each variant to compare phosphor glow intensity."}),r.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[r.jsx(e,{variant:"primary",children:"Primary"}),r.jsx("span",{style:{fontFamily:"monospace",color:"var(--color-cga-brown, #5f340e)",fontSize:"11px"},children:"3-layer bloom + scanline crawl"})]}),r.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[r.jsx(e,{variant:"secondary",children:"Secondary"}),r.jsx("span",{style:{fontFamily:"monospace",color:"var(--color-cga-brown, #5f340e)",fontSize:"11px"},children:"2-layer bloom + hover inversion"})]}),r.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[r.jsx(e,{variant:"tertiary",children:"Tertiary"}),r.jsx("span",{style:{fontFamily:"monospace",color:"var(--color-cga-brown, #5f340e)",fontSize:"11px"},children:"1-layer glow + border reveal"})]}),r.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[r.jsx(e,{variant:"destructive",children:"Destructive"}),r.jsx("span",{style:{fontFamily:"monospace",color:"var(--color-cga-brown, #5f340e)",fontSize:"11px"},children:"Red phosphor glow"})]}),r.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[r.jsx(e,{variant:"ghost",children:"Ghost"}),r.jsx("span",{style:{fontFamily:"monospace",color:"var(--color-cga-brown, #5f340e)",fontSize:"11px"},children:"1-layer bloom + hover inversion"})]}),r.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[r.jsx(e,{variant:"link",children:"Link"}),r.jsx("span",{style:{fontFamily:"monospace",color:"var(--color-cga-brown, #5f340e)",fontSize:"11px"},children:"text-shadow glow only"})]})]}),parameters:{layout:"padded"}},b={render:()=>r.jsxs("form",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[r.jsx(e,{type:"submit",variant:"primary",children:"Submit"}),r.jsx(e,{type:"reset",variant:"secondary",children:"Reset"}),r.jsx(e,{type:"button",variant:"ghost",children:"Cancel"})]})};var j,w,z;a.parameters={...a.parameters,docs:{...(j=a.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    children: 'Default Button'
  }
}`,...(z=(w=a.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var W,L,k;t.parameters={...t.parameters,docs:{...(W=t.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...(k=(L=t.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};var D,F,I;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}`,...(I=(F=o.parameters)==null?void 0:F.docs)==null?void 0:I.source}}};var G,M,P;n.parameters={...n.parameters,docs:{...(G=n.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button'
  }
}`,...(P=(M=n.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var V,X,T;s.parameters={...s.parameters,docs:{...(V=s.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    variant: 'destructive',
    children: 'Destructive Button'
  }
}`,...(T=(X=s.parameters)==null?void 0:X.docs)==null?void 0:T.source}}};var R,A,C;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}`,...(C=(A=i.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var E,O,H;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    variant: 'link',
    children: 'Link Button'
  }
}`,...(H=(O=l.parameters)==null?void 0:O.docs)==null?void 0:H.source}}};var N,_,q;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    size: 'xs',
    children: 'XS Button'
  }
}`,...(q=(_=c.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var J,K,Q;d.parameters={...d.parameters,docs:{...(J=d.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    size: 'sm',
    children: 'SM Button'
  }
}`,...(Q=(K=d.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var U,Y,Z;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    size: 'md',
    children: 'MD Button'
  }
}`,...(Z=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,rr,er;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    size: 'lg',
    children: 'LG Button'
  }
}`,...(er=(rr=u.parameters)==null?void 0:rr.docs)==null?void 0:er.source}}};var ar,tr,or;m.parameters={...m.parameters,docs:{...(ar=m.parameters)==null?void 0:ar.docs,source:{originalSource:`{
  args: {
    size: 'xl',
    children: 'XL Button'
  }
}`,...(or=(tr=m.parameters)==null?void 0:tr.docs)==null?void 0:or.source}}};var nr,sr,ir;y.parameters={...y.parameters,docs:{...(nr=y.parameters)==null?void 0:nr.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
}`,...(ir=(sr=y.parameters)==null?void 0:sr.docs)==null?void 0:ir.source}}};var lr,cr,dr;g.parameters={...g.parameters,docs:{...(lr=g.parameters)==null?void 0:lr.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: 'Loading Button'
  }
}`,...(dr=(cr=g.parameters)==null?void 0:cr.docs)==null?void 0:dr.source}}};var pr,ur,mr;x.parameters={...x.parameters,docs:{...(pr=x.parameters)==null?void 0:pr.docs,source:{originalSource:`{
  args: {
    fullWidth: true,
    children: 'Full Width Button'
  },
  parameters: {
    layout: 'fullscreen'
  }
}`,...(mr=(ur=x.parameters)==null?void 0:ur.docs)==null?void 0:mr.source}}};var yr,gr,xr;v.parameters={...v.parameters,docs:{...(yr=v.parameters)==null?void 0:yr.docs,source:{originalSource:`{
  args: {
    iconOnly: true,
    children: 'X',
    'aria-label': 'Close'
  }
}`,...(xr=(gr=v.parameters)==null?void 0:gr.docs)==null?void 0:xr.source}}};var vr,hr,fr;h.parameters={...h.parameters,docs:{...(vr=h.parameters)==null?void 0:vr.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
}`,...(fr=(hr=h.parameters)==null?void 0:hr.docs)==null?void 0:fr.source}}};var Br,Sr,br;f.parameters={...f.parameters,docs:{...(Br=f.parameters)==null?void 0:Br.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
    </div>
}`,...(br=(Sr=f.parameters)==null?void 0:Sr.docs)==null?void 0:br.source}}};var jr,wr,zr;B.parameters={...B.parameters,docs:{...(jr=B.parameters)==null?void 0:jr.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
}`,...(zr=(wr=B.parameters)==null?void 0:wr.docs)==null?void 0:zr.source}}};var Wr,Lr,kr;S.parameters={...S.parameters,docs:{...(Wr=S.parameters)==null?void 0:Wr.docs,source:{originalSource:`{
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
        Hover and click each variant to compare phosphor glow intensity.
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
      }}>
          3-layer bloom + scanline crawl
        </span>
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
      }}>
          2-layer bloom + hover inversion
        </span>
      </div>
      <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="tertiary">Tertiary</Button>
        <span style={{
        fontFamily: 'monospace',
        color: 'var(--color-cga-brown, #5f340e)',
        fontSize: '11px'
      }}>
          1-layer glow + border reveal
        </span>
      </div>
      <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="destructive">Destructive</Button>
        <span style={{
        fontFamily: 'monospace',
        color: 'var(--color-cga-brown, #5f340e)',
        fontSize: '11px'
      }}>
          Red phosphor glow
        </span>
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
      }}>
          1-layer bloom + hover inversion
        </span>
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
      }}>
          text-shadow glow only
        </span>
      </div>
    </div>,
  parameters: {
    layout: 'padded'
  }
}`,...(kr=(Lr=S.parameters)==null?void 0:Lr.docs)==null?void 0:kr.source}}};var Dr,Fr,Ir;b.parameters={...b.parameters,docs:{...(Dr=b.parameters)==null?void 0:Dr.docs,source:{originalSource:`{
  render: () => <form style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button type="submit" variant="primary">Submit</Button>
      <Button type="reset" variant="secondary">Reset</Button>
      <Button type="button" variant="ghost">Cancel</Button>
    </form>
}`,...(Ir=(Fr=b.parameters)==null?void 0:Fr.docs)==null?void 0:Ir.source}}};const Nr=["Default","Primary","Secondary","Tertiary","Destructive","Ghost","Link","ExtraSmall","Small","Medium","Large","ExtraLarge","Disabled","Loading","FullWidth","IconOnly","AllVariants","AllSizes","AllStates","PhosphorStates","FormButtons"];export{f as AllSizes,B as AllStates,h as AllVariants,a as Default,s as Destructive,y as Disabled,m as ExtraLarge,c as ExtraSmall,b as FormButtons,x as FullWidth,i as Ghost,v as IconOnly,u as Large,l as Link,g as Loading,p as Medium,S as PhosphorStates,t as Primary,o as Secondary,d as Small,n as Tertiary,Nr as __namedExportsOrder,Hr as default};
