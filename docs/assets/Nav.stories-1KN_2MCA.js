import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as N}from"./iframe-DLEjTnR4.js";import{c as s}from"./cn-CvUv5FIJ.js";import"./preload-helper-Dp1pzeXC.js";const H={retro:"eidotter-nav--retro",modern:"eidotter-nav--modern"},d=({items:t,activeHref:p,variant:u="retro",linkComponent:v,className:f})=>{const a=v||"a";return e.jsx("nav",{className:s("eidotter-nav eidotter-nav--desktop",H[u],f),"aria-label":"Main navigation",children:e.jsx("ul",{className:"eidotter-nav__desktop-list",children:t.map(r=>e.jsx("li",{className:"eidotter-nav__desktop-item",children:e.jsx(a,{href:r.href,className:s("eidotter-nav__link",p===r.href&&"eidotter-nav__link--active"),children:r.label})},r.href))})})},h=({items:t,activeHref:p,variant:u="retro",linkComponent:v,className:f})=>{const[a,r]=N.useState(!1),M=v||"a",D=N.useCallback(()=>r(n=>!n),[]),g=N.useCallback(()=>r(!1),[]);return e.jsxs("div",{className:s("eidotter-nav eidotter-nav--mobile",H[u],f),children:[e.jsx("button",{onClick:D,className:"eidotter-nav__hamburger","aria-label":a?"Close menu":"Open menu","aria-expanded":a,children:e.jsx("span",{className:"eidotter-nav__hamburger-icon","aria-hidden":"true",children:a?"✕":"☰"})}),a&&e.jsx("div",{className:"eidotter-nav__overlay",onClick:g,"aria-hidden":"true"}),e.jsxs("nav",{className:s("eidotter-nav__panel",a&&"eidotter-nav__panel--open"),"aria-label":"Mobile navigation",children:[e.jsx("div",{className:"eidotter-nav__panel-header",children:e.jsx("button",{onClick:g,className:"eidotter-nav__close","aria-label":"Close menu",children:"✕"})}),e.jsx("ul",{className:"eidotter-nav__list",children:t.map(n=>e.jsx("li",{className:"eidotter-nav__item",children:e.jsx(M,{href:n.href,className:s("eidotter-nav__link",p===n.href&&"eidotter-nav__link--active"),onClick:g,children:n.label})},n.href))})]})]})},S=t=>e.jsxs(e.Fragment,{children:[e.jsx(h,{...t}),e.jsx(d,{...t})]});d.__docgenInfo={description:"",methods:[],displayName:"DesktopNav",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NavItem"}],raw:"NavItem[]"},description:"Navigation items"},activeHref:{required:!1,tsType:{name:"string"},description:"Currently active href (consumer passes current route)"},variant:{required:!1,tsType:{name:"union",raw:"'retro' | 'modern'",elements:[{name:"literal",value:"'retro'"},{name:"literal",value:"'modern'"}]},description:"Visual variant",defaultValue:{value:"'retro'",computed:!1}},linkComponent:{required:!1,tsType:{name:"ReactComponentType",raw:`React.ComponentType<{
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}>`,elements:[{name:"signature",type:"object",raw:`{
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}`,signature:{properties:[{key:"href",value:{name:"string",required:!0}},{key:"className",value:{name:"string",required:!1}},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}}]},description:`Custom link component (e.g., Next.js Link).
If not provided, uses regular anchor tags.`},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name"}}};h.__docgenInfo={description:"",methods:[],displayName:"MobileNav",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NavItem"}],raw:"NavItem[]"},description:"Navigation items"},activeHref:{required:!1,tsType:{name:"string"},description:"Currently active href (consumer passes current route)"},variant:{required:!1,tsType:{name:"union",raw:"'retro' | 'modern'",elements:[{name:"literal",value:"'retro'"},{name:"literal",value:"'modern'"}]},description:"Visual variant",defaultValue:{value:"'retro'",computed:!1}},linkComponent:{required:!1,tsType:{name:"ReactComponentType",raw:`React.ComponentType<{
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}>`,elements:[{name:"signature",type:"object",raw:`{
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}`,signature:{properties:[{key:"href",value:{name:"string",required:!0}},{key:"className",value:{name:"string",required:!1}},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}}]},description:`Custom link component (e.g., Next.js Link).
If not provided, uses regular anchor tags.`},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name"}}};S.__docgenInfo={description:"",methods:[],displayName:"Nav",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NavItem"}],raw:"NavItem[]"},description:"Navigation items"},activeHref:{required:!1,tsType:{name:"string"},description:"Currently active href (consumer passes current route)"},variant:{required:!1,tsType:{name:"union",raw:"'retro' | 'modern'",elements:[{name:"literal",value:"'retro'"},{name:"literal",value:"'modern'"}]},description:"Visual variant"},linkComponent:{required:!1,tsType:{name:"ReactComponentType",raw:`React.ComponentType<{
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}>`,elements:[{name:"signature",type:"object",raw:`{
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}`,signature:{properties:[{key:"href",value:{name:"string",required:!0}},{key:"className",value:{name:"string",required:!1}},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}}]},description:`Custom link component (e.g., Next.js Link).
If not provided, uses regular anchor tags.`},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name"}}};const m=[{label:"projects",href:"/projects"},{label:"tiny ideas",href:"/blog"},{label:"contact",href:"/contact"}],E={title:"Components/Nav",component:S,parameters:{layout:"fullscreen",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["retro","modern"]},activeHref:{control:"text"}}},i={render:()=>e.jsx("div",{style:{padding:"16px"},children:e.jsx(d,{items:m,activeHref:"/projects",variant:"retro"})})},o={render:()=>e.jsx("div",{style:{padding:"16px",backgroundColor:"#fff"},children:e.jsx(d,{items:m,activeHref:"/blog",variant:"modern"})}),parameters:{backgrounds:{default:"light",values:[{name:"light",value:"#ffffff"}]}}},l={render:()=>e.jsx("div",{style:{padding:"16px"},children:e.jsx(h,{items:m,activeHref:"/projects",variant:"retro"})}),parameters:{viewport:{defaultViewport:"mobile1"}}},c={args:{items:m,activeHref:"/projects",variant:"retro"}};var k,y,j;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '16px'
  }}>
      <DesktopNav items={sampleItems} activeHref="/projects" variant="retro" />
    </div>
}`,...(j=(y=i.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var x,C,_;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '16px',
    backgroundColor: '#fff'
  }}>
      <DesktopNav items={sampleItems} activeHref="/blog" variant="modern" />
    </div>,
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{
        name: 'light',
        value: '#ffffff'
      }]
    }
  }
}`,...(_=(C=o.parameters)==null?void 0:C.docs)==null?void 0:_.source}}};var b,R,q;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '16px'
  }}>
      <MobileNav items={sampleItems} activeHref="/projects" variant="retro" />
    </div>,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(q=(R=l.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};var T,w,I;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro'
  }
}`,...(I=(w=c.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};const F=["RetroDesktop","ModernDesktop","RetroMobile","FullNav"];export{c as FullNav,o as ModernDesktop,i as RetroDesktop,l as RetroMobile,F as __namedExportsOrder,E as default};
