import{j as e}from"./jsx-runtime-D_zvdyIk.js";const s=({scanlines:n=!0,glow:T=!0,flicker:D=!0,intensity:F=1,className:_=""})=>{const O=["retro-effects",_].filter(Boolean).join(" "),N={"--retro-intensity":F};return e.jsxs("div",{className:O,style:N,"aria-hidden":"true",children:[n&&e.jsx("div",{className:"retro-effects__scanlines"}),T&&e.jsx("div",{className:"retro-effects__glow"}),D&&e.jsx("div",{className:"retro-effects__flicker"})]})};s.__docgenInfo={description:`CRT Monitor Effects component for authentic DOS terminal aesthetics

Features:
- Scanline overlay (horizontal lines)
- Glow vignette (phosphor edge darkening)
- Subtle CRT flicker animation
- Configurable intensity
- Respects reduced motion preferences`,methods:[],displayName:"RetroEffects",props:{scanlines:{required:!1,tsType:{name:"boolean"},description:"Enable scanline overlay effect",defaultValue:{value:"true",computed:!1}},glow:{required:!1,tsType:{name:"boolean"},description:"Enable glow vignette effect",defaultValue:{value:"true",computed:!1}},flicker:{required:!1,tsType:{name:"boolean"},description:"Enable CRT flicker effect",defaultValue:{value:"true",computed:!1}},intensity:{required:!1,tsType:{name:"number"},description:"Intensity of the effects (0-1)",defaultValue:{value:"1",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name",defaultValue:{value:"''",computed:!1}}}};const I={title:"Components/RetroEffects",component:s,parameters:{layout:"fullscreen",backgrounds:{default:"dos-amber"}},tags:["autodocs"],argTypes:{scanlines:{control:"boolean",description:"Enable scanline overlay effect"},glow:{control:"boolean",description:"Enable glow vignette effect"},flicker:{control:"boolean",description:"Enable CRT flicker effect"},intensity:{control:{type:"range",min:0,max:1,step:.1},description:"Intensity of the effects (0-1)"}}},r=()=>e.jsxs("div",{style:{padding:"32px",fontFamily:"var(--typography-font-family-primary)",color:"var(--color-semantic-text-primary)"},children:[e.jsx("h1",{style:{color:"var(--color-cga-amber)",marginBottom:"16px"},children:"C:\\> RETRO EFFECTS DEMO"}),e.jsxs("div",{style:{border:"2px solid var(--color-semantic-border-default)",padding:"16px",marginBottom:"16px"},children:[e.jsx("p",{style:{marginBottom:"8px"},children:"This component adds authentic CRT monitor effects to create the DOS terminal aesthetic."}),e.jsx("p",{style:{color:"var(--color-cga-amber)"},children:"Effects include scanlines, phosphor glow, and subtle flicker."})]}),e.jsx("p",{style:{color:"var(--color-semantic-text-disabled)"},children:"Press any key to continue..."})]}),t={args:{scanlines:!0,glow:!0,flicker:!0,intensity:1},render:n=>e.jsxs(e.Fragment,{children:[e.jsx(r,{}),e.jsx(s,{...n})]})},a={args:{scanlines:!0,glow:!1,flicker:!1,intensity:1},render:n=>e.jsxs(e.Fragment,{children:[e.jsx(r,{}),e.jsx(s,{...n})]})},o={args:{scanlines:!1,glow:!0,flicker:!1,intensity:1},render:n=>e.jsxs(e.Fragment,{children:[e.jsx(r,{}),e.jsx(s,{...n})]})},l={args:{scanlines:!0,glow:!0,flicker:!0,intensity:.5},render:n=>e.jsxs(e.Fragment,{children:[e.jsx(r,{}),e.jsx(s,{...n})]})},c={args:{scanlines:!0,glow:!0,flicker:!0,intensity:1},render:n=>e.jsxs(e.Fragment,{children:[e.jsx(r,{}),e.jsx(s,{...n})]})},i={args:{scanlines:!1,glow:!1,flicker:!1,intensity:1},render:n=>e.jsxs(e.Fragment,{children:[e.jsx(r,{}),e.jsx(s,{...n})]})};var f,d,u;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(u=(d=t.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var m,p,g;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(g=(p=a.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var y,x,j;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(j=(x=o.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var h,E,b;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(b=(E=l.parameters)==null?void 0:E.docs)==null?void 0:b.source}}};var v,k,w;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(w=(k=c.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var C,R,S;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(S=(R=i.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};const V=["Default","ScanlinesOnly","GlowOnly","SubtleEffects","IntenseEffects","NoEffects"];export{t as Default,o as GlowOnly,c as IntenseEffects,i as NoEffects,a as ScanlinesOnly,l as SubtleEffects,V as __namedExportsOrder,I as default};
