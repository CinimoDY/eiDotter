import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{r,t as i}from"./registry-EhIcK3QA.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./cn-CHNjZLmO.js";import{n as c,t as l}from"./isSafeHref-C3uNgdiy.js";import{n as u,t as d}from"./InlineExpand-BZUWxhHK.js";function f(e){let t=e.trim();return t===``||c(t,{extraSchemes:[`tel`,`ftp`,`sms`]})?t:`#`}function p(e,t){if(t.length===0)return e;let n=new Set((e??``).split(/\s+/).map(e=>e.trim().toLowerCase()).filter(Boolean));for(let e of t)n.add(e.toLowerCase());return Array.from(n).join(` `)}var m,h,g;function _(){return(_=t((()=>{m=e(n(),1),o(),l(),h=a(),g=(0,m.forwardRef)(({children:e,href:t,showGlyph:n=!0,external:r=!1,className:i,target:a,rel:o,...c},l)=>{let u=f(t),d=a??(r?`_blank`:void 0),m=d===`_blank`,g=m?p(o,[`noopener`,`noreferrer`]):o,_=r&&m?`↗`:`▸`;return(0,h.jsxs)(`a`,{ref:l,href:u,target:d,rel:g,className:s(`eidotter-ilink`,r&&`eidotter-ilink--external`,i),...c,children:[(0,h.jsx)(`span`,{className:`eidotter-ilink__label`,children:e}),n&&(0,h.jsx)(`span`,{className:`eidotter-ilink__glyph`,"aria-hidden":`true`,children:_})]})}),g.displayName=`InlineLink`,g.__docgenInfo={description:'In-flow navigational anchor. Distinct from `<InlineExpand>` — this is a\ndestination, not a disclosure.\n\nRest: dotted amber underline, trailing `▸`.\nHover: phosphor inversion — amber background, dark foreground.\nVisited: dimmed amber (`text.tertiary` role; amber-dim under the default theme).\nExternal: opens in a new tab safely, trailing glyph becomes `↗`.\n\nConsumer-passed `target="_blank"` is treated as implicit-external for\n`rel` safety — a `rel` is auto-applied if none is provided, preventing\ntabnabbing even when the caller doesn\'t explicitly set `external`.',methods:[],displayName:`InlineLink`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Link text.`},href:{required:!0,tsType:{name:`string`},description:`Target URL.`},showGlyph:{required:!1,tsType:{name:`boolean`},description:"Render the trailing glyph (`▸` for internal, `↗` for `external`).\nDefaults to `true`. When `false`, no glyph renders regardless of the\n`external` prop.",defaultValue:{value:`true`,computed:!1}},external:{required:!1,tsType:{name:`boolean`},description:'External link — adds `target="_blank"` and `rel="noopener noreferrer"`\n(safe tabnabbing defaults) and, when `showGlyph` is `true`, swaps the\ntrailing glyph to `↗`. `showGlyph={false}` still suppresses the glyph.',defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Extra class names merged onto the root anchor.`}},composes:[`Omit`]}})))()}var v,y,b,x,S,C,w,T,E;function D(){return(D=t((()=>{n(),_(),u(),r(),v=a(),y={title:`Components/InlineLink`,component:g,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#020003`}]},projectMeta:i.InlineLink},tags:[`autodocs`],argTypes:{showGlyph:{control:`boolean`},external:{control:`boolean`},href:{control:`text`},children:{control:`text`}}},b={args:{href:`/about`,children:`More about me`}},x={args:{href:`https://github.com/CinimoDY/eiDotter`,children:`View on GitHub`,external:!0}},S={args:{href:`/about`,children:`About`,showGlyph:!1}},C={maxWidth:`56ch`,color:`var(--color-semantic-text-primary)`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`16px`,lineHeight:1.6},w={render:()=>(0,v.jsxs)(`p`,{style:C,children:[`This page uses a mix of inline patterns.`,` `,(0,v.jsx)(g,{href:`/timeline`,children:`Explore Timeline OS`}),` `,`is a destination — it takes you to another route. But if you want a quick explanation without leaving this page,`,` `,(0,v.jsx)(d,{content:`Timeline OS is a personal OS for your life — a unified timeline of work, projects, and history. Powered by eidotter.`,children:`tap here to reveal it inline`}),`. Both are valid; pick based on whether the user should stay or go.`]})},T={render:()=>(0,v.jsxs)(`div`,{style:{...C,display:`grid`,gap:`12px`},children:[(0,v.jsx)(`p`,{children:(0,v.jsx)(g,{href:`/about`,children:`Internal link`})}),(0,v.jsx)(`p`,{children:(0,v.jsx)(g,{href:`/about`,showGlyph:!1,children:`No trailing glyph`})}),(0,v.jsx)(`p`,{children:(0,v.jsx)(g,{href:`https://example.com`,external:!0,children:`External destination`})}),(0,v.jsx)(`p`,{style:{opacity:.8},children:`Hover each to see phosphor inversion (amber background, dark text, glyph nudge). Focus is visible with a 2px ring.`})]})},E=[`Basic`,`External`,`NoGlyph`,`InProse`,`Gallery`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    href: '/about',
    children: 'More about me'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    href: 'https://github.com/CinimoDY/eiDotter',
    children: 'View on GitHub',
    external: true
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    href: '/about',
    children: 'About',
    showGlyph: false
  }
}`,...S.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}}})))()}D();export{b as Basic,x as External,T as Gallery,w as InProse,S as NoGlyph,E as __namedExportsOrder,y as default};