import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{R as w}from"./iframe-CMgb2h7h.js";/* empty css                  */import"./preload-helper-Dp1pzeXC.js";const E=[{label:"Impressum",href:"/impressum"},{label:"Datenschutz",href:"/datenschutz"}],l=({copyright:i,links:A,children:c,className:F="",...S})=>{const p=A??E,L=["footer",F].filter(Boolean).join(" ");return e.jsxs("footer",{className:L,...S,children:[e.jsx("div",{className:"footer__separator",role:"separator"}),c&&e.jsx("div",{className:"footer__content",children:c}),p.length>0&&e.jsx("nav",{className:"footer__links","aria-label":"Footer links",children:p.map((r,N)=>e.jsxs(w.Fragment,{children:[N>0&&e.jsx("span",{className:"footer__dot","aria-hidden":"true",children:"·"}),e.jsx("a",{className:"footer__link",href:r.href,...r.external?{target:"_blank",rel:"noopener noreferrer"}:{},children:r.label})]},r.href))}),i&&e.jsxs("p",{className:"footer__copyright",children:["© ",i]})]})};l.__docgenInfo={description:`DOS-themed footer with copyright and configurable legal/nav links.
Uses middle-dot separators between links for authentic terminal aesthetic.

When no \`links\` are provided, renders default legal links (Impressum + Datenschutz)
for German compliance. Pass an empty array to explicitly show no links.`,methods:[],displayName:"Footer",props:{copyright:{required:!1,tsType:{name:"string"},description:'Copyright text (e.g., "2026 Dominic Kennedy")'},links:{required:!1,tsType:{name:"Array",elements:[{name:"FooterLink"}],raw:"FooterLink[]"},description:"Array of navigation/legal links"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Optional content between separator and links"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name",defaultValue:{value:"''",computed:!1}}}};const R={title:"Components/Footer",component:l,parameters:{layout:"fullscreen",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"]},t={args:{copyright:"2026 ACME Corp"}},s={args:{copyright:"2026 ACME Corp",links:[...E,{label:"GitHub",href:"https://github.com",external:!0}]}},a={args:{copyright:"2026 ACME Corp",children:e.jsx("p",{style:{color:"var(--color-cga-brown, #aa5500)",margin:0},children:"Powered by eiDotter Design System"})}},o={args:{copyright:"2026 ACME Corp",links:[{label:"Home",href:"/"},{label:"Projects",href:"/projects"},{label:"Contact",href:"/contact"},{label:"Impressum",href:"/impressum"}]}},n={render:()=>e.jsx("div",{style:{minHeight:"300px",display:"flex",flexDirection:"column",justifyContent:"flex-end"},children:e.jsx(l,{copyright:"2026 ACME Corp",links:[{label:"Impressum",href:"/impressum"},{label:"Datenschutz",href:"/datenschutz"},{label:"GitHub",href:"https://github.com",external:!0},{label:"npm",href:"https://npmjs.com",external:!0}]})})};var m,d,u;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var b,y,x;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    copyright: '2026 ACME Corp',
    children: <p style={{
      color: 'var(--color-cga-brown, #aa5500)',
      margin: 0
    }}>
        Powered by eiDotter Design System
      </p>
  }
}`,...(x=(y=a.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var C,k,j;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(j=(k=o.parameters)==null?void 0:k.docs)==null?void 0:j.source}}};var _,v,D;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(D=(v=n.parameters)==null?void 0:v.docs)==null?void 0:D.source}}};const G=["Default","WithCustomLinks","WithExtraContent","CustomLinksOnly","FullSiteFooter"];export{o as CustomLinksOnly,t as Default,n as FullSiteFooter,s as WithCustomLinks,a as WithExtraContent,G as __namedExportsOrder,R as default};
