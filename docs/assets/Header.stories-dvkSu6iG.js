import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Switch-FyvnVIE9.js";import{n as o,t as s}from"./Header-Cp7iOg1e.js";function c(){let[e,t]=d.useState(!0);return(0,f.jsxs)(`span`,{className:`flex items-center gap-4 font-dos text-dos-text-brand`,children:[(0,f.jsx)(`kbd`,{className:`font-dos`,children:`⌘K`}),(0,f.jsxs)(`button`,{type:`button`,"aria-pressed":e,onClick:()=>t(e=>!e),className:`font-dos uppercase whitespace-nowrap text-dos-text-brand bg-transparent border border-dos-border-brand-dim rounded-dos-sm px-2`,children:[`DOS `,e?`ON`:`OFF`]})]})}function l(){return(0,f.jsx)(`span`,{className:`flex items-center gap-4 font-dos text-dos-text-brand`,children:(0,f.jsx)(a,{defaultChecked:!0,"aria-label":`Light theme`})})}function u(e){let t=(0,d.useRef)(null);return(0,d.useEffect)(()=>{(t.current?.querySelector(`.eidotter-nav__menu-trigger`))?.click()},[]),(0,f.jsx)(`div`,{ref:t,children:(0,f.jsx)(s,{...e})})}var d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L;function R(){return(R=t((()=>{d=e(n(),1),o(),i(),f=r(),p=[{label:`projects`,href:`/projects`},{label:`tiny ideas`,href:`/blog`},{label:`contact`,href:`/contact`}],m=[{key:`work`,label:`work`,icon:`App`,href:`/work`},{key:`ideas`,label:`ideas`,icon:`Info`,href:`/ideas`},{key:`misc`,label:`misc`,icon:`folder`,href:`/misc`}],h={title:`Components/Header`,component:s,parameters:{layout:`fullscreen`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]}},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`retro`,`modern`]},sticky:{control:`boolean`},activeHref:{control:`text`},brandHref:{control:`text`},brand:{control:`select`,options:[`lockup`,`mark`,`text`]},skipLinkTarget:{control:`text`}}},g={name:`Default – lockup brand`,args:{brandName:`SITE.NAME`,items:p,activeHref:`/projects`,variant:`retro`},parameters:{docs:{description:{story:"The one portfolio header (DMNC-1584): with `brandName` and no `children`, the brand renders as the lockup (decorative Logo + uppercase wide-tracked name). Quiet 1px dim-amber bottom line, all text in the brand amber, uppercase DOS nav labels."}}}},_={name:`Brand – Mark`,args:{brandName:`SITE.NAME`,brand:`mark`,items:p,activeHref:`/projects`,variant:`retro`},parameters:{docs:{description:{story:'`brand="mark"` swaps the static Logo for the morphing `Mark` (placeholder for the arms version).'}}}},v={name:`End slot – toggle + ⌘K hint`,args:{brandName:`SITE.NAME`,items:p,activeHref:`/projects`,variant:`retro`,end:(0,f.jsx)(c,{})},parameters:{docs:{description:{story:"`end` renders once: after the desktop nav on wide screens, and between the brand and the MENU trigger on mobile (resize to see both placements)."}}}},y={name:`End slot – Switch glow at phone width`,args:{brandName:`SITE.NAME`,items:p,variant:`retro`,end:(0,f.jsx)(a,{defaultChecked:!0,"aria-label":`Light theme`})},parameters:{viewport:{defaultViewport:`phone375`},docs:{description:{story:"A checked Switch in `end` at phone width: its 12px phosphor glow and its focus ring (Tab to it) show in full. The slot clips only the inline axis, with a 12px bleed (DMNC-1611); when the row is short of room the brand wraps first, then the slot clips."}}}},b={brandName:`DOMINIC KENNEDY`,items:p,activeHref:`/projects`,variant:`retro`,end:(0,f.jsx)(l,{})},x={name:`Narrow brand – icon drops at 320`,args:{...b,brandName:`DMNC.TECH`},parameters:{viewport:{defaultViewport:`phone320`},noOverflowAt:[320],docs:{description:{story:'The brand title never wraps or ellipsizes (0.45). When icon + title + the right-hand group do not fit, the logo icon drops out first and the title keeps the row on one line; then the `end` slot clips. A title wider than the whole row overflows: shorten it, or use `brandCollapse="mark"`.'}}}},S={name:`Narrow brand – two-word title at 375`,args:b,parameters:{viewport:{defaultViewport:`phone375`},noOverflowAt:[375],docs:{description:{story:`A two-word title stays on one line at 375px; the icon makes room.`}}}},C={name:`Brand collapse – Mark only below 480`,args:{...b,brandCollapse:`mark`},parameters:{viewport:{defaultViewport:`phone375`},docs:{description:{story:'`brandCollapse="mark"`: below 480px of header width (a container query on the header) only the icon shows. The name is visually hidden, not removed, so it stays the brand link\'s accessible name. Widen the canvas past 480px to see the name come back.'}}}},w={name:`Layout – stacked (nav row under the brand)`,args:{brandName:`EXAMPLE`,items:p,activeHref:`/projects`,variant:`retro`,layout:`stacked`,end:(0,f.jsx)(c,{})},parameters:{docs:{description:{story:'`layout="stacked"`: the brand row on top, with `end` (and the MENU trigger below 768px) on its right; the desktop nav on its own row underneath, left-aligned on the brand\'s edge.'}}}},T={name:`Layout – contained, stacked, no rule`,render:e=>(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(s,{...e}),(0,f.jsx)(`div`,{className:`font-dos text-dos-text-primary`,style:{maxWidth:1200,margin:0,padding:`24px max(16px, env(safe-area-inset-left, 0px))`},children:`This column is flush left with the PageShell gutter and a 1200px cap: its left edge lines up with the brand.`})]}),args:{brandName:`EXAMPLE`,items:p,activeHref:`/projects`,variant:`retro`,layout:`stacked`,contained:!0,rule:!1},parameters:{docs:{description:{story:"`contained` puts the header content in a flush-left column capped at 1200px (or any CSS length) with the PageShell gutter, so the brand lines up with the page column while the header band stays full width. `rule={false}` drops the bottom line and its glow."}}}},E={name:`Skip link`,render:e=>(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(s,{...e}),(0,f.jsx)(`main`,{id:`main`,className:`p-4 font-dos text-dos-text-primary`,children:`Press Tab: the SKIP TO CONTENT pill appears top-left and jumps here.`})]}),args:{brandName:`SITE.NAME`,items:p,activeHref:`/projects`,variant:`retro`,skipLinkTarget:`#main`},parameters:{docs:{description:{story:'`skipLinkTarget` renders a visually-hidden-until-focused "SKIP TO CONTENT" anchor as the header\'s first child (WCAG 2.4.1). Off by default.'}}}},D={args:{brandName:`DMNC.TECH`,items:p,activeHref:`/projects`,variant:`retro`}},O={args:{brandName:`Dominic Kennedy`,items:p,activeHref:`/blog`,variant:`modern`},parameters:{backgrounds:{default:`light`,values:[{name:`light`,value:`#ffffff`}]}}},k={args:{items:[{label:`components`,href:`/components`},{label:`storybook`,href:`/storybook`},{label:`github`,href:`/github`}],activeHref:`/components`,variant:`retro`,children:(0,f.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,f.jsx)(`span`,{"aria-hidden":`true`,children:`🥚`}),(0,f.jsx)(`span`,{children:`eiDotter`})]})}},A={name:`Mobile – MENU trigger (closed)`,args:{brandName:`RIZOMORF`,items:[{label:`work`,href:`/work`},{label:`projects`,href:`/projects`},{label:`blog`,href:`/blog`},{label:`contact`,href:`/contact`}],activeHref:`/work`,variant:`retro`},parameters:{viewport:{defaultViewport:`phone375`},docs:{description:{story:`At mobile width the desktop nav is hidden and the MENU text trigger appears. Click MENU to open the flyout.`}}}},j={name:`Mobile – flyout panel (open)`,render:()=>(0,f.jsx)(u,{brandName:`RIZOMORF`,items:[{label:`work`,href:`/work`},{label:`projects`,href:`/projects`},{label:`blog`,href:`/blog`},{label:`contact`,href:`/contact`}],activeHref:`/work`,variant:`retro`}),parameters:{viewport:{defaultViewport:`phone375`},docs:{description:{story:`The right-side flyout panel with right-aligned uppercase nav items and pixel-art X close button. Backdrop, ✕ button, nav link clicks, and Escape all close the panel.`}}}},M={args:{brandName:`SITE.NAME`,items:p,activeHref:`/projects`,variant:`retro`,sticky:!0}},N={name:`Context – none (back-compat)`,args:{brandName:`DMNC.TECH`,items:p,activeHref:`/projects`,variant:`retro`,context:void 0},parameters:{docs:{description:{story:"Without `context` the DOM is identical to previous versions — a single brand+nav row."}}}},P={name:`Context – category badge row`,args:{brandName:`DMNC.TECH`,items:p,activeHref:`/projects`,variant:`retro`,context:{categories:m}},parameters:{docs:{description:{story:"A measurable second row of category badges. Each `<li>` carries a stable `data-category-key` and each link the `eidotter-header__category` class — the measurement contract the Mark arm-connector (DMNC-1325) anchors off. The `misc` category uses an unknown icon name and falls back to label-only."}}}},F={name:`Context – returnTo pill (same tab)`,args:{brandName:`DMNC.TECH`,items:p,activeHref:`/work`,variant:`retro`,context:{categories:m,returnTo:{label:`Back to Rizomorf`,href:`https://rizomorf.dmnc.online`}}},parameters:{docs:{description:{story:'The "← back" pill navigates in the same tab via `linkComponent` (or a plain anchor). The active category (`activeHref`) gets an underline + `aria-current="page"`.'}}}},I={name:`Context – returnTo pill (reuse named tab)`,args:{brandName:`DMNC.TECH`,items:p,activeHref:`/work`,variant:`retro`,context:{categories:m,returnTo:{label:`Back to Rizomorf`,href:`https://rizomorf.dmnc.online`,reuseTab:!0}}},parameters:{docs:{description:{story:'With `reuseTab: true` the pill is a real `<a>` (bypassing `linkComponent`) whose click calls `window.open(href, "rizomorf-shell")` to reuse a named tab. A popup blocker (null return) falls back to normal same-tab navigation; Cmd/Ctrl/Shift/middle-clicks keep their native behavior. Cross-origin tab focus is intentionally not attempted.'}}}},L=[`Default`,`MarkBrand`,`WithEndSlot`,`EndSlotGlowAtPhone`,`NarrowWrap320`,`NarrowWrap375`,`BrandCollapseMark`,`Stacked`,`ContainedNoRule`,`WithSkipLink`,`RetroHeader`,`ModernHeader`,`CustomBranding`,`MobileHeader`,`MobileMenuOpen`,`FullHeader`,`ContextNone`,`ContextCategories`,`ContextReturnToSameTab`,`ContextReturnToReuseTab`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Default – lockup brand',
  args: {
    brandName: 'SITE.NAME',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro'
  },
  parameters: {
    docs: {
      description: {
        story: 'The one portfolio header (DMNC-1584): with \`brandName\` and no \`children\`, the brand ' + 'renders as the lockup (decorative Logo + uppercase wide-tracked name). Quiet 1px ' + 'dim-amber bottom line, all text in the brand amber, uppercase DOS nav labels.'
      }
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Brand – Mark',
  args: {
    brandName: 'SITE.NAME',
    brand: 'mark',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro'
  },
  parameters: {
    docs: {
      description: {
        story: '\`brand="mark"\` swaps the static Logo for the morphing \`Mark\` (placeholder for the arms version).'
      }
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'End slot – toggle + ⌘K hint',
  args: {
    brandName: 'SITE.NAME',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    end: <EndSlotDemo />
  },
  parameters: {
    docs: {
      description: {
        story: '\`end\` renders once: after the desktop nav on wide screens, and between the brand and ' + 'the MENU trigger on mobile (resize to see both placements).'
      }
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'End slot – Switch glow at phone width',
  args: {
    brandName: 'SITE.NAME',
    items: sampleItems,
    variant: 'retro',
    end: <Switch defaultChecked aria-label="Light theme" />
  },
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    docs: {
      description: {
        story: 'A checked Switch in \`end\` at phone width: its 12px phosphor glow and its focus ring ' + '(Tab to it) show in full. The slot clips only the inline axis, with a 12px bleed ' + '(DMNC-1611); when the row is short of room the brand wraps first, then the slot clips.'
      }
    }
  }
}`,...y.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Narrow brand – icon drops at 320',
  args: {
    ...longNameArgs,
    brandName: 'DMNC.TECH'
  },
  parameters: {
    viewport: {
      defaultViewport: 'phone320'
    },
    noOverflowAt: [320],
    docs: {
      description: {
        story: 'The brand title never wraps or ellipsizes (0.45). When icon + title + the right-hand ' + 'group do not fit, the logo icon drops out first and the title keeps the row on one ' + 'line; then the \`end\` slot clips. A title wider than the whole row overflows: shorten ' + 'it, or use \`brandCollapse="mark"\`.'
      }
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Narrow brand – two-word title at 375',
  args: longNameArgs,
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    noOverflowAt: [375],
    docs: {
      description: {
        story: 'A two-word title stays on one line at 375px; the icon makes room.'
      }
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Brand collapse – Mark only below 480',
  args: {
    ...longNameArgs,
    brandCollapse: 'mark'
  },
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    docs: {
      description: {
        story: '\`brandCollapse="mark"\`: below 480px of header width (a container query on the header) ' + 'only the icon shows. The name is visually hidden, not removed, so it stays the brand ' + "link's accessible name. Widen the canvas past 480px to see the name come back."
      }
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Layout – stacked (nav row under the brand)',
  args: {
    brandName: 'EXAMPLE',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    layout: 'stacked',
    end: <EndSlotDemo />
  },
  parameters: {
    docs: {
      description: {
        story: '\`layout="stacked"\`: the brand row on top, with \`end\` (and the MENU trigger below 768px) ' + "on its right; the desktop nav on its own row underneath, left-aligned on the brand's edge."
      }
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Layout – contained, stacked, no rule',
  render: args => <>
      <Header {...args} />
      <div className="font-dos text-dos-text-primary" style={{
      maxWidth: 1200,
      margin: 0,
      padding: '24px max(16px, env(safe-area-inset-left, 0px))'
    }}>
        This column is flush left with the PageShell gutter and a 1200px cap: its left edge lines up with the brand.
      </div>
    </>,
  args: {
    brandName: 'EXAMPLE',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    layout: 'stacked',
    contained: true,
    rule: false
  },
  parameters: {
    docs: {
      description: {
        story: '\`contained\` puts the header content in a flush-left column capped at 1200px (or any CSS length) with the ' + 'PageShell gutter, so the brand lines up with the page column while the header band stays ' + 'full width. \`rule={false}\` drops the bottom line and its glow.'
      }
    }
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Skip link',
  render: args => <>
      <Header {...args} />
      <main id="main" className="p-4 font-dos text-dos-text-primary">
        Press Tab: the SKIP TO CONTENT pill appears top-left and jumps here.
      </main>
    </>,
  args: {
    brandName: 'SITE.NAME',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    skipLinkTarget: '#main'
  },
  parameters: {
    docs: {
      description: {
        story: '\`skipLinkTarget\` renders a visually-hidden-until-focused "SKIP TO CONTENT" anchor as ' + "the header's first child (WCAG 2.4.1). Off by default."
      }
    }
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    brandName: 'DMNC.TECH',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    brandName: 'SITE.NAME',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    sticky: true
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Context – none (back-compat)',
  args: {
    brandName: 'DMNC.TECH',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    context: undefined
  },
  parameters: {
    docs: {
      description: {
        story: 'Without \`context\` the DOM is identical to previous versions — a single brand+nav row.'
      }
    }
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Context – category badge row',
  args: {
    brandName: 'DMNC.TECH',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    context: {
      categories: contextCategories
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'A measurable second row of category badges. Each \`<li>\` carries a stable ' + '\`data-category-key\` and each link the \`eidotter-header__category\` class — the ' + 'measurement contract the Mark arm-connector (DMNC-1325) anchors off. The ' + '\`misc\` category uses an unknown icon name and falls back to label-only.'
      }
    }
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Context – returnTo pill (same tab)',
  args: {
    brandName: 'DMNC.TECH',
    items: sampleItems,
    activeHref: '/work',
    variant: 'retro',
    context: {
      categories: contextCategories,
      returnTo: {
        label: 'Back to Rizomorf',
        href: 'https://rizomorf.dmnc.online'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'The "← back" pill navigates in the same tab via \`linkComponent\` (or a plain anchor). ' + 'The active category (\`activeHref\`) gets an underline + \`aria-current="page"\`.'
      }
    }
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Context – returnTo pill (reuse named tab)',
  args: {
    brandName: 'DMNC.TECH',
    items: sampleItems,
    activeHref: '/work',
    variant: 'retro',
    context: {
      categories: contextCategories,
      returnTo: {
        label: 'Back to Rizomorf',
        href: 'https://rizomorf.dmnc.online',
        reuseTab: true
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'With \`reuseTab: true\` the pill is a real \`<a>\` (bypassing \`linkComponent\`) whose click ' + 'calls \`window.open(href, "rizomorf-shell")\` to reuse a named tab. A popup blocker ' + '(null return) falls back to normal same-tab navigation; Cmd/Ctrl/Shift/middle-clicks ' + 'keep their native behavior. Cross-origin tab focus is intentionally not attempted.'
      }
    }
  }
}`,...I.parameters?.docs?.source}}}})))()}R();export{C as BrandCollapseMark,T as ContainedNoRule,P as ContextCategories,N as ContextNone,I as ContextReturnToReuseTab,F as ContextReturnToSameTab,k as CustomBranding,g as Default,y as EndSlotGlowAtPhone,M as FullHeader,_ as MarkBrand,A as MobileHeader,j as MobileMenuOpen,O as ModernHeader,x as NarrowWrap320,S as NarrowWrap375,D as RetroHeader,w as Stacked,v as WithEndSlot,E as WithSkipLink,L as __namedExportsOrder,h as default};