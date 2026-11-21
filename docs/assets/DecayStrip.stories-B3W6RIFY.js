import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{r as n,t as r}from"./registry-EhIcK3QA.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{c as a,i as o,t as s}from"./health-Cu9HTD8r.js";import{n as c,t as l}from"./DecayStrip-LVS7zutU.js";var u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{t(),c(),n(),a(),u=i(),d=9e5,f=Date.UTC(2026,0,1,12,0),p={from:f,to:f+(o.length-1)*d},m=f+4*d,h=o.map(({t:e,remaining:t})=>({t:f+e*d,remaining:t})),g=o.map(({t:e,remaining:t})=>({t:f+e*d,remaining:t*t})),_=[{id:`meal`,label:`Sample meal`,amount:40,unit:`units`,remainingShare:.42,provenance:`estimated`}],v=[{id:`dose`,label:`Sample dose`,amount:2,unit:`units`,remainingShare:.18,provenance:`modelled`}],y={title:`Components/DecayStrip`,component:l,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:r.DecayStrip,docs:{description:{component:s}}},tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},tone:{control:`select`,options:[`neutral`,`info`,`success`,`warning`,`critical`]},provenance:{control:`select`,options:[`measured`,`estimated`,`modelled`]},columns:{control:{type:`number`,min:4,max:48}},announce:{control:`boolean`}},args:{items:_,samples:h,now:m,window:p,provenance:`modelled`},decorators:[(e,{parameters:t})=>t.phone?(0,u.jsx)(`div`,{style:{width:`100%`,padding:16,boxSizing:`border-box`},children:(0,u.jsx)(e,{})}):(0,u.jsx)(`div`,{style:{width:480},children:(0,u.jsx)(e,{})})]},b={args:{tone:`info`}},x={render:()=>(0,u.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,u.jsx)(l,{items:_,samples:h,now:m,window:p,provenance:`estimated`,tone:`info`}),(0,u.jsx)(l,{items:v,samples:g,now:m,window:p,provenance:`modelled`,tone:`warning`})]})},S={args:{size:`sm`,items:[..._,...v],tone:`success`}},C={args:{items:[]}},w={args:{now:p.to+d,tone:`info`}},T={args:{announce:!0,tone:`critical`}},E={render:e=>(0,u.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[`sm`,`md`,`lg`].map(t=>(0,u.jsx)(l,{...e,size:t},t))})},D={args:{items:[..._,...v],tone:`info`},parameters:{phone:!0,layout:`fullscreen`,viewport:{defaultViewport:`phone375`}}},O=[`Default`,`MealAndDose`,`TextList`,`Empty`,`NowOutsideWindow`,`Announce`,`Sizes`,`Phone375`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    tone: 'info'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>
      <DecayStrip items={mealItems} samples={mealSamples} now={now} window={window} provenance="estimated" tone="info" />
      <DecayStrip items={doseItems} samples={doseSamples} now={now} window={window} provenance="modelled" tone="warning" />
    </div>
}`,...x.parameters?.docs?.source},description:{story:`A meal and a dose decaying side by side, each in its own tone.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'sm',
    items: [...mealItems, ...doseItems],
    tone: 'success'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    items: []
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    now: window.to + STEP,
    tone: 'info'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    announce: true,
    tone: 'critical'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>
      {(['sm', 'md', 'lg'] as const).map(s => <DecayStrip key={s} {...args} size={s} />)}
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    items: [...mealItems, ...doseItems],
    tone: 'info'
  },
  parameters: {
    phone: true,
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'phone375'
    }
  }
}`,...D.parameters?.docs?.source},description:{story:`DMNC-1573: at phone width all 24 cells fit; the from/to labels move under
the cells. FIXTURE ONLY, illustrative.`,...D.parameters?.docs?.description}}}})))()}k();export{T as Announce,b as Default,C as Empty,x as MealAndDose,w as NowOutsideWindow,D as Phone375,E as Sizes,S as TextList,O as __namedExportsOrder,y as default};