import{j as Ne}from"./jsx-runtime-50395f49.js";import"./index-9fa1aa67.js";const Te=({children:we,className:ke="",variant:y,state:b="default",type:h})=>{const Fe=["feedback",ke,y,b,h&&`type-${h}`].filter(Boolean).join(" ");return Ne.jsx("div",{className:Fe,"data-variant":y,"data-state":b,"data-type":h,children:we})};Te.__docgenInfo={description:"",methods:[],displayName:"Feedback",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'toast' | 'alert' | 'notification' | 'progress'",elements:[{name:"literal",value:"'toast'"},{name:"literal",value:"'alert'"},{name:"literal",value:"'notification'"},{name:"literal",value:"'progress'"}]},description:""},state:{required:!1,tsType:{name:"union",raw:"'default' | 'hover' | 'active' | 'disabled' | 'focused' | 'success' | 'error' | 'warning' | 'info'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'hover'"},{name:"literal",value:"'active'"},{name:"literal",value:"'disabled'"},{name:"literal",value:"'focused'"},{name:"literal",value:"'success'"},{name:"literal",value:"'error'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'info'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},type:{required:!1,tsType:{name:"union",raw:"'info' | 'success' | 'warning' | 'error'",elements:[{name:"literal",value:"'info'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"}]},description:""}}};const Ee={title:"Components/Feedback",component:Te,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["toast","alert","notification","progress"],defaultValue:"toast"},state:{control:"select",options:["default","hover","active","disabled","focused","success","error","warning","info"],defaultValue:"default"},type:{control:"select",options:["info","success","warning","error"]},className:{control:"text"},children:{control:"text"}}},e={args:{children:"Feedback Content",variant:"toast",state:"default"}},a={args:{children:"Feedback toast",variant:"toast",state:"default"}},t={args:{children:"Feedback alert",variant:"alert",state:"default"}},r={args:{children:"Feedback notification",variant:"notification",state:"default"}},s={args:{children:"Feedback progress",variant:"progress",state:"default"}},n={args:{children:"default State",variant:"toast",state:"default"}},o={args:{children:"hover State",variant:"toast",state:"hover"}},c={args:{children:"active State",variant:"toast",state:"active"}},i={args:{children:"disabled State",variant:"toast",state:"disabled"}},l={args:{children:"focused State",variant:"toast",state:"focused"}},d={args:{children:"success State",variant:"toast",state:"success"}},u={args:{children:"error State",variant:"toast",state:"error"}},p={args:{children:"warning State",variant:"toast",state:"warning"}},m={args:{children:"info State",variant:"toast",state:"info"}},g={args:{children:"info Type",variant:"toast",state:"default",type:"info"}},f={args:{children:"success Type",variant:"toast",state:"default",type:"success"}},v={args:{children:"warning Type",variant:"toast",state:"default",type:"warning"}},S={args:{children:"error Type",variant:"toast",state:"default",type:"error"}};var T,w,k;e.parameters={...e.parameters,docs:{...(T=e.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    children: 'Feedback Content',
    variant: 'toast',
    state: 'default'
  }
}`,...(k=(w=e.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var F,N,x;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    children: 'Feedback toast',
    variant: 'toast',
    state: 'default'
  }
}`,...(x=(N=a.parameters)==null?void 0:N.docs)==null?void 0:x.source}}};var D,E,q;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    children: 'Feedback alert',
    variant: 'alert',
    state: 'default'
  }
}`,...(q=(E=t.parameters)==null?void 0:E.docs)==null?void 0:q.source}}};var I,R,j;r.parameters={...r.parameters,docs:{...(I=r.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    children: 'Feedback notification',
    variant: 'notification',
    state: 'default'
  }
}`,...(j=(R=r.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var A,V,W;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    children: 'Feedback progress',
    variant: 'progress',
    state: 'default'
  }
}`,...(W=(V=s.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var _,C,H;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    children: 'default State',
    variant: 'toast',
    state: 'default'
  }
}`,...(H=(C=n.parameters)==null?void 0:C.docs)==null?void 0:H.source}}};var P,$,B;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    children: 'hover State',
    variant: 'toast',
    state: 'hover'
  }
}`,...(B=($=o.parameters)==null?void 0:$.docs)==null?void 0:B.source}}};var O,z,G;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    children: 'active State',
    variant: 'toast',
    state: 'active'
  }
}`,...(G=(z=c.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var J,K,L;i.parameters={...i.parameters,docs:{...(J=i.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    children: 'disabled State',
    variant: 'toast',
    state: 'disabled'
  }
}`,...(L=(K=i.parameters)==null?void 0:K.docs)==null?void 0:L.source}}};var M,Q,U;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    children: 'focused State',
    variant: 'toast',
    state: 'focused'
  }
}`,...(U=(Q=l.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,Z;d.parameters={...d.parameters,docs:{...(X=d.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    children: 'success State',
    variant: 'toast',
    state: 'success'
  }
}`,...(Z=(Y=d.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,ae,te;u.parameters={...u.parameters,docs:{...(ee=u.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    children: 'error State',
    variant: 'toast',
    state: 'error'
  }
}`,...(te=(ae=u.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var re,se,ne;p.parameters={...p.parameters,docs:{...(re=p.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    children: 'warning State',
    variant: 'toast',
    state: 'warning'
  }
}`,...(ne=(se=p.parameters)==null?void 0:se.docs)==null?void 0:ne.source}}};var oe,ce,ie;m.parameters={...m.parameters,docs:{...(oe=m.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    children: 'info State',
    variant: 'toast',
    state: 'info'
  }
}`,...(ie=(ce=m.parameters)==null?void 0:ce.docs)==null?void 0:ie.source}}};var le,de,ue;g.parameters={...g.parameters,docs:{...(le=g.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    children: 'info Type',
    variant: 'toast',
    state: 'default',
    type: 'info'
  }
}`,...(ue=(de=g.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var pe,me,ge;f.parameters={...f.parameters,docs:{...(pe=f.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    children: 'success Type',
    variant: 'toast',
    state: 'default',
    type: 'success'
  }
}`,...(ge=(me=f.parameters)==null?void 0:me.docs)==null?void 0:ge.source}}};var fe,ve,Se;v.parameters={...v.parameters,docs:{...(fe=v.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    children: 'warning Type',
    variant: 'toast',
    state: 'default',
    type: 'warning'
  }
}`,...(Se=(ve=v.parameters)==null?void 0:ve.docs)==null?void 0:Se.source}}};var he,ye,be;S.parameters={...S.parameters,docs:{...(he=S.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    children: 'error Type',
    variant: 'toast',
    state: 'default',
    type: 'error'
  }
}`,...(be=(ye=S.parameters)==null?void 0:ye.docs)==null?void 0:be.source}}};const qe=["Default","Toast","Alert","Notification","Progress","StateDefault","StateHover","StateActive","StateDisabled","StateFocused","StateSuccess","StateError","StateWarning","StateInfo","InfoType","SuccessType","WarningType","ErrorType"];export{t as Alert,e as Default,S as ErrorType,g as InfoType,r as Notification,s as Progress,c as StateActive,n as StateDefault,i as StateDisabled,u as StateError,l as StateFocused,o as StateHover,m as StateInfo,d as StateSuccess,p as StateWarning,f as SuccessType,a as Toast,v as WarningType,qe as __namedExportsOrder,Ee as default};
