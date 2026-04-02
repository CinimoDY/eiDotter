import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as n,M as c}from"./blocks-hbD4Poeh.js";import{C as l}from"./ComponentOrigin-fk6UZ57T.js";import"./preload-helper-Dp1pzeXC.js";import"./iframe-CMgb2h7h.js";import"./index-CaMDsXTw.js";import"./index-DJAEy5CL.js";import"./registry-BMuWnSIt.js";function s(r){const d={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Docs/Tag"}),`
`,e.jsx(d.h1,{id:"tag",children:"Tag"}),`
`,e.jsx(d.p,{children:"Interactive label component for tags, categories, and filter chips."}),`
`,e.jsx(d.p,{children:`Tag extends Badge's display-only approach with click, close, and selection behaviors.\r
Use for content labels users can add, remove, click, or toggle. TagGroup provides\r
consistent spacing when rendering multiple tags together.`}),`
`,e.jsxs(d.blockquote,{children:[`
`,e.jsxs(d.p,{children:[e.jsx(d.strong,{children:"Interactive demos"}),": See the ",e.jsx(d.a,{href:"/story/components-tag--default",children:"Tag stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(d.h2,{id:"tag-vs-badge",children:"Tag vs Badge"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Concern"}),e.jsx(d.th,{children:"Badge"}),e.jsx(d.th,{children:"Tag"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:"Purpose"}),e.jsx(d.td,{children:"Status indicator"}),e.jsx(d.td,{children:"Content label"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:"Interactive"}),e.jsx(d.td,{children:"No"}),e.jsx(d.td,{children:"Yes (click, close, select)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:"Element"}),e.jsx(d.td,{children:e.jsx(d.code,{children:"<span>"})}),e.jsxs(d.td,{children:[e.jsx(d.code,{children:"<span>"})," with optional ",e.jsx(d.code,{children:'role="button"'})]})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:"Focusable"}),e.jsx(d.td,{children:"No"}),e.jsx(d.td,{children:"Yes (when interactive)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:"Removable"}),e.jsx(d.td,{children:"No"}),e.jsx(d.td,{children:"Yes (optional close button)"})]})]})]}),`
`,e.jsx(d.h2,{id:"variants",children:"Variants"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Variant"}),e.jsx(d.th,{children:"Visual"}),e.jsx(d.th,{children:"Use case"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"default"})}),e.jsx(d.td,{children:"Subtle border, transparent bg"}),e.jsx(d.td,{children:"General purpose tags"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"outlined"})}),e.jsx(d.td,{children:"Colored border and text"}),e.jsx(d.td,{children:"Category indicators with custom color"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"filled"})}),e.jsx(d.td,{children:"Colored background, dark text"}),e.jsx(d.td,{children:"High-emphasis labels like PARA categories"})]})]})]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<Tag variant="default">general</Tag>\r
<Tag variant="outlined" color="--color-cga-bright-cyan">project</Tag>\r
<Tag variant="filled" color="--color-cga-bright-green">area</Tag>
`})}),`
`,e.jsx(d.h2,{id:"close-button",children:"Close Button"}),`
`,e.jsxs(d.p,{children:["The ",e.jsx(d.code,{children:"closeable"})," prop adds a DOS-authentic ",e.jsx(d.code,{children:"[x]"}),` button. The close button uses\r
`,e.jsx(d.code,{children:"tabIndex={-1}"}),` so focus stays on the tag body; pressing Delete or Backspace\r
triggers close from the tag itself.`]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<Tag closeable onClose={(e) => handleRemove()}>removable</Tag>
`})}),`
`,e.jsx(d.h2,{id:"selected-state",children:"Selected State"}),`
`,e.jsxs(d.p,{children:["Toggle ",e.jsx(d.code,{children:"selected"}),` to show an active/filled appearance with a glow shadow.\r
Combine with `,e.jsx(d.code,{children:"onClick"})," for filter chip behavior."]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<Tag selected={isActive} onClick={() => toggleFilter()}>\r
  filter\r
</Tag>
`})}),`
`,e.jsx(d.h2,{id:"custom-colors",children:"Custom Colors"}),`
`,e.jsxs(d.p,{children:["The ",e.jsx(d.code,{children:"color"})," prop accepts a CSS custom property name and sets ",e.jsx(d.code,{children:"--tag-color"}),` on the\r
element. Both `,e.jsx(d.code,{children:"outlined"})," and ",e.jsx(d.code,{children:"filled"})," variants respond to this property."]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`const paraColors = {\r
  project: '--color-cga-bright-cyan',\r
  area: '--color-cga-bright-green',\r
  resource: '--color-cga-yellow',\r
  archive: '--color-cga-brown',\r
};\r
\r
<Tag variant="filled" color={paraColors[entry.para]}>\r
  {entry.para}\r
</Tag>
`})}),`
`,e.jsx(d.h2,{id:"taggroup",children:"TagGroup"}),`
`,e.jsx(d.p,{children:"Wraps multiple tags with consistent flex spacing and optional line wrapping."}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-tsx",children:`<TagGroup gap="tight">\r
  {tags.map(t => <Tag key={t} closeable onClose={() => remove(t)}>{t}</Tag>)}\r
</TagGroup>
`})}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Prop"}),e.jsx(d.th,{children:"Type"}),e.jsx(d.th,{children:"Default"}),e.jsx(d.th,{children:"Description"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"gap"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'tight' | 'normal' | 'loose'"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'normal'"})}),e.jsx(d.td,{children:"Spacing between tags (4px/8px/12px)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"wrap"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"boolean"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"true"})}),e.jsx(d.td,{children:"Wrap to multiple lines"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"aria-label"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Accessible group label"})]})]})]}),`
`,e.jsx(d.h2,{id:"keyboard-interaction",children:"Keyboard Interaction"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Key"}),e.jsx(d.th,{children:"Action"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:"Enter / Space"}),e.jsxs(d.td,{children:["Trigger ",e.jsx(d.code,{children:"onClick"})," (when interactive)"]})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:"Delete / Backspace"}),e.jsxs(d.td,{children:["Trigger ",e.jsx(d.code,{children:"onClose"})," (when closeable)"]})]})]})]}),`
`,e.jsx(d.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Role"}),": ",e.jsx(d.code,{children:'role="button"'})," and ",e.jsx(d.code,{children:"tabIndex={0}"})," when ",e.jsx(d.code,{children:"onClick"})," is provided"]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Selected"}),": ",e.jsx(d.code,{children:"aria-selected"})," set when ",e.jsx(d.code,{children:"selected"})," is true"]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Disabled"}),": ",e.jsx(d.code,{children:"aria-disabled"})," set, pointer events disabled"]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Close button"}),": ",e.jsx(d.code,{children:'aria-label="Remove {label}"'}),", ",e.jsx(d.code,{children:"tabIndex={-1}"})]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"TagGroup"}),": ",e.jsx(d.code,{children:'role="group"'})," with ",e.jsx(d.code,{children:"aria-label"})]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"High contrast"}),": Border widens to 2px, glow removed"]}),`
`,e.jsxs(d.li,{children:[e.jsx(d.strong,{children:"Reduced motion"}),": All transitions disabled"]}),`
`]}),`
`,e.jsx(d.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Prop"}),e.jsx(d.th,{children:"Type"}),e.jsx(d.th,{children:"Default"}),e.jsx(d.th,{children:"Description"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"children"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"ReactNode"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Tag display text"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"variant"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'default' | 'outlined' | 'filled'"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'default'"})}),e.jsx(d.td,{children:"Visual variant"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"size"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'small' | 'medium'"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"'medium'"})}),e.jsx(d.td,{children:"Tag dimensions"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"color"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:"—"}),e.jsxs(d.td,{children:["CGA color token (e.g. ",e.jsx(d.code,{children:"'--color-cga-bright-cyan'"}),")"]})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"selected"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"boolean"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"false"})}),e.jsx(d.td,{children:"Active/selected state"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"closeable"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"boolean"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"false"})}),e.jsxs(d.td,{children:["Show ",e.jsx(d.code,{children:"[x]"})," close button"]})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"disabled"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"boolean"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"false"})}),e.jsx(d.td,{children:"Disable all interaction"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"onClick"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"(event) => void"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Click handler (makes tag interactive)"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"onClose"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"(event) => void"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Close handler"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"className"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"''"})}),e.jsx(d.td,{children:"Additional CSS classes"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"aria-label"})}),e.jsx(d.td,{children:e.jsx(d.code,{children:"string"})}),e.jsx(d.td,{children:"—"}),e.jsx(d.td,{children:"Accessible label override"})]})]})]}),`
`,e.jsx(d.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Token"}),e.jsx(d.th,{children:"Purpose"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-text-primary"})}),e.jsx(d.td,{children:"Default text color"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-text-secondary"})}),e.jsx(d.td,{children:"Filled variant text"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-border-default"})}),e.jsx(d.td,{children:"Default border"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-border-focus"})}),e.jsx(d.td,{children:"Focus outline"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--color-semantic-background-accent"})}),e.jsx(d.td,{children:"Selected/filled background"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:e.jsx(d.code,{children:"--shadow-glow-xs"})}),e.jsx(d.td,{children:"Selected and hover glow"})]})]})]}),`
`,e.jsx(d.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(l,{name:"Tag"})]})}function p(r={}){const{wrapper:d}={...n(),...r.components};return d?e.jsx(d,{...r,children:e.jsx(s,{...r})}):s(r)}export{p as default};
