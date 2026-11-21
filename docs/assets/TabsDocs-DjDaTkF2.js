import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/Tabs`}),`
`,(0,u.jsx)(n.h1,{id:`tabs`,children:`Tabs`}),`
`,(0,u.jsx)(n.p,{children:`DOS-styled tab navigation with underline and pills variants for content switching.`}),`
`,(0,u.jsx)(n.p,{children:`The Tabs component has keyboard navigation, two visual variants, three sizes, and\r
controlled or uncontrolled modes. Labels are uppercase and gain a phosphor text-shadow\r
on hover.`}),`
`,(0,u.jsxs)(n.blockquote,{children:[`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(n.a,{href:`/story/components-tabs--default`,children:`Tabs stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`variants`,children:`Variants`}),`
`,(0,u.jsx)(n.p,{children:`Each variant maps to a different navigation context:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Variant`}),(0,u.jsx)(n.th,{children:`Style`}),(0,u.jsx)(n.th,{children:`Use Case`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Underline`})}),(0,u.jsx)(n.td,{children:`Bottom border indicator`}),(0,u.jsx)(n.td,{children:`Content switching, minimal UI`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Pills`})}),(0,u.jsx)(n.td,{children:`Contained background fill`}),(0,u.jsx)(n.td,{children:`App navigation, toolbar mode selection`})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Tabs tabs={tabs} variant="underline" />\r
<Tabs tabs={tabs} variant="pills" />
`})}),`
`,(0,u.jsx)(n.h2,{id:`sizes`,children:`Sizes`}),`
`,(0,u.jsx)(n.p,{children:`Three sizes following an 8px spacing grid:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Size`}),(0,u.jsx)(n.th,{children:`Font`}),(0,u.jsx)(n.th,{children:`Padding (Underline)`}),(0,u.jsx)(n.th,{children:`Padding (Pills)`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`small`})}),(0,u.jsx)(n.td,{children:`10px`}),(0,u.jsx)(n.td,{children:`4px 10px`}),(0,u.jsx)(n.td,{children:`4px 8px`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`medium`})}),(0,u.jsx)(n.td,{children:`12px`}),(0,u.jsx)(n.td,{children:`8px 16px`}),(0,u.jsx)(n.td,{children:`6px 12px`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`large`})}),(0,u.jsx)(n.td,{children:`14px`}),(0,u.jsx)(n.td,{children:`10px 20px`}),(0,u.jsx)(n.td,{children:`8px 16px`})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Tabs tabs={tabs} size="small" />\r
<Tabs tabs={tabs} size="medium" />\r
<Tabs tabs={tabs} size="large" />
`})}),`
`,(0,u.jsx)(n.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(n.h3,{id:`active-tab`,children:`Active tab`}),`
`,(0,u.jsx)(n.p,{children:`The active tab has full opacity. In underline variant, it gains a bottom border\r
in the accent color. In pills variant, it fills with the accent background and\r
switches to secondary (dark) text.`}),`
`,(0,u.jsx)(n.h3,{id:`inactive-tab`,children:`Inactive tab`}),`
`,(0,u.jsxs)(n.p,{children:[`Inactive tabs render at 0.7 opacity (tuned for WCAG AA 4.5:1 contrast ratio).\r
On hover, opacity returns to 1 and a `,(0,u.jsx)(n.code,{children:`text-shadow`}),` glow appears.`]}),`
`,(0,u.jsx)(n.h3,{id:`disabled-tab`,children:`Disabled tab`}),`
`,(0,u.jsxs)(n.p,{children:[`Disabled tabs render at 0.3 opacity with `,(0,u.jsx)(n.code,{children:`not-allowed`}),` cursor. They are skipped\r
during keyboard navigation and cannot be activated.`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Tabs tabs={[\r
  { id: 'active', label: 'Active' },\r
  { id: 'disabled', label: 'Disabled', disabled: true },\r
  { id: 'another', label: 'Another' },\r
]} />
`})}),`
`,(0,u.jsx)(n.h2,{id:`controlled-vs-uncontrolled`,children:`Controlled vs uncontrolled`}),`
`,(0,u.jsx)(n.h3,{id:`uncontrolled-default`,children:`Uncontrolled (default)`}),`
`,(0,u.jsxs)(n.p,{children:[`Use `,(0,u.jsx)(n.code,{children:`defaultActiveTab`}),` to set the initial tab. The component manages its own state:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Tabs\r
  tabs={tabs}\r
  defaultActiveTab="schedule"\r
  onTabChange={(tabId, previousTabId) => console.log(tabId, previousTabId)}\r
/>
`})}),`
`,(0,u.jsx)(n.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,u.jsxs)(n.p,{children:[`Pass `,(0,u.jsx)(n.code,{children:`activeTab`}),` and `,(0,u.jsx)(n.code,{children:`onTabChange`}),` to keep the state in the parent:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`const [activeTab, setActiveTab] = useState('schedule');\r
<Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
`})}),`
`,(0,u.jsx)(n.h2,{id:`tab-items`,children:`Tab items`}),`
`,(0,u.jsxs)(n.p,{children:[`Tabs are defined as an array of `,(0,u.jsx)(n.code,{children:`TabItem`}),` objects:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`interface TabItem {\r
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
`,(0,u.jsx)(n.h2,{id:`keyboard-navigation`,children:`Keyboard navigation`}),`
`,(0,u.jsx)(n.p,{children:`The Tabs component implements the WAI-ARIA Tabs pattern:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Key`}),(0,u.jsx)(n.th,{children:`Action`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`ArrowLeft`}),` / `,(0,u.jsx)(n.code,{children:`ArrowUp`})]}),(0,u.jsx)(n.td,{children:`Move to previous enabled tab`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`ArrowRight`}),` / `,(0,u.jsx)(n.code,{children:`ArrowDown`})]}),(0,u.jsx)(n.td,{children:`Move to next enabled tab`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`Home`})}),(0,u.jsx)(n.td,{children:`Move to first enabled tab`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`End`})}),(0,u.jsx)(n.td,{children:`Move to last enabled tab`})]})]})]}),`
`,(0,u.jsx)(n.p,{children:`Navigation wraps around: pressing ArrowRight on the last tab moves to the first.`}),`
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Role`}),`: `,(0,u.jsx)(n.code,{children:`tablist`}),` container with `,(0,u.jsx)(n.code,{children:`tab`}),` role on each button`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`ARIA selected`}),`: `,(0,u.jsx)(n.code,{children:`aria-selected`}),` reflects active state`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Tab index`}),`: Active tab is `,(0,u.jsx)(n.code,{children:`tabIndex={0}`}),`, inactive tabs are `,(0,u.jsx)(n.code,{children:`tabIndex={-1}`}),` (roving tabindex)`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Focus visible`}),`: 2px solid outline with 2px offset, using `,(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`High contrast`}),`: Underline border widens to 3px, pills container border widens to 2px via `,(0,u.jsx)(n.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Reduced motion`}),`: All transitions disabled via `,(0,u.jsx)(n.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`ARIA label`}),`: Supports `,(0,u.jsx)(n.code,{children:`aria-label`}),` on the tab list for context (e.g., "Main navigation")`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`tabs`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`TabItem[]`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Array of tab items to display (required)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`variant`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'underline' | 'pills'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'underline'`})}),(0,u.jsx)(n.td,{children:`Visual style of the tabs`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`size`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'small' | 'medium' | 'large'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'medium'`})}),(0,u.jsx)(n.td,{children:`Tab dimensions`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`activeTab`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Controlled active tab ID`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`defaultActiveTab`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Initial active tab ID (uncontrolled)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onTabChange`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`(tabId: string, previousTabId: string) => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Callback when active tab changes`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`''`})}),(0,u.jsx)(n.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`aria-label`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Accessible label for the tab list`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Token`}),(0,u.jsx)(n.th,{children:`Purpose`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(n.td,{children:`Inactive tab text`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-accent`})}),(0,u.jsx)(n.td,{children:`Active underline tab text and border`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-on-accent`})}),(0,u.jsx)(n.td,{children:`Active pills tab text (dark on amber)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-background-secondary`})}),(0,u.jsx)(n.td,{children:`Pills container background`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-background-accent`})}),(0,u.jsx)(n.td,{children:`Active pills tab fill`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-background-primary`})}),(0,u.jsx)(n.td,{children:`Pills tab hover background`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(n.td,{children:`Underline hover border, pills container border`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(n.td,{children:`Focus outline`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(n.td,{children:`DOS font family`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-weight-regular`})}),(0,u.jsx)(n.td,{children:`Tab label weight`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--duration-fast`})}),(0,u.jsx)(n.td,{children:`Transition speed (100ms)`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Tabs`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};