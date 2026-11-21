import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./IconButton-6lIXA5ND.js";var a,o,s,c,l,u,d,f,p,m,h,g,_;function v(){return(v=e((()=>{t(),r(),a=n(),o={title:`Components/IconButton`,component:i,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},docs:{description:{component:'The one icon-only control (DMNC-1592): a pixel glyph in a thin square outline. Hover inverts (amber fill, dark glyph), focus is a 2px brand outline. `md` is 36×36 with a 20px glyph; `md` is what every built-in control uses, including dialog strips and DosWindow controls; `window` is 28×28 with a 16px glyph, for dense chrome; `touch` is 44×44 with a 24px glyph, for stage-sized targets. `tone="inherit"` takes the surrounding text colour (glyph, outline, focus ring; hover tints with it) for coloured bars. `label` is required and becomes the `aria-label`.'}}},tags:[`autodocs`],args:{icon:`Close`,label:`Close`,size:`md`,variant:`outline`,tone:`accent`},argTypes:{size:{control:`inline-radio`,options:[`md`,`window`,`touch`]},variant:{control:`inline-radio`,options:[`outline`,`bare`]},tone:{control:`inline-radio`,options:[`accent`,`inherit`]}}},s=[{icon:`Close`,label:`Close`},{icon:`Cancel`,label:`Minimise`},{icon:`Fullscreen`,label:`Maximise`},{icon:`Chevron Left`,label:`Previous`},{icon:`Chevron Right`,label:`Next`},{icon:`Chevron Up`,label:`Up`},{icon:`Chevron Down`,label:`Down`}],c={display:`flex`,gap:16,alignItems:`center`},l={color:`var(--color-semantic-text-primary)`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`var(--typography-font-size-text-xs)`,textTransform:`uppercase`,minWidth:140},u={},d={render:()=>(0,a.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,a.jsxs)(`div`,{style:c,children:[(0,a.jsx)(`span`,{style:l,children:`md 36`}),s.map(e=>(0,a.jsx)(i,{...e},e.icon))]}),(0,a.jsxs)(`div`,{style:c,children:[(0,a.jsx)(`span`,{style:l,children:`window 28`}),s.map(e=>(0,a.jsx)(i,{...e,size:`window`},e.icon))]}),(0,a.jsxs)(`div`,{style:c,children:[(0,a.jsx)(`span`,{style:l,children:`touch 44`}),s.map(e=>(0,a.jsx)(i,{...e,size:`touch`},e.icon))]}),(0,a.jsxs)(`div`,{style:c,children:[(0,a.jsx)(`span`,{style:l,children:`bare`}),s.map(e=>(0,a.jsx)(i,{...e,variant:`bare`},e.icon))]}),(0,a.jsxs)(`div`,{style:c,children:[(0,a.jsx)(`span`,{style:l,children:`disabled`}),(0,a.jsx)(i,{icon:`Chevron Left`,label:`Previous`,isDisabled:!0}),(0,a.jsx)(i,{icon:`Chevron Left`,label:`Previous`,size:`window`,isDisabled:!0})]})]})},f=e=>({render:()=>(0,a.jsxs)(`div`,{style:c,children:[(0,a.jsxs)(`span`,{style:l,children:[e,`: rest / hover / focus`]}),(0,a.jsx)(i,{icon:`Close`,label:`Close (rest)`,size:e}),(0,a.jsx)(i,{icon:`Close`,label:`Close (hover)`,size:e}),(0,a.jsx)(i,{icon:`Close`,label:`Close (focus)`,size:e})]}),play:async({canvasElement:e})=>{e.querySelector(`[aria-label="Close (hover)"]`)?.dispatchEvent(new PointerEvent(`pointerover`,{bubbles:!0,pointerType:`mouse`,isPrimary:!0})),document.dispatchEvent(new KeyboardEvent(`keydown`,{key:`Tab`,bubbles:!0})),e.querySelector(`[aria-label="Close (focus)"]`)?.focus()}}),p=f(`md`),m=f(`window`),h=(e,t)=>({display:`flex`,alignItems:`center`,gap:8,padding:`0 0 0 12px`,background:e,color:t,fontFamily:`var(--typography-font-family-primary)`,fontSize:`var(--typography-font-size-text-base)`,textTransform:`uppercase`,minWidth:320}),g={render:()=>(0,a.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,a.jsxs)(`div`,{style:h(`var(--color-semantic-background-brand)`,`var(--color-semantic-text-on-brand)`),children:[(0,a.jsx)(`span`,{style:{flex:1},children:`Recording`}),(0,a.jsx)(i,{icon:`Chevron Left`,label:`Previous take`,size:`touch`,tone:`inherit`,variant:`bare`}),(0,a.jsx)(i,{icon:`Chevron Right`,label:`Next take`,size:`touch`,tone:`inherit`,variant:`bare`}),(0,a.jsx)(i,{icon:`Close`,label:`Stop`,size:`touch`,tone:`inherit`})]}),(0,a.jsxs)(`div`,{style:h(`var(--color-semantic-background-accent)`,`var(--color-semantic-text-on-accent)`),children:[(0,a.jsx)(`span`,{style:{flex:1},children:`Paused`}),(0,a.jsx)(i,{icon:`Fullscreen`,label:`Maximise`,size:`touch`,tone:`inherit`}),(0,a.jsx)(i,{icon:`Close`,label:`Close`,size:`touch`,tone:`inherit`,isDisabled:!0})]}),(0,a.jsxs)(`div`,{style:{...h(`transparent`,`var(--color-semantic-text-primary)`),padding:0},children:[(0,a.jsx)(`span`,{style:l,children:`touch, accent`}),(0,a.jsx)(i,{icon:`Close`,label:`Close (touch)`,size:`touch`})]})]})},_=[`Default`,`AllGlyphs`,`States`,`StatesWindow`,`TouchOnColouredBar`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>
      <div style={row}>
        <span style={caption}>md 36</span>
        {GLYPHS.map(g => <IconButton key={g.icon} {...g} />)}
      </div>
      <div style={row}>
        <span style={caption}>window 28</span>
        {GLYPHS.map(g => <IconButton key={g.icon} {...g} size="window" />)}
      </div>
      <div style={row}>
        <span style={caption}>touch 44</span>
        {GLYPHS.map(g => <IconButton key={g.icon} {...g} size="touch" />)}
      </div>
      <div style={row}>
        <span style={caption}>bare</span>
        {GLYPHS.map(g => <IconButton key={g.icon} {...g} variant="bare" />)}
      </div>
      <div style={row}>
        <span style={caption}>disabled</span>
        <IconButton icon="Chevron Left" label="Previous" isDisabled />
        <IconButton icon="Chevron Left" label="Previous" size="window" isDisabled />
      </div>
    </div>
}`,...d.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`statesStory('md')`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`statesStory('window')`,...m.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }}>
      <div style={bar('var(--color-semantic-background-brand)', 'var(--color-semantic-text-on-brand)')}>
        <span style={{
        flex: 1
      }}>Recording</span>
        <IconButton icon="Chevron Left" label="Previous take" size="touch" tone="inherit" variant="bare" />
        <IconButton icon="Chevron Right" label="Next take" size="touch" tone="inherit" variant="bare" />
        <IconButton icon="Close" label="Stop" size="touch" tone="inherit" />
      </div>
      <div style={bar('var(--color-semantic-background-accent)', 'var(--color-semantic-text-on-accent)')}>
        <span style={{
        flex: 1
      }}>Paused</span>
        <IconButton icon="Fullscreen" label="Maximise" size="touch" tone="inherit" />
        <IconButton icon="Close" label="Close" size="touch" tone="inherit" isDisabled />
      </div>
      <div style={{
      ...bar('transparent', 'var(--color-semantic-text-primary)'),
      padding: 0
    }}>
        <span style={caption}>touch, accent</span>
        <IconButton icon="Close" label="Close (touch)" size="touch" />
      </div>
    </div>
}`,...g.parameters?.docs?.source},description:{story:'DMNC-1612: `size="touch"` (44×44, 24px glyph) with `tone="inherit"` on\ncoloured status bars. The bar sets `color`; the glyph, outline and focus\nring follow it, and hover tints the button with it. Tab to see the ring.',...g.parameters?.docs?.description}}}})))()}v();export{d as AllGlyphs,u as Default,p as States,m as StatesWindow,g as TouchOnColouredBar,_ as __namedExportsOrder,o as default};