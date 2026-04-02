import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as s,M as c}from"./blocks-hbD4Poeh.js";import{C as d}from"./ComponentOrigin-fk6UZ57T.js";import"./preload-helper-Dp1pzeXC.js";import"./iframe-CMgb2h7h.js";import"./index-CaMDsXTw.js";import"./index-DJAEy5CL.js";import"./registry-BMuWnSIt.js";function i(r){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Docs/Icon"}),`
`,e.jsx(n.h1,{id:"icon",children:"Icon"}),`
`,e.jsx(n.p,{children:"SVG icon component rendering from a shared spritesheet with CGA-authentic sizing."}),`
`,e.jsxs(n.p,{children:["The Icon component renders icons from ",e.jsx(n.code,{children:"sprites.svg"})," using SVG ",e.jsx(n.code,{children:"<use>"}),` references.\r
Icons inherit the parent's `,e.jsx(n.code,{children:"color"})," by default via ",e.jsx(n.code,{children:"currentColor"}),`, making them\r
automatically theme-aware. Interactive icons with `,e.jsx(n.code,{children:'role="button"'})," gain hover effects."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Interactive demos"}),": See the ",e.jsx(n.a,{href:"/story/components-icon--default",children:"Icon stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(n.h2,{id:"sizes",children:"Sizes"}),`
`,e.jsx(n.p,{children:"Two sizes optimized for DOS-style interfaces:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Size"}),e.jsx(n.th,{children:"Dimensions"}),e.jsx(n.th,{children:"Use Case"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.code,{children:"L"})," (default)"]}),e.jsx(n.td,{children:"56 x 56px"}),e.jsx(n.td,{children:"Hero icons, feature callouts"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"S"})}),e.jsx(n.td,{children:"24 x 24px"}),e.jsx(n.td,{children:"Inline icons, buttons, labels"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Icon name="Warning" size="L" />\r
<Icon name="Close" size="S" />
`})}),`
`,e.jsx(n.h2,{id:"color-override",children:"Color Override"}),`
`,e.jsxs(n.p,{children:["Icons inherit ",e.jsx(n.code,{children:"currentColor"})," from their parent by default. Use the ",e.jsx(n.code,{children:"color"}),` prop\r
to override with a specific token:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`{/* Inherits parent color */}\r
<Icon name="Check" />\r
\r
{/* Explicit color override */}\r
<Icon name="Warning" color="var(--color-cga-bright-red)" />\r
<Icon name="Info" color="var(--color-semantic-text-accent)" />
`})}),`
`,e.jsx(n.h2,{id:"interactive-icons",children:"Interactive Icons"}),`
`,e.jsxs(n.p,{children:["Add ",e.jsx(n.code,{children:'role="button"'})," and ",e.jsx(n.code,{children:"onClick"}),` to make icons interactive. Interactive icons\r
gain a pointer cursor and hover color change:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Icon\r
  name="Close"\r
  size="S"\r
  role="button"\r
  onClick={() => handleClose()}\r
/>
`})}),`
`,e.jsx(n.h2,{id:"available-icons",children:"Available Icons"}),`
`,e.jsxs(n.p,{children:["Icon names are derived from the ",e.jsx(n.code,{children:"manifest.json"}),` file. The full set is available\r
as the `,e.jsx(n.code,{children:"IconName"})," TypeScript type, providing autocompletion in editors."]}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA label"}),": Each icon has ",e.jsx(n.code,{children:'aria-label="{name} icon"'})," by default"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Interactive icons"}),": ",e.jsx(n.code,{children:'role="button"'})," adds keyboard and pointer semantics"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"High contrast"}),": Interactive icons gain a 3px focus outline via ",e.jsx(n.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Color inheritance"}),": Uses ",e.jsx(n.code,{children:"currentColor"})," so icons adapt to parent text color"]}),`
`]}),`
`,e.jsx(n.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"name"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"IconName"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Icon name from the spritesheet manifest (required)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"size"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'L' | 'S'"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'L'"})}),e.jsx(n.td,{children:"Icon dimensions (56px or 24px)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"color"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"—"}),e.jsxs(n.td,{children:["CSS color override (inherits ",e.jsx(n.code,{children:"currentColor"})," if omitted)"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"role"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'button'"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Sets interactive icon behavior"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onClick"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"() => void"})}),e.jsx(n.td,{children:"—"}),e.jsxs(n.td,{children:["Click handler (typically paired with ",e.jsx(n.code,{children:'role="button"'}),")"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"className"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"''"})}),e.jsx(n.td,{children:"Additional CSS classes"})]})]})]}),`
`,e.jsx(n.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Token"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-primary"})}),e.jsxs(n.td,{children:["Default icon color (via ",e.jsx(n.code,{children:"currentColor"}),")"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-link-hover"})}),e.jsx(n.td,{children:"Hover color for interactive icons"})]})]})]}),`
`,e.jsx(n.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(d,{name:"Icon"})]})}function m(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{m as default};
