import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";import{n as o,t as s}from"./registry-BqccLuet.js";import{n as c,t as l}from"./InlineExpand-Dvq-jQV3.js";var u=e((()=>{}));function d(e){let t=e.trim();if(t===``||/^[#?/]/.test(t))return t;let n=/^([a-z][a-z0-9+\-.]*):/i.exec(t);if(!n)return t;let r=n[1].toLowerCase();return[`http`,`https`,`mailto`,`tel`,`ftp`,`sms`].includes(r)?t:`#`}function f(e,t){if(t.length===0)return e;let n=new Set((e??``).split(/\s+/).map(e=>e.trim().toLowerCase()).filter(Boolean));for(let e of t)n.add(e.toLowerCase());return Array.from(n).join(` `)}var p,m,h,g=e((()=>{p=t(n(),1),i(),u(),m=r(),h=(0,p.forwardRef)(({children:e,href:t,showGlyph:n=!0,external:r=!1,className:i,target:o,rel:s,...c},l)=>{let u=d(t),p=o??(r?`_blank`:void 0),h=p===`_blank`,g=h?f(s,[`noopener`,`noreferrer`]):s,_=r&&h?`↗`:`▸`;return(0,m.jsxs)(`a`,{ref:l,href:u,target:p,rel:g,className:a(`eidotter-ilink`,r&&`eidotter-ilink--external`,i),...c,children:[(0,m.jsx)(`span`,{className:`eidotter-ilink__label`,children:e}),n&&(0,m.jsx)(`span`,{className:`eidotter-ilink__glyph`,"aria-hidden":`true`,children:_})]})}),h.displayName=`InlineLink`,h.__docgenInfo={description:'In-flow navigational anchor. Distinct from `<InlineExpand>` — this is a\ndestination, not a disclosure.\n\nRest: dotted amber underline, trailing `▸`.\nHover: phosphor inversion — amber background, dark foreground.\nVisited: dimmed amber (`--color-cga-amber-dim` → brown fallback).\nExternal: opens in a new tab safely, trailing glyph becomes `↗`.\n\nConsumer-passed `target="_blank"` is treated as implicit-external for\n`rel` safety — a `rel` is auto-applied if none is provided, preventing\ntabnabbing even when the caller doesn\'t explicitly set `external`.',methods:[],displayName:`InlineLink`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Link text.`},href:{required:!0,tsType:{name:`string`},description:`Target URL.`},showGlyph:{required:!1,tsType:{name:`boolean`},description:"Render the trailing glyph (`▸` for internal, `↗` for `external`).\nDefaults to `true`. When `false`, no glyph renders regardless of the\n`external` prop.",defaultValue:{value:`true`,computed:!1}},external:{required:!1,tsType:{name:`boolean`},description:'External link — adds `target="_blank"` and `rel="noopener noreferrer"`\n(safe tabnabbing defaults) and, when `showGlyph` is `true`, swaps the\ntrailing glyph to `↗`. `showGlyph={false}` still suppresses the glyph.',defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Extra class names merged onto the root anchor.`}},composes:[`Omit`]}})),_,v,y,b,x,S,C,w,T;e((()=>{n(),g(),c(),o(),_=r(),v={title:`Components/InlineLink`,component:h,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#020003`}]},projectMeta:s.InlineLink},tags:[`autodocs`],argTypes:{showGlyph:{control:`boolean`},external:{control:`boolean`},href:{control:`text`},children:{control:`text`}}},y={args:{href:`/about`,children:`More about me`}},b={args:{href:`https://github.com/CinimoDY/eiDotter`,children:`View on GitHub`,external:!0}},x={args:{href:`/about`,children:`About`,showGlyph:!1}},S={maxWidth:`56ch`,color:`var(--color-semantic-text-primary)`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`16px`,lineHeight:1.6},C={render:()=>(0,_.jsxs)(`p`,{style:S,children:[`This page uses a mix of inline patterns.`,` `,(0,_.jsx)(h,{href:`/timeline`,children:`Explore Timeline OS`}),` `,`is a destination — it takes you to another route. But if you want a quick explanation without leaving this page,`,` `,(0,_.jsx)(l,{content:`Timeline OS is a personal OS for your life — a unified timeline of work, projects, and history. Powered by eidotter.`,children:`tap here to reveal it inline`}),`. Both are valid; pick based on whether the user should stay or go.`]})},w={render:()=>(0,_.jsxs)(`div`,{style:{...S,display:`grid`,gap:`12px`},children:[(0,_.jsx)(`p`,{children:(0,_.jsx)(h,{href:`/about`,children:`Internal link`})}),(0,_.jsx)(`p`,{children:(0,_.jsx)(h,{href:`/about`,showGlyph:!1,children:`No trailing glyph`})}),(0,_.jsx)(`p`,{children:(0,_.jsx)(h,{href:`https://example.com`,external:!0,children:`External destination`})}),(0,_.jsx)(`p`,{style:{opacity:.8},children:`Hover each to see phosphor inversion (amber background, dark text, glyph nudge). Focus is visible with a 2px ring.`})]})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    href: '/about',
    children: 'More about me'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    href: 'https://github.com/CinimoDY/eiDotter',
    children: 'View on GitHub',
    external: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    href: '/about',
    children: 'About',
    showGlyph: false
  }
}`,...x.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <p style={prose}>
      This page uses a mix of inline patterns.{' '}
      <InlineLink href="/timeline">Explore Timeline OS</InlineLink>
      {' '}is a destination — it takes you to another route. But if you want a
      quick explanation without leaving this page,{' '}
      <InlineExpand content="Timeline OS is a personal OS for your life — a unified timeline of work, projects, and history. Powered by eidotter.">
        tap here to reveal it inline
      </InlineExpand>
      . Both are valid; pick based on whether the user should stay or go.
    </p>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    ...prose,
    display: 'grid',
    gap: '12px'
  }}>
      <p><InlineLink href="/about">Internal link</InlineLink></p>
      <p><InlineLink href="/about" showGlyph={false}>No trailing glyph</InlineLink></p>
      <p><InlineLink href="https://example.com" external>External destination</InlineLink></p>
      <p style={{
      opacity: 0.8
    }}>
        Hover each to see phosphor inversion (amber background, dark text,
        glyph nudge). Focus is visible with a 2px ring.
      </p>
    </div>
}`,...w.parameters?.docs?.source}}},T=[`Basic`,`External`,`NoGlyph`,`InProse`,`Gallery`]}))();export{y as Basic,b as External,w as Gallery,C as InProse,x as NoGlyph,T as __namedExportsOrder,v as default};