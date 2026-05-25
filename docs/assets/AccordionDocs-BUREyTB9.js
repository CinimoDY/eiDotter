import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/Accordion`}),`
`,(0,u.jsx)(r.h1,{id:`accordion`,children:`Accordion`}),`
`,(0,u.jsx)(r.p,{children:`DOS-styled collapsible content sections with CRT phosphor expand animation.`}),`
`,(0,u.jsxs)(r.p,{children:[`The Accordion system provides two components: `,(0,u.jsx)(r.strong,{children:`Section`}),` (individual collapsible panel)\r
and `,(0,u.jsx)(r.strong,{children:`AccordionFill`}),` (multi-section group). Sections expand with a phosphor-bloom\r
animation and use CGA-authentic colors for hover and active states.`]}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-accordion--default-accordion`,children:`Accordion stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`components`,children:`Components`}),`
`,(0,u.jsx)(r.p,{children:`The Accordion system is composed of two components:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Component`}),(0,u.jsx)(r.th,{children:`Role`}),(0,u.jsx)(r.th,{children:`Example`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Section`})}),(0,u.jsx)(r.td,{children:`Single collapsible panel with header and content`}),(0,u.jsx)(r.td,{children:`FAQ item, settings group`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`AccordionFill`})}),(0,u.jsx)(r.td,{children:`Multi-section container, manages a collection of Sections`}),(0,u.jsx)(r.td,{children:`FAQ list, settings page`})]})]})]}),`
`,(0,u.jsx)(r.h3,{id:`section-standalone`,children:`Section (standalone)`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Section title="Expandable Section" defaultExpanded={false}>\r
  Content goes here...\r
</Section>
`})}),`
`,(0,u.jsx)(r.h3,{id:`accordionfill-grouped`,children:`AccordionFill (grouped)`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<AccordionFill\r
  sections={[\r
    { title: 'Section 1', content: 'First section content' },\r
    { title: 'Section 2', content: 'Second section content' },\r
    { title: 'Section 3', content: 'Third section content' },\r
  ]}\r
  defaultExpandedIndex={0}\r
/>
`})}),`
`,(0,u.jsx)(r.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(r.h3,{id:`default-collapsed`,children:`Default (Collapsed)`}),`
`,(0,u.jsxs)(r.p,{children:[`Section header displays the title with a chevron-down icon on the right.\r
Content is hidden. Border uses `,(0,u.jsx)(r.code,{children:`--color-semantic-border-default`}),`.`]}),`
`,(0,u.jsx)(r.h3,{id:`expanded`,children:`Expanded`}),`
`,(0,u.jsxs)(r.p,{children:[`When expanded, the section border brightens to `,(0,u.jsx)(r.code,{children:`--color-semantic-text-secondary`}),`,\r
the header gains an accent background, and content slides in with the\r
`,(0,u.jsx)(r.code,{children:`section-expand`}),` keyframe animation over `,(0,u.jsx)(r.code,{children:`--duration-normal`}),` (200ms).`]}),`
`,(0,u.jsx)(r.h3,{id:`hover`,children:`Hover`}),`
`,(0,u.jsxs)(r.p,{children:[`Header background changes to `,(0,u.jsx)(r.code,{children:`--color-semantic-background-accent`}),` with\r
`,(0,u.jsx)(r.code,{children:`--color-semantic-text-secondary`}),` text color, giving a CRT warm-up feel.`]}),`
`,(0,u.jsx)(r.h3,{id:`active`,children:`Active`}),`
`,(0,u.jsxs)(r.p,{children:[`Header background shifts to `,(0,u.jsx)(r.code,{children:`--color-semantic-background-secondary`}),` with\r
amber text (`,(0,u.jsx)(r.code,{children:`--color-cga-amber`}),`) and a phosphor text-shadow glow.`]}),`
`,(0,u.jsx)(r.h2,{id:`interaction-design`,children:`Interaction Design`}),`
`,(0,u.jsxs)(r.p,{children:[`The chevron icon rotates 180 degrees on expand/collapse, animated over\r
`,(0,u.jsx)(r.code,{children:`--duration-normal`}),` with ease-in-out timing. Content enters with a\r
max-height + opacity animation simulating a phosphor bloom.`]}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Focus visible`}),`: 2px box-shadow outline using `,(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`High contrast`}),`: Border widens to 3px, title gets bold weight, focus ring widens to 3px via `,(0,u.jsx)(r.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Reduced motion`}),`: Icon rotation transition and content expand animation disabled via `,(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`ARIA`}),`: `,(0,u.jsx)(r.code,{children:`aria-expanded`}),` set on the header button to indicate open/closed state`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Keyboard`}),`: Full keyboard navigation — header is a native `,(0,u.jsx)(r.code,{children:`<button>`}),` element`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsx)(r.h3,{id:`section-props`,children:`Section Props`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`title`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`The title text displayed in the section header`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`children`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ReactNode`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`The content revealed when the section is expanded`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`defaultExpanded`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Whether the section is expanded on initial render`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`isHovered`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Force the hover visual state (for Storybook demos)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`isActive`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Force the active visual state (for Storybook demos)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onToggle`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`(isExpanded: boolean) => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Callback fired when the section is toggled`})]})]})]}),`
`,(0,u.jsx)(r.h3,{id:`accordionfill-props`,children:`AccordionFill Props`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`sections`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`Array<{ title: string; content: string }>`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Array of section data objects`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`defaultExpandedIndex`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`number`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`-1`})}),(0,u.jsx)(r.td,{children:`Index of the section expanded by default (-1 = none)`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`design-tokens-used`,children:`Design Tokens Used`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Token`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(r.td,{children:`Section border and content divider`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-primary`})}),(0,u.jsx)(r.td,{children:`Section background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(r.td,{children:`Default text color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-secondary`})}),(0,u.jsx)(r.td,{children:`Content text and expanded header text`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-accent`})}),(0,u.jsx)(r.td,{children:`Hover and expanded header background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-secondary`})}),(0,u.jsx)(r.td,{children:`Active header background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-cga-amber`})}),(0,u.jsx)(r.td,{children:`Active state text color`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-cga-amber-glow`})}),(0,u.jsx)(r.td,{children:`Active state text-shadow glow`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(r.td,{children:`Focus outline ring`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-normal`})}),(0,u.jsx)(r.td,{children:`Expand animation and icon rotation (200ms)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--spacing-2`})}),(0,u.jsx)(r.td,{children:`Gap between sections in AccordionFill`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(r.td,{children:`DOS font family`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-family-fallback`})}),(0,u.jsx)(r.td,{children:`Fallback font family`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-size-text-md`})}),(0,u.jsx)(r.td,{children:`AccordionFill base font size`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Accordion`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};