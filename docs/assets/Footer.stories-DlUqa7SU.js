import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";var o=e((()=>{})),s,c,l,u,d=e((()=>{s=t(n(),1),i(),o(),c=r(),l=[{label:`Impressum`,href:`/impressum`},{label:`Datenschutz`,href:`/datenschutz`}],u=({copyright:e,links:t,linkComponent:n,children:r,className:i,...o})=>{let u=t??l,d=n??`a`,f=`eidotter-footer__link text-cga-amber no-underline`;return(0,c.jsxs)(`footer`,{className:a(`font-dos text-sm py-4 px-2 text-center`,`eidotter-footer`,i),...o,children:[(0,c.jsx)(`div`,{className:`h-px bg-dos-border-default mb-4`,role:`separator`}),r&&(0,c.jsx)(`div`,{className:`mb-3`,children:r}),u.length>0&&(0,c.jsx)(`nav`,{className:`flex justify-center items-center flex-wrap gap-2 mb-2`,"aria-label":`Footer links`,children:u.map((e,t)=>(0,c.jsxs)(s.Fragment,{children:[t>0&&(0,c.jsx)(`span`,{className:`text-dos-text-muted select-none eidotter-footer__dot`,"aria-hidden":`true`,children:`·`}),e.external?(0,c.jsx)(`a`,{className:f,href:e.href,target:`_blank`,rel:`noopener noreferrer`,children:e.label}):(0,c.jsx)(d,{className:f,href:e.href,children:e.label})]},e.href))}),e&&(0,c.jsxs)(`p`,{className:`text-dos-text-muted m-0`,children:[`© `,e]})]})},u.__docgenInfo={description:`DOS-themed footer with copyright and configurable legal/nav links.
Pure presentational — uses middle-dot separators for terminal aesthetic.`,methods:[],displayName:`Footer`,props:{copyright:{required:!1,tsType:{name:`string`},description:`Copyright text (e.g., "2026 Dominic Kennedy")`},links:{required:!1,tsType:{name:`Array`,elements:[{name:`FooterLink`}],raw:`FooterLink[]`},description:`Array of navigation/legal links`},linkComponent:{required:!1,tsType:{name:`ReactComponentType`,raw:`React.ComponentType<{
  href: string;
  className?: string;
  children: React.ReactNode;
}>`,elements:[{name:`signature`,type:`object`,raw:`{
  href: string;
  className?: string;
  children: React.ReactNode;
}`,signature:{properties:[{key:`href`,value:{name:`string`,required:!0}},{key:`className`,value:{name:`string`,required:!1}},{key:`children`,value:{name:`ReactReactNode`,raw:`React.ReactNode`,required:!0}}]}}]},description:"Custom link component for internal navigation (e.g. react-router's\n`<Link>`). Renders only non-external links (`external !== true`).\nAccepts `href`, `className`, and `children` — matches the shape used\nby `<Header>`, `<Nav>`, and `<Breadcrumb>`. When omitted, internal\nlinks render as plain `<a href>` (full page reload)."},children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Optional content between separator and links`},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name`}}}})),f,p,m,h,g,_,v,y;e((()=>{n(),d(),f=r(),p={title:`Components/Footer`,component:u,parameters:{layout:`fullscreen`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]}},tags:[`autodocs`]},m={args:{copyright:`2026 ACME Corp`}},h={args:{copyright:`2026 ACME Corp`,links:[...l,{label:`GitHub`,href:`https://github.com`,external:!0}]}},g={args:{copyright:`2026 ACME Corp`,children:(0,f.jsx)(`p`,{style:{color:`var(--color-cga-brown, #aa5500)`,margin:0},children:`Powered by eiDotter Design System`})}},_={args:{copyright:`2026 ACME Corp`,links:[{label:`Home`,href:`/`},{label:`Projects`,href:`/projects`},{label:`Contact`,href:`/contact`},{label:`Impressum`,href:`/impressum`}]}},v={render:()=>(0,f.jsx)(`div`,{style:{minHeight:`300px`,display:`flex`,flexDirection:`column`,justifyContent:`flex-end`},children:(0,f.jsx)(u,{copyright:`2026 ACME Corp`,links:[{label:`Impressum`,href:`/impressum`},{label:`Datenschutz`,href:`/datenschutz`},{label:`GitHub`,href:`https://github.com`,external:!0},{label:`npm`,href:`https://npmjs.com`,external:!0}]})})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    copyright: '2026 ACME Corp'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    copyright: '2026 ACME Corp',
    links: [...defaultLegalLinks, {
      label: 'GitHub',
      href: 'https://github.com',
      external: true
    }]
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    copyright: '2026 ACME Corp',
    children: <p style={{
      color: 'var(--color-cga-brown, #aa5500)',
      margin: 0
    }}>
        Powered by eiDotter Design System
      </p>
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y=[`Default`,`WithCustomLinks`,`WithExtraContent`,`CustomLinksOnly`,`FullSiteFooter`]}))();export{_ as CustomLinksOnly,m as Default,v as FullSiteFooter,h as WithCustomLinks,g as WithExtraContent,y as __namedExportsOrder,p as default};