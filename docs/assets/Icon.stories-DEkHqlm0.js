import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{r as n,t as r}from"./registry-EhIcK3QA.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a,t as o}from"./Icon-PjaQuo49.js";var s,c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{t(),a(),n(),s=i(),c=[`Info`,`Warning`,`Error`,`Done`,`Close`,`Check`,`Chevron Up`,`Chevron Down`,`Chevron Left`,`Chevron Right`,`App`,`Cancel`,`Fullscreen`,`Add`],l={title:`Components/Icon`,component:o,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:r.Icon},tags:[`autodocs`],argTypes:{name:{control:`select`,options:c},size:{control:`select`,options:[`L`,`S`]},color:{control:`select`,options:[`var(--color-semantic-text-primary)`,`var(--color-semantic-link-default)`,`var(--color-semantic-link-hover)`,`var(--color-semantic-text-disabled)`]},onClick:{action:`clicked`}}},u={args:{name:`Info`,size:`L`}},d={render:()=>(0,s.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(120px, 1fr))`,gap:`8px`,padding:`16px`,maxWidth:`800px`,textAlign:`center`},children:c.map(e=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`4px`,padding:`12px 4px`,borderRadius:`2px`,border:`1px solid var(--color-semantic-border-default)`},children:[(0,s.jsx)(o,{name:e,size:`L`}),(0,s.jsx)(`div`,{style:{fontSize:`10px`,fontFamily:`var(--typography-font-family-primary)`,lineHeight:1.2,wordBreak:`break-word`},children:e})]},e))})},f={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`},children:[(0,s.jsx)(o,{name:`Info`,size:`S`}),(0,s.jsx)(o,{name:`Info`,size:`L`})]})},p={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`},children:[(0,s.jsx)(o,{name:`Info`,size:`L`}),(0,s.jsx)(o,{name:`Info`,size:`L`,color:`var(--color-semantic-link-default)`}),(0,s.jsx)(o,{name:`Info`,size:`L`,color:`var(--color-semantic-link-hover)`}),(0,s.jsx)(o,{name:`Info`,size:`L`,color:`var(--color-semantic-text-disabled)`})]})},m={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,alignItems:`center`,background:`var(--color-semantic-background-accent)`,color:`var(--color-semantic-text-on-accent)`,padding:`8px 16px`,fontFamily:`var(--typography-font-family-primary)`},children:[`Dark text on amber fill`,(0,s.jsx)(o,{name:`Chevron Down`,size:`S`})]})},h=[`Default`,`IconGrid`,`Sizes`,`Colors`,`InheritsSurfaceColor`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    background: 'var(--color-semantic-background-accent)',
    color: 'var(--color-semantic-text-on-accent)',
    padding: '8px 16px',
    fontFamily: 'var(--typography-font-family-primary)'
  }}>
      Dark text on amber fill
      <Icon name="Chevron Down" size="S" />
    </div>
}`,...m.parameters?.docs?.source},description:{story:`Regression story for DMNC-929: Icon must inherit the surrounding text color.
On an amber surface with dark text (like the Section header in hover/expanded
state), the icon has to render dark — a hardcoded amber would vanish into
the fill.`,...m.parameters?.docs?.description}}}})))()}g();export{p as Colors,u as Default,d as IconGrid,m as InheritsSurfaceColor,f as Sizes,h as __namedExportsOrder,l as default};