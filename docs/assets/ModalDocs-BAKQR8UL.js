import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as s,M as i}from"./blocks-CHTNhTiK.js";import{C as o}from"./ComponentOrigin-DcwP2sjI.js";import"./preload-helper-Dp1pzeXC.js";import"./iframe-CXx0QtOw.js";import"./index-CsQi-AF1.js";import"./index-Cn_Xdwio.js";import"./index-CRW4H6Nc.js";import"./registry-BXQUvPFZ.js";function d(r){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Modal"}),`
`,e.jsx(n.h1,{id:"modal",children:"Modal"}),`
`,e.jsxs(n.p,{children:["DOS-styled dialog overlay with CRT phosphor entrance animation and native ",e.jsx(n.code,{children:"<dialog>"})," semantics."]}),`
`,e.jsxs(n.p,{children:["The Modal uses the native HTML ",e.jsx(n.code,{children:"<dialog>"})," element via ",e.jsx(n.code,{children:"showModal()"}),` for proper focus trapping,\r
backdrop handling, and accessibility. It portals to `,e.jsx(n.code,{children:"document.body"}),` to avoid stacking context\r
issues and features a CRT-inspired entrance animation that simulates a monitor warming up.`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Interactive demos"}),": See the ",e.jsx(n.a,{href:"/story/components-modal--default",children:"Modal stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(n.h2,{id:"anatomy",children:"Anatomy"}),`
`,e.jsx(n.p,{children:"The Modal is composed of four BEM elements:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Element"}),e.jsx(n.th,{children:"Class"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Header"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"modal__header"})}),e.jsx(n.td,{children:"Title and close button row"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Title"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"modal__title"})}),e.jsx(n.td,{children:"Yellow CGA heading text"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Body"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"modal__body"})}),e.jsx(n.td,{children:"Scrollable content area"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Footer"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"modal__footer"})}),e.jsx(n.td,{children:"Optional action buttons row"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Modal\r
  isOpen={isOpen}\r
  onClose={() => setIsOpen(false)}\r
  title="Confirm Action"\r
  footer={\r
    <>\r
      <Button variant="ghost">Cancel</Button>\r
      <Button variant="primary">Confirm</Button>\r
    </>\r
  }\r
>\r
  <p>Are you sure you want to proceed?</p>\r
</Modal>
`})}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(n.h3,{id:"open",children:"Open"}),`
`,e.jsxs(n.p,{children:["When ",e.jsx(n.code,{children:"isOpen"})," becomes ",e.jsx(n.code,{children:"true"}),", the dialog opens via ",e.jsx(n.code,{children:"showModal()"}),` with a CRT phosphor\r
entrance animation: the container scales from 0.95 with blur and reduced brightness,\r
warming up over `,e.jsx(n.code,{children:"--duration-slow"})," (400ms). The backdrop fades in over ",e.jsx(n.code,{children:"--duration-normal"})," (200ms)."]}),`
`,e.jsx(n.h3,{id:"closed",children:"Closed"}),`
`,e.jsxs(n.p,{children:["When ",e.jsx(n.code,{children:"isOpen"})," becomes ",e.jsx(n.code,{children:"false"}),", the dialog closes via ",e.jsx(n.code,{children:"dialog.close()"}),`.\r
The `,e.jsx(n.code,{children:"onOpenChange"})," callback fires on every state transition."]}),`
`,e.jsx(n.h3,{id:"backdrop",children:"Backdrop"}),`
`,e.jsxs(n.p,{children:["Clicking the backdrop (the ",e.jsx(n.code,{children:"::backdrop"})," pseudo-element area) triggers ",e.jsx(n.code,{children:"onClose"}),`.\r
The backdrop uses `,e.jsx(n.code,{children:"--effects-overlay"})," for a semi-transparent dark overlay."]}),`
`,e.jsx(n.h2,{id:"interaction-design",children:"Interaction Design"}),`
`,e.jsx(n.h3,{id:"crt-phosphor-entrance",children:"CRT Phosphor Entrance"}),`
`,e.jsx(n.p,{children:"The modal entrance simulates a cold CRT monitor powering on:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`@keyframes modal-crt-enter {\r
  from {\r
    opacity: 0;\r
    filter: blur(4px) brightness(0.3);\r
    transform: scale(0.95);\r
  }\r
  to {\r
    opacity: 1;\r
    filter: blur(0) brightness(1);\r
    transform: scale(1);\r
  }\r
}
`})}),`
`,e.jsx(n.h3,{id:"close-mechanisms",children:"Close Mechanisms"}),`
`,e.jsx(n.p,{children:"Three ways to dismiss the modal:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Escape key"})," - Native ",e.jsx(n.code,{children:"<dialog>"})," behavior, fires ",e.jsx(n.code,{children:"onClose"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Backdrop click"})," - Clicking outside the container"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Close button"})," - Icon button in the header with ",e.jsx(n.code,{children:'aria-label="Close modal"'})]}),`
`]}),`
`,e.jsx(n.h2,{id:"common-patterns",children:"Common Patterns"}),`
`,e.jsx(n.h3,{id:"confirmation-dialog",children:"Confirmation Dialog"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Modal\r
  isOpen={isOpen}\r
  onClose={handleClose}\r
  title="Delete Item"\r
  footer={\r
    <>\r
      <Button variant="ghost" onClick={handleClose}>Cancel</Button>\r
      <Button variant="primary" onClick={handleDelete}>Delete</Button>\r
    </>\r
  }\r
>\r
  <p>Are you sure you want to delete this item? This action cannot be undone.</p>\r
</Modal>
`})}),`
`,e.jsx(n.h3,{id:"form-modal",children:"Form Modal"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Modal\r
  isOpen={isOpen}\r
  onClose={handleClose}\r
  title="Create New Project"\r
  footer={\r
    <>\r
      <Button variant="ghost" onClick={handleClose}>Cancel</Button>\r
      <Button variant="primary" onClick={handleSubmit}>Create</Button>\r
    </>\r
  }\r
>\r
  <form>\r
    <Input placeholder="Project name" />\r
  </form>\r
</Modal>
`})}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus trapping"}),": Native ",e.jsx(n.code,{children:"<dialog>"})," ",e.jsx(n.code,{children:"showModal()"})," provides built-in focus trapping"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Escape to close"}),": Native ",e.jsx(n.code,{children:"<dialog>"})," escape key handling"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA"}),": ",e.jsx(n.code,{children:"aria-labelledby"})," links to the title via ",e.jsx(n.code,{children:"useId()"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Close button"}),": Has ",e.jsx(n.code,{children:'aria-label="Close modal"'})," for screen readers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus visible"}),": Close button shows 2px solid outline on focus with 2px offset"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"High contrast"}),": Container border widens to 3px via ",e.jsx(n.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Reduced motion"}),": All animations disabled via ",e.jsx(n.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Portal"}),": Rendered into ",e.jsx(n.code,{children:"document.body"})," to avoid z-index stacking issues"]}),`
`]}),`
`,e.jsx(n.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"isOpen"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Whether the modal is open (required)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onClose"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"() => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Called when modal should close (required)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onOpenChange"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"(isOpen: boolean) => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Called when open state transitions"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"title"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Modal title, required for accessibility"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"children"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"ReactNode"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Modal body content"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"footer"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"ReactNode"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Footer content, typically action buttons"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"className"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"''"})}),e.jsx(n.td,{children:"Additional CSS classes"})]})]})]}),`
`,e.jsx(n.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Token"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-background-primary"})}),e.jsx(n.td,{children:"Container background"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-primary"})}),e.jsx(n.td,{children:"Dialog text color reset"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-yellow"})}),e.jsx(n.td,{children:"Container border, title text"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-light-gray"})}),e.jsx(n.td,{children:"Body text, footer text, close button"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-dark-gray"})}),e.jsx(n.td,{children:"Header/footer separator borders"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-border-focus"})}),e.jsx(n.td,{children:"Close button focus outline"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--effects-overlay"})}),e.jsx(n.td,{children:"Backdrop overlay color"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--shadow-drop"})}),e.jsx(n.td,{children:"Container drop shadow"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--typography-font-family-primary"})}),e.jsx(n.td,{children:"DOS monospace font"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--spacing-4"})}),e.jsx(n.td,{children:"Header, body, and footer padding"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--spacing-2"})}),e.jsx(n.td,{children:"Footer button gap"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--duration-slow"})}),e.jsx(n.td,{children:"CRT entrance animation (400ms)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--duration-normal"})}),e.jsx(n.td,{children:"Backdrop fade-in (200ms)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--duration-fast"})}),e.jsx(n.td,{children:"Close button hover transition (100ms)"})]})]})]}),`
`,e.jsx(n.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(o,{name:"Modal"})]})}function u(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(d,{...r})}):d(r)}export{u as default};
