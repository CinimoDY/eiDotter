import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as s,M as i}from"./blocks-hbD4Poeh.js";import{C as t}from"./ComponentOrigin-fk6UZ57T.js";import"./preload-helper-Dp1pzeXC.js";import"./iframe-CMgb2h7h.js";import"./index-CaMDsXTw.js";import"./index-DJAEy5CL.js";import"./registry-BMuWnSIt.js";function r(d){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/CommandPrompt"}),`
`,e.jsx(n.h1,{id:"commandprompt",children:"CommandPrompt"}),`
`,e.jsx(n.p,{children:"DOS-styled command input with authentic terminal aesthetics and blinking block cursor."}),`
`,e.jsxs(n.p,{children:[`The CommandPrompt simulates a classic DOS terminal input line. It displays a configurable\r
prompt string (e.g., `,e.jsx(n.code,{children:"C:\\>"}),`), a text input, and a blinking block cursor. When the user\r
presses Enter, the `,e.jsx(n.code,{children:"onCommand"})," callback fires with the trimmed input and the field clears."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Interactive demos"}),": See the ",e.jsx(n.a,{href:"/story/components-commandprompt--default",children:"CommandPrompt stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(n.h2,{id:"prompt-styles",children:"Prompt Styles"}),`
`,e.jsx(n.p,{children:"The prompt string is fully configurable:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prompt"}),e.jsx(n.th,{children:"Style"}),e.jsx(n.th,{children:"Example"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"C:\\>"})}),e.jsx(n.td,{children:"Classic DOS (default)"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"C:\\> dir /w"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"$"})}),e.jsx(n.td,{children:"Unix shell"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"$ ls -la"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:">"})}),e.jsx(n.td,{children:"Minimal"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"> help"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Custom"}),e.jsx(n.td,{children:"Any string"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"eidotter://> scan"})})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<CommandPrompt prompt="C:\\>" onCommand={handleCommand} />\r
<CommandPrompt prompt="$" onCommand={handleCommand} />\r
<CommandPrompt prompt="eidotter://>" onCommand={handleCommand} />
`})}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(n.h3,{id:"default",children:"Default"}),`
`,e.jsxs(n.p,{children:["Displays the prompt string, an empty input field, and a blinking block cursor (",e.jsx(n.code,{children:"█"}),`).\r
Clicking anywhere on the container focuses the input.`]}),`
`,e.jsx(n.h3,{id:"focused",children:"Focused"}),`
`,e.jsx(n.p,{children:`When the input is focused, the decorative block cursor hides (the browser's native\r
cursor takes over). The prompt string remains visible.`}),`
`,e.jsx(n.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsxs(n.p,{children:["Reduced opacity (0.5), ",e.jsx(n.code,{children:"not-allowed"}),` cursor. The blinking cursor animation stops\r
and the input cannot be focused.`]}),`
`,e.jsx(n.h3,{id:"with-placeholder",children:"With Placeholder"}),`
`,e.jsx(n.p,{children:"An optional placeholder appears in the input when empty, using the disabled text color:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<CommandPrompt\r
  prompt="C:\\>"\r
  placeholder="Type a command..."\r
  onCommand={handleCommand}\r
/>
`})}),`
`,e.jsx(n.h2,{id:"auto-focus",children:"Auto-Focus"}),`
`,e.jsxs(n.p,{children:["Set ",e.jsx(n.code,{children:"autoFocus"}),` to focus the input on mount — useful for terminal-style interfaces\r
where the user should immediately start typing:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<CommandPrompt autoFocus onCommand={handleCommand} />
`})}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Container role"}),": ",e.jsx(n.code,{children:'role="textbox"'})," with ",e.jsx(n.code,{children:'aria-label="Command prompt"'})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Input label"}),": Hidden input has ",e.jsx(n.code,{children:'aria-label="Command input"'})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Prompt string"}),": Marked ",e.jsx(n.code,{children:'aria-hidden="true"'})," (decorative)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Cursor"}),": Marked ",e.jsx(n.code,{children:'aria-hidden="true"'})," (decorative)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"High contrast"}),": Border widens to 3px, prompt text bolded, focus outline at 3px via ",e.jsx(n.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Reduced motion"}),": Blinking cursor animation disabled via ",e.jsx(n.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard"}),": Enter submits command, standard text input keyboard behavior"]}),`
`]}),`
`,e.jsx(n.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"prompt"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'C:\\\\>'"})}),e.jsx(n.td,{children:"Prompt string displayed before the input"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onCommand"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"(command: string) => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Callback when Enter is pressed with input text (required)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"autoFocus"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Auto-focus input on mount"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"placeholder"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Placeholder text when input is empty"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"disabled"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Disables interaction"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"className"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"''"})}),e.jsx(n.td,{children:"Additional CSS classes"})]})]})]}),`
`,e.jsx(n.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Token"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--typography-font-family-primary"})}),e.jsx(n.td,{children:"DOS font family"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--typography-font-size-base"})}),e.jsx(n.td,{children:"Input font size"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-background-primary"})}),e.jsx(n.td,{children:"Container background"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-accent"})}),e.jsx(n.td,{children:"Container text color (amber)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-primary"})}),e.jsx(n.td,{children:"Prompt string and input text"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-disabled"})}),e.jsx(n.td,{children:"Placeholder text color"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-border-default"})}),e.jsx(n.td,{children:"High contrast border"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-border-focus"})}),e.jsx(n.td,{children:"High contrast focus outline"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--spacing-2"})}),e.jsx(n.td,{children:"Container padding and prompt margin"})]})]})]}),`
`,e.jsx(n.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(t,{name:"CommandPrompt"})]})}function p(d={}){const{wrapper:n}={...s(),...d.components};return n?e.jsx(n,{...d,children:e.jsx(r,{...d})}):r(d)}export{p as default};
