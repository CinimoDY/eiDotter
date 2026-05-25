import{i as e}from"./preload-helper-Cs4UwXAW.js";import{t,z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{t as i}from"./dos-utilities-GGwJ34fx.js";var a,o,s,c,l,u,d,f,p,m,h;e((()=>{n(),t(),i(),a=r(),o={title:`Design System/DOS Utilities`,parameters:{layout:`fullscreen`,docs:{description:{component:"Visual reference for the 12 `.dos-*` classes shipped via the opt-in `eidotter/utilities` subpath (added in v0.19.4). All classes resolve through the semantic + primitive design tokens, so they track the active theme automatically. This story exists primarily as a visual regression baseline: a token rename that breaks any utility will show up here before it ships."}}}},s=[`dos-hero`,`dos-h1`,`dos-h2`,`dos-h3`,`dos-h4`,`dos-h5`,`dos-body`,`dos-body-lg`,`dos-caption`,`dos-micro`,`dos-label`,`dos-code`],c={"dos-hero":`EIDOTTER`,"dos-h1":`H1 — DISPLAY XL`,"dos-h2":`H2 — DISPLAY LG`,"dos-h3":`H3 — DISPLAY MD`,"dos-h4":`H4 — DISPLAY SM`,"dos-h5":`H5 — DISPLAY XS`,"dos-body":"Body copy uses `--typography-font-size-text-md` (22px). Scoped for paragraph text in prose and MDX surfaces.","dos-body-lg":"Body-lg uses `--typography-font-size-text-lg` (24px). Slightly larger for introductory or lead-in paragraphs.","dos-caption":`CAPTION · 20PX · UPPERCASE`,"dos-micro":`micro · 18px · muted · timestamps and footnotes`,"dos-label":`LABEL · ACCENT COLOR`,"dos-code":`DIR /W *.EXE`},l={"dos-hero":`p`,"dos-h1":`p`,"dos-h2":`p`,"dos-h3":`p`,"dos-h4":`p`,"dos-h5":`p`,"dos-body":`p`,"dos-body-lg":`p`,"dos-caption":`p`,"dos-micro":`p`,"dos-label":`p`,"dos-code":`code`},u=({className:e})=>{let t=l[e];return(0,a.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`12rem 1fr`,gap:`1rem`,alignItems:`baseline`,padding:`0.75rem 0`,borderBottom:`1px solid var(--color-semantic-border-default)`},children:[(0,a.jsxs)(`code`,{style:{fontFamily:`var(--typography-font-family-primary), monospace`,color:`var(--color-semantic-text-muted)`,fontSize:`var(--typography-font-size-text-sm)`},children:[`.`,e]}),(0,a.jsx)(t,{className:e,style:{margin:0},children:c[e]})]})},d={render:()=>(0,a.jsxs)(`div`,{className:`dos-page`,style:{padding:`2rem`,minHeight:`100vh`},children:[(0,a.jsx)(`p`,{className:`dos-label`,style:{marginBottom:`1rem`,color:`var(--color-semantic-text-accent)`},children:`EIDOTTER · UTILITIES · AMBER-MONO`}),s.map(e=>(0,a.jsx)(u,{className:e},e)),(0,a.jsx)(`div`,{className:`dos-scanlines`,style:{marginTop:`2rem`,height:`120px`,border:`1px solid var(--color-semantic-border-default)`,padding:`1rem`,color:`var(--color-semantic-text-primary)`},children:(0,a.jsx)(`code`,{style:{fontFamily:`var(--typography-font-family-primary), monospace`},children:`.dos-scanlines — CRT overlay effect. Expects a dark parent surface.`})})]})},f=[`amber-mono`,`cga-amber`,`cga-mode4-p0`,`cga-mode4-p1`,`cga-mode5`],p=({theme:e})=>(0,a.jsxs)(`div`,{"data-theme":e,className:`dos-page`,style:{padding:`1.5rem`,border:`1px solid var(--color-semantic-border-default)`},children:[(0,a.jsx)(`p`,{className:`dos-label`,style:{margin:`0 0 1rem 0`},children:e.toUpperCase()}),(0,a.jsx)(`p`,{className:`dos-h2`,style:{margin:`0 0 0.5rem 0`},children:`HEADING`}),(0,a.jsx)(`p`,{className:`dos-body`,style:{margin:`0 0 0.5rem 0`},children:`Body renders through semantic tokens. A theme switch changes the colour here.`}),(0,a.jsx)(`p`,{className:`dos-caption`,style:{margin:`0 0 0.5rem 0`},children:`CAPTION · MUTED COLOUR`}),(0,a.jsx)(`code`,{className:`dos-code`,children:`DIR /W`})]}),m={parameters:{docs:{description:{story:`Same four utility classes rendered under each of the five shipped themes. Useful as a visual regression diff when touching tokens or the utilities sheet.`}}},render:()=>(0,a.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:`1rem`,padding:`2rem`,backgroundColor:`var(--color-semantic-background-primary)`,minHeight:`100vh`},children:f.map(e=>(0,a.jsx)(p,{theme:e},e))})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="dos-page" style={{
    padding: '2rem',
    minHeight: '100vh'
  }}>
      <p className="dos-label" style={{
      marginBottom: '1rem',
      color: 'var(--color-semantic-text-accent)'
    }}>
        EIDOTTER · UTILITIES · AMBER-MONO
      </p>
      {allClasses.map(cls => <UtilityRow key={cls} className={cls} />)}
      <div className="dos-scanlines" style={{
      marginTop: '2rem',
      height: '120px',
      border: '1px solid var(--color-semantic-border-default)',
      padding: '1rem',
      color: 'var(--color-semantic-text-primary)'
    }}>
        <code style={{
        fontFamily: 'var(--typography-font-family-primary), monospace'
      }}>
          .dos-scanlines — CRT overlay effect. Expects a dark parent surface.
        </code>
      </div>
    </div>
}`,...d.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Same four utility classes rendered under each of the five shipped themes. Useful as a visual regression diff when touching tokens or the utilities sheet.'
      }
    }
  },
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1rem',
    padding: '2rem',
    backgroundColor: 'var(--color-semantic-background-primary)',
    minHeight: '100vh'
  }}>
      {themes.map(t => <ThemeSample key={t} theme={t} />)}
    </div>
}`,...m.parameters?.docs?.source}}},h=[`AllUtilities`,`ThemeGallery`]}))();export{d as AllUtilities,m as ThemeGallery,h as __namedExportsOrder,o as default};