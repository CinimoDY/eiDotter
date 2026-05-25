import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/Checkbox`}),`
`,(0,u.jsx)(r.h1,{id:`checkbox`,children:`Checkbox`}),`
`,(0,u.jsxs)(r.p,{children:[`DOS-styled boolean toggle using authentic bracket notation `,(0,u.jsx)(r.code,{children:`[X]`}),` with phosphor glow.`]}),`
`,(0,u.jsxs)(r.p,{children:[`The Checkbox replaces the native browser checkbox with a text-based DOS representation.\r
Unchecked renders as `,(0,u.jsx)(r.code,{children:`[ ]`}),` and checked renders as `,(0,u.jsx)(r.code,{children:`[X]`}),` with an accent-colored phosphor\r
text-shadow glow. It supports both controlled and uncontrolled usage patterns.`]}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-checkbox--all-states`,children:`Checkbox stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`display`,children:`Display`}),`
`,(0,u.jsxs)(r.p,{children:[`The checkbox uses pure CSS `,(0,u.jsx)(r.code,{children:`::before`}),` pseudo-elements to render DOS bracket notation:`]}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`State`}),(0,u.jsx)(r.th,{children:`Display`}),(0,u.jsx)(r.th,{children:`Color`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Unchecked`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`[ ]`})}),(0,u.jsxs)(r.td,{children:[(0,u.jsx)(r.code,{children:`--color-semantic-text-primary`}),` (light gray)`]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Checked`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`[X]`})}),(0,u.jsxs)(r.td,{children:[(0,u.jsx)(r.code,{children:`--color-semantic-text-accent`}),` (amber) + phosphor glow`]})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Checkbox label="Unchecked option" />\r
<Checkbox label="Checked option" defaultChecked />
`})}),`
`,(0,u.jsx)(r.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(r.h3,{id:`default-unchecked`,children:`Default (Unchecked)`}),`
`,(0,u.jsxs)(r.p,{children:[`Displays `,(0,u.jsx)(r.code,{children:`[ ]`}),` in the primary text color. The label inherits the parent text color.`]}),`
`,(0,u.jsx)(r.h3,{id:`checked`,children:`Checked`}),`
`,(0,u.jsxs)(r.p,{children:[`Displays `,(0,u.jsx)(r.code,{children:`[X]`}),` in accent color with a `,(0,u.jsx)(r.code,{children:`text-shadow: 0 0 4px`}),` phosphor glow,\r
simulating the brightness of an active CRT pixel.`]}),`
`,(0,u.jsx)(r.h3,{id:`hover`,children:`Hover`}),`
`,(0,u.jsxs)(r.p,{children:[`When hovered (and not disabled), the box text shifts to `,(0,u.jsx)(r.code,{children:`--color-semantic-text-secondary`}),`,\r
giving a warm-up feel. This applies to both checked and unchecked states.`]}),`
`,(0,u.jsx)(r.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,u.jsxs)(r.p,{children:[`Reduced opacity (0.6) with `,(0,u.jsx)(r.code,{children:`not-allowed`}),` cursor. Both the box and label use\r
`,(0,u.jsx)(r.code,{children:`--color-semantic-text-disabled`}),` color. The phosphor glow is suppressed in disabled+checked state.`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Checkbox label="Disabled" disabled />\r
<Checkbox label="Disabled and checked" defaultChecked disabled />
`})}),`
`,(0,u.jsx)(r.h2,{id:`controlled-vs-uncontrolled`,children:`Controlled vs Uncontrolled`}),`
`,(0,u.jsx)(r.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,u.jsxs)(r.p,{children:[`Pass `,(0,u.jsx)(r.code,{children:`checked`}),` and `,(0,u.jsx)(r.code,{children:`onChange`}),` for full external state management:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`const [isEnabled, setIsEnabled] = useState(false);\r
\r
<Checkbox\r
  label="Enable feature"\r
  checked={isEnabled}\r
  onChange={(checked) => setIsEnabled(checked)}\r
/>
`})}),`
`,(0,u.jsx)(r.h3,{id:`uncontrolled`,children:`Uncontrolled`}),`
`,(0,u.jsxs)(r.p,{children:[`Use `,(0,u.jsx)(r.code,{children:`defaultChecked`}),` to set the initial state and let the checkbox manage itself:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Checkbox label="Remember me" defaultChecked />
`})}),`
`,(0,u.jsx)(r.h2,{id:`form-usage`,children:`Form Usage`}),`
`,(0,u.jsx)(r.p,{children:`Supports standard form attributes for HTML form submission:`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<form>\r
  <Checkbox name="terms" value="accepted" label="I accept the terms" />\r
  <Checkbox name="newsletter" value="yes" label="Subscribe to newsletter" />\r
</form>
`})}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Focus visible`}),`: 2px solid outline with 2px offset on the box element, using `,(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`High contrast`}),`: Box gets bold weight (700), label gets semi-bold (600), focus outline widens to 3px via `,(0,u.jsx)(r.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Reduced motion`}),`: Color transition on box element disabled via `,(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`ARIA`}),`: Native `,(0,u.jsx)(r.code,{children:`<input type="checkbox">`}),` with `,(0,u.jsx)(r.code,{children:`aria-label`}),` falling back to `,(0,u.jsx)(r.code,{children:`label`}),` text`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Keyboard`}),`: Full keyboard navigation — native checkbox is visually hidden but remains focusable`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Label`}),`: Clicking the label text toggles the checkbox (wrapped in `,(0,u.jsx)(r.code,{children:`<label>`}),` element)`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`checked`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Controlled checked state`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`defaultChecked`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Initial checked state for uncontrolled usage`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onChange`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`(checked: boolean) => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Callback fired when checked state changes`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`label`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Visible label text displayed next to the checkbox`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`disabled`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Disables interaction and dims appearance`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`name`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Name attribute for HTML form submission`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`value`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Value attribute for HTML form submission`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`''`})}),(0,u.jsx)(r.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`aria-label`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsxs)(r.td,{children:[`Accessible label override (defaults to `,(0,u.jsx)(r.code,{children:`label`}),` text)`]})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`design-tokens-used`,children:`Design Tokens Used`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Token`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(r.td,{children:`Unchecked box and default label color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-accent`})}),(0,u.jsxs)(r.td,{children:[`Checked `,(0,u.jsx)(r.code,{children:`[X]`}),` color and phosphor glow`]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-secondary`})}),(0,u.jsx)(r.td,{children:`Hover state box color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-disabled`})}),(0,u.jsx)(r.td,{children:`Disabled state box and label color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(r.td,{children:`Focus outline ring`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-fast`})}),(0,u.jsx)(r.td,{children:`Box color transition (100ms)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--spacing-2`})}),(0,u.jsx)(r.td,{children:`Gap between box and label`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(r.td,{children:`DOS font family`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-family-fallback`})}),(0,u.jsx)(r.td,{children:`Fallback font family`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-size-text-md`})}),(0,u.jsx)(r.td,{children:`Base font size`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Checkbox`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};