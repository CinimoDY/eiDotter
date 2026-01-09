import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as r}from"./Button-DuquRA5i.js";const ce={title:"Components/Button",component:r,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost","link"],defaultValue:"primary"},size:{control:"select",options:["small","medium","large"],defaultValue:"medium"},type:{control:"select",options:["button","submit","reset"],defaultValue:"button"},disabled:{control:"boolean",defaultValue:!1},loading:{control:"boolean",defaultValue:!1},fullWidth:{control:"boolean",defaultValue:!1},children:{control:"text",defaultValue:"Button"},onClick:{action:"clicked"}}},a={args:{children:"Default Button"}},t={args:{variant:"primary",children:"Primary Button"}},s={args:{variant:"secondary",children:"Secondary Button"}},n={args:{variant:"ghost",children:"Ghost Button"}},o={args:{variant:"link",children:"Link Button"}},l={args:{size:"small",children:"Small Button"}},i={args:{size:"medium",children:"Medium Button"}},d={args:{size:"large",children:"Large Button"}},c={args:{disabled:!0,children:"Disabled Button"}},u={args:{loading:!0,children:"Loading Button"}},m={args:{fullWidth:!0,children:"Full Width Button"},parameters:{layout:"fullscreen"}},p={render:()=>e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx(r,{variant:"primary",children:"Primary"}),e.jsx(r,{variant:"secondary",children:"Secondary"}),e.jsx(r,{variant:"ghost",children:"Ghost"}),e.jsx(r,{variant:"link",children:"Link"})]})},g={render:()=>e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap"},children:[e.jsx(r,{size:"small",children:"Small"}),e.jsx(r,{size:"medium",children:"Medium"}),e.jsx(r,{size:"large",children:"Large"})]})},h={render:()=>e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx(r,{children:"Normal"}),e.jsx(r,{disabled:!0,children:"Disabled"}),e.jsx(r,{loading:!0,children:"Loading"})]})},y={render:()=>e.jsxs("form",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx(r,{type:"submit",variant:"primary",children:"Submit"}),e.jsx(r,{type:"reset",variant:"secondary",children:"Reset"}),e.jsx(r,{type:"button",variant:"ghost",children:"Cancel"})]})};var B,x,f;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    children: 'Default Button'
  }
}`,...(f=(x=a.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var v,S,b;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...(b=(S=t.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var j,L,z;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}`,...(z=(L=s.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var W,k,D;n.parameters={...n.parameters,docs:{...(W=n.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}`,...(D=(k=n.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var V,w,A;o.parameters={...o.parameters,docs:{...(V=o.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    variant: 'link',
    children: 'Link Button'
  }
}`,...(A=(w=o.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var F,G,M;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    size: 'small',
    children: 'Small Button'
  }
}`,...(M=(G=l.parameters)==null?void 0:G.docs)==null?void 0:M.source}}};var P,C,R;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    children: 'Medium Button'
  }
}`,...(R=(C=i.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};var E,I,N;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    size: 'large',
    children: 'Large Button'
  }
}`,...(N=(I=d.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var _,O,T;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
}`,...(T=(O=c.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var q,H,J;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: 'Loading Button'
  }
}`,...(J=(H=u.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var K,Q,U;m.parameters={...m.parameters,docs:{...(K=m.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    fullWidth: true,
    children: 'Full Width Button'
  },
  parameters: {
    layout: 'fullscreen'
  }
}`,...(U=(Q=m.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,Z;p.parameters={...p.parameters,docs:{...(X=p.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(Z=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,re;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
}`,...(re=(ee=g.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ae,te,se;h.parameters={...h.parameters,docs:{...(ae=h.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
}`,...(se=(te=h.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var ne,oe,le;y.parameters={...y.parameters,docs:{...(ne=y.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => <form style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button type="submit" variant="primary">Submit</Button>
      <Button type="reset" variant="secondary">Reset</Button>
      <Button type="button" variant="ghost">Cancel</Button>
    </form>
}`,...(le=(oe=y.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};const ue=["Default","Primary","Secondary","Ghost","Link","Small","Medium","Large","Disabled","Loading","FullWidth","AllVariants","AllSizes","AllStates","FormButtons"];export{g as AllSizes,h as AllStates,p as AllVariants,a as Default,c as Disabled,y as FormButtons,m as FullWidth,n as Ghost,d as Large,o as Link,u as Loading,i as Medium,t as Primary,s as Secondary,l as Small,ue as __namedExportsOrder,ce as default};
