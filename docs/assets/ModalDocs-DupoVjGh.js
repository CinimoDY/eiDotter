import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/Modal`}),`
`,(0,u.jsx)(r.h1,{id:`modal`,children:`Modal`}),`
`,(0,u.jsxs)(r.p,{children:[`DOS-styled dialog overlay with CRT phosphor entrance animation and native `,(0,u.jsx)(r.code,{children:`<dialog>`}),` semantics.`]}),`
`,(0,u.jsxs)(r.p,{children:[`The Modal uses the native HTML `,(0,u.jsx)(r.code,{children:`<dialog>`}),` element via `,(0,u.jsx)(r.code,{children:`showModal()`}),` for proper focus trapping,\r
backdrop handling, and accessibility. It portals to `,(0,u.jsx)(r.code,{children:`document.body`}),` to avoid stacking context\r
issues and features a CRT-inspired entrance animation that simulates a monitor warming up.`]}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-modal--default`,children:`Modal stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`anatomy`,children:`Anatomy`}),`
`,(0,u.jsx)(r.p,{children:`The Modal is composed of four BEM elements:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Element`}),(0,u.jsx)(r.th,{children:`Class`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Header`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`modal__header`})}),(0,u.jsx)(r.td,{children:`Title and close button row`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Title`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`modal__title`})}),(0,u.jsx)(r.td,{children:`Yellow CGA heading text`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Body`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`modal__body`})}),(0,u.jsx)(r.td,{children:`Scrollable content area`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Footer`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`modal__footer`})}),(0,u.jsx)(r.td,{children:`Optional action buttons row`})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Modal\r
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
`,(0,u.jsx)(r.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(r.h3,{id:`open`,children:`Open`}),`
`,(0,u.jsxs)(r.p,{children:[`When `,(0,u.jsx)(r.code,{children:`isOpen`}),` becomes `,(0,u.jsx)(r.code,{children:`true`}),`, the dialog opens via `,(0,u.jsx)(r.code,{children:`showModal()`}),` with a CRT phosphor\r
entrance animation: the container scales from 0.95 with blur and reduced brightness,\r
warming up over `,(0,u.jsx)(r.code,{children:`--duration-slow`}),` (400ms). The backdrop fades in over `,(0,u.jsx)(r.code,{children:`--duration-normal`}),` (200ms).`]}),`
`,(0,u.jsx)(r.h3,{id:`closed`,children:`Closed`}),`
`,(0,u.jsxs)(r.p,{children:[`When `,(0,u.jsx)(r.code,{children:`isOpen`}),` becomes `,(0,u.jsx)(r.code,{children:`false`}),`, the dialog closes via `,(0,u.jsx)(r.code,{children:`dialog.close()`}),`.\r
The `,(0,u.jsx)(r.code,{children:`onOpenChange`}),` callback fires on every state transition.`]}),`
`,(0,u.jsx)(r.h3,{id:`backdrop`,children:`Backdrop`}),`
`,(0,u.jsxs)(r.p,{children:[`Clicking the backdrop (the `,(0,u.jsx)(r.code,{children:`::backdrop`}),` pseudo-element area) triggers `,(0,u.jsx)(r.code,{children:`onClose`}),`.\r
The backdrop uses `,(0,u.jsx)(r.code,{children:`--effects-overlay`}),` for a semi-transparent dark overlay.`]}),`
`,(0,u.jsx)(r.h2,{id:`interaction-design`,children:`Interaction Design`}),`
`,(0,u.jsx)(r.h3,{id:`crt-phosphor-entrance`,children:`CRT Phosphor Entrance`}),`
`,(0,u.jsx)(r.p,{children:`The modal entrance simulates a cold CRT monitor powering on:`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-css`,children:`@keyframes modal-crt-enter {\r
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
`,(0,u.jsx)(r.h3,{id:`close-mechanisms`,children:`Close Mechanisms`}),`
`,(0,u.jsx)(r.p,{children:`Three ways to dismiss the modal:`}),`
`,(0,u.jsxs)(r.ol,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Escape key`}),` - Native `,(0,u.jsx)(r.code,{children:`<dialog>`}),` behavior, fires `,(0,u.jsx)(r.code,{children:`onClose`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Backdrop click`}),` - Clicking outside the container`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Close button`}),` - Icon button in the header with `,(0,u.jsx)(r.code,{children:`aria-label="Close modal"`})]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`common-patterns`,children:`Common Patterns`}),`
`,(0,u.jsx)(r.h3,{id:`confirmation-dialog`,children:`Confirmation Dialog`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Modal\r
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
`,(0,u.jsx)(r.h3,{id:`form-modal`,children:`Form Modal`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Modal\r
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
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Focus trapping`}),`: Native `,(0,u.jsx)(r.code,{children:`<dialog>`}),` `,(0,u.jsx)(r.code,{children:`showModal()`}),` provides built-in focus trapping`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Escape to close`}),`: Native `,(0,u.jsx)(r.code,{children:`<dialog>`}),` escape key handling`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`ARIA`}),`: `,(0,u.jsx)(r.code,{children:`aria-labelledby`}),` links to the title via `,(0,u.jsx)(r.code,{children:`useId()`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Close button`}),`: Has `,(0,u.jsx)(r.code,{children:`aria-label="Close modal"`}),` for screen readers`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Focus visible`}),`: Close button shows 2px solid outline on focus with 2px offset`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`High contrast`}),`: Container border widens to 3px via `,(0,u.jsx)(r.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Reduced motion`}),`: All animations disabled via `,(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Portal`}),`: Rendered into `,(0,u.jsx)(r.code,{children:`document.body`}),` to avoid z-index stacking issues`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`isOpen`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Whether the modal is open (required)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onClose`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`() => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Called when modal should close (required)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onOpenChange`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`(isOpen: boolean) => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Called when open state transitions`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`title`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Modal title, required for accessibility`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`children`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ReactNode`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Modal body content`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`footer`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ReactNode`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Footer content, typically action buttons`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`''`})}),(0,u.jsx)(r.td,{children:`Additional CSS classes`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`design-tokens-used`,children:`Design Tokens Used`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Token`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-primary`})}),(0,u.jsx)(r.td,{children:`Container background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(r.td,{children:`Dialog text color reset`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-cga-yellow`})}),(0,u.jsx)(r.td,{children:`Container border, title text`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-cga-light-gray`})}),(0,u.jsx)(r.td,{children:`Body text, footer text, close button`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-cga-dark-gray`})}),(0,u.jsx)(r.td,{children:`Header/footer separator borders`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(r.td,{children:`Close button focus outline`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--effects-overlay`})}),(0,u.jsx)(r.td,{children:`Backdrop overlay color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--shadow-drop`})}),(0,u.jsx)(r.td,{children:`Container drop shadow`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(r.td,{children:`DOS monospace font`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--spacing-4`})}),(0,u.jsx)(r.td,{children:`Header, body, and footer padding`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--spacing-2`})}),(0,u.jsx)(r.td,{children:`Footer button gap`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-slow`})}),(0,u.jsx)(r.td,{children:`CRT entrance animation (400ms)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-normal`})}),(0,u.jsx)(r.td,{children:`Backdrop fade-in (200ms)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-fast`})}),(0,u.jsx)(r.td,{children:`Close button hover transition (100ms)`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Modal`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};