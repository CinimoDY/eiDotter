import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/Tabs`}),`
`,(0,u.jsx)(r.h1,{id:`tabs`,children:`Tabs`}),`
`,(0,u.jsx)(r.p,{children:`DOS-styled tab navigation with underline and pills variants for content switching.`}),`
`,(0,u.jsx)(r.p,{children:`The Tabs component provides keyboard-navigable tab selection with two visual variants,\r
three sizes, and support for both controlled and uncontrolled modes. Tabs use uppercase\r
CGA-authentic labels with phosphor text-shadow effects on hover.`}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-tabs--default`,children:`Tabs stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`variants`,children:`Variants`}),`
`,(0,u.jsx)(r.p,{children:`Each variant maps to a different navigation context:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Variant`}),(0,u.jsx)(r.th,{children:`Style`}),(0,u.jsx)(r.th,{children:`Use Case`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Underline`})}),(0,u.jsx)(r.td,{children:`Bottom border indicator`}),(0,u.jsx)(r.td,{children:`Content switching, minimal UI`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Pills`})}),(0,u.jsx)(r.td,{children:`Contained background fill`}),(0,u.jsx)(r.td,{children:`App navigation, toolbar mode selection`})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Tabs tabs={tabs} variant="underline" />\r
<Tabs tabs={tabs} variant="pills" />
`})}),`
`,(0,u.jsx)(r.h2,{id:`sizes`,children:`Sizes`}),`
`,(0,u.jsx)(r.p,{children:`Three sizes following an 8px spacing grid:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Size`}),(0,u.jsx)(r.th,{children:`Font`}),(0,u.jsx)(r.th,{children:`Padding (Underline)`}),(0,u.jsx)(r.th,{children:`Padding (Pills)`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`small`})}),(0,u.jsx)(r.td,{children:`10px`}),(0,u.jsx)(r.td,{children:`4px 10px`}),(0,u.jsx)(r.td,{children:`4px 8px`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`medium`})}),(0,u.jsx)(r.td,{children:`12px`}),(0,u.jsx)(r.td,{children:`8px 16px`}),(0,u.jsx)(r.td,{children:`6px 12px`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`large`})}),(0,u.jsx)(r.td,{children:`14px`}),(0,u.jsx)(r.td,{children:`10px 20px`}),(0,u.jsx)(r.td,{children:`8px 16px`})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Tabs tabs={tabs} size="small" />\r
<Tabs tabs={tabs} size="medium" />\r
<Tabs tabs={tabs} size="large" />
`})}),`
`,(0,u.jsx)(r.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(r.h3,{id:`active-tab`,children:`Active Tab`}),`
`,(0,u.jsx)(r.p,{children:`The active tab has full opacity. In underline variant, it gains a bottom border\r
in the accent color. In pills variant, it fills with the accent background and\r
switches to secondary (dark) text.`}),`
`,(0,u.jsx)(r.h3,{id:`inactive-tab`,children:`Inactive Tab`}),`
`,(0,u.jsxs)(r.p,{children:[`Inactive tabs render at 0.7 opacity (tuned for WCAG AA 4.5:1 contrast ratio).\r
On hover, opacity returns to 1 and a subtle `,(0,u.jsx)(r.code,{children:`text-shadow`}),` glow appears.`]}),`
`,(0,u.jsx)(r.h3,{id:`disabled-tab`,children:`Disabled Tab`}),`
`,(0,u.jsxs)(r.p,{children:[`Disabled tabs render at 0.3 opacity with `,(0,u.jsx)(r.code,{children:`not-allowed`}),` cursor. They are skipped\r
during keyboard navigation and cannot be activated.`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Tabs tabs={[\r
  { id: 'active', label: 'Active' },\r
  { id: 'disabled', label: 'Disabled', disabled: true },\r
  { id: 'another', label: 'Another' },\r
]} />
`})}),`
`,(0,u.jsx)(r.h2,{id:`controlled-vs-uncontrolled`,children:`Controlled vs Uncontrolled`}),`
`,(0,u.jsx)(r.h3,{id:`uncontrolled-default`,children:`Uncontrolled (default)`}),`
`,(0,u.jsxs)(r.p,{children:[`Use `,(0,u.jsx)(r.code,{children:`defaultActiveTab`}),` to set the initial tab. The component manages its own state:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Tabs\r
  tabs={tabs}\r
  defaultActiveTab="schedule"\r
  onTabChange={(tabId, previousTabId) => console.log(tabId, previousTabId)}\r
/>
`})}),`
`,(0,u.jsx)(r.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,u.jsxs)(r.p,{children:[`Pass `,(0,u.jsx)(r.code,{children:`activeTab`}),` and `,(0,u.jsx)(r.code,{children:`onTabChange`}),` for full external control:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`const [activeTab, setActiveTab] = useState('schedule');\r
<Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
`})}),`
`,(0,u.jsx)(r.h2,{id:`tab-items`,children:`Tab Items`}),`
`,(0,u.jsxs)(r.p,{children:[`Tabs are defined as an array of `,(0,u.jsx)(r.code,{children:`TabItem`}),` objects:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`interface TabItem {\r
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
`,(0,u.jsx)(r.h2,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,u.jsx)(r.p,{children:`The Tabs component implements the WAI-ARIA Tabs pattern:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Key`}),(0,u.jsx)(r.th,{children:`Action`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsxs)(r.td,{children:[(0,u.jsx)(r.code,{children:`ArrowLeft`}),` / `,(0,u.jsx)(r.code,{children:`ArrowUp`})]}),(0,u.jsx)(r.td,{children:`Move to previous enabled tab`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsxs)(r.td,{children:[(0,u.jsx)(r.code,{children:`ArrowRight`}),` / `,(0,u.jsx)(r.code,{children:`ArrowDown`})]}),(0,u.jsx)(r.td,{children:`Move to next enabled tab`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`Home`})}),(0,u.jsx)(r.td,{children:`Move to first enabled tab`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`End`})}),(0,u.jsx)(r.td,{children:`Move to last enabled tab`})]})]})]}),`
`,(0,u.jsx)(r.p,{children:`Navigation wraps around: pressing ArrowRight on the last tab moves to the first.`}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Role`}),`: `,(0,u.jsx)(r.code,{children:`tablist`}),` container with `,(0,u.jsx)(r.code,{children:`tab`}),` role on each button`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`ARIA selected`}),`: `,(0,u.jsx)(r.code,{children:`aria-selected`}),` reflects active state`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Tab index`}),`: Active tab is `,(0,u.jsx)(r.code,{children:`tabIndex={0}`}),`, inactive tabs are `,(0,u.jsx)(r.code,{children:`tabIndex={-1}`}),` (roving tabindex)`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Focus visible`}),`: 2px solid outline with 2px offset, using `,(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`High contrast`}),`: Underline border widens to 3px, pills container border widens to 2px via `,(0,u.jsx)(r.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Reduced motion`}),`: All transitions disabled via `,(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`ARIA label`}),`: Supports `,(0,u.jsx)(r.code,{children:`aria-label`}),` on the tab list for context (e.g., "Main navigation")`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`tabs`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`TabItem[]`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Array of tab items to display (required)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`variant`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'underline' | 'pills'`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'underline'`})}),(0,u.jsx)(r.td,{children:`Visual style of the tabs`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`size`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'small' | 'medium' | 'large'`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'medium'`})}),(0,u.jsx)(r.td,{children:`Tab dimensions`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`activeTab`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Controlled active tab ID`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`defaultActiveTab`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Initial active tab ID (uncontrolled)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onTabChange`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`(tabId: string, previousTabId: string) => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Callback when active tab changes`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`''`})}),(0,u.jsx)(r.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`aria-label`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Accessible label for the tab list`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`design-tokens-used`,children:`Design Tokens Used`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Token`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(r.td,{children:`Inactive tab text`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-accent`})}),(0,u.jsx)(r.td,{children:`Active underline tab text and border`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-secondary`})}),(0,u.jsx)(r.td,{children:`Active pills tab text (dark on amber)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-secondary`})}),(0,u.jsx)(r.td,{children:`Pills container background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-accent`})}),(0,u.jsx)(r.td,{children:`Active pills tab fill`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-primary`})}),(0,u.jsx)(r.td,{children:`Pills tab hover background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(r.td,{children:`Underline hover border, pills container border`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(r.td,{children:`Focus outline`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(r.td,{children:`DOS font family`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--typography-font-weight-regular`})}),(0,u.jsx)(r.td,{children:`Tab label weight`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-fast`})}),(0,u.jsx)(r.td,{children:`Transition speed (100ms)`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Tabs`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};