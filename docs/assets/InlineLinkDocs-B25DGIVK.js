import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/InlineLink`}),`
`,(0,u.jsx)(r.h1,{id:`inlinelink`,children:`InlineLink`}),`
`,(0,u.jsxs)(r.p,{children:[`In-flow destination anchor for prose. Distinct from
`,(0,u.jsx)(r.a,{href:`/docs/docs-inlineexpand--docs`,children:(0,u.jsx)(r.code,{children:`InlineExpand`})}),`: this is a `,(0,u.jsx)(r.strong,{children:`link`}),`, not a
disclosure.`]}),`
`,(0,u.jsx)(r.h2,{id:`inlinelink-vs-inlineexpand`,children:`InlineLink vs InlineExpand`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Contract`}),(0,u.jsx)(r.th,{children:`Use`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsxs)(r.td,{children:[(0,u.jsx)(r.code,{children:`InlineLink`}),` — `,(0,u.jsx)(r.strong,{children:`destination`})]}),(0,u.jsxs)(r.td,{children:[`The user navigates elsewhere. Hover inverts to phosphor amber, trailing `,(0,u.jsx)(r.code,{children:`▸`}),` or `,(0,u.jsx)(r.code,{children:`↗`}),`.`]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsxs)(r.td,{children:[(0,u.jsx)(r.code,{children:`InlineExpand`}),` — `,(0,u.jsx)(r.strong,{children:`disclosure`})]}),(0,u.jsx)(r.td,{children:`Content expands in place. Hover is deliberately quiet so mid-paragraph reading isn't disrupted.`})]})]})]}),`
`,(0,u.jsx)(r.p,{children:`Pick based on whether the user should stay on this page or leave it.`}),`
`,(0,u.jsx)(r.h2,{id:`usage`,children:`Usage`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`import { InlineLink } from 'eidotter';

// Internal
<InlineLink href="/timeline">Explore Timeline OS</InlineLink>

// External (opens in a new tab, safe rel)
<InlineLink href="https://example.com" external>Visit site</InlineLink>

// Silent (no trailing glyph, for tight prose)
<InlineLink href="/about" showGlyph={false}>About</InlineLink>
`})}),`
`,(0,u.jsx)(r.h2,{id:`visual-contract`,children:`Visual contract`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Rest`}),`: amber label, dotted amber underline, trailing `,(0,u.jsx)(r.code,{children:`▸`}),` glyph`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Hover / focus`}),`: phosphor inversion — amber background, dark foreground, glyph nudges right 1px`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Active`}),`: bright-amber background`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Visited`}),`: dim-amber label`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`External`}),`: trailing glyph becomes `,(0,u.jsx)(r.code,{children:`↗`}),`, `,(0,u.jsx)(r.code,{children:`target="_blank"`}),`, `,(0,u.jsx)(r.code,{children:`rel="noopener noreferrer"`})]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[`Passes all native `,(0,u.jsx)(r.code,{children:`<a>`}),` attributes through`]}),`
`,(0,u.jsx)(r.li,{children:`Focus-visible 2px yellow ring at 2px offset, matching the design system focus tokens`}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.code,{children:`prefers-contrast: more`}),` switches the underline to solid 2px, drops the phosphor shift`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`}),` disables the glyph nudge and colour transitions`]}),`
`,(0,u.jsxs)(r.li,{children:[`External links ship `,(0,u.jsx)(r.code,{children:`rel="noopener noreferrer"`}),` by default — override only if you know you need to`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`href`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`— (required)`}),(0,u.jsx)(r.td,{children:`Target URL`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`children`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ReactNode`})}),(0,u.jsx)(r.td,{children:`— (required)`}),(0,u.jsx)(r.td,{children:`Link label`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`showGlyph`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsxs)(r.td,{children:[`Render the trailing `,(0,u.jsx)(r.code,{children:`▸`}),` / `,(0,u.jsx)(r.code,{children:`↗`}),` glyph`]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`external`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsxs)(r.td,{children:[`Open in new tab; glyph becomes `,(0,u.jsx)(r.code,{children:`↗`}),` and safe `,(0,u.jsx)(r.code,{children:`rel`}),` is applied`]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Extra classes merged onto the anchor`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:`...rest`}),(0,u.jsx)(r.td,{children:`anchor attrs`}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsxs)(r.td,{children:[`Any valid `,(0,u.jsx)(r.code,{children:`<a>`}),` attribute (`,(0,u.jsx)(r.code,{children:`target`}),`, `,(0,u.jsx)(r.code,{children:`rel`}),`, `,(0,u.jsx)(r.code,{children:`onClick`}),`, etc.)`]})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`InlineLink`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};