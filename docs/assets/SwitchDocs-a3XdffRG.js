import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/Switch`}),`
`,(0,u.jsx)(r.h1,{id:`switch`,children:`Switch`}),`
`,(0,u.jsx)(r.p,{children:`DOS-styled toggle switch with authentic terminal aesthetics and phosphor glow effects.`}),`
`,(0,u.jsxs)(r.p,{children:[`The Switch is a boolean toggle control rendered as a `,(0,u.jsx)(r.code,{children:`<button>`}),` with `,(0,u.jsx)(r.code,{children:`role="switch"`}),`.\r
It supports both controlled and uncontrolled modes, includes a hidden `,(0,u.jsx)(r.code,{children:`<input>`}),` for\r
form submission, and features a spring-overshoot thumb animation inspired by CRT\r
monitor warm-up behavior.`]}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-switch--default`,children:`Switch stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(r.h3,{id:`unchecked-off`,children:`Unchecked (Off)`}),`
`,(0,u.jsx)(r.p,{children:`Default rest state. The track uses the secondary background with a default border.\r
The thumb sits on the left side in the primary text color.`}),`
`,(0,u.jsx)(r.h3,{id:`checked-on`,children:`Checked (On)`}),`
`,(0,u.jsxs)(r.p,{children:[`The track fills with the accent background color and gains a subtle glow\r
(`,(0,u.jsx)(r.code,{children:`--shadow-glow-xs`}),`). The thumb slides right with a spring overshoot curve\r
(`,(0,u.jsx)(r.code,{children:`cubic-bezier(0.2, 0.8, 0.2, 1.4)`}),`) and takes on the secondary text color\r
(dark on amber).`]}),`
`,(0,u.jsx)(r.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,u.jsxs)(r.p,{children:[`Reduced opacity (0.5), `,(0,u.jsx)(r.code,{children:`not-allowed`}),` cursor. Both checked and unchecked states\r
share the same dimmed appearance. The track uses the disabled border color and\r
the thumb uses the disabled text color.`]}),`
`,(0,u.jsx)(r.h3,{id:`hover`,children:`Hover`}),`
`,(0,u.jsx)(r.p,{children:`Border color shifts to the hover border token. When unchecked, the thumb\r
brightens to the accent text color, providing a preview of the "on" state.`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Switch aria-label="Toggle setting" />\r
<Switch defaultChecked aria-label="Toggle setting" />\r
<Switch disabled aria-label="Toggle setting" />\r
<Switch disabled defaultChecked aria-label="Toggle setting" />
`})}),`
`,(0,u.jsx)(r.h2,{id:`controlled-vs-uncontrolled`,children:`Controlled vs Uncontrolled`}),`
`,(0,u.jsx)(r.h3,{id:`uncontrolled-default`,children:`Uncontrolled (default)`}),`
`,(0,u.jsxs)(r.p,{children:[`Use `,(0,u.jsx)(r.code,{children:`defaultChecked`}),` to set the initial state. The Switch manages its own state:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Switch defaultChecked onCheckedChange={(checked) => console.log(checked)} />
`})}),`
`,(0,u.jsx)(r.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,u.jsxs)(r.p,{children:[`Pass `,(0,u.jsx)(r.code,{children:`checked`}),` and `,(0,u.jsx)(r.code,{children:`onCheckedChange`}),` to fully control the state externally:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`const [checked, setChecked] = useState(false);\r
<Switch checked={checked} onCheckedChange={setChecked} />
`})}),`
`,(0,u.jsx)(r.h2,{id:`form-usage`,children:`Form Usage`}),`
`,(0,u.jsxs)(r.p,{children:[`When a `,(0,u.jsx)(r.code,{children:`name`}),` prop is provided, the Switch renders a hidden `,(0,u.jsx)(r.code,{children:`<input>`}),` for form submission.\r
The input value is the `,(0,u.jsx)(r.code,{children:`value`}),` prop (or `,(0,u.jsx)(r.code,{children:`"on"`}),` by default) when checked, and an empty\r
string when unchecked:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<form>\r
  <Switch name="crt-effects" value="enabled" aria-label="Enable CRT effects" />\r
</form>
`})}),`
`,(0,u.jsx)(r.h2,{id:`with-external-label`,children:`With External Label`}),`
`,(0,u.jsxs)(r.p,{children:[`Associate a visible label using `,(0,u.jsx)(r.code,{children:`aria-labelledby`}),`:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>\r
  <Switch aria-labelledby="switch-label" />\r
  <label id="switch-label">Enable CRT effects</label>\r
</div>
`})}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Role`}),`: Uses `,(0,u.jsx)(r.code,{children:`role="switch"`}),` with `,(0,u.jsx)(r.code,{children:`aria-checked`}),` reflecting current state`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`ARIA disabled`}),`: `,(0,u.jsx)(r.code,{children:`aria-disabled`}),` set when disabled`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Focus visible`}),`: 2px solid outline with 2px offset, using `,(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`High contrast`}),`: Track border widens to 3px via `,(0,u.jsx)(r.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Reduced motion`}),`: All transitions and glow effects disabled via `,(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Keyboard`}),`: Toggle with Space or Enter keys`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`checked`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Controlled checked state`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`defaultChecked`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Initial checked state (uncontrolled)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onCheckedChange`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`(checked: boolean) => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Callback when state changes`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`disabled`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Disables interaction`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`name`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Name for form submission (renders hidden input)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`value`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Value for form submission`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`''`})}),(0,u.jsx)(r.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`aria-label`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Accessible label for screen readers`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`aria-labelledby`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`ID of element that labels this switch`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`design-tokens-used`,children:`Design Tokens Used`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Token`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-secondary`})}),(0,u.jsx)(r.td,{children:`Track background (unchecked)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-accent`})}),(0,u.jsx)(r.td,{children:`Track background (checked)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(r.td,{children:`Track border (unchecked)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(r.td,{children:`Focus outline and checked border`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-hover`})}),(0,u.jsx)(r.td,{children:`Hover border color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-disabled`})}),(0,u.jsx)(r.td,{children:`Disabled track border`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(r.td,{children:`Thumb color (unchecked)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-secondary`})}),(0,u.jsx)(r.td,{children:`Thumb color (checked, dark on amber)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-accent`})}),(0,u.jsx)(r.td,{children:`Thumb hover color (unchecked)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-disabled`})}),(0,u.jsx)(r.td,{children:`Disabled thumb color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--shadow-glow-xs`})}),(0,u.jsx)(r.td,{children:`Checked track glow`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-fast`})}),(0,u.jsx)(r.td,{children:`Track transition speed (100ms)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-normal`})}),(0,u.jsx)(r.td,{children:`Thumb slide duration (200ms)`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Switch`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};