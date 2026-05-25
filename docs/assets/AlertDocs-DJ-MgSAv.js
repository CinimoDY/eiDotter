import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/Alert`}),`
`,(0,u.jsx)(r.h1,{id:`alert`,children:`Alert`}),`
`,(0,u.jsx)(r.p,{children:`DOS-styled dismissible notification with CRT phosphor entrance animation.`}),`
`,(0,u.jsx)(r.p,{children:`The Alert displays contextual feedback messages with type-specific CGA colors and icons.\r
It enters with a phosphor-bloom animation — blurring from dim to full brightness — simulating\r
a CRT monitor warming up.`}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-alert--default`,children:`Alert stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`types`,children:`Types`}),`
`,(0,u.jsx)(r.p,{children:`Each type maps to a specific semantic role with its own CGA color and icon:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Color`}),(0,u.jsx)(r.th,{children:`Icon`}),(0,u.jsx)(r.th,{children:`Example`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Info`})}),(0,u.jsx)(r.td,{children:`Amber`}),(0,u.jsx)(r.td,{children:`Info`}),(0,u.jsx)(r.td,{children:`General information, tips`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Success`})}),(0,u.jsx)(r.td,{children:`Bright Green`}),(0,u.jsx)(r.td,{children:`Done`}),(0,u.jsx)(r.td,{children:`Completed actions, confirmations`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Warning`})}),(0,u.jsx)(r.td,{children:`Amber`}),(0,u.jsx)(r.td,{children:`Warning`}),(0,u.jsx)(r.td,{children:`Caution, potential issues`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Error`})}),(0,u.jsx)(r.td,{children:`Bright Red`}),(0,u.jsx)(r.td,{children:`Error`}),(0,u.jsx)(r.td,{children:`Failures, critical problems`})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Alert type="info" title="Information">Helpful details here.</Alert>\r
<Alert type="success" title="Success">Operation completed.</Alert>\r
<Alert type="warning" title="Warning">Proceed with caution.</Alert>\r
<Alert type="error" title="Error">Something went wrong.</Alert>
`})}),`
`,(0,u.jsx)(r.h2,{id:`sizes`,children:`Sizes`}),`
`,(0,u.jsx)(r.p,{children:`Two size variants for different contexts:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Size`}),(0,u.jsx)(r.th,{children:`Max Width`}),(0,u.jsx)(r.th,{children:`Padding`}),(0,u.jsx)(r.th,{children:`Layout`}),(0,u.jsx)(r.th,{children:`Content Area`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`large`})}),(0,u.jsx)(r.td,{children:`1020px`}),(0,u.jsx)(r.td,{children:`16px`}),(0,u.jsx)(r.td,{children:`Column (stacked)`}),(0,u.jsx)(r.td,{children:`Title + description visible`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`small`})}),(0,u.jsx)(r.td,{children:`350px`}),(0,u.jsx)(r.td,{children:`0 8px`}),(0,u.jsx)(r.td,{children:`Row (inline)`}),(0,u.jsx)(r.td,{children:`Title only, content hidden`})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Alert size="large" type="info" title="Large Alert">\r
  Description text is visible in the large variant.\r
</Alert>\r
<Alert size="small" type="info" title="Compact Alert" />
`})}),`
`,(0,u.jsx)(r.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(r.h3,{id:`dismissible`,children:`Dismissible`}),`
`,(0,u.jsxs)(r.p,{children:[`When an `,(0,u.jsx)(r.code,{children:`onClose`}),` handler is provided, a close button (X icon) appears in the\r
header. The close button has 0.7 opacity at rest, brightening to full opacity on hover.`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Alert type="info" title="Dismissible" onClose={() => console.log('closed')}>\r
  This alert can be dismissed.\r
</Alert>
`})}),`
`,(0,u.jsx)(r.h3,{id:`with-action-link`,children:`With Action Link`}),`
`,(0,u.jsxs)(r.p,{children:[`When an `,(0,u.jsx)(r.code,{children:`onClickHere`}),` handler is provided, a "Click here" action link appears\r
below the description text. The link gains a phosphor text-shadow glow on hover.`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Alert type="warning" title="Action Required" onClickHere={() => navigate('/settings')}>\r
  Your settings need attention.\r
</Alert>
`})}),`
`,(0,u.jsx)(r.h2,{id:`interaction-design`,children:`Interaction Design`}),`
`,(0,u.jsx)(r.h3,{id:`entrance-animation`,children:`Entrance Animation`}),`
`,(0,u.jsxs)(r.p,{children:[`The alert enters with a CRT phosphor bloom over `,(0,u.jsx)(r.code,{children:`--duration-slow`}),` (400ms):`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-css`,children:`@keyframes alert-enter {\r
  from { opacity: 0; filter: blur(4px) brightness(0.3); }\r
  to   { opacity: 1; filter: blur(0) brightness(1); }\r
}
`})}),`
`,(0,u.jsx)(r.p,{children:`This simulates phosphors warming from dim to full brightness on a cold CRT.`}),`
`,(0,u.jsx)(r.h3,{id:`close-button`,children:`Close Button`}),`
`,(0,u.jsxs)(r.p,{children:[`The close icon uses a smooth opacity transition (`,(0,u.jsx)(r.code,{children:`--duration-fast`}),`, 100ms) on hover.`]}),`
`,(0,u.jsx)(r.h3,{id:`action-link`,children:`Action Link`}),`
`,(0,u.jsxs)(r.p,{children:[`The "Click here" link gains a `,(0,u.jsx)(r.code,{children:`text-shadow: 0 0 6px currentColor`}),` glow on hover,\r
creating a subtle phosphor highlight effect.`]}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`High contrast`}),`: 2px solid border added, title gets bold weight, close button gets 3px focus outline, action link gets underline + bold via `,(0,u.jsx)(r.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Reduced motion`}),`: Entrance animation, close button transition, and link transition all disabled via `,(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`ARIA`}),`: Close button has `,(0,u.jsx)(r.code,{children:`aria-label="Close alert"`}),`, action link has `,(0,u.jsx)(r.code,{children:`aria-label="Click for more information"`}),`, type icon has `,(0,u.jsx)(r.code,{children:`aria-label`}),` describing the alert type`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Keyboard`}),`: Close button is a native `,(0,u.jsx)(r.code,{children:`<button>`}),` with full keyboard access`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`type`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'info' | 'success' | 'warning' | 'error'`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'info'`})}),(0,u.jsx)(r.td,{children:`Alert type determining color and icon`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`size`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'small' | 'large'`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'large'`})}),(0,u.jsx)(r.td,{children:`Size variant controlling layout and max width`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`title`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Title text displayed in the alert header`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`children`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ReactNode`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Description content (hidden in small size)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onClose`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`() => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Close button click handler (renders close button when provided)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onClickHere`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`() => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Action link click handler (renders "Click here" link when provided)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`''`})}),(0,u.jsx)(r.td,{children:`Additional CSS classes`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`design-tokens-used`,children:`Design Tokens Used`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Token`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-alert-info`})}),(0,u.jsx)(r.td,{children:`Info variant background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-alert-success`})}),(0,u.jsx)(r.td,{children:`Success variant background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-alert-warning`})}),(0,u.jsx)(r.td,{children:`Warning variant background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-alert-error`})}),(0,u.jsx)(r.td,{children:`Error variant background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-cga-amber`})}),(0,u.jsx)(r.td,{children:`Info and warning text color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-cga-bright-green`})}),(0,u.jsx)(r.td,{children:`Success text color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-cga-bright-red`})}),(0,u.jsx)(r.td,{children:`Error text color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-cga-amber-dim`})}),(0,u.jsx)(r.td,{children:`Message body text color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-slow`})}),(0,u.jsx)(r.td,{children:`Entrance animation duration (400ms)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-fast`})}),(0,u.jsx)(r.td,{children:`Close button and link transition (100ms)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--spacing-4`})}),(0,u.jsx)(r.td,{children:`Large variant padding`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--spacing-2`})}),(0,u.jsx)(r.td,{children:`Small variant horizontal padding`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--spacing-1`})}),(0,u.jsx)(r.td,{children:`Large variant content gap`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(r.td,{children:`DOS font family`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-family-fallback`})}),(0,u.jsx)(r.td,{children:`Fallback font family`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Alert`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};