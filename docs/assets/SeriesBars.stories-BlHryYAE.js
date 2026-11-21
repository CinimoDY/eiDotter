import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{r as n,t as r}from"./registry-EhIcK3QA.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{a,c as o,t as s}from"./health-Cu9HTD8r.js";import{n as c,t as l}from"./SeriesBars-B7KMHmYL.js";var u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{t(),c(),n(),o(),u=i(),d={title:`Components/SeriesBars`,component:l,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:r.SeriesBars,docs:{description:{component:s}}},tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},max:{control:{type:`number`}},goal:{control:{type:`number`}},tickEvery:{control:{type:`number`,min:1}},unit:{control:`text`,description:`Unit appended to values and the goal in the summary and value table`},format:{control:`object`,description:`formatValue options: digits, percent, signed`},locale:{control:`text`}},decorators:[(e,{parameters:t})=>t.phone?(0,u.jsx)(`div`,{style:{width:`100%`,padding:16,boxSizing:`border-box`},children:(0,u.jsx)(e,{})}):(0,u.jsx)(`div`,{style:{width:360},children:(0,u.jsx)(e,{})})]},f=a.map(e=>({label:`${e.t+1}`,value:e.value})),p={args:{points:f,max:100}},m={args:{points:f,max:100,goal:60,goalLabel:`Sample goal 60`,toneFor:[{from:-1/0,tone:`warning`},{from:60,tone:`success`}],tickEvery:2}},h={args:{points:f.map((e,t)=>t===4?{...e,value:null}:e),max:100,goal:60,goalLabel:`Sample goal 60`}},g={args:{points:f,max:100,locale:`de`,labels:{unknown:`unbekannt`}}},_={render:()=>(0,u.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[`sm`,`md`,`lg`].map(e=>(0,u.jsx)(l,{points:f,max:100,goal:60,goalLabel:e,size:e},e))})},v={args:{points:f,max:100,goal:60,goalLabel:`Sample goal 60`,toneFor:[{from:-1/0,tone:`warning`},{from:60,tone:`success`}]}},y=f.map((e,t)=>({...e,value:30+t*6})),b={args:{points:y,max:100,goal:75,goalLabel:`Sample goal 75`},parameters:{phone:!0,layout:`fullscreen`,viewport:{defaultViewport:`phone375`}}},x=Array.from({length:14},(e,t)=>({label:`${t+1}.`,value:[58,64,71,66,73,69,75,62,70,77,68,72,74,79][t]})),S={args:{points:x,max:100,goal:70,goalLabel:`Sample goal 70 %`,unit:`%`,locale:`de`,tickEvery:3,toneFor:[{from:-1/0,tone:`warning`},{from:70,tone:`success`}]}},C={args:S.args,parameters:{phone:!0,layout:`fullscreen`,viewport:{defaultViewport:`phone375`}}},w=[`Default`,`WithGoal`,`WithGap`,`GermanLocale`,`Sizes`,`Print`,`GoalLabelPhone375`,`PercentWithUnit`,`PercentWithUnitPhone375`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    points,
    max: 100
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    points,
    max: 100,
    goal: 60,
    goalLabel: 'Sample goal 60',
    toneFor: [{
      from: -Infinity,
      tone: 'warning'
    }, {
      from: 60,
      tone: 'success'
    }],
    tickEvery: 2
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    points: points.map((p, i) => i === 4 ? {
      ...p,
      value: null
    } : p),
    max: 100,
    goal: 60,
    goalLabel: 'Sample goal 60'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    points,
    max: 100,
    locale: 'de',
    labels: {
      unknown: 'unbekannt'
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>
      {(['sm', 'md', 'lg'] as const).map(s => <SeriesBars key={s} points={points} max={100} goal={60} goalLabel={s} size={s} />)}
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    points,
    max: 100,
    goal: 60,
    goalLabel: 'Sample goal 60',
    toneFor: [{
      from: -Infinity,
      tone: 'warning'
    }, {
      from: 60,
      tone: 'success'
    }]
  }
}`,...v.parameters?.docs?.source},description:{story:`Print this story to PDF in black and white: tones stay distinguishable by pattern.`,...v.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    points: risingPoints,
    max: 100,
    goal: 75,
    goalLabel: 'Sample goal 75'
  },
  parameters: {
    phone: true,
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'phone375'
    }
  }
}`,...b.parameters?.docs?.source},description:{story:`DMNC-1573: the goal tag sits in a reserved band above the plot, never over a bar.`,...b.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    points: dailyShares,
    max: 100,
    goal: 70,
    goalLabel: 'Sample goal 70 %',
    unit: '%',
    locale: 'de',
    tickEvery: 3,
    toneFor: [{
      from: -Infinity,
      tone: 'warning'
    }, {
      from: 70,
      tone: 'success'
    }]
  }
}`,...S.parameters?.docs?.source},description:{story:'DMNC-1610: `unit` (or `format`) carries into the value table and summary\n("Sample goal 70 %"); with `tickEvery` > 1 the ticks overflow into their empty\nneighbours instead of truncating, the first and last pinned to the plot edges.',...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: PercentWithUnit.args,
  parameters: {
    phone: true,
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'phone375'
    }
  }
}`,...C.parameters?.docs?.source},description:{story:`DMNC-1610 at phone width: sparse ticks read in full, the goal tag keeps its band.`,...C.parameters?.docs?.description}}}})))()}T();export{p as Default,g as GermanLocale,b as GoalLabelPhone375,S as PercentWithUnit,C as PercentWithUnitPhone375,v as Print,_ as Sizes,h as WithGap,m as WithGoal,w as __namedExportsOrder,d as default};