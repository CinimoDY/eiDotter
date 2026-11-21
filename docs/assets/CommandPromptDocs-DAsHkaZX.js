import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/CommandPrompt`}),`
`,(0,u.jsx)(n.h1,{id:`commandprompt`,children:`CommandPrompt`}),`
`,(0,u.jsx)(n.p,{children:`DOS-styled command input with a blinking underscore cursor.`}),`
`,(0,u.jsxs)(n.p,{children:[`The CommandPrompt is a DOS-style terminal input line. It displays a configurable\r
prompt string (e.g., `,(0,u.jsx)(n.code,{children:`C:\\>`}),`), a text input, and a blinking underscore cursor. When the user\r
presses Enter, the `,(0,u.jsx)(n.code,{children:`onCommand`}),` callback fires with the trimmed input and the field clears.`]}),`
`,(0,u.jsxs)(n.blockquote,{children:[`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(n.a,{href:`/story/components-commandprompt--default`,children:`CommandPrompt stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`prompt-styles`,children:`Prompt styles`}),`
`,(0,u.jsxs)(n.p,{children:[`The `,(0,u.jsx)(n.code,{children:`prompt`}),` prop takes any string:`]}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prompt`}),(0,u.jsx)(n.th,{children:`Style`}),(0,u.jsx)(n.th,{children:`Example`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`C:\\>`})}),(0,u.jsx)(n.td,{children:`Classic DOS (default)`}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`C:\\> dir /w`})})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`$`})}),(0,u.jsx)(n.td,{children:`Unix shell`}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`$ ls -la`})})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`>`})}),(0,u.jsx)(n.td,{children:`Minimal`}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`> help`})})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Custom`}),(0,u.jsx)(n.td,{children:`Any string`}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`eidotter://> scan`})})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<CommandPrompt prompt="C:\\>" onCommand={handleCommand} />\r
<CommandPrompt prompt="$" onCommand={handleCommand} />\r
<CommandPrompt prompt="eidotter://>" onCommand={handleCommand} />
`})}),`
`,(0,u.jsx)(n.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(n.h3,{id:`default`,children:`Default`}),`
`,(0,u.jsxs)(n.p,{children:[`Displays the prompt string, an empty input field, and a blinking DOS underscore cursor (`,(0,u.jsx)(n.code,{children:`_`}),`).\r
Clicking anywhere on the container focuses the input.`]}),`
`,(0,u.jsx)(n.h3,{id:`focused`,children:`Focused`}),`
`,(0,u.jsx)(n.p,{children:`When the input is focused, the decorative underscore cursor hides (the browser's native\r
cursor takes over). The prompt string remains visible.`}),`
`,(0,u.jsx)(n.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,u.jsxs)(n.p,{children:[`Reduced opacity (0.5), `,(0,u.jsx)(n.code,{children:`not-allowed`}),` cursor. The blinking cursor animation stops\r
and the input cannot be focused.`]}),`
`,(0,u.jsx)(n.h3,{id:`with-placeholder`,children:`With placeholder`}),`
`,(0,u.jsx)(n.p,{children:`An optional placeholder appears in the input when empty, using the disabled text color:`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<CommandPrompt\r
  prompt="C:\\>"\r
  placeholder="Type a command..."\r
  onCommand={handleCommand}\r
/>
`})}),`
`,(0,u.jsx)(n.h2,{id:`auto-focus`,children:`Auto-focus`}),`
`,(0,u.jsxs)(n.p,{children:[`Set `,(0,u.jsx)(n.code,{children:`autoFocus`}),` to focus the input on mount. Use it in terminal-style interfaces\r
where the user starts typing right away:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<CommandPrompt autoFocus onCommand={handleCommand} />
`})}),`
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Container role`}),`: `,(0,u.jsx)(n.code,{children:`role="textbox"`}),` with `,(0,u.jsx)(n.code,{children:`aria-label="Command prompt"`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Input label`}),`: Hidden input has `,(0,u.jsx)(n.code,{children:`aria-label="Command input"`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Prompt string`}),`: Marked `,(0,u.jsx)(n.code,{children:`aria-hidden="true"`}),` (decorative)`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Cursor`}),`: Marked `,(0,u.jsx)(n.code,{children:`aria-hidden="true"`}),` (decorative)`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`High contrast`}),`: Border widens to 3px, prompt text bolded, focus outline at 3px via `,(0,u.jsx)(n.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Reduced motion`}),`: Blinking cursor animation disabled via `,(0,u.jsx)(n.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Keyboard`}),`: Enter submits command, standard text input keyboard behavior`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`prompt`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'C:\\\\>'`})}),(0,u.jsx)(n.td,{children:`Prompt string displayed before the input`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onCommand`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`(command: string) => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Callback when Enter is pressed with input text (required)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`autoFocus`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsx)(n.td,{children:`Auto-focus input on mount`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`placeholder`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Placeholder text when input is empty`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`disabled`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsx)(n.td,{children:`Disables interaction`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`''`})}),(0,u.jsx)(n.td,{children:`Additional CSS classes`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Token`}),(0,u.jsx)(n.th,{children:`Purpose`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(n.td,{children:`DOS font family`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-size-text-md`})}),(0,u.jsx)(n.td,{children:`Input font size`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-background-primary`})}),(0,u.jsx)(n.td,{children:`Container background`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-accent`})}),(0,u.jsx)(n.td,{children:`Container text color (amber)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(n.td,{children:`Prompt string and input text`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-disabled`})}),(0,u.jsx)(n.td,{children:`Placeholder text color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(n.td,{children:`High contrast border`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(n.td,{children:`High contrast focus outline`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--spacing-2`})}),(0,u.jsx)(n.td,{children:`Container padding and prompt margin`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`CommandPrompt`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};