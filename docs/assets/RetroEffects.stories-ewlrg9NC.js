import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as R,R as T}from"./iframe-Cnx5oUV1.js";import{c as de}from"./registry-B_NR6ZmP.js";import"./preload-helper-Dp1pzeXC.js";const n=({scanlines:r=!0,glow:c=!0,flicker:p=!0,bloom:j=!1,powered:o=!0,intensity:i=1,className:f="",onPowerStateChange:t,onPowerOn:k,onPowerOff:E})=>{const O=R.useRef(o),[s,C]=R.useState(o?"on":"off");R.useEffect(()=>{const l=O.current;if(O.current=o,l!==o){const F=o?"powering-on":"powering-off";C(F),t==null||t(F)}},[o,t]);const S=()=>{s==="powering-on"?(C("on"),t==null||t("on"),k==null||k()):s==="powering-off"&&(C("off"),t==null||t("off"),E==null||E())},ie=l=>{l.animationName!=="retro-power-on"&&l.animationName!=="retro-power-off"||S()},le=l=>{l.propertyName==="opacity"&&(s!=="powering-on"&&s!=="powering-off"||S())},ce=["retro-effects",s==="powering-off"&&"retro-effects--powering-off",s==="powering-on"&&"retro-effects--powering-on",s==="off"&&"retro-effects--off",f].filter(Boolean).join(" "),fe={"--retro-intensity":i},pe=s!=="off";return e.jsx("div",{className:ce,style:fe,"aria-hidden":"true",onAnimationEnd:ie,onTransitionEnd:le,children:pe&&e.jsxs(e.Fragment,{children:[r&&e.jsx("div",{className:"retro-effects__scanlines"}),c&&e.jsx("div",{className:"retro-effects__glow"}),p&&e.jsx("div",{className:"retro-effects__flicker"}),j&&e.jsx("div",{className:"retro-effects__bloom"})]})})};n.__docgenInfo={description:`CRT Monitor Effects component for authentic DOS terminal aesthetics

Features:
- Scanline overlay (horizontal lines)
- Glow vignette (phosphor edge darkening)
- Subtle CRT flicker animation (WCAG 2.3.1 compliant)
- Phosphor bloom effect (opt-in)
- Power on/off animations
- Configurable intensity
- Respects reduced motion preferences`,methods:[],displayName:"RetroEffects",props:{scanlines:{required:!1,tsType:{name:"boolean"},description:"Enable scanline overlay effect",defaultValue:{value:"true",computed:!1}},glow:{required:!1,tsType:{name:"boolean"},description:"Enable glow vignette effect",defaultValue:{value:"true",computed:!1}},flicker:{required:!1,tsType:{name:"boolean"},description:"Enable CRT flicker effect",defaultValue:{value:"true",computed:!1}},bloom:{required:!1,tsType:{name:"boolean"},description:`Enable phosphor bloom/bleeding effect.
Defaults to false for performance - adds an extra compositing layer.`,defaultValue:{value:"false",computed:!1}},powered:{required:!1,tsType:{name:"boolean"},description:"Whether the CRT is powered on. Animates on/off transitions.",defaultValue:{value:"true",computed:!1}},intensity:{required:!1,tsType:{name:"number"},description:"Intensity of the effects (0-1)",defaultValue:{value:"1",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name",defaultValue:{value:"''",computed:!1}},onPowerStateChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(state: PowerState) => void",signature:{arguments:[{type:{name:"union",raw:"'on' | 'powering-on' | 'powering-off' | 'off'",elements:[{name:"literal",value:"'on'"},{name:"literal",value:"'powering-on'"},{name:"literal",value:"'powering-off'"},{name:"literal",value:"'off'"}]},name:"state"}],return:{name:"void"}}},description:"Callback when power state changes (includes animation states)"},onPowerOn:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when power-on animation completes"},onPowerOff:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when power-off animation completes"}}};const we={title:"Components/RetroEffects",component:n,parameters:{layout:"fullscreen",backgrounds:{default:"dos-amber"},projectMeta:de.RetroEffects},tags:["autodocs"],argTypes:{scanlines:{control:"boolean",description:"Enable scanline overlay effect"},glow:{control:"boolean",description:"Enable glow vignette effect"},flicker:{control:"boolean",description:"Enable CRT flicker effect"},bloom:{control:"boolean",description:"Enable phosphor bloom/bleeding effect (opt-in for performance)"},powered:{control:"boolean",description:"Whether the CRT is powered on. Animates on/off transitions."},intensity:{control:{type:"range",min:0,max:1,step:.1},description:"Intensity of the effects (0-1)"}}},a=()=>e.jsxs("div",{style:{padding:"32px",fontFamily:"var(--typography-font-family-primary)",color:"var(--color-semantic-text-primary)"},children:[e.jsx("h1",{style:{color:"var(--color-cga-amber)",marginBottom:"16px"},children:"C:\\> RETRO EFFECTS DEMO"}),e.jsxs("div",{style:{border:"2px solid var(--color-semantic-border-default)",padding:"16px",marginBottom:"16px"},children:[e.jsx("p",{style:{marginBottom:"8px"},children:"This component adds authentic CRT monitor effects to create the DOS terminal aesthetic."}),e.jsx("p",{style:{color:"var(--color-cga-amber)"},children:"Effects include scanlines, phosphor glow, and subtle flicker."})]}),e.jsx("p",{style:{color:"var(--color-semantic-text-disabled)"},children:"Press any key to continue..."})]}),d={args:{scanlines:!0,glow:!0,flicker:!0,intensity:1},render:r=>e.jsxs(e.Fragment,{children:[e.jsx(a,{}),e.jsx(n,{...r})]})},m={args:{scanlines:!0,glow:!1,flicker:!1,intensity:1},render:r=>e.jsxs(e.Fragment,{children:[e.jsx(a,{}),e.jsx(n,{...r})]})},u={args:{scanlines:!1,glow:!0,flicker:!1,intensity:1},render:r=>e.jsxs(e.Fragment,{children:[e.jsx(a,{}),e.jsx(n,{...r})]})},g={args:{scanlines:!0,glow:!0,flicker:!0,intensity:.5},render:r=>e.jsxs(e.Fragment,{children:[e.jsx(a,{}),e.jsx(n,{...r})]})},y={args:{scanlines:!0,glow:!0,flicker:!0,intensity:1},render:r=>e.jsxs(e.Fragment,{children:[e.jsx(a,{}),e.jsx(n,{...r})]})},x={args:{scanlines:!1,glow:!1,flicker:!1,intensity:1},render:r=>e.jsxs(e.Fragment,{children:[e.jsx(a,{}),e.jsx(n,{...r})]})},h={args:{scanlines:!0,glow:!0,flicker:!0,bloom:!0,intensity:1},render:r=>e.jsxs(e.Fragment,{children:[e.jsx(a,{}),e.jsx(n,{...r})]}),parameters:{docs:{description:{story:"Phosphor bloom effect creates a soft glow around lit pixels, simulating the halation and electron beam spreading of real CRT monitors."}}}},me=()=>{const[r,c]=T.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{padding:"32px",fontFamily:"var(--typography-font-family-primary)",color:"var(--color-semantic-text-primary)"},children:[e.jsx("h1",{style:{color:"var(--color-cga-amber)",marginBottom:"16px"},children:"C:\\> POWER CYCLE DEMO"}),e.jsxs("div",{style:{border:"2px solid var(--color-semantic-border-default)",padding:"16px",marginBottom:"16px"},children:[e.jsx("p",{style:{marginBottom:"16px"},children:"Click the button to toggle the CRT power state."}),e.jsx("button",{onClick:()=>c(!r),style:{padding:"8px 16px",fontFamily:"var(--typography-font-family-primary)",fontSize:"14px",color:r?"var(--color-cga-black)":"var(--color-cga-amber)",backgroundColor:r?"var(--color-cga-amber)":"transparent",border:"2px solid var(--color-cga-amber)",cursor:"pointer"},children:r?"POWER OFF":"POWER ON"}),e.jsxs("p",{style:{marginTop:"16px",color:"var(--color-semantic-text-disabled)"},children:["Status: ",r?"ON":"OFF"]})]})]}),e.jsx(n,{scanlines:!0,glow:!0,flicker:!0,bloom:!0,powered:r})]})},w={render:()=>e.jsx(me,{}),parameters:{docs:{description:{story:"Interactive demo of the CRT power on/off animations. The power-off animation collapses the screen to a horizontal line (like a real CRT), while power-on expands from the line."}}}},b={args:{scanlines:!0,glow:!0,flicker:!0,powered:!1,intensity:1},render:r=>e.jsxs(e.Fragment,{children:[e.jsx(a,{}),e.jsx(n,{...r})]}),parameters:{docs:{description:{story:"CRT in powered-off state. No effects are visible."}}}},ue=()=>{const[r,c]=T.useState(!0),[p,j]=T.useState([]),o=i=>{j(f=>[...f.slice(-4),`${new Date().toLocaleTimeString()}: ${i}`])};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{padding:"32px",fontFamily:"var(--typography-font-family-primary)",color:"var(--color-semantic-text-primary)"},children:[e.jsx("h1",{style:{color:"var(--color-cga-amber)",marginBottom:"16px"},children:"C:\\> POWER CALLBACKS DEMO"}),e.jsxs("div",{style:{border:"2px solid var(--color-semantic-border-default)",padding:"16px",marginBottom:"16px"},children:[e.jsx("p",{style:{marginBottom:"16px"},children:"Toggle power and watch the callback log below."}),e.jsx("button",{onClick:()=>c(!r),style:{padding:"8px 16px",fontFamily:"var(--typography-font-family-primary)",fontSize:"14px",color:r?"var(--color-cga-black)":"var(--color-cga-amber)",backgroundColor:r?"var(--color-cga-amber)":"transparent",border:"2px solid var(--color-cga-amber)",cursor:"pointer"},children:r?"POWER OFF":"POWER ON"})]}),e.jsxs("div",{style:{border:"2px solid var(--color-semantic-border-default)",padding:"16px",minHeight:"120px"},children:[e.jsx("p",{style:{color:"var(--color-cga-amber)",marginBottom:"8px"},children:"Callback Log:"}),p.length===0?e.jsx("p",{style:{color:"var(--color-semantic-text-disabled)"},children:"No events yet. Toggle power to see callbacks."}):p.map((i,f)=>e.jsx("p",{style:{margin:"4px 0",fontSize:"14px"},children:i},f))]})]}),e.jsx(n,{scanlines:!0,glow:!0,flicker:!0,bloom:!0,powered:r,onPowerStateChange:i=>o(`onPowerStateChange: ${i}`),onPowerOn:()=>o("onPowerOn: animation complete"),onPowerOff:()=>o("onPowerOff: animation complete")})]})},v={render:()=>e.jsx(ue,{}),parameters:{docs:{description:{story:"Demonstrates the power state callbacks. `onPowerStateChange` fires for all 4 states (on, powering-on, powering-off, off), while `onPowerOn` and `onPowerOff` fire only when animations complete."}}}};var D,N,P;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(P=(N=d.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var B,W,_;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(_=(W=m.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var q,A,V;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(V=(A=u.parameters)==null?void 0:A.docs)==null?void 0:V.source}}};var I,L,z;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(z=(L=g.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var M,G,$;y.parameters={...y.parameters,docs:{...(M=y.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...($=(G=y.parameters)==null?void 0:G.docs)==null?void 0:$.source}}};var H,K,Y;x.parameters={...x.parameters,docs:{...(H=x.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(Y=(K=x.parameters)==null?void 0:K.docs)==null?void 0:Y.source}}};var J,Q,U;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(U=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Z,ee;w.parameters={...w.parameters,docs:{...(X=w.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <PowerCycleDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo of the CRT power on/off animations. The power-off animation collapses the screen to a horizontal line (like a real CRT), while power-on expands from the line.'
      }
    }
  }
}`,...(ee=(Z=w.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var re,ne,oe;b.parameters={...b.parameters,docs:{...(re=b.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(oe=(ne=b.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var te,se,ae;v.parameters={...v.parameters,docs:{...(te=v.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => <CallbacksDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the power state callbacks. \`onPowerStateChange\` fires for all 4 states (on, powering-on, powering-off, off), while \`onPowerOn\` and \`onPowerOff\` fire only when animations complete.'
      }
    }
  }
}`,...(ae=(se=v.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};const be=["Default","ScanlinesOnly","GlowOnly","SubtleEffects","IntenseEffects","NoEffects","WithBloom","PowerCycle","PoweredOff","WithCallbacks"];export{d as Default,u as GlowOnly,y as IntenseEffects,x as NoEffects,w as PowerCycle,b as PoweredOff,m as ScanlinesOnly,g as SubtleEffects,h as WithBloom,v as WithCallbacks,be as __namedExportsOrder,we as default};
