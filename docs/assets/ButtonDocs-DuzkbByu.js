import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/Button`}),`
`,(0,u.jsx)(n.h1,{id:`button`,children:`Button`}),`
`,(0,u.jsx)(n.p,{children:`DOS-styled action trigger with CRT phosphor interaction states.`}),`
`,(0,u.jsx)(n.p,{children:`The Button has four variants mapped to action intent. It uses CGA colors and phosphor\r
glow animations modeled on a cold CRT monitor warming up.`}),`
`,(0,u.jsxs)(n.blockquote,{children:[`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.strong,{children:`Interactive demos`}),`: See the `,(0,u.jsx)(n.a,{href:`/story/components-button--all-variants`,children:`Button stories`}),` for live interactive examples.`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`variants`,children:`Variants`}),`
`,(0,u.jsx)(n.p,{children:`Each variant maps to a semantic role:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Variant`}),(0,u.jsx)(n.th,{children:`Role`}),(0,u.jsx)(n.th,{children:`Example`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Primary`})}),(0,u.jsx)(n.td,{children:`Main action, destructive confirm`}),(0,u.jsx)(n.td,{children:`Save, Delete, Submit`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Secondary`})}),(0,u.jsx)(n.td,{children:`Supporting action`}),(0,u.jsx)(n.td,{children:`Cancel, Back, Reset`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Ghost`})}),(0,u.jsx)(n.td,{children:`Tertiary / low-emphasis`}),(0,u.jsx)(n.td,{children:`Settings, More options`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Link`})}),(0,u.jsx)(n.td,{children:`Navigation, inline action`}),(0,u.jsx)(n.td,{children:`Learn more, View details`})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Button variant="primary">Save Changes</Button>\r
<Button variant="secondary">Cancel</Button>\r
<Button variant="ghost">Settings</Button>\r
<Button variant="link">Learn more</Button>
`})}),`
`,(0,u.jsx)(n.h2,{id:`sizes`,children:`Sizes`}),`
`,(0,u.jsx)(n.p,{children:`Three sizes following an 8px spacing grid:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Size`}),(0,u.jsx)(n.th,{children:`Font`}),(0,u.jsx)(n.th,{children:`Padding`}),(0,u.jsx)(n.th,{children:`Min Height`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`small`})}),(0,u.jsx)(n.td,{children:`12px`}),(0,u.jsx)(n.td,{children:`4px 8px`}),(0,u.jsx)(n.td,{children:`24px`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`medium`})}),(0,u.jsx)(n.td,{children:`14px`}),(0,u.jsx)(n.td,{children:`8px 16px`}),(0,u.jsx)(n.td,{children:`32px`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`large`})}),(0,u.jsx)(n.td,{children:`16px`}),(0,u.jsx)(n.td,{children:`12px 20px`}),(0,u.jsx)(n.td,{children:`40px`})]})]})]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Button size="small">Small</Button>\r
<Button size="medium">Medium</Button>\r
<Button size="large">Large</Button>
`})}),`
`,(0,u.jsx)(n.h2,{id:`states`,children:`States`}),`
`,(0,u.jsx)(n.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,u.jsxs)(n.p,{children:[`Reduced opacity (0.6), `,(0,u.jsx)(n.code,{children:`not-allowed`}),` cursor. Background forced to secondary,\r
text to disabled color. All variants share the same disabled appearance.`]}),`
`,(0,u.jsx)(n.h3,{id:`loading`,children:`Loading`}),`
`,(0,u.jsxs)(n.p,{children:[`Displays a blinking block cursor (`,(0,u.jsx)(n.code,{children:`█`}),`) alongside dimmed content text.\r
The button is disabled while loading. It suppresses clicks and sets\r
`,(0,u.jsx)(n.code,{children:`aria-disabled`}),`.`]}),`
`,(0,u.jsx)(n.h3,{id:`full-width`,children:`Full width`}),`
`,(0,u.jsx)(n.p,{children:`Stretches to fill container width. Use it in modals, forms, and mobile layouts.`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<Button fullWidth>Full Width Button</Button>
`})}),`
`,(0,u.jsx)(n.h2,{id:`interaction-design`,children:`Interaction design`}),`
`,(0,u.jsx)(n.p,{children:`The primary button layers several CRT phosphor animations:`}),`
`,(0,u.jsx)(n.h3,{id:`rest-state`,children:`Rest state`}),`
`,(0,u.jsx)(n.p,{children:`No glow and no shadows (cold phosphor).`}),`
`,(0,u.jsx)(n.h3,{id:`hover-phosphor-warm-up`,children:`Hover: phosphor warm-up`}),`
`,(0,u.jsxs)(n.p,{children:[`A 3-layer box-shadow bloom builds over 400ms (`,(0,u.jsx)(n.code,{children:`--duration-slow`}),`):`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-css`,children:`box-shadow:\r
  0 0 8px 0 var(--color-cga-amber-glow),    /* inner core */\r
  0 0 20px 2px var(--effects-phosphor-glow), /* mid bloom */\r
  0 0 40px 4px var(--effects-bloom-outer);   /* outer halo */
`})}),`
`,(0,u.jsxs)(n.p,{children:[`Text gains a `,(0,u.jsx)(n.code,{children:`text-shadow`}),` glow. The button does not change size, because the\r
bloom is all box-shadow.`]}),`
`,(0,u.jsx)(n.h3,{id:`active-steady-energy`,children:`Active: steady energy`}),`
`,(0,u.jsxs)(n.p,{children:[`Background brightens to `,(0,u.jsx)(n.code,{children:`--color-cga-amber-bright`}),`. Glow intensifies.\r
A scanline overlay (`,(0,u.jsx)(n.code,{children:`::after`}),` pseudo-element) scrolls down once every 4s,\r
like a CRT scan refresh.`]}),`
`,(0,u.jsx)(n.h3,{id:`hover-phosphor-warmup-flicker`,children:`Hover: phosphor warmup flicker`}),`
`,(0,u.jsxs)(n.p,{children:[`On hover entry, a `,(0,u.jsx)(n.code,{children:`phosphor-warmup`}),` keyframe plays once (400ms). It simulates\r
CRT phosphor ignition: a brightness spike → overcorrection dip → secondary\r
excitation → settle. It runs at the same time as the bloom transition.`]}),`
`,(0,u.jsx)(n.h3,{id:`active-phosphor-energize-flash`,children:`Active: phosphor energize flash`}),`
`,(0,u.jsxs)(n.p,{children:[`On press, a `,(0,u.jsx)(n.code,{children:`phosphor-energize`}),` keyframe fires (150ms). Brightness flashes\r
to 1.4x, then holds at 1.08x while the button is held. The scanline\r
crawl overlay continues independently.`]}),`
`,(0,u.jsx)(n.h3,{id:`release-power-on-impulse`,children:`Release: power-on impulse`}),`
`,(0,u.jsxs)(n.p,{children:[`On mouse-up, properties snap back with a 600ms spring curve:\r
`,(0,u.jsx)(n.code,{children:`cubic-bezier(0.8, -0.5, 0.2, 1.4)`}),`. The negative p2 makes a brief\r
undershoot (dips cold), and p4 > 1 overshoots past rest. The result is a damped\r
oscillation, like phosphor decay.`]}),`
`,(0,u.jsx)(n.h3,{id:`secondary-2-layer-bloom`,children:`Secondary: 2-layer bloom`}),`
`,(0,u.jsx)(n.p,{children:`The secondary button uses a softer version of the same effects:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`State`}),(0,u.jsx)(n.th,{children:`Behavior`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Hover`})}),(0,u.jsx)(n.td,{children:`2-layer box-shadow (inner core + mid bloom), text-shadow glow, warmup flicker`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Active`})}),(0,u.jsx)(n.td,{children:`Intensified 2-layer glow, energize flash (no scanline)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Release`})}),(0,u.jsxs)(n.td,{children:[`Gentler spring `,(0,u.jsx)(n.code,{children:`cubic-bezier(0.5, -0.2, 0.2, 1.2)`}),` over 400ms`]})]})]})]}),`
`,(0,u.jsx)(n.h3,{id:`ghost-1-layer-bloom`,children:`Ghost: 1-layer bloom`}),`
`,(0,u.jsx)(n.p,{children:`The ghost button uses the lightest version:`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`State`}),(0,u.jsx)(n.th,{children:`Behavior`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Hover`})}),(0,u.jsx)(n.td,{children:`1-layer box-shadow (inner core only), text-shadow glow, fast warmup (200ms)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Active`})}),(0,u.jsx)(n.td,{children:`Intensified 1-layer glow, energize flash (no scanline)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.strong,{children:`Release`})}),(0,u.jsxs)(n.td,{children:[`Subtle spring `,(0,u.jsx)(n.code,{children:`cubic-bezier(0.5, -0.1, 0.2, 1.1)`}),` over 300ms`]})]})]})]}),`
`,(0,u.jsx)(n.h3,{id:`link-text-glow-only`,children:`Link: text glow only`}),`
`,(0,u.jsxs)(n.p,{children:[`Link buttons get only a `,(0,u.jsx)(n.code,{children:`text-shadow`}),` glow on hover, with no box-shadow bloom\r
or spring easing. This keeps them light enough for inline use.`]}),`
`,(0,u.jsxs)(n.blockquote,{children:[`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.strong,{children:`Interactive comparison`}),`: See the `,(0,u.jsx)(n.a,{href:`/story/components-button--phosphor-states`,children:`PhosphorStates story`}),` to compare all variants.`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Focus visible`}),`: 2px solid outline with 2px offset, using `,(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`High contrast`}),`: Border widens to 3px via `,(0,u.jsx)(n.code,{children:`prefers-contrast: high`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Reduced motion`}),`: All transitions, animations, and filters disabled via `,(0,u.jsx)(n.code,{children:`prefers-reduced-motion: reduce`})]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`ARIA`}),`: `,(0,u.jsx)(n.code,{children:`aria-disabled`}),` set when disabled or loading`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.strong,{children:`Keyboard`}),`: Full keyboard navigation with visible focus ring`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`form-usage`,children:`Form usage`}),`
`,(0,u.jsxs)(n.p,{children:[`Supports `,(0,u.jsx)(n.code,{children:`type="submit"`}),`, `,(0,u.jsx)(n.code,{children:`type="reset"`}),`, and `,(0,u.jsx)(n.code,{children:`type="button"`}),`:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<form>\r
  <Button type="submit" variant="primary">Submit</Button>\r
  <Button type="reset" variant="secondary">Reset</Button>\r
  <Button type="button" variant="ghost">Cancel</Button>\r
</form>
`})}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`variant`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'primary' | 'secondary' | 'ghost' | 'link'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'primary'`})}),(0,u.jsx)(n.td,{children:`Visual style mapped to action intent`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`size`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'small' | 'medium' | 'large'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'medium'`})}),(0,u.jsx)(n.td,{children:`Button dimensions`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`type`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'button' | 'submit' | 'reset'`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'button'`})}),(0,u.jsx)(n.td,{children:`HTML button type`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`disabled`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsx)(n.td,{children:`Disables interaction`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`loading`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsx)(n.td,{children:`Shows block cursor loading indicator`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`fullWidth`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`false`})}),(0,u.jsx)(n.td,{children:`Stretches to container width`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`children`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`ReactNode`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Button label content`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onClick`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`(event) => void`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Click handler`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`''`})}),(0,u.jsx)(n.td,{children:`Additional CSS classes`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`aria-label`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Accessible label override`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Token`}),(0,u.jsx)(n.th,{children:`Purpose`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-background-accent`})}),(0,u.jsx)(n.td,{children:`Primary fill`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-text-on-accent`})}),(0,u.jsx)(n.td,{children:`Primary text (dark on amber)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-default`})}),(0,u.jsx)(n.td,{children:`Default border`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-semantic-border-focus`})}),(0,u.jsx)(n.td,{children:`Focus outline`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-cga-amber-glow`})}),(0,u.jsx)(n.td,{children:`Hover glow inner core`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--effects-phosphor-glow`})}),(0,u.jsx)(n.td,{children:`Hover glow mid bloom`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--effects-bloom-outer`})}),(0,u.jsx)(n.td,{children:`Hover glow outer halo`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--color-cga-amber-bright`})}),(0,u.jsx)(n.td,{children:`Active state background`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--shadow-glow-sm`})}),(0,u.jsx)(n.td,{children:`Secondary/Ghost hover glow`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--duration-fast`})}),(0,u.jsx)(n.td,{children:`100ms — press response`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`--duration-slow`})}),(0,u.jsx)(n.td,{children:`400ms — hover build-up`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`Button`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};