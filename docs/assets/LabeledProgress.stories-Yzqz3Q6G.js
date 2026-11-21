import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./cn-CHNjZLmO.js";var a,o;function s(){return(s=e((()=>{t(),r(),a=n(),o=({label:e,value:t,max:n=100,valueSuffix:r=`%`,showValue:o=!0,className:s,"aria-label":c})=>{let l=n===0?0:Math.min(100,Math.max(0,Math.round(t/n*100)));return(0,a.jsxs)(`div`,{className:i(`eidotter-labeled-progress`,`flex items-center gap-3`,s),children:[e&&(0,a.jsx)(`span`,{className:`eidotter-labeled-progress__label font-dos text-dos-text-base text-dos-text-muted shrink-0`,children:e}),(0,a.jsx)(`div`,{role:`progressbar`,"aria-valuenow":l,"aria-valuemin":0,"aria-valuemax":100,"aria-label":c??(typeof e==`string`?e:`${l}${r}`),className:`eidotter-labeled-progress__track relative h-3 flex-1 overflow-hidden bg-dos-bg-primary border border-dos-border-disabled`,children:(0,a.jsx)(`div`,{className:`eidotter-labeled-progress__fill absolute inset-y-0 left-0 w-full bg-dos-bg-accent`,style:{transform:`scaleX(${l/100})`}})}),o&&(0,a.jsxs)(`span`,{className:`eidotter-labeled-progress__value font-dos text-dos-text-base text-dos-text-accent tabular-nums shrink-0`,children:[l,r]})]})},o.displayName=`LabeledProgress`,o.__docgenInfo={description:"DOS-styled labelled progress bar — optional leading label, a width-accurate\namber fill, and a trailing value with a custom suffix (DMNC-861).\n\nA standalone div-bar (not the block-fill `<Progress>`): `<Progress>`'s\nmonospace `█`/`░` fill renders wider than the track in some fonts, so a\nsolid-fill bar is width-accurate. The fill animates via `transform: scaleX`\n(compositor-only; reduced-motion disables it).",methods:[],displayName:`LabeledProgress`,props:{label:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Optional leading label rendered before the bar.`},value:{required:!0,tsType:{name:`number`},description:`Current value.`},max:{required:!1,tsType:{name:`number`},description:`Maximum value. @default 100`,defaultValue:{value:`100`,computed:!1}},valueSuffix:{required:!1,tsType:{name:`string`},description:`Suffix appended to the trailing value (e.g. '%', ' EUR', '/24'). @default '%'`,defaultValue:{value:`'%'`,computed:!1}},showValue:{required:!1,tsType:{name:`boolean`},description:`Show the trailing value. @default true`,defaultValue:{value:`true`,computed:!1}},"aria-label":{required:!1,tsType:{name:`string`},description:"Accessible label (falls back to a string `label`, else the percentage)."},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name.`}}}})))()}var c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{s(),c=n(),l={title:`Components/LabeledProgress`,component:o,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]}},tags:[`autodocs`]},u={args:{label:`Fortschritt`,value:84}},d={args:{label:`Filed`,value:18,max:24,valueSuffix:`/24`}},f={args:{value:50,"aria-label":`Loading`}},p={args:{label:`Coverage`,value:67,showValue:!1}},m={render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--spacing-3)`},children:[(0,c.jsx)(o,{label:`Coverage`,value:50}),(0,c.jsx)(o,{label:`Themes`,value:50}),(0,c.jsx)(o,{label:`Adoption`,value:78})]})},h=[`Default`,`WithMaxAndSuffix`,`NoLabel`,`ValueHidden`,`Stack`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Fortschritt',
    value: 84
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Filed',
    value: 18,
    max: 24,
    valueSuffix: '/24'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    value: 50,
    'aria-label': 'Loading'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Coverage',
    value: 67,
    showValue: false
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-3)'
  }}>
      <LabeledProgress label="Coverage" value={50} />
      <LabeledProgress label="Themes" value={50} />
      <LabeledProgress label="Adoption" value={78} />
    </div>
}`,...m.parameters?.docs?.source}}}})))()}g();export{u as Default,f as NoLabel,m as Stack,p as ValueHidden,d as WithMaxAndSuffix,h as __namedExportsOrder,l as default};