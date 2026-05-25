import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";import{i as o,n as s,t as c}from"./Nav-Cq7F9y08.js";var l=e((()=>{o()})),u=e((()=>{l()})),d=e((()=>{})),f,p,m,h,g=e((()=>{f=t(n(),1),i(),u(),d(),p=r(),m={retro:`eidotter-header--retro`,modern:`eidotter-header--modern`},h=(0,f.forwardRef)(({brandName:e,brandHref:t=`/`,items:n,activeHref:r,variant:i=`retro`,sticky:o=!0,linkComponent:l,children:u,className:d,...f},h)=>{let g=l??`a`;return(0,p.jsxs)(`header`,{ref:h,className:a(`flex items-center justify-between px-4 py-3 font-dos`,`eidotter-header`,m[i],o&&`sticky top-0 z-50 bg-dos-bg-primary`,d),...f,children:[(0,p.jsx)(g,{href:t,className:a(`no-underline text-base font-bold tracking-wide`,`eidotter-header__branding`),children:u||e}),(0,p.jsx)(c,{items:n,activeHref:r,variant:i,linkComponent:l}),(0,p.jsx)(s,{items:n,activeHref:r,variant:i,linkComponent:l})]})}),h.displayName=`Header`,h.__docgenInfo={description:``,methods:[],displayName:`Header`,props:{brandName:{required:!1,tsType:{name:`string`},description:`Site brand name displayed in the header`},brandHref:{required:!1,tsType:{name:`string`},description:`Href for the brand link (default: "/")`,defaultValue:{value:`'/'`,computed:!1}},items:{required:!0,tsType:{name:`Array`,elements:[{name:`NavItem`}],raw:`NavItem[]`},description:`Navigation items passed through to Nav`},activeHref:{required:!1,tsType:{name:`string`},description:`Currently active href (highlights matching nav link)`},variant:{required:!1,tsType:{name:`union`,raw:`'retro' | 'modern'`,elements:[{name:`literal`,value:`'retro'`},{name:`literal`,value:`'modern'`}]},description:`Visual variant applied to both header and nav`,defaultValue:{value:`'retro'`,computed:!1}},sticky:{required:!1,tsType:{name:`boolean`},description:`Whether the header sticks to viewport top`,defaultValue:{value:`true`,computed:!1}},linkComponent:{required:!1,tsType:{name:`NavProps['linkComponent']`,raw:`NavProps['linkComponent']`},description:`Custom link component for framework routing (Next.js Link, React Router Link, etc.)`},children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Custom branding content — replaces brandName when provided`},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name`}}}}));function _(e){let t=(0,v.useRef)(null);return(0,v.useEffect)(()=>{(t.current?.querySelector(`.eidotter-nav__menu-trigger`))?.click()},[]),(0,y.jsx)(`div`,{ref:t,children:(0,y.jsx)(h,{...e})})}var v,y,b,x,S,C,w,T,E,D,O;e((()=>{v=t(n(),1),g(),y=r(),b=[{label:`projects`,href:`/projects`},{label:`tiny ideas`,href:`/blog`},{label:`contact`,href:`/contact`}],x={title:`Components/Header`,component:h,parameters:{layout:`fullscreen`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]}},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`retro`,`modern`]},sticky:{control:`boolean`},activeHref:{control:`text`},brandHref:{control:`text`}}},S={args:{brandName:`DMNC.TECH`,items:b,activeHref:`/projects`,variant:`retro`}},C={args:{brandName:`Dominic Kennedy`,items:b,activeHref:`/blog`,variant:`modern`},parameters:{backgrounds:{default:`light`,values:[{name:`light`,value:`#ffffff`}]}}},w={args:{items:[{label:`components`,href:`/components`},{label:`storybook`,href:`/storybook`},{label:`github`,href:`/github`}],activeHref:`/components`,variant:`retro`,children:(0,y.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,y.jsx)(`span`,{"aria-hidden":`true`,children:`🥚`}),(0,y.jsx)(`span`,{children:`eiDotter`})]})}},T={name:`Mobile – MENU trigger (closed)`,args:{brandName:`RIZOMORF`,items:[{label:`work`,href:`/work`},{label:`projects`,href:`/projects`},{label:`blog`,href:`/blog`},{label:`contact`,href:`/contact`}],activeHref:`/work`,variant:`retro`},parameters:{viewport:{defaultViewport:`phone375`},docs:{description:{story:`At mobile width the desktop nav is hidden and the MENU text trigger appears. Click MENU to open the flyout.`}}}},E={name:`Mobile – flyout panel (open)`,render:()=>(0,y.jsx)(_,{brandName:`RIZOMORF`,items:[{label:`work`,href:`/work`},{label:`projects`,href:`/projects`},{label:`blog`,href:`/blog`},{label:`contact`,href:`/contact`}],activeHref:`/work`,variant:`retro`}),parameters:{viewport:{defaultViewport:`phone375`},docs:{description:{story:`The right-side flyout panel with right-aligned uppercase nav items and pixel-art X close button. Backdrop, ✕ button, nav link clicks, and Escape all close the panel.`}}}},D={args:{brandName:`SITE.NAME`,items:b,activeHref:`/projects`,variant:`retro`,sticky:!0}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    brandName: 'DMNC.TECH',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    brandName: 'Dominic Kennedy',
    items: sampleItems,
    activeHref: '/blog',
    variant: 'modern'
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{
        name: 'light',
        value: '#ffffff'
      }]
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'components',
      href: '/components'
    }, {
      label: 'storybook',
      href: '/storybook'
    }, {
      label: 'github',
      href: '/github'
    }],
    activeHref: '/components',
    variant: 'retro',
    children: <span style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
        <span aria-hidden="true">&#x1F95A;</span>
        <span>eiDotter</span>
      </span>
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Mobile – MENU trigger (closed)',
  args: {
    brandName: 'RIZOMORF',
    items: [{
      label: 'work',
      href: '/work'
    }, {
      label: 'projects',
      href: '/projects'
    }, {
      label: 'blog',
      href: '/blog'
    }, {
      label: 'contact',
      href: '/contact'
    }],
    activeHref: '/work',
    variant: 'retro'
  },
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    docs: {
      description: {
        story: 'At mobile width the desktop nav is hidden and the MENU text trigger appears. Click MENU to open the flyout.'
      }
    }
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Mobile – flyout panel (open)',
  render: () => <HeaderWithPanelOpen brandName="RIZOMORF" items={[{
    label: 'work',
    href: '/work'
  }, {
    label: 'projects',
    href: '/projects'
  }, {
    label: 'blog',
    href: '/blog'
  }, {
    label: 'contact',
    href: '/contact'
  }]} activeHref="/work" variant="retro" />,
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    docs: {
      description: {
        story: 'The right-side flyout panel with right-aligned uppercase nav items and pixel-art X close button. ' + 'Backdrop, ✕ button, nav link clicks, and Escape all close the panel.'
      }
    }
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    brandName: 'SITE.NAME',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    sticky: true
  }
}`,...D.parameters?.docs?.source}}},O=[`RetroHeader`,`ModernHeader`,`CustomBranding`,`MobileHeader`,`MobileMenuOpen`,`FullHeader`]}))();export{w as CustomBranding,D as FullHeader,T as MobileHeader,E as MobileMenuOpen,C as ModernHeader,S as RetroHeader,O as __namedExportsOrder,x as default};