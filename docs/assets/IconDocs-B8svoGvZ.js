import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as i,M as d}from"./blocks-BAJK2Xxh.js";import{C as c}from"./ComponentOrigin-BogxVIkj.js";import"./preload-helper-Dp1pzeXC.js";import"./iframe-DuFfgGUU.js";import"./index-CjOovKeQ.js";import"./index-BOb-1P7R.js";import"./index-CFke79mk.js";import"./registry-CyM9n0D0.js";function s(r){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Docs/Icon"}),`
`,e.jsx(n.h1,{id:"icon",children:"Icon"}),`
`,e.jsxs(n.p,{children:["SVG icon component backed by ",e.jsx(n.a,{href:"https://github.com/halfmage/pixelarticons",rel:"nofollow",children:e.jsx(n.code,{children:"pixelarticons"})})," (MIT licensed) with CGA-authentic DOS pixel art style."]}),`
`,e.jsxs(n.p,{children:[`The Icon component wraps pixelarticons React components, providing a consistent
API with the eidotter design system. Icons inherit the parent's `,e.jsx(n.code,{children:"color"}),` by
default via `,e.jsx(n.code,{children:"currentColor"}),`, making them automatically theme-aware. The pixel
art glyphs match eidotter's DOS aesthetic — no further styling needed.`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Interactive demos"}),": See the ",e.jsx(n.a,{href:"/story/components-icon--default",children:"Icon stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(n.h2,{id:"available-icons",children:"Available Icons"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Name"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"pixelarticons source"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Info"})}),e.jsx(n.td,{children:"Information marker"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"InfoBox"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Warning"})}),e.jsx(n.td,{children:"Alert diamond"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"WarningDiamond"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Error"})}),e.jsx(n.td,{children:"Alert square"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"SquareAlert"})})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.code,{children:"Done"})," / ",e.jsx(n.code,{children:"Check"})]}),e.jsx(n.td,{children:"Checkmark"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"Check"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Close"})}),e.jsx(n.td,{children:"Slashed circle (see note below)"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"Cancel"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Chevron Up"})}),e.jsx(n.td,{children:"Chevron pointing up"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"ChevronUp"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Chevron Down"})}),e.jsx(n.td,{children:"Chevron pointing down"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"ChevronDown"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"App"})}),e.jsx(n.td,{children:"DOS window frame"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"WindowFrame"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Cancel"})}),e.jsx(n.td,{children:"Minus — Terminal minimize control"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"Minus"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Fullscreen"})}),e.jsx(n.td,{children:"Expand — Terminal maximize control"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"Expand"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Add"})}),e.jsx(n.td,{children:"Plus"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"Plus"})})]})]})]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsxs(n.strong,{children:["Visual note on ",e.jsx(n.code,{children:"Close"}),":"]})," pixelarticons v2 has no plain X/Close glyph. The ",e.jsx(n.code,{children:"Close"})," name maps to pixelarticons' ",e.jsx(n.code,{children:"Cancel"})," component, which renders as a slashed circle (the idiomatic DOS dismissal symbol). Earlier versions of eidotter rendered a line-art X via ",e.jsx(n.code,{children:"@untitledui-pro/icons"})," — consumers upgrading from pre-v0.19 will see a visible shape change on any dismiss/close button. No prop API change."]}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsxs(n.strong,{children:["Visual note on ",e.jsx(n.code,{children:"Cancel"}),":"]})," despite the name, this renders a minus glyph intended for the Terminal window's minimize control — ",e.jsx(n.strong,{children:"not"})," an abort/cancel action. Use ",e.jsx(n.code,{children:"Close"})," for dismissal. A future release may rename ",e.jsx(n.code,{children:"Cancel"})," → ",e.jsx(n.code,{children:"Minimize"})," for clarity."]}),`
`]}),`
`,e.jsx(n.h2,{id:"sizes",children:"Sizes"}),`
`,e.jsx(n.p,{children:"Two sizes optimized for DOS-style interfaces:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Size"}),e.jsx(n.th,{children:"Dimensions"}),e.jsx(n.th,{children:"Use Case"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.code,{children:"L"})," (default)"]}),e.jsx(n.td,{children:"56 x 56px"}),e.jsx(n.td,{children:"Hero icons, feature callouts"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"S"})}),e.jsx(n.td,{children:"24 x 24px"}),e.jsx(n.td,{children:"Inline icons, buttons, labels"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Icon name="Warning" size="L" />
<Icon name="Close" size="S" />
`})}),`
`,e.jsx(n.h2,{id:"color-override",children:"Color Override"}),`
`,e.jsxs(n.p,{children:["Icons inherit ",e.jsx(n.code,{children:"currentColor"})," from their parent by default. Use the ",e.jsx(n.code,{children:"color"}),` prop
to override with a specific token:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`{/* Inherits parent color */}
<Icon name="Check" />

{/* Explicit color override */}
<Icon name="Warning" color="var(--color-cga-bright-red)" />
<Icon name="Info" color="var(--color-semantic-text-accent)" />
`})}),`
`,e.jsx(n.h2,{id:"interactive-icons",children:"Interactive Icons"}),`
`,e.jsxs(n.p,{children:["Add ",e.jsx(n.code,{children:'role="button"'})," and ",e.jsx(n.code,{children:"onClick"})," to make icons interactive:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Icon
  name="Close"
  size="S"
  role="button"
  onClick={() => handleClose()}
/>
`})}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA label"}),": Each icon has ",e.jsx(n.code,{children:'aria-label="{name} icon"'})," by default"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Custom label"}),": Pass ",e.jsx(n.code,{children:"aria-label"})," prop to override"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Interactive icons"}),": ",e.jsx(n.code,{children:'role="button"'})," adds keyboard and pointer semantics"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"High contrast"}),": Interactive icons gain a 3px focus outline via ",e.jsx(n.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Color inheritance"}),": Uses ",e.jsx(n.code,{children:"currentColor"})," so icons adapt to parent text color"]}),`
`]}),`
`,e.jsx(n.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"name"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"IconName"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Icon name (required)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"size"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'L' | 'S'"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'L'"})}),e.jsx(n.td,{children:"Icon dimensions (56px or 24px)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"color"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"—"}),e.jsxs(n.td,{children:["CSS color override (inherits ",e.jsx(n.code,{children:"currentColor"})," if omitted)"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"role"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'button'"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Sets interactive icon behavior"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onClick"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"() => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Click handler"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"className"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"''"})}),e.jsx(n.td,{children:"Additional CSS classes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"aria-label"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'{name} icon'"})}),e.jsx(n.td,{children:"Accessible label override"})]})]})]}),`
`,e.jsx(n.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Token"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-amber"})}),e.jsx(n.td,{children:"Default icon color"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-link-hover"})}),e.jsx(n.td,{children:"Hover color for interactive icons"})]})]})]}),`
`,e.jsx(n.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(c,{name:"Icon"})]})}function u(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{u as default};
