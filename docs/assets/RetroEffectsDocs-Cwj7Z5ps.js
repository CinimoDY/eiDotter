import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as i}from"./index-D5dRogEL.js";import{M as d}from"./blocks-DG9eVJBI.js";import{C as t}from"./ComponentOrigin-DmRjH1iZ.js";import"./iframe-K6BYEX5l.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DisTUHiR.js";import"./index-DLTpzO1r.js";import"./registry-DlnQDLA5.js";function s(r){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Docs/RetroEffects"}),`
`,e.jsx(n.h1,{id:"retroeffects",children:"RetroEffects"}),`
`,e.jsx(n.p,{children:"Full-screen CRT monitor overlay with scanlines, glow vignette, flicker, and phosphor bloom."}),`
`,e.jsx(n.p,{children:`RetroEffects is a fixed-position overlay that layers authentic CRT visual effects over\r
your application. Each effect layer is independently toggleable. The component supports\r
power on/off animations that simulate a CRT monitor warming up and shutting down.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Interactive demos"}),": See the ",e.jsx(n.a,{href:"/story/components-retroeffects--default",children:"RetroEffects stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(n.h2,{id:"effect-layers",children:"Effect Layers"}),`
`,e.jsx(n.p,{children:"Each layer is an independently controlled overlay:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Layer"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"scanlines"})}),e.jsx(n.td,{children:"On"}),e.jsxs(n.td,{children:["Horizontal line pattern scrolling at 9s/cycle via ",e.jsx(n.code,{children:"mix-blend-mode: screen"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"glow"})}),e.jsx(n.td,{children:"On"}),e.jsx(n.td,{children:"Radial vignette darkening edges, simulating phosphor falloff"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"flicker"})}),e.jsx(n.td,{children:"On"}),e.jsx(n.td,{children:"Subtle opacity oscillation at 2Hz (WCAG 2.3.1 compliant, under 3Hz threshold)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"bloom"})}),e.jsx(n.td,{children:"Off"}),e.jsx(n.td,{children:"Soft inner glow simulating CRT halation (opt-in for performance)"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`{/* All default effects */}\r
<RetroEffects />\r
\r
{/* Selective layers */}\r
<RetroEffects scanlines glow flicker={false} bloom />\r
\r
{/* Minimal — scanlines only */}\r
<RetroEffects glow={false} flicker={false} />
`})}),`
`,e.jsx(n.h2,{id:"intensity",children:"Intensity"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"intensity"}),` prop (0-1) scales all effect opacities proportionally via the\r
`,e.jsx(n.code,{children:"--retro-intensity"})," CSS custom property:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<RetroEffects intensity={0.5} />  {/* Half strength */}\r
<RetroEffects intensity={0.2} />  {/* Subtle hint */}
`})}),`
`,e.jsx(n.h2,{id:"power-animations",children:"Power Animations"}),`
`,e.jsxs(n.p,{children:["Toggle ",e.jsx(n.code,{children:"powered"})," to trigger CRT power on/off animations:"]}),`
`,e.jsx(n.h3,{id:"power-on-600ms-ease-out",children:"Power On (600ms ease-out)"}),`
`,e.jsx(n.p,{children:"Horizontal line expands to full screen, simulating a CRT warming up from cold."}),`
`,e.jsx(n.h3,{id:"power-off-400ms-ease-in",children:"Power Off (400ms ease-in)"}),`
`,e.jsx(n.p,{children:"Screen collapses to a horizontal line then disappears, simulating CRT shutdown."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`const [powered, setPowered] = useState(true);\r
\r
<RetroEffects\r
  powered={powered}\r
  onPowerOn={() => console.log('CRT warm')}\r
  onPowerOff={() => console.log('CRT cold')}\r
  onPowerStateChange={(state) => console.log(state)}\r
/>
`})}),`
`,e.jsx(n.h3,{id:"power-state-machine",children:"Power State Machine"}),`
`,e.jsxs(n.p,{children:["The component tracks four states: ",e.jsx(n.code,{children:"on"}),", ",e.jsx(n.code,{children:"powering-on"}),", ",e.jsx(n.code,{children:"powering-off"}),", ",e.jsx(n.code,{children:"off"}),`.\r
The `,e.jsx(n.code,{children:"onPowerStateChange"}),` callback fires on each transition. Children are hidden\r
when fully `,e.jsx(n.code,{children:"off"}),"."]}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA hidden"}),": Entire component is ",e.jsx(n.code,{children:'aria-hidden="true"'})," (purely decorative)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pointer events"}),": Set to ",e.jsx(n.code,{children:"none"})," — effects never block interaction"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Flicker safety"}),": Oscillation at 2Hz, well under the WCAG 2.3.1 three-flash threshold"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"High contrast"}),": Entire component is ",e.jsx(n.code,{children:"display: none"})," via ",e.jsx(n.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Reduced motion"}),": All animations disabled. Power transitions replaced with simple opacity fades (0.2s off, 0.3s on) via ",e.jsx(n.code,{children:"prefers-reduced-motion: reduce"})]}),`
`]}),`
`,e.jsx(n.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"scanlines"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Enable scanline overlay"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"glow"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Enable vignette glow"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"flicker"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"Enable CRT flicker"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"bloom"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Enable phosphor bloom (opt-in)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"powered"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})}),e.jsx(n.td,{children:"CRT power state (animates transitions)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"intensity"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"1"})}),e.jsx(n.td,{children:"Effect intensity (0-1)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onPowerStateChange"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"(state: PowerState) => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Fires on power state transitions"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onPowerOn"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"() => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Fires when power-on animation completes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onPowerOff"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"() => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Fires when power-off animation completes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"className"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"''"})}),e.jsx(n.td,{children:"Additional CSS classes"})]})]})]}),`
`,e.jsx(n.h3,{id:"powerstate-type",children:"PowerState Type"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`type PowerState = 'on' | 'powering-on' | 'powering-off' | 'off';
`})}),`
`,e.jsx(n.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Token"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--effects-scanline-light"})}),e.jsx(n.td,{children:"Scanline light band"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--effects-scanline-dark"})}),e.jsx(n.td,{children:"Scanline dark band"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--effects-vignette-glow"})}),e.jsx(n.td,{children:"Glow vignette inner shadow"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--effects-vignette-edge"})}),e.jsx(n.td,{children:"Vignette gradient edge"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--effects-vignette-corner"})}),e.jsx(n.td,{children:"Vignette gradient corner"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--effects-screen-tint"})}),e.jsx(n.td,{children:"Flicker background tint"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--effects-phosphor-glow"})}),e.jsx(n.td,{children:"Bloom inner glow"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--effects-bloom-outer"})}),e.jsx(n.td,{children:"Bloom outer halo"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--effects-bloom-center"})}),e.jsx(n.td,{children:"Bloom radial gradient center"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--duration-power-on"})}),e.jsx(n.td,{children:"Power-on animation duration (600ms fallback)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--duration-power-off"})}),e.jsx(n.td,{children:"Power-off animation duration (400ms fallback)"})]})]})]}),`
`,e.jsx(n.h2,{id:"origin",children:"Origin"}),`
`,e.jsx(t,{name:"RetroEffects"})]})}function m(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{m as default};
