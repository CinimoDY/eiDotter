import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as r}from"./index-C2xLec2E.js";import{M as c}from"./blocks-lrTipX4y.js";import{C as t}from"./ComponentOrigin-yiYdhybI.js";import"./iframe-Cnx5oUV1.js";import"./preload-helper-Dp1pzeXC.js";import"./index-C8N-zHIe.js";import"./index-DlEpTCZ6.js";import"./registry-B_NR6ZmP.js";function i(d){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Docs/Accordion"}),`
`,e.jsx(n.h1,{id:"accordion",children:"Accordion"}),`
`,e.jsx(n.p,{children:"DOS-styled collapsible content sections with CRT phosphor expand animation."}),`
`,e.jsxs(n.p,{children:["The Accordion system provides two components: ",e.jsx(n.strong,{children:"Section"}),` (individual collapsible panel)\r
and `,e.jsx(n.strong,{children:"AccordionFill"}),` (multi-section group). Sections expand with a phosphor-bloom\r
animation and use CGA-authentic colors for hover and active states.`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Interactive demos"}),": See the ",e.jsx(n.a,{href:"/story/components-accordion--default-accordion",children:"Accordion stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(n.h2,{id:"components",children:"Components"}),`
`,e.jsx(n.p,{children:"The Accordion system is composed of two components:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Component"}),e.jsx(n.th,{children:"Role"}),e.jsx(n.th,{children:"Example"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Section"})}),e.jsx(n.td,{children:"Single collapsible panel with header and content"}),e.jsx(n.td,{children:"FAQ item, settings group"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"AccordionFill"})}),e.jsx(n.td,{children:"Multi-section container, manages a collection of Sections"}),e.jsx(n.td,{children:"FAQ list, settings page"})]})]})]}),`
`,e.jsx(n.h3,{id:"section-standalone",children:"Section (standalone)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Section title="Expandable Section" defaultExpanded={false}>\r
  Content goes here...\r
</Section>
`})}),`
`,e.jsx(n.h3,{id:"accordionfill-grouped",children:"AccordionFill (grouped)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<AccordionFill\r
  sections={[\r
    { title: 'Section 1', content: 'First section content' },\r
    { title: 'Section 2', content: 'Second section content' },\r
    { title: 'Section 3', content: 'Third section content' },\r
  ]}\r
  defaultExpandedIndex={0}\r
/>
`})}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(n.h3,{id:"default-collapsed",children:"Default (Collapsed)"}),`
`,e.jsxs(n.p,{children:[`Section header displays the title with a chevron-down icon on the right.\r
Content is hidden. Border uses `,e.jsx(n.code,{children:"--color-semantic-border-default"}),"."]}),`
`,e.jsx(n.h3,{id:"expanded",children:"Expanded"}),`
`,e.jsxs(n.p,{children:["When expanded, the section border brightens to ",e.jsx(n.code,{children:"--color-semantic-text-secondary"}),`,\r
the header gains an accent background, and content slides in with the\r
`,e.jsx(n.code,{children:"section-expand"})," keyframe animation over ",e.jsx(n.code,{children:"--duration-normal"})," (200ms)."]}),`
`,e.jsx(n.h3,{id:"hover",children:"Hover"}),`
`,e.jsxs(n.p,{children:["Header background changes to ",e.jsx(n.code,{children:"--color-semantic-background-accent"}),` with\r
`,e.jsx(n.code,{children:"--color-semantic-text-secondary"})," text color, giving a CRT warm-up feel."]}),`
`,e.jsx(n.h3,{id:"active",children:"Active"}),`
`,e.jsxs(n.p,{children:["Header background shifts to ",e.jsx(n.code,{children:"--color-semantic-background-secondary"}),` with\r
amber text (`,e.jsx(n.code,{children:"--color-cga-amber"}),") and a phosphor text-shadow glow."]}),`
`,e.jsx(n.h2,{id:"interaction-design",children:"Interaction Design"}),`
`,e.jsxs(n.p,{children:[`The chevron icon rotates 180 degrees on expand/collapse, animated over\r
`,e.jsx(n.code,{children:"--duration-normal"}),` with ease-in-out timing. Content enters with a\r
max-height + opacity animation simulating a phosphor bloom.`]}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus visible"}),": 2px box-shadow outline using ",e.jsx(n.code,{children:"--color-semantic-border-focus"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"High contrast"}),": Border widens to 3px, title gets bold weight, focus ring widens to 3px via ",e.jsx(n.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Reduced motion"}),": Icon rotation transition and content expand animation disabled via ",e.jsx(n.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA"}),": ",e.jsx(n.code,{children:"aria-expanded"})," set on the header button to indicate open/closed state"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard"}),": Full keyboard navigation — header is a native ",e.jsx(n.code,{children:"<button>"})," element"]}),`
`]}),`
`,e.jsx(n.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsx(n.h3,{id:"section-props",children:"Section Props"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"title"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"The title text displayed in the section header"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"children"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"ReactNode"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"The content revealed when the section is expanded"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"defaultExpanded"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Whether the section is expanded on initial render"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"isHovered"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Force the hover visual state (for Storybook demos)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"isActive"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Force the active visual state (for Storybook demos)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onToggle"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"(isExpanded: boolean) => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Callback fired when the section is toggled"})]})]})]}),`
`,e.jsx(n.h3,{id:"accordionfill-props",children:"AccordionFill Props"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"sections"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"Array<{ title: string; content: string }>"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Array of section data objects"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"defaultExpandedIndex"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"-1"})}),e.jsx(n.td,{children:"Index of the section expanded by default (-1 = none)"})]})]})]}),`
`,e.jsx(n.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Token"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-border-default"})}),e.jsx(n.td,{children:"Section border and content divider"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-background-primary"})}),e.jsx(n.td,{children:"Section background"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-primary"})}),e.jsx(n.td,{children:"Default text color"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-secondary"})}),e.jsx(n.td,{children:"Content text and expanded header text"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-background-accent"})}),e.jsx(n.td,{children:"Hover and expanded header background"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-background-secondary"})}),e.jsx(n.td,{children:"Active header background"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-amber"})}),e.jsx(n.td,{children:"Active state text color"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-amber-glow"})}),e.jsx(n.td,{children:"Active state text-shadow glow"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-border-focus"})}),e.jsx(n.td,{children:"Focus outline ring"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--duration-normal"})}),e.jsx(n.td,{children:"Expand animation and icon rotation (200ms)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--spacing-2"})}),e.jsx(n.td,{children:"Gap between sections in AccordionFill"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--typography-font-family-primary"})}),e.jsx(n.td,{children:"DOS font family"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--typography-font-family-fallback"})}),e.jsx(n.td,{children:"Fallback font family"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--typography-font-size-base"})}),e.jsx(n.td,{children:"AccordionFill base font size"})]})]})]}),`
`,e.jsx(n.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(t,{name:"Accordion"})]})}function g(d={}){const{wrapper:n}={...r(),...d.components};return n?e.jsx(n,{...d,children:e.jsx(i,{...d})}):i(d)}export{g as default};
