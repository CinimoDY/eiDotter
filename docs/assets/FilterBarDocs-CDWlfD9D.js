import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/FilterBar`}),`
`,(0,u.jsx)(r.h1,{id:`filterbar`,children:`FilterBar`}),`
`,(0,u.jsx)(r.p,{children:`Multi-select toggle toolbar for faceted filtering.`}),`
`,(0,u.jsx)(r.p,{children:`FilterBar renders a horizontal row of toggle buttons following the WAI-ARIA toolbar\r
pattern with roving tabindex. Users can activate multiple filters simultaneously.\r
Designed for filter UIs in Lifelines timeline and content management views.`}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-filterbar--default`,children:`FilterBar stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`import { FilterBar } from 'eidotter';\r
\r
const items = [\r
  { id: 'all', label: 'All' },\r
  { id: 'photos', label: 'Photos' },\r
  { id: 'notes', label: 'Notes' },\r
];\r
\r
<FilterBar\r
  items={items}\r
  activeIds={['all']}\r
  onToggle={(id) => toggleFilter(id)}\r
/>
`})}),`
`,(0,u.jsx)(r.h2,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,u.jsx)(r.p,{children:`FilterBar implements roving tabindex per WAI-ARIA toolbar pattern:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Key`}),(0,u.jsx)(r.th,{children:`Action`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:`Arrow Right / Down`}),(0,u.jsx)(r.td,{children:`Move focus to next item`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:`Arrow Left / Up`}),(0,u.jsx)(r.td,{children:`Move focus to previous item`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:`Home`}),(0,u.jsx)(r.td,{children:`Move focus to first item`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:`End`}),(0,u.jsx)(r.td,{children:`Move focus to last item`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:`Enter / Space`}),(0,u.jsx)(r.td,{children:`Toggle active state`})]})]})]}),`
`,(0,u.jsxs)(r.p,{children:[`Only the focused item has `,(0,u.jsx)(r.code,{children:`tabIndex={0}`}),`; all others have `,(0,u.jsx)(r.code,{children:`tabIndex={-1}`}),`.\r
This means Tab enters the toolbar, arrows navigate within, and Tab exits.`]}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Role`}),`: `,(0,u.jsx)(r.code,{children:`role="toolbar"`}),` on container with `,(0,u.jsx)(r.code,{children:`aria-label`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Items`}),`: `,(0,u.jsx)(r.code,{children:`role="button"`}),` with `,(0,u.jsx)(r.code,{children:`aria-pressed`}),` for toggle state`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Roving tabindex`}),`: Single tab stop with arrow key navigation`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`High contrast`}),`: 2px borders, no glow`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Reduced motion`}),`: Transitions disabled`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`items`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`FilterBarItem[]`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsxs)(r.td,{children:[`Array of `,(0,u.jsx)(r.code,{children:`{ id, label }`}),` toggle items`]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`activeIds`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string[]`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`[]`})}),(0,u.jsx)(r.td,{children:`Currently active item IDs`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onToggle`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`(id: string) => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Called when an item is toggled`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`size`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'small' | 'medium'`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'medium'`})}),(0,u.jsx)(r.td,{children:`Button dimensions`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`''`})}),(0,u.jsx)(r.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`aria-label`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Accessible toolbar label`})]})]})]}),`
`,(0,u.jsx)(r.h3,{id:`filterbaritem`,children:`FilterBarItem`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-ts`,children:`interface FilterBarItem {\r
  id: string;\r
  label: string;\r
}
`})}),`
`,(0,u.jsx)(r.h2,{id:`design-tokens-used`,children:`Design Tokens Used`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Token`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(r.td,{children:`Item text`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(r.td,{children:`Item border`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-accent`})}),(0,u.jsx)(r.td,{children:`Active item fill`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-secondary`})}),(0,u.jsx)(r.td,{children:`Active item text`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(r.td,{children:`Focus outline`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--shadow-glow-xs`})}),(0,u.jsx)(r.td,{children:`Active item glow`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`FilterBar`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};