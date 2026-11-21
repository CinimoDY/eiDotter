import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/DosFigure`}),`
`,(0,u.jsx)(n.h1,{id:`dosfigure`,children:`DosFigure`}),`
`,(0,u.jsxs)(n.p,{children:[`Demoscene-style placeholder for media. eidotter does not use stock
photography, and `,(0,u.jsx)(n.code,{children:`DosFigure`}),` takes its place. It is a painted-screen frame
with the DosWindow chrome (dark title strip with `,(0,u.jsx)(n.code,{children:`▸`}),` marker, brand border,
drop shadow), a scanline sweep, optional annotation pins, and a resolution tag.`]}),`
`,(0,u.jsx)(n.p,{children:`Use as:`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsx)(n.li,{children:`A lead-in at the top of a blog article`}),`
`,(0,u.jsx)(n.li,{children:`A hero image substitute on product / project pages`}),`
`,(0,u.jsx)(n.li,{children:`A figure for technical diagrams in amber-phosphor single tone`}),`
`,(0,u.jsx)(n.li,{children:`An intentional placeholder when a real image isn't yet available`}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`import { DosFigure } from 'eidotter';

<DosFigure
  title="SCREEN.014"
  resolution="640×480"
  subject={<AmberWordmark />}
  caption="Amber wordmark painted on a 4:3 CRT canvas."
  aria-label="Eidotter wordmark in ASCII amber phosphor."
/>
`})}),`
`,(0,u.jsx)(n.h3,{id:`with-pins`,children:`With pins`}),`
`,(0,u.jsx)(n.p,{children:`Pins are plain data, and positions are percentages. Add them when the
subject needs inline annotations.`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<DosFigure
  subject={<PlanetSvg />}
  aria-label="Annotated planet study."
  pins={[
    { x: 50, y: 56, label: 'ATMOSPHERE' },
    { x: 78, y: 34, label: 'STAR' },
  ]}
/>
`})}),`
`,(0,u.jsx)(n.h2,{id:`animation`,children:`Animation`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Scanline sweep`}),`: a single 2px bar translates top→bottom on a 6s cycle`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Phosphor flicker`}),`: brightness wobble at ~0.03 amplitude, 7.3s`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Pin pulse`}),`: pin dots pulse a box-shadow at 2s intervals`]}),`
`,(0,u.jsxs)(n.li,{children:[`All three disabled together via `,(0,u.jsx)(n.code,{children:`animated={false}`})]}),`
`,(0,u.jsxs)(n.li,{children:[`All three neutralised under `,(0,u.jsx)(n.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.code,{children:`prefers-contrast: more`}),` removes the scanline entirely and drops glow
from pins and subject text`]}),`
`]}),`
`,(0,u.jsxs)(n.p,{children:[`Animations are compositor-only (`,(0,u.jsx)(n.code,{children:`transform`}),` and `,(0,u.jsx)(n.code,{children:`opacity`}),`). No layout is
animated.`]}),`
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[`Root element is `,(0,u.jsx)(n.code,{children:`<figure role="img">`})]}),`
`,(0,u.jsxs)(n.li,{children:[`Pass `,(0,u.jsx)(n.code,{children:`aria-label`}),` to describe the subject`]}),`
`,(0,u.jsxs)(n.li,{children:[`When `,(0,u.jsx)(n.code,{children:`caption`}),` is provided, it is rendered as `,(0,u.jsx)(n.code,{children:`<figcaption>`}),` and wired
via `,(0,u.jsx)(n.code,{children:`aria-describedby`})]}),`
`,(0,u.jsxs)(n.li,{children:[`Pins are presentational. Their dots are `,(0,u.jsx)(n.code,{children:`aria-hidden="true"`}),` and the
labels are plain text`]}),`
`,(0,u.jsxs)(n.li,{children:[`If the subject is interactive (e.g. an SVG link), handle that inside
`,(0,u.jsx)(n.code,{children:`subject`}),`. DosFigure does not intercept focus or pointer events on its
content`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`subject`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`ReactNode`})}),(0,u.jsx)(n.td,{children:`— (required)`}),(0,u.jsx)(n.td,{children:`The painted-screen content`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`title`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Window strip title (rendered uppercase); omit for no strip`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`resolution`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsxs)(n.td,{children:[`Bottom-right tag, e.g. `,(0,u.jsx)(n.code,{children:`"640×480"`})]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`caption`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`ReactNode`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsxs)(n.td,{children:[`Rendered as `,(0,u.jsx)(n.code,{children:`<figcaption>`}),` beneath the frame`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`pins`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`DosFigurePin[]`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`[]`})}),(0,u.jsxs)(n.td,{children:[`Annotation pins with `,(0,u.jsx)(n.code,{children:`{x, y, label}`})]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`animated`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`true`})}),(0,u.jsx)(n.td,{children:`Enables scanline sweep, flicker, pin pulse`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`aria-label`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Accessible label for the figure`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsxs)(n.td,{children:[`Extra classes merged onto the `,(0,u.jsx)(n.code,{children:`<figure>`})]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`ref`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`Ref<HTMLElement>`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsxs)(n.td,{children:[`Forwarded to the `,(0,u.jsx)(n.code,{children:`<figure>`})]})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`DosFigure`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};