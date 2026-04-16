import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as o}from"./iframe-DuFfgGUU.js";import{c as s}from"./cn-CvUv5FIJ.js";import{I as y}from"./Icon-BUHYQ9Cx.js";const u={retro:"eidotter-nav--retro",modern:"eidotter-nav--modern"},p=({items:t,activeHref:l,variant:c="retro",linkComponent:d,className:m})=>{const a=d||"a";return e.jsx("nav",{className:s("eidotter-nav eidotter-nav--desktop",u[c],m),"aria-label":"Main navigation",children:e.jsx("ul",{className:"eidotter-nav__desktop-list",children:t.map(n=>e.jsx("li",{className:"eidotter-nav__desktop-item",children:e.jsx(a,{href:n.href,className:s("eidotter-nav__link",l===n.href&&"eidotter-nav__link--active"),children:n.label})},n.href))})})},v=({items:t,activeHref:l,variant:c="retro",linkComponent:d,className:m})=>{const[a,n]=o.useState(!1),f=d||"a",g=o.useCallback(()=>n(r=>!r),[]),i=o.useCallback(()=>n(!1),[]);return o.useEffect(()=>{if(!a)return;const r=N=>{N.key==="Escape"&&i()};return document.addEventListener("keydown",r),()=>document.removeEventListener("keydown",r)},[a,i]),e.jsxs("div",{className:s("eidotter-nav eidotter-nav--mobile",u[c],m),children:[e.jsx("button",{onClick:g,className:"eidotter-nav__menu-trigger","aria-label":a?"Close menu":"Open menu","aria-expanded":a,"aria-controls":"eidotter-mobile-nav-panel",children:"MENU"}),a&&e.jsx("div",{className:"eidotter-nav__overlay",onClick:i,"aria-hidden":"true"}),e.jsxs("nav",{id:"eidotter-mobile-nav-panel",className:s("eidotter-nav__panel",a&&"eidotter-nav__panel--open"),"aria-label":"Mobile navigation",children:[e.jsx("div",{className:"eidotter-nav__panel-header",children:e.jsx("button",{onClick:i,className:"eidotter-nav__close","aria-label":"Close menu",children:e.jsx(y,{name:"Close",size:"S"})})}),e.jsx("ul",{className:"eidotter-nav__list",children:t.map(r=>e.jsx("li",{className:"eidotter-nav__item",children:e.jsx(f,{href:r.href,className:s("eidotter-nav__link",l===r.href&&"eidotter-nav__link--active"),onClick:i,children:r.label})},r.href))})]})]})},h=t=>e.jsxs(e.Fragment,{children:[e.jsx(v,{...t}),e.jsx(p,{...t})]});p.__docgenInfo={description:"",methods:[],displayName:"DesktopNav",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NavItem"}],raw:"NavItem[]"},description:"Navigation items"},activeHref:{required:!1,tsType:{name:"string"},description:"Currently active href (consumer passes current route)"},variant:{required:!1,tsType:{name:"union",raw:"'retro' | 'modern'",elements:[{name:"literal",value:"'retro'"},{name:"literal",value:"'modern'"}]},description:"Visual variant",defaultValue:{value:"'retro'",computed:!1}},linkComponent:{required:!1,tsType:{name:"ReactComponentType",raw:`React.ComponentType<{\r
  href: string;\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
}>`,elements:[{name:"signature",type:"object",raw:`{\r
  href: string;\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
}`,signature:{properties:[{key:"href",value:{name:"string",required:!0}},{key:"className",value:{name:"string",required:!1}},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}}]},description:`Custom link component (e.g., Next.js Link).\r
If not provided, uses regular anchor tags.`},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name"}}};v.__docgenInfo={description:"",methods:[],displayName:"MobileNav",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NavItem"}],raw:"NavItem[]"},description:"Navigation items"},activeHref:{required:!1,tsType:{name:"string"},description:"Currently active href (consumer passes current route)"},variant:{required:!1,tsType:{name:"union",raw:"'retro' | 'modern'",elements:[{name:"literal",value:"'retro'"},{name:"literal",value:"'modern'"}]},description:"Visual variant",defaultValue:{value:"'retro'",computed:!1}},linkComponent:{required:!1,tsType:{name:"ReactComponentType",raw:`React.ComponentType<{\r
  href: string;\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
}>`,elements:[{name:"signature",type:"object",raw:`{\r
  href: string;\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
}`,signature:{properties:[{key:"href",value:{name:"string",required:!0}},{key:"className",value:{name:"string",required:!1}},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}}]},description:`Custom link component (e.g., Next.js Link).\r
If not provided, uses regular anchor tags.`},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name"}}};h.__docgenInfo={description:"",methods:[],displayName:"Nav",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"NavItem"}],raw:"NavItem[]"},description:"Navigation items"},activeHref:{required:!1,tsType:{name:"string"},description:"Currently active href (consumer passes current route)"},variant:{required:!1,tsType:{name:"union",raw:"'retro' | 'modern'",elements:[{name:"literal",value:"'retro'"},{name:"literal",value:"'modern'"}]},description:"Visual variant"},linkComponent:{required:!1,tsType:{name:"ReactComponentType",raw:`React.ComponentType<{\r
  href: string;\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
}>`,elements:[{name:"signature",type:"object",raw:`{\r
  href: string;\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
}`,signature:{properties:[{key:"href",value:{name:"string",required:!0}},{key:"className",value:{name:"string",required:!1}},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}}]},description:`Custom link component (e.g., Next.js Link).\r
If not provided, uses regular anchor tags.`},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name"}}};export{p as D,v as M,h as N};
