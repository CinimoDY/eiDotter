import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/Checkbox`}),`
`,(0,u.jsx)(n.h1,{id:`checkbox`,children:`Checkbox`}),`
`,(0,u.jsxs)(n.p,{children:[`DOS-styled boolean toggle using DOS bracket notation `,(0,u.jsx)(n.code,{children:`[X]`}),` with phosphor glow.`]}),`
`,(0,u.jsxs)(n.p,{children:[`The Checkbox replaces the native browser checkbox with a text-based DOS representation.\r
Unchecked renders as `,(0,u.jsx)(n.code,{children:`[ ]`}),` and checked renders as `,(0,u.jsx)(n.code,{children:`[X]`}),` with an accent-colored phosphor\r
text-shadow glow. It works controlled or uncontrolled.`]}),`
`,(0,u.jsxs)(n.blockquote,{children:[`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(n.a,{href:`/story/components-checkbox--all-states`,children:`Checkbox stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`display`,children:`Display`}),`
`,(0,u.jsxs)(n.p,{children:[`The checkbox uses pure CSS `,(0,u.jsx)(n.code,{children:`::before`}),` pseudo-elements to render DOS bracket notation:`]}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`State`}),(0,u.jsx)(n.th,{children:`Display`}),(0,u.jsx)(n.th,{children:`Color`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Unchecked`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`[ ]`})}),(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`--color-semantic-text-primary`}),` (light gray)`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Checked`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`[X]`})}),(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`--color-semantic-text-accent`}),` (amber) + phosphor glow`]})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Checkbox label="Unchecked option" />\r
<Checkbox label="Checked option" defaultChecked />
`})}),`
`,(0,u.jsx)(n.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(n.h3,{id:`default-unchecked`,children:`Default (unchecked)`}),`
`,(0,u.jsxs)(n.p,{children:[`Displays `,(0,u.jsx)(n.code,{children:`[ ]`}),` in the primary text color. The label inherits the parent text color.`]}),`
`,(0,u.jsx)(n.h3,{id:`checked`,children:`Checked`}),`
`,(0,u.jsxs)(n.p,{children:[`Displays `,(0,u.jsx)(n.code,{children:`[X]`}),` in accent color with a `,(0,u.jsx)(n.code,{children:`text-shadow: 0 0 4px`}),` phosphor glow.`]}),`
`,(0,u.jsx)(n.h3,{id:`hover`,children:`Hover`}),`
`,(0,u.jsxs)(n.p,{children:[`When hovered (and not disabled), the box text shifts to `,(0,u.jsx)(n.code,{children:`--color-semantic-text-brand-bright`}),`. This applies to both checked and unchecked states.`]}),`
`,(0,u.jsx)(n.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,u.jsxs)(n.p,{children:[`Reduced opacity (0.6) with `,(0,u.jsx)(n.code,{children:`not-allowed`}),` cursor. Both the box and label use\r
`,(0,u.jsx)(n.code,{children:`--color-semantic-text-disabled`}),` color. The phosphor glow is suppressed in disabled+checked state.`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Checkbox label="Disabled" disabled />\r
<Checkbox label="Disabled and checked" defaultChecked disabled />
`})}),`
`,(0,u.jsx)(n.h2,{id:`controlled-vs-uncontrolled`,children:`Controlled vs uncontrolled`}),`
`,(0,u.jsx)(n.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,u.jsxs)(n.p,{children:[`Pass `,(0,u.jsx)(n.code,{children:`checked`}),` and `,(0,u.jsx)(n.code,{children:`onChange`}),` to keep the state in the parent:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`const [isEnabled, setIsEnabled] = useState(false);\r
\r
<Checkbox\r
  label="Enable feature"\r
  checked={isEnabled}\r
  onChange={(checked) => setIsEnabled(checked)}\r
/>
`})}),`
`,(0,u.jsx)(n.h3,{id:`uncontrolled`,children:`Uncontrolled`}),`
`,(0,u.jsxs)(n.p,{children:[`Use `,(0,u.jsx)(n.code,{children:`defaultChecked`}),` to set the initial state and let the checkbox manage itself:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Checkbox label="Remember me" defaultChecked />
`})}),`
`,(0,u.jsx)(n.h2,{id:`form-usage`,children:`Form usage`}),`
`,(0,u.jsxs)(n.p,{children:[`Pass `,(0,u.jsx)(n.code,{children:`name`}),` and `,(0,u.jsx)(n.code,{children:`value`}),` for HTML form submission:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<form>\r
  <Checkbox name="terms" value="accepted" label="I accept the terms" />\r
  <Checkbox name="newsletter" value="yes" label="Subscribe to newsletter" />\r
</form>
`})}),`
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Focus visible`}),`: 2px solid outline with 2px offset on the box element, using `,(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`High contrast`}),`: Box gets bold weight (700), label gets semi-bold (600), focus outline widens to 3px via `,(0,u.jsx)(n.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Reduced motion`}),`: Color transition on box element disabled via `,(0,u.jsx)(n.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`ARIA`}),`: Native `,(0,u.jsx)(n.code,{children:`<input type="checkbox">`}),` with `,(0,u.jsx)(n.code,{children:`aria-label`}),` falling back to `,(0,u.jsx)(n.code,{children:`label`}),` text`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Keyboard`}),`: the native checkbox is visually hidden but stays focusable`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Label`}),`: Clicking the label text toggles the checkbox (wrapped in `,(0,u.jsx)(n.code,{children:`<label>`}),` element)`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`checked`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Controlled checked state`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`defaultChecked`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Initial checked state for uncontrolled usage`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onChange`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`(checked: boolean) => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Callback fired when checked state changes`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`label`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Visible label text displayed next to the checkbox`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`disabled`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsx)(n.td,{children:`Disables interaction and dims appearance`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`name`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Name attribute for HTML form submission`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`value`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Value attribute for HTML form submission`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`''`})}),(0,u.jsx)(n.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`aria-label`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsxs)(n.td,{children:[`Accessible label override (defaults to `,(0,u.jsx)(n.code,{children:`label`}),` text)`]})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Token`}),(0,u.jsx)(n.th,{children:`Purpose`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(n.td,{children:`Unchecked box and default label color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-accent`})}),(0,u.jsxs)(n.td,{children:[`Checked `,(0,u.jsx)(n.code,{children:`[X]`}),` color and phosphor glow`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-brand-bright`})}),(0,u.jsx)(n.td,{children:`Hover state box color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-disabled`})}),(0,u.jsx)(n.td,{children:`Disabled state box and label color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(n.td,{children:`Focus outline ring`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--duration-fast`})}),(0,u.jsx)(n.td,{children:`Box color transition (100ms)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--spacing-2`})}),(0,u.jsx)(n.td,{children:`Gap between box and label`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(n.td,{children:`DOS font family`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-family-fallback`})}),(0,u.jsx)(n.td,{children:`Fallback font family`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-size-text-md`})}),(0,u.jsx)(n.td,{children:`Base font size`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Checkbox`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};