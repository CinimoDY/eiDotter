import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as r}from"./index-A5i_d8DH.js";import{M as i}from"./blocks-CEv_ibp8.js";import{C as t}from"./ComponentOrigin-BYbNiDCa.js";import"./iframe-BHAUrTqb.js";import"./preload-helper-Dp1pzeXC.js";import"./index-6rWdytjH.js";import"./index-uf7ifz4K.js";import"./registry-BH4hA_P8.js";function d(s){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Tabs"}),`
`,e.jsx(n.h1,{id:"tabs",children:"Tabs"}),`
`,e.jsx(n.p,{children:"DOS-styled tab navigation with underline and pills variants for content switching."}),`
`,e.jsx(n.p,{children:`The Tabs component provides keyboard-navigable tab selection with two visual variants,\r
three sizes, and support for both controlled and uncontrolled modes. Tabs use uppercase\r
CGA-authentic labels with phosphor text-shadow effects on hover.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Interactive demos"}),": See the ",e.jsx(n.a,{href:"/story/components-tabs--default",children:"Tabs stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(n.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(n.p,{children:"Each variant maps to a different navigation context:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Variant"}),e.jsx(n.th,{children:"Style"}),e.jsx(n.th,{children:"Use Case"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Underline"})}),e.jsx(n.td,{children:"Bottom border indicator"}),e.jsx(n.td,{children:"Content switching, minimal UI"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Pills"})}),e.jsx(n.td,{children:"Contained background fill"}),e.jsx(n.td,{children:"App navigation, toolbar mode selection"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Tabs tabs={tabs} variant="underline" />\r
<Tabs tabs={tabs} variant="pills" />
`})}),`
`,e.jsx(n.h2,{id:"sizes",children:"Sizes"}),`
`,e.jsx(n.p,{children:"Three sizes following an 8px spacing grid:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Size"}),e.jsx(n.th,{children:"Font"}),e.jsx(n.th,{children:"Padding (Underline)"}),e.jsx(n.th,{children:"Padding (Pills)"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"small"})}),e.jsx(n.td,{children:"10px"}),e.jsx(n.td,{children:"4px 10px"}),e.jsx(n.td,{children:"4px 8px"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"medium"})}),e.jsx(n.td,{children:"12px"}),e.jsx(n.td,{children:"8px 16px"}),e.jsx(n.td,{children:"6px 12px"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"large"})}),e.jsx(n.td,{children:"14px"}),e.jsx(n.td,{children:"10px 20px"}),e.jsx(n.td,{children:"8px 16px"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Tabs tabs={tabs} size="small" />\r
<Tabs tabs={tabs} size="medium" />\r
<Tabs tabs={tabs} size="large" />
`})}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(n.h3,{id:"active-tab",children:"Active Tab"}),`
`,e.jsx(n.p,{children:`The active tab has full opacity. In underline variant, it gains a bottom border\r
in the accent color. In pills variant, it fills with the accent background and\r
switches to secondary (dark) text.`}),`
`,e.jsx(n.h3,{id:"inactive-tab",children:"Inactive Tab"}),`
`,e.jsxs(n.p,{children:[`Inactive tabs render at 0.7 opacity (tuned for WCAG AA 4.5:1 contrast ratio).\r
On hover, opacity returns to 1 and a subtle `,e.jsx(n.code,{children:"text-shadow"})," glow appears."]}),`
`,e.jsx(n.h3,{id:"disabled-tab",children:"Disabled Tab"}),`
`,e.jsxs(n.p,{children:["Disabled tabs render at 0.3 opacity with ",e.jsx(n.code,{children:"not-allowed"}),` cursor. They are skipped\r
during keyboard navigation and cannot be activated.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Tabs tabs={[\r
  { id: 'active', label: 'Active' },\r
  { id: 'disabled', label: 'Disabled', disabled: true },\r
  { id: 'another', label: 'Another' },\r
]} />
`})}),`
`,e.jsx(n.h2,{id:"controlled-vs-uncontrolled",children:"Controlled vs Uncontrolled"}),`
`,e.jsx(n.h3,{id:"uncontrolled-default",children:"Uncontrolled (default)"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"defaultActiveTab"})," to set the initial tab. The component manages its own state:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Tabs\r
  tabs={tabs}\r
  defaultActiveTab="schedule"\r
  onTabChange={(tabId, previousTabId) => console.log(tabId, previousTabId)}\r
