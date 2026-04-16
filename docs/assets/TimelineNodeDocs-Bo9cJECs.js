import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as n,M as s}from"./blocks-BAJK2Xxh.js";import{C as l}from"./ComponentOrigin-BogxVIkj.js";import"./preload-helper-Dp1pzeXC.js";import"./iframe-DuFfgGUU.js";import"./index-CjOovKeQ.js";import"./index-BOb-1P7R.js";import"./index-CFke79mk.js";import"./registry-CyM9n0D0.js";function i(r){const d={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Docs/TimelineNode"}),`
`,e.jsx(d.h1,{id:"timelinenode",children:"TimelineNode"}),`
`,e.jsx(d.p,{children:"Axis marker for timeline and stepper interfaces with CGA amber phosphor glow."}),`
`,e.jsx(d.p,{children:`TimelineNode is a versatile marker component for timelines, steppers, and progress\r
indicators. It supports three shapes, four color variants, optional labels with\r
configurable position, and amber phosphor glow effects on hover and active states.`}),`
`,e.jsxs(d.blockquote,{children:[`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Interactive demos"}),": See the ",e.jsx(d.a,{href:"/story/components-timelinenode--default",children:"TimelineNode stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(d.h2,{id:"shapes",children:"Shapes"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Shape"}),e.jsx(d.th,{children:"Appearance"}),e.jsx(d.th,{children:"CSS"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsxs(d.td,{children:[e.jsx(d.code,{children:"circle"})," (default)"]}),e.jsx(d.td,{children:"Round marker"}),e.jsx(d.td,{children:e.jsx(d.code,{children:"border-radius: 50%"})})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"square"})}),e.jsx(d.td,{children:"Rounded square"}),e.jsx(d.td,{children:e.jsx(d.code,{children:"border-radius: 2px"})})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"diamond"})}),e.jsx(d.td,{children:"Rotated square"}),e.jsx(d.td,{children:e.jsx(d.code,{children:"transform: rotate(45deg)"})})]})]})]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<TimelineNode shape="circle" />\r
<TimelineNode shape="square" />\r
<TimelineNode shape="diamond" />
`})}),`
`,e.jsx(d.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(d.p,{children:"Four color variants for the marker fill and border:"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Variant"}),e.jsx(d.th,{children:"Color"}),e.jsx(d.th,{children:"Use Case"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"default"})}),e.jsx(d.td,{children:"Amber dim"}),e.jsx(d.td,{children:"Inactive/past events"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"primary"})}),e.jsx(d.td,{children:"Amber"}),e.jsx(d.td,{children:"Current/important events"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"secondary"})}),e.jsx(d.td,{children:"Primary text"}),e.jsx(d.td,{children:"Neutral markers"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"accent"})}),e.jsx(d.td,{children:"Accent text"}),e.jsx(d.td,{children:"Highlighted events"})]})]})]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<TimelineNode variant="default" />\r
<TimelineNode variant="primary" />\r
<TimelineNode variant="secondary" />\r
<TimelineNode variant="accent" />
`})}),`
`,e.jsx(d.h2,{id:"sizes",children:"Sizes"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Size"}),e.jsx(d.th,{children:"Marker"}),e.jsx(d.th,{children:"Diamond"}),e.jsx(d.th,{children:"Use Case"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"small"})}),e.jsx(d.td,{children:"8px"}),e.jsx(d.td,{children:"7px"}),e.jsx(d.td,{children:"Compact timelines"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"medium"})}),e.jsx(d.td,{children:"12px"}),e.jsx(d.td,{children:"10px"}),e.jsx(d.td,{children:"Default"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"large"})}),e.jsx(d.td,{children:"16px"}),e.jsx(d.td,{children:"14px"}),e.jsx(d.td,{children:"Hero timelines"})]})]})]}),`
`,e.jsx(d.h2,{id:"labels",children:"Labels"}),`
`,e.jsx(d.p,{children:"Optional text labels with four position options:"}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<TimelineNode label="Jan 2026" labelPosition="left" />\r
<TimelineNode label="Jan 2026" labelPosition="right" />\r
<TimelineNode label="Jan 2026" labelPosition="top" />\r
<TimelineNode label="Jan 2026" labelPosition="bottom" />
`})}),`
`,e.jsx(d.p,{children:"Label font size scales with node size: 10px for small, xs for medium, sm for large."}),`
`,e.jsx(d.h2,{id:"active-state",children:"Active State"}),`
`,e.jsxs(d.p,{children:["The ",e.jsx(d.code,{children:"isActive"})," prop highlights the node with a brighter amber fill and phosphor glow:"]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<TimelineNode isActive variant="primary" label="Now" />
`})}),`
`,e.jsxs(d.p,{children:["Active + interactive nodes gain a stronger glow (",e.jsx(d.code,{children:"--shadow-glow-md"}),") on hover."]}),`
`,e.jsx(d.h2,{id:"interactive-nodes",children:"Interactive Nodes"}),`
`,e.jsxs(d.p,{children:["Add ",e.jsx(d.code,{children:"onClick"}),` to make nodes clickable. Interactive nodes gain pointer cursor,\r
hover glow, keyboard support, and `,e.jsx(d.code,{children:'role="button"'})," with ",e.jsx(d.code,{children:"aria-pressed"}),":"]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<TimelineNode\r
  label="Step 1"\r
  onClick={() => goToStep(1)}\r
  isActive={currentStep === 1}\r
/>
`})}),`
`,e.jsx(d.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Interactive role"}),": ",e.jsx(d.code,{children:'role="button"'})," with ",e.jsx(d.code,{children:"tabIndex={0}"})," when ",e.jsx(d.code,{children:"onClick"})," is provided"]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Active state"}),": ",e.jsx(d.code,{children:"aria-pressed"})," reflects ",e.jsx(d.code,{children:"isActive"})," on interactive nodes"]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Focus visible"}),": 2px solid outline with 2px offset using ",e.jsx(d.code,{children:"--color-semantic-border-focus"})]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"High contrast"}),": Marker border widens to 3px, focus outline widens to 3px via ",e.jsx(d.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Reduced motion"}),": All transitions disabled via ",e.jsx(d.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Keyboard"}),": Enter and Space activate interactive nodes"]}),`
`]}),`
`,e.jsx(d.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Prop"}),e.jsx(d.th,{children:"Type"}),e.jsx(d.th,{children:"Default"}),e.jsx(d.th,{children:"Description"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"shape"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'circle' | 'square' | 'diamond'"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'circle'"})}),e.jsx(d.td,{children:"Marker shape"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"variant"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'default' | 'primary' | 'secondary' | 'accent'"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'default'"})}),e.jsx(d.td,{children:"Color variant"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"isActive"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"boolean"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"false"})}),e.jsx(d.td,{children:"Active/selected state with glow"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"label"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Optional label text"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"labelPosition"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'left' | 'right' | 'top' | 'bottom'"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'left'"})}),e.jsx(d.td,{children:"Label placement relative to marker"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"size"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'small' | 'medium' | 'large'"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'medium'"})}),e.jsx(d.td,{children:"Marker dimensions"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"onClick"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"() => void"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Click handler (enables interactive mode)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"className"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"''"})}),e.jsx(d.td,{children:"Additional CSS classes"})]})]})]}),`
`,e.jsx(d.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Token"}),e.jsx(d.th,{children:"Purpose"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-cga-amber-dim"})}),e.jsx(d.td,{children:"Default variant fill and border"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-cga-amber"})}),e.jsx(d.td,{children:"Primary variant fill, hover state, label text"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-cga-amber-bright"})}),e.jsx(d.td,{children:"Active state fill"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-text-primary"})}),e.jsx(d.td,{children:"Secondary variant fill"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-text-accent"})}),e.jsx(d.td,{children:"Accent variant fill"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-border-focus"})}),e.jsx(d.td,{children:"Focus outline color"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--shadow-glow-sm"})}),e.jsx(d.td,{children:"Hover and active glow"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--shadow-glow-md"})}),e.jsx(d.td,{children:"Active + hover glow"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--typography-font-family-primary"})}),e.jsx(d.td,{children:"Label font family"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--typography-font-size-text-xs"})}),e.jsx(d.td,{children:"Medium label font size"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--typography-font-size-text-sm"})}),e.jsx(d.td,{children:"Large label font size"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--spacing-2"})}),e.jsx(d.td,{children:"Gap between marker and label"})]})]})]}),`
`,e.jsx(d.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(l,{name:"TimelineNode"})]})}function b(r={}){const{wrapper:d}={...n(),...r.components};return d?e.jsx(d,{...r,children:e.jsx(i,{...r})}):i(r)}export{b as default};
