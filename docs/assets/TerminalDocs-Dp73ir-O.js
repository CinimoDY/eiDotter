import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/Terminal`}),`
`,(0,u.jsx)(n.h1,{id:`terminal`,children:`Terminal`}),`
`,(0,u.jsx)(n.p,{children:`DOS-styled window frame with title bar, window controls, and content area.`}),`
`,(0,u.jsx)(n.p,{children:`The Terminal component recreates the classic MS-DOS/Windows 3.x window chrome with\r
a title bar, minimize/maximize/close controls, and a content area with\r
a blinking underscore cursor. It supports three sizes, active/inactive/minimized states,\r
and a maximized mode that fills the viewport.`}),`
`,(0,u.jsxs)(n.blockquote,{children:[`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(n.a,{href:`/story/components-terminal--default`,children:`Terminal stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`sizes`,children:`Sizes`}),`
`,(0,u.jsx)(n.p,{children:`Three preset sizes modeled after classic DOS display resolutions:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Size`}),(0,u.jsx)(n.th,{children:`Width`}),(0,u.jsx)(n.th,{children:`Height`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`small`})}),(0,u.jsx)(n.td,{children:`480px`}),(0,u.jsx)(n.td,{children:`320px`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`medium`})}),(0,u.jsx)(n.td,{children:`640px`}),(0,u.jsx)(n.td,{children:`480px`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`large`})}),(0,u.jsx)(n.td,{children:`800px`}),(0,u.jsx)(n.td,{children:`600px`})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Terminal size="small" title="Command Prompt" />\r
<Terminal size="medium" title="MS-DOS Terminal" />\r
<Terminal size="large" title="Terminal Session" />
`})}),`
`,(0,u.jsx)(n.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(n.h3,{id:`active`,children:`Active`}),`
`,(0,u.jsx)(n.p,{children:`The title bar fills with the accent background color (amber). The window border\r
uses the secondary text color.`}),`
`,(0,u.jsx)(n.h3,{id:`inactive`,children:`Inactive`}),`
`,(0,u.jsx)(n.p,{children:`The title bar falls back to the secondary background with primary text color.\r
The border dims to the disabled text color, indicating the window does not\r
have focus.`}),`
`,(0,u.jsx)(n.h3,{id:`minimized`,children:`Minimized`}),`
`,(0,u.jsx)(n.p,{children:`The window content collapses and a taskbar item is rendered instead, showing\r
the app icon and title. Clicking or pressing Enter on the taskbar item restores\r
the window to active state.`}),`
`,(0,u.jsx)(n.h3,{id:`maximized`,children:`Maximized`}),`
`,(0,u.jsxs)(n.p,{children:[`Toggled via the maximize control. The window expands to fill the entire viewport\r
(`,(0,u.jsx)(n.code,{children:`100vw x 100vh`}),`) with `,(0,u.jsx)(n.code,{children:`position: fixed`}),`, border and box-shadow removed, at\r
`,(0,u.jsx)(n.code,{children:`z-index: 1000`}),`.`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Terminal state="active" title="Active Terminal" />\r
<Terminal state="inactive" title="Background Terminal" />\r
<Terminal state="minimized" title="Minimized Terminal" />
`})}),`
`,(0,u.jsx)(n.h2,{id:`window-controls`,children:`Window controls`}),`
`,(0,u.jsx)(n.p,{children:`Each control can be turned off on its own:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Control`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`minimizable`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`true`})}),(0,u.jsx)(n.td,{children:`Shows minimize button, collapses to taskbar`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`maximizable`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`true`})}),(0,u.jsx)(n.td,{children:`Shows maximize/restore button`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`closeable`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`true`})}),(0,u.jsx)(n.td,{children:`Shows close button`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`resizable`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`true`})}),(0,u.jsx)(n.td,{children:`Shows resize handle in bottom-right corner`})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Terminal\r
  title="Read-Only Terminal"\r
  minimizable={false}\r
  maximizable={false}\r
  closeable={false}\r
  resizable={false}\r
/>
`})}),`
`,(0,u.jsx)(n.h2,{id:`custom-content`,children:`Custom content`}),`
`,(0,u.jsx)(n.p,{children:`Pass children to replace the default prompt display:`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Terminal title="Active Session">\r
  <div style={{ fontFamily: "'Perfect DOS VGA 437', monospace", whiteSpace: 'pre' }}>\r
    {\`C:\\\\>dir\r
     3 file(s)     54,813 bytes\r
\r
    C:\\\\>\`}\r
    <span className="terminal__cursor" aria-hidden="true" />\r
  </div>\r
</Terminal>
`})}),`
`,(0,u.jsxs)(n.p,{children:[`When no children are provided, the Terminal renders a default `,(0,u.jsx)(n.code,{children:`C:\\>`}),` prompt with\r
a blinking underscore cursor.`]}),`
`,(0,u.jsx)(n.h2,{id:`interaction-design`,children:`Interaction design`}),`
`,(0,u.jsx)(n.h3,{id:`title-bar`,children:`Title bar`}),`
`,(0,u.jsxs)(n.p,{children:[`The title bar displays an app icon and title text. It uses `,(0,u.jsx)(n.code,{children:`user-select: none`}),`\r
and `,(0,u.jsx)(n.code,{children:`cursor: default`}),`, so the chrome cannot be text-selected, as in classic window chrome.`]}),`
`,(0,u.jsx)(n.h3,{id:`control-buttons`,children:`Control buttons`}),`
`,(0,u.jsxs)(n.p,{children:[`Window control buttons invert their colors on `,(0,u.jsx)(n.code,{children:`:active`}),` using `,(0,u.jsx)(n.code,{children:`filter: invert(1)`}),`,\r
like a classic DOS button press. Each button has an accessible\r
`,(0,u.jsx)(n.code,{children:`aria-label`}),` and `,(0,u.jsx)(n.code,{children:`title`}),` attribute.`]}),`
`,(0,u.jsx)(n.h3,{id:`keyboard-shortcuts`,children:`Keyboard shortcuts`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Alt+F4`}),`: Closes the terminal (when `,(0,u.jsx)(n.code,{children:`closeable`}),` is `,(0,u.jsx)(n.code,{children:`true`}),`)`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Enter`}),` on minimized taskbar item: Restores the window`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Role`}),`: Uses `,(0,u.jsx)(n.code,{children:`role="group"`}),` with `,(0,u.jsx)(n.code,{children:`aria-label`}),` describing the window. It is in-page chrome, not a dialog, so it has no focus trap and no `,(0,u.jsx)(n.code,{children:`aria-modal`}),` (it used `,(0,u.jsx)(n.code,{children:`role="dialog"`}),` before DMNC-1611)`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Minimized role`}),`: Taskbar item uses `,(0,u.jsx)(n.code,{children:`role="button"`}),` with `,(0,u.jsx)(n.code,{children:`aria-label`}),` for restore action`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Window controls`}),`: Each control button has descriptive `,(0,u.jsx)(n.code,{children:`aria-label`}),` (e.g., "Minimize window")`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Focus management`}),`: `,(0,u.jsx)(n.code,{children:`tabIndex={0}`}),` on the window, `,(0,u.jsx)(n.code,{children:`autoFocus`}),` option for mount focus`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`High contrast`}),`: Border widens to 3px, control borders to 2px, focus outline to 3px via `,(0,u.jsx)(n.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Reduced motion`}),`: Cursor blink animation disabled via `,(0,u.jsx)(n.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Content area`}),`: Uses `,(0,u.jsx)(n.code,{children:`role="main"`}),` for the terminal content region`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`size`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'small' | 'medium' | 'large'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'medium'`})}),(0,u.jsx)(n.td,{children:`Window dimensions`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`title`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'MS-DOS Terminal'`})}),(0,u.jsx)(n.td,{children:`Title bar text`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`state`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'active' | 'inactive' | 'minimized'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'active'`})}),(0,u.jsx)(n.td,{children:`Initial window state`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`resizable`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`true`})}),(0,u.jsx)(n.td,{children:`Shows resize handle`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`minimizable`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`true`})}),(0,u.jsx)(n.td,{children:`Shows minimize control`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`maximizable`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`true`})}),(0,u.jsx)(n.td,{children:`Shows maximize control`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`closeable`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`true`})}),(0,u.jsx)(n.td,{children:`Shows close control`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`children`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`ReactNode`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Terminal content (replaces default prompt)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onMinimize`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`() => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Callback when minimized`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onMaximize`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`() => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Callback when maximized/restored`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onClose`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`() => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Callback when closed`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onFocus`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`() => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Callback when window gains focus`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`''`})}),(0,u.jsx)(n.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`autoFocus`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsx)(n.td,{children:`Auto-focus on mount`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Token`}),(0,u.jsx)(n.th,{children:`Purpose`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-background-primary`})}),(0,u.jsx)(n.td,{children:`Window background, control symbol color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-background-secondary`})}),(0,u.jsx)(n.td,{children:`Title bar background (inactive)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-background-accent`})}),(0,u.jsx)(n.td,{children:`Title bar background (active)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(n.td,{children:`Content text, control button background`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-on-accent`})}),(0,u.jsx)(n.td,{children:`Title bar text (active)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-disabled`})}),(0,u.jsx)(n.td,{children:`Window border (inactive)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(n.td,{children:`High contrast focus outline`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--effects-drop-shadow`})}),(0,u.jsx)(n.td,{children:`DOS-style box shadow (5px 5px)`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Terminal`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};