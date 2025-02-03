import{j as Re}from"./jsx-runtime-50395f49.js";import"./index-9fa1aa67.js";const xe=({children:Ne,className:qe="",variant:T,state:w="default",type:h})=>{const Ce=["overlay",qe,T,w,h&&`type-${h}`].filter(Boolean).join(" ");return Re.jsx("div",{className:Ce,"data-variant":T,"data-state":w,"data-type":h,children:Ne})};xe.__docgenInfo={description:"",methods:[],displayName:"Overlay",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'modal' | 'dialog' | 'drawer' | 'popover' | 'tooltip'",elements:[{name:"literal",value:"'modal'"},{name:"literal",value:"'dialog'"},{name:"literal",value:"'drawer'"},{name:"literal",value:"'popover'"},{name:"literal",value:"'tooltip'"}]},description:""},state:{required:!1,tsType:{name:"union",raw:"'default' | 'hover' | 'active' | 'disabled' | 'focused' | 'open' | 'closed' | 'animating'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'hover'"},{name:"literal",value:"'active'"},{name:"literal",value:"'disabled'"},{name:"literal",value:"'focused'"},{name:"literal",value:"'open'"},{name:"literal",value:"'closed'"},{name:"literal",value:"'animating'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},type:{required:!1,tsType:{name:"union",raw:"'modal' | 'dialog' | 'drawer' | 'popover' | 'tooltip'",elements:[{name:"literal",value:"'modal'"},{name:"literal",value:"'dialog'"},{name:"literal",value:"'drawer'"},{name:"literal",value:"'popover'"},{name:"literal",value:"'tooltip'"}]},description:""}}};const Me={title:"Components/Overlay",component:xe,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["modal","dialog","drawer","popover","tooltip"],defaultValue:"modal"},state:{control:"select",options:["default","hover","active","disabled","focused","open","closed","animating"],defaultValue:"default"},type:{control:"select",options:["modal","dialog","drawer","popover","tooltip"]},className:{control:"text"},children:{control:"text"}}},e={args:{children:"Overlay Content",variant:"modal",state:"default"}},a={args:{children:"Overlay modal",variant:"modal",state:"default"}},r={args:{children:"Overlay dialog",variant:"dialog",state:"default"}},t={args:{children:"Overlay drawer",variant:"drawer",state:"default"}},o={args:{children:"Overlay popover",variant:"popover",state:"default"}},s={args:{children:"Overlay tooltip",variant:"tooltip",state:"default"}},n={args:{children:"default State",variant:"modal",state:"default"}},l={args:{children:"hover State",variant:"modal",state:"hover"}},d={args:{children:"active State",variant:"modal",state:"active"}},i={args:{children:"disabled State",variant:"modal",state:"disabled"}},c={args:{children:"focused State",variant:"modal",state:"focused"}},p={args:{children:"open State",variant:"modal",state:"open"}},m={args:{children:"closed State",variant:"modal",state:"closed"}},u={args:{children:"animating State",variant:"modal",state:"animating"}},v={args:{children:"modal Type",variant:"modal",state:"default",type:"modal"}},g={args:{children:"dialog Type",variant:"modal",state:"default",type:"dialog"}},f={args:{children:"drawer Type",variant:"modal",state:"default",type:"drawer"}},y={args:{children:"popover Type",variant:"modal",state:"default",type:"popover"}},S={args:{children:"tooltip Type",variant:"modal",state:"default",type:"tooltip"}};var O,D,b;e.parameters={...e.parameters,docs:{...(O=e.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    children: 'Overlay Content',
    variant: 'modal',
    state: 'default'
  }
}`,...(b=(D=e.parameters)==null?void 0:D.docs)==null?void 0:b.source}}};var x,N,q;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    children: 'Overlay modal',
    variant: 'modal',
    state: 'default'
  }
}`,...(q=(N=a.parameters)==null?void 0:N.docs)==null?void 0:q.source}}};var C,R,j;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'Overlay dialog',
    variant: 'dialog',
    state: 'default'
  }
}`,...(j=(R=r.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var A,M,P;t.parameters={...t.parameters,docs:{...(A=t.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    children: 'Overlay drawer',
    variant: 'drawer',
    state: 'default'
  }
}`,...(P=(M=t.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var V,_,E;o.parameters={...o.parameters,docs:{...(V=o.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    children: 'Overlay popover',
    variant: 'popover',
    state: 'default'
  }
}`,...(E=(_=o.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};var F,H,$;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    children: 'Overlay tooltip',
    variant: 'tooltip',
    state: 'default'
  }
}`,...($=(H=s.parameters)==null?void 0:H.docs)==null?void 0:$.source}}};var k,B,I;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    children: 'default State',
    variant: 'modal',
    state: 'default'
  }
}`,...(I=(B=n.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var z,G,J;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    children: 'hover State',
    variant: 'modal',
    state: 'hover'
  }
}`,...(J=(G=l.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,L,Q;d.parameters={...d.parameters,docs:{...(K=d.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    children: 'active State',
    variant: 'modal',
    state: 'active'
  }
}`,...(Q=(L=d.parameters)==null?void 0:L.docs)==null?void 0:Q.source}}};var U,W,X;i.parameters={...i.parameters,docs:{...(U=i.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    children: 'disabled State',
    variant: 'modal',
    state: 'disabled'
  }
}`,...(X=(W=i.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Y,Z,ee;c.parameters={...c.parameters,docs:{...(Y=c.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    children: 'focused State',
    variant: 'modal',
    state: 'focused'
  }
}`,...(ee=(Z=c.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ae,re,te;p.parameters={...p.parameters,docs:{...(ae=p.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    children: 'open State',
    variant: 'modal',
    state: 'open'
  }
}`,...(te=(re=p.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var oe,se,ne;m.parameters={...m.parameters,docs:{...(oe=m.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    children: 'closed State',
    variant: 'modal',
    state: 'closed'
  }
}`,...(ne=(se=m.parameters)==null?void 0:se.docs)==null?void 0:ne.source}}};var le,de,ie;u.parameters={...u.parameters,docs:{...(le=u.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    children: 'animating State',
    variant: 'modal',
    state: 'animating'
  }
}`,...(ie=(de=u.parameters)==null?void 0:de.docs)==null?void 0:ie.source}}};var ce,pe,me;v.parameters={...v.parameters,docs:{...(ce=v.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    children: 'modal Type',
    variant: 'modal',
    state: 'default',
    type: 'modal'
  }
}`,...(me=(pe=v.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var ue,ve,ge;g.parameters={...g.parameters,docs:{...(ue=g.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    children: 'dialog Type',
    variant: 'modal',
    state: 'default',
    type: 'dialog'
  }
}`,...(ge=(ve=g.parameters)==null?void 0:ve.docs)==null?void 0:ge.source}}};var fe,ye,Se;f.parameters={...f.parameters,docs:{...(fe=f.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    children: 'drawer Type',
    variant: 'modal',
    state: 'default',
    type: 'drawer'
  }
}`,...(Se=(ye=f.parameters)==null?void 0:ye.docs)==null?void 0:Se.source}}};var he,Te,we;y.parameters={...y.parameters,docs:{...(he=y.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    children: 'popover Type',
    variant: 'modal',
    state: 'default',
    type: 'popover'
  }
}`,...(we=(Te=y.parameters)==null?void 0:Te.docs)==null?void 0:we.source}}};var Oe,De,be;S.parameters={...S.parameters,docs:{...(Oe=S.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  args: {
    children: 'tooltip Type',
    variant: 'modal',
    state: 'default',
    type: 'tooltip'
  }
}`,...(be=(De=S.parameters)==null?void 0:De.docs)==null?void 0:be.source}}};const Pe=["Default","Modal","Dialog","Drawer","Popover","Tooltip","StateDefault","StateHover","StateActive","StateDisabled","StateFocused","StateOpen","StateClosed","StateAnimating","ModalType","DialogType","DrawerType","PopoverType","TooltipType"];export{e as Default,r as Dialog,g as DialogType,t as Drawer,f as DrawerType,a as Modal,v as ModalType,o as Popover,y as PopoverType,d as StateActive,u as StateAnimating,m as StateClosed,n as StateDefault,i as StateDisabled,c as StateFocused,l as StateHover,p as StateOpen,s as Tooltip,S as TooltipType,Pe as __namedExportsOrder,Me as default};
