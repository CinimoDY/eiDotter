import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as i}from"./index-JWhTtCsH.js";import{M as d}from"./blocks-a6sBqEnx.js";import"./iframe-QfvwKf1z.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BG7Dyd9P.js";import"./index-CZ7-CnlV.js";function r(s){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Docs/Button"}),`
`,e.jsx(n.h1,{id:"button",children:"Button"}),`
`,e.jsx(n.p,{children:"DOS-styled action trigger with authentic CRT phosphor interaction states."}),`
`,e.jsx(n.p,{children:`The Button is the primary interactive element in eiDotter. It uses a 4-variant system\r
mapped to action intent, with CGA-authentic colors and phosphor glow animations that\r
simulate a cold CRT monitor coming to life.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Interactive demos"}),": See the ",e.jsx(n.a,{href:"/story/components-button--all-variants",children:"Button stories"})," for live interactive examples."]}),`
`]}),`
`,e.jsx(n.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(n.p,{children:"Each variant maps to a specific semantic role:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Variant"}),e.jsx(n.th,{children:"Role"}),e.jsx(n.th,{children:"Example"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Primary"})}),e.jsx(n.td,{children:"Main action, destructive confirm"}),e.jsx(n.td,{children:"Save, Delete, Submit"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Secondary"})}),e.jsx(n.td,{children:"Supporting action"}),e.jsx(n.td,{children:"Cancel, Back, Reset"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Ghost"})}),e.jsx(n.td,{children:"Tertiary / low-emphasis"}),e.jsx(n.td,{children:"Settings, More options"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Link"})}),e.jsx(n.td,{children:"Navigation, inline action"}),e.jsx(n.td,{children:"Learn more, View details"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Button variant="primary">Save Changes</Button>\r
<Button variant="secondary">Cancel</Button>\r
<Button variant="ghost">Settings</Button>\r
<Button variant="link">Learn more</Button>
`})}),`
`,e.jsx(n.h2,{id:"sizes",children:"Sizes"}),`
`,e.jsx(n.p,{children:"Three sizes following an 8px spacing grid:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Size"}),e.jsx(n.th,{children:"Font"}),e.jsx(n.th,{children:"Padding"}),e.jsx(n.th,{children:"Min Height"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"small"})}),e.jsx(n.td,{children:"12px"}),e.jsx(n.td,{children:"4px 8px"}),e.jsx(n.td,{children:"24px"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"medium"})}),e.jsx(n.td,{children:"14px"}),e.jsx(n.td,{children:"8px 16px"}),e.jsx(n.td,{children:"32px"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"large"})}),e.jsx(n.td,{children:"16px"}),e.jsx(n.td,{children:"12px 20px"}),e.jsx(n.td,{children:"40px"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Button size="small">Small</Button>\r
<Button size="medium">Medium</Button>\r
<Button size="large">Large</Button>
`})}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(n.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsxs(n.p,{children:["Reduced opacity (0.6), ",e.jsx(n.code,{children:"not-allowed"}),` cursor. Background forced to secondary,\r
text to disabled color. All variants share the same disabled appearance.`]}),`
`,e.jsx(n.h3,{id:"loading",children:"Loading"}),`
`,e.jsxs(n.p,{children:["Displays a blinking block cursor (",e.jsx(n.code,{children:"█"}),`) alongside dimmed content text.\r
The button is functionally disabled during loading — clicks are suppressed\r
and `,e.jsx(n.code,{children:"aria-disabled"})," is set."]}),`
`,e.jsx(n.h3,{id:"full-width",children:"Full Width"}),`
`,e.jsx(n.p,{children:"Stretches to fill container width. Useful in modals, forms, and mobile layouts."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Button fullWidth>Full Width Button</Button>
`})}),`
`,e.jsx(n.h2,{id:"interaction-design",children:"Interaction Design"}),`
`,e.jsx(n.p,{children:"The Primary button has a multi-layered CRT phosphor animation system:"}),`
`,e.jsx(n.h3,{id:"rest-state",children:"Rest State"}),`
`,e.jsx(n.p,{children:"Cold phosphor — no glow, no shadows. The monitor is off."}),`
`,e.jsx(n.h3,{id:"hover-phosphor-warm-up",children:"Hover: Phosphor Warm-Up"}),`
`,e.jsxs(n.p,{children:["A 3-layer box-shadow bloom builds over 400ms (",e.jsx(n.code,{children:"--duration-slow"}),"):"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`box-shadow:\r
  0 0 8px 0 var(--color-cga-amber-glow),    /* inner core */\r
  0 0 20px 2px var(--effects-phosphor-glow), /* mid bloom */\r
  0 0 40px 4px var(--effects-bloom-outer);   /* outer halo */
`})}),`
`,e.jsxs(n.p,{children:["Text gains a subtle ",e.jsx(n.code,{children:"text-shadow"}),` glow. No size change — the bloom sits\r
entirely in box-shadow space.`]}),`
`,e.jsx(n.h3,{id:"active-steady-energy",children:"Active: Steady Energy"}),`
`,e.jsxs(n.p,{children:["Background brightens to ",e.jsx(n.code,{children:"--color-cga-amber-bright"}),`. Glow intensifies.\r
A slow-crawling scanline overlay (`,e.jsx(n.code,{children:"::after"}),` pseudo-element) scrolls down\r
at 4s per cycle, simulating CRT scan refresh.`]}),`
`,e.jsx(n.h3,{id:"hover-phosphor-warmup-flicker",children:"Hover: Phosphor Warmup Flicker"}),`
`,e.jsxs(n.p,{children:["On hover entry, a ",e.jsx(n.code,{children:"phosphor-warmup"}),` keyframe plays once (400ms). It simulates\r
CRT phosphor ignition: a brightness spike → overcorrection dip → secondary\r
excitation → settle. This runs simultaneously with the bloom transition.`]}),`
`,e.jsx(n.h3,{id:"active-phosphor-energize-flash",children:"Active: Phosphor Energize Flash"}),`
`,e.jsxs(n.p,{children:["On press, a ",e.jsx(n.code,{children:"phosphor-energize"}),` keyframe fires (150ms). A quick brightness\r
flash to 1.4x then holds at 1.08x while the button is held. The scanline\r
crawl overlay continues independently.`]}),`
`,e.jsx(n.h3,{id:"release-power-on-impulse",children:"Release: Power-On Impulse"}),`
`,e.jsxs(n.p,{children:[`On mouse-up, properties snap back with a 600ms spring curve:\r
`,e.jsx(n.code,{children:"cubic-bezier(0.8, -0.5, 0.2, 1.4)"}),`. The negative p2 creates a brief\r
undershoot (dips cold) and p4 > 1 overshoots past rest — a damped oscillation\r
that feels like phosphor decay.`]}),`
`,e.jsx(n.h3,{id:"secondary-2-layer-bloom",children:"Secondary: 2-Layer Bloom"}),`
`,e.jsx(n.p,{children:"The secondary button has a softer phosphor system:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"State"}),e.jsx(n.th,{children:"Behavior"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Hover"})}),e.jsx(n.td,{children:"2-layer box-shadow (inner core + mid bloom), text-shadow glow, warmup flicker"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Active"})}),e.jsx(n.td,{children:"Intensified 2-layer glow, energize flash (no scanline)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Release"})}),e.jsxs(n.td,{children:["Gentler spring ",e.jsx(n.code,{children:"cubic-bezier(0.5, -0.2, 0.2, 1.2)"})," over 400ms"]})]})]})]}),`
`,e.jsx(n.h3,{id:"ghost-1-layer-bloom",children:"Ghost: 1-Layer Bloom"}),`
`,e.jsx(n.p,{children:"The ghost button has the most minimal phosphor treatment:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"State"}),e.jsx(n.th,{children:"Behavior"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Hover"})}),e.jsx(n.td,{children:"1-layer box-shadow (inner core only), text-shadow glow, fast warmup (200ms)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Active"})}),e.jsx(n.td,{children:"Intensified 1-layer glow, energize flash (no scanline)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Release"})}),e.jsxs(n.td,{children:["Subtle spring ",e.jsx(n.code,{children:"cubic-bezier(0.5, -0.1, 0.2, 1.1)"})," over 300ms"]})]})]})]}),`
`,e.jsx(n.h3,{id:"link-text-glow-only",children:"Link: Text Glow Only"}),`
`,e.jsxs(n.p,{children:["Link buttons receive only a ",e.jsx(n.code,{children:"text-shadow"}),` glow on hover — no box-shadow bloom\r
or spring easing. This keeps them lightweight for inline use.`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Interactive comparison"}),": See the ",e.jsx(n.a,{href:"/story/components-button--phosphor-states",children:"PhosphorStates story"})," to compare all variants."]}),`
`]}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus visible"}),": 2px solid outline with 2px offset, using ",e.jsx(n.code,{children:"--color-semantic-border-focus"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"High contrast"}),": Border widens to 3px via ",e.jsx(n.code,{children:"prefers-contrast: high"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Reduced motion"}),": All transitions, animations, and filters disabled via ",e.jsx(n.code,{children:"prefers-reduced-motion: reduce"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA"}),": ",e.jsx(n.code,{children:"aria-disabled"})," set when disabled or loading"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard"}),": Full keyboard navigation with visible focus ring"]}),`
`]}),`
`,e.jsx(n.h2,{id:"form-usage",children:"Form Usage"}),`
`,e.jsxs(n.p,{children:["Supports ",e.jsx(n.code,{children:'type="submit"'}),", ",e.jsx(n.code,{children:'type="reset"'}),", and ",e.jsx(n.code,{children:'type="button"'}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<form>\r
  <Button type="submit" variant="primary">Submit</Button>\r
  <Button type="reset" variant="secondary">Reset</Button>\r
  <Button type="button" variant="ghost">Cancel</Button>\r
</form>
`})}),`
`,e.jsx(n.h2,{id:"api-reference",children:"API Reference"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"variant"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'primary' | 'secondary' | 'ghost' | 'link'"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'primary'"})}),e.jsx(n.td,{children:"Visual style mapped to action intent"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"size"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'small' | 'medium' | 'large'"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'medium'"})}),e.jsx(n.td,{children:"Button dimensions"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"type"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'button' | 'submit' | 'reset'"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"'button'"})}),e.jsx(n.td,{children:"HTML button type"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"disabled"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Disables interaction"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"loading"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Shows block cursor loading indicator"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"fullWidth"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})}),e.jsx(n.td,{children:"Stretches to container width"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"children"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"ReactNode"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Button label content"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onClick"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"(event) => void"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Click handler"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"className"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"''"})}),e.jsx(n.td,{children:"Additional CSS classes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"aria-label"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Accessible label override"})]})]})]}),`
`,e.jsx(n.h2,{id:"design-tokens-used",children:"Design Tokens Used"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Token"}),e.jsx(n.th,{children:"Purpose"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-background-accent"})}),e.jsx(n.td,{children:"Primary fill"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-text-secondary"})}),e.jsx(n.td,{children:"Primary text (dark on amber)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-border-default"})}),e.jsx(n.td,{children:"Default border"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-semantic-border-focus"})}),e.jsx(n.td,{children:"Focus outline"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-amber-glow"})}),e.jsx(n.td,{children:"Hover glow inner core"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--effects-phosphor-glow"})}),e.jsx(n.td,{children:"Hover glow mid bloom"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--effects-bloom-outer"})}),e.jsx(n.td,{children:"Hover glow outer halo"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--color-cga-amber-bright"})}),e.jsx(n.td,{children:"Active state background"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--shadow-glow-sm"})}),e.jsx(n.td,{children:"Secondary/Ghost hover glow"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--duration-fast"})}),e.jsx(n.td,{children:"100ms — press response"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"--duration-slow"})}),e.jsx(n.td,{children:"400ms — hover build-up"})]})]})]})]})}function j(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{j as default};
