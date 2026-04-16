import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as i,M as s}from"./blocks-BAJK2Xxh.js";import{C as t}from"./ComponentOrigin-BogxVIkj.js";import"./preload-helper-Dp1pzeXC.js";import"./iframe-DuFfgGUU.js";import"./index-CjOovKeQ.js";import"./index-BOb-1P7R.js";import"./index-CFke79mk.js";import"./registry-CyM9n0D0.js";function n(d){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Docs/Badge"}),`
`,e.jsx(r.h1,{id:"badge",children:"Badge"}),`
`,e.jsx(r.p,{children:"DOS-styled status indicator for labels, tags, and categorical metadata."}),`
`,e.jsx(r.p,{children:`The Badge is an inline display element for status, priority, and category information.\r
It uses CGA-authentic outline colors per variant and supports an optional dot indicator\r
for live-status use cases.`}),`
`,e.jsxs(r.blockquote,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Interactive demos"}),": See the ",e.jsx(r.a,{href:"/story/components-badge--all-variants",children:"Badge stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(r.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(r.p,{children:"Each variant maps to a specific semantic role with CGA-authentic colors:"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Variant"}),e.jsx(r.th,{children:"Color"}),e.jsx(r.th,{children:"Border"}),e.jsx(r.th,{children:"Background"}),e.jsx(r.th,{children:"Example"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.strong,{children:"Default"})}),e.jsx(r.td,{children:"Primary text"}),e.jsx(r.td,{children:"Default border"}),e.jsx(r.td,{children:"Secondary bg"}),e.jsx(r.td,{children:"Tags, labels"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.strong,{children:"Success"})}),e.jsx(r.td,{children:"Bright Green"}),e.jsx(r.td,{children:"Bright Green"}),e.jsx(r.td,{children:"Transparent"}),e.jsx(r.td,{children:"Online, complete, approved"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.strong,{children:"Warning"})}),e.jsx(r.td,{children:"Yellow"}),e.jsx(r.td,{children:"Yellow"}),e.jsx(r.td,{children:"Transparent"}),e.jsx(r.td,{children:"Pending, caution, medium priority"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.strong,{children:"Error"})}),e.jsx(r.td,{children:"Bright Red"}),e.jsx(r.td,{children:"Bright Red"}),e.jsx(r.td,{children:"Transparent"}),e.jsx(r.td,{children:"Offline, failed, high priority"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.strong,{children:"Info"})}),e.jsx(r.td,{children:"Bright Cyan"}),e.jsx(r.td,{children:"Bright Cyan"}),e.jsx(r.td,{children:"Transparent"}),e.jsx(r.td,{children:"Syncing, informational"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.strong,{children:"Accent"})}),e.jsx(r.td,{children:"Secondary text"}),e.jsx(r.td,{children:"Default border"}),e.jsx(r.td,{children:"Accent bg"}),e.jsx(r.td,{children:"Active, highlighted, featured"})]})]})]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`<Badge variant="default">Label</Badge>\r
<Badge variant="success">Online</Badge>\r
<Badge variant="warning">Pending</Badge>\r
<Badge variant="error">Offline</Badge>\r
<Badge variant="info">Syncing</Badge>\r
<Badge variant="accent">Active</Badge>
`})}),`
`,e.jsx(r.h2,{id:"sizes",children:"Sizes"}),`
`,e.jsx(r.p,{children:"Two sizes for different contexts:"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Size"}),e.jsx(r.th,{children:"Font"}),e.jsx(r.th,{children:"Padding"}),e.jsx(r.th,{children:"Min Height"}),e.jsx(r.th,{children:"Gap"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"small"})}),e.jsx(r.td,{children:"10px"}),e.jsx(r.td,{children:"2px 6px"}),e.jsx(r.td,{children:"18px"}),e.jsx(r.td,{children:"4px"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"medium"})}),e.jsx(r.td,{children:"12px"}),e.jsx(r.td,{children:"4px 8px"}),e.jsx(r.td,{children:"22px"}),e.jsx(r.td,{children:"6px"})]})]})]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`<Badge size="small">Small</Badge>\r
<Badge size="medium">Medium</Badge>
`})}),`
`,e.jsx(r.h2,{id:"states",children:"States"}),`
`,e.jsx(r.h3,{id:"with-dot-indicator",children:"With Dot Indicator"}),`
`,e.jsxs(r.p,{children:["When ",e.jsx(r.code,{children:"dot"}),` is enabled, a small circular indicator (6px) appears before the text.\r
The dot color matches the variant color, making it ideal for live status indicators.`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`<Badge variant="success" dot>Online</Badge>\r
<Badge variant="error" dot>Offline</Badge>\r
<Badge variant="warning" dot>Away</Badge>
`})}),`
`,e.jsx(r.h3,{id:"real-world-usage",children:"Real-World Usage"}),`
`,e.jsx(r.p,{children:"Badges work well for priority levels, source labels, scope tags, and status indicators:"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`{/* Priority */}\r
<Badge variant="error" size="small">High</Badge>\r
<Badge variant="warning" size="small">Medium</Badge>\r
<Badge variant="default" size="small">Low</Badge>\r
\r
{/* Status */}\r
<Badge variant="success" dot size="small">Online</Badge>\r
<Badge variant="error" dot size="small">Offline</Badge>
`})}),`
`,e.jsx(r.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"High contrast"}),": Border widens to 2px via ",e.jsx(r.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Reduced motion"}),": Transitions disabled via ",e.jsx(r.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"ARIA"}),": Supports ",e.jsx(r.code,{children:"aria-label"})," prop for accessible label override; dot indicator is ",e.jsx(r.code,{children:'aria-hidden="true"'})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Text"}),": Uppercase text with 0.05em letter-spacing for readability at small sizes"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"WCAG"}),": WCAG 2.1 AA compliant color contrast"]}),`
`]}),`
`,e.jsx(r.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"variant"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"'default' | 'success' | 'warning' | 'error' | 'info' | 'accent'"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"'default'"})}),e.jsx(r.td,{children:"Color scheme mapped to semantic role"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"size"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"'small' | 'medium'"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"'medium'"})}),e.jsx(r.td,{children:"Badge dimensions"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"dot"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"false"})}),e.jsx(r.td,{children:"Show a circular dot indicator before the text"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"children"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"ReactNode"})}),e.jsx(r.td,{children:"—"}),e.jsx(r.td,{children:"Badge label content"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"className"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"''"})}),e.jsx(r.td,{children:"Additional CSS classes"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"aria-label"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:"—"}),e.jsx(r.td,{children:"Accessible label override"})]})]})]}),`
`,e.jsx(r.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Token"}),e.jsx(r.th,{children:"Purpose"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-background-secondary"})}),e.jsx(r.td,{children:"Default variant background"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-text-primary"})}),e.jsx(r.td,{children:"Default variant text and dot"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-border-default"})}),e.jsx(r.td,{children:"Default and accent variant border"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-cga-bright-green"})}),e.jsx(r.td,{children:"Success variant text, border, and dot"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-cga-yellow"})}),e.jsx(r.td,{children:"Warning variant text, border, and dot"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-cga-bright-red"})}),e.jsx(r.td,{children:"Error variant text, border, and dot"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-cga-bright-cyan"})}),e.jsx(r.td,{children:"Info variant text, border, and dot"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-background-accent"})}),e.jsx(r.td,{children:"Accent variant background"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-text-secondary"})}),e.jsx(r.td,{children:"Accent variant text and dot"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--typography-font-family-primary"})}),e.jsx(r.td,{children:"DOS font family"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--typography-font-family-fallback"})}),e.jsx(r.td,{children:"Fallback font family"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--typography-font-weight-regular"})}),e.jsx(r.td,{children:"Base font weight"})]})]})]}),`
`,e.jsx(r.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(t,{name:"Badge"})]})}function m(d={}){const{wrapper:r}={...i(),...d.components};return r?e.jsx(r,{...d,children:e.jsx(n,{...d})}):n(d)}export{m as default};
