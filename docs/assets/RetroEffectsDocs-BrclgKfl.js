import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/RetroEffects`}),`
`,(0,u.jsx)(r.h1,{id:`retroeffects`,children:`RetroEffects`}),`
`,(0,u.jsx)(r.p,{children:`Full-screen CRT monitor overlay with scanlines, glow vignette, flicker, and phosphor bloom.`}),`
`,(0,u.jsx)(r.p,{children:`RetroEffects is a fixed-position overlay that layers authentic CRT visual effects over\r
your application. Each effect layer is independently toggleable. The component supports\r
power on/off animations that simulate a CRT monitor warming up and shutting down.`}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-retroeffects--default`,children:`RetroEffects stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`effect-layers`,children:`Effect Layers`}),`
`,(0,u.jsx)(r.p,{children:`Each layer is an independently controlled overlay:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Layer`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`scanlines`})}),(0,u.jsx)(r.td,{children:`On`}),(0,u.jsxs)(r.td,{children:[`Horizontal line pattern scrolling at 9s/cycle via `,(0,u.jsx)(r.code,{children:`mix-blend-mode: screen`})]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`glow`})}),(0,u.jsx)(r.td,{children:`On`}),(0,u.jsx)(r.td,{children:`Radial vignette darkening edges, simulating phosphor falloff`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`flicker`})}),(0,u.jsx)(r.td,{children:`On`}),(0,u.jsx)(r.td,{children:`Subtle opacity oscillation at 2Hz (WCAG 2.3.1 compliant, under 3Hz threshold)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`bloom`})}),(0,u.jsx)(r.td,{children:`Off`}),(0,u.jsx)(r.td,{children:`Soft inner glow simulating CRT halation (opt-in for performance)`})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`{/* All default effects */}\r
<RetroEffects />\r
\r
{/* Selective layers */}\r
<RetroEffects scanlines glow flicker={false} bloom />\r
\r
{/* Minimal — scanlines only */}\r
<RetroEffects glow={false} flicker={false} />
`})}),`
`,(0,u.jsx)(r.h2,{id:`intensity`,children:`Intensity`}),`
`,(0,u.jsxs)(r.p,{children:[`The `,(0,u.jsx)(r.code,{children:`intensity`}),` prop (0-1) scales all effect opacities proportionally via the\r
`,(0,u.jsx)(r.code,{children:`--retro-intensity`}),` CSS custom property:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<RetroEffects intensity={0.5} />  {/* Half strength */}\r
<RetroEffects intensity={0.2} />  {/* Subtle hint */}
`})}),`
`,(0,u.jsx)(r.h2,{id:`power-animations`,children:`Power Animations`}),`
`,(0,u.jsxs)(r.p,{children:[`Toggle `,(0,u.jsx)(r.code,{children:`powered`}),` to trigger CRT power on/off animations:`]}),`
`,(0,u.jsx)(r.h3,{id:`power-on-600ms-ease-out`,children:`Power On (600ms ease-out)`}),`
`,(0,u.jsx)(r.p,{children:`Horizontal line expands to full screen, simulating a CRT warming up from cold.`}),`
`,(0,u.jsx)(r.h3,{id:`power-off-400ms-ease-in`,children:`Power Off (400ms ease-in)`}),`
`,(0,u.jsx)(r.p,{children:`Screen collapses to a horizontal line then disappears, simulating CRT shutdown.`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`const [powered, setPowered] = useState(true);\r
\r
<RetroEffects\r
  powered={powered}\r
  onPowerOn={() => console.log('CRT warm')}\r
  onPowerOff={() => console.log('CRT cold')}\r
  onPowerStateChange={(state) => console.log(state)}\r
/>
`})}),`
`,(0,u.jsx)(r.h3,{id:`power-state-machine`,children:`Power State Machine`}),`
`,(0,u.jsxs)(r.p,{children:[`The component tracks four states: `,(0,u.jsx)(r.code,{children:`on`}),`, `,(0,u.jsx)(r.code,{children:`powering-on`}),`, `,(0,u.jsx)(r.code,{children:`powering-off`}),`, `,(0,u.jsx)(r.code,{children:`off`}),`.\r
The `,(0,u.jsx)(r.code,{children:`onPowerStateChange`}),` callback fires on each transition. Children are hidden\r
when fully `,(0,u.jsx)(r.code,{children:`off`}),`.`]}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`ARIA hidden`}),`: Entire component is `,(0,u.jsx)(r.code,{children:`aria-hidden="true"`}),` (purely decorative)`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Pointer events`}),`: Set to `,(0,u.jsx)(r.code,{children:`none`}),` — effects never block interaction`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Flicker safety`}),`: Oscillation at 2Hz, well under the WCAG 2.3.1 three-flash threshold`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`High contrast`}),`: Entire component is `,(0,u.jsx)(r.code,{children:`display: none`}),` via `,(0,u.jsx)(r.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Reduced motion`}),`: All animations disabled. Power transitions replaced with simple opacity fades (0.2s off, 0.3s on) via `,(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`})]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`scanlines`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsx)(r.td,{children:`Enable scanline overlay`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`glow`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsx)(r.td,{children:`Enable vignette glow`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`flicker`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsx)(r.td,{children:`Enable CRT flicker`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`bloom`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Enable phosphor bloom (opt-in)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`powered`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`true`})}),(0,u.jsx)(r.td,{children:`CRT power state (animates transitions)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`intensity`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`number`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`1`})}),(0,u.jsx)(r.td,{children:`Effect intensity (0-1)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onPowerStateChange`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`(state: PowerState) => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Fires on power state transitions`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onPowerOn`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`() => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Fires when power-on animation completes`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onPowerOff`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`() => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Fires when power-off animation completes`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`''`})}),(0,u.jsx)(r.td,{children:`Additional CSS classes`})]})]})]}),`
`,(0,u.jsx)(r.h3,{id:`powerstate-type`,children:`PowerState Type`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-ts`,children:`type PowerState = 'on' | 'powering-on' | 'powering-off' | 'off';
`})}),`
`,(0,u.jsx)(r.h2,{id:`design-tokens-used`,children:`Design Tokens Used`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Token`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--effects-scanline-light`})}),(0,u.jsx)(r.td,{children:`Scanline light band`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--effects-scanline-dark`})}),(0,u.jsx)(r.td,{children:`Scanline dark band`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--effects-vignette-glow`})}),(0,u.jsx)(r.td,{children:`Glow vignette inner shadow`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--effects-vignette-edge`})}),(0,u.jsx)(r.td,{children:`Vignette gradient edge`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--effects-vignette-corner`})}),(0,u.jsx)(r.td,{children:`Vignette gradient corner`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--effects-screen-tint`})}),(0,u.jsx)(r.td,{children:`Flicker background tint`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--effects-phosphor-glow`})}),(0,u.jsx)(r.td,{children:`Bloom inner glow`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--effects-bloom-outer`})}),(0,u.jsx)(r.td,{children:`Bloom outer halo`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--effects-bloom-center`})}),(0,u.jsx)(r.td,{children:`Bloom radial gradient center`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-power-on`})}),(0,u.jsx)(r.td,{children:`Power-on animation duration (600ms fallback)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-power-off`})}),(0,u.jsx)(r.td,{children:`Power-off animation duration (400ms fallback)`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`RetroEffects`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};