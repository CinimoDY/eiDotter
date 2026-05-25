import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/Stat`}),`
`,(0,u.jsx)(r.h1,{id:`stat`,children:`Stat`}),`
`,(0,u.jsx)(r.p,{children:`DOS-styled metric display with optional trend indicators and CGA-authentic colors.`}),`
`,(0,u.jsx)(r.p,{children:`The Stat component presents key metrics in a vertical layout with a label, a prominent\r
value, and an optional trend indicator showing direction and magnitude. Ideal for\r
dashboards, analytics panels, and at-a-glance data summaries.`}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-stat--default`,children:`Stat stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`trends`,children:`Trends`}),`
`,(0,u.jsx)(r.p,{children:`Each trend direction maps to a distinct visual indicator:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Trend`}),(0,u.jsx)(r.th,{children:`Icon`}),(0,u.jsx)(r.th,{children:`Color`}),(0,u.jsx)(r.th,{children:`Example`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Up`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`▲`})}),(0,u.jsx)(r.td,{children:`Bright green`}),(0,u.jsx)(r.td,{children:`Revenue growth, tasks completed`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Down`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`▼`})}),(0,u.jsx)(r.td,{children:`Bright red`}),(0,u.jsx)(r.td,{children:`Error reduction, overdue items`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Neutral`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`►`})}),(0,u.jsx)(r.td,{children:`Primary text`}),(0,u.jsx)(r.td,{children:`Unchanged metrics`})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Stat label="Completed" value="18" trend="up" trendValue="+12%" />\r
<Stat label="Overdue" value="3" trend="down" trendValue="-2" />\r
<Stat label="In Progress" value="5" trend="neutral" trendValue="0%" />
`})}),`
`,(0,u.jsx)(r.h2,{id:`sizes`,children:`Sizes`}),`
`,(0,u.jsx)(r.p,{children:`Three sizes following an 8px spacing grid:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Size`}),(0,u.jsx)(r.th,{children:`Label Font`}),(0,u.jsx)(r.th,{children:`Value Font`}),(0,u.jsx)(r.th,{children:`Gap`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`small`})}),(0,u.jsx)(r.td,{children:`10px`}),(0,u.jsx)(r.td,{children:`18px`}),(0,u.jsx)(r.td,{children:`2px`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`medium`})}),(0,u.jsx)(r.td,{children:`11px`}),(0,u.jsx)(r.td,{children:`24px`}),(0,u.jsx)(r.td,{children:`4px`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`large`})}),(0,u.jsx)(r.td,{children:`12px`}),(0,u.jsx)(r.td,{children:`32px`}),(0,u.jsx)(r.td,{children:`6px`})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Stat label="Focus Time" value="2.5h" size="small" />\r
<Stat label="Focus Time" value="2.5h" size="medium" />\r
<Stat label="Focus Time" value="2.5h" size="large" />
`})}),`
`,(0,u.jsx)(r.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(r.h3,{id:`with-trend`,children:`With Trend`}),`
`,(0,u.jsxs)(r.p,{children:[`Displays a trend indicator beneath the value. The trend icon and optional trend value\r
are wrapped in a single `,(0,u.jsx)(r.code,{children:`aria-label`}),` describing direction and magnitude for screen readers.`]}),`
`,(0,u.jsx)(r.h3,{id:`without-trend`,children:`Without Trend`}),`
`,(0,u.jsx)(r.p,{children:`Minimal layout showing only the label and value. Useful for static metrics that\r
do not change over time.`}),`
`,(0,u.jsx)(r.h3,{id:`numeric-formats`,children:`Numeric Formats`}),`
`,(0,u.jsxs)(r.p,{children:[`The `,(0,u.jsx)(r.code,{children:`value`}),` prop accepts both strings and numbers, supporting flexible formatting:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Stat label="Count" value={1234} />\r
<Stat label="Percentage" value="87%" />\r
<Stat label="Currency" value="$1,250" />\r
<Stat label="Time" value="04:32" />
`})}),`
`,(0,u.jsx)(r.h2,{id:`dashboard-usage`,children:`Dashboard Usage`}),`
`,(0,u.jsx)(r.p,{children:`Stat components work well in grid layouts for dashboard panels:`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>\r
  <Stat label="Pomodoros Today" value="6" trend="up" trendValue="+2" />\r
  <Stat label="Focus Time" value="3.5h" trend="up" trendValue="+45m" />\r
  <Stat label="Tasks Done" value="12" trend="neutral" trendValue="same" />\r
  <Stat label="Breaks Taken" value="5" trend="down" trendValue="-1" />\r
</div>
`})}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Trend labeling`}),`: Trend indicators include `,(0,u.jsx)(r.code,{children:`aria-label`}),` describing direction (increasing, decreasing, unchanged) and value`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Trend icons`}),`: Marked `,(0,u.jsx)(r.code,{children:`aria-hidden="true"`}),` since they are decorative alongside the aria-label`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`High contrast`}),`: Font weight increases to 700 for value and trend text via `,(0,u.jsx)(r.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Reduced motion`}),`: All transitions disabled via `,(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Tabular numbers`}),`: Values use `,(0,u.jsx)(r.code,{children:`font-variant-numeric: tabular-nums`}),` for consistent alignment`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`label`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`The label describing the metric (required)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`value`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string | number`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`The metric value to display (required)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`trend`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'up' | 'down' | 'neutral'`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Optional trend direction indicator`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`trendValue`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Optional trend magnitude (e.g., "+5%", "-12")`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`size`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'small' | 'medium' | 'large'`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'medium'`})}),(0,u.jsx)(r.td,{children:`Size variant`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`''`})}),(0,u.jsx)(r.td,{children:`Additional CSS classes`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`design-tokens-used`,children:`Design Tokens Used`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Token`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(r.td,{children:`Label text and neutral trend color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-accent`})}),(0,u.jsx)(r.td,{children:`Value text (amber accent)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-cga-bright-green`})}),(0,u.jsx)(r.td,{children:`Upward trend color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-cga-bright-red`})}),(0,u.jsx)(r.td,{children:`Downward trend color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(r.td,{children:`DOS font family`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-weight-bold`})}),(0,u.jsx)(r.td,{children:`Value font weight`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Stat`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};