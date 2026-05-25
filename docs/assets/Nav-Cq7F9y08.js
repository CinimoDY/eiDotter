import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";import{n as o,t as s}from"./Icon-CtcS3o9J.js";var c=e((()=>{o()})),l=e((()=>{c()})),u=e((()=>{})),d,f,p,m,h,g,_=e((()=>{d=t(n(),1),i(),l(),u(),f=r(),p={retro:`eidotter-nav--retro`,modern:`eidotter-nav--modern`},m=({items:e,activeHref:t,variant:n=`retro`,linkComponent:r,className:i})=>{let o=r||`a`;return(0,f.jsx)(`nav`,{className:a(`eidotter-nav eidotter-nav--desktop`,p[n],i),"aria-label":`Main navigation`,children:(0,f.jsx)(`ul`,{className:`eidotter-nav__desktop-list`,children:e.map(e=>(0,f.jsx)(`li`,{className:`eidotter-nav__desktop-item`,children:(0,f.jsx)(o,{href:e.href,className:a(`eidotter-nav__link`,t===e.href&&`eidotter-nav__link--active`),children:e.label})},e.href))})})},h=({items:e,activeHref:t,variant:n=`retro`,linkComponent:r,className:i})=>{let[o,c]=(0,d.useState)(!1),l=r||`a`,u=(0,d.useCallback)(()=>c(e=>!e),[]),m=(0,d.useCallback)(()=>c(!1),[]);return(0,d.useEffect)(()=>{if(!o)return;let e=e=>{e.key===`Escape`&&m()};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[o,m]),(0,f.jsxs)(`div`,{className:a(`eidotter-nav eidotter-nav--mobile`,p[n],i),children:[(0,f.jsx)(`button`,{onClick:u,className:`eidotter-nav__menu-trigger`,"aria-label":o?`Close menu`:`Open menu`,"aria-expanded":o,"aria-controls":`eidotter-mobile-nav-panel`,children:`MENU`}),o&&(0,f.jsx)(`div`,{className:`eidotter-nav__overlay`,onClick:m,"aria-hidden":`true`}),(0,f.jsxs)(`nav`,{id:`eidotter-mobile-nav-panel`,className:a(`eidotter-nav__panel`,o&&`eidotter-nav__panel--open`),"aria-label":`Mobile navigation`,children:[(0,f.jsx)(`div`,{className:`eidotter-nav__panel-header`,children:(0,f.jsx)(`button`,{onClick:m,className:`eidotter-nav__close`,"aria-label":`Close menu`,children:(0,f.jsx)(s,{name:`Close`,size:`S`})})}),(0,f.jsx)(`ul`,{className:`eidotter-nav__list`,children:e.map(e=>(0,f.jsx)(`li`,{className:`eidotter-nav__item`,children:(0,f.jsx)(l,{href:e.href,className:a(`eidotter-nav__link`,t===e.href&&`eidotter-nav__link--active`),onClick:m,children:e.label})},e.href))})]})]})},g=e=>(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(h,{...e}),(0,f.jsx)(m,{...e})]}),m.__docgenInfo={description:``,methods:[],displayName:`DesktopNav`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`NavItem`}],raw:`NavItem[]`},description:`Navigation items`},activeHref:{required:!1,tsType:{name:`string`},description:`Currently active href (consumer passes current route)`},variant:{required:!1,tsType:{name:`union`,raw:`'retro' | 'modern'`,elements:[{name:`literal`,value:`'retro'`},{name:`literal`,value:`'modern'`}]},description:`Visual variant`,defaultValue:{value:`'retro'`,computed:!1}},linkComponent:{required:!1,tsType:{name:`ReactComponentType`,raw:`React.ComponentType<{\r
  href: string;\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
}>`,elements:[{name:`signature`,type:`object`,raw:`{\r
  href: string;\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
}`,signature:{properties:[{key:`href`,value:{name:`string`,required:!0}},{key:`className`,value:{name:`string`,required:!1}},{key:`children`,value:{name:`ReactReactNode`,raw:`React.ReactNode`,required:!0}},{key:`onClick`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!1}}]}}]},description:`Custom link component (e.g., Next.js Link).\r
If not provided, uses regular anchor tags.`},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name`}}},h.__docgenInfo={description:``,methods:[],displayName:`MobileNav`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`NavItem`}],raw:`NavItem[]`},description:`Navigation items`},activeHref:{required:!1,tsType:{name:`string`},description:`Currently active href (consumer passes current route)`},variant:{required:!1,tsType:{name:`union`,raw:`'retro' | 'modern'`,elements:[{name:`literal`,value:`'retro'`},{name:`literal`,value:`'modern'`}]},description:`Visual variant`,defaultValue:{value:`'retro'`,computed:!1}},linkComponent:{required:!1,tsType:{name:`ReactComponentType`,raw:`React.ComponentType<{\r
  href: string;\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
}>`,elements:[{name:`signature`,type:`object`,raw:`{\r
  href: string;\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
}`,signature:{properties:[{key:`href`,value:{name:`string`,required:!0}},{key:`className`,value:{name:`string`,required:!1}},{key:`children`,value:{name:`ReactReactNode`,raw:`React.ReactNode`,required:!0}},{key:`onClick`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!1}}]}}]},description:`Custom link component (e.g., Next.js Link).\r
If not provided, uses regular anchor tags.`},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name`}}},g.__docgenInfo={description:``,methods:[],displayName:`Nav`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`NavItem`}],raw:`NavItem[]`},description:`Navigation items`},activeHref:{required:!1,tsType:{name:`string`},description:`Currently active href (consumer passes current route)`},variant:{required:!1,tsType:{name:`union`,raw:`'retro' | 'modern'`,elements:[{name:`literal`,value:`'retro'`},{name:`literal`,value:`'modern'`}]},description:`Visual variant`},linkComponent:{required:!1,tsType:{name:`ReactComponentType`,raw:`React.ComponentType<{\r
  href: string;\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
}>`,elements:[{name:`signature`,type:`object`,raw:`{\r
  href: string;\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
}`,signature:{properties:[{key:`href`,value:{name:`string`,required:!0}},{key:`className`,value:{name:`string`,required:!1}},{key:`children`,value:{name:`ReactReactNode`,raw:`React.ReactNode`,required:!0}},{key:`onClick`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!1}}]}}]},description:`Custom link component (e.g., Next.js Link).\r
If not provided, uses regular anchor tags.`},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name`}}}}));export{_ as i,h as n,g as r,m as t};