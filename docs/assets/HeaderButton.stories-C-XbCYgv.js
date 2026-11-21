import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./CmdPalette-rRdLyrXx.js";import{n as o,t as s}from"./Header-Cp7iOg1e.js";import{i as c,n as l,r as u,t as d}from"./DisplayMenu-Cd1SVFne.js";function f({brandName:e=`DMNC.TECH`,withPalette:t=!0}){let[n,r]=(0,p.useState)(!1),[i,o]=(0,p.useState)(!1);return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(s,{brandName:e,items:g,sticky:!1,end:(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`var(--spacing-2, 8px)`},children:[t&&(0,m.jsx)(u,{"aria-label":`Open command palette`,onPress:()=>r(!0),children:`⌘K`}),(0,m.jsx)(d,{label:`Theme`,items:[{id:`light`,label:`LIGHT`,checked:i,onChange:o}]})]})}),(0,m.jsx)(a,{open:n,onOpenChange:r,items:_,hotkey:!1})]})}var p,m,h,g,_,v,y,b,x,S,C,w;function T(){return(T=t((()=>{p=e(n(),1),c(),l(),o(),i(),m=r(),h={title:`Components/HeaderButton`,component:u,parameters:{layout:`fullscreen`,docs:{description:{component:"The one control shape for the Header `end` slot (0.46). DisplayMenu's trigger is a HeaderButton, and a ⌘K launcher is the same component with `⌘K` inside, so every header control has the same height (36px, 32px on phones), border, hover and focus ring. Text is the one body size."}}},tags:[`autodocs`]},g=[{label:`Home`,href:`#home`},{label:`Log`,href:`#log`},{label:`About`,href:`#about`}],_=[{id:`home`,label:`HOME`,hint:`/`},{id:`log`,label:`LOG`,hint:`/log`}],v=e=>(0,m.jsx)(`div`,{style:{margin:`calc(-1 * var(--spacing-8))`,minHeight:`240px`},children:(0,m.jsx)(e,{})}),y={name:`In a Header: ⌘K + theme`,render:()=>(0,m.jsx)(f,{}),decorators:[v],parameters:{stable:{watch:[`.eidotter-header-button`,`.eidotter-display-menu`,`.eidotter-header__branding`,`.eidotter-nav__desktop-list`],themes:[`dos-86-light`]}}},b={name:`In a Header (display face themes)`,render:()=>(0,m.jsx)(f,{}),decorators:[v],globals:{theme:`pure-amber`},parameters:{stable:{watch:[`.eidotter-header-button`,`.eidotter-display-menu`,`.eidotter-header__branding`,`.eidotter-nav__desktop-list`],themes:[`amber-paper`,`light`]}}},x={name:`Phone 390`,render:()=>(0,m.jsx)(f,{}),decorators:[v],parameters:{viewport:{defaultViewport:`phone375`},noOverflowAt:[390],noHeaderEndClip:!0}},S={name:`Phone 320: theme control only`,render:()=>(0,m.jsx)(f,{withPalette:!1}),decorators:[v],parameters:{viewport:{defaultViewport:`phone320`},noOverflowAt:[320],noHeaderEndClip:!0}},C={render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--spacing-4, 16px)`,alignItems:`center`},children:[(0,m.jsx)(u,{"aria-label":`Open command palette`,children:`⌘K`}),(0,m.jsx)(u,{children:`Search`}),(0,m.jsx)(u,{chevron:!0,children:`Theme`}),(0,m.jsx)(u,{isDisabled:!0,children:`Disabled`})]})},w=[`InHeader`,`InHeaderDisplayFace`,`Phone390`,`Phone320`,`Variants`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'In a Header: ⌘K + theme',
  render: () => <SiteHeader />,
  decorators: [resetRoot],
  // Body face pair: dos-86 and its light theme dos-86-light keep every box.
  // The display face group is InHeaderDisplayFace.
  parameters: {
    stable: {
      watch: ['.eidotter-header-button', '.eidotter-display-menu', '.eidotter-header__branding', '.eidotter-nav__desktop-list'],
      themes: ['dos-86-light']
    }
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'In a Header (display face themes)',
  render: () => <SiteHeader />,
  decorators: [resetRoot],
  globals: {
    theme: 'pure-amber'
  },
  parameters: {
    stable: {
      watch: ['.eidotter-header-button', '.eidotter-display-menu', '.eidotter-header__branding', '.eidotter-nav__desktop-list'],
      themes: ['amber-paper', 'light']
    }
  }
}`,...b.parameters?.docs?.source},description:{story:`The display face group: Pure Amber, amber-paper and light keep every box.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Phone 390',
  render: () => <SiteHeader />,
  decorators: [resetRoot],
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    noOverflowAt: [390],
    noHeaderEndClip: true
  }
}`,...x.parameters?.docs?.source},description:{story:`390px: brand, ⌘K, theme and MENU fit. At 320px a lockup brand, two
controls and MENU do not; a ⌘K hint means nothing without a keyboard, so
show the ⌘K button from 480px up and keep the theme control alone on
phones (Phone 320).`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Phone 320: theme control only',
  render: () => <SiteHeader withPalette={false} />,
  decorators: [resetRoot],
  parameters: {
    viewport: {
      defaultViewport: 'phone320'
    },
    noOverflowAt: [320],
    noHeaderEndClip: true
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing-4, 16px)',
    alignItems: 'center'
  }}>
      <HeaderButton aria-label="Open command palette">⌘K</HeaderButton>
      <HeaderButton>Search</HeaderButton>
      <HeaderButton chevron>Theme</HeaderButton>
      <HeaderButton isDisabled>Disabled</HeaderButton>
    </div>
}`,...C.parameters?.docs?.source}}}})))()}T();export{y as InHeader,b as InHeaderDisplayFace,S as Phone320,x as Phone390,C as Variants,w as __namedExportsOrder,h as default};