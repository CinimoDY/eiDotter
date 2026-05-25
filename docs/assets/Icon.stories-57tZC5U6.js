import{i as e}from"./preload-helper-Cs4UwXAW.js";import{z as t}from"./iframe-BZiwcFj0.js";import{t as n}from"./jsx-runtime-C2T8EUXA.js";import{n as r,t as i}from"./Icon-CtcS3o9J.js";import{n as a,t as o}from"./registry-BqccLuet.js";var s,c,l,u,d,f,p,m;e((()=>{t(),r(),a(),s=n(),c=[`Info`,`Warning`,`Error`,`Done`,`Close`,`Check`,`Chevron Up`,`Chevron Down`,`App`,`Cancel`,`Fullscreen`,`Add`],l={title:`Components/Icon`,component:i,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:o.Icon},tags:[`autodocs`],argTypes:{name:{control:`select`,options:c},size:{control:`select`,options:[`L`,`S`]},color:{control:`select`,options:[`var(--color-semantic-text-primary)`,`var(--color-semantic-link-default)`,`var(--color-semantic-link-hover)`,`var(--color-semantic-text-disabled)`]},onClick:{action:`clicked`}}},u={args:{name:`Info`,size:`L`}},d={render:()=>(0,s.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(120px, 1fr))`,gap:`8px`,padding:`16px`,maxWidth:`800px`,textAlign:`center`},children:c.map(e=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`4px`,padding:`12px 4px`,borderRadius:`2px`,border:`1px solid var(--color-semantic-border-default)`},children:[(0,s.jsx)(i,{name:e,size:`L`}),(0,s.jsx)(`div`,{style:{fontSize:`10px`,fontFamily:`var(--typography-font-family-primary)`,lineHeight:1.2,wordBreak:`break-word`},children:e})]},e))})},f={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`},children:[(0,s.jsx)(i,{name:`Info`,size:`S`}),(0,s.jsx)(i,{name:`Info`,size:`L`})]})},p={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`},children:[(0,s.jsx)(i,{name:`Info`,size:`L`}),(0,s.jsx)(i,{name:`Info`,size:`L`,color:`var(--color-semantic-link-default)`}),(0,s.jsx)(i,{name:`Info`,size:`L`,color:`var(--color-semantic-link-hover)`}),(0,s.jsx)(i,{name:`Info`,size:`L`,color:`var(--color-semantic-text-disabled)`})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'Info',
    size: 'L'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '8px',
    padding: '16px',
    maxWidth: '800px',
    textAlign: 'center'
  }}>
      {ICON_NAMES.map(name => <div key={name} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      padding: '12px 4px',
      borderRadius: '2px',
      border: '1px solid var(--color-semantic-border-default)'
    }}>
          <Icon name={name} size="L" />
          <div style={{
        fontSize: '10px',
        fontFamily: 'var(--typography-font-family-primary)',
        lineHeight: 1.2,
        wordBreak: 'break-word' as const
      }}>
            {name}
          </div>
        </div>)}
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  }}>
      <Icon name="Info" size="S" />
      <Icon name="Info" size="L" />
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  }}>
      <Icon name="Info" size="L" />
      <Icon name="Info" size="L" color="var(--color-semantic-link-default)" />
      <Icon name="Info" size="L" color="var(--color-semantic-link-hover)" />
      <Icon name="Info" size="L" color="var(--color-semantic-text-disabled)" />
    </div>
}`,...p.parameters?.docs?.source}}},m=[`Default`,`IconGrid`,`Sizes`,`Colors`]}))();export{p as Colors,u as Default,d as IconGrid,f as Sizes,m as __namedExportsOrder,l as default};