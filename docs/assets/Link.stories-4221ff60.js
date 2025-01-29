import{j as e}from"./jsx-runtime-50395f49.js";import"./index-9fa1aa67.js";const H=()=>e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M0 0V12H12V6H11V11H1V1H6V0H0ZM7 0V1H10.2929L5.14645 6.14645L5.85355 6.85355L11 1.70711V5H12V0H7Z",fill:"currentColor"})});H.__docgenInfo={description:"",methods:[],displayName:"OpenInNewIcon"};const _=({children:E,className:j,href:M,openInNew:s=!0,disabled:i=!1,onClick:o})=>{const S=l=>{if(i){l.preventDefault();return}o==null||o(l)};return e.jsxs("a",{className:`link link--s ${j||""}`,href:M,target:s?"_blank":void 0,rel:s?"noopener noreferrer":void 0,onClick:S,"aria-disabled":i,children:[e.jsx("span",{className:"link__label",children:E}),s&&e.jsx("span",{className:"link__icon",children:e.jsx(H,{})})]})};_.__docgenInfo={description:"",methods:[],displayName:"Link",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"The text to display in the link"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name"},href:{required:!0,tsType:{name:"string"},description:"The URL the link points to"},openInNew:{required:!1,tsType:{name:"boolean"},description:"Whether the link should open in a new tab",defaultValue:{value:"true",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the link is disabled",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent<HTMLAnchorElement>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLAnchorElement>",elements:[{name:"HTMLAnchorElement"}]},name:"event"}],return:{name:"void"}}},description:"Optional click handler"}}};const O={title:"Components/Link",component:_,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},docs:{description:{component:"A DOS-style link component that provides visual feedback for different states and supports opening in new tabs."}}},tags:["autodocs"],argTypes:{children:{control:"text",description:"The text content of the link",table:{type:{summary:"ReactNode"}}},openInNew:{control:"boolean",description:"Whether the link opens in a new tab",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}}},href:{control:"text",description:"The URL the link points to",table:{type:{summary:"string"}}},disabled:{control:"boolean",description:"Whether the link is disabled",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}}}},n={args:{children:"Link Label",href:"https://example.com",openInNew:!0}},t={args:{children:"Link Label",href:"https://example.com",openInNew:!1}},a={args:{children:"This is a very long link label that should wrap",href:"https://example.com",openInNew:!0}},r={args:{children:"Link Label",href:"https://example.com",openInNew:!0,disabled:!0}};var c,p,d,m,h;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    children: 'Link Label',
    href: 'https://example.com',
    openInNew: true
  }
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source},description:{story:"The default state of the Link component with an icon indicating it opens in a new tab.",...(h=(m=n.parameters)==null?void 0:m.docs)==null?void 0:h.description}}};var u,f,g,b,k;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    children: 'Link Label',
    href: 'https://example.com',
    openInNew: false
  }
}`,...(g=(f=t.parameters)==null?void 0:f.docs)==null?void 0:g.source},description:{story:'Link without the "open in new" icon, for internal navigation.',...(k=(b=t.parameters)==null?void 0:b.docs)==null?void 0:k.description}}};var w,y,x,L,v;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: 'This is a very long link label that should wrap',
    href: 'https://example.com',
    openInNew: true
  }
}`,...(x=(y=a.parameters)==null?void 0:y.docs)==null?void 0:x.source},description:{story:"Example of how the link handles longer text content.",...(v=(L=a.parameters)==null?void 0:L.docs)==null?void 0:v.description}}};var T,N,I,R,V;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    children: 'Link Label',
    href: 'https://example.com',
    openInNew: true,
    disabled: true
  }
}`,...(I=(N=r.parameters)==null?void 0:N.docs)==null?void 0:I.source},description:{story:"The disabled state of the link, which prevents interaction and shows a muted appearance.",...(V=(R=r.parameters)==null?void 0:R.docs)==null?void 0:V.description}}};const W=["Default","WithoutIcon","LongText","Disabled"];export{n as Default,r as Disabled,a as LongText,t as WithoutIcon,W as __namedExportsOrder,O as default};
