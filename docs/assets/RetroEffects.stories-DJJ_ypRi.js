import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";import{n as o,t as s}from"./registry-BqccLuet.js";var c=e((()=>{})),l,u,d,f=e((()=>{l=t(n(),1),i(),c(),u=r(),d=({scanlines:e=!0,glow:t=!0,flicker:n=!0,bloom:r=!1,powered:i=!0,intensity:o=1,className:s,onPowerStateChange:c,onPowerOn:d,onPowerOff:f})=>{let p=(0,l.useRef)(i),[m,h]=(0,l.useState)(i?`on`:`off`);(0,l.useEffect)(()=>{let e=p.current;if(p.current=i,e!==i){let e=i?`powering-on`:`powering-off`;h(e),c?.(e)}},[i,c]);let g=()=>{m===`powering-on`?(h(`on`),c?.(`on`),d?.()):m===`powering-off`&&(h(`off`),c?.(`off`),f?.())},_=e=>{e.animationName!==`retro-power-on`&&e.animationName!==`retro-power-off`||g()},v=e=>{e.propertyName===`opacity`&&(m!==`powering-on`&&m!==`powering-off`||g())},y={"--retro-intensity":o},b=m!==`off`;return(0,u.jsx)(`div`,{className:a(`fixed inset-0 pointer-events-none z-[9999]`,`eidotter-retro-effects`,m===`powering-off`&&`eidotter-retro-effects--powering-off`,m===`powering-on`&&`eidotter-retro-effects--powering-on`,m===`off`&&`eidotter-retro-effects--off`,s),style:y,"aria-hidden":`true`,onAnimationEnd:_,onTransitionEnd:v,children:b&&(0,u.jsxs)(u.Fragment,{children:[e&&(0,u.jsx)(`div`,{className:`eidotter-retro-effects__scanlines`}),t&&(0,u.jsx)(`div`,{className:`eidotter-retro-effects__glow`}),n&&(0,u.jsx)(`div`,{className:`eidotter-retro-effects__flicker`}),r&&(0,u.jsx)(`div`,{className:`eidotter-retro-effects__bloom`})]})})},d.__docgenInfo={description:`CRT Monitor Effects component for authentic DOS terminal aesthetics

Features:
- Scanline overlay (horizontal lines)
- Glow vignette (phosphor edge darkening)
- Subtle CRT flicker animation (WCAG 2.3.1 compliant)
- Phosphor bloom effect (opt-in)
- Power on/off animations
- Configurable intensity
- Respects reduced motion preferences`,methods:[],displayName:`RetroEffects`,props:{scanlines:{required:!1,tsType:{name:`boolean`},description:`Enable scanline overlay effect`,defaultValue:{value:`true`,computed:!1}},glow:{required:!1,tsType:{name:`boolean`},description:`Enable glow vignette effect`,defaultValue:{value:`true`,computed:!1}},flicker:{required:!1,tsType:{name:`boolean`},description:`Enable CRT flicker effect`,defaultValue:{value:`true`,computed:!1}},bloom:{required:!1,tsType:{name:`boolean`},description:`Enable phosphor bloom/bleeding effect.
Defaults to false for performance - adds an extra compositing layer.`,defaultValue:{value:`false`,computed:!1}},powered:{required:!1,tsType:{name:`boolean`},description:`Whether the CRT is powered on. Animates on/off transitions.`,defaultValue:{value:`true`,computed:!1}},intensity:{required:!1,tsType:{name:`number`},description:`Intensity of the effects (0-1)`,defaultValue:{value:`1`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name`},onPowerStateChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(state: PowerState) => void`,signature:{arguments:[{type:{name:`union`,raw:`'on' | 'powering-on' | 'powering-off' | 'off'`,elements:[{name:`literal`,value:`'on'`},{name:`literal`,value:`'powering-on'`},{name:`literal`,value:`'powering-off'`},{name:`literal`,value:`'off'`}]},name:`state`}],return:{name:`void`}}},description:`Callback when power state changes (includes animation states)`},onPowerOn:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Callback when power-on animation completes`},onPowerOff:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Callback when power-off animation completes`}}}})),p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k;e((()=>{f(),p=t(n(),1),o(),m=r(),h={title:`Components/RetroEffects`,component:d,parameters:{layout:`fullscreen`,backgrounds:{default:`dos-amber`},projectMeta:s.RetroEffects},tags:[`autodocs`],argTypes:{scanlines:{control:`boolean`,description:`Enable scanline overlay effect`},glow:{control:`boolean`,description:`Enable glow vignette effect`},flicker:{control:`boolean`,description:`Enable CRT flicker effect`},bloom:{control:`boolean`,description:`Enable phosphor bloom/bleeding effect (opt-in for performance)`},powered:{control:`boolean`,description:`Whether the CRT is powered on. Animates on/off transitions.`},intensity:{control:{type:`range`,min:0,max:1,step:.1},description:`Intensity of the effects (0-1)`}}},g=()=>(0,m.jsxs)(`div`,{style:{padding:`32px`,fontFamily:`var(--typography-font-family-primary)`,color:`var(--color-semantic-text-primary)`},children:[(0,m.jsx)(`h1`,{style:{color:`var(--color-cga-amber)`,marginBottom:`16px`},children:`C:\\> RETRO EFFECTS DEMO`}),(0,m.jsxs)(`div`,{style:{border:`2px solid var(--color-semantic-border-default)`,padding:`16px`,marginBottom:`16px`},children:[(0,m.jsx)(`p`,{style:{marginBottom:`8px`},children:`This component adds authentic CRT monitor effects to create the DOS terminal aesthetic.`}),(0,m.jsx)(`p`,{style:{color:`var(--color-cga-amber)`},children:`Effects include scanlines, phosphor glow, and subtle flicker.`})]}),(0,m.jsx)(`p`,{style:{color:`var(--color-semantic-text-disabled)`},children:`Press any key to continue...`})]}),_={args:{scanlines:!0,glow:!0,flicker:!0,intensity:1},render:e=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(g,{}),(0,m.jsx)(d,{...e})]})},v={args:{scanlines:!0,glow:!1,flicker:!1,intensity:1},render:e=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(g,{}),(0,m.jsx)(d,{...e})]})},y={args:{scanlines:!1,glow:!0,flicker:!1,intensity:1},render:e=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(g,{}),(0,m.jsx)(d,{...e})]})},b={args:{scanlines:!0,glow:!0,flicker:!0,intensity:.5},render:e=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(g,{}),(0,m.jsx)(d,{...e})]})},x={args:{scanlines:!0,glow:!0,flicker:!0,intensity:1},render:e=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(g,{}),(0,m.jsx)(d,{...e})]})},S={args:{scanlines:!1,glow:!1,flicker:!1,intensity:1},render:e=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(g,{}),(0,m.jsx)(d,{...e})]})},C={args:{scanlines:!0,glow:!0,flicker:!0,bloom:!0,intensity:1},render:e=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(g,{}),(0,m.jsx)(d,{...e})]}),parameters:{docs:{description:{story:`Phosphor bloom effect creates a soft glow around lit pixels, simulating the halation and electron beam spreading of real CRT monitors.`}}}},w=()=>{let[e,t]=p.useState(!0);return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(`div`,{style:{padding:`32px`,fontFamily:`var(--typography-font-family-primary)`,color:`var(--color-semantic-text-primary)`},children:[(0,m.jsx)(`h1`,{style:{color:`var(--color-cga-amber)`,marginBottom:`16px`},children:`C:\\> POWER CYCLE DEMO`}),(0,m.jsxs)(`div`,{style:{border:`2px solid var(--color-semantic-border-default)`,padding:`16px`,marginBottom:`16px`},children:[(0,m.jsx)(`p`,{style:{marginBottom:`16px`},children:`Click the button to toggle the CRT power state.`}),(0,m.jsx)(`button`,{onClick:()=>t(!e),style:{padding:`8px 16px`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`14px`,color:e?`var(--color-cga-black)`:`var(--color-cga-amber)`,backgroundColor:e?`var(--color-cga-amber)`:`transparent`,border:`2px solid var(--color-cga-amber)`,cursor:`pointer`},children:e?`POWER OFF`:`POWER ON`}),(0,m.jsxs)(`p`,{style:{marginTop:`16px`,color:`var(--color-semantic-text-disabled)`},children:[`Status: `,e?`ON`:`OFF`]})]})]}),(0,m.jsx)(d,{scanlines:!0,glow:!0,flicker:!0,bloom:!0,powered:e})]})},T={render:()=>(0,m.jsx)(w,{}),parameters:{docs:{description:{story:`Interactive demo of the CRT power on/off animations. The power-off animation collapses the screen to a horizontal line (like a real CRT), while power-on expands from the line.`}}}},E={args:{scanlines:!0,glow:!0,flicker:!0,powered:!1,intensity:1},render:e=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(g,{}),(0,m.jsx)(d,{...e})]}),parameters:{docs:{description:{story:`CRT in powered-off state. No effects are visible.`}}}},D=()=>{let[e,t]=p.useState(!0),[n,r]=p.useState([]),i=e=>{r(t=>[...t.slice(-4),`${new Date().toLocaleTimeString()}: ${e}`])};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(`div`,{style:{padding:`32px`,fontFamily:`var(--typography-font-family-primary)`,color:`var(--color-semantic-text-primary)`},children:[(0,m.jsx)(`h1`,{style:{color:`var(--color-cga-amber)`,marginBottom:`16px`},children:`C:\\> POWER CALLBACKS DEMO`}),(0,m.jsxs)(`div`,{style:{border:`2px solid var(--color-semantic-border-default)`,padding:`16px`,marginBottom:`16px`},children:[(0,m.jsx)(`p`,{style:{marginBottom:`16px`},children:`Toggle power and watch the callback log below.`}),(0,m.jsx)(`button`,{onClick:()=>t(!e),style:{padding:`8px 16px`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`14px`,color:e?`var(--color-cga-black)`:`var(--color-cga-amber)`,backgroundColor:e?`var(--color-cga-amber)`:`transparent`,border:`2px solid var(--color-cga-amber)`,cursor:`pointer`},children:e?`POWER OFF`:`POWER ON`})]}),(0,m.jsxs)(`div`,{style:{border:`2px solid var(--color-semantic-border-default)`,padding:`16px`,minHeight:`120px`},children:[(0,m.jsx)(`p`,{style:{color:`var(--color-cga-amber)`,marginBottom:`8px`},children:`Callback Log:`}),n.length===0?(0,m.jsx)(`p`,{style:{color:`var(--color-semantic-text-disabled)`},children:`No events yet. Toggle power to see callbacks.`}):n.map((e,t)=>(0,m.jsx)(`p`,{style:{margin:`4px 0`,fontSize:`14px`},children:e},t))]})]}),(0,m.jsx)(d,{scanlines:!0,glow:!0,flicker:!0,bloom:!0,powered:e,onPowerStateChange:e=>i(`onPowerStateChange: ${e}`),onPowerOn:()=>i(`onPowerOn: animation complete`),onPowerOff:()=>i(`onPowerOff: animation complete`)})]})},O={render:()=>(0,m.jsx)(D,{}),parameters:{docs:{description:{story:"Demonstrates the power state callbacks. `onPowerStateChange` fires for all 4 states (on, powering-on, powering-off, off), while `onPowerOn` and `onPowerOff` fire only when animations complete."}}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <PowerCycleDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo of the CRT power on/off animations. The power-off animation collapses the screen to a horizontal line (like a real CRT), while power-on expands from the line.'
      }
    }
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <CallbacksDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the power state callbacks. \`onPowerStateChange\` fires for all 4 states (on, powering-on, powering-off, off), while \`onPowerOn\` and \`onPowerOff\` fire only when animations complete.'
      }
    }
  }
}`,...O.parameters?.docs?.source}}},k=[`Default`,`ScanlinesOnly`,`GlowOnly`,`SubtleEffects`,`IntenseEffects`,`NoEffects`,`WithBloom`,`PowerCycle`,`PoweredOff`,`WithCallbacks`]}))();export{_ as Default,y as GlowOnly,x as IntenseEffects,S as NoEffects,T as PowerCycle,E as PoweredOff,v as ScanlinesOnly,b as SubtleEffects,C as WithBloom,O as WithCallbacks,k as __namedExportsOrder,h as default};