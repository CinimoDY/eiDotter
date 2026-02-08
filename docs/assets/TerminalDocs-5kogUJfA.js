import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as r}from"./index-JWhTtCsH.js";import{M as s}from"./blocks-a6sBqEnx.js";import"./iframe-QfvwKf1z.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BG7Dyd9P.js";import"./index-CZ7-CnlV.js";function d(i){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Docs/Terminal"}),`
`,e.jsx(n.h1,{id:"terminal",children:"Terminal"}),`
`,e.jsx(n.p,{children:"DOS-styled window frame with title bar, window controls, and content area."}),`
`,e.jsx(n.p,{children:`The Terminal component recreates the classic MS-DOS/Windows 3.x window chrome with\r
an authentic title bar, minimize/maximize/close controls, and a content area with\r
a blinking block cursor. It supports three sizes, active/inactive/minimized states,\r
and a maximized mode that fills the viewport.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Interactive demos"}),": See the ",e.jsx(n.a,{href:"/story/components-terminal--default",children:"Terminal stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(n.h2,{id:"sizes",children:"Sizes"}),`
`,e.jsx(n.p,{children:"Three preset sizes modeled after classic DOS display resolutions:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Size"}),e.jsx(n.th,{children:"Width"}),e.jsx(n.th,{children:"Height"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"small"})}),e.jsx(n.td,{children:"480px"}),e.jsx(n.td,{children:"320px"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"medium"})}),e.jsx(n.td,{children:"640px"}),e.jsx(n.td,{children:"480px"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"large"})}),e.jsx(n.td,{children:"800px"}),e.jsx(n.td,{children:"600px"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Terminal size="small" title="Command Prompt" />\r
<Terminal size="medium" title="MS-DOS Terminal" />\r
<Terminal size="large" title="Terminal Session" />
`})}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(n.h3,{id:"active",children:"Active"}),`
`,e.jsx(n.p,{children:`The title bar fills with the accent background color (amber). The window border\r
uses the secondary text color for a prominent, focused appearance.`}),`
`,e.jsx(n.h3,{id:"inactive",children:"Inactive"}),`
`,e.jsx(n.p,{children:`The title bar falls back to the secondary background with primary text color.\r
The border dims to the disabled text color, indicating the window does not\r
have focus.`}),`
`,e.jsx(n.h3,{id:"minimized",children:"Minimized"}),`
`,e.jsx(n.p,{children:`The window content collapses and a taskbar item is rendered instead, showing\r
the app icon and title. Clicking or pressing Enter on the taskbar item restores\r
the window to active state.`}),`
`,e.jsx(n.h3,{id:"maximized",children:"Maximized"}),`
`,e.jsxs(n.p,{children:[`Toggled via the maximize control. The window expands to fill the entire viewport\r
(`,e.jsx(n.code,{children:"100vw x 100vh"}),") with ",e.jsx(n.code,{children:"position: fixed"}),`, border and box-shadow removed, at\r
`,e.jsx(n.code,{children:"z-index: 1000"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Terminal state="active" title="Active Terminal" />\r
<Terminal state="inactive" title="Background Terminal" />\r
<Terminal state="minimized" title="Minimized Terminal" />
`})}),`
`,e.jsx(n.h2,{id:"window-controls",children:"Window Controls"}),`
`,e.jsx(n.p,{children:"Each control button can be independently enabled or disabled:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Control"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"minimizable"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Shows minimize button, collapses to taskbar"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"maximizable"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Shows maximize/restore button"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"closeable"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Shows close button"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"resizable"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Shows resize handle in bottom-right corner"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Terminal\r
  title="Read-Only Terminal"\r
  minimizable={false}\r
  maximizable={false}\r
  closeable={false}\r
  resizable={false}\r
/>
`})}),`
`,e.jsx(n.h2,{id:"custom-content",children:"Custom Content"}),`
`,e.jsx(n.p,{children:"Pass children to replace the default prompt display:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Terminal title="Active Session">\r
  <div style={{ fontFamily: "'Perfect DOS VGA', monospace", whiteSpace: 'pre' }}>\r
    {\`C:\\\\>dir\r
     3 file(s)     54,813 bytes\r
\r
    C:\\\\>\`}\r
    <span className="terminal__cursor">&#9608;</span>\r
  </div>\r
</Terminal>
`})}),`
`,e.jsxs(n.p,{children:["When no children are provided, the Terminal renders a default ",e.jsx(n.code,{children:"C:\\>"}),` prompt with\r
a blinking block cursor.`]}),`
`,e.jsx(n.h2,{id:"interaction-design",children:"Interaction Design"}),`
`,e.jsx(n.h3,{id:"title-bar",children:"Title Bar"}),`
`,e.jsxs(n.p,{children:["The title bar displays an app icon and title text. It uses ",e.jsx(n.code,{children:"user-select: none"}),`\r
and `,e.jsx(n.code,{children:"cursor: default"})," to simulate classic window chrome that cannot be text-selected."]}),`
`,e.jsx(n.h3,{id:"control-buttons",children:"Control Buttons"}),`
`,e.jsxs(n.p,{children:["Window control buttons invert their colors on ",e.jsx(n.code,{children:":active"})," using ",e.jsx(n.code,{children:"filter: invert(1)"}),`,\r
replicating the classic DOS button press feedback. Each button has an accessible\r
`,e.jsx(n.code,{children:"aria-label"})," and ",e.jsx(n.code,{children:"title"})," attribute."]}),`
`,e.jsx(n.h3,{id:"keyboard-shortcuts",children:"Keyboard Shortcuts"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Alt+F4"}),": Closes the terminal (when ",e.jsx(n.code,{children:"closeable"})," is ",e.jsx(n.code,{children:"true"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Enter"})," on minimized taskbar item: Restores the window"]}),`
`]}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Role"}),": Uses ",e.jsx(n.code,{children:'role="dialog"'})," with ",e.jsx(n.code,{children:"aria-label"})," describing the window"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Minimized role"}),": Taskbar item uses ",e.jsx(n.code,{children:'role="button"'})," with ",e.jsx(n.code,{children:"aria-label"})," for restore action"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Window controls"}),": Each control button has descriptive ",e.jsx(n.code,{children:"aria-label"}),' (e.g., "Minimize window")']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus management"}),": ",e.jsx(n.code,{children:"tabIndex={0}"})," on the window, ",e.jsx(n.code,{children:"autoFocus"})," option for mount focus"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"High contrast"}),": Border widens to 3px, control borders to 2px, focus outline to 3px via ",e.jsx(n.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Reduced motion"}),": Cursor blink animation disabled via ",e.jsx(n.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Content area"}),": Uses ",e.jsx(n.code,{children:'role="main"'})," for the terminal content region"]}),`
`]}),`
`,e.jsx(n.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"size"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'small' | 'medium' | 'large'"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'medium'"})}),e.jsx(n.td,{children:"Window dimensions"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"title"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'MS-DOS Terminal'"})}),e.jsx(n.td,{children:"Title bar text"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"state"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'active' | 'inactive' | 'minimized'"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'active'"})}),e.jsx(n.td,{children:"Initial window state"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"resizable"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Shows resize handle"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"minimizable"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Shows minimize control"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"maximizable"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Shows maximize control"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"closeable"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Shows close control"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"children"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"ReactNode"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Terminal content (replaces default prompt)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onMinimize"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"() => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Callback when minimized"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onMaximize"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"() => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Callback when maximized/restored"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onClose"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"() => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Callback when closed"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onFocus"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"() => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Callback when window gains focus"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"className"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"''"})}),e.jsx(n.td,{children:"Additional CSS classes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"autoFocus"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Auto-focus on mount"})]})]})]}),`
`,e.jsx(n.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Token"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-background-primary"})}),e.jsx(n.td,{children:"Window background, control symbol color"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-background-secondary"})}),e.jsx(n.td,{children:"Title bar background (inactive)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-background-accent"})}),e.jsx(n.td,{children:"Title bar background (active)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-primary"})}),e.jsx(n.td,{children:"Content text, control button background"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-secondary"})}),e.jsx(n.td,{children:"Title bar text (active)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-disabled"})}),e.jsx(n.td,{children:"Window border (inactive)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-border-focus"})}),e.jsx(n.td,{children:"High contrast focus outline"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--effects-drop-shadow"})}),e.jsx(n.td,{children:"DOS-style box shadow (5px 5px)"})]})]})]})]})}function j(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(d,{...i})}):d(i)}export{j as default};
