import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as s}from"./index-D5dRogEL.js";import{M as c}from"./blocks-DG9eVJBI.js";import{C as i}from"./ComponentOrigin-DmRjH1iZ.js";import"./iframe-K6BYEX5l.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DisTUHiR.js";import"./index-DLTpzO1r.js";import"./registry-DlnQDLA5.js";function r(n){const d={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Docs/Switch"}),`
`,e.jsx(d.h1,{id:"switch",children:"Switch"}),`
`,e.jsx(d.p,{children:"DOS-styled toggle switch with authentic terminal aesthetics and phosphor glow effects."}),`
`,e.jsxs(d.p,{children:["The Switch is a boolean toggle control rendered as a ",e.jsx(d.code,{children:"<button>"})," with ",e.jsx(d.code,{children:'role="switch"'}),`.\r
It supports both controlled and uncontrolled modes, includes a hidden `,e.jsx(d.code,{children:"<input>"}),` for\r
form submission, and features a spring-overshoot thumb animation inspired by CRT\r
monitor warm-up behavior.`]}),`
`,e.jsxs(d.blockquote,{children:[`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Interactive demos"}),": See the ",e.jsx(d.a,{href:"/story/components-switch--default",children:"Switch stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(d.h2,{id:"states",children:"States"}),`
`,e.jsx(d.h3,{id:"unchecked-off",children:"Unchecked (Off)"}),`
`,e.jsx(d.p,{children:`Default rest state. The track uses the secondary background with a default border.\r
The thumb sits on the left side in the primary text color.`}),`
`,e.jsx(d.h3,{id:"checked-on",children:"Checked (On)"}),`
`,e.jsxs(d.p,{children:[`The track fills with the accent background color and gains a subtle glow\r
(`,e.jsx(d.code,{children:"--shadow-glow-xs"}),`). The thumb slides right with a spring overshoot curve\r
(`,e.jsx(d.code,{children:"cubic-bezier(0.2, 0.8, 0.2, 1.4)"}),`) and takes on the secondary text color\r
(dark on amber).`]}),`
`,e.jsx(d.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsxs(d.p,{children:["Reduced opacity (0.5), ",e.jsx(d.code,{children:"not-allowed"}),` cursor. Both checked and unchecked states\r
share the same dimmed appearance. The track uses the disabled border color and\r
the thumb uses the disabled text color.`]}),`
`,e.jsx(d.h3,{id:"hover",children:"Hover"}),`
`,e.jsx(d.p,{children:`Border color shifts to the hover border token. When unchecked, the thumb\r
brightens to the accent text color, providing a preview of the "on" state.`}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<Switch aria-label="Toggle setting" />\r
<Switch defaultChecked aria-label="Toggle setting" />\r
<Switch disabled aria-label="Toggle setting" />\r
<Switch disabled defaultChecked aria-label="Toggle setting" />
`})}),`
`,e.jsx(d.h2,{id:"controlled-vs-uncontrolled",children:"Controlled vs Uncontrolled"}),`
`,e.jsx(d.h3,{id:"uncontrolled-default",children:"Uncontrolled (default)"}),`
`,e.jsxs(d.p,{children:["Use ",e.jsx(d.code,{children:"defaultChecked"})," to set the initial state. The Switch manages its own state:"]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<Switch defaultChecked onCheckedChange={(checked) => console.log(checked)} />
`})}),`
`,e.jsx(d.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(d.p,{children:["Pass ",e.jsx(d.code,{children:"checked"})," and ",e.jsx(d.code,{children:"onCheckedChange"})," to fully control the state externally:"]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`const [checked, setChecked] = useState(false);\r
<Switch checked={checked} onCheckedChange={setChecked} />
`})}),`
`,e.jsx(d.h2,{id:"form-usage",children:"Form Usage"}),`
`,e.jsxs(d.p,{children:["When a ",e.jsx(d.code,{children:"name"})," prop is provided, the Switch renders a hidden ",e.jsx(d.code,{children:"<input>"}),` for form submission.\r
The input value is the `,e.jsx(d.code,{children:"value"})," prop (or ",e.jsx(d.code,{children:'"on"'}),` by default) when checked, and an empty\r
string when unchecked:`]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<form>\r
  <Switch name="crt-effects" value="enabled" aria-label="Enable CRT effects" />\r
</form>
`})}),`
`,e.jsx(d.h2,{id:"with-external-label",children:"With External Label"}),`
`,e.jsxs(d.p,{children:["Associate a visible label using ",e.jsx(d.code,{children:"aria-labelledby"}),":"]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>\r
  <Switch aria-labelledby="switch-label" />\r
  <label id="switch-label">Enable CRT effects</label>\r
</div>
`})}),`
`,e.jsx(d.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Role"}),": Uses ",e.jsx(d.code,{children:'role="switch"'})," with ",e.jsx(d.code,{children:"aria-checked"})," reflecting current state"]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"ARIA disabled"}),": ",e.jsx(d.code,{children:"aria-disabled"})," set when disabled"]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Focus visible"}),": 2px solid outline with 2px offset, using ",e.jsx(d.code,{children:"--color-semantic-border-focus"})]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"High contrast"}),": Track border widens to 3px via ",e.jsx(d.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Reduced motion"}),": All transitions and glow effects disabled via ",e.jsx(d.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Keyboard"}),": Toggle with Space or Enter keys"]}),`
`]}),`
`,e.jsx(d.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Prop"}),e.jsx(d.th,{children:"Type"}),e.jsx(d.th,{children:"Default"}),e.jsx(d.th,{children:"Description"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"checked"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"boolean"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Controlled checked state"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"defaultChecked"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"boolean"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"false"})}),e.jsx(d.td,{children:"Initial checked state (uncontrolled)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"onCheckedChange"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"(checked: boolean) => void"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Callback when state changes"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"disabled"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"boolean"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"false"})}),e.jsx(d.td,{children:"Disables interaction"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"name"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Name for form submission (renders hidden input)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"value"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Value for form submission"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"className"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"''"})}),e.jsx(d.td,{children:"Additional CSS classes"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"aria-label"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Accessible label for screen readers"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"aria-labelledby"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"ID of element that labels this switch"})]})]})]}),`
`,e.jsx(d.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Token"}),e.jsx(d.th,{children:"Purpose"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-background-secondary"})}),e.jsx(d.td,{children:"Track background (unchecked)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-background-accent"})}),e.jsx(d.td,{children:"Track background (checked)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-border-default"})}),e.jsx(d.td,{children:"Track border (unchecked)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-border-focus"})}),e.jsx(d.td,{children:"Focus outline and checked border"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-border-hover"})}),e.jsx(d.td,{children:"Hover border color"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-border-disabled"})}),e.jsx(d.td,{children:"Disabled track border"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-text-primary"})}),e.jsx(d.td,{children:"Thumb color (unchecked)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-text-secondary"})}),e.jsx(d.td,{children:"Thumb color (checked, dark on amber)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-text-accent"})}),e.jsx(d.td,{children:"Thumb hover color (unchecked)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-text-disabled"})}),e.jsx(d.td,{children:"Disabled thumb color"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--shadow-glow-xs"})}),e.jsx(d.td,{children:"Checked track glow"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--duration-fast"})}),e.jsx(d.td,{children:"Track transition speed (100ms)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--duration-normal"})}),e.jsx(d.td,{children:"Thumb slide duration (200ms)"})]})]})]}),`
`,e.jsx(d.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(i,{name:"Switch"})]})}function m(n={}){const{wrapper:d}={...s(),...n.components};return d?e.jsx(d,{...n,children:e.jsx(r,{...n})}):r(n)}export{m as default};
