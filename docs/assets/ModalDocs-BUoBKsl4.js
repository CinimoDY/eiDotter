import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/Modal`}),`
`,(0,u.jsx)(n.h1,{id:`modal`,children:`Modal`}),`
`,(0,u.jsxs)(n.p,{children:[`DOS-styled dialog built on the `,(0,u.jsx)(n.strong,{children:`DosDialog`}),` shell (DMNC-1592), the same chrome as CmdPalette and Lightbox.`]}),`
`,(0,u.jsxs)(n.p,{children:[`React Aria `,(0,u.jsx)(n.code,{children:`ModalOverlay > Modal > Dialog`}),` (via DosDialog) handles the focus trap, scroll lock,\r
Escape and backdrop dismissal, and portals to `,(0,u.jsx)(n.code,{children:`document.body`}),`. The title sits in the amber title\r
strip (dark, yellow title, dim-amber rule) with the Close icon at its end. The footer keeps its 1px top rule.`]}),`
`,(0,u.jsxs)(n.blockquote,{children:[`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(n.a,{href:`/story/components-modal--default`,children:`Modal stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`anatomy`,children:`Anatomy`}),`
`,(0,u.jsx)(n.p,{children:`The Modal renders through DosDialog. Its parts carry the shell's stable classes plus Modal's own:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Element`}),(0,u.jsx)(n.th,{children:`Class`}),(0,u.jsx)(n.th,{children:`Purpose`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Container`})}),(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`eidotter-dialog__container`}),` + `,(0,u.jsx)(n.code,{children:`eidotter-modal__container`})]}),(0,u.jsx)(n.td,{children:`Brand border, amber glow, square corners`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Title strip`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`eidotter-dialog__head`})}),(0,u.jsxs)(n.td,{children:[`Dark strip: `,(0,u.jsx)(n.code,{children:`▸`}),` marker, yellow `,(0,u.jsx)(n.code,{children:`<h2>`}),` title, close control, dim-amber rule`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Close`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`eidotter-modal__close`})}),(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`IconButton`}),` (pixel X, md 36×36, overhanging the strip padding) in the strip end slot`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Body`})}),(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`eidotter-dialog__body`}),` > `,(0,u.jsx)(n.code,{children:`eidotter-modal__body`})]}),(0,u.jsx)(n.td,{children:`Scrollable content area`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Footer`})}),(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`eidotter-dialog__footer`}),` > `,(0,u.jsx)(n.code,{children:`eidotter-modal__footer`})]}),(0,u.jsx)(n.td,{children:`Optional right-aligned actions above a 1px rule`})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Modal\r
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
`,(0,u.jsx)(n.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(n.h3,{id:`open`,children:`Open`}),`
`,(0,u.jsxs)(n.p,{children:[`When `,(0,u.jsx)(n.code,{children:`isOpen`}),` becomes `,(0,u.jsx)(n.code,{children:`true`}),`, the panel pops in with the shared `,(0,u.jsx)(n.code,{children:`eidotter-pop-in`}),` keyframe\r
(scale 0.8 to 1 + opacity, 150ms: the CRT turn-on) while the scrim fades in. Reduced motion skips both.`]}),`
`,(0,u.jsx)(n.h3,{id:`closed`,children:`Closed`}),`
`,(0,u.jsxs)(n.p,{children:[`When `,(0,u.jsx)(n.code,{children:`isOpen`}),` becomes `,(0,u.jsx)(n.code,{children:`false`}),`, the panel plays `,(0,u.jsx)(n.code,{children:`eidotter-pop-out`}),` (150ms) and unmounts.\r
The `,(0,u.jsx)(n.code,{children:`onOpenChange`}),` callback fires on every state transition.`]}),`
`,(0,u.jsx)(n.h3,{id:`backdrop`,children:`Backdrop`}),`
`,(0,u.jsxs)(n.p,{children:[`Clicking the scrim closes the modal unless `,(0,u.jsx)(n.code,{children:`isDismissable={false}`}),`. The scrim uses\r
`,(0,u.jsx)(n.code,{children:`--effects-overlay`}),` with a 2px backdrop blur.`]}),`
`,(0,u.jsx)(n.h2,{id:`interaction-design`,children:`Interaction design`}),`
`,(0,u.jsx)(n.h3,{id:`motion`,children:`Motion`}),`
`,(0,u.jsxs)(n.p,{children:[`Keyframes live in `,(0,u.jsx)(n.code,{children:`src/styles/keyframes.css`}),` (shared by every overlay):`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-css`,children:`@keyframes eidotter-pop-in {\r
  from { opacity: 0; transform: scale(0.8); }\r
  to   { opacity: 1; transform: scale(1); }\r
}
`})}),`
`,(0,u.jsx)(n.h3,{id:`close-mechanisms`,children:`Close mechanisms`}),`
`,(0,u.jsx)(n.p,{children:`Three ways to dismiss the modal:`}),`
`,(0,u.jsxs)(n.ol,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Escape key`}),` - React Aria dismissal, fires `,(0,u.jsx)(n.code,{children:`onClose`}),` / `,(0,u.jsx)(n.code,{children:`onOpenChange(false)`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Backdrop click`}),` - Clicking outside the container`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Close button`}),` - `,(0,u.jsx)(n.code,{children:`IconButton`}),` in the title strip with `,(0,u.jsx)(n.code,{children:`aria-label="Close modal"`})]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`common-patterns`,children:`Common patterns`}),`
`,(0,u.jsx)(n.h3,{id:`confirmation-dialog`,children:`Confirmation dialog`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Modal\r
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
`,(0,u.jsx)(n.h3,{id:`form-modal`,children:`Form modal`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Modal\r
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
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Focus trapping`}),`: React Aria (via DosDialog) traps focus and locks page scroll`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Escape to close`}),`: React Aria dismissal handling`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`ARIA`}),`: the dialog is named by `,(0,u.jsx)(n.code,{children:`aria-label={title}`}),`; the title also renders as an `,(0,u.jsx)(n.code,{children:`<h2>`}),` in the strip`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Close button`}),`: Has `,(0,u.jsx)(n.code,{children:`aria-label="Close modal"`}),` for screen readers`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Focus visible`}),`: Close button shows 2px solid outline on focus with 2px offset`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`High contrast`}),`: Container border widens to 3px via `,(0,u.jsx)(n.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Reduced motion`}),`: All animations disabled via `,(0,u.jsx)(n.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Portal`}),`: Rendered into `,(0,u.jsx)(n.code,{children:`document.body`}),` to avoid z-index stacking issues`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`isOpen`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Whether the modal is open (required)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onClose`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`() => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Called when modal should close (required)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onOpenChange`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`(isOpen: boolean) => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Called when open state transitions`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`title`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Modal title, required for accessibility`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`children`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`ReactNode`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Modal body content`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`footer`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`ReactNode`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Footer content, typically action buttons`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`size`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'sm' | 'md' | 'lg' | 'full'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'md'`})}),(0,u.jsx)(n.td,{children:`Shared DosDialog width map (sm 24rem, md 30rem, lg 40rem, full)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`isDismissable`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`true`})}),(0,u.jsx)(n.td,{children:`Close on scrim click (Escape and the close button always close)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Extra classes on the dialog container`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Token`}),(0,u.jsx)(n.th,{children:`Purpose`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-background-primary`})}),(0,u.jsx)(n.td,{children:`Container background`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-brand`})}),(0,u.jsxs)(n.td,{children:[`Container border (`,(0,u.jsx)(n.code,{children:`--border-width-medium`}),`)`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-cga-amber-glow`})}),(0,u.jsx)(n.td,{children:`Container phosphor glow`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-accent`})}),(0,u.jsx)(n.td,{children:`Title strip text`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-brand-dim`})}),(0,u.jsx)(n.td,{children:`Title strip bottom rule`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-cga-light-gray`})}),(0,u.jsx)(n.td,{children:`Body and footer text`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-brand`})}),(0,u.jsx)(n.td,{children:`Close focus outline`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-cga-dark-gray`})}),(0,u.jsx)(n.td,{children:`Footer rule`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--effects-overlay`})}),(0,u.jsx)(n.td,{children:`Scrim colour`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--shadow-drop`})}),(0,u.jsx)(n.td,{children:`Container drop shadow`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--z-index-modal`})}),(0,u.jsx)(n.td,{children:`Overlay stacking`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--spacing-4`})}),(0,u.jsx)(n.td,{children:`Body and footer padding`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`--duration-normal`}),` / `,(0,u.jsx)(n.code,{children:`--duration-fast`})]}),(0,u.jsx)(n.td,{children:`Enter / exit motion`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Modal`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};