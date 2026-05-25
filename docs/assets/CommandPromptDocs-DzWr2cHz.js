import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/CommandPrompt`}),`
`,(0,u.jsx)(r.h1,{id:`commandprompt`,children:`CommandPrompt`}),`
`,(0,u.jsx)(r.p,{children:`DOS-styled command input with authentic terminal aesthetics and blinking block cursor.`}),`
`,(0,u.jsxs)(r.p,{children:[`The CommandPrompt simulates a classic DOS terminal input line. It displays a configurable\r
prompt string (e.g., `,(0,u.jsx)(r.code,{children:`C:\\>`}),`), a text input, and a blinking block cursor. When the user\r
presses Enter, the `,(0,u.jsx)(r.code,{children:`onCommand`}),` callback fires with the trimmed input and the field clears.`]}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-commandprompt--default`,children:`CommandPrompt stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`prompt-styles`,children:`Prompt Styles`}),`
`,(0,u.jsx)(r.p,{children:`The prompt string is fully configurable:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prompt`}),(0,u.jsx)(r.th,{children:`Style`}),(0,u.jsx)(r.th,{children:`Example`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`C:\\>`})}),(0,u.jsx)(r.td,{children:`Classic DOS (default)`}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`C:\\> dir /w`})})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`$`})}),(0,u.jsx)(r.td,{children:`Unix shell`}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`$ ls -la`})})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`>`})}),(0,u.jsx)(r.td,{children:`Minimal`}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`> help`})})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:`Custom`}),(0,u.jsx)(r.td,{children:`Any string`}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`eidotter://> scan`})})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<CommandPrompt prompt="C:\\>" onCommand={handleCommand} />\r
<CommandPrompt prompt="$" onCommand={handleCommand} />\r
<CommandPrompt prompt="eidotter://>" onCommand={handleCommand} />
`})}),`
`,(0,u.jsx)(r.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(r.h3,{id:`default`,children:`Default`}),`
`,(0,u.jsxs)(r.p,{children:[`Displays the prompt string, an empty input field, and a blinking block cursor (`,(0,u.jsx)(r.code,{children:`█`}),`).\r
Clicking anywhere on the container focuses the input.`]}),`
`,(0,u.jsx)(r.h3,{id:`focused`,children:`Focused`}),`
`,(0,u.jsx)(r.p,{children:`When the input is focused, the decorative block cursor hides (the browser's native\r
cursor takes over). The prompt string remains visible.`}),`
`,(0,u.jsx)(r.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,u.jsxs)(r.p,{children:[`Reduced opacity (0.5), `,(0,u.jsx)(r.code,{children:`not-allowed`}),` cursor. The blinking cursor animation stops\r
and the input cannot be focused.`]}),`
`,(0,u.jsx)(r.h3,{id:`with-placeholder`,children:`With Placeholder`}),`
`,(0,u.jsx)(r.p,{children:`An optional placeholder appears in the input when empty, using the disabled text color:`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<CommandPrompt\r
  prompt="C:\\>"\r
  placeholder="Type a command..."\r
  onCommand={handleCommand}\r
/>
`})}),`
`,(0,u.jsx)(r.h2,{id:`auto-focus`,children:`Auto-Focus`}),`
`,(0,u.jsxs)(r.p,{children:[`Set `,(0,u.jsx)(r.code,{children:`autoFocus`}),` to focus the input on mount — useful for terminal-style interfaces\r
where the user should immediately start typing:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<CommandPrompt autoFocus onCommand={handleCommand} />
`})}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Container role`}),`: `,(0,u.jsx)(r.code,{children:`role="textbox"`}),` with `,(0,u.jsx)(r.code,{children:`aria-label="Command prompt"`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Input label`}),`: Hidden input has `,(0,u.jsx)(r.code,{children:`aria-label="Command input"`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Prompt string`}),`: Marked `,(0,u.jsx)(r.code,{children:`aria-hidden="true"`}),` (decorative)`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Cursor`}),`: Marked `,(0,u.jsx)(r.code,{children:`aria-hidden="true"`}),` (decorative)`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`High contrast`}),`: Border widens to 3px, prompt text bolded, focus outline at 3px via `,(0,u.jsx)(r.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Reduced motion`}),`: Blinking cursor animation disabled via `,(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Keyboard`}),`: Enter submits command, standard text input keyboard behavior`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`prompt`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'C:\\\\>'`})}),(0,u.jsx)(r.td,{children:`Prompt string displayed before the input`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onCommand`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`(command: string) => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Callback when Enter is pressed with input text (required)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`autoFocus`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Auto-focus input on mount`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`placeholder`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Placeholder text when input is empty`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`disabled`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Disables interaction`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`''`})}),(0,u.jsx)(r.td,{children:`Additional CSS classes`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`design-tokens-used`,children:`Design Tokens Used`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Token`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(r.td,{children:`DOS font family`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-size-text-md`})}),(0,u.jsx)(r.td,{children:`Input font size`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-primary`})}),(0,u.jsx)(r.td,{children:`Container background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-accent`})}),(0,u.jsx)(r.td,{children:`Container text color (amber)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(r.td,{children:`Prompt string and input text`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-disabled`})}),(0,u.jsx)(r.td,{children:`Placeholder text color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(r.td,{children:`High contrast border`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(r.td,{children:`High contrast focus outline`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--spacing-2`})}),(0,u.jsx)(r.td,{children:`Container padding and prompt margin`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`CommandPrompt`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};