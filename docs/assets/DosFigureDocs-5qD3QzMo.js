import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/DosFigure`}),`
`,(0,u.jsx)(r.h1,{id:`dosfigure`,children:`DosFigure`}),`
`,(0,u.jsxs)(r.p,{children:[`Demoscene-style placeholder for media. The eidotter aesthetic rejects stock
photography; `,(0,u.jsx)(r.code,{children:`DosFigure`}),` is the substitute — a painted-screen frame with
amber chrome, scanline sweep, optional annotation pins, and a resolution tag.`]}),`
`,(0,u.jsx)(r.p,{children:`Use as:`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsx)(r.li,{children:`A lead-in at the top of a blog article`}),`
`,(0,u.jsx)(r.li,{children:`A hero image substitute on product / project pages`}),`
`,(0,u.jsx)(r.li,{children:`A figure for technical diagrams in amber-phosphor single tone`}),`
`,(0,u.jsx)(r.li,{children:`An intentional placeholder when a real image isn't yet available`}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`usage`,children:`Usage`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`import { DosFigure } from 'eidotter';

<DosFigure
  title="SCREEN.014"
  resolution="640×480"
  subject={<AmberWordmark />}
  caption="Amber wordmark painted on a 4:3 CRT canvas."
  aria-label="Eidotter wordmark in ASCII amber phosphor."
/>
`})}),`
`,(0,u.jsx)(r.h3,{id:`with-pins`,children:`With pins`}),`
`,(0,u.jsx)(r.p,{children:`Pins are plain data; positions are percentages. Render them whenever the
subject benefits from inline annotations.`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<DosFigure
  subject={<PlanetSvg />}
  aria-label="Annotated planet study."
  pins={[
    { x: 50, y: 56, label: 'ATMOSPHERE' },
    { x: 78, y: 34, label: 'STAR' },
  ]}
/>
`})}),`
`,(0,u.jsx)(r.h2,{id:`animation`,children:`Animation`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Scanline sweep`}),` — a single 2px bar translates top→bottom on a 6s cycle`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Phosphor flicker`}),` — subtle brightness wobble at ~0.03 amplitude, 7.3s`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Pin pulse`}),` — pin dots pulse a box-shadow at 2s intervals`]}),`
`,(0,u.jsxs)(r.li,{children:[`All three disabled together via `,(0,u.jsx)(r.code,{children:`animated={false}`})]}),`
`,(0,u.jsxs)(r.li,{children:[`All three neutralised under `,(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.code,{children:`prefers-contrast: more`}),` removes the scanline entirely and drops glow
from pins and subject text`]}),`
`]}),`
`,(0,u.jsxs)(r.p,{children:[`Animations are compositor-only (`,(0,u.jsx)(r.code,{children:`transform`}),` and `,(0,u.jsx)(r.code,{children:`opacity`}),`). No layout is
animated.`]}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[`Root element is `,(0,u.jsx)(r.code,{children:`<figure role="img">`})]}),`
`,(0,u.jsxs)(r.li,{children:[`Pass `,(0,u.jsx)(r.code,{children:`aria-label`}),` to describe the subject`]}),`
`,(0,u.jsxs)(r.li,{children:[`When `,(0,u.jsx)(r.code,{children:`caption`}),` is provided, it is rendered as `,(0,u.jsx)(r.code,{children:`<figcaption>`}),` and wired
via `,(0,u.jsx)(r.code,{children:`aria-describedby`})]}),`
`,(0,u.jsxs)(r.li,{children:[`Pins are purely presentational — their dots are `,(0,u.jsx)(r.code,{children:`aria-hidden="true"`}),`;
the labels are plain text`]}),`
`,(0,u.jsxs)(r.li,{children:[`If the subject is meaningfully interactive (e.g. an SVG link), handle
that inside `,(0,u.jsx)(r.code,{children:`subject`}),` — DosFigure does not intercept focus or pointer
events on its content`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`subject`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ReactNode`})}),(0,u.jsx)(r.td,{children:`— (required)`}),(0,u.jsx)(r.td,{children:`The painted-screen content`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`title`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Top chrome label (uppercase recommended)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`resolution`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsxs)(r.td,{children:[`Bottom-right tag, e.g. `,(0,u.jsx)(r.code,{children:`"640×480"`})]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`caption`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ReactNode`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsxs)(r.td,{children:[`Rendered as `,(0,u.jsx)(r.code,{children:`<figcaption>`}),` beneath the frame`]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`pins`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`DosFigurePin[]`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`[]`})}),(0,u.jsxs)(r.td,{children:[`Annotation pins with `,(0,u.jsx)(r.code,{children:`{x, y, label}`})]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`animated`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsx)(r.td,{children:`Enables scanline sweep, flicker, pin pulse`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`aria-label`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Accessible label for the figure`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsxs)(r.td,{children:[`Extra classes merged onto the `,(0,u.jsx)(r.code,{children:`<figure>`})]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ref`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`Ref<HTMLElement>`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsxs)(r.td,{children:[`Forwarded to the `,(0,u.jsx)(r.code,{children:`<figure>`})]})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`DosFigure`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};