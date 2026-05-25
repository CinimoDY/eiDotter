import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/Input`}),`
`,(0,u.jsx)(r.h1,{id:`input`,children:`Input`}),`
`,(0,u.jsx)(r.p,{children:`DOS-styled text input with authentic terminal aesthetics and validation states.`}),`
`,(0,u.jsxs)(r.p,{children:[`The Input extends the native HTML `,(0,u.jsx)(r.code,{children:`<input>`}),` element, providing CGA-authentic styling\r
with a minimal, focused API. It uses `,(0,u.jsx)(r.code,{children:`forwardRef`}),` for full ref compatibility and\r
spreads remaining props for seamless integration with form libraries.`]}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-input--default`,children:`Input stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`variants`,children:`Variants`}),`
`,(0,u.jsx)(r.p,{children:`Each variant maps to a specific validation state:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Variant`}),(0,u.jsx)(r.th,{children:`Role`}),(0,u.jsx)(r.th,{children:`Example`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Default`})}),(0,u.jsx)(r.td,{children:`Normal input state`}),(0,u.jsx)(r.td,{children:`Username, search, general text`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Error`})}),(0,u.jsx)(r.td,{children:`Invalid / failed validation`}),(0,u.jsx)(r.td,{children:`Required field missing, format error`})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Input placeholder="Enter text..." />\r
<Input variant="error" placeholder="Invalid input..." />
`})}),`
`,(0,u.jsx)(r.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(r.h3,{id:`default`,children:`Default`}),`
`,(0,u.jsxs)(r.p,{children:[`Standard input with `,(0,u.jsx)(r.code,{children:`--color-semantic-border-default`}),` border. On focus, the border\r
transitions to `,(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`}),` with a subtle phosphor glow via\r
`,(0,u.jsx)(r.code,{children:`--shadow-glow-sm`}),`.`]}),`
`,(0,u.jsx)(r.h3,{id:`error`,children:`Error`}),`
`,(0,u.jsxs)(r.p,{children:[`Border color changes to `,(0,u.jsx)(r.code,{children:`--color-semantic-status-error`}),`. The error border persists\r
on focus to maintain validation visibility. Sets `,(0,u.jsx)(r.code,{children:`aria-invalid="true"`}),` automatically.`]}),`
`,(0,u.jsx)(r.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,u.jsxs)(r.p,{children:[`Reduced opacity (0.5), `,(0,u.jsx)(r.code,{children:`not-allowed`}),` cursor. Background remains\r
`,(0,u.jsx)(r.code,{children:`--color-semantic-background-primary`}),` to keep the dormant terminal feel.`]}),`
`,(0,u.jsx)(r.h3,{id:`placeholder`,children:`Placeholder`}),`
`,(0,u.jsxs)(r.p,{children:[`Placeholder text uses `,(0,u.jsx)(r.code,{children:`--color-semantic-text-disabled`}),` for a dim, inactive appearance\r
that doesn't compete with entered values.`]}),`
`,(0,u.jsx)(r.h2,{id:`input-types`,children:`Input Types`}),`
`,(0,u.jsx)(r.p,{children:`Supports all native HTML input types via prop spreading:`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Input type="text" placeholder="Enter text..." />\r
<Input type="password" placeholder="Enter password..." />\r
<Input type="email" placeholder="user@example.com" />\r
<Input type="number" placeholder="0" />
`})}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Focus visible`}),`: Border transitions to `,(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`}),` with phosphor glow`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`High contrast`}),`: Border widens to 3px; focus adds a 3px solid outline with 2px offset`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Reduced motion`}),`: All transitions disabled via `,(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`ARIA`}),`: `,(0,u.jsx)(r.code,{children:`aria-invalid`}),` set automatically when `,(0,u.jsx)(r.code,{children:`variant="error"`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Ref forwarding`}),`: Full `,(0,u.jsx)(r.code,{children:`forwardRef`}),` support for focus management and form integration`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`form-usage`,children:`Form Usage`}),`
`,(0,u.jsx)(r.p,{children:`Works seamlessly with native forms and form libraries:`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<form>\r
  <label htmlFor="username">Username</label>\r
  <Input id="username" name="username" required />\r
\r
  <label htmlFor="password">Password</label>\r
  <Input id="password" name="password" type="password" />\r
\r
  <Button type="submit" variant="primary">Log In</Button>\r
</form>
`})}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`variant`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'default' | 'error'`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'default'`})}),(0,u.jsx)(r.td,{children:`Visual variant for validation states`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`disabled`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Disables interaction`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`''`})}),(0,u.jsx)(r.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`placeholder`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Placeholder text`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`type`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'text'`})}),(0,u.jsxs)(r.td,{children:[`HTML input type (`,(0,u.jsx)(r.code,{children:`text`}),`, `,(0,u.jsx)(r.code,{children:`password`}),`, `,(0,u.jsx)(r.code,{children:`email`}),`, `,(0,u.jsx)(r.code,{children:`number`}),`, etc.)`]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ref`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`Ref<HTMLInputElement>`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Forwarded ref to the input element`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`...props`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`InputHTMLAttributes`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`All native HTML input attributes are spread`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`design-tokens-used`,children:`Design Tokens Used`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Token`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-primary`})}),(0,u.jsx)(r.td,{children:`Input background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(r.td,{children:`Input text color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-disabled`})}),(0,u.jsx)(r.td,{children:`Placeholder text color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(r.td,{children:`Default border`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(r.td,{children:`Focus border`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-status-error`})}),(0,u.jsx)(r.td,{children:`Error variant border`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--shadow-glow-sm`})}),(0,u.jsx)(r.td,{children:`Focus phosphor glow`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--border-width-medium`})}),(0,u.jsx)(r.td,{children:`Border thickness`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(r.td,{children:`DOS monospace font`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-size-text-md`})}),(0,u.jsx)(r.td,{children:`Input font size`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--spacing-2`})}),(0,u.jsx)(r.td,{children:`Input padding`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-normal`})}),(0,u.jsx)(r.td,{children:`Border transition (200ms)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-slow`})}),(0,u.jsx)(r.td,{children:`Glow transition (400ms)`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Input`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};