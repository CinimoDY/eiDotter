import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{r,t as i}from"./registry-EhIcK3QA.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as ee}from"./cn-CHNjZLmO.js";import{n as s}from"./prefersReducedMotion-Bo85Vmtk.js";import{n as c,t as l}from"./Button-DYwuDaLT.js";var u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=t((()=>{u=e(n(),1),o(),d=a(),f=`data-eidotter-glow`,p=0,m=typeof window>`u`?u.useEffect:u.useLayoutEffect,h=[`(prefers-reduced-transparency: reduce)`,`(prefers-contrast: more)`,`(prefers-contrast: high)`],g=()=>{if(typeof window>`u`)return!1;try{return typeof window.CSS?.supports==`function`&&window.CSS.supports(`filter`,`url(#eidotter-retro-glow-filter)`)&&window.SVGFEGaussianBlurElement!==void 0}catch{return!1}},_=()=>typeof window.matchMedia==`function`&&h.some(e=>window.matchMedia(e).matches),v=e=>{let t=window.getComputedStyle(e),n=e=>parseFloat(t.getPropertyValue(`--effect-phosphor-sampled-${e}`)),r={tightRadius:n(`tight-radius`),tightIntensity:n(`tight-intensity`),haloRadius:n(`halo-radius`),haloIntensity:n(`halo-intensity`)};return Object.values(r).some(e=>!Number.isFinite(e)||e<0)||r.tightIntensity===0&&r.haloIntensity===0?null:r},y=(e,t)=>e===t||!!e&&!!t&&e.tightRadius===t.tightRadius&&e.tightIntensity===t.tightIntensity&&e.haloRadius===t.haloRadius&&e.haloIntensity===t.haloIntensity,b=({radius:e,intensity:t,result:n})=>(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`feGaussianBlur`,{in:`SourceGraphic`,stdDeviation:e,result:`${n}-blur`}),(0,d.jsxs)(`feComponentTransfer`,{in:`${n}-blur`,result:n,children:[(0,d.jsx)(`feFuncR`,{type:`linear`,slope:t}),(0,d.jsx)(`feFuncG`,{type:`linear`,slope:t}),(0,d.jsx)(`feFuncB`,{type:`linear`,slope:t}),(0,d.jsx)(`feFuncA`,{type:`linear`,slope:t})]})]}),x=`eidotter:retro-boot`,S=`1`,C=e=>{if(typeof window>`u`)return!1;try{return window.sessionStorage.getItem(e)===S}catch{return!1}},w=e=>{if(typeof window<`u`)try{window.sessionStorage.setItem(e,S)}catch{}},T=({scanlines:e=!0,glow:t=!0,flicker:n=!0,bloom:r=!1,mask:i,preset:a=`default`,glowMode:o=`element`,powered:c=!0,boot:l=!1,bootOnce:S=!1,bootStorageKey:T=x,intensity:E=1,className:D,onPowerStateChange:O,onPowerOn:k,onPowerOff:A,onBootComplete:j})=>{let M=(0,u.useRef)(c),[N,P]=(0,u.useState)(c?`on`:`off`),[F,I]=(0,u.useState)(l),L=(0,u.useRef)(!1),R=(0,u.useRef)(T),z=(0,u.useRef)(j);(0,u.useEffect)(()=>{z.current=j});let B=()=>{L.current||(L.current=!0,z.current?.())},V=()=>{I(!1),S&&w(R.current),B()};(0,u.useEffect)(()=>{l&&S&&C(R.current)&&(I(!1),B())},[]),(0,u.useEffect)(()=>{if(!F||L.current)return;if(s()){V();return}let e=window.setTimeout(()=>{V()},1200);return()=>window.clearTimeout(e)},[F]);let H=e=>{e.animationName===`eidotter-retro-boot-glow`&&V()};(0,u.useEffect)(()=>{let e=M.current;if(M.current=c,e!==c){let e=c?`powering-on`:`powering-off`;P(e),O?.(e)}},[c,O]);let U=()=>{N===`powering-on`?(P(`on`),O?.(`on`),k?.()):N===`powering-off`&&(P(`off`),O?.(`off`),A?.())},W=e=>{(e.animationName===`retro-power-on`||e.animationName===`retro-power-off`)&&U()},G=e=>{e.propertyName===`opacity`&&(N===`powering-on`||N===`powering-off`)&&U()},K={"--retro-intensity":E};i===!1&&(K[`--effect-mask-intensity`]=0);let q=N!==`off`,J=i??a===`long-reading`,Y=(0,u.useRef)(null),[X,Z]=(0,u.useState)(null),Q=o===`sampled`&&q;(0,u.useEffect)(()=>{let e=Y.current;if(!Q||!e||!g()){Z(null);return}let t=()=>{let t=_()?null:v(e);Z(e=>y(e,t)?e:t)};t();let n=typeof window.matchMedia==`function`?h.map(e=>window.matchMedia(e)):[];n.forEach(e=>e.addEventListener?.(`change`,t));let r=typeof MutationObserver>`u`?null:new MutationObserver(t),i={attributes:!0,attributeFilter:[`data-theme`,`class`,`data-effects`,`style`]};return r?.observe(document.documentElement,i),document.body&&r?.observe(document.body,i),window.addEventListener(`load`,t),()=>{n.forEach(e=>e.removeEventListener?.(`change`,t)),r?.disconnect(),window.removeEventListener(`load`,t)}},[Q,a]);let $=X!==null;return m(()=>{if(!$)return;let e=document.documentElement;return p+=1,e.setAttribute(f,`sampled`),()=>{--p,p===0&&e.removeAttribute(f)}},[$]),(0,d.jsxs)(`div`,{ref:Y,className:ee(`fixed inset-0 pointer-events-none z-[9999]`,`eidotter-retro-effects`,N===`powering-off`&&`eidotter-retro-effects--powering-off`,N===`powering-on`&&`eidotter-retro-effects--powering-on`,N===`off`&&`eidotter-retro-effects--off`,D),style:K,"data-effects":a==="default"?void 0:a,"aria-hidden":`true`,onAnimationEnd:W,onTransitionEnd:G,children:[q&&(0,d.jsxs)(d.Fragment,{children:[e&&(0,d.jsx)(`div`,{className:`eidotter-retro-effects__scanlines`}),t&&(0,d.jsx)(`div`,{className:`eidotter-retro-effects__glow`}),n&&(0,d.jsx)(`div`,{className:`eidotter-retro-effects__flicker`}),r&&(0,d.jsx)(`div`,{className:`eidotter-retro-effects__bloom`}),J&&(0,d.jsx)(`div`,{className:`eidotter-retro-effects__mask`})]}),X&&(0,d.jsx)(`svg`,{className:`eidotter-retro-effects__glow-filter`,focusable:`false`,children:(0,d.jsxs)(`filter`,{id:`eidotter-retro-glow-filter`,x:`0`,y:`0`,width:`100%`,height:`100%`,colorInterpolationFilters:`sRGB`,children:[(0,d.jsx)(b,{radius:X.tightRadius,intensity:X.tightIntensity,result:`tight`}),(0,d.jsx)(b,{radius:X.haloRadius,intensity:X.haloIntensity,result:`halo`}),(0,d.jsx)(`feBlend`,{in:`SourceGraphic`,in2:`tight`,mode:`screen`,result:`with-tight`}),(0,d.jsx)(`feBlend`,{in:`with-tight`,in2:`halo`,mode:`screen`})]})}),F&&(0,d.jsxs)(`div`,{className:`eidotter-retro-effects__boot`,onAnimationEnd:H,children:[(0,d.jsx)(`div`,{className:`eidotter-retro-effects__boot-panel eidotter-retro-effects__boot-panel--top`}),(0,d.jsx)(`div`,{className:`eidotter-retro-effects__boot-panel eidotter-retro-effects__boot-panel--bottom`}),(0,d.jsx)(`div`,{className:`eidotter-retro-effects__boot-line`}),(0,d.jsx)(`div`,{className:`eidotter-retro-effects__boot-glow`})]})]})},T.__docgenInfo={description:`CRT Monitor Effects component for authentic DOS terminal aesthetics

Features:
- Scanline overlay (horizontal lines)
- Glow vignette (phosphor edge darkening)
- Subtle CRT flicker animation (WCAG 2.3.1 compliant)
- Phosphor bloom effect (opt-in)
- Aperture grille (opt-in; on under the long-reading preset)
- Effect presets (\`preset="long-reading"\`)
- Power on/off animations
- Configurable intensity
- Respects reduced motion preferences`,methods:[],displayName:`RetroEffects`,props:{scanlines:{required:!1,tsType:{name:`boolean`},description:`Enable scanline overlay effect`,defaultValue:{value:`true`,computed:!1}},glow:{required:!1,tsType:{name:`boolean`},description:`Enable glow vignette effect`,defaultValue:{value:`true`,computed:!1}},flicker:{required:!1,tsType:{name:`boolean`},description:`Enable CRT flicker effect`,defaultValue:{value:`true`,computed:!1}},bloom:{required:!1,tsType:{name:`boolean`},description:`Enable phosphor bloom/bleeding effect.
Defaults to false for performance - adds an extra compositing layer.`,defaultValue:{value:`false`,computed:!1}},mask:{required:!1,tsType:{name:`boolean`},description:'Render the aperture grille overlay (faint vertical red, green and blue\nstripes). Its strength is the `--effect-mask-intensity` token, 0 by\ndefault, so the layer only shows once a preset or the token raises it.\nDefaults to on under `preset="long-reading"`, off otherwise (an extra\ncompositing layer, like `bloom`). Under the `dos-86` theme the grille is\non without this prop (drawn by the overlay root itself, at 0.06);\n`mask={false}` turns it off there too.'},preset:{required:!1,tsType:{name:`union`,raw:`'default' | 'long-reading'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'long-reading'`}]},description:"Effect value set. `'long-reading'` sets `data-effects=\"long-reading\"` on the\nroot, which redefines the `--effect-*` tokens for this overlay. `'default'`\n(the default) sets no attribute, so a `data-effects` on an ancestor still\napplies. Layer toggles (`scanlines`, `glow`, `flicker`, `bloom`) are not\nchanged by the preset; `mask` defaults to on under it. Under the `dos-86`\ntheme (the default since DMNC-1643 PR E) the long-reading values apply\nwhatever this prop says: they are that theme's effect values.",defaultValue:{value:`'default'`,computed:!1}},glowMode:{required:!1,tsType:{name:`union`,raw:`'element' | 'sampled'`,elements:[{name:`literal`,value:`'element'`},{name:`literal`,value:`'sampled'`}]},description:"Where the phosphor glow comes from (DMNC-1643). `'element'` (the default)\nrenders exactly as before: each component draws its own glow. `'sampled'`\nalso takes the glow from the rendered picture: an SVG filter on the html\nelement blurs the page at two radii and screens both back over it (the\n`--effect-phosphor-sampled-*` tokens; the long-reading preset carries the\nDOS-86 values). Opt-in, and client-only: the server render and the first\nclient render are the element path, and the filter is applied after mount.\nStays on the element path under `prefers-reduced-transparency: reduce`,\n`prefers-contrast: more`, in a browser without SVG filter support, on the\nlight grounds (`light`, `amber-paper`) and while powered off. One\nRetroEffects per page should use it. Costly on long pages without GPU\nrasterisation; see the component docs. Unrelated to `glow`, which is the\nvignette layer.",defaultValue:{value:`'element'`,computed:!1}},powered:{required:!1,tsType:{name:`boolean`},description:`Whether the CRT is powered on. Animates on/off transitions.`,defaultValue:{value:`true`,computed:!1}},boot:{required:!1,tsType:{name:`boolean`},description:`Play the CGA monitor boot sequence once on mount (~650ms): an amber
ignition line stretches across the center, the black raster opens from
it, and a warm phosphor glow settles. Skipped entirely under
prefers-reduced-motion. Opt-in; intended as the portfolio-wide launch
pattern (DMNC-1047).

The sequence opens with a full-viewport opaque blackout that is part of the
server-rendered HTML, so the page is never visible before the turn-on — the
animation is the reveal, with no flash of content before boot (DMNC-1184).
The open is pure CSS, so it works before hydration and with JS disabled
(the cover self-resolves; nothing stays hidden).

Assumes the default \`powered\` (on). Combining \`boot\` with \`powered={false}\`
is contradictory — the power-off transform collapses the whole overlay,
including the boot cover — so the no-flash guarantee does not apply there.`,defaultValue:{value:`false`,computed:!1}},bootOnce:{required:!1,tsType:{name:`boolean`},description:`Gate \`boot\` to once per browser tab/session (via sessionStorage). The boot
sequence plays on the first load of a tab; on later mounts within the same
tab the session flag suppresses it. A new tab/visit replays it. No-op unless
\`boot\` is also set. Falls back to playing if storage is unavailable (e.g.
private mode).

**SSR caveat (DMNC-1184):** because the no-flash cover ships in the server
HTML and the server can't read \`sessionStorage\`, suppression on a returning
visitor is decided post-hydration. The practical effect by navigation type:
- **SPA route change** (overlay lives in a persistent layout, no remount):
  never shows the cover — fully suppressed, as before.
- **Full reload / hard refresh** (a returning tab re-mounts the overlay):
  the SSR cover paints, then JS tears it down on hydration. On a fast host
  that's a brief blackout (the panels' 140ms open delay means the turn-on
  usually isn't reached before teardown); only a slow hydration lets the
  turn-on visibly replay. It never flashes bare content.
This is the deliberate trade for a flash-free first paint; eliminating the
brief returning-visitor blackout entirely needs server-visible session state
(a cookie or a pre-paint inline script), which is consumer-side.

Like \`boot\`, this is evaluated once on mount; changing it afterwards has no
effect (remount the component — e.g. via \`key\` — to re-evaluate).`,defaultValue:{value:`false`,computed:!1}},bootStorageKey:{required:!1,tsType:{name:`string`},description:`sessionStorage key used by \`bootOnce\`. Defaults to \`'eidotter:retro-boot'\`.
Override to scope the once-per-session flag independently, or to force a
replay (e.g. a fresh key in a Storybook story). Read once on mount.

Instances that mount simultaneously and share a key share one flag (the
intended single-overlay case); give each a distinct key if they must gate
independently.`,defaultValue:{value:`'eidotter:retro-boot'`,computed:!1}},intensity:{required:!1,tsType:{name:`number`},description:`Intensity of the effects (0-1)`,defaultValue:{value:`1`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name`},onPowerStateChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(state: PowerState) => void`,signature:{arguments:[{type:{name:`union`,raw:`'on' | 'powering-on' | 'powering-off' | 'off'`,elements:[{name:`literal`,value:`'on'`},{name:`literal`,value:`'powering-on'`},{name:`literal`,value:`'powering-off'`},{name:`literal`,value:`'off'`}]},name:`state`}],return:{name:`void`}}},description:`Callback when power state changes (includes animation states)`},onPowerOn:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Callback when power-on animation completes`},onPowerOff:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Callback when power-off animation completes`},onBootComplete:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Callback when the boot sequence completes (or is skipped)`}}}})))()}var D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z;function Q(){return(Q=t((()=>{E(),D=e(n(),1),c(),r(),O=a(),k={title:`Components/RetroEffects`,component:T,parameters:{layout:`fullscreen`,backgrounds:{default:`dos-amber`},projectMeta:i.RetroEffects},tags:[`autodocs`],argTypes:{scanlines:{control:`boolean`,description:`Enable scanline overlay effect`},glow:{control:`boolean`,description:`Enable glow vignette effect`},flicker:{control:`boolean`,description:`Enable CRT flicker effect`},bloom:{control:`boolean`,description:`Enable phosphor bloom/bleeding effect (opt-in for performance)`},mask:{control:`boolean`,description:`Render the aperture grille overlay (strength from --effect-mask-intensity; on by default under the long-reading preset)`},preset:{control:`inline-radio`,options:[`default`,`long-reading`],description:`Effect value set: default, or long-reading (the DOS-86 monitor, for text read for hours)`},glowMode:{control:`inline-radio`,options:[`element`,`sampled`],description:`Where the phosphor glow comes from: element (each component, the default) or sampled (an SVG filter blurs the rendered page, like the DOS-86 terminal shader)`},powered:{control:`boolean`,description:`Whether the CRT is powered on. Animates on/off transitions.`},intensity:{control:{type:`range`,min:0,max:1,step:.1},description:`Intensity of the effects (0-1)`}}},A=()=>(0,O.jsxs)(`div`,{style:{padding:`32px`,fontFamily:`var(--typography-font-family-primary)`,color:`var(--color-semantic-text-primary)`},children:[(0,O.jsx)(`h1`,{style:{color:`var(--color-cga-amber)`,marginBottom:`16px`},children:`C:\\> RETRO EFFECTS DEMO`}),(0,O.jsxs)(`div`,{style:{border:`2px solid var(--color-semantic-border-default)`,padding:`16px`,marginBottom:`16px`},children:[(0,O.jsx)(`p`,{style:{marginBottom:`8px`},children:`This component adds authentic CRT monitor effects to create the DOS terminal aesthetic.`}),(0,O.jsx)(`p`,{style:{color:`var(--color-cga-amber)`},children:`Effects include scanlines, phosphor glow, and subtle flicker.`})]}),(0,O.jsx)(`p`,{style:{color:`var(--color-semantic-text-muted)`},children:`Press any key to continue...`})]}),j={args:{scanlines:!0,glow:!0,flicker:!0,intensity:1},render:e=>(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(A,{}),(0,O.jsx)(T,{...e})]})},M={args:{scanlines:!0,glow:!1,flicker:!1,intensity:1},render:e=>(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(A,{}),(0,O.jsx)(T,{...e})]})},N={args:{scanlines:!1,glow:!0,flicker:!1,intensity:1},render:e=>(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(A,{}),(0,O.jsx)(T,{...e})]})},P={args:{scanlines:!0,glow:!0,flicker:!0,intensity:.5},render:e=>(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(A,{}),(0,O.jsx)(T,{...e})]})},F={args:{scanlines:!0,glow:!0,flicker:!0,intensity:1},render:e=>(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(A,{}),(0,O.jsx)(T,{...e})]})},I={args:{scanlines:!1,glow:!1,flicker:!1,intensity:1},render:e=>(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(A,{}),(0,O.jsx)(T,{...e})]})},L={args:{scanlines:!0,glow:!0,flicker:!0,bloom:!0,intensity:1},render:e=>(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(A,{}),(0,O.jsx)(T,{...e})]}),parameters:{docs:{description:{story:`Phosphor bloom effect creates a soft glow around lit pixels, simulating the halation and electron beam spreading of real CRT monitors.`}}}},R=()=>{let[e,t]=D.useState(!0);return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(`div`,{style:{padding:`32px`,fontFamily:`var(--typography-font-family-primary)`,color:`var(--color-semantic-text-primary)`},children:[(0,O.jsx)(`h1`,{style:{color:`var(--color-cga-amber)`,marginBottom:`16px`},children:`C:\\> POWER CYCLE DEMO`}),(0,O.jsxs)(`div`,{style:{border:`2px solid var(--color-semantic-border-default)`,padding:`16px`,marginBottom:`16px`},children:[(0,O.jsx)(`p`,{style:{marginBottom:`16px`},children:`Click the button to toggle the CRT power state.`}),(0,O.jsx)(`button`,{onClick:()=>t(!e),style:{padding:`8px 16px`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`14px`,color:e?`var(--color-cga-black)`:`var(--color-cga-amber)`,backgroundColor:e?`var(--color-cga-amber)`:`transparent`,border:`2px solid var(--color-cga-amber)`,cursor:`pointer`},children:e?`POWER OFF`:`POWER ON`}),(0,O.jsxs)(`p`,{style:{marginTop:`16px`,color:`var(--color-semantic-text-muted)`},children:[`Status: `,e?`ON`:`OFF`]})]})]}),(0,O.jsx)(T,{scanlines:!0,glow:!0,flicker:!0,bloom:!0,powered:e})]})},z={render:()=>(0,O.jsx)(R,{}),parameters:{docs:{description:{story:`Interactive demo of the CRT power on/off animations. The power-off animation collapses the screen to a horizontal line (like a real CRT), while power-on expands from the line.`}}}},B={args:{scanlines:!0,glow:!0,flicker:!0,powered:!1,intensity:1},render:e=>(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(A,{}),(0,O.jsx)(T,{...e})]}),parameters:{docs:{description:{story:`CRT in powered-off state. No effects are visible.`}}}},V=()=>{let[e,t]=D.useState(!0),[n,r]=D.useState([]),i=e=>{r(t=>[...t.slice(-4),`${new Date().toLocaleTimeString()}: ${e}`])};return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(`div`,{style:{padding:`32px`,fontFamily:`var(--typography-font-family-primary)`,color:`var(--color-semantic-text-primary)`},children:[(0,O.jsx)(`h1`,{style:{color:`var(--color-cga-amber)`,marginBottom:`16px`},children:`C:\\> POWER CALLBACKS DEMO`}),(0,O.jsxs)(`div`,{style:{border:`2px solid var(--color-semantic-border-default)`,padding:`16px`,marginBottom:`16px`},children:[(0,O.jsx)(`p`,{style:{marginBottom:`16px`},children:`Toggle power and watch the callback log below.`}),(0,O.jsx)(`button`,{onClick:()=>t(!e),style:{padding:`8px 16px`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`14px`,color:e?`var(--color-cga-black)`:`var(--color-cga-amber)`,backgroundColor:e?`var(--color-cga-amber)`:`transparent`,border:`2px solid var(--color-cga-amber)`,cursor:`pointer`},children:e?`POWER OFF`:`POWER ON`})]}),(0,O.jsxs)(`div`,{style:{border:`2px solid var(--color-semantic-border-default)`,padding:`16px`,minHeight:`120px`},children:[(0,O.jsx)(`p`,{style:{color:`var(--color-cga-amber)`,marginBottom:`8px`},children:`Callback Log:`}),n.length===0?(0,O.jsx)(`p`,{style:{color:`var(--color-semantic-text-muted)`},children:`No events yet. Toggle power to see callbacks.`}):n.map((e,t)=>(0,O.jsx)(`p`,{style:{margin:`4px 0`,fontSize:`14px`},children:e},t))]})]}),(0,O.jsx)(T,{scanlines:!0,glow:!0,flicker:!0,bloom:!0,powered:e,onPowerStateChange:e=>i(`onPowerStateChange: ${e}`),onPowerOn:()=>i(`onPowerOn: animation complete`),onPowerOff:()=>i(`onPowerOff: animation complete`)})]})},H={render:()=>(0,O.jsx)(V,{}),parameters:{docs:{description:{story:"Demonstrates the power state callbacks. `onPowerStateChange` fires for all 4 states (on, powering-on, powering-off, off), while `onPowerOn` and `onPowerOff` fire only when animations complete."}}}},U=()=>{let[e,t]=D.useState(0);return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(`div`,{style:{fontFamily:`var(--typography-font-family-primary, monospace)`,color:`var(--color-cga-amber)`,padding:32,minHeight:320},children:[(0,O.jsx)(`h1`,{style:{fontSize:28,marginBottom:12},children:`C:\\> SYSTEM READY`}),(0,O.jsx)(`p`,{style:{maxWidth:`52ch`,lineHeight:1.4},children:`The monitor just turned on: an amber line ignited across the center, the raster opened from it, and a warm phosphor glow settled — about 650ms, then out of the way.`}),(0,O.jsx)(`button`,{type:`button`,onClick:()=>t(e=>e+1),style:{marginTop:16,background:`none`,border:`1px solid var(--color-cga-amber)`,color:`var(--color-cga-amber)`,fontFamily:`inherit`,padding:`6px 12px`,cursor:`pointer`},children:`[ REBOOT ]`})]}),(0,O.jsx)(T,{boot:!0,scanlines:!0,glow:!0,flicker:!1},e)]})},W={render:()=>(0,O.jsx)(U,{}),parameters:{docs:{description:{story:"The CGA monitor turn-on (DMNC-1047): pass `boot` to play a ~650ms launch sequence once on mount — ignition line → raster opens → warm glow settles. Skipped entirely under prefers-reduced-motion. Intended as the portfolio-wide first-load pattern: consumers already mounting RetroEffects in their layout add the one prop."}}}},G=()=>{let e=`eidotter:retro-boot-story`,[t,n]=D.useState(0);return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(`div`,{style:{fontFamily:`var(--typography-font-family-primary, monospace)`,color:`var(--color-cga-amber)`,padding:32,minHeight:320},children:[(0,O.jsx)(`h1`,{style:{fontSize:32,marginBottom:16},children:`C:\\> ONCE PER VISIT`}),(0,O.jsxs)(`p`,{style:{maxWidth:`52ch`,lineHeight:1.4,marginBottom:24},children:[`With `,(0,O.jsx)(`code`,{children:`boot bootOnce`}),` the turn-on plays on the first load of a tab and is suppressed on every later mount — SPA route changes and full-reload navigation alike. Remounting the canvas will `,(0,O.jsx)(`em`,{children:`not`}),` replay it. Use the button to clear the session flag and simulate a brand-new visit.`]}),(0,O.jsx)(l,{variant:`secondary`,onPress:()=>{try{window.sessionStorage.removeItem(e)}catch{}n(e=>e+1)},children:`[ CLEAR + REMOUNT ]`})]}),(0,O.jsx)(T,{boot:!0,bootOnce:!0,bootStorageKey:e,scanlines:!0,glow:!0,flicker:!1},t)]})},K={render:()=>(0,O.jsx)(G,{}),parameters:{docs:{description:{story:"Add `bootOnce` to gate the boot sequence to once per browser tab/session (sessionStorage). It plays on the first load and is suppressed on all in-site navigation — SPA route changes AND MPA full-reload navigation — so opening a blog post or switching pages within a site does not replay it. A new tab/visit replays it; a hard refresh does not. `bootStorageKey` overrides the flag key (e.g. to force a replay). Falls back to playing if storage is unavailable."}}}},q=()=>(0,O.jsxs)(`div`,{style:{padding:`32px`,maxWidth:`45rem`,fontFamily:`var(--typography-font-family-body)`,color:`var(--color-semantic-text-primary)`,lineHeight:1.5},children:[(0,O.jsx)(`h1`,{style:{fontFamily:`var(--typography-font-family-primary)`,color:`var(--color-semantic-text-accent)`,marginBottom:`16px`},children:`C:\\> TYPE README.TXT`}),(0,O.jsx)(`p`,{style:{marginBottom:`16px`},children:`The long-reading preset is the DOS-86 monitor: the same tube, tuned for text you read for hours instead of a page you see for seconds. Scanlines are fainter and finer (0.20 at a 3px pitch) and hold still. There is no flicker. A faint aperture grille (0.06) gives the glass its texture, the corners dim by 0.22, and the bloom, when on, runs at 0.22.`}),(0,O.jsxs)(`p`,{style:{marginBottom:`16px`},children:[`Every value is an effect token, so the preset is a second value set rather than a second stylesheet. Set it with `,(0,O.jsx)(`code`,{children:`preset="long-reading"`}),` on RetroEffects, or put`,` `,(0,O.jsx)(`code`,{children:`data-effects="long-reading"`}),` on any ancestor, for example the html element.`]}),(0,O.jsx)(`p`,{style:{color:`var(--color-semantic-text-muted)`},children:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`})]}),J={args:{preset:`long-reading`,scanlines:!0,glow:!0,flicker:!0,bloom:!0,intensity:1},render:e=>(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(q,{}),(0,O.jsx)(T,{...e})]}),parameters:{docs:{description:{story:`The long-reading preset (DMNC-1643): scanlines 0.20 at a 3px pitch, still; flicker off; aperture grille 0.06; vignette 0.22 at spread 0.20; bloom 0.22. The layer toggles are unchanged (flicker stays mounted but has no animation and no opacity); the grille layer turns on with the preset. Bloom is on in this story to show its preset value.`}}}},Y={args:{scanlines:!0,glow:!0,flicker:!0,bloom:!0,mask:!0,intensity:1},render:e=>(0,O.jsxs)(`div`,{"data-effects":`long-reading`,children:[(0,O.jsx)(q,{}),(0,O.jsx)(T,{...e})]}),parameters:{docs:{description:{story:'The same preset applied from an ancestor: `data-effects="long-reading"` on a wrapper (or the html element) redefines the effect tokens for everything inside it. RetroEffects keeps its default `preset`, so it sets no attribute of its own; `mask` turns the grille layer on.'}}}},X={args:{preset:`long-reading`,glowMode:`sampled`,scanlines:!0,glow:!0,flicker:!0,intensity:1},render:e=>(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(q,{}),(0,O.jsx)(T,{...e})]}),parameters:{docs:{description:{story:'Glow sampled from the picture (DMNC-1643): `glowMode="sampled"` puts an SVG filter on the html element that blurs the rendered page at the DOS-86 radii (1.6px at 0.35, 4.5px at 0.22, the `--effect-phosphor-sampled-*` tokens) and screens both back over it, so every lit pixel glows in its own colour, text, borders and images alike. Opt-in and client-only; falls back to the element path under reduced transparency, high contrast, the light grounds, and without SVG filter support. Toggle `glowMode` to compare.'}}}},Z=[`Default`,`ScanlinesOnly`,`GlowOnly`,`SubtleEffects`,`IntenseEffects`,`NoEffects`,`WithBloom`,`PowerCycle`,`PoweredOff`,`WithCallbacks`,`BootSequence`,`SessionGatedBoot`,`LongReading`,`LongReadingScoped`,`SampledGlow`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    intensity: 1
  },
  render: args => <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    scanlines: true,
    glow: false,
    flicker: false,
    intensity: 1
  },
  render: args => <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    scanlines: false,
    glow: true,
    flicker: false,
    intensity: 1
  },
  render: args => <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    intensity: 0.5
  },
  render: args => <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    intensity: 1
  },
  render: args => <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    scanlines: false,
    glow: false,
    flicker: false,
    intensity: 1
  },
  render: args => <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    bloom: true,
    intensity: 1
  },
  render: args => <>
      <DemoContent />
      <RetroEffects {...args} />
    </>,
  parameters: {
    docs: {
      description: {
        story: 'Phosphor bloom effect creates a soft glow around lit pixels, simulating the halation and electron beam spreading of real CRT monitors.'
      }
    }
  }
}`,...L.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <PowerCycleDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo of the CRT power on/off animations. The power-off animation collapses the screen to a horizontal line (like a real CRT), while power-on expands from the line.'
      }
    }
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    powered: false,
    intensity: 1
  },
  render: args => <>
      <DemoContent />
      <RetroEffects {...args} />
    </>,
  parameters: {
    docs: {
      description: {
        story: 'CRT in powered-off state. No effects are visible.'
      }
    }
  }
}`,...B.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <CallbacksDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the power state callbacks. \`onPowerStateChange\` fires for all 4 states (on, powering-on, powering-off, off), while \`onPowerOn\` and \`onPowerOff\` fire only when animations complete.'
      }
    }
  }
}`,...H.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <BootDemo />,
  parameters: {
    docs: {
      description: {
        story: 'The CGA monitor turn-on (DMNC-1047): pass \`boot\` to play a ~650ms launch sequence once on mount — ignition line → raster opens → warm glow settles. Skipped entirely under prefers-reduced-motion. Intended as the portfolio-wide first-load pattern: consumers already mounting RetroEffects in their layout add the one prop.'
      }
    }
  }
}`,...W.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <SessionGatedBootDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Add \`bootOnce\` to gate the boot sequence to once per browser tab/session (sessionStorage). It plays on the first load and is suppressed on all in-site navigation — SPA route changes AND MPA full-reload navigation — so opening a blog post or switching pages within a site does not replay it. A new tab/visit replays it; a hard refresh does not. \`bootStorageKey\` overrides the flag key (e.g. to force a replay). Falls back to playing if storage is unavailable.'
      }
    }
  }
}`,...K.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    preset: 'long-reading',
    scanlines: true,
    glow: true,
    flicker: true,
    bloom: true,
    intensity: 1
  },
  render: args => <>
      <LongReadingContent />
      <RetroEffects {...args} />
    </>,
  parameters: {
    docs: {
      description: {
        story: 'The long-reading preset (DMNC-1643): scanlines 0.20 at a 3px pitch, still; flicker off; aperture grille 0.06; vignette 0.22 at spread 0.20; bloom 0.22. The layer toggles are unchanged (flicker stays mounted but has no animation and no opacity); the grille layer turns on with the preset. Bloom is on in this story to show its preset value.'
      }
    }
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    bloom: true,
    mask: true,
    intensity: 1
  },
  render: args => <div data-effects="long-reading">
      <LongReadingContent />
      <RetroEffects {...args} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'The same preset applied from an ancestor: \`data-effects="long-reading"\` on a wrapper (or the html element) redefines the effect tokens for everything inside it. RetroEffects keeps its default \`preset\`, so it sets no attribute of its own; \`mask\` turns the grille layer on.'
      }
    }
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    preset: 'long-reading',
    glowMode: 'sampled',
    scanlines: true,
    glow: true,
    flicker: true,
    intensity: 1
  },
  render: args => <>
      <LongReadingContent />
      <RetroEffects {...args} />
    </>,
  parameters: {
    docs: {
      description: {
        story: 'Glow sampled from the picture (DMNC-1643): \`glowMode="sampled"\` puts an SVG filter on the html element that blurs the rendered page at the DOS-86 radii (1.6px at 0.35, 4.5px at 0.22, the \`--effect-phosphor-sampled-*\` tokens) and screens both back over it, so every lit pixel glows in its own colour, text, borders and images alike. Opt-in and client-only; falls back to the element path under reduced transparency, high contrast, the light grounds, and without SVG filter support. Toggle \`glowMode\` to compare.'
      }
    }
  }
}`,...X.parameters?.docs?.source}}}})))()}Q();export{W as BootSequence,j as Default,N as GlowOnly,F as IntenseEffects,J as LongReading,Y as LongReadingScoped,I as NoEffects,z as PowerCycle,B as PoweredOff,X as SampledGlow,M as ScanlinesOnly,K as SessionGatedBoot,P as SubtleEffects,L as WithBloom,H as WithCallbacks,Z as __namedExportsOrder,k as default};