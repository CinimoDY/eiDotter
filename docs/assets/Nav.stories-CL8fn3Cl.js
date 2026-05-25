import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{i,n as a,r as o,t as s}from"./Nav-Cq7F9y08.js";function c(e){let t=(0,l.useRef)(null);return(0,l.useEffect)(()=>{(t.current?.querySelector(`.eidotter-nav__menu-trigger`))?.click()},[]),(0,u.jsx)(`div`,{ref:t,children:(0,u.jsx)(a,{...e})})}var l,u,d,f,p,m,h,g,_,v,y,b;e((()=>{l=t(n(),1),i(),u=r(),d=[{label:`projects`,href:`/projects`},{label:`tiny ideas`,href:`/blog`},{label:`contact`,href:`/contact`}],f=[{label:`work`,href:`/work`},{label:`projects`,href:`/projects`},{label:`blog`,href:`/blog`},{label:`contact`,href:`/contact`}],p={title:`Components/Nav`,component:o,parameters:{layout:`fullscreen`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]}},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`retro`,`modern`]},activeHref:{control:`text`}}},m={name:`Desktop – Retro`,render:()=>(0,u.jsx)(`div`,{style:{padding:`16px`},children:(0,u.jsx)(s,{items:d,activeHref:`/projects`,variant:`retro`})})},h={name:`Desktop – Modern`,render:()=>(0,u.jsx)(`div`,{style:{padding:`16px`,backgroundColor:`#fff`},children:(0,u.jsx)(s,{items:d,activeHref:`/blog`,variant:`modern`})}),parameters:{backgrounds:{default:`light`,values:[{name:`light`,value:`#ffffff`}]}}},g={name:`Mobile – MENU trigger (closed)`,render:()=>(0,u.jsx)(`div`,{style:{padding:`16px`},children:(0,u.jsx)(a,{items:d,activeHref:`/projects`,variant:`retro`})}),parameters:{viewport:{defaultViewport:`phone375`},docs:{description:{story:`The MENU text button replaces the previous hamburger icon. Click to open the right-side flyout panel.`}}}},_={name:`Mobile – flyout panel (open)`,render:()=>(0,u.jsx)(c,{items:f,activeHref:`/work`,variant:`retro`}),parameters:{viewport:{defaultViewport:`phone375`},docs:{description:{story:`The flyout panel slides in from the right. Nav links are right-aligned and uppercase. Clicking any link, the backdrop, the ✕ button, or pressing Escape closes the panel.`}}}},v={name:`Mobile – flyout panel, Modern variant`,render:()=>(0,u.jsx)(c,{items:f,activeHref:`/projects`,variant:`modern`}),parameters:{viewport:{defaultViewport:`phone375`},backgrounds:{default:`light`,values:[{name:`light`,value:`#ffffff`}]}}},y={name:`Full Nav (responsive)`,args:{items:d,activeHref:`/projects`,variant:`retro`}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Desktop – Retro',
  render: () => <div style={{
    padding: '16px'
  }}>
      <DesktopNav items={sampleItems} activeHref="/projects" variant="retro" />
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Desktop – Modern',
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
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Mobile – MENU trigger (closed)',
  render: () => <div style={{
    padding: '16px'
  }}>
      <MobileNav items={sampleItems} activeHref="/projects" variant="retro" />
    </div>,
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    docs: {
      description: {
        story: 'The MENU text button replaces the previous hamburger icon. Click to open the right-side flyout panel.'
      }
    }
  }
}`,...g.parameters?.docs?.source},description:{story:`Shows the MENU text button in its resting state at mobile width.
Click it to open the flyout panel.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Mobile – flyout panel (open)',
  render: () => <MobileNavOpen items={richer} activeHref="/work" variant="retro" />,
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    docs: {
      description: {
        story: 'The flyout panel slides in from the right. Nav links are right-aligned and uppercase. ' + 'Clicking any link, the backdrop, the ✕ button, or pressing Escape closes the panel.'
      }
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Mobile – flyout panel, Modern variant',
  render: () => <MobileNavOpen items={richer} activeHref="/projects" variant="modern" />,
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    backgrounds: {
      default: 'light',
      values: [{
        name: 'light',
        value: '#ffffff'
      }]
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Full Nav (responsive)',
  args: {
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro'
  }
}`,...y.parameters?.docs?.source}}},b=[`RetroDesktop`,`ModernDesktop`,`MobileTrigger`,`MobilePanelOpen`,`MobilePanelOpenModern`,`FullNav`]}))();export{y as FullNav,_ as MobilePanelOpen,v as MobilePanelOpenModern,g as MobileTrigger,h as ModernDesktop,m as RetroDesktop,b as __namedExportsOrder,p as default};