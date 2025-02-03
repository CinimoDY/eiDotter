import{j as ye}from"./jsx-runtime-50395f49.js";import"./index-9fa1aa67.js";const fe=({children:Se,className:be="",variant:S,state:b="default",type:f})=>{const ze=["navigation",be,S,b,f&&`type-${f}`].filter(Boolean).join(" ");return ye.jsx("div",{className:ze,"data-variant":S,"data-state":b,"data-type":f,children:Se})};fe.__docgenInfo={description:"",methods:[],displayName:"Navigation",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical' | 'dropdown' | 'breadcrumb'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"},{name:"literal",value:"'dropdown'"},{name:"literal",value:"'breadcrumb'"}]},description:""},state:{required:!1,tsType:{name:"union",raw:"'default' | 'hover' | 'active' | 'disabled' | 'focused' | 'selected' | 'expanded' | 'collapsed'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'hover'"},{name:"literal",value:"'active'"},{name:"literal",value:"'disabled'"},{name:"literal",value:"'focused'"},{name:"literal",value:"'selected'"},{name:"literal",value:"'expanded'"},{name:"literal",value:"'collapsed'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},type:{required:!1,tsType:{name:"union",raw:"'link' | 'button' | 'menu' | 'tab'",elements:[{name:"literal",value:"'link'"},{name:"literal",value:"'button'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'tab'"}]},description:""}}};const xe={title:"Components/Navigation",component:fe,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["horizontal","vertical","dropdown","breadcrumb"],defaultValue:"horizontal"},state:{control:"select",options:["default","hover","active","disabled","focused","selected","expanded","collapsed"],defaultValue:"default"},type:{control:"select",options:["link","button","menu","tab"]},className:{control:"text"},children:{control:"text"}}},e={args:{children:"Navigation Content",variant:"horizontal",state:"default"}},a={args:{children:"Navigation horizontal",variant:"horizontal",state:"default"}},t={args:{children:"Navigation vertical",variant:"vertical",state:"default"}},r={args:{children:"Navigation dropdown",variant:"dropdown",state:"default"}},n={args:{children:"Navigation breadcrumb",variant:"breadcrumb",state:"default"}},o={args:{children:"default State",variant:"horizontal",state:"default"}},s={args:{children:"hover State",variant:"horizontal",state:"hover"}},l={args:{children:"active State",variant:"horizontal",state:"active"}},i={args:{children:"disabled State",variant:"horizontal",state:"disabled"}},c={args:{children:"focused State",variant:"horizontal",state:"focused"}},d={args:{children:"selected State",variant:"horizontal",state:"selected"}},u={args:{children:"expanded State",variant:"horizontal",state:"expanded"}},p={args:{children:"collapsed State",variant:"horizontal",state:"collapsed"}},m={args:{children:"link Type",variant:"horizontal",state:"default",type:"link"}},v={args:{children:"button Type",variant:"horizontal",state:"default",type:"button"}},h={args:{children:"menu Type",variant:"horizontal",state:"default",type:"menu"}},g={args:{children:"tab Type",variant:"horizontal",state:"default",type:"tab"}};var z,y,T;e.parameters={...e.parameters,docs:{...(z=e.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    children: 'Navigation Content',
    variant: 'horizontal',
    state: 'default'
  }
}`,...(T=(y=e.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var N,x,w;a.parameters={...a.parameters,docs:{...(N=a.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    children: 'Navigation horizontal',
    variant: 'horizontal',
    state: 'default'
  }
}`,...(w=(x=a.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var k,D,V;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    children: 'Navigation vertical',
    variant: 'vertical',
    state: 'default'
  }
}`,...(V=(D=t.parameters)==null?void 0:D.docs)==null?void 0:V.source}}};var q,B,C;r.parameters={...r.parameters,docs:{...(q=r.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    children: 'Navigation dropdown',
    variant: 'dropdown',
    state: 'default'
  }
}`,...(C=(B=r.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};var R,j,E;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    children: 'Navigation breadcrumb',
    variant: 'breadcrumb',
    state: 'default'
  }
}`,...(E=(j=n.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};var H,_,A;o.parameters={...o.parameters,docs:{...(H=o.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    children: 'default State',
    variant: 'horizontal',
    state: 'default'
  }
}`,...(A=(_=o.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var F,L,M;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    children: 'hover State',
    variant: 'horizontal',
    state: 'hover'
  }
}`,...(M=(L=s.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};var $,I,O;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    children: 'active State',
    variant: 'horizontal',
    state: 'active'
  }
}`,...(O=(I=l.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var G,J,K;i.parameters={...i.parameters,docs:{...(G=i.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    children: 'disabled State',
    variant: 'horizontal',
    state: 'disabled'
  }
}`,...(K=(J=i.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var P,Q,U;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    children: 'focused State',
    variant: 'horizontal',
    state: 'focused'
  }
}`,...(U=(Q=c.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var W,X,Y;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    children: 'selected State',
    variant: 'horizontal',
    state: 'selected'
  }
}`,...(Y=(X=d.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,ae;u.parameters={...u.parameters,docs:{...(Z=u.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    children: 'expanded State',
    variant: 'horizontal',
    state: 'expanded'
  }
}`,...(ae=(ee=u.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var te,re,ne;p.parameters={...p.parameters,docs:{...(te=p.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    children: 'collapsed State',
    variant: 'horizontal',
    state: 'collapsed'
  }
}`,...(ne=(re=p.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var oe,se,le;m.parameters={...m.parameters,docs:{...(oe=m.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    children: 'link Type',
    variant: 'horizontal',
    state: 'default',
    type: 'link'
  }
}`,...(le=(se=m.parameters)==null?void 0:se.docs)==null?void 0:le.source}}};var ie,ce,de;v.parameters={...v.parameters,docs:{...(ie=v.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    children: 'button Type',
    variant: 'horizontal',
    state: 'default',
    type: 'button'
  }
}`,...(de=(ce=v.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};var ue,pe,me;h.parameters={...h.parameters,docs:{...(ue=h.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    children: 'menu Type',
    variant: 'horizontal',
    state: 'default',
    type: 'menu'
  }
}`,...(me=(pe=h.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var ve,he,ge;g.parameters={...g.parameters,docs:{...(ve=g.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    children: 'tab Type',
    variant: 'horizontal',
    state: 'default',
    type: 'tab'
  }
}`,...(ge=(he=g.parameters)==null?void 0:he.docs)==null?void 0:ge.source}}};const we=["Default","Horizontal","Vertical","Dropdown","Breadcrumb","StateDefault","StateHover","StateActive","StateDisabled","StateFocused","StateSelected","StateExpanded","StateCollapsed","LinkType","ButtonType","MenuType","TabType"];export{n as Breadcrumb,v as ButtonType,e as Default,r as Dropdown,a as Horizontal,m as LinkType,h as MenuType,l as StateActive,p as StateCollapsed,o as StateDefault,i as StateDisabled,u as StateExpanded,c as StateFocused,s as StateHover,d as StateSelected,g as TabType,t as Vertical,we as __namedExportsOrder,xe as default};