/>
`})}),`
`,e.jsx(n.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(n.p,{children:["Pass ",e.jsx(n.code,{children:"activeTab"})," and ",e.jsx(n.code,{children:"onTabChange"})," for full external control:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`const [activeTab, setActiveTab] = useState('schedule');\r
<Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
`})}),`
`,e.jsx(n.h2,{id:"tab-items",children:"Tab Items"}),`
`,e.jsxs(n.p,{children:["Tabs are defined as an array of ",e.jsx(n.code,{children:"TabItem"})," objects:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`interface TabItem {\r
  id: string;       // Unique identifier\r
  label: string;    // Display label\r
  disabled?: boolean; // Whether the tab is disabled\r
}\r
\r
const tabs = [\r
  { id: 'schedule', label: 'Schedule' },\r
  { id: 'ai', label: 'AI Console' },\r
  { id: 'calendars', label: 'Calendars' },\r
];
`})}),`
`,e.jsx(n.h2,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsx(n.p,{children:"The Tabs component implements the WAI-ARIA Tabs pattern:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Key"}),e.jsx(n.th,{children:"Action"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.code,{children:"ArrowLeft"})," / ",e.jsx(n.code,{children:"ArrowUp"})]}),e.jsx(n.td,{children:"Move to previous enabled tab"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.code,{children:"ArrowRight"})," / ",e.jsx(n.code,{children:"ArrowDown"})]}),e.jsx(n.td,{children:"Move to next enabled tab"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Home"})}),e.jsx(n.td,{children:"Move to first enabled tab"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"End"})}),e.jsx(n.td,{children:"Move to last enabled tab"})]})]})]}),`
`,e.jsx(n.p,{children:"Navigation wraps around: pressing ArrowRight on the last tab moves to the first."}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Role"}),": ",e.jsx(n.code,{children:"tablist"})," container with ",e.jsx(n.code,{children:"tab"})," role on each button"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA selected"}),": ",e.jsx(n.code,{children:"aria-selected"})," reflects active state"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tab index"}),": Active tab is ",e.jsx(n.code,{children:"tabIndex={0}"}),", inactive tabs are ",e.jsx(n.code,{children:"tabIndex={-1}"})," (roving tabindex)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus visible"}),": 2px solid outline with 2px offset, using ",e.jsx(n.code,{children:"--color-semantic-border-focus"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"High contrast"}),": Underline border widens to 3px, pills container border widens to 2px via ",e.jsx(n.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Reduced motion"}),": All transitions disabled via ",e.jsx(n.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA label"}),": Supports ",e.jsx(n.code,{children:"aria-label"}),' on the tab list for context (e.g., "Main navigation")']}),`
`]}),`
`,e.jsx(n.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"tabs"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"TabItem[]"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Array of tab items to display (required)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"variant"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'underline' | 'pills'"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'underline'"})}),e.jsx(n.td,{children:"Visual style of the tabs"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"size"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'small' | 'medium' | 'large'"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'medium'"})}),e.jsx(n.td,{children:"Tab dimensions"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"activeTab"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Controlled active tab ID"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"defaultActiveTab"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Initial active tab ID (uncontrolled)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onTabChange"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"(tabId: string, previousTabId: string) => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Callback when active tab changes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"className"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"''"})}),e.jsx(n.td,{children:"Additional CSS classes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"aria-label"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Accessible label for the tab list"})]})]})]}),`
`,e.jsx(n.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Token"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-primary"})}),e.jsx(n.td,{children:"Inactive tab text"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-accent"})}),e.jsx(n.td,{children:"Active underline tab text and border"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-secondary"})}),e.jsx(n.td,{children:"Active pills tab text (dark on amber)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-background-secondary"})}),e.jsx(n.td,{children:"Pills container background"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-background-accent"})}),e.jsx(n.td,{children:"Active pills tab fill"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-background-primary"})}),e.jsx(n.td,{children:"Pills tab hover background"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-border-default"})}),e.jsx(n.td,{children:"Underline hover border, pills container border"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-border-focus"})}),e.jsx(n.td,{children:"Focus outline"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--typography-font-family-primary"})}),e.jsx(n.td,{children:"DOS font family"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--typography-font-weight-regular"})}),e.jsx(n.td,{children:"Tab label weight"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--duration-fast"})}),e.jsx(n.td,{children:"Transition speed (100ms)"})]})]})]}),`
`,e.jsx(n.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(t,{name:"Tabs"})]})}function u(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(d,{...s})}):d(s)}export{u as default};
