import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as s}from"./index-D5dRogEL.js";import{M as t}from"./blocks-DG9eVJBI.js";import{C as d}from"./ComponentOrigin-DmRjH1iZ.js";import"./iframe-K6BYEX5l.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DisTUHiR.js";import"./index-DLTpzO1r.js";import"./registry-DlnQDLA5.js";function i(r){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Docs/Alert"}),`
`,e.jsx(n.h1,{id:"alert",children:"Alert"}),`
`,e.jsx(n.p,{children:"DOS-styled dismissible notification with CRT phosphor entrance animation."}),`
`,e.jsx(n.p,{children:`The Alert displays contextual feedback messages with type-specific CGA colors and icons.\r
It enters with a phosphor-bloom animation — blurring from dim to full brightness — simulating\r
a CRT monitor warming up.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Interactive demos"}),": See the ",e.jsx(n.a,{href:"/story/components-alert--default",children:"Alert stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(n.h2,{id:"types",children:"Types"}),`
`,e.jsx(n.p,{children:"Each type maps to a specific semantic role with its own CGA color and icon:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Color"}),e.jsx(n.th,{children:"Icon"}),e.jsx(n.th,{children:"Example"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Info"})}),e.jsx(n.td,{children:"Amber"}),e.jsx(n.td,{children:"Info"}),e.jsx(n.td,{children:"General information, tips"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Success"})}),e.jsx(n.td,{children:"Bright Green"}),e.jsx(n.td,{children:"Done"}),e.jsx(n.td,{children:"Completed actions, confirmations"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Warning"})}),e.jsx(n.td,{children:"Amber"}),e.jsx(n.td,{children:"Warning"}),e.jsx(n.td,{children:"Caution, potential issues"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Error"})}),e.jsx(n.td,{children:"Bright Red"}),e.jsx(n.td,{children:"Error"}),e.jsx(n.td,{children:"Failures, critical problems"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Alert type="info" title="Information">Helpful details here.</Alert>\r
<Alert type="success" title="Success">Operation completed.</Alert>\r
<Alert type="warning" title="Warning">Proceed with caution.</Alert>\r
<Alert type="error" title="Error">Something went wrong.</Alert>
`})}),`
`,e.jsx(n.h2,{id:"sizes",children:"Sizes"}),`
`,e.jsx(n.p,{children:"Two size variants for different contexts:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Size"}),e.jsx(n.th,{children:"Max Width"}),e.jsx(n.th,{children:"Padding"}),e.jsx(n.th,{children:"Layout"}),e.jsx(n.th,{children:"Content Area"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"large"})}),e.jsx(n.td,{children:"1020px"}),e.jsx(n.td,{children:"16px"}),e.jsx(n.td,{children:"Column (stacked)"}),e.jsx(n.td,{children:"Title + description visible"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"small"})}),e.jsx(n.td,{children:"350px"}),e.jsx(n.td,{children:"0 8px"}),e.jsx(n.td,{children:"Row (inline)"}),e.jsx(n.td,{children:"Title only, content hidden"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Alert size="large" type="info" title="Large Alert">\r
  Description text is visible in the large variant.\r
</Alert>\r
<Alert size="small" type="info" title="Compact Alert" />
`})}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(n.h3,{id:"dismissible",children:"Dismissible"}),`
`,e.jsxs(n.p,{children:["When an ",e.jsx(n.code,{children:"onClose"}),` handler is provided, a close button (X icon) appears in the\r
header. The close button has 0.7 opacity at rest, brightening to full opacity on hover.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Alert type="info" title="Dismissible" onClose={() => console.log('closed')}>\r
  This alert can be dismissed.\r
</Alert>
`})}),`
`,e.jsx(n.h3,{id:"with-action-link",children:"With Action Link"}),`
`,e.jsxs(n.p,{children:["When an ",e.jsx(n.code,{children:"onClickHere"}),` handler is provided, a "Click here" action link appears\r
below the description text. The link gains a phosphor text-shadow glow on hover.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Alert type="warning" title="Action Required" onClickHere={() => navigate('/settings')}>\r
  Your settings need attention.\r
</Alert>
`})}),`
`,e.jsx(n.h2,{id:"interaction-design",children:"Interaction Design"}),`
`,e.jsx(n.h3,{id:"entrance-animation",children:"Entrance Animation"}),`
`,e.jsxs(n.p,{children:["The alert enters with a CRT phosphor bloom over ",e.jsx(n.code,{children:"--duration-slow"})," (400ms):"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`@keyframes alert-enter {\r
  from { opacity: 0; filter: blur(4px) brightness(0.3); }\r
  to   { opacity: 1; filter: blur(0) brightness(1); }\r
}
`})}),`
`,e.jsx(n.p,{children:"This simulates phosphors warming from dim to full brightness on a cold CRT."}),`
`,e.jsx(n.h3,{id:"close-button",children:"Close Button"}),`
`,e.jsxs(n.p,{children:["The close icon uses a smooth opacity transition (",e.jsx(n.code,{children:"--duration-fast"}),", 100ms) on hover."]}),`
`,e.jsx(n.h3,{id:"action-link",children:"Action Link"}),`
`,e.jsxs(n.p,{children:['The "Click here" link gains a ',e.jsx(n.code,{children:"text-shadow: 0 0 6px currentColor"}),` glow on hover,\r
creating a subtle phosphor highlight effect.`]}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"High contrast"}),": 2px solid border added, title gets bold weight, close button gets 3px focus outline, action link gets underline + bold via ",e.jsx(n.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Reduced motion"}),": Entrance animation, close button transition, and link transition all disabled via ",e.jsx(n.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA"}),": Close button has ",e.jsx(n.code,{children:'aria-label="Close alert"'}),", action link has ",e.jsx(n.code,{children:'aria-label="Click for more information"'}),", type icon has ",e.jsx(n.code,{children:"aria-label"})," describing the alert type"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard"}),": Close button is a native ",e.jsx(n.code,{children:"<button>"})," with full keyboard access"]}),`
`]}),`
`,e.jsx(n.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"type"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'info' | 'success' | 'warning' | 'error'"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'info'"})}),e.jsx(n.td,{children:"Alert type determining color and icon"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"size"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'small' | 'large'"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'large'"})}),e.jsx(n.td,{children:"Size variant controlling layout and max width"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"title"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Title text displayed in the alert header"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"children"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"ReactNode"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Description content (hidden in small size)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onClose"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"() => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Close button click handler (renders close button when provided)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onClickHere"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"() => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:'Action link click handler (renders "Click here" link when provided)'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"className"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"''"})}),e.jsx(n.td,{children:"Additional CSS classes"})]})]})]}),`
`,e.jsx(n.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Token"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-alert-info"})}),e.jsx(n.td,{children:"Info variant background"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-alert-success"})}),e.jsx(n.td,{children:"Success variant background"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-alert-warning"})}),e.jsx(n.td,{children:"Warning variant background"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-alert-error"})}),e.jsx(n.td,{children:"Error variant background"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-amber"})}),e.jsx(n.td,{children:"Info and warning text color"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-bright-green"})}),e.jsx(n.td,{children:"Success text color"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-bright-red"})}),e.jsx(n.td,{children:"Error text color"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-amber-dim"})}),e.jsx(n.td,{children:"Message body text color"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--duration-slow"})}),e.jsx(n.td,{children:"Entrance animation duration (400ms)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--duration-fast"})}),e.jsx(n.td,{children:"Close button and link transition (100ms)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--spacing-4"})}),e.jsx(n.td,{children:"Large variant padding"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--spacing-2"})}),e.jsx(n.td,{children:"Small variant horizontal padding"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--spacing-1"})}),e.jsx(n.td,{children:"Large variant content gap"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--typography-font-family-primary"})}),e.jsx(n.td,{children:"DOS font family"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--typography-font-family-fallback"})}),e.jsx(n.td,{children:"Fallback font family"})]})]})]}),`
`,e.jsx(n.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(d,{name:"Alert"})]})}function m(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{m as default};
