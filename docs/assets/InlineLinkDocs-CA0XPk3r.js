import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/InlineLink`}),`
`,(0,u.jsx)(n.h1,{id:`inlinelink`,children:`InlineLink`}),`
`,(0,u.jsxs)(n.p,{children:[`In-flow destination anchor for prose. Distinct from
`,(0,u.jsx)(n.a,{href:`/docs/docs-inlineexpand--docs`,children:(0,u.jsx)(n.code,{children:`InlineExpand`})}),`: this is a `,(0,u.jsx)(n.strong,{children:`link`}),`, not a
disclosure.`]}),`
`,(0,u.jsx)(n.h2,{id:`inlinelink-vs-inlineexpand`,children:`InlineLink vs InlineExpand`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Contract`}),(0,u.jsx)(n.th,{children:`Use`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`InlineLink`}),` — `,(0,u.jsx)(n.strong,{children:`destination`})]}),(0,u.jsxs)(n.td,{children:[`The user navigates elsewhere. Hover inverts to phosphor amber, trailing `,(0,u.jsx)(n.code,{children:`▸`}),` or `,(0,u.jsx)(n.code,{children:`↗`}),`.`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`InlineExpand`}),` — `,(0,u.jsx)(n.strong,{children:`disclosure`})]}),(0,u.jsx)(n.td,{children:`Content expands in place. Hover is deliberately quiet so mid-paragraph reading isn't disrupted.`})]})]})]}),`
`,(0,u.jsx)(n.p,{children:`Pick based on whether the user should stay on this page or leave it.`}),`
`,(0,u.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`import { InlineLink } from 'eidotter';

// Internal
<InlineLink href="/timeline">Explore Timeline OS</InlineLink>

// External (opens in a new tab, safe rel)
<InlineLink href="https://example.com" external>Visit site</InlineLink>

// Silent (no trailing glyph, for tight prose)
<InlineLink href="/about" showGlyph={false}>About</InlineLink>
`})}),`
`,(0,u.jsx)(n.h2,{id:`visual-contract`,children:`Visual contract`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Rest`}),`: amber label, dotted amber underline, trailing `,(0,u.jsx)(n.code,{children:`▸`}),` glyph`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Hover / focus`}),`: phosphor inversion (amber background, dark foreground), glyph nudges right 1px`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Active`}),`: bright-amber background`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Visited`}),`: dim-amber label`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`External`}),`: trailing glyph becomes `,(0,u.jsx)(n.code,{children:`↗`}),`, `,(0,u.jsx)(n.code,{children:`target="_blank"`}),`, `,(0,u.jsx)(n.code,{children:`rel="noopener noreferrer"`})]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[`Passes all native `,(0,u.jsx)(n.code,{children:`<a>`}),` attributes through`]}),`
`,(0,u.jsx)(n.li,{children:`Focus-visible 2px yellow ring at 2px offset, matching the design system focus tokens`}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.code,{children:`prefers-contrast: more`}),` switches the underline to solid 2px, drops the phosphor shift`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.code,{children:`prefers-reduced-motion: reduce`}),` disables the glyph nudge and colour transitions`]}),`
`,(0,u.jsxs)(n.li,{children:[`External links ship `,(0,u.jsx)(n.code,{children:`rel="noopener noreferrer"`}),` by default. Override only if you need to`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`href`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`— (required)`}),(0,u.jsx)(n.td,{children:`Target URL`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`children`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`ReactNode`})}),(0,u.jsx)(n.td,{children:`— (required)`}),(0,u.jsx)(n.td,{children:`Link label`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`showGlyph`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`true`})}),(0,u.jsxs)(n.td,{children:[`Render the trailing `,(0,u.jsx)(n.code,{children:`▸`}),` / `,(0,u.jsx)(n.code,{children:`↗`}),` glyph`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`external`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsxs)(n.td,{children:[`Open in new tab; glyph becomes `,(0,u.jsx)(n.code,{children:`↗`}),` and safe `,(0,u.jsx)(n.code,{children:`rel`}),` is applied`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Extra classes merged onto the anchor`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`...rest`}),(0,u.jsx)(n.td,{children:`anchor attrs`}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsxs)(n.td,{children:[`Any valid `,(0,u.jsx)(n.code,{children:`<a>`}),` attribute (`,(0,u.jsx)(n.code,{children:`target`}),`, `,(0,u.jsx)(n.code,{children:`rel`}),`, `,(0,u.jsx)(n.code,{children:`onClick`}),`, etc.)`]})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`InlineLink`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};