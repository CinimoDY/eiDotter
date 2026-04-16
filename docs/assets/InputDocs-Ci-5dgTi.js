import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as s,M as i}from"./blocks-BAJK2Xxh.js";import{C as t}from"./ComponentOrigin-BogxVIkj.js";import"./preload-helper-Dp1pzeXC.js";import"./iframe-DuFfgGUU.js";import"./index-CjOovKeQ.js";import"./index-BOb-1P7R.js";import"./index-CFke79mk.js";import"./registry-CyM9n0D0.js";function d(n){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Input"}),`
`,e.jsx(r.h1,{id:"input",children:"Input"}),`
`,e.jsx(r.p,{children:"DOS-styled text input with authentic terminal aesthetics and validation states."}),`
`,e.jsxs(r.p,{children:["The Input extends the native HTML ",e.jsx(r.code,{children:"<input>"}),` element, providing CGA-authentic styling\r
with a minimal, focused API. It uses `,e.jsx(r.code,{children:"forwardRef"}),` for full ref compatibility and\r
spreads remaining props for seamless integration with form libraries.`]}),`
`,e.jsxs(r.blockquote,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Interactive demos"}),": See the ",e.jsx(r.a,{href:"/story/components-input--default",children:"Input stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(r.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(r.p,{children:"Each variant maps to a specific validation state:"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Variant"}),e.jsx(r.th,{children:"Role"}),e.jsx(r.th,{children:"Example"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.strong,{children:"Default"})}),e.jsx(r.td,{children:"Normal input state"}),e.jsx(r.td,{children:"Username, search, general text"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.strong,{children:"Error"})}),e.jsx(r.td,{children:"Invalid / failed validation"}),e.jsx(r.td,{children:"Required field missing, format error"})]})]})]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`<Input placeholder="Enter text..." />\r
<Input variant="error" placeholder="Invalid input..." />
`})}),`
`,e.jsx(r.h2,{id:"states",children:"States"}),`
`,e.jsx(r.h3,{id:"default",children:"Default"}),`
`,e.jsxs(r.p,{children:["Standard input with ",e.jsx(r.code,{children:"--color-semantic-border-default"}),` border. On focus, the border\r
transitions to `,e.jsx(r.code,{children:"--color-semantic-border-focus"}),` with a subtle phosphor glow via\r
`,e.jsx(r.code,{children:"--shadow-glow-sm"}),"."]}),`
`,e.jsx(r.h3,{id:"error",children:"Error"}),`
`,e.jsxs(r.p,{children:["Border color changes to ",e.jsx(r.code,{children:"--color-semantic-status-error"}),`. The error border persists\r
on focus to maintain validation visibility. Sets `,e.jsx(r.code,{children:'aria-invalid="true"'})," automatically."]}),`
`,e.jsx(r.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsxs(r.p,{children:["Reduced opacity (0.5), ",e.jsx(r.code,{children:"not-allowed"}),` cursor. Background remains\r
`,e.jsx(r.code,{children:"--color-semantic-background-primary"})," to keep the dormant terminal feel."]}),`
`,e.jsx(r.h3,{id:"placeholder",children:"Placeholder"}),`
`,e.jsxs(r.p,{children:["Placeholder text uses ",e.jsx(r.code,{children:"--color-semantic-text-disabled"}),` for a dim, inactive appearance\r
that doesn't compete with entered values.`]}),`
`,e.jsx(r.h2,{id:"input-types",children:"Input Types"}),`
`,e.jsx(r.p,{children:"Supports all native HTML input types via prop spreading:"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`<Input type="text" placeholder="Enter text..." />\r
<Input type="password" placeholder="Enter password..." />\r
<Input type="email" placeholder="user@example.com" />\r
<Input type="number" placeholder="0" />
`})}),`
`,e.jsx(r.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Focus visible"}),": Border transitions to ",e.jsx(r.code,{children:"--color-semantic-border-focus"})," with phosphor glow"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"High contrast"}),": Border widens to 3px; focus adds a 3px solid outline with 2px offset"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Reduced motion"}),": All transitions disabled via ",e.jsx(r.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"ARIA"}),": ",e.jsx(r.code,{children:"aria-invalid"})," set automatically when ",e.jsx(r.code,{children:'variant="error"'})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Ref forwarding"}),": Full ",e.jsx(r.code,{children:"forwardRef"})," support for focus management and form integration"]}),`
`]}),`
`,e.jsx(r.h2,{id:"form-usage",children:"Form Usage"}),`
`,e.jsx(r.p,{children:"Works seamlessly with native forms and form libraries:"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`<form>\r
  <label htmlFor="username">Username</label>\r
  <Input id="username" name="username" required />\r
\r
  <label htmlFor="password">Password</label>\r
  <Input id="password" name="password" type="password" />\r
\r
  <Button type="submit" variant="primary">Log In</Button>\r
</form>
`})}),`
`,e.jsx(r.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"variant"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"'default' | 'error'"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"'default'"})}),e.jsx(r.td,{children:"Visual variant for validation states"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"disabled"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"false"})}),e.jsx(r.td,{children:"Disables interaction"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"className"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"''"})}),e.jsx(r.td,{children:"Additional CSS classes"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"placeholder"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:"—"}),e.jsx(r.td,{children:"Placeholder text"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"type"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"'text'"})}),e.jsxs(r.td,{children:["HTML input type (",e.jsx(r.code,{children:"text"}),", ",e.jsx(r.code,{children:"password"}),", ",e.jsx(r.code,{children:"email"}),", ",e.jsx(r.code,{children:"number"}),", etc.)"]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"ref"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"Ref<HTMLInputElement>"})}),e.jsx(r.td,{children:"—"}),e.jsx(r.td,{children:"Forwarded ref to the input element"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"...props"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"InputHTMLAttributes"})}),e.jsx(r.td,{children:"—"}),e.jsx(r.td,{children:"All native HTML input attributes are spread"})]})]})]}),`
`,e.jsx(r.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Token"}),e.jsx(r.th,{children:"Purpose"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-background-primary"})}),e.jsx(r.td,{children:"Input background"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-text-primary"})}),e.jsx(r.td,{children:"Input text color"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-text-disabled"})}),e.jsx(r.td,{children:"Placeholder text color"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-border-default"})}),e.jsx(r.td,{children:"Default border"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-border-focus"})}),e.jsx(r.td,{children:"Focus border"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-status-error"})}),e.jsx(r.td,{children:"Error variant border"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--shadow-glow-sm"})}),e.jsx(r.td,{children:"Focus phosphor glow"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--border-width-medium"})}),e.jsx(r.td,{children:"Border thickness"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--typography-font-family-primary"})}),e.jsx(r.td,{children:"DOS monospace font"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--typography-font-size-text-md"})}),e.jsx(r.td,{children:"Input font size"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--spacing-2"})}),e.jsx(r.td,{children:"Input padding"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--duration-normal"})}),e.jsx(r.td,{children:"Border transition (200ms)"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--duration-slow"})}),e.jsx(r.td,{children:"Glow transition (400ms)"})]})]})]}),`
`,e.jsx(r.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(t,{name:"Input"})]})}function m(n={}){const{wrapper:r}={...s(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(d,{...n})}):d(n)}export{m as default};
