import{j as ce}from"./jsx-runtime-50395f49.js";import"./index-9fa1aa67.js";const ne=({children:oe,className:de="",variant:v,state:g="default",type:f})=>{const ie=["layout",de,v,g,f&&`type-${f}`].filter(Boolean).join(" ");return ce.jsx("div",{className:ie,"data-variant":v,"data-state":g,"data-type":f,children:oe})};ne.__docgenInfo={description:"",methods:[],displayName:"Layout",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'fixed' | 'fluid' | 'grid' | 'flex'",elements:[{name:"literal",value:"'fixed'"},{name:"literal",value:"'fluid'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'flex'"}]},description:""},state:{required:!1,tsType:{name:"union",raw:"'default' | 'hover' | 'active' | 'disabled' | 'focused'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'hover'"},{name:"literal",value:"'active'"},{name:"literal",value:"'disabled'"},{name:"literal",value:"'focused'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},type:{required:!1,tsType:{name:"union",raw:"'container' | 'row' | 'column' | 'grid'",elements:[{name:"literal",value:"'container'"},{name:"literal",value:"'row'"},{name:"literal",value:"'column'"},{name:"literal",value:"'grid'"}]},description:""}}};const pe={title:"Components/Layout",component:ne,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["fixed","fluid","grid","flex"],defaultValue:"fixed"},state:{control:"select",options:["default","hover","active","disabled","focused"],defaultValue:"default"},type:{control:"select",options:["container","row","column","grid"]},className:{control:"text"},children:{control:"text"}}},e={args:{children:"Layout Content",variant:"fixed",state:"default"}},a={args:{children:"Layout fixed",variant:"fixed",state:"default"}},t={args:{children:"Layout fluid",variant:"fluid",state:"default"}},r={args:{children:"Layout grid",variant:"grid",state:"default"}},s={args:{children:"Layout flex",variant:"flex",state:"default"}},n={args:{children:"default State",variant:"fixed",state:"default"}},o={args:{children:"hover State",variant:"fixed",state:"hover"}},d={args:{children:"active State",variant:"fixed",state:"active"}},i={args:{children:"disabled State",variant:"fixed",state:"disabled"}},c={args:{children:"focused State",variant:"fixed",state:"focused"}},l={args:{children:"container Type",variant:"fixed",state:"default",type:"container"}},u={args:{children:"row Type",variant:"fixed",state:"default",type:"row"}},p={args:{children:"column Type",variant:"fixed",state:"default",type:"column"}},m={args:{children:"grid Type",variant:"fixed",state:"default",type:"grid"}};var y,x,h;e.parameters={...e.parameters,docs:{...(y=e.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    children: 'Layout Content',
    variant: 'fixed',
    state: 'default'
  }
}`,...(h=(x=e.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var S,T,L;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    children: 'Layout fixed',
    variant: 'fixed',
    state: 'default'
  }
}`,...(L=(T=a.parameters)==null?void 0:T.docs)==null?void 0:L.source}}};var w,b,F;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: 'Layout fluid',
    variant: 'fluid',
    state: 'default'
  }
}`,...(F=(b=t.parameters)==null?void 0:b.docs)==null?void 0:F.source}}};var C,R,D;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'Layout grid',
    variant: 'grid',
    state: 'default'
  }
}`,...(D=(R=r.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var N,q,j;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    children: 'Layout flex',
    variant: 'flex',
    state: 'default'
  }
}`,...(j=(q=s.parameters)==null?void 0:q.docs)==null?void 0:j.source}}};var G,V,_;n.parameters={...n.parameters,docs:{...(G=n.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    children: 'default State',
    variant: 'fixed',
    state: 'default'
  }
}`,...(_=(V=n.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};var A,E,H;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    children: 'hover State',
    variant: 'fixed',
    state: 'hover'
  }
}`,...(H=(E=o.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};var $,k,B;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    children: 'active State',
    variant: 'fixed',
    state: 'active'
  }
}`,...(B=(k=d.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var I,O,z;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    children: 'disabled State',
    variant: 'fixed',
    state: 'disabled'
  }
}`,...(z=(O=i.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};var J,K,M;c.parameters={...c.parameters,docs:{...(J=c.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    children: 'focused State',
    variant: 'fixed',
    state: 'focused'
  }
}`,...(M=(K=c.parameters)==null?void 0:K.docs)==null?void 0:M.source}}};var P,Q,U;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    children: 'container Type',
    variant: 'fixed',
    state: 'default',
    type: 'container'
  }
}`,...(U=(Q=l.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var W,X,Y;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    children: 'row Type',
    variant: 'fixed',
    state: 'default',
    type: 'row'
  }
}`,...(Y=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,ae;p.parameters={...p.parameters,docs:{...(Z=p.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    children: 'column Type',
    variant: 'fixed',
    state: 'default',
    type: 'column'
  }
}`,...(ae=(ee=p.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var te,re,se;m.parameters={...m.parameters,docs:{...(te=m.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    children: 'grid Type',
    variant: 'fixed',
    state: 'default',
    type: 'grid'
  }
}`,...(se=(re=m.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};const me=["Default","Fixed","Fluid","Grid","Flex","StateDefault","StateHover","StateActive","StateDisabled","StateFocused","ContainerType","RowType","ColumnType","GridType"];export{p as ColumnType,l as ContainerType,e as Default,a as Fixed,s as Flex,t as Fluid,r as Grid,m as GridType,u as RowType,d as StateActive,n as StateDefault,i as StateDisabled,c as StateFocused,o as StateHover,me as __namedExportsOrder,pe as default};
