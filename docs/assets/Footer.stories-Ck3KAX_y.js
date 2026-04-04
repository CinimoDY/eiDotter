import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{R as N}from"./iframe-CXx0QtOw.js";import{c as M}from"./cn-CvUv5FIJ.js";import"./preload-helper-Dp1pzeXC.js";const D=[{label:"Impressum",href:"/impressum"},{label:"Datenschutz",href:"/datenschutz"}],l=({copyright:i,links:F,children:c,className:S,...w})=>{const m=F??D;return e.jsxs("footer",{className:M("font-dos text-sm py-4 px-2 text-center","eidotter-footer",S),...w,children:[e.jsx("div",{className:"h-px bg-dos-border-default mb-4",role:"separator"}),c&&e.jsx("div",{className:"mb-3",children:c}),m.length>0&&e.jsx("nav",{className:"flex justify-center items-center flex-wrap gap-2 mb-2","aria-label":"Footer links",children:m.map((r,L)=>e.jsxs(N.Fragment,{children:[L>0&&e.jsx("span",{className:"text-cga-brown select-none eidotter-footer__dot","aria-hidden":"true",children:"·"}),e.jsx("a",{className:"eidotter-footer__link text-cga-amber no-underline",href:r.href,...r.external?{target:"_blank",rel:"noopener noreferrer"}:{},children:r.label})]},r.href))}),i&&e.jsxs("p",{className:"text-cga-brown m-0",children:["© ",i]})]})};l.__docgenInfo={description:`DOS-themed footer with copyright and configurable legal/nav links.
Pure presentational — uses middle-dot separators for terminal aesthetic.`,methods:[],displayName:"Footer",props:{copyright:{required:!1,tsType:{name:"string"},description:'Copyright text (e.g., "2026 Dominic Kennedy")'},links:{required:!1,tsType:{name:"Array",elements:[{name:"FooterLink"}],raw:"FooterLink[]"},description:"Array of navigation/legal links"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Optional content between separator and links"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name"}}};const I={title:"Components/Footer",component:l,parameters:{layout:"fullscreen",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"]},t={args:{copyright:"2026 ACME Corp"}},s={args:{copyright:"2026 ACME Corp",links:[...D,{label:"GitHub",href:"https://github.com",external:!0}]}},a={args:{copyright:"2026 ACME Corp",children:e.jsx("p",{style:{color:"var(--color-cga-brown, #aa5500)",margin:0},children:"Powered by eiDotter Design System"})}},o={args:{copyright:"2026 ACME Corp",links:[{label:"Home",href:"/"},{label:"Projects",href:"/projects"},{label:"Contact",href:"/contact"},{label:"Impressum",href:"/impressum"}]}},n={render:()=>e.jsx("div",{style:{minHeight:"300px",display:"flex",flexDirection:"column",justifyContent:"flex-end"},children:e.jsx(l,{copyright:"2026 ACME Corp",links:[{label:"Impressum",href:"/impressum"},{label:"Datenschutz",href:"/datenschutz"},{label:"GitHub",href:"https://github.com",external:!0},{label:"npm",href:"https://npmjs.com",external:!0}]})})};var p,d,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    copyright: '2026 ACME Corp'
  }
}`,...(u=(d=t.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var h,f,g;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    copyright: '2026 ACME Corp',
    links: [...defaultLegalLinks, {
      label: 'GitHub',
      href: 'https://github.com',
      external: true
    }]
  }
}`,...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var b,x,y;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    copyright: '2026 ACME Corp',
    children: <p style={{
      color: 'var(--color-cga-brown, #aa5500)',
      margin: 0
    }}>
        Powered by eiDotter Design System
      </p>
  }
}`,...(y=(x=a.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var C,j,k;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    copyright: '2026 ACME Corp',
    links: [{
      label: 'Home',
      href: '/'
    }, {
      label: 'Projects',
      href: '/projects'
    }, {
      label: 'Contact',
      href: '/contact'
    }, {
      label: 'Impressum',
      href: '/impressum'
    }]
  }
}`,...(k=(j=o.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var E,v,A;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div style={{
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }}>
      <Footer copyright="2026 ACME Corp" links={[{
      label: 'Impressum',
      href: '/impressum'
    }, {
      label: 'Datenschutz',
      href: '/datenschutz'
    }, {
      label: 'GitHub',
      href: 'https://github.com',
      external: true
    }, {
      label: 'npm',
      href: 'https://npmjs.com',
      external: true
    }]} />
    </div>
}`,...(A=(v=n.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};const O=["Default","WithCustomLinks","WithExtraContent","CustomLinksOnly","FullSiteFooter"];export{o as CustomLinksOnly,t as Default,n as FullSiteFooter,s as WithCustomLinks,a as WithExtraContent,O as __namedExportsOrder,I as default};
