import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/Button`}),`
`,(0,u.jsx)(r.h1,{id:`button`,children:`Button`}),`
`,(0,u.jsx)(r.p,{children:`DOS-styled action trigger with authentic CRT phosphor interaction states.`}),`
`,(0,u.jsx)(r.p,{children:`The Button is the primary interactive element in eiDotter. It uses a 4-variant system\r
mapped to action intent, with CGA-authentic colors and phosphor glow animations that\r
simulate a cold CRT monitor coming to life.`}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-button--all-variants`,children:`Button stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`variants`,children:`Variants`}),`
`,(0,u.jsx)(r.p,{children:`Each variant maps to a specific semantic role:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Variant`}),(0,u.jsx)(r.th,{children:`Role`}),(0,u.jsx)(r.th,{children:`Example`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Primary`})}),(0,u.jsx)(r.td,{children:`Main action, destructive confirm`}),(0,u.jsx)(r.td,{children:`Save, Delete, Submit`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Secondary`})}),(0,u.jsx)(r.td,{children:`Supporting action`}),(0,u.jsx)(r.td,{children:`Cancel, Back, Reset`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Ghost`})}),(0,u.jsx)(r.td,{children:`Tertiary / low-emphasis`}),(0,u.jsx)(r.td,{children:`Settings, More options`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Link`})}),(0,u.jsx)(r.td,{children:`Navigation, inline action`}),(0,u.jsx)(r.td,{children:`Learn more, View details`})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Button variant="primary">Save Changes</Button>\r
<Button variant="secondary">Cancel</Button>\r
<Button variant="ghost">Settings</Button>\r
<Button variant="link">Learn more</Button>
`})}),`
`,(0,u.jsx)(r.h2,{id:`sizes`,children:`Sizes`}),`
`,(0,u.jsx)(r.p,{children:`Three sizes following an 8px spacing grid:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Size`}),(0,u.jsx)(r.th,{children:`Font`}),(0,u.jsx)(r.th,{children:`Padding`}),(0,u.jsx)(r.th,{children:`Min Height`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`small`})}),(0,u.jsx)(r.td,{children:`12px`}),(0,u.jsx)(r.td,{children:`4px 8px`}),(0,u.jsx)(r.td,{children:`24px`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`medium`})}),(0,u.jsx)(r.td,{children:`14px`}),(0,u.jsx)(r.td,{children:`8px 16px`}),(0,u.jsx)(r.td,{children:`32px`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`large`})}),(0,u.jsx)(r.td,{children:`16px`}),(0,u.jsx)(r.td,{children:`12px 20px`}),(0,u.jsx)(r.td,{children:`40px`})]})]})]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Button size="small">Small</Button>\r
<Button size="medium">Medium</Button>\r
<Button size="large">Large</Button>
`})}),`
`,(0,u.jsx)(r.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(r.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,u.jsxs)(r.p,{children:[`Reduced opacity (0.6), `,(0,u.jsx)(r.code,{children:`not-allowed`}),` cursor. Background forced to secondary,\r
text to disabled color. All variants share the same disabled appearance.`]}),`
`,(0,u.jsx)(r.h3,{id:`loading`,children:`Loading`}),`
`,(0,u.jsxs)(r.p,{children:[`Displays a blinking block cursor (`,(0,u.jsx)(r.code,{children:`█`}),`) alongside dimmed content text.\r
The button is functionally disabled during loading — clicks are suppressed\r
and `,(0,u.jsx)(r.code,{children:`aria-disabled`}),` is set.`]}),`
`,(0,u.jsx)(r.h3,{id:`full-width`,children:`Full Width`}),`
`,(0,u.jsx)(r.p,{children:`Stretches to fill container width. Useful in modals, forms, and mobile layouts.`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<Button fullWidth>Full Width Button</Button>
`})}),`
`,(0,u.jsx)(r.h2,{id:`interaction-design`,children:`Interaction Design`}),`
`,(0,u.jsx)(r.p,{children:`The Primary button has a multi-layered CRT phosphor animation system:`}),`
`,(0,u.jsx)(r.h3,{id:`rest-state`,children:`Rest State`}),`
`,(0,u.jsx)(r.p,{children:`Cold phosphor — no glow, no shadows. The monitor is off.`}),`
`,(0,u.jsx)(r.h3,{id:`hover-phosphor-warm-up`,children:`Hover: Phosphor Warm-Up`}),`
`,(0,u.jsxs)(r.p,{children:[`A 3-layer box-shadow bloom builds over 400ms (`,(0,u.jsx)(r.code,{children:`--duration-slow`}),`):`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-css`,children:`box-shadow:\r
  0 0 8px 0 var(--color-cga-amber-glow),    /* inner core */\r
  0 0 20px 2px var(--effects-phosphor-glow), /* mid bloom */\r
  0 0 40px 4px var(--effects-bloom-outer);   /* outer halo */
`})}),`
`,(0,u.jsxs)(r.p,{children:[`Text gains a subtle `,(0,u.jsx)(r.code,{children:`text-shadow`}),` glow. No size change — the bloom sits\r
entirely in box-shadow space.`]}),`
`,(0,u.jsx)(r.h3,{id:`active-steady-energy`,children:`Active: Steady Energy`}),`
`,(0,u.jsxs)(r.p,{children:[`Background brightens to `,(0,u.jsx)(r.code,{children:`--color-cga-amber-bright`}),`. Glow intensifies.\r
A slow-crawling scanline overlay (`,(0,u.jsx)(r.code,{children:`::after`}),` pseudo-element) scrolls down\r
at 4s per cycle, simulating CRT scan refresh.`]}),`
`,(0,u.jsx)(r.h3,{id:`hover-phosphor-warmup-flicker`,children:`Hover: Phosphor Warmup Flicker`}),`
`,(0,u.jsxs)(r.p,{children:[`On hover entry, a `,(0,u.jsx)(r.code,{children:`phosphor-warmup`}),` keyframe plays once (400ms). It simulates\r
CRT phosphor ignition: a brightness spike → overcorrection dip → secondary\r
excitation → settle. This runs simultaneously with the bloom transition.`]}),`
`,(0,u.jsx)(r.h3,{id:`active-phosphor-energize-flash`,children:`Active: Phosphor Energize Flash`}),`
`,(0,u.jsxs)(r.p,{children:[`On press, a `,(0,u.jsx)(r.code,{children:`phosphor-energize`}),` keyframe fires (150ms). A quick brightness\r
flash to 1.4x then holds at 1.08x while the button is held. The scanline\r
crawl overlay continues independently.`]}),`
`,(0,u.jsx)(r.h3,{id:`release-power-on-impulse`,children:`Release: Power-On Impulse`}),`
`,(0,u.jsxs)(r.p,{children:[`On mouse-up, properties snap back with a 600ms spring curve:\r
`,(0,u.jsx)(r.code,{children:`cubic-bezier(0.8, -0.5, 0.2, 1.4)`}),`. The negative p2 creates a brief\r
undershoot (dips cold) and p4 > 1 overshoots past rest — a damped oscillation\r
that feels like phosphor decay.`]}),`
`,(0,u.jsx)(r.h3,{id:`secondary-2-layer-bloom`,children:`Secondary: 2-Layer Bloom`}),`
`,(0,u.jsx)(r.p,{children:`The secondary button has a softer phosphor system:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`State`}),(0,u.jsx)(r.th,{children:`Behavior`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Hover`})}),(0,u.jsx)(r.td,{children:`2-layer box-shadow (inner core + mid bloom), text-shadow glow, warmup flicker`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Active`})}),(0,u.jsx)(r.td,{children:`Intensified 2-layer glow, energize flash (no scanline)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Release`})}),(0,u.jsxs)(r.td,{children:[`Gentler spring `,(0,u.jsx)(r.code,{children:`cubic-bezier(0.5, -0.2, 0.2, 1.2)`}),` over 400ms`]})]})]})]}),`
`,(0,u.jsx)(r.h3,{id:`ghost-1-layer-bloom`,children:`Ghost: 1-Layer Bloom`}),`
`,(0,u.jsx)(r.p,{children:`The ghost button has the most minimal phosphor treatment:`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`State`}),(0,u.jsx)(r.th,{children:`Behavior`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Hover`})}),(0,u.jsx)(r.td,{children:`1-layer box-shadow (inner core only), text-shadow glow, fast warmup (200ms)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Active`})}),(0,u.jsx)(r.td,{children:`Intensified 1-layer glow, energize flash (no scanline)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.strong,{children:`Release`})}),(0,u.jsxs)(r.td,{children:[`Subtle spring `,(0,u.jsx)(r.code,{children:`cubic-bezier(0.5, -0.1, 0.2, 1.1)`}),` over 300ms`]})]})]})]}),`
`,(0,u.jsx)(r.h3,{id:`link-text-glow-only`,children:`Link: Text Glow Only`}),`
`,(0,u.jsxs)(r.p,{children:[`Link buttons receive only a `,(0,u.jsx)(r.code,{children:`text-shadow`}),` glow on hover — no box-shadow bloom\r
or spring easing. This keeps them lightweight for inline use.`]}),`
`,(0,u.jsxs)(r.blockquote,{children:[`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.strong,{children:`Interactive comparison`}),`: See the `,(0,u.jsx)(r.a,{href:`/story/components-button--phosphor-states`,children:`PhosphorStates story`}),` to compare all variants.`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Focus visible`}),`: 2px solid outline with 2px offset, using `,(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`High contrast`}),`: Border widens to 3px via `,(0,u.jsx)(r.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Reduced motion`}),`: All transitions, animations, and filters disabled via `,(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`ARIA`}),`: `,(0,u.jsx)(r.code,{children:`aria-disabled`}),` set when disabled or loading`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.strong,{children:`Keyboard`}),`: Full keyboard navigation with visible focus ring`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`form-usage`,children:`Form Usage`}),`
`,(0,u.jsxs)(r.p,{children:[`Supports `,(0,u.jsx)(r.code,{children:`type="submit"`}),`, `,(0,u.jsx)(r.code,{children:`type="reset"`}),`, and `,(0,u.jsx)(r.code,{children:`type="button"`}),`:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<form>\r
  <Button type="submit" variant="primary">Submit</Button>\r
  <Button type="reset" variant="secondary">Reset</Button>\r
  <Button type="button" variant="ghost">Cancel</Button>\r
</form>
`})}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`variant`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'primary' | 'secondary' | 'ghost' | 'link'`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'primary'`})}),(0,u.jsx)(r.td,{children:`Visual style mapped to action intent`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`size`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'small' | 'medium' | 'large'`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'medium'`})}),(0,u.jsx)(r.td,{children:`Button dimensions`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`type`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'button' | 'submit' | 'reset'`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'button'`})}),(0,u.jsx)(r.td,{children:`HTML button type`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`disabled`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Disables interaction`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`loading`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Shows block cursor loading indicator`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`fullWidth`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`false`})}),(0,u.jsx)(r.td,{children:`Stretches to container width`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`children`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ReactNode`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Button label content`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onClick`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`(event) => void`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Click handler`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`''`})}),(0,u.jsx)(r.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`aria-label`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Accessible label override`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`design-tokens-used`,children:`Design Tokens Used`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Token`}),(0,u.jsx)(r.th,{children:`Purpose`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-background-accent`})}),(0,u.jsx)(r.td,{children:`Primary fill`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-text-secondary`})}),(0,u.jsx)(r.td,{children:`Primary text (dark on amber)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(r.td,{children:`Default border`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(r.td,{children:`Focus outline`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-cga-amber-glow`})}),(0,u.jsx)(r.td,{children:`Hover glow inner core`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--effects-phosphor-glow`})}),(0,u.jsx)(r.td,{children:`Hover glow mid bloom`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--effects-bloom-outer`})}),(0,u.jsx)(r.td,{children:`Hover glow outer halo`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--color-cga-amber-bright`})}),(0,u.jsx)(r.td,{children:`Active state background`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--shadow-glow-sm`})}),(0,u.jsx)(r.td,{children:`Secondary/Ghost hover glow`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-fast`})}),(0,u.jsx)(r.td,{children:`100ms — press response`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`--duration-slow`})}),(0,u.jsx)(r.td,{children:`400ms — hover build-up`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Button`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};