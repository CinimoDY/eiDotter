import{j as Re}from"./jsx-runtime-50395f49.js";import"./index-9fa1aa67.js";const De=({children:Ne,className:qe="",variant:S,state:b="default",type:T})=>{const Be=["typography",qe,S,b,T&&`type-${T}`].filter(Boolean).join(" ");return Re.jsx("div",{className:Be,"data-variant":S,"data-state":b,"data-type":T,children:Ne})};De.__docgenInfo={description:"",methods:[],displayName:"Typography",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption'",elements:[{name:"literal",value:"'h1'"},{name:"literal",value:"'h2'"},{name:"literal",value:"'h3'"},{name:"literal",value:"'h4'"},{name:"literal",value:"'h5'"},{name:"literal",value:"'h6'"},{name:"literal",value:"'body'"},{name:"literal",value:"'caption'"}]},description:""},state:{required:!1,tsType:{name:"union",raw:"'default' | 'hover' | 'active' | 'disabled' | 'focused'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'hover'"},{name:"literal",value:"'active'"},{name:"literal",value:"'disabled'"},{name:"literal",value:"'focused'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},type:{required:!1,tsType:{name:"union",raw:"'heading' | 'body' | 'caption' | 'label' | 'code'",elements:[{name:"literal",value:"'heading'"},{name:"literal",value:"'body'"},{name:"literal",value:"'caption'"},{name:"literal",value:"'label'"},{name:"literal",value:"'code'"}]},description:""}}};const Ve={title:"Components/Typography",component:De,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["h1","h2","h3","h4","h5","h6","body","caption"],defaultValue:"h1"},state:{control:"select",options:["default","hover","active","disabled","focused"],defaultValue:"default"},type:{control:"select",options:["heading","body","caption","label","code"]},className:{control:"text"},children:{control:"text"}}},e={args:{children:"Typography Content",variant:"h1",state:"default"}},a={args:{children:"Typography h1",variant:"h1",state:"default"}},r={args:{children:"Typography h2",variant:"h2",state:"default"}},t={args:{children:"Typography h3",variant:"h3",state:"default"}},s={args:{children:"Typography h4",variant:"h4",state:"default"}},n={args:{children:"Typography h5",variant:"h5",state:"default"}},o={args:{children:"Typography h6",variant:"h6",state:"default"}},c={args:{children:"Typography body",variant:"body",state:"default"}},d={args:{children:"Typography caption",variant:"caption",state:"default"}},l={args:{children:"default State",variant:"h1",state:"default"}},i={args:{children:"hover State",variant:"h1",state:"hover"}},p={args:{children:"active State",variant:"h1",state:"active"}},u={args:{children:"disabled State",variant:"h1",state:"disabled"}},h={args:{children:"focused State",variant:"h1",state:"focused"}},m={args:{children:"heading Type",variant:"h1",state:"default",type:"heading"}},y={args:{children:"body Type",variant:"h1",state:"default",type:"body"}},g={args:{children:"caption Type",variant:"h1",state:"default",type:"caption"}},v={args:{children:"label Type",variant:"h1",state:"default",type:"label"}},f={args:{children:"code Type",variant:"h1",state:"default",type:"code"}};var H,C,x;e.parameters={...e.parameters,docs:{...(H=e.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    children: 'Typography Content',
    variant: 'h1',
    state: 'default'
  }
}`,...(x=(C=e.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};var D,N,q;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    children: 'Typography h1',
    variant: 'h1',
    state: 'default'
  }
}`,...(q=(N=a.parameters)==null?void 0:N.docs)==null?void 0:q.source}}};var B,R,j;r.parameters={...r.parameters,docs:{...(B=r.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    children: 'Typography h2',
    variant: 'h2',
    state: 'default'
  }
}`,...(j=(R=r.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var w,V,_;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: 'Typography h3',
    variant: 'h3',
    state: 'default'
  }
}`,...(_=(V=t.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};var A,E,F;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    children: 'Typography h4',
    variant: 'h4',
    state: 'default'
  }
}`,...(F=(E=s.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var L,$,k;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    children: 'Typography h5',
    variant: 'h5',
    state: 'default'
  }
}`,...(k=($=n.parameters)==null?void 0:$.docs)==null?void 0:k.source}}};var I,O,z;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    children: 'Typography h6',
    variant: 'h6',
    state: 'default'
  }
}`,...(z=(O=o.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};var G,J,K;c.parameters={...c.parameters,docs:{...(G=c.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    children: 'Typography body',
    variant: 'body',
    state: 'default'
  }
}`,...(K=(J=c.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var M,P,Q;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    children: 'Typography caption',
    variant: 'caption',
    state: 'default'
  }
}`,...(Q=(P=d.parameters)==null?void 0:P.docs)==null?void 0:Q.source}}};var U,W,X;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    children: 'default State',
    variant: 'h1',
    state: 'default'
  }
}`,...(X=(W=l.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Y,Z,ee;i.parameters={...i.parameters,docs:{...(Y=i.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    children: 'hover State',
    variant: 'h1',
    state: 'hover'
  }
}`,...(ee=(Z=i.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ae,re,te;p.parameters={...p.parameters,docs:{...(ae=p.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    children: 'active State',
    variant: 'h1',
    state: 'active'
  }
}`,...(te=(re=p.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var se,ne,oe;u.parameters={...u.parameters,docs:{...(se=u.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    children: 'disabled State',
    variant: 'h1',
    state: 'disabled'
  }
}`,...(oe=(ne=u.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var ce,de,le;h.parameters={...h.parameters,docs:{...(ce=h.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    children: 'focused State',
    variant: 'h1',
    state: 'focused'
  }
}`,...(le=(de=h.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var ie,pe,ue;m.parameters={...m.parameters,docs:{...(ie=m.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    children: 'heading Type',
    variant: 'h1',
    state: 'default',
    type: 'heading'
  }
}`,...(ue=(pe=m.parameters)==null?void 0:pe.docs)==null?void 0:ue.source}}};var he,me,ye;y.parameters={...y.parameters,docs:{...(he=y.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    children: 'body Type',
    variant: 'h1',
    state: 'default',
    type: 'body'
  }
}`,...(ye=(me=y.parameters)==null?void 0:me.docs)==null?void 0:ye.source}}};var ge,ve,fe;g.parameters={...g.parameters,docs:{...(ge=g.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    children: 'caption Type',
    variant: 'h1',
    state: 'default',
    type: 'caption'
  }
}`,...(fe=(ve=g.parameters)==null?void 0:ve.docs)==null?void 0:fe.source}}};var Te,Se,be;v.parameters={...v.parameters,docs:{...(Te=v.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  args: {
    children: 'label Type',
    variant: 'h1',
    state: 'default',
    type: 'label'
  }
}`,...(be=(Se=v.parameters)==null?void 0:Se.docs)==null?void 0:be.source}}};var He,Ce,xe;f.parameters={...f.parameters,docs:{...(He=f.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    children: 'code Type',
    variant: 'h1',
    state: 'default',
    type: 'code'
  }
}`,...(xe=(Ce=f.parameters)==null?void 0:Ce.docs)==null?void 0:xe.source}}};const _e=["Default","H1","H2","H3","H4","H5","H6","Body","Caption","StateDefault","StateHover","StateActive","StateDisabled","StateFocused","HeadingType","BodyType","CaptionType","LabelType","CodeType"];export{c as Body,y as BodyType,d as Caption,g as CaptionType,f as CodeType,e as Default,a as H1,r as H2,t as H3,s as H4,n as H5,o as H6,m as HeadingType,v as LabelType,p as StateActive,l as StateDefault,u as StateDisabled,h as StateFocused,i as StateHover,_e as __namedExportsOrder,Ve as default};
