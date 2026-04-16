import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as t,M as s}from"./blocks-BAJK2Xxh.js";import{C as d}from"./ComponentOrigin-BogxVIkj.js";import"./preload-helper-Dp1pzeXC.js";import"./iframe-DuFfgGUU.js";import"./index-CjOovKeQ.js";import"./index-BOb-1P7R.js";import"./index-CFke79mk.js";import"./registry-CyM9n0D0.js";function n(i){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Docs/FilterBar"}),`
`,e.jsx(r.h1,{id:"filterbar",children:"FilterBar"}),`
`,e.jsx(r.p,{children:"Multi-select toggle toolbar for faceted filtering."}),`
`,e.jsx(r.p,{children:`FilterBar renders a horizontal row of toggle buttons following the WAI-ARIA toolbar\r
pattern with roving tabindex. Users can activate multiple filters simultaneously.\r
Designed for filter UIs in Lifelines timeline and content management views.`}),`
`,e.jsxs(r.blockquote,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Interactive demos"}),": See the ",e.jsx(r.a,{href:"/story/components-filterbar--default",children:"FilterBar stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(r.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`import { FilterBar } from 'eidotter';\r
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
`,e.jsx(r.h2,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsx(r.p,{children:"FilterBar implements roving tabindex per WAI-ARIA toolbar pattern:"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Key"}),e.jsx(r.th,{children:"Action"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Arrow Right / Down"}),e.jsx(r.td,{children:"Move focus to next item"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Arrow Left / Up"}),e.jsx(r.td,{children:"Move focus to previous item"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Home"}),e.jsx(r.td,{children:"Move focus to first item"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"End"}),e.jsx(r.td,{children:"Move focus to last item"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Enter / Space"}),e.jsx(r.td,{children:"Toggle active state"})]})]})]}),`
`,e.jsxs(r.p,{children:["Only the focused item has ",e.jsx(r.code,{children:"tabIndex={0}"}),"; all others have ",e.jsx(r.code,{children:"tabIndex={-1}"}),`.\r
This means Tab enters the toolbar, arrows navigate within, and Tab exits.`]}),`
`,e.jsx(r.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Role"}),": ",e.jsx(r.code,{children:'role="toolbar"'})," on container with ",e.jsx(r.code,{children:"aria-label"})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Items"}),": ",e.jsx(r.code,{children:'role="button"'})," with ",e.jsx(r.code,{children:"aria-pressed"})," for toggle state"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Roving tabindex"}),": Single tab stop with arrow key navigation"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"High contrast"}),": 2px borders, no glow"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Reduced motion"}),": Transitions disabled"]}),`
`]}),`
`,e.jsx(r.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"items"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"FilterBarItem[]"})}),e.jsx(r.td,{children:"—"}),e.jsxs(r.td,{children:["Array of ",e.jsx(r.code,{children:"{ id, label }"})," toggle items"]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"activeIds"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string[]"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"[]"})}),e.jsx(r.td,{children:"Currently active item IDs"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"onToggle"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"(id: string) => void"})}),e.jsx(r.td,{children:"—"}),e.jsx(r.td,{children:"Called when an item is toggled"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"size"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"'small' | 'medium'"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"'medium'"})}),e.jsx(r.td,{children:"Button dimensions"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"className"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"''"})}),e.jsx(r.td,{children:"Additional CSS classes"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"aria-label"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:"—"}),e.jsx(r.td,{children:"Accessible toolbar label"})]})]})]}),`
`,e.jsx(r.h3,{id:"filterbaritem",children:"FilterBarItem"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-ts",children:`interface FilterBarItem {\r
  id: string;\r
  label: string;\r
}
`})}),`
`,e.jsx(r.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Token"}),e.jsx(r.th,{children:"Purpose"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-text-primary"})}),e.jsx(r.td,{children:"Item text"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-border-default"})}),e.jsx(r.td,{children:"Item border"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-background-accent"})}),e.jsx(r.td,{children:"Active item fill"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-text-secondary"})}),e.jsx(r.td,{children:"Active item text"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-border-focus"})}),e.jsx(r.td,{children:"Focus outline"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--shadow-glow-xs"})}),e.jsx(r.td,{children:"Active item glow"})]})]})]}),`
`,e.jsx(r.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(d,{name:"FilterBar"})]})}function b(i={}){const{wrapper:r}={...t(),...i.components};return r?e.jsx(r,{...i,children:e.jsx(n,{...i})}):n(i)}export{b as default};
