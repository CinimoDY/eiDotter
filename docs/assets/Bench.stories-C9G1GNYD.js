import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Badge-BkcUmlDI.js";import{i as a,n as o,r as s,t as c}from"./review-BVzkfmZf.js";var l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{t(),a(),r(),o(),l=n(),u={title:`Components/Bench`,component:s,parameters:{layout:`padded`,docs:{description:{component:`Compare unit on DosWindow (0.43): a title strip with status chips, an optional note, then before | after panes separated by a 1px gap the grid background paints. Each pane has an uppercase label and a keyboard-scrollable frame (max 640px tall). Panes stack below 760px of bench width (container query). Images in these stories are FIXTURE ONLY, illustrative placeholders.`}}},tags:[`autodocs`]},d=(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i,{size:`sm`,children:`retro`}),(0,l.jsx)(i,{size:`sm`,children:`1280`})]}),f={name:`Desktop pair`,args:{title:`Home, retro, 1280`,chips:d,note:`Plain-text brand, uppercase nav, toggle in the end slot. FIXTURE ONLY, illustrative.`,panes:[{label:`Before`,tone:`before`,content:(0,l.jsx)(c,{kind:`desktop`,state:`before`,label:`Example home page, 1280 wide, before`})},{label:`After`,tone:`after`,content:(0,l.jsx)(c,{kind:`desktop`,state:`after`,label:`Example home page, 1280 wide, after`})}]}},p={name:`Phone pair`,args:{title:`Home, retro, 390`,chips:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i,{size:`sm`,children:`retro`}),(0,l.jsx)(i,{size:`sm`,children:`390`}),(0,l.jsx)(i,{size:`sm`,variant:`warning`,children:`upstream`})]}),panes:[{label:`Before`,tone:`before`,frame:`phone`,content:(0,l.jsx)(c,{kind:`phone`,state:`before`,label:`Example home page, 390 wide, before`})},{label:`After`,tone:`after`,frame:`phone`,content:(0,l.jsx)(c,{kind:`phone`,state:`after`,label:`Example home page, 390 wide, after`})}]}},m={name:`Single pane`,args:{title:`Palette, new`,chips:(0,l.jsx)(i,{size:`sm`,variant:`success`,children:`new`}),panes:[{label:`After · 1280`,tone:`after`,content:(0,l.jsx)(c,{kind:`desktop`,state:`after`,label:`Example palette open, 1280 wide`})}]}},h={name:`Stacked at phone width`,args:f.args,parameters:{viewport:{defaultViewport:`phone375`},docs:{description:{story:`Below 760px of bench width the panes stack and the chips move under the title.`}}}},g=[`DesktopPair`,`PhonePair`,`SinglePane`,`StackedAtPhone`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Desktop pair',
  args: {
    title: 'Home, retro, 1280',
    chips,
    note: 'Plain-text brand, uppercase nav, toggle in the end slot. FIXTURE ONLY, illustrative.',
    panes: [{
      label: 'Before',
      tone: 'before',
      content: <FixtureScreen kind="desktop" state="before" label="Example home page, 1280 wide, before" />
    }, {
      label: 'After',
      tone: 'after',
      content: <FixtureScreen kind="desktop" state="after" label="Example home page, 1280 wide, after" />
    }]
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Phone pair',
  args: {
    title: 'Home, retro, 390',
    chips: <>
        <Badge size="sm">retro</Badge>
        <Badge size="sm">390</Badge>
        <Badge size="sm" variant="warning">upstream</Badge>
      </>,
    panes: [{
      label: 'Before',
      tone: 'before',
      frame: 'phone',
      content: <FixtureScreen kind="phone" state="before" label="Example home page, 390 wide, before" />
    }, {
      label: 'After',
      tone: 'after',
      frame: 'phone',
      content: <FixtureScreen kind="phone" state="after" label="Example home page, 390 wide, after" />
    }]
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Single pane',
  args: {
    title: 'Palette, new',
    chips: <Badge size="sm" variant="success">new</Badge>,
    panes: [{
      label: 'After · 1280',
      tone: 'after',
      content: <FixtureScreen kind="desktop" state="after" label="Example palette open, 1280 wide" />
    }]
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Stacked at phone width',
  args: DesktopPair.args,
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    docs: {
      description: {
        story: 'Below 760px of bench width the panes stack and the chips move under the title.'
      }
    }
  }
}`,...h.parameters?.docs?.source}}}})))()}_();export{f as DesktopPair,p as PhonePair,m as SinglePane,h as StackedAtPhone,g as __namedExportsOrder,u as default};