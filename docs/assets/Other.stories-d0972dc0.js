import{j as ne}from"./jsx-runtime-50395f49.js";import"./index-9fa1aa67.js";const ae=({children:te,className:re="",variant:v,state:f="default",type:m})=>{const se=["other",re,v,f,m&&`type-${m}`].filter(Boolean).join(" ");return ne.jsx("div",{className:se,"data-variant":v,"data-state":f,"data-type":m,children:te})};ae.__docgenInfo={description:"",methods:[],displayName:"Other",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'bold' | 'subtle' | 'left' | 'right' | 'center'",elements:[{name:"literal",value:"'bold'"},{name:"literal",value:"'subtle'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'center'"}]},description:""},state:{required:!1,tsType:{name:"union",raw:"'default' | 'hover' | 'active' | 'disabled' | 'focused'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'hover'"},{name:"literal",value:"'active'"},{name:"literal",value:"'disabled'"},{name:"literal",value:"'focused'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},type:{required:!1,tsType:{name:"union",raw:"'group' | 'button'",elements:[{name:"literal",value:"'group'"},{name:"literal",value:"'button'"}]},description:""}}};const de={title:"Components/Other",component:ae,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["bold","subtle","left","right","center"],defaultValue:"bold"},state:{control:"select",options:["default","hover","active","disabled","focused"],defaultValue:"default"},type:{control:"select",options:["group","button"]},className:{control:"text"},children:{control:"text"}}},e={args:{children:"Other Content",variant:"bold",state:"default"}},a={args:{children:"Other bold",variant:"bold",state:"default"}},t={args:{children:"Other subtle",variant:"subtle",state:"default"}},r={args:{children:"Other left",variant:"left",state:"default"}},s={args:{children:"Other right",variant:"right",state:"default"}},n={args:{children:"Other center",variant:"center",state:"default"}},o={args:{children:"default State",variant:"bold",state:"default"}},l={args:{children:"hover State",variant:"bold",state:"hover"}},d={args:{children:"active State",variant:"bold",state:"active"}},c={args:{children:"disabled State",variant:"bold",state:"disabled"}},i={args:{children:"focused State",variant:"bold",state:"focused"}},u={args:{children:"group Type",variant:"bold",state:"default",type:"group"}},p={args:{children:"button Type",variant:"bold",state:"default",type:"button"}};var h,g,b;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: 'Other Content',
    variant: 'bold',
    state: 'default'
  }
}`,...(b=(g=e.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var S,y,O;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    children: 'Other bold',
    variant: 'bold',
    state: 'default'
  }
}`,...(O=(y=a.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};var T,x,R;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    children: 'Other subtle',
    variant: 'subtle',
    state: 'default'
  }
}`,...(R=(x=t.parameters)==null?void 0:x.docs)==null?void 0:R.source}}};var D,N,q;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    children: 'Other left',
    variant: 'left',
    state: 'default'
  }
}`,...(q=(N=r.parameters)==null?void 0:N.docs)==null?void 0:q.source}}};var B,C,j;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    children: 'Other right',
    variant: 'right',
    state: 'default'
  }
}`,...(j=(C=s.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};var w,V,_;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: 'Other center',
    variant: 'center',
    state: 'default'
  }
}`,...(_=(V=n.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};var A,E,F;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    children: 'default State',
    variant: 'bold',
    state: 'default'
  }
}`,...(F=(E=o.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var G,H,L;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    children: 'hover State',
    variant: 'bold',
    state: 'hover'
  }
}`,...(L=(H=l.parameters)==null?void 0:H.docs)==null?void 0:L.source}}};var $,k,I;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    children: 'active State',
    variant: 'bold',
    state: 'active'
  }
}`,...(I=(k=d.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};var z,J,K;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    children: 'disabled State',
    variant: 'bold',
    state: 'disabled'
  }
}`,...(K=(J=c.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var M,P,Q;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    children: 'focused State',
    variant: 'bold',
    state: 'focused'
  }
}`,...(Q=(P=i.parameters)==null?void 0:P.docs)==null?void 0:Q.source}}};var U,W,X;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    children: 'group Type',
    variant: 'bold',
    state: 'default',
    type: 'group'
  }
}`,...(X=(W=u.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Y,Z,ee;p.parameters={...p.parameters,docs:{...(Y=p.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    children: 'button Type',
    variant: 'bold',
    state: 'default',
    type: 'button'
  }
}`,...(ee=(Z=p.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};const ce=["Default","Bold","Subtle","Left","Right","Center","StateDefault","StateHover","StateActive","StateDisabled","StateFocused","GroupType","ButtonType"];export{a as Bold,p as ButtonType,n as Center,e as Default,u as GroupType,r as Left,s as Right,d as StateActive,o as StateDefault,c as StateDisabled,i as StateFocused,l as StateHover,t as Subtle,ce as __namedExportsOrder,de as default};
