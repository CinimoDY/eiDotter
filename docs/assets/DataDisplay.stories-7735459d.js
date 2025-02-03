import{j as Da}from"./jsx-runtime-50395f49.js";import"./index-9fa1aa67.js";const ga=({children:ha,className:Sa="",variant:h,state:S="default",type:g})=>{const Ta=["datadisplay",Sa,h,S,g&&`type-${g}`].filter(Boolean).join(" ");return Da.jsx("div",{className:Ta,"data-variant":h,"data-state":S,"data-type":g,children:ha})};ga.__docgenInfo={description:"",methods:[],displayName:"DataDisplay",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:""},state:{required:!1,tsType:{name:"union",raw:"'default' | 'hover' | 'active' | 'disabled' | 'focused'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'hover'"},{name:"literal",value:"'active'"},{name:"literal",value:"'disabled'"},{name:"literal",value:"'focused'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},type:{required:!1,tsType:{name:"union",raw:"'table' | 'list' | 'card' | 'grid' | 'simple' | 'h1' | 'h2' | 'group'",elements:[{name:"literal",value:"'table'"},{name:"literal",value:"'list'"},{name:"literal",value:"'card'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'simple'"},{name:"literal",value:"'h1'"},{name:"literal",value:"'h2'"},{name:"literal",value:"'group'"}]},description:""}}};const xa={title:"Components/DataDisplay",component:ga,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["compact","comfortable","spacious"],defaultValue:"compact"},state:{control:"select",options:["default","hover","active","disabled","focused"],defaultValue:"default"},type:{control:"select",options:["table","list","card","grid","simple","h1","h2","group"]},className:{control:"text"},children:{control:"text"}}},a={args:{children:"DataDisplay Content",variant:"compact",state:"default"}},e={args:{children:"DataDisplay compact",variant:"compact",state:"default"}},t={args:{children:"DataDisplay comfortable",variant:"comfortable",state:"default"}},r={args:{children:"DataDisplay spacious",variant:"spacious",state:"default"}},s={args:{children:"default State",variant:"compact",state:"default"}},c={args:{children:"hover State",variant:"compact",state:"hover"}},o={args:{children:"active State",variant:"compact",state:"active"}},n={args:{children:"disabled State",variant:"compact",state:"disabled"}},l={args:{children:"focused State",variant:"compact",state:"focused"}},p={args:{children:"table Type",variant:"compact",state:"default",type:"table"}},i={args:{children:"list Type",variant:"compact",state:"default",type:"list"}},d={args:{children:"card Type",variant:"compact",state:"default",type:"card"}},m={args:{children:"grid Type",variant:"compact",state:"default",type:"grid"}},u={args:{children:"simple Type",variant:"compact",state:"default",type:"simple"}},v={args:{children:"h1 Type",variant:"compact",state:"default",type:"h1"}},y={args:{children:"h2 Type",variant:"compact",state:"default",type:"h2"}},f={args:{children:"group Type",variant:"compact",state:"default",type:"group"}};var T,D,b;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    children: 'DataDisplay Content',
    variant: 'compact',
    state: 'default'
  }
}`,...(b=(D=a.parameters)==null?void 0:D.docs)==null?void 0:b.source}}};var C,x,H;e.parameters={...e.parameters,docs:{...(C=e.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'DataDisplay compact',
    variant: 'compact',
    state: 'default'
  }
}`,...(H=(x=e.parameters)==null?void 0:x.docs)==null?void 0:H.source}}};var N,q,R;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    children: 'DataDisplay comfortable',
    variant: 'comfortable',
    state: 'default'
  }
}`,...(R=(q=t.parameters)==null?void 0:q.docs)==null?void 0:R.source}}};var j,w,G;r.parameters={...r.parameters,docs:{...(j=r.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    children: 'DataDisplay spacious',
    variant: 'spacious',
    state: 'default'
  }
}`,...(G=(w=r.parameters)==null?void 0:w.docs)==null?void 0:G.source}}};var V,_,A;s.parameters={...s.parameters,docs:{...(V=s.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    children: 'default State',
    variant: 'compact',
    state: 'default'
  }
}`,...(A=(_=s.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var E,F,L;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    children: 'hover State',
    variant: 'compact',
    state: 'hover'
  }
}`,...(L=(F=c.parameters)==null?void 0:F.docs)==null?void 0:L.source}}};var $,k,B;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    children: 'active State',
    variant: 'compact',
    state: 'active'
  }
}`,...(B=(k=o.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var I,O,z;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    children: 'disabled State',
    variant: 'compact',
    state: 'disabled'
  }
}`,...(z=(O=n.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};var J,K,M;l.parameters={...l.parameters,docs:{...(J=l.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    children: 'focused State',
    variant: 'compact',
    state: 'focused'
  }
}`,...(M=(K=l.parameters)==null?void 0:K.docs)==null?void 0:M.source}}};var P,Q,U;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    children: 'table Type',
    variant: 'compact',
    state: 'default',
    type: 'table'
  }
}`,...(U=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var W,X,Y;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    children: 'list Type',
    variant: 'compact',
    state: 'default',
    type: 'list'
  }
}`,...(Y=(X=i.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,aa,ea;d.parameters={...d.parameters,docs:{...(Z=d.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    children: 'card Type',
    variant: 'compact',
    state: 'default',
    type: 'card'
  }
}`,...(ea=(aa=d.parameters)==null?void 0:aa.docs)==null?void 0:ea.source}}};var ta,ra,sa;m.parameters={...m.parameters,docs:{...(ta=m.parameters)==null?void 0:ta.docs,source:{originalSource:`{
  args: {
    children: 'grid Type',
    variant: 'compact',
    state: 'default',
    type: 'grid'
  }
}`,...(sa=(ra=m.parameters)==null?void 0:ra.docs)==null?void 0:sa.source}}};var ca,oa,na;u.parameters={...u.parameters,docs:{...(ca=u.parameters)==null?void 0:ca.docs,source:{originalSource:`{
  args: {
    children: 'simple Type',
    variant: 'compact',
    state: 'default',
    type: 'simple'
  }
}`,...(na=(oa=u.parameters)==null?void 0:oa.docs)==null?void 0:na.source}}};var la,pa,ia;v.parameters={...v.parameters,docs:{...(la=v.parameters)==null?void 0:la.docs,source:{originalSource:`{
  args: {
    children: 'h1 Type',
    variant: 'compact',
    state: 'default',
    type: 'h1'
  }
}`,...(ia=(pa=v.parameters)==null?void 0:pa.docs)==null?void 0:ia.source}}};var da,ma,ua;y.parameters={...y.parameters,docs:{...(da=y.parameters)==null?void 0:da.docs,source:{originalSource:`{
  args: {
    children: 'h2 Type',
    variant: 'compact',
    state: 'default',
    type: 'h2'
  }
}`,...(ua=(ma=y.parameters)==null?void 0:ma.docs)==null?void 0:ua.source}}};var va,ya,fa;f.parameters={...f.parameters,docs:{...(va=f.parameters)==null?void 0:va.docs,source:{originalSource:`{
  args: {
    children: 'group Type',
    variant: 'compact',
    state: 'default',
    type: 'group'
  }
}`,...(fa=(ya=f.parameters)==null?void 0:ya.docs)==null?void 0:fa.source}}};const Ha=["Default","Compact","Comfortable","Spacious","StateDefault","StateHover","StateActive","StateDisabled","StateFocused","TableType","ListType","CardType","GridType","SimpleType","H1Type","H2Type","GroupType"];export{d as CardType,t as Comfortable,e as Compact,a as Default,m as GridType,f as GroupType,v as H1Type,y as H2Type,i as ListType,u as SimpleType,r as Spacious,o as StateActive,s as StateDefault,n as StateDisabled,l as StateFocused,c as StateHover,p as TableType,Ha as __namedExportsOrder,xa as default};
