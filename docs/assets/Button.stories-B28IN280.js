import{i as e}from"./preload-helper-Cs4UwXAW.js";import{z as t}from"./iframe-BZiwcFj0.js";import{t as n}from"./jsx-runtime-C2T8EUXA.js";import{n as r,t as i}from"./registry-BqccLuet.js";import{n as a,t as o}from"./Button-e4Q1UI6E.js";var s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;e((()=>{t(),a(),r(),s=n(),c={title:`Components/Button`,component:o,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:i.Button},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`primary`,`secondary`,`tertiary`,`destructive`,`ghost`,`link`],defaultValue:`primary`},size:{control:`select`,options:[`xs`,`sm`,`md`,`lg`,`xl`],defaultValue:`md`},type:{control:`select`,options:[`button`,`submit`,`reset`],defaultValue:`button`},disabled:{control:`boolean`,defaultValue:!1},loading:{control:`boolean`,defaultValue:!1},fullWidth:{control:`boolean`,defaultValue:!1},iconOnly:{control:`boolean`,defaultValue:!1},children:{control:`text`,defaultValue:`Button`},onClick:{action:`clicked`}}},l={args:{children:`Default Button`}},u={args:{variant:`primary`,children:`Primary Button`}},d={args:{variant:`secondary`,children:`Secondary Button`}},f={args:{variant:`tertiary`,children:`Tertiary Button`}},p={args:{variant:`destructive`,children:`Destructive Button`}},m={args:{variant:`ghost`,children:`Ghost Button`}},h={args:{variant:`link`,children:`Link Button`}},g={args:{size:`xs`,children:`XS Button`}},_={args:{size:`sm`,children:`SM Button`}},v={args:{size:`md`,children:`MD Button`}},y={args:{size:`lg`,children:`LG Button`}},b={args:{size:`xl`,children:`XL Button`}},x={args:{disabled:!0,children:`Disabled Button`}},S={args:{loading:!0,children:`Loading Button`}},C={args:{fullWidth:!0,children:`Full Width Button`},parameters:{layout:`fullscreen`}},w={args:{iconOnly:!0,children:`X`,"aria-label":`Close`}},T={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,flexWrap:`wrap`},children:[(0,s.jsx)(o,{variant:`primary`,children:`Primary`}),(0,s.jsx)(o,{variant:`secondary`,children:`Secondary`}),(0,s.jsx)(o,{variant:`tertiary`,children:`Tertiary`}),(0,s.jsx)(o,{variant:`destructive`,children:`Destructive`}),(0,s.jsx)(o,{variant:`ghost`,children:`Ghost`}),(0,s.jsx)(o,{variant:`link`,children:`Link`})]})},E={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,s.jsx)(o,{size:`xs`,children:`XS`}),(0,s.jsx)(o,{size:`sm`,children:`SM`}),(0,s.jsx)(o,{size:`md`,children:`MD`}),(0,s.jsx)(o,{size:`lg`,children:`LG`}),(0,s.jsx)(o,{size:`xl`,children:`XL`})]})},D={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,flexWrap:`wrap`},children:[(0,s.jsx)(o,{children:`Normal`}),(0,s.jsx)(o,{disabled:!0,children:`Disabled`}),(0,s.jsx)(o,{loading:!0,children:`Loading`})]})},O={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`,padding:`32px`,background:`var(--color-cga-black, #020003)`,borderRadius:`4px`},children:[(0,s.jsx)(`div`,{style:{fontFamily:`var(--typography-font-family-primary, monospace)`,color:`var(--color-semantic-text-primary, #b87c1a)`,fontSize:`12px`,marginBottom:`8px`},children:`Hover and click each variant to compare phosphor glow intensity.`}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,s.jsx)(o,{variant:`primary`,children:`Primary`}),(0,s.jsx)(`span`,{style:{fontFamily:`monospace`,color:`var(--color-cga-brown, #5f340e)`,fontSize:`11px`},children:`3-layer bloom + scanline crawl`})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,s.jsx)(o,{variant:`secondary`,children:`Secondary`}),(0,s.jsx)(`span`,{style:{fontFamily:`monospace`,color:`var(--color-cga-brown, #5f340e)`,fontSize:`11px`},children:`2-layer bloom + hover inversion`})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,s.jsx)(o,{variant:`tertiary`,children:`Tertiary`}),(0,s.jsx)(`span`,{style:{fontFamily:`monospace`,color:`var(--color-cga-brown, #5f340e)`,fontSize:`11px`},children:`1-layer glow + border reveal`})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,s.jsx)(o,{variant:`destructive`,children:`Destructive`}),(0,s.jsx)(`span`,{style:{fontFamily:`monospace`,color:`var(--color-cga-brown, #5f340e)`,fontSize:`11px`},children:`Red phosphor glow`})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,s.jsx)(o,{variant:`ghost`,children:`Ghost`}),(0,s.jsx)(`span`,{style:{fontFamily:`monospace`,color:`var(--color-cga-brown, #5f340e)`,fontSize:`11px`},children:`1-layer bloom + hover inversion`})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,s.jsx)(o,{variant:`link`,children:`Link`}),(0,s.jsx)(`span`,{style:{fontFamily:`monospace`,color:`var(--color-cga-brown, #5f340e)`,fontSize:`11px`},children:`text-shadow glow only`})]})]}),parameters:{layout:`padded`}},k={render:()=>(0,s.jsxs)(`form`,{style:{display:`flex`,gap:`12px`,flexWrap:`wrap`},children:[(0,s.jsx)(o,{type:`submit`,variant:`primary`,children:`Submit`}),(0,s.jsx)(o,{type:`reset`,variant:`secondary`,children:`Reset`}),(0,s.jsx)(o,{type:`button`,variant:`ghost`,children:`Cancel`})]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Default Button'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'destructive',
    children: 'Destructive Button'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'link',
    children: 'Link Button'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'xs',
    children: 'XS Button'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'sm',
    children: 'SM Button'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md',
    children: 'MD Button'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'lg',
    children: 'LG Button'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'xl',
    children: 'XL Button'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: 'Loading Button'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    fullWidth: true,
    children: 'Full Width Button'
  },
  parameters: {
    layout: 'fullscreen'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    iconOnly: true,
    children: 'X',
    'aria-label': 'Close'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '32px',
    background: 'var(--color-cga-black, #020003)',
    borderRadius: '4px'
  }}>
      <div style={{
      fontFamily: 'var(--typography-font-family-primary, monospace)',
      color: 'var(--color-semantic-text-primary, #b87c1a)',
      fontSize: '12px',
      marginBottom: '8px'
    }}>
        Hover and click each variant to compare phosphor glow intensity.
      </div>
      <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary">Primary</Button>
        <span style={{
        fontFamily: 'monospace',
        color: 'var(--color-cga-brown, #5f340e)',
        fontSize: '11px'
      }}>
          3-layer bloom + scanline crawl
        </span>
      </div>
      <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="secondary">Secondary</Button>
        <span style={{
        fontFamily: 'monospace',
        color: 'var(--color-cga-brown, #5f340e)',
        fontSize: '11px'
      }}>
          2-layer bloom + hover inversion
        </span>
      </div>
      <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="tertiary">Tertiary</Button>
        <span style={{
        fontFamily: 'monospace',
        color: 'var(--color-cga-brown, #5f340e)',
        fontSize: '11px'
      }}>
          1-layer glow + border reveal
        </span>
      </div>
      <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="destructive">Destructive</Button>
        <span style={{
        fontFamily: 'monospace',
        color: 'var(--color-cga-brown, #5f340e)',
        fontSize: '11px'
      }}>
          Red phosphor glow
        </span>
      </div>
      <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="ghost">Ghost</Button>
        <span style={{
        fontFamily: 'monospace',
        color: 'var(--color-cga-brown, #5f340e)',
        fontSize: '11px'
      }}>
          1-layer bloom + hover inversion
        </span>
      </div>
      <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="link">Link</Button>
        <span style={{
        fontFamily: 'monospace',
        color: 'var(--color-cga-brown, #5f340e)',
        fontSize: '11px'
      }}>
          text-shadow glow only
        </span>
      </div>
    </div>,
  parameters: {
    layout: 'padded'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <form style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button type="submit" variant="primary">Submit</Button>
      <Button type="reset" variant="secondary">Reset</Button>
      <Button type="button" variant="ghost">Cancel</Button>
    </form>
}`,...k.parameters?.docs?.source}}},A=[`Default`,`Primary`,`Secondary`,`Tertiary`,`Destructive`,`Ghost`,`Link`,`ExtraSmall`,`Small`,`Medium`,`Large`,`ExtraLarge`,`Disabled`,`Loading`,`FullWidth`,`IconOnly`,`AllVariants`,`AllSizes`,`AllStates`,`PhosphorStates`,`FormButtons`]}))();export{E as AllSizes,D as AllStates,T as AllVariants,l as Default,p as Destructive,x as Disabled,b as ExtraLarge,g as ExtraSmall,k as FormButtons,C as FullWidth,m as Ghost,w as IconOnly,y as Large,h as Link,S as Loading,v as Medium,O as PhosphorStates,u as Primary,d as Secondary,_ as Small,f as Tertiary,A as __namedExportsOrder,c as default};