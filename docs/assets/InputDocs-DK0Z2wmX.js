import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/Input`}),`
`,(0,u.jsx)(n.h1,{id:`input`,children:`Input`}),`
`,(0,u.jsx)(n.p,{children:`DOS-styled text input with validation states.`}),`
`,(0,u.jsxs)(n.p,{children:[`The Input extends the native HTML `,(0,u.jsx)(n.code,{children:`<input>`}),` element with CGA styling and a small API.\r
It uses `,(0,u.jsx)(n.code,{children:`forwardRef`}),`, and it spreads remaining props onto the input, so form libraries\r
can use it.`]}),`
`,(0,u.jsxs)(n.blockquote,{children:[`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(n.a,{href:`/story/components-input--default`,children:`Input stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`variants`,children:`Variants`}),`
`,(0,u.jsx)(n.p,{children:`Each variant maps to a validation state:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Variant`}),(0,u.jsx)(n.th,{children:`Role`}),(0,u.jsx)(n.th,{children:`Example`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Default`})}),(0,u.jsx)(n.td,{children:`Normal input state`}),(0,u.jsx)(n.td,{children:`Username, search, general text`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Error`})}),(0,u.jsx)(n.td,{children:`Invalid / failed validation`}),(0,u.jsx)(n.td,{children:`Required field missing, format error`})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Input placeholder="Enter text..." />\r
<Input variant="error" placeholder="Invalid input..." />
`})}),`
`,(0,u.jsx)(n.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(n.h3,{id:`default`,children:`Default`}),`
`,(0,u.jsxs)(n.p,{children:[`Standard input with `,(0,u.jsx)(n.code,{children:`--color-semantic-border-default`}),` border. On focus, the border\r
transitions to `,(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`}),` with a phosphor glow via\r
`,(0,u.jsx)(n.code,{children:`--shadow-glow-sm`}),`.`]}),`
`,(0,u.jsx)(n.h3,{id:`error`,children:`Error`}),`
`,(0,u.jsxs)(n.p,{children:[`Border color changes to `,(0,u.jsx)(n.code,{children:`--color-semantic-status-error`}),`. The error border persists\r
on focus to maintain validation visibility. Sets `,(0,u.jsx)(n.code,{children:`aria-invalid="true"`}),` automatically.`]}),`
`,(0,u.jsx)(n.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,u.jsxs)(n.p,{children:[`Reduced opacity (0.5), `,(0,u.jsx)(n.code,{children:`not-allowed`}),` cursor. Background stays transparent.`]}),`
`,(0,u.jsx)(n.h3,{id:`placeholder`,children:`Placeholder`}),`
`,(0,u.jsxs)(n.p,{children:[`Placeholder text uses `,(0,u.jsx)(n.code,{children:`--color-semantic-text-disabled`}),`, so it reads dimmer than\r
entered values.`]}),`
`,(0,u.jsx)(n.h2,{id:`input-types`,children:`Input types`}),`
`,(0,u.jsx)(n.p,{children:`Supports all native HTML input types via prop spreading:`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Input type="text" placeholder="Enter text..." />\r
<Input type="password" placeholder="Enter password..." />\r
<Input type="email" placeholder="user@example.com" />\r
<Input type="number" placeholder="0" />
`})}),`
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Focus visible`}),`: Border transitions to `,(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`}),` with phosphor glow`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`High contrast`}),`: Border widens to 3px; focus adds a 3px solid outline with 2px offset`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Reduced motion`}),`: All transitions disabled via `,(0,u.jsx)(n.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`ARIA`}),`: `,(0,u.jsx)(n.code,{children:`aria-invalid`}),` set automatically when `,(0,u.jsx)(n.code,{children:`variant="error"`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Ref forwarding`}),`: `,(0,u.jsx)(n.code,{children:`forwardRef`}),` support for focus management and form integration`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`form-usage`,children:`Form usage`}),`
`,(0,u.jsx)(n.p,{children:`Works with native forms and form libraries:`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<form>\r
  <label htmlFor="username">Username</label>\r
  <Input id="username" name="username" required />\r
\r
  <label htmlFor="password">Password</label>\r
  <Input id="password" name="password" type="password" />\r
\r
  <Button type="submit" variant="primary">Log In</Button>\r
</form>
`})}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`variant`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'default' | 'error'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'default'`})}),(0,u.jsx)(n.td,{children:`Visual variant for validation states`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`disabled`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsx)(n.td,{children:`Disables interaction`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`''`})}),(0,u.jsx)(n.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`placeholder`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Placeholder text`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`type`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'text'`})}),(0,u.jsxs)(n.td,{children:[`HTML input type (`,(0,u.jsx)(n.code,{children:`text`}),`, `,(0,u.jsx)(n.code,{children:`password`}),`, `,(0,u.jsx)(n.code,{children:`email`}),`, `,(0,u.jsx)(n.code,{children:`number`}),`, etc.)`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`ref`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`Ref<HTMLInputElement>`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Forwarded ref to the input element`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`...props`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`InputHTMLAttributes`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`All native HTML input attributes are spread`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Token`}),(0,u.jsx)(n.th,{children:`Purpose`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-brand`})}),(0,u.jsx)(n.td,{children:`Input and label text color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-muted`})}),(0,u.jsx)(n.td,{children:`Description text color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-error`})}),(0,u.jsx)(n.td,{children:`Error message text color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-disabled`})}),(0,u.jsx)(n.td,{children:`Placeholder text color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(n.td,{children:`Default border`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(n.td,{children:`Focus border`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-status-error`})}),(0,u.jsx)(n.td,{children:`Error variant border`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--shadow-glow-sm`})}),(0,u.jsx)(n.td,{children:`Focus phosphor glow`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(n.td,{children:`DOS monospace font`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--duration-normal`})}),(0,u.jsx)(n.td,{children:`Border transition (200ms)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--duration-slow`})}),(0,u.jsx)(n.td,{children:`Glow transition (400ms)`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Input`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};