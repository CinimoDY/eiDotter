import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/Stat`}),`
`,(0,u.jsx)(n.h1,{id:`stat`,children:`Stat`}),`
`,(0,u.jsx)(n.p,{children:`DOS-styled metric display with optional trend indicators and CGA colors.`}),`
`,(0,u.jsx)(n.p,{children:`The Stat component shows a metric in a vertical layout: a label, a large value, and an\r
optional trend indicator with direction and magnitude. Use it in dashboards, analytics\r
panels, and data summaries.`}),`
`,(0,u.jsxs)(n.blockquote,{children:[`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(n.a,{href:`/story/components-stat--default`,children:`Stat stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`trends`,children:`Trends`}),`
`,(0,u.jsx)(n.p,{children:`Each trend direction has its own icon and color:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Trend`}),(0,u.jsx)(n.th,{children:`Icon`}),(0,u.jsx)(n.th,{children:`Color`}),(0,u.jsx)(n.th,{children:`Example`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Up`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`▲`})}),(0,u.jsx)(n.td,{children:`Bright green`}),(0,u.jsx)(n.td,{children:`Revenue growth, tasks completed`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Down`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`▼`})}),(0,u.jsx)(n.td,{children:`Bright red`}),(0,u.jsx)(n.td,{children:`Error reduction, overdue items`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Neutral`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`►`})}),(0,u.jsx)(n.td,{children:`Primary text`}),(0,u.jsx)(n.td,{children:`Unchanged metrics`})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Stat label="Completed" value="18" trend="up" trendValue="+12%" />\r
<Stat label="Overdue" value="3" trend="down" trendValue="-2" />\r
<Stat label="In Progress" value="5" trend="neutral" trendValue="0%" />
`})}),`
`,(0,u.jsx)(n.h2,{id:`sizes`,children:`Sizes`}),`
`,(0,u.jsx)(n.p,{children:`Three sizes following an 8px spacing grid:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Size`}),(0,u.jsx)(n.th,{children:`Label Font`}),(0,u.jsx)(n.th,{children:`Value Font`}),(0,u.jsx)(n.th,{children:`Gap`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`small`})}),(0,u.jsx)(n.td,{children:`10px`}),(0,u.jsx)(n.td,{children:`18px`}),(0,u.jsx)(n.td,{children:`2px`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`medium`})}),(0,u.jsx)(n.td,{children:`11px`}),(0,u.jsx)(n.td,{children:`24px`}),(0,u.jsx)(n.td,{children:`4px`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`large`})}),(0,u.jsx)(n.td,{children:`12px`}),(0,u.jsx)(n.td,{children:`32px`}),(0,u.jsx)(n.td,{children:`6px`})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Stat label="Focus Time" value="2.5h" size="small" />\r
<Stat label="Focus Time" value="2.5h" size="medium" />\r
<Stat label="Focus Time" value="2.5h" size="large" />
`})}),`
`,(0,u.jsx)(n.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(n.h3,{id:`with-trend`,children:`With trend`}),`
`,(0,u.jsxs)(n.p,{children:[`Displays a trend indicator beneath the value. The trend icon and optional trend value\r
are wrapped in a single `,(0,u.jsx)(n.code,{children:`aria-label`}),` describing direction and magnitude for screen readers.`]}),`
`,(0,u.jsx)(n.h3,{id:`without-trend`,children:`Without trend`}),`
`,(0,u.jsx)(n.p,{children:`Shows only the label and value. Use it for metrics that do not change over time.`}),`
`,(0,u.jsx)(n.h3,{id:`numeric-formats`,children:`Numeric formats`}),`
`,(0,u.jsxs)(n.p,{children:[`The `,(0,u.jsx)(n.code,{children:`value`}),` prop accepts strings and numbers, so you can pass a preformatted value:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Stat label="Count" value={1234} />\r
<Stat label="Percentage" value="87%" />\r
<Stat label="Currency" value="$1,250" />\r
<Stat label="Time" value="04:32" />
`})}),`
`,(0,u.jsx)(n.h2,{id:`dashboard-usage`,children:`Dashboard usage`}),`
`,(0,u.jsx)(n.p,{children:`Place Stats in a grid for dashboard panels:`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>\r
  <Stat label="Pomodoros Today" value="6" trend="up" trendValue="+2" />\r
  <Stat label="Focus Time" value="3.5h" trend="up" trendValue="+45m" />\r
  <Stat label="Tasks Done" value="12" trend="neutral" trendValue="same" />\r
  <Stat label="Breaks Taken" value="5" trend="down" trendValue="-1" />\r
</div>
`})}),`
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Trend labeling`}),`: Trend indicators include `,(0,u.jsx)(n.code,{children:`aria-label`}),` describing direction (increasing, decreasing, unchanged) and value`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Trend icons`}),`: Marked `,(0,u.jsx)(n.code,{children:`aria-hidden="true"`}),` since they are decorative alongside the aria-label`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`High contrast`}),`: Font weight increases to 700 for value and trend text via `,(0,u.jsx)(n.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Reduced motion`}),`: All transitions disabled via `,(0,u.jsx)(n.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Tabular numbers`}),`: Values use `,(0,u.jsx)(n.code,{children:`font-variant-numeric: tabular-nums`}),` for consistent alignment`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`label`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`The label describing the metric (required)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`value`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string | number`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`The metric value to display (required)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`trend`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'up' | 'down' | 'neutral'`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Optional trend direction indicator`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`trendValue`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Optional trend magnitude (e.g., "+5%", "-12")`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`size`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'small' | 'medium' | 'large'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'medium'`})}),(0,u.jsx)(n.td,{children:`Size variant`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`''`})}),(0,u.jsx)(n.td,{children:`Additional CSS classes`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Token`}),(0,u.jsx)(n.th,{children:`Purpose`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(n.td,{children:`Label text and neutral trend color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-accent`})}),(0,u.jsx)(n.td,{children:`Value text (amber accent)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-success`})}),(0,u.jsx)(n.td,{children:`Upward trend color (amber under the default amber-mono theme; honest green under colour themes)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-error`})}),(0,u.jsx)(n.td,{children:`Downward trend color (amber under amber-mono; honest red under colour themes)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(n.td,{children:`DOS font family`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-weight-bold`})}),(0,u.jsx)(n.td,{children:`Value font weight`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Stat`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};