import{i as e}from"./preload-helper-Cs4UwXAW.js";import{z as t}from"./iframe-BZiwcFj0.js";import{t as n}from"./jsx-runtime-C2T8EUXA.js";import{n as r,t as i}from"./registry-BqccLuet.js";import{n as a,t as o}from"./Breadcrumb-0T11SU9K.js";var s,c,l,u,d,f,p,m,h,g,_;e((()=>{a(),t(),r(),s=n(),c={title:`Components/Breadcrumb`,component:o,parameters:{layout:`centered`,projectMeta:i.Breadcrumb},tags:[`autodocs`],argTypes:{trail:{control:`object`,description:`Array of breadcrumb trail items`},currentLabel:{control:`text`,description:`Current page label`},showBackArrow:{control:`boolean`,description:`Show back arrow on last trail item`},separator:{control:`text`,description:`Custom separator character`}}},l={args:{trail:[{href:`/`,label:`Home`},{href:`/projects`,label:`Projects`}],currentLabel:`Eidotter`}},u={args:{trail:[{href:`/`,label:`Home`}],currentLabel:`About`}},d={args:{trail:[{href:`/`,label:`Home`},{href:`/projects`,label:`Projects`},{href:`/projects/design-systems`,label:`Design Systems`}],currentLabel:`Eidotter`}},f={args:{trail:[],currentLabel:`Home`}},p={args:{trail:[{href:`/`,label:`Home`},{href:`/projects`,label:`Projects`}],currentLabel:`Eidotter`,showBackArrow:!1}},m={args:{trail:[{href:`/`,label:`C:`},{href:`/projects`,label:`Projects`}],currentLabel:`Readme.txt`,separator:`\\`}},h={args:{trail:[{href:`/`,label:`C:`},{href:`/dos`,label:`DOS`}],currentLabel:`COMMAND.COM`,separator:`\\`,showBackArrow:!1}},g={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`var(--color-semantic-text-disabled)`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Default`}),(0,s.jsx)(o,{trail:[{href:`/`,label:`Home`},{href:`/projects`,label:`Projects`}],currentLabel:`Eidotter`})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`var(--color-semantic-text-disabled)`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`DOS Path Style`}),(0,s.jsx)(o,{trail:[{href:`/`,label:`C:`},{href:`/dos`,label:`DOS`}],currentLabel:`AUTOEXEC.BAT`,separator:`\\`,showBackArrow:!1})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`var(--color-semantic-text-disabled)`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Single Level`}),(0,s.jsx)(o,{trail:[{href:`/`,label:`Home`}],currentLabel:`Contact`})]})]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'Home'
    }, {
      href: '/projects',
      label: 'Projects'
    }],
    currentLabel: 'Eidotter'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'Home'
    }],
    currentLabel: 'About'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'Home'
    }, {
      href: '/projects',
      label: 'Projects'
    }, {
      href: '/projects/design-systems',
      label: 'Design Systems'
    }],
    currentLabel: 'Eidotter'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [],
    currentLabel: 'Home'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'Home'
    }, {
      href: '/projects',
      label: 'Projects'
    }],
    currentLabel: 'Eidotter',
    showBackArrow: false
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'C:'
    }, {
      href: '/projects',
      label: 'Projects'
    }],
    currentLabel: 'Readme.txt',
    separator: '\\\\'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'C:'
    }, {
      href: '/dos',
      label: 'DOS'
    }],
    currentLabel: 'COMMAND.COM',
    separator: '\\\\',
    showBackArrow: false
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
      <div>
        <div style={{
        color: 'var(--color-semantic-text-disabled)',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Default
        </div>
        <Breadcrumb trail={[{
        href: '/',
        label: 'Home'
      }, {
        href: '/projects',
        label: 'Projects'
      }]} currentLabel="Eidotter" />
      </div>
      <div>
        <div style={{
        color: 'var(--color-semantic-text-disabled)',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          DOS Path Style
        </div>
        <Breadcrumb trail={[{
        href: '/',
        label: 'C:'
      }, {
        href: '/dos',
        label: 'DOS'
      }]} currentLabel="AUTOEXEC.BAT" separator="\\" showBackArrow={false} />
      </div>
      <div>
        <div style={{
        color: 'var(--color-semantic-text-disabled)',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Single Level
        </div>
        <Breadcrumb trail={[{
        href: '/',
        label: 'Home'
      }]} currentLabel="Contact" />
      </div>
    </div>
}`,...g.parameters?.docs?.source}}},_=[`Default`,`SingleLevel`,`DeepNavigation`,`NoTrail`,`WithoutBackArrow`,`CustomSeparator`,`DOSPath`,`AllVariants`]}))();export{g as AllVariants,m as CustomSeparator,h as DOSPath,d as DeepNavigation,l as Default,f as NoTrail,u as SingleLevel,p as WithoutBackArrow,_ as __namedExportsOrder,c as default};