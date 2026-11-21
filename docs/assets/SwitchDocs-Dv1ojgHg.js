import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/Switch`}),`
`,(0,u.jsx)(n.h1,{id:`switch`,children:`Switch`}),`
`,(0,u.jsx)(n.p,{children:`DOS-styled toggle switch with phosphor glow effects.`}),`
`,(0,u.jsxs)(n.p,{children:[`The Switch is a boolean toggle control rendered as a `,(0,u.jsx)(n.code,{children:`<button>`}),` with `,(0,u.jsx)(n.code,{children:`role="switch"`}),`.\r
It works controlled or uncontrolled and includes a hidden `,(0,u.jsx)(n.code,{children:`<input>`}),` for form submission.\r
The thumb moves with a spring-overshoot animation modeled on a CRT monitor warming up.`]}),`
`,(0,u.jsxs)(n.blockquote,{children:[`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(n.a,{href:`/story/components-switch--default`,children:`Switch stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(n.h3,{id:`unchecked-off`,children:`Unchecked (off)`}),`
`,(0,u.jsx)(n.p,{children:`Default rest state. The track uses the secondary background with a default border.\r
The thumb sits on the left side in the primary text color.`}),`
`,(0,u.jsx)(n.h3,{id:`checked-on`,children:`Checked (on)`}),`
`,(0,u.jsxs)(n.p,{children:[`The track fills with the accent background color and gains a glow\r
(`,(0,u.jsx)(n.code,{children:`--shadow-glow-xs`}),`). The thumb slides right with a spring overshoot curve\r
(`,(0,u.jsx)(n.code,{children:`cubic-bezier(0.2, 0.8, 0.2, 1.4)`}),`) and takes on the secondary text color\r
(dark on amber).`]}),`
`,(0,u.jsx)(n.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,u.jsxs)(n.p,{children:[`Reduced opacity (0.5), `,(0,u.jsx)(n.code,{children:`not-allowed`}),` cursor. Both checked and unchecked states\r
share the same dimmed appearance. The track uses the disabled border color and\r
the thumb uses the disabled text color.`]}),`
`,(0,u.jsx)(n.h3,{id:`hover`,children:`Hover`}),`
`,(0,u.jsx)(n.p,{children:`Border color shifts to the hover border token. When unchecked, the thumb\r
brightens to the accent text color as a preview of the "on" state.`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Switch aria-label="Toggle setting" />\r
<Switch defaultChecked aria-label="Toggle setting" />\r
<Switch disabled aria-label="Toggle setting" />\r
<Switch disabled defaultChecked aria-label="Toggle setting" />
`})}),`
`,(0,u.jsx)(n.h2,{id:`controlled-vs-uncontrolled`,children:`Controlled vs uncontrolled`}),`
`,(0,u.jsx)(n.h3,{id:`uncontrolled-default`,children:`Uncontrolled (default)`}),`
`,(0,u.jsxs)(n.p,{children:[`Use `,(0,u.jsx)(n.code,{children:`defaultChecked`}),` to set the initial state. The Switch manages its own state:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Switch defaultChecked onCheckedChange={(checked) => console.log(checked)} />
`})}),`
`,(0,u.jsx)(n.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,u.jsxs)(n.p,{children:[`Pass `,(0,u.jsx)(n.code,{children:`checked`}),` and `,(0,u.jsx)(n.code,{children:`onCheckedChange`}),` to keep the state in the parent:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`const [checked, setChecked] = useState(false);\r
<Switch checked={checked} onCheckedChange={setChecked} />
`})}),`
`,(0,u.jsx)(n.h2,{id:`form-usage`,children:`Form usage`}),`
`,(0,u.jsxs)(n.p,{children:[`When a `,(0,u.jsx)(n.code,{children:`name`}),` prop is provided, the Switch renders a hidden `,(0,u.jsx)(n.code,{children:`<input>`}),` for form submission.\r
The input value is the `,(0,u.jsx)(n.code,{children:`value`}),` prop (or `,(0,u.jsx)(n.code,{children:`"on"`}),` by default) when checked, and an empty\r
string when unchecked:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<form>\r
  <Switch name="crt-effects" value="enabled" aria-label="Enable CRT effects" />\r
</form>
`})}),`
`,(0,u.jsx)(n.h2,{id:`with-external-label`,children:`With external label`}),`
`,(0,u.jsxs)(n.p,{children:[`Associate a visible label using `,(0,u.jsx)(n.code,{children:`aria-labelledby`}),`:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>\r
  <Switch aria-labelledby="switch-label" />\r
  <label id="switch-label">Enable CRT effects</label>\r
</div>
`})}),`
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Role`}),`: Uses `,(0,u.jsx)(n.code,{children:`role="switch"`}),` with `,(0,u.jsx)(n.code,{children:`aria-checked`}),` reflecting current state`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`ARIA disabled`}),`: `,(0,u.jsx)(n.code,{children:`aria-disabled`}),` set when disabled`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Focus visible`}),`: 2px solid outline with 2px offset, using `,(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`High contrast`}),`: Track border widens to 3px via `,(0,u.jsx)(n.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Reduced motion`}),`: All transitions and glow effects disabled via `,(0,u.jsx)(n.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Keyboard`}),`: Toggle with Space or Enter keys`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`checked`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Controlled checked state`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`defaultChecked`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsx)(n.td,{children:`Initial checked state (uncontrolled)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onCheckedChange`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`(checked: boolean) => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Callback when state changes`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`disabled`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsx)(n.td,{children:`Disables interaction`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`name`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Name for form submission (renders hidden input)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`value`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Value for form submission`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`''`})}),(0,u.jsx)(n.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`aria-label`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Accessible label for screen readers`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`aria-labelledby`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`ID of element that labels this switch`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Token`}),(0,u.jsx)(n.th,{children:`Purpose`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-background-secondary`})}),(0,u.jsx)(n.td,{children:`Track background (unchecked)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-background-accent`})}),(0,u.jsx)(n.td,{children:`Track background (checked)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(n.td,{children:`Track border (unchecked)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(n.td,{children:`Focus outline and checked border`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-hover`})}),(0,u.jsx)(n.td,{children:`Hover border color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-disabled`})}),(0,u.jsx)(n.td,{children:`Disabled track border`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(n.td,{children:`Thumb color (unchecked)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-on-accent`})}),(0,u.jsx)(n.td,{children:`Thumb color (checked, dark on amber)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-accent`})}),(0,u.jsx)(n.td,{children:`Thumb hover color (unchecked)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-disabled`})}),(0,u.jsx)(n.td,{children:`Disabled thumb color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--shadow-glow-xs`})}),(0,u.jsx)(n.td,{children:`Checked track glow`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--duration-fast`})}),(0,u.jsx)(n.td,{children:`Track transition speed (100ms)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--duration-normal`})}),(0,u.jsx)(n.td,{children:`Thumb slide duration (200ms)`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Switch`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};