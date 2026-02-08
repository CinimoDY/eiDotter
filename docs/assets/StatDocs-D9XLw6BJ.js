import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as t}from"./index-JWhTtCsH.js";import{M as s}from"./blocks-a6sBqEnx.js";import"./iframe-QfvwKf1z.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BG7Dyd9P.js";import"./index-CZ7-CnlV.js";function d(r){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Docs/Stat"}),`
`,e.jsx(n.h1,{id:"stat",children:"Stat"}),`
`,e.jsx(n.p,{children:"DOS-styled metric display with optional trend indicators and CGA-authentic colors."}),`
`,e.jsx(n.p,{children:`The Stat component presents key metrics in a vertical layout with a label, a prominent\r
value, and an optional trend indicator showing direction and magnitude. Ideal for\r
dashboards, analytics panels, and at-a-glance data summaries.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Interactive demos"}),": See the ",e.jsx(n.a,{href:"/story/components-stat--default",children:"Stat stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(n.h2,{id:"trends",children:"Trends"}),`
`,e.jsx(n.p,{children:"Each trend direction maps to a distinct visual indicator:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Trend"}),e.jsx(n.th,{children:"Icon"}),e.jsx(n.th,{children:"Color"}),e.jsx(n.th,{children:"Example"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Up"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"▲"})}),e.jsx(n.td,{children:"Bright green"}),e.jsx(n.td,{children:"Revenue growth, tasks completed"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Down"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"▼"})}),e.jsx(n.td,{children:"Bright red"}),e.jsx(n.td,{children:"Error reduction, overdue items"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Neutral"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"►"})}),e.jsx(n.td,{children:"Primary text"}),e.jsx(n.td,{children:"Unchanged metrics"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Stat label="Completed" value="18" trend="up" trendValue="+12%" />\r
<Stat label="Overdue" value="3" trend="down" trendValue="-2" />\r
<Stat label="In Progress" value="5" trend="neutral" trendValue="0%" />
`})}),`
`,e.jsx(n.h2,{id:"sizes",children:"Sizes"}),`
`,e.jsx(n.p,{children:"Three sizes following an 8px spacing grid:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Size"}),e.jsx(n.th,{children:"Label Font"}),e.jsx(n.th,{children:"Value Font"}),e.jsx(n.th,{children:"Gap"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"small"})}),e.jsx(n.td,{children:"10px"}),e.jsx(n.td,{children:"18px"}),e.jsx(n.td,{children:"2px"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"medium"})}),e.jsx(n.td,{children:"11px"}),e.jsx(n.td,{children:"24px"}),e.jsx(n.td,{children:"4px"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"large"})}),e.jsx(n.td,{children:"12px"}),e.jsx(n.td,{children:"32px"}),e.jsx(n.td,{children:"6px"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Stat label="Focus Time" value="2.5h" size="small" />\r
<Stat label="Focus Time" value="2.5h" size="medium" />\r
<Stat label="Focus Time" value="2.5h" size="large" />
`})}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(n.h3,{id:"with-trend",children:"With Trend"}),`
`,e.jsxs(n.p,{children:[`Displays a trend indicator beneath the value. The trend icon and optional trend value\r
are wrapped in a single `,e.jsx(n.code,{children:"aria-label"})," describing direction and magnitude for screen readers."]}),`
`,e.jsx(n.h3,{id:"without-trend",children:"Without Trend"}),`
`,e.jsx(n.p,{children:`Minimal layout showing only the label and value. Useful for static metrics that\r
do not change over time.`}),`
`,e.jsx(n.h3,{id:"numeric-formats",children:"Numeric Formats"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"value"})," prop accepts both strings and numbers, supporting flexible formatting:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Stat label="Count" value={1234} />\r
<Stat label="Percentage" value="87%" />\r
<Stat label="Currency" value="$1,250" />\r
<Stat label="Time" value="04:32" />
`})}),`
`,e.jsx(n.h2,{id:"dashboard-usage",children:"Dashboard Usage"}),`
`,e.jsx(n.p,{children:"Stat components work well in grid layouts for dashboard panels:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>\r
  <Stat label="Pomodoros Today" value="6" trend="up" trendValue="+2" />\r
  <Stat label="Focus Time" value="3.5h" trend="up" trendValue="+45m" />\r
  <Stat label="Tasks Done" value="12" trend="neutral" trendValue="same" />\r
  <Stat label="Breaks Taken" value="5" trend="down" trendValue="-1" />\r
</div>
`})}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Trend labeling"}),": Trend indicators include ",e.jsx(n.code,{children:"aria-label"})," describing direction (increasing, decreasing, unchanged) and value"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Trend icons"}),": Marked ",e.jsx(n.code,{children:'aria-hidden="true"'})," since they are decorative alongside the aria-label"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"High contrast"}),": Font weight increases to 700 for value and trend text via ",e.jsx(n.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Reduced motion"}),": All transitions disabled via ",e.jsx(n.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tabular numbers"}),": Values use ",e.jsx(n.code,{children:"font-variant-numeric: tabular-nums"})," for consistent alignment"]}),`
`]}),`
`,e.jsx(n.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"label"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"The label describing the metric (required)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string | number"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"The metric value to display (required)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"trend"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'up' | 'down' | 'neutral'"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Optional trend direction indicator"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"trendValue"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:'Optional trend magnitude (e.g., "+5%", "-12")'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"size"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'small' | 'medium' | 'large'"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'medium'"})}),e.jsx(n.td,{children:"Size variant"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"className"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"''"})}),e.jsx(n.td,{children:"Additional CSS classes"})]})]})]}),`
`,e.jsx(n.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Token"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-primary"})}),e.jsx(n.td,{children:"Label text and neutral trend color"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-accent"})}),e.jsx(n.td,{children:"Value text (amber accent)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-bright-green"})}),e.jsx(n.td,{children:"Upward trend color"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-bright-red"})}),e.jsx(n.td,{children:"Downward trend color"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--typography-font-family-primary"})}),e.jsx(n.td,{children:"DOS font family"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--typography-font-weight-bold"})}),e.jsx(n.td,{children:"Value font weight"})]})]})]})]})}function j(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(d,{...r})}):d(r)}export{j as default};
