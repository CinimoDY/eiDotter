import{j as e}from"./jsx-runtime-e7d94ccb.js";import"./index-981f9478.js";const a=({variant:ce="primary",size:me="medium",type:pe="button",disabled:t=!1,loading:r=!1,children:ge,onClick:B,className:he="",fullWidth:ye=!1,...fe})=>{const ve=be=>{t||r||B==null||B(be)},Be=["button",`button--${ce}`,`button--${me}`,t&&"button--disabled",r&&"button--loading",ye&&"button--full-width",he].filter(Boolean).join(" ");return e.jsxs("button",{type:pe,className:Be,onClick:ve,disabled:t||r,"aria-disabled":t||r,...fe,children:[r&&e.jsx("span",{className:"button__loading-indicator","aria-hidden":"true",children:"█"}),e.jsx("span",{className:`button__content ${r?"button__content--loading":""}`,children:ge})]})};a.__docgenInfo={description:`DOS-styled Button component with authentic terminal aesthetics\r
\r
Features:\r
- Multiple variants (primary, secondary, ghost, link)\r
- Three sizes (small, medium, large) \r
- Loading and disabled states\r
- Full TypeScript support\r
- WCAG 2.1 AA compliant\r
- DOS-authentic styling with CGA colors`,methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'ghost' | 'link'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'link'"}]},description:"The variant of the button which determines its styling",defaultValue:{value:"'primary'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"The size of the button",defaultValue:{value:"'medium'",computed:!1}},type:{required:!1,tsType:{name:"union",raw:"'button' | 'submit' | 'reset'",elements:[{name:"literal",value:"'button'"},{name:"literal",value:"'submit'"},{name:"literal",value:"'reset'"}]},description:"The button type",defaultValue:{value:"'button'",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the button is disabled",defaultValue:{value:"false",computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:"Whether the button is in a loading state",defaultValue:{value:"false",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Button content"},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLButtonElement>",elements:[{name:"HTMLButtonElement"}]},name:"event"}],return:{name:"void"}}},description:"Optional click handler"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name",defaultValue:{value:"''",computed:!1}},"aria-label":{required:!1,tsType:{name:"string"},description:"Optional aria-label for accessibility"},fullWidth:{required:!1,tsType:{name:"boolean"},description:"Full width button",defaultValue:{value:"false",computed:!1}}}};const je={title:"Components/Button",component:a,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost","link"],defaultValue:"primary"},size:{control:"select",options:["small","medium","large"],defaultValue:"medium"},type:{control:"select",options:["button","submit","reset"],defaultValue:"button"},disabled:{control:"boolean",defaultValue:!1},loading:{control:"boolean",defaultValue:!1},fullWidth:{control:"boolean",defaultValue:!1},children:{control:"text",defaultValue:"Button"},onClick:{action:"clicked"}}},n={args:{children:"Default Button"}},s={args:{variant:"primary",children:"Primary Button"}},o={args:{variant:"secondary",children:"Secondary Button"}},l={args:{variant:"ghost",children:"Ghost Button"}},i={args:{variant:"link",children:"Link Button"}},u={args:{size:"small",children:"Small Button"}},d={args:{size:"medium",children:"Medium Button"}},c={args:{size:"large",children:"Large Button"}},m={args:{disabled:!0,children:"Disabled Button"}},p={args:{loading:!0,children:"Loading Button"}},g={args:{fullWidth:!0,children:"Full Width Button"},parameters:{layout:"fullscreen"}},h={render:()=>e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx(a,{variant:"primary",children:"Primary"}),e.jsx(a,{variant:"secondary",children:"Secondary"}),e.jsx(a,{variant:"ghost",children:"Ghost"}),e.jsx(a,{variant:"link",children:"Link"})]})},y={render:()=>e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap"},children:[e.jsx(a,{size:"small",children:"Small"}),e.jsx(a,{size:"medium",children:"Medium"}),e.jsx(a,{size:"large",children:"Large"})]})},f={render:()=>e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx(a,{children:"Normal"}),e.jsx(a,{disabled:!0,children:"Disabled"}),e.jsx(a,{loading:!0,children:"Loading"})]})},v={render:()=>e.jsxs("form",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx(a,{type:"submit",variant:"primary",children:"Submit"}),e.jsx(a,{type:"reset",variant:"secondary",children:"Reset"}),e.jsx(a,{type:"button",variant:"ghost",children:"Cancel"})]})};var b,x,S;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    children: 'Default Button'
  }
}`,...(S=(x=n.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var j,L,w;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...(w=(L=s.parameters)==null?void 0:L.docs)==null?void 0:w.source}}};var T,W,z;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}`,...(z=(W=o.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};var k,V,M;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}`,...(M=(V=l.parameters)==null?void 0:V.docs)==null?void 0:M.source}}};var D,q,A;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    variant: 'link',
    children: 'Link Button'
  }
}`,...(A=(q=i.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};var R,_,F;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    size: 'small',
    children: 'Small Button'
  }
}`,...(F=(_=u.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var N,E,G;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    children: 'Medium Button'
  }
}`,...(G=(E=d.parameters)==null?void 0:E.docs)==null?void 0:G.source}}};var C,O,P;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    size: 'large',
    children: 'Large Button'
  }
}`,...(P=(O=c.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var $,H,I;m.parameters={...m.parameters,docs:{...($=m.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
}`,...(I=(H=m.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var J,K,Q;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: 'Loading Button'
  }
}`,...(Q=(K=p.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var U,X,Y;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    fullWidth: true,
    children: 'Full Width Button'
  },
  parameters: {
    layout: 'fullscreen'
  }
}`,...(Y=(X=g.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,ae;h.parameters={...h.parameters,docs:{...(Z=h.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>\r
      <Button variant="primary">Primary</Button>\r
      <Button variant="secondary">Secondary</Button>  \r
      <Button variant="ghost">Ghost</Button>\r
      <Button variant="link">Link</Button>\r
    </div>
}`,...(ae=(ee=h.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var re,te,ne;y.parameters={...y.parameters,docs:{...(re=y.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>\r
      <Button size="small">Small</Button>\r
      <Button size="medium">Medium</Button>\r
      <Button size="large">Large</Button>\r
    </div>
}`,...(ne=(te=y.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var se,oe,le;f.parameters={...f.parameters,docs:{...(se=f.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>\r
      <Button>Normal</Button>\r
      <Button disabled>Disabled</Button>\r
      <Button loading>Loading</Button>\r
    </div>
}`,...(le=(oe=f.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var ie,ue,de;v.parameters={...v.parameters,docs:{...(ie=v.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => <form style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>\r
      <Button type="submit" variant="primary">Submit</Button>\r
      <Button type="reset" variant="secondary">Reset</Button>\r
      <Button type="button" variant="ghost">Cancel</Button>\r
    </form>
}`,...(de=(ue=v.parameters)==null?void 0:ue.docs)==null?void 0:de.source}}};const Le=["Default","Primary","Secondary","Ghost","Link","Small","Medium","Large","Disabled","Loading","FullWidth","AllVariants","AllSizes","AllStates","FormButtons"];export{y as AllSizes,f as AllStates,h as AllVariants,n as Default,m as Disabled,v as FormButtons,g as FullWidth,l as Ghost,c as Large,i as Link,p as Loading,d as Medium,s as Primary,o as Secondary,u as Small,Le as __namedExportsOrder,je as default};
