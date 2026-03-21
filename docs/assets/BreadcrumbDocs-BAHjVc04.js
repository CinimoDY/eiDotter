import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as i}from"./index-D5dRogEL.js";import{M as t}from"./blocks-DG9eVJBI.js";import{C as d}from"./ComponentOrigin-DmRjH1iZ.js";import"./iframe-K6BYEX5l.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DisTUHiR.js";import"./index-DLTpzO1r.js";import"./registry-DlnQDLA5.js";function s(n){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Docs/Breadcrumb"}),`
`,e.jsx(r.h1,{id:"breadcrumb",children:"Breadcrumb"}),`
`,e.jsx(r.p,{children:"DOS-styled navigation trail with framework-agnostic link support."}),`
`,e.jsx(r.p,{children:`The Breadcrumb renders a hierarchical path showing the user's current location\r
within the application. It supports custom separators (including DOS-style backslash paths),\r
an optional back arrow, and pluggable link components for any router framework.`}),`
`,e.jsxs(r.blockquote,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Interactive demos"}),": See the ",e.jsx(r.a,{href:"/story/components-breadcrumb--default",children:"Breadcrumb stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(r.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(r.p,{children:"The Breadcrumb adapts to different navigation styles:"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Style"}),e.jsx(r.th,{children:"Separator"}),e.jsx(r.th,{children:"Back Arrow"}),e.jsx(r.th,{children:"Example"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.strong,{children:"Web Path"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"/"})}),e.jsx(r.td,{children:"Yes"}),e.jsxs(r.td,{children:["Home / Projects / ",e.jsx(r.strong,{children:"Eidotter"})]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.strong,{children:"DOS Path"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"\\"})}),e.jsx(r.td,{children:"No"}),e.jsxs(r.td,{children:["C: \\ DOS \\ ",e.jsx(r.strong,{children:"COMMAND.COM"})]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.strong,{children:"Custom"})}),e.jsx(r.td,{children:"Any string"}),e.jsx(r.td,{children:"Configurable"}),e.jsx(r.td,{children:"Any separator character"})]})]})]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`{/* Web-style navigation */}\r
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
`,e.jsx(r.h2,{id:"navigation-depth",children:"Navigation Depth"}),`
`,e.jsx(r.p,{children:"The Breadcrumb handles various depth levels:"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Depth"}),e.jsx(r.th,{children:"Trail Items"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Root only"}),e.jsx(r.td,{children:"0"}),e.jsx(r.td,{children:"Only the current label is shown, no trail"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Single level"}),e.jsx(r.td,{children:"1"}),e.jsx(r.td,{children:"One parent link plus current page"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Multi-level"}),e.jsx(r.td,{children:"2+"}),e.jsx(r.td,{children:"Full hierarchical path with separators"})]})]})]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`{/* Root only — no trail */}\r
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
`,e.jsx(r.h2,{id:"states",children:"States"}),`
`,e.jsx(r.h3,{id:"back-arrow",children:"Back Arrow"}),`
`,e.jsxs(r.p,{children:["When ",e.jsx(r.code,{children:"showBackArrow"})," is true (the default), a ",e.jsx(r.code,{children:"<"}),` character appears before the\r
last trail item, indicating the nearest parent for quick back-navigation.`]}),`
`,e.jsx(r.h3,{id:"link-hover",children:"Link Hover"}),`
`,e.jsx(r.p,{children:`Trail links transition from disabled text color to primary text color on hover,\r
animated over 150ms. The current page label always displays in primary text color\r
and is not a link.`}),`
`,e.jsx(r.h3,{id:"custom-link-component",children:"Custom Link Component"}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"linkComponent"}),` prop accepts any React component that renders an anchor-like element,\r
making it compatible with Next.js Link, React Router Link, or any custom routing solution.`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`import Link from 'next/link';\r
\r
<Breadcrumb\r
  trail={[{ href: '/', label: 'Home' }]}\r
  currentLabel="Page"\r
  linkComponent={Link}\r
/>
`})}),`
`,e.jsx(r.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Focus visible"}),": 2px solid outline with 2px offset using ",e.jsx(r.code,{children:"--color-semantic-border-focus"})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"High contrast"}),": Focus outline widens to 3px via ",e.jsx(r.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Reduced motion"}),": Link color transition disabled via ",e.jsx(r.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"ARIA"}),": ",e.jsx(r.code,{children:"<nav>"})," element has ",e.jsx(r.code,{children:'aria-label="Breadcrumb"'}),", current page ",e.jsx(r.code,{children:"<li>"})," has ",e.jsx(r.code,{children:'aria-current="page"'}),", separators and back arrow are ",e.jsx(r.code,{children:'aria-hidden="true"'})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Semantic HTML"}),": Uses ",e.jsx(r.code,{children:"<nav>"})," with an ",e.jsx(r.code,{children:"<ol>"})," list for proper document structure"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Keyboard"}),": All trail links are focusable with visible focus ring"]}),`
`]}),`
`,e.jsx(r.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsx(r.h3,{id:"breadcrumbprops",children:"BreadcrumbProps"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Default"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"trail"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"BreadcrumbItem[]"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"[]"})}),e.jsx(r.td,{children:"Array of breadcrumb trail items (links)"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"currentLabel"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:"—"}),e.jsx(r.td,{children:"Current page label (not a link)"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"showBackArrow"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"boolean"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"true"})}),e.jsxs(r.td,{children:["Show a ",e.jsx(r.code,{children:"<"})," arrow on the last trail item"]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"separator"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"'/'"})}),e.jsx(r.td,{children:"Separator character between trail items"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"linkComponent"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"React.ComponentType<{ href, className?, children }>"})}),e.jsx(r.td,{children:"—"}),e.jsx(r.td,{children:"Custom link component (e.g., Next.js Link)"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"className"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"''"})}),e.jsx(r.td,{children:"Additional CSS classes"})]})]})]}),`
`,e.jsx(r.h3,{id:"breadcrumbitem",children:"BreadcrumbItem"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Property"}),e.jsx(r.th,{children:"Type"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"href"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:"URL or path for the breadcrumb link"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"label"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"string"})}),e.jsx(r.td,{children:"Display text for the breadcrumb"})]})]})]}),`
`,e.jsx(r.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Token"}),e.jsx(r.th,{children:"Purpose"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-text-disabled"})}),e.jsx(r.td,{children:"Trail link color and separator color"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-text-primary"})}),e.jsx(r.td,{children:"Hover link color and current page color"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--color-semantic-border-focus"})}),e.jsx(r.td,{children:"Focus outline ring"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--typography-font-family-primary"})}),e.jsx(r.td,{children:"DOS font family"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--typography-font-family-fallback"})}),e.jsx(r.td,{children:"Fallback font family"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--typography-font-size-xs"})}),e.jsx(r.td,{children:"Base font size (mobile)"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"--typography-font-size-sm"})}),e.jsx(r.td,{children:"Font size at 768px+ breakpoint"})]})]})]}),`
`,e.jsx(r.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(d,{name:"Breadcrumb"})]})}function u(n={}){const{wrapper:r}={...i(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(s,{...n})}):s(n)}export{u as default};
