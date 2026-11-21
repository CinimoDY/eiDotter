import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/Breadcrumb`}),`
`,(0,u.jsx)(n.h1,{id:`breadcrumb`,children:`Breadcrumb`}),`
`,(0,u.jsx)(n.p,{children:`DOS-styled navigation trail with framework-agnostic link support.`}),`
`,(0,u.jsx)(n.p,{children:`The Breadcrumb renders a hierarchical path showing the user's current location\r
within the application. It supports custom separators (including DOS-style backslash paths),\r
an optional back arrow, and pluggable link components for any router framework.`}),`
`,(0,u.jsxs)(n.blockquote,{children:[`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(n.a,{href:`/story/components-breadcrumb--default`,children:`Breadcrumb stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`variants`,children:`Variants`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Style`}),(0,u.jsx)(n.th,{children:`Separator`}),(0,u.jsx)(n.th,{children:`Back Arrow`}),(0,u.jsx)(n.th,{children:`Example`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Web Path`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`/`})}),(0,u.jsx)(n.td,{children:`Yes`}),(0,u.jsxs)(n.td,{children:[`Home / Projects / `,(0,u.jsx)(n.strong,{children:`Eidotter`})]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`DOS Path`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`\\`})}),(0,u.jsx)(n.td,{children:`No`}),(0,u.jsxs)(n.td,{children:[`C: \\ DOS \\ `,(0,u.jsx)(n.strong,{children:`COMMAND.COM`})]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Custom`})}),(0,u.jsx)(n.td,{children:`Any string`}),(0,u.jsx)(n.td,{children:`Configurable`}),(0,u.jsx)(n.td,{children:`Any separator character`})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`{/* Web-style navigation */}\r
<Breadcrumb\r
  trail={[\r
    { href: '/', label: 'Home' },\r
    { href: '/projects', label: 'Projects' },\r
  ]}\r
  currentLabel="Eidotter"\r
/>\r
\r
{/* DOS-style path */}\r
<Breadcrumb\r
  trail={[\r
    { href: '/', label: 'C:' },\r
    { href: '/dos', label: 'DOS' },\r
  ]}\r
  currentLabel="COMMAND.COM"\r
  separator="\\"\r
  showBackArrow={false}\r
/>
`})}),`
`,(0,u.jsx)(n.h2,{id:`navigation-depth`,children:`Navigation depth`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Depth`}),(0,u.jsx)(n.th,{children:`Trail Items`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Root only`}),(0,u.jsx)(n.td,{children:`0`}),(0,u.jsx)(n.td,{children:`Only the current label is shown, no trail`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Single level`}),(0,u.jsx)(n.td,{children:`1`}),(0,u.jsx)(n.td,{children:`One parent link plus current page`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Multi-level`}),(0,u.jsx)(n.td,{children:`2+`}),(0,u.jsx)(n.td,{children:`Full hierarchical path with separators`})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`{/* Root only — no trail */}\r
<Breadcrumb trail={[]} currentLabel="Home" />\r
\r
{/* Single level */}\r
<Breadcrumb\r
  trail={[{ href: '/', label: 'Home' }]}\r
  currentLabel="About"\r
/>\r
\r
{/* Deep navigation */}\r
<Breadcrumb\r
  trail={[\r
    { href: '/', label: 'Home' },\r
    { href: '/projects', label: 'Projects' },\r
    { href: '/projects/design-systems', label: 'Design Systems' },\r
  ]}\r
  currentLabel="Eidotter"\r
/>
`})}),`
`,(0,u.jsx)(n.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(n.h3,{id:`back-arrow`,children:`Back arrow`}),`
`,(0,u.jsxs)(n.p,{children:[`When `,(0,u.jsx)(n.code,{children:`showBackArrow`}),` is true (the default), a `,(0,u.jsx)(n.code,{children:`<`}),` character appears before the\r
last trail item, indicating the nearest parent for quick back-navigation.`]}),`
`,(0,u.jsx)(n.h3,{id:`link-hover`,children:`Link hover`}),`
`,(0,u.jsx)(n.p,{children:`Trail links transition from disabled text color to primary text color on hover,\r
animated over 150ms. The current page label always displays in primary text color\r
and is not a link.`}),`
`,(0,u.jsx)(n.h3,{id:`custom-link-component`,children:`Custom link component`}),`
`,(0,u.jsxs)(n.p,{children:[`The `,(0,u.jsx)(n.code,{children:`linkComponent`}),` prop accepts any React component that renders an anchor-like element.\r
Next.js Link, React Router Link, and custom router links all work.`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`import Link from 'next/link';\r
\r
<Breadcrumb\r
  trail={[{ href: '/', label: 'Home' }]}\r
  currentLabel="Page"\r
  linkComponent={Link}\r
/>
`})}),`
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Focus visible`}),`: 2px solid outline with 2px offset using `,(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`High contrast`}),`: Focus outline widens to 3px via `,(0,u.jsx)(n.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Reduced motion`}),`: Link color transition disabled via `,(0,u.jsx)(n.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`ARIA`}),`: `,(0,u.jsx)(n.code,{children:`<nav>`}),` element has `,(0,u.jsx)(n.code,{children:`aria-label="Breadcrumb"`}),`, current page `,(0,u.jsx)(n.code,{children:`<li>`}),` has `,(0,u.jsx)(n.code,{children:`aria-current="page"`}),`, separators and back arrow are `,(0,u.jsx)(n.code,{children:`aria-hidden="true"`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Semantic HTML`}),`: Uses `,(0,u.jsx)(n.code,{children:`<nav>`}),` with an `,(0,u.jsx)(n.code,{children:`<ol>`}),` list`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Keyboard`}),`: All trail links are focusable with visible focus ring`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsx)(n.h3,{id:`breadcrumbprops`,children:`BreadcrumbProps`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`trail`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`BreadcrumbItem[]`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`[]`})}),(0,u.jsx)(n.td,{children:`Array of breadcrumb trail items (links)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`currentLabel`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Current page label (not a link)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`showBackArrow`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`true`})}),(0,u.jsxs)(n.td,{children:[`Show a `,(0,u.jsx)(n.code,{children:`<`}),` arrow on the last trail item`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`separator`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'/'`})}),(0,u.jsx)(n.td,{children:`Separator character between trail items`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`linkComponent`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`React.ComponentType<{ href, className?, children }>`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Custom link component (e.g., Next.js Link)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`''`})}),(0,u.jsx)(n.td,{children:`Additional CSS classes`})]})]})]}),`
`,(0,u.jsx)(n.h3,{id:`breadcrumbitem`,children:`BreadcrumbItem`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Property`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`href`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`URL or path for the breadcrumb link`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`label`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`Display text for the breadcrumb`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Token`}),(0,u.jsx)(n.th,{children:`Purpose`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-disabled`})}),(0,u.jsx)(n.td,{children:`Trail link color and separator color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-primary`})}),(0,u.jsx)(n.td,{children:`Hover link color and current page color`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(n.td,{children:`Focus outline ring`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-family-primary`})}),(0,u.jsx)(n.td,{children:`DOS font family`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-family-fallback`})}),(0,u.jsx)(n.td,{children:`Fallback font family`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-size-text-xs`})}),(0,u.jsx)(n.td,{children:`Base font size (mobile)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--typography-font-size-text-sm`})}),(0,u.jsx)(n.td,{children:`Font size at 768px+ breakpoint`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Breadcrumb`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};