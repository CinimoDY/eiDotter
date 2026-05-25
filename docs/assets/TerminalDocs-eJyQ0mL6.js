import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/Terminal`}),`
`,(0,u.jsx)(r.h1,{id:`terminal`,children:`Terminal`}),`
`,(0,u.jsx)(r.p,{children:`DOS-styled window frame with title bar, window controls, and content area.`}),`
`,(0,u.jsx)(r.p,{children:`The Terminal component recreates the classic MS-DOS/Windows 3.x window chrome with\r
an authentic title bar, minimize/maximize/close controls, and a content area with\r
a blinking block cursor. It supports three sizes, active/inactive/minimized states,\r
and a maximized mode that fills the viewport.`}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-terminal--default`,children:`Terminal stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`sizes`,children:`Sizes`}),`
`,(0,u.jsx)(r.p,{children:`Three preset sizes modeled after classic DOS display resolutions:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Size`}),(0,u.jsx)(r.th,{children:`Width`}),(0,u.jsx)(r.th,{children:`Height`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`small`})}),(0,u.jsx)(r.td,{children:`480px`}),(0,u.jsx)(r.td,{children:`320px`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`medium`})}),(0,u.jsx)(r.td,{children:`640px`}),(0,u.jsx)(r.td,{children:`480px`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`large`})}),(0,u.jsx)(r.td,{children:`800px`}),(0,u.jsx)(r.td,{children:`600px`})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Terminal size="small" title="Command Prompt" />\r
<Terminal size="medium" title="MS-DOS Terminal" />\r
<Terminal size="large" title="Terminal Session" />
`})}),`
`,(0,u.jsx)(r.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(r.h3,{id:`active`,children:`Active`}),`
`,(0,u.jsx)(r.p,{children:`The title bar fills with the accent background color (amber). The window border\r
uses the secondary text color for a prominent, focused appearance.`}),`
`,(0,u.jsx)(r.h3,{id:`inactive`,children:`Inactive`}),`
`,(0,u.jsx)(r.p,{children:`The title bar falls back to the secondary background with primary text color.\r
The border dims to the disabled text color, indicating the window does not\r
have focus.`}),`
`,(0,u.jsx)(r.h3,{id:`minimized`,children:`Minimized`}),`
`,(0,u.jsx)(r.p,{children:`The window content collapses and a taskbar item is rendered instead, showing\r
the app icon and title. Clicking or pressing Enter on the taskbar item restores\r
the window to active state.`}),`
`,(0,u.jsx)(r.h3,{id:`maximized`,children:`Maximized`}),`
`,(0,u.jsxs)(r.p,{children:[`Toggled via the maximize control. The window expands to fill the entire viewport\r
(`,(0,u.jsx)(r.code,{children:`100vw x 100vh`}),`) with `,(0,u.jsx)(r.code,{children:`position: fixed`}),`, border and box-shadow removed, at\r
`,(0,u.jsx)(r.code,{children:`z-index: 1000`}),`.`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Terminal state="active" title="Active Terminal" />\r
<Terminal state="inactive" title="Background Terminal" />\r
<Terminal state="minimized" title="Minimized Terminal" />
`})}),`
`,(0,u.jsx)(r.h2,{id:`window-controls`,children:`Window Controls`}),`
`,(0,u.jsx)(r.p,{children:`Each control button can be independently enabled or disabled:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Control`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`minimizable`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsx)(r.td,{children:`Shows minimize button, collapses to taskbar`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`maximizable`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsx)(r.td,{children:`Shows maximize/restore button`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`closeable`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsx)(r.td,{children:`Shows close button`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`resizable`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsx)(r.td,{children:`Shows resize handle in bottom-right corner`})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Terminal\r
  title="Read-Only Terminal"\r
  minimizable={false}\r
  maximizable={false}\r
  closeable={false}\r
  resizable={false}\r
/>
`})}),`
`,(0,u.jsx)(r.h2,{id:`custom-content`,children:`Custom Content`}),`
`,(0,u.jsx)(r.p,{children:`Pass children to replace the default prompt display:`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Terminal title="Active Session">\r
  <div style={{ fontFamily: "'Flexi IBM VGA True', monospace", whiteSpace: 'pre' }}>\r
    {\`C:\\\\>dir\r
     3 file(s)     54,813 bytes\r
\r
    C:\\\\>\`}\r
    <span className="terminal__cursor">&#9608;</span>\r
  </div>\r
</Terminal>
`})}),`
`,(0,u.jsxs)(r.p,{children:[`When no children are provided, the Terminal renders a default `,(0,u.jsx)(r.code,{children:`C:\\>`}),` prompt with\r
a blinking block cursor.`]}),`
`,(0,u.jsx)(r.h2,{id:`interaction-design`,children:`Interaction Design`}),`
`,(0,u.jsx)(r.h3,{id:`title-bar`,children:`Title Bar`}),`
`,(0,u.jsxs)(r.p,{children:[`The title bar displays an app icon and title text. It uses `,(0,u.jsx)(r.code,{children:`user-select: none`}),`\r
and `,(0,u.jsx)(r.code,{children:`cursor: default`}),` to simulate classic window chrome that cannot be text-selected.`]}),`
`,(0,u.jsx)(r.h3,{id:`control-buttons`,children:`Control Buttons`}),`
`,(0,u.jsxs)(r.p,{children:[`Window control buttons invert their colors on `,(0,u.jsx)(r.code,{children:`:active`}),` using `,(0,u.jsx)(r.code,{children:`filter: invert(1)`}),`,\r
replicating the classic DOS button press feedback. Each button has an accessible\r
`,(0,u.jsx)(r.code,{children:`aria-label`}),` and `,(0,u.jsx)(r.code,{children:`title`}),` attribute.`]}),`
`,(0,u.jsx)(r.h3,{id:`keyboard-shortcuts`,children:`Keyboard Shortcuts`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Alt+F4`}),`: Closes the terminal (when `,(0,u.jsx)(r.code,{children:`closeable`}),` is `,(0,u.jsx)(r.code,{children:`true`}),`)`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Enter`}),` on minimized taskbar item: Restores the window`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Role`}),`: Uses `,(0,u.jsx)(r.code,{children:`role="dialog"`}),` with `,(0,u.jsx)(r.code,{children:`aria-label`}),` describing the window`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Minimized role`}),`: Taskbar item uses `,(0,u.jsx)(r.code,{children:`role="button"`}),` with `,(0,u.jsx)(r.code,{children:`aria-label`}),` for restore action`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Window controls`}),`: Each control button has descriptive `,(0,u.jsx)(r.code,{children:`aria-label`}),` (e.g., "Minimize window")`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Focus management`}),`: `,(0,u.jsx)(r.code,{children:`tabIndex={0}`}),` on the window, `,(0,u.jsx)(r.code,{children:`autoFocus`}),` option for mount focus`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`High contrast`}),`: Border widens to 3px, control borders to 2px, focus outline to 3px via `,(0,u.jsx)(r.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Reduced motion`}),`: Cursor blink animation disabled via `,(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Content area`}),`: Uses `,(0,u.jsx)(r.code,{children:`role="main"`}),` for the terminal content region`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`size`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'small' | 'medium' | 'large'`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'medium'`})}),(0,u.jsx)(r.td,{children:`Window dimensions`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`title`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'MS-DOS Terminal'`})}),(0,u.jsx)(r.td,{children:`Title bar text`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`state`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'active' | 'inactive' | 'minimized'`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'active'`})}),(0,u.jsx)(r.td,{children:`Initial window state`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`resizable`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsx)(r.td,{children:`Shows resize handle`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`minimizable`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsx)(r.td,{children:`Shows minimize control`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`maximizable`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsx)(r.td,{children:`Shows maximize control`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`closeable`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsx)(r.td,{children:`Shows close control`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`children`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ReactNode`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Terminal content (replaces default prompt)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onMinimize`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`() => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Callback when minimized`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onMaximize`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`() => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Callback when maximized/restored`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onClose`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`() => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Callback when closed`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onFocus`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`() => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Callback when window gains focus`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`''`})}),(0,u.jsx)(r.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`autoFocus`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Auto-focus on mount`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`design-tokens-used`,children:`Design Tokens Used`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Token`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-primary`})}),(0,u.jsx)(r.td,{children:`Window background, control symbol color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-secondary`})}),(0,u.jsx)(r.td,{children:`Title bar background (inactive)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-accent`})}),(0,u.jsx)(r.td,{children:`Title bar background (active)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(r.td,{children:`Content text, control button background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-secondary`})}),(0,u.jsx)(r.td,{children:`Title bar text (active)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-disabled`})}),(0,u.jsx)(r.td,{children:`Window border (inactive)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(r.td,{children:`High contrast focus outline`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--effects-drop-shadow`})}),(0,u.jsx)(r.td,{children:`DOS-style box shadow (5px 5px)`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Terminal`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};