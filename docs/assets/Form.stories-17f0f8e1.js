import{j as Ie}from"./jsx-runtime-50395f49.js";import"./index-9fa1aa67.js";const Pe=({children:Ve,className:_e="",variant:F,state:x="default",type:b})=>{const Ce=["form",_e,F,x,b&&`type-${b}`].filter(Boolean).join(" ");return Ie.jsx("div",{className:Ce,"data-variant":F,"data-state":x,"data-type":b,children:Ve})};Pe.__docgenInfo={description:"",methods:[],displayName:"Form",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large' | 'inline' | 'stacked'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'inline'"},{name:"literal",value:"'stacked'"}]},description:""},state:{required:!1,tsType:{name:"union",raw:"'default' | 'hover' | 'active' | 'disabled' | 'focused' | 'loading' | 'pressed'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'hover'"},{name:"literal",value:"'active'"},{name:"literal",value:"'disabled'"},{name:"literal",value:"'focused'"},{name:"literal",value:"'loading'"},{name:"literal",value:"'pressed'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},type:{required:!1,tsType:{name:"union",raw:"'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'group'",elements:[{name:"literal",value:"'text'"},{name:"literal",value:"'number'"},{name:"literal",value:"'email'"},{name:"literal",value:"'password'"},{name:"literal",value:"'search'"},{name:"literal",value:"'tel'"},{name:"literal",value:"'url'"},{name:"literal",value:"'group'"}]},description:""}}};const He={title:"Components/Form",component:Pe,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["small","medium","large","inline","stacked"],defaultValue:"small"},state:{control:"select",options:["default","hover","active","disabled","focused","loading","pressed"],defaultValue:"default"},type:{control:"select",options:["text","number","email","password","search","tel","url","group"]},className:{control:"text"},children:{control:"text"}}},e={args:{children:"Form Content",variant:"small",state:"default"}},a={args:{children:"Form small",variant:"small",state:"default"}},r={args:{children:"Form medium",variant:"medium",state:"default"}},t={args:{children:"Form large",variant:"large",state:"default"}},s={args:{children:"Form inline",variant:"inline",state:"default"}},n={args:{children:"Form stacked",variant:"stacked",state:"default"}},l={args:{children:"default State",variant:"small",state:"default"}},o={args:{children:"hover State",variant:"small",state:"hover"}},c={args:{children:"active State",variant:"small",state:"active"}},d={args:{children:"disabled State",variant:"small",state:"disabled"}},i={args:{children:"focused State",variant:"small",state:"focused"}},m={args:{children:"loading State",variant:"small",state:"loading"}},u={args:{children:"pressed State",variant:"small",state:"pressed"}},p={args:{children:"text Type",variant:"small",state:"default",type:"text"}},g={args:{children:"number Type",variant:"small",state:"default",type:"number"}},v={args:{children:"email Type",variant:"small",state:"default",type:"email"}},f={args:{children:"password Type",variant:"small",state:"default",type:"password"}},h={args:{children:"search Type",variant:"small",state:"default",type:"search"}},y={args:{children:"tel Type",variant:"small",state:"default",type:"tel"}},S={args:{children:"url Type",variant:"small",state:"default",type:"url"}},T={args:{children:"group Type",variant:"small",state:"default",type:"group"}};var w,k,N;e.parameters={...e.parameters,docs:{...(w=e.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: 'Form Content',
    variant: 'small',
    state: 'default'
  }
}`,...(N=(k=e.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var D,q,R;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    children: 'Form small',
    variant: 'small',
    state: 'default'
  }
}`,...(R=(q=a.parameters)==null?void 0:q.docs)==null?void 0:R.source}}};var j,E,L;r.parameters={...r.parameters,docs:{...(j=r.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    children: 'Form medium',
    variant: 'medium',
    state: 'default'
  }
}`,...(L=(E=r.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var P,V,_;t.parameters={...t.parameters,docs:{...(P=t.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    children: 'Form large',
    variant: 'large',
    state: 'default'
  }
}`,...(_=(V=t.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};var C,I,A;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'Form inline',
    variant: 'inline',
    state: 'default'
  }
}`,...(A=(I=s.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var G,H,M;n.parameters={...n.parameters,docs:{...(G=n.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    children: 'Form stacked',
    variant: 'stacked',
    state: 'default'
  }
}`,...(M=(H=n.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var U,$,B;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    children: 'default State',
    variant: 'small',
    state: 'default'
  }
}`,...(B=($=l.parameters)==null?void 0:$.docs)==null?void 0:B.source}}};var O,z,J;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    children: 'hover State',
    variant: 'small',
    state: 'hover'
  }
}`,...(J=(z=o.parameters)==null?void 0:z.docs)==null?void 0:J.source}}};var K,Q,W;c.parameters={...c.parameters,docs:{...(K=c.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    children: 'active State',
    variant: 'small',
    state: 'active'
  }
}`,...(W=(Q=c.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Y,Z;d.parameters={...d.parameters,docs:{...(X=d.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    children: 'disabled State',
    variant: 'small',
    state: 'disabled'
  }
}`,...(Z=(Y=d.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,ae,re;i.parameters={...i.parameters,docs:{...(ee=i.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    children: 'focused State',
    variant: 'small',
    state: 'focused'
  }
}`,...(re=(ae=i.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var te,se,ne;m.parameters={...m.parameters,docs:{...(te=m.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    children: 'loading State',
    variant: 'small',
    state: 'loading'
  }
}`,...(ne=(se=m.parameters)==null?void 0:se.docs)==null?void 0:ne.source}}};var le,oe,ce;u.parameters={...u.parameters,docs:{...(le=u.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    children: 'pressed State',
    variant: 'small',
    state: 'pressed'
  }
}`,...(ce=(oe=u.parameters)==null?void 0:oe.docs)==null?void 0:ce.source}}};var de,ie,me;p.parameters={...p.parameters,docs:{...(de=p.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    children: 'text Type',
    variant: 'small',
    state: 'default',
    type: 'text'
  }
}`,...(me=(ie=p.parameters)==null?void 0:ie.docs)==null?void 0:me.source}}};var ue,pe,ge;g.parameters={...g.parameters,docs:{...(ue=g.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    children: 'number Type',
    variant: 'small',
    state: 'default',
    type: 'number'
  }
}`,...(ge=(pe=g.parameters)==null?void 0:pe.docs)==null?void 0:ge.source}}};var ve,fe,he;v.parameters={...v.parameters,docs:{...(ve=v.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    children: 'email Type',
    variant: 'small',
    state: 'default',
    type: 'email'
  }
}`,...(he=(fe=v.parameters)==null?void 0:fe.docs)==null?void 0:he.source}}};var ye,Se,Te;f.parameters={...f.parameters,docs:{...(ye=f.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    children: 'password Type',
    variant: 'small',
    state: 'default',
    type: 'password'
  }
}`,...(Te=(Se=f.parameters)==null?void 0:Se.docs)==null?void 0:Te.source}}};var be,Fe,xe;h.parameters={...h.parameters,docs:{...(be=h.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    children: 'search Type',
    variant: 'small',
    state: 'default',
    type: 'search'
  }
}`,...(xe=(Fe=h.parameters)==null?void 0:Fe.docs)==null?void 0:xe.source}}};var we,ke,Ne;y.parameters={...y.parameters,docs:{...(we=y.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    children: 'tel Type',
    variant: 'small',
    state: 'default',
    type: 'tel'
  }
}`,...(Ne=(ke=y.parameters)==null?void 0:ke.docs)==null?void 0:Ne.source}}};var De,qe,Re;S.parameters={...S.parameters,docs:{...(De=S.parameters)==null?void 0:De.docs,source:{originalSource:`{
  args: {
    children: 'url Type',
    variant: 'small',
    state: 'default',
    type: 'url'
  }
}`,...(Re=(qe=S.parameters)==null?void 0:qe.docs)==null?void 0:Re.source}}};var je,Ee,Le;T.parameters={...T.parameters,docs:{...(je=T.parameters)==null?void 0:je.docs,source:{originalSource:`{
  args: {
    children: 'group Type',
    variant: 'small',
    state: 'default',
    type: 'group'
  }
}`,...(Le=(Ee=T.parameters)==null?void 0:Ee.docs)==null?void 0:Le.source}}};const Me=["Default","Small","Medium","Large","Inline","Stacked","StateDefault","StateHover","StateActive","StateDisabled","StateFocused","StateLoading","StatePressed","TextType","NumberType","EmailType","PasswordType","SearchType","TelType","UrlType","GroupType"];export{e as Default,v as EmailType,T as GroupType,s as Inline,t as Large,r as Medium,g as NumberType,f as PasswordType,h as SearchType,a as Small,n as Stacked,c as StateActive,l as StateDefault,d as StateDisabled,i as StateFocused,o as StateHover,m as StateLoading,u as StatePressed,y as TelType,p as TextType,S as UrlType,Me as __namedExportsOrder,He as default};
