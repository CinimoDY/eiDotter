import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/Tag`}),`
`,(0,u.jsx)(n.h1,{id:`tag`,children:`Tag`}),`
`,(0,u.jsx)(n.p,{children:`Interactive label component for tags, categories, and filter chips.`}),`
`,(0,u.jsx)(n.p,{children:`Tag adds click, close, and selection behavior to Badge's display-only label.\r
Use for content labels users can add, remove, click, or toggle. TagGroup provides\r
consistent spacing when rendering multiple tags together.`}),`
`,(0,u.jsxs)(n.blockquote,{children:[`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(n.a,{href:`/story/components-tag--default`,children:`Tag stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`tag-vs-badge`,children:`Tag vs Badge`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Concern`}),(0,u.jsx)(n.th,{children:`Badge`}),(0,u.jsx)(n.th,{children:`Tag`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Purpose`}),(0,u.jsx)(n.td,{children:`Status indicator`}),(0,u.jsx)(n.td,{children:`Content label`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Interactive`}),(0,u.jsx)(n.td,{children:`No`}),(0,u.jsx)(n.td,{children:`Yes (click, close, select)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Element`}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`<span>`})}),(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`<span>`}),` with optional `,(0,u.jsx)(n.code,{children:`role="button"`})]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Focusable`}),(0,u.jsx)(n.td,{children:`No`}),(0,u.jsx)(n.td,{children:`Yes (when interactive)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Removable`}),(0,u.jsx)(n.td,{children:`No`}),(0,u.jsx)(n.td,{children:`Yes (optional close button)`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`variants`,children:`Variants`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Variant`}),(0,u.jsx)(n.th,{children:`Visual`}),(0,u.jsx)(n.th,{children:`Use case`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`default`})}),(0,u.jsx)(n.td,{children:`Subtle border, transparent bg`}),(0,u.jsx)(n.td,{children:`General purpose tags`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`outlined`})}),(0,u.jsx)(n.td,{children:`Colored border and text`}),(0,u.jsx)(n.td,{children:`Category indicators with custom color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`filled`})}),(0,u.jsx)(n.td,{children:`Colored background, dark text`}),(0,u.jsx)(n.td,{children:`High-emphasis labels like PARA categories`})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Tag variant="default">general</Tag>\r
<Tag variant="outlined" color="--color-cga-bright-cyan">project</Tag>\r
<Tag variant="filled" color="--color-cga-bright-green">area</Tag>
`})}),`
`,(0,u.jsx)(n.h2,{id:`close-button`,children:`Close button`}),`
`,(0,u.jsxs)(n.p,{children:[`The `,(0,u.jsx)(n.code,{children:`closeable`}),` prop adds a remove button. It is the shared `,(0,u.jsx)(n.code,{children:`IconButton`}),`\r
(pixel X, md 36px, bare), named `,(0,u.jsx)(n.code,{children:`Remove <label>`}),`. On an interactive tag the\r
button is kept out of the tab order, so focus stays on the tag body, and Delete\r
or Backspace closes from the tag itself. On a non-interactive tag it stays\r
tabbable.`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Tag closeable onClose={(e) => handleRemove()}>removable</Tag>
`})}),`
`,(0,u.jsx)(n.h2,{id:`selected-state`,children:`Selected state`}),`
`,(0,u.jsxs)(n.p,{children:[`Toggle `,(0,u.jsx)(n.code,{children:`selected`}),` to show an active/filled appearance with a glow shadow.\r
Combine with `,(0,u.jsx)(n.code,{children:`onClick`}),` for filter chip behavior.`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Tag selected={isActive} onClick={() => toggleFilter()}>\r
  filter\r
</Tag>
`})}),`
`,(0,u.jsx)(n.h2,{id:`custom-colors`,children:`Custom colors`}),`
`,(0,u.jsxs)(n.p,{children:[`The `,(0,u.jsx)(n.code,{children:`color`}),` prop accepts a CSS custom property name and sets `,(0,u.jsx)(n.code,{children:`--tag-color`}),` on the\r
element. Both `,(0,u.jsx)(n.code,{children:`outlined`}),` and `,(0,u.jsx)(n.code,{children:`filled`}),` variants respond to this property.`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`const paraColors = {\r
  project: '--color-cga-bright-cyan',\r
  area: '--color-cga-bright-green',\r
  resource: '--color-cga-yellow',\r
  archive: '--color-cga-light-gray',\r
};\r
\r
<Tag variant="filled" color={paraColors[entry.para]}>\r
  {entry.para}\r
</Tag>
`})}),`
`,(0,u.jsx)(n.h2,{id:`taggroup`,children:`TagGroup`}),`
`,(0,u.jsx)(n.p,{children:`Wraps multiple tags with consistent flex spacing and optional line wrapping.`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<TagGroup gap="tight">\r
  {tags.map(t => <Tag key={t} closeable onClose={() => remove(t)}>{t}</Tag>)}\r
</TagGroup>
`})}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`gap`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'tight' | 'normal' | 'loose'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'normal'`})}),(0,u.jsx)(n.td,{children:`Spacing between tags (4px/8px/12px)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`wrap`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`true`})}),(0,u.jsx)(n.td,{children:`Wrap to multiple lines`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`aria-label`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Accessible group label`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`keyboard-interaction`,children:`Keyboard interaction`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Key`}),(0,u.jsx)(n.th,{children:`Action`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Enter / Space`}),(0,u.jsxs)(n.td,{children:[`Trigger `,(0,u.jsx)(n.code,{children:`onClick`}),` (when interactive)`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Delete / Backspace`}),(0,u.jsxs)(n.td,{children:[`Trigger `,(0,u.jsx)(n.code,{children:`onClose`}),` (when closeable)`]})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Role`}),`: `,(0,u.jsx)(n.code,{children:`role="button"`}),` and `,(0,u.jsx)(n.code,{children:`tabIndex={0}`}),` when `,(0,u.jsx)(n.code,{children:`onClick`}),` is provided`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Selected`}),`: `,(0,u.jsx)(n.code,{children:`aria-selected`}),` set when `,(0,u.jsx)(n.code,{children:`selected`}),` is true`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Disabled`}),`: `,(0,u.jsx)(n.code,{children:`aria-disabled`}),` set, pointer events disabled`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Close button`}),`: `,(0,u.jsx)(n.code,{children:`aria-label="Remove {label}"`}),`, `,(0,u.jsx)(n.code,{children:`tabIndex={-1}`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`TagGroup`}),`: `,(0,u.jsx)(n.code,{children:`role="group"`}),` with `,(0,u.jsx)(n.code,{children:`aria-label`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`High contrast`}),`: Border widens to 2px, glow removed`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Reduced motion`}),`: All transitions disabled`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`children`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`ReactNode`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Tag display text`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`variant`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'default' | 'outlined' | 'filled'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'default'`})}),(0,u.jsx)(n.td,{children:`Visual variant`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`size`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'small' | 'medium'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'medium'`})}),(0,u.jsx)(n.td,{children:`Tag dimensions`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`color`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsxs)(n.td,{children:[`CGA color token (e.g. `,(0,u.jsx)(n.code,{children:`'--color-cga-bright-cyan'`}),`)`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`selected`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsx)(n.td,{children:`Active/selected state`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`closeable`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsx)(n.td,{children:`Show the pixel-X remove button (IconButton)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`disabled`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsx)(n.td,{children:`Disable all interaction`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onClick`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`(event) => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Click handler (makes tag interactive)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onClose`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`(event) => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Close handler`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`''`})}),(0,u.jsx)(n.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`aria-label`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Accessible label override`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Token`}),(0,u.jsx)(n.th,{children:`Purpose`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(n.td,{children:`Default text color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-on-accent`})}),(0,u.jsx)(n.td,{children:`Filled variant text`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(n.td,{children:`Default border`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(n.td,{children:`Focus outline`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-background-accent`})}),(0,u.jsx)(n.td,{children:`Selected/filled background`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--shadow-glow-xs`})}),(0,u.jsx)(n.td,{children:`Selected and hover glow`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Tag`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};