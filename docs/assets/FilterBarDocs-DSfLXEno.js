import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/FilterBar`}),`
`,(0,u.jsx)(n.h1,{id:`filterbar`,children:`FilterBar`}),`
`,(0,u.jsx)(n.p,{children:`Multi-select toggle toolbar for faceted filtering.`}),`
`,(0,u.jsx)(n.p,{children:`FilterBar renders a horizontal row of toggle buttons following the WAI-ARIA toolbar\r
pattern with roving tabindex. Users can activate multiple filters simultaneously.\r
Designed for filter UIs in timeline and content management views.`}),`
`,(0,u.jsxs)(n.blockquote,{children:[`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(n.a,{href:`/story/components-filterbar--default`,children:`FilterBar stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`basic-usage`,children:`Basic usage`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`import { FilterBar } from 'eidotter';\r
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
`,(0,u.jsx)(n.h2,{id:`keyboard-navigation`,children:`Keyboard navigation`}),`
`,(0,u.jsx)(n.p,{children:`FilterBar implements roving tabindex per WAI-ARIA toolbar pattern:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Key`}),(0,u.jsx)(n.th,{children:`Action`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Arrow Right / Down`}),(0,u.jsx)(n.td,{children:`Move focus to next item`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Arrow Left / Up`}),(0,u.jsx)(n.td,{children:`Move focus to previous item`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Home`}),(0,u.jsx)(n.td,{children:`Move focus to first item`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`End`}),(0,u.jsx)(n.td,{children:`Move focus to last item`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Enter / Space`}),(0,u.jsx)(n.td,{children:`Toggle active state`})]})]})]}),`
`,(0,u.jsxs)(n.p,{children:[`Only the focused item has `,(0,u.jsx)(n.code,{children:`tabIndex={0}`}),`; all others have `,(0,u.jsx)(n.code,{children:`tabIndex={-1}`}),`.\r
Tab enters the toolbar, arrows move within it, and Tab exits.`]}),`
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Role`}),`: `,(0,u.jsx)(n.code,{children:`role="toolbar"`}),` on container with `,(0,u.jsx)(n.code,{children:`aria-label`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Items`}),`: `,(0,u.jsx)(n.code,{children:`role="button"`}),` with `,(0,u.jsx)(n.code,{children:`aria-pressed`}),` for toggle state`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Roving tabindex`}),`: Single tab stop with arrow key navigation`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`High contrast`}),`: 2px borders, no glow`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Reduced motion`}),`: Transitions disabled`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`items`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`FilterBarItem[]`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsxs)(n.td,{children:[`Array of `,(0,u.jsx)(n.code,{children:`{ id, label }`}),` toggle items`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`activeIds`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string[]`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`[]`})}),(0,u.jsx)(n.td,{children:`Currently active item IDs`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onToggle`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`(id: string) => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Called when an item is toggled`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`size`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'small' | 'medium'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'medium'`})}),(0,u.jsx)(n.td,{children:`Button dimensions`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`''`})}),(0,u.jsx)(n.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`aria-label`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Accessible toolbar label`})]})]})]}),`
`,(0,u.jsx)(n.h3,{id:`filterbaritem`,children:`FilterBarItem`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-ts`,children:`interface FilterBarItem {\r
  id: string;\r
  label: string;\r
}
`})}),`
`,(0,u.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Token`}),(0,u.jsx)(n.th,{children:`Purpose`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(n.td,{children:`Item text`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(n.td,{children:`Item border`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-background-accent`})}),(0,u.jsx)(n.td,{children:`Active item fill`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-on-accent`})}),(0,u.jsx)(n.td,{children:`Active item text`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(n.td,{children:`Focus outline`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--shadow-glow-xs`})}),(0,u.jsx)(n.td,{children:`Active item glow`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`FilterBar`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};