import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as c}from"./index-JWhTtCsH.js";import{M as l}from"./blocks-a6sBqEnx.js";import"./iframe-QfvwKf1z.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BG7Dyd9P.js";import"./index-CZ7-CnlV.js";function n(s){const d={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...c(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Docs/Checkbox"}),`
`,e.jsx(d.h1,{id:"checkbox",children:"Checkbox"}),`
`,e.jsxs(d.p,{children:["DOS-styled boolean toggle using authentic bracket notation ",e.jsx(d.code,{children:"[X]"})," with phosphor glow."]}),`
`,e.jsxs(d.p,{children:[`The Checkbox replaces the native browser checkbox with a text-based DOS representation.\r
Unchecked renders as `,e.jsx(d.code,{children:"[ ]"})," and checked renders as ",e.jsx(d.code,{children:"[X]"}),` with an accent-colored phosphor\r
text-shadow glow. It supports both controlled and uncontrolled usage patterns.`]}),`
`,e.jsxs(d.blockquote,{children:[`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Interactive demos"}),": See the ",e.jsx(d.a,{href:"/story/components-checkbox--all-states",children:"Checkbox stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(d.h2,{id:"display",children:"Display"}),`
`,e.jsxs(d.p,{children:["The checkbox uses pure CSS ",e.jsx(d.code,{children:"::before"})," pseudo-elements to render DOS bracket notation:"]}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"State"}),e.jsx(d.th,{children:"Display"}),e.jsx(d.th,{children:"Color"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.strong,{children:"Unchecked"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"[ ]"})}),e.jsxs(d.td,{children:[e.jsx(d.code,{children:"--color-semantic-text-primary"})," (light gray)"]})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.strong,{children:"Checked"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"[X]"})}),e.jsxs(d.td,{children:[e.jsx(d.code,{children:"--color-semantic-text-accent"})," (amber) + phosphor glow"]})]})]})]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<Checkbox label="Unchecked option" />\r
<Checkbox label="Checked option" defaultChecked />
`})}),`
`,e.jsx(d.h2,{id:"states",children:"States"}),`
`,e.jsx(d.h3,{id:"default-unchecked",children:"Default (Unchecked)"}),`
`,e.jsxs(d.p,{children:["Displays ",e.jsx(d.code,{children:"[ ]"})," in the primary text color. The label inherits the parent text color."]}),`
`,e.jsx(d.h3,{id:"checked",children:"Checked"}),`
`,e.jsxs(d.p,{children:["Displays ",e.jsx(d.code,{children:"[X]"})," in accent color with a ",e.jsx(d.code,{children:"text-shadow: 0 0 4px"}),` phosphor glow,\r
simulating the brightness of an active CRT pixel.`]}),`
`,e.jsx(d.h3,{id:"hover",children:"Hover"}),`
`,e.jsxs(d.p,{children:["When hovered (and not disabled), the box text shifts to ",e.jsx(d.code,{children:"--color-semantic-text-secondary"}),`,\r
giving a warm-up feel. This applies to both checked and unchecked states.`]}),`
`,e.jsx(d.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsxs(d.p,{children:["Reduced opacity (0.6) with ",e.jsx(d.code,{children:"not-allowed"}),` cursor. Both the box and label use\r
`,e.jsx(d.code,{children:"--color-semantic-text-disabled"})," color. The phosphor glow is suppressed in disabled+checked state."]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<Checkbox label="Disabled" disabled />\r
<Checkbox label="Disabled and checked" defaultChecked disabled />
`})}),`
`,e.jsx(d.h2,{id:"controlled-vs-uncontrolled",children:"Controlled vs Uncontrolled"}),`
`,e.jsx(d.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(d.p,{children:["Pass ",e.jsx(d.code,{children:"checked"})," and ",e.jsx(d.code,{children:"onChange"})," for full external state management:"]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`const [isEnabled, setIsEnabled] = useState(false);\r
\r
<Checkbox\r
  label="Enable feature"\r
  checked={isEnabled}\r
  onChange={(checked) => setIsEnabled(checked)}\r
/>
`})}),`
`,e.jsx(d.h3,{id:"uncontrolled",children:"Uncontrolled"}),`
`,e.jsxs(d.p,{children:["Use ",e.jsx(d.code,{children:"defaultChecked"})," to set the initial state and let the checkbox manage itself:"]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<Checkbox label="Remember me" defaultChecked />
`})}),`
`,e.jsx(d.h2,{id:"form-usage",children:"Form Usage"}),`
`,e.jsx(d.p,{children:"Supports standard form attributes for HTML form submission:"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<form>\r
  <Checkbox name="terms" value="accepted" label="I accept the terms" />\r
  <Checkbox name="newsletter" value="yes" label="Subscribe to newsletter" />\r
</form>
`})}),`
`,e.jsx(d.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Focus visible"}),": 2px solid outline with 2px offset on the box element, using ",e.jsx(d.code,{children:"--color-semantic-border-focus"})]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"High contrast"}),": Box gets bold weight (700), label gets semi-bold (600), focus outline widens to 3px via ",e.jsx(d.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Reduced motion"}),": Color transition on box element disabled via ",e.jsx(d.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"ARIA"}),": Native ",e.jsx(d.code,{children:'<input type="checkbox">'})," with ",e.jsx(d.code,{children:"aria-label"})," falling back to ",e.jsx(d.code,{children:"label"})," text"]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Keyboard"}),": Full keyboard navigation — native checkbox is visually hidden but remains focusable"]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Label"}),": Clicking the label text toggles the checkbox (wrapped in ",e.jsx(d.code,{children:"<label>"})," element)"]}),`
`]}),`
`,e.jsx(d.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Prop"}),e.jsx(d.th,{children:"Type"}),e.jsx(d.th,{children:"Default"}),e.jsx(d.th,{children:"Description"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"checked"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"boolean"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Controlled checked state"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"defaultChecked"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"boolean"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Initial checked state for uncontrolled usage"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"onChange"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"(checked: boolean) => void"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Callback fired when checked state changes"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"label"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Visible label text displayed next to the checkbox"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"disabled"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"boolean"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"false"})}),e.jsx(d.td,{children:"Disables interaction and dims appearance"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"name"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Name attribute for HTML form submission"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"value"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Value attribute for HTML form submission"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"className"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"''"})}),e.jsx(d.td,{children:"Additional CSS classes"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"aria-label"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:"—"}),e.jsxs(d.td,{children:["Accessible label override (defaults to ",e.jsx(d.code,{children:"label"})," text)"]})]})]})]}),`
`,e.jsx(d.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Token"}),e.jsx(d.th,{children:"Purpose"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-text-primary"})}),e.jsx(d.td,{children:"Unchecked box and default label color"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-text-accent"})}),e.jsxs(d.td,{children:["Checked ",e.jsx(d.code,{children:"[X]"})," color and phosphor glow"]})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-text-secondary"})}),e.jsx(d.td,{children:"Hover state box color"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-text-disabled"})}),e.jsx(d.td,{children:"Disabled state box and label color"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-border-focus"})}),e.jsx(d.td,{children:"Focus outline ring"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--duration-fast"})}),e.jsx(d.td,{children:"Box color transition (100ms)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--spacing-2"})}),e.jsx(d.td,{children:"Gap between box and label"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--typography-font-family-primary"})}),e.jsx(d.td,{children:"DOS font family"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--typography-font-family-fallback"})}),e.jsx(d.td,{children:"Fallback font family"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--typography-font-size-base"})}),e.jsx(d.td,{children:"Base font size"})]})]})]})]})}function j(s={}){const{wrapper:d}={...c(),...s.components};return d?e.jsx(d,{...s,children:e.jsx(n,{...s})}):n(s)}export{j as default};
