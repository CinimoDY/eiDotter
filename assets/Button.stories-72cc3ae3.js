import{j as o}from"./jsx-runtime-50395f49.js";import{R as U}from"./index-9fa1aa67.js";const l=U.forwardRef(({variant:N="brand",size:q="L",subtle:x=!1,iconLeft:i=!1,iconRight:c=!1,className:j="",children:E,...I},V)=>{const O=["dos-button",`dos-button--${N}`,`dos-button--${q}`,x&&"dos-button--subtle",i&&"dos-button--with-icon dos-button--with-icon-left",c&&"dos-button--with-icon dos-button--with-icon-right",j].filter(Boolean).join(" ");return o.jsxs("button",{ref:V,className:O,...I,children:[i&&o.jsx("span",{className:"dos-button__icon",children:"⟳"}),E,c&&o.jsx("span",{className:"dos-button__icon",children:"→"})]})});l.displayName="Button";l.__docgenInfo={description:"",methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"union",raw:"'brand' | 'gray' | 'danger'",elements:[{name:"literal",value:"'brand'"},{name:"literal",value:"'gray'"},{name:"literal",value:"'danger'"}]},description:"Button variant",defaultValue:{value:"'brand'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'L' | 'S'",elements:[{name:"literal",value:"'L'"},{name:"literal",value:"'S'"}]},description:"Button size",defaultValue:{value:"'L'",computed:!1}},subtle:{required:!1,tsType:{name:"boolean"},description:"Use subtle variant",defaultValue:{value:"false",computed:!1}},iconLeft:{required:!1,tsType:{name:"boolean"},description:"Show icon on the left",defaultValue:{value:"false",computed:!1}},iconRight:{required:!1,tsType:{name:"boolean"},description:"Show icon on the right",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional custom class name",defaultValue:{value:"''",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Button contents"}}};const G={title:"Components/Button",component:l,tags:["autodocs"],parameters:{design:{type:"figma",url:"YOUR_FIGMA_FILE_URL_HERE#node-id=YOUR_BUTTON_FRAME_ID"}},argTypes:{size:{control:"select",options:["L","S"]},variant:{control:"select",options:["brand","gray","danger"]},subtle:{control:"boolean"},iconLeft:{control:"boolean"},iconRight:{control:"boolean"},disabled:{control:"boolean"}}},e={args:{variant:"brand",size:"L",children:"Button Label"}},a={args:{variant:"gray",size:"L",children:"Button Label"}},n={args:{variant:"danger",size:"L",children:"Button Label"}},t={args:{variant:"brand",size:"S",children:"Button Label"}},r={args:{variant:"brand",size:"L",subtle:!0,children:"Button Label"}},s={args:{variant:"brand",size:"L",iconLeft:!0,children:"Button Label"}};var d,u,m;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    variant: 'brand',
    size: 'L',
    children: 'Button Label'
  }
}`,...(m=(u=e.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var p,b,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    variant: 'gray',
    size: 'L',
    children: 'Button Label'
  }
}`,...(g=(b=a.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var f,L,h;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    size: 'L',
    children: 'Button Label'
  }
}`,...(h=(L=n.parameters)==null?void 0:L.docs)==null?void 0:h.source}}};var v,B,y;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: 'brand',
    size: 'S',
    children: 'Button Label'
  }
}`,...(y=(B=t.parameters)==null?void 0:B.docs)==null?void 0:y.source}}};var S,z,_;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: 'brand',
    size: 'L',
    subtle: true,
    children: 'Button Label'
  }
}`,...(_=(z=r.parameters)==null?void 0:z.docs)==null?void 0:_.source}}};var R,w,T;s.parameters={...s.parameters,docs:{...(R=s.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    variant: 'brand',
    size: 'L',
    iconLeft: true,
    children: 'Button Label'
  }
}`,...(T=(w=s.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};const $=["Brand","Gray","Danger","Small","Subtle","WithIcon"];export{e as Brand,n as Danger,a as Gray,t as Small,r as Subtle,s as WithIcon,$ as __namedExportsOrder,G as default};
