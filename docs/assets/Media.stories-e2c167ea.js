import{j as Re}from"./jsx-runtime-50395f49.js";import"./index-9fa1aa67.js";const be=({children:Me,className:qe="",variant:y,state:T="default",type:S})=>{const xe=["media",qe,y,T,S&&`type-${S}`].filter(Boolean).join(" ");return Re.jsx("div",{className:xe,"data-variant":y,"data-state":T,"data-type":S,children:Me})};be.__docgenInfo={description:"",methods:[],displayName:"Media",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'image' | 'video' | 'audio' | 'thumbnail' | 'avatar'",elements:[{name:"literal",value:"'image'"},{name:"literal",value:"'video'"},{name:"literal",value:"'audio'"},{name:"literal",value:"'thumbnail'"},{name:"literal",value:"'avatar'"}]},description:""},state:{required:!1,tsType:{name:"union",raw:"'default' | 'hover' | 'active' | 'disabled' | 'focused' | 'loading' | 'error'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'hover'"},{name:"literal",value:"'active'"},{name:"literal",value:"'disabled'"},{name:"literal",value:"'focused'"},{name:"literal",value:"'loading'"},{name:"literal",value:"'error'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},type:{required:!1,tsType:{name:"union",raw:"'square' | 'circle' | 'rounded' | 'landscape' | 'portrait'",elements:[{name:"literal",value:"'square'"},{name:"literal",value:"'circle'"},{name:"literal",value:"'rounded'"},{name:"literal",value:"'landscape'"},{name:"literal",value:"'portrait'"}]},description:""}}};const Ne={title:"Components/Media",component:be,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["image","video","audio","thumbnail","avatar"],defaultValue:"image"},state:{control:"select",options:["default","hover","active","disabled","focused","loading","error"],defaultValue:"default"},type:{control:"select",options:["square","circle","rounded","landscape","portrait"]},className:{control:"text"},children:{control:"text"}}},e={args:{children:"Media Content",variant:"image",state:"default"}},a={args:{children:"Media image",variant:"image",state:"default"}},r={args:{children:"Media video",variant:"video",state:"default"}},t={args:{children:"Media audio",variant:"audio",state:"default"}},s={args:{children:"Media thumbnail",variant:"thumbnail",state:"default"}},n={args:{children:"Media avatar",variant:"avatar",state:"default"}},i={args:{children:"default State",variant:"image",state:"default"}},o={args:{children:"hover State",variant:"image",state:"hover"}},d={args:{children:"active State",variant:"image",state:"active"}},c={args:{children:"disabled State",variant:"image",state:"disabled"}},l={args:{children:"focused State",variant:"image",state:"focused"}},u={args:{children:"loading State",variant:"image",state:"loading"}},m={args:{children:"error State",variant:"image",state:"error"}},p={args:{children:"square Type",variant:"image",state:"default",type:"square"}},g={args:{children:"circle Type",variant:"image",state:"default",type:"circle"}},v={args:{children:"rounded Type",variant:"image",state:"default",type:"rounded"}},f={args:{children:"landscape Type",variant:"image",state:"default",type:"landscape"}},h={args:{children:"portrait Type",variant:"image",state:"default",type:"portrait"}};var b,M,q;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    children: 'Media Content',
    variant: 'image',
    state: 'default'
  }
}`,...(q=(M=e.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var x,R,A;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    children: 'Media image',
    variant: 'image',
    state: 'default'
  }
}`,...(A=(R=a.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var D,N,V;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    children: 'Media video',
    variant: 'video',
    state: 'default'
  }
}`,...(V=(N=r.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var C,j,w;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'Media audio',
    variant: 'audio',
    state: 'default'
  }
}`,...(w=(j=t.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var E,L,_;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    children: 'Media thumbnail',
    variant: 'thumbnail',
    state: 'default'
  }
}`,...(_=(L=s.parameters)==null?void 0:L.docs)==null?void 0:_.source}}};var I,F,H;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    children: 'Media avatar',
    variant: 'avatar',
    state: 'default'
  }
}`,...(H=(F=n.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var P,$,k;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    children: 'default State',
    variant: 'image',
    state: 'default'
  }
}`,...(k=($=i.parameters)==null?void 0:$.docs)==null?void 0:k.source}}};var B,O,z;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    children: 'hover State',
    variant: 'image',
    state: 'hover'
  }
}`,...(z=(O=o.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};var G,J,K;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    children: 'active State',
    variant: 'image',
    state: 'active'
  }
}`,...(K=(J=d.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,W;c.parameters={...c.parameters,docs:{...(Q=c.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    children: 'disabled State',
    variant: 'image',
    state: 'disabled'
  }
}`,...(W=(U=c.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var X,Y,Z;l.parameters={...l.parameters,docs:{...(X=l.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    children: 'focused State',
    variant: 'image',
    state: 'focused'
  }
}`,...(Z=(Y=l.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,ae,re;u.parameters={...u.parameters,docs:{...(ee=u.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    children: 'loading State',
    variant: 'image',
    state: 'loading'
  }
}`,...(re=(ae=u.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var te,se,ne;m.parameters={...m.parameters,docs:{...(te=m.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    children: 'error State',
    variant: 'image',
    state: 'error'
  }
}`,...(ne=(se=m.parameters)==null?void 0:se.docs)==null?void 0:ne.source}}};var ie,oe,de;p.parameters={...p.parameters,docs:{...(ie=p.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    children: 'square Type',
    variant: 'image',
    state: 'default',
    type: 'square'
  }
}`,...(de=(oe=p.parameters)==null?void 0:oe.docs)==null?void 0:de.source}}};var ce,le,ue;g.parameters={...g.parameters,docs:{...(ce=g.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    children: 'circle Type',
    variant: 'image',
    state: 'default',
    type: 'circle'
  }
}`,...(ue=(le=g.parameters)==null?void 0:le.docs)==null?void 0:ue.source}}};var me,pe,ge;v.parameters={...v.parameters,docs:{...(me=v.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    children: 'rounded Type',
    variant: 'image',
    state: 'default',
    type: 'rounded'
  }
}`,...(ge=(pe=v.parameters)==null?void 0:pe.docs)==null?void 0:ge.source}}};var ve,fe,he;f.parameters={...f.parameters,docs:{...(ve=f.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    children: 'landscape Type',
    variant: 'image',
    state: 'default',
    type: 'landscape'
  }
}`,...(he=(fe=f.parameters)==null?void 0:fe.docs)==null?void 0:he.source}}};var Se,ye,Te;h.parameters={...h.parameters,docs:{...(Se=h.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    children: 'portrait Type',
    variant: 'image',
    state: 'default',
    type: 'portrait'
  }
}`,...(Te=(ye=h.parameters)==null?void 0:ye.docs)==null?void 0:Te.source}}};const Ve=["Default","Image","Video","Audio","Thumbnail","Avatar","StateDefault","StateHover","StateActive","StateDisabled","StateFocused","StateLoading","StateError","SquareType","CircleType","RoundedType","LandscapeType","PortraitType"];export{t as Audio,n as Avatar,g as CircleType,e as Default,a as Image,f as LandscapeType,h as PortraitType,v as RoundedType,p as SquareType,d as StateActive,i as StateDefault,c as StateDisabled,m as StateError,l as StateFocused,o as StateHover,u as StateLoading,s as Thumbnail,r as Video,Ve as __namedExportsOrder,Ne as default};
