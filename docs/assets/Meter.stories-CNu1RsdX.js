import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{r as n,t as r}from"./registry-EhIcK3QA.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{c as a,n as o,s,t as c}from"./health-Cu9HTD8r.js";import{i as l,n as u,r as d,t as f}from"./MeterGroup-DH1Ds-Tp.js";var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{t(),l(),u(),n(),a(),p=i(),m={title:`Components/Meter`,component:d,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:r.Meter,docs:{description:{component:c}}},tags:[`autodocs`],argTypes:{value:{control:{type:`range`,min:-10,max:150,step:1}},max:{control:{type:`number`}},orientation:{control:`radio`,options:[`vertical`,`horizontal`]},size:{control:`select`,options:[`xs`,`sm`,`md`]},tone:{control:`select`,options:[`neutral`,`info`,`success`,`warning`,`critical`]},pattern:{control:`select`,options:[void 0,`solid`,`dither`,`hatch`,`dotted`]},segments:{control:{type:`number`,min:0,max:40}},showValue:{control:`boolean`}},decorators:[(e,{parameters:t})=>t.phone?(0,p.jsx)(`div`,{style:{width:`100%`,padding:16,boxSizing:`border-box`},children:(0,p.jsx)(e,{})}):(0,p.jsx)(`div`,{style:{width:240},children:(0,p.jsx)(e,{})})]},h={args:{label:`Sample meter`,value:s.current,unit:s.unit}},g={args:{label:`Sample meter`,value:s.current,orientation:`horizontal`,optimal:[50,75]}},_={args:{label:`Sample meter`,value:40,optimal:70}},v={args:{label:`Sample meter`,value:40,optimal:[50,75],size:`md`}},y={args:{label:`Sample meter`,value:30,unit:s.unit,bands:o}},b={args:{label:`Sample meter`,value:95,segments:10,tone:`success`}},x={args:{label:`Sample meter`,value:null}},S={args:{label:`Sample meter`,value:120,optimal:70}},C={args:{label:`Sample meter`,value:12,tone:`critical`}},w={args:{label:`Sample long label`,shortLabel:`Sample`,value:s.current}},T={render:()=>(0,p.jsx)(`div`,{style:{display:`flex`,gap:24,alignItems:`flex-end`},children:[`neutral`,`info`,`success`,`warning`,`critical`].map(e=>(0,p.jsx)(d,{label:e,value:s.current,tone:e},e))})},E={render:()=>(0,p.jsx)(`div`,{style:{display:`flex`,gap:24,alignItems:`flex-end`},children:[`xs`,`sm`,`md`].map(e=>(0,p.jsx)(d,{label:`Size ${e}`,value:s.current,size:e},e))})},D=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`].map((e,t)=>({label:e,value:[20,35,50,62,48,80,95][t],optimal:[50,75]})),O={render:()=>(0,p.jsx)(`div`,{style:{width:320},children:(0,p.jsx)(f,{"aria-label":`Sample week`,items:D})})},k={render:()=>(0,p.jsx)(`div`,{style:{width:480},children:(0,p.jsx)(f,{layout:`grid`,columns:3,items:D.map(e=>({...e,orientation:`horizontal`}))})})},A=(e,t)=>{let n=e.querySelector(`[data-testid="${t}"] .eidotter-meter-group__layout`);if(!n)throw Error(`GridColumnsNarrow: no layout element in ${t}`);return getComputedStyle(n).gridTemplateColumns.split(` `).filter(Boolean).length},j={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:`max-content`},children:[(0,p.jsx)(`div`,{style:{width:`40rem`},"data-testid":`wide`,children:(0,p.jsx)(f,{layout:`grid`,columns:4,items:D.slice(0,4).map(e=>({...e,orientation:`horizontal`,size:`xs`}))})}),(0,p.jsx)(`div`,{style:{width:`15rem`},"data-testid":`narrow`,children:(0,p.jsx)(f,{layout:`grid`,columns:4,items:D.slice(0,4).map(e=>({...e,orientation:`horizontal`,size:`xs`}))})})]}),play:async({canvasElement:e})=>{let t=A(e,`wide`),n=A(e,`narrow`);if(t!==4)throw Error(`GridColumnsNarrow: wide group has ${t} columns, expected 4`);if(n!==2)throw Error(`GridColumnsNarrow: narrow group has ${n} columns, expected 2 (auto-fit)`)}},M=[{label:`Small scale`,value:50,max:100},{label:`Large scale`,value:50,max:200}],N={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,gap:32},children:[(0,p.jsx)(f,{items:M}),(0,p.jsx)(f,{sharedMax:!0,items:M})]})},P={render:()=>(0,p.jsx)(f,{items:[]})},F=D.map(e=>({...e,unit:`units`})),I={render:()=>(0,p.jsx)(f,{"aria-label":`Sample week`,items:F}),parameters:{phone:!0,layout:`fullscreen`,viewport:{defaultViewport:`phone375`}}},L={render:()=>(0,p.jsx)(f,{layout:`grid`,columns:2,items:F.map(e=>({...e,orientation:`horizontal`,size:`xs`}))}),parameters:{phone:!0,layout:`fullscreen`,viewport:{defaultViewport:`phone375`}}},R=[`Default`,`Horizontal`,`OptimalTick`,`OptimalRange`,`WithBands`,`Segmented`,`Unknown`,`Overflow`,`Critical`,`ShortLabel`,`Tones`,`Sizes`,`SevenVertical320`,`GroupGrid`,`GridColumnsNarrow`,`SharedMax`,`EmptyGroup`,`GroupWithUnitsPhone375`,`HorizontalGridPhone375`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample meter',
    value: fixtureValues.current,
    unit: fixtureValues.unit
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample meter',
    value: fixtureValues.current,
    orientation: 'horizontal',
    optimal: [50, 75]
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample meter',
    value: 40,
    optimal: 70
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample meter',
    value: 40,
    optimal: [50, 75],
    size: 'md'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample meter',
    value: 30,
    unit: fixtureValues.unit,
    bands: fixtureBands
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample meter',
    value: 95,
    segments: 10,
    tone: 'success'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample meter',
    value: null
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample meter',
    value: 120,
    optimal: 70
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample meter',
    value: 12,
    tone: 'critical'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample long label',
    shortLabel: 'Sample',
    value: fixtureValues.current
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 24,
    alignItems: 'flex-end'
  }}>
      {(['neutral', 'info', 'success', 'warning', 'critical'] as const).map(t => <Meter key={t} label={t} value={fixtureValues.current} tone={t} />)}
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 24,
    alignItems: 'flex-end'
  }}>
      {(['xs', 'sm', 'md'] as const).map(s => <Meter key={s} label={\`Size \${s}\`} value={fixtureValues.current} size={s} />)}
    </div>
}`,...E.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 320
  }}>
      <MeterGroup aria-label="Sample week" items={week} />
    </div>
}`,...O.parameters?.docs?.source},description:{story:`320 px viewport check: seven vertical meters must not overflow horizontally.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 480
  }}>
      <MeterGroup layout="grid" columns={3} items={week.map(m => ({
      ...m,
      orientation: 'horizontal' as const
    }))} />
    </div>
}`,...k.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: 'max-content'
  }}>
      <div style={{
      width: '40rem'
    }} data-testid="wide">
        <MeterGroup layout="grid" columns={4} items={week.slice(0, 4).map(m => ({
        ...m,
        orientation: 'horizontal' as const,
        size: 'xs' as const
      }))} />
      </div>
      <div style={{
      width: '15rem'
    }} data-testid="narrow">
        <MeterGroup layout="grid" columns={4} items={week.slice(0, 4).map(m => ({
        ...m,
        orientation: 'horizontal' as const,
        size: 'xs' as const
      }))} />
      </div>
    </div>,
  play: async ({
    canvasElement
  }: {
    canvasElement: HTMLElement;
  }) => {
    const wide = gridColumnCount(canvasElement, 'wide');
    const narrow = gridColumnCount(canvasElement, 'narrow');
    if (wide !== 4) throw new Error(\`GridColumnsNarrow: wide group has \${wide} columns, expected 4\`);
    if (narrow !== 2) throw new Error(\`GridColumnsNarrow: narrow group has \${narrow} columns, expected 2 (auto-fit)\`);
  }
}`,...j.parameters?.docs?.source},description:{story:`A fixed \`columns\` grid gives way to auto-fit (6rem minimum) when the group
is under 30rem wide. The play function reads the computed column count: 4
in the wide group, 2 in the 15rem group (the rule was dead before the inner
layout element, because it styled its own container).`,...j.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 32
  }}>
      <MeterGroup items={mixedMax} />
      <MeterGroup sharedMax items={mixedMax} />
    </div>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <MeterGroup items={[]} />
}`,...P.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <MeterGroup aria-label="Sample week" items={weekWithUnits} />,
  parameters: {
    phone: true,
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'phone375'
    }
  }
}`,...I.parameters?.docs?.source},description:{story:`DMNC-1573: vertical meters in a row size to their reading instead of
collapsing to their min-width; in a narrow group the unit stacks under the
number, and without \`shortLabel\` the full label stays (truncated).`,...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <MeterGroup layout="grid" columns={2} items={weekWithUnits.map(m => ({
    ...m,
    orientation: 'horizontal' as const,
    size: 'xs' as const
  }))} />,
  parameters: {
    phone: true,
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'phone375'
    }
  }
}`,...L.parameters?.docs?.source},description:{story:`DMNC-1573: the horizontal orientation in a phone-width grid is unchanged.`,...L.parameters?.docs?.description}}}})))()}z();export{C as Critical,h as Default,P as EmptyGroup,j as GridColumnsNarrow,k as GroupGrid,I as GroupWithUnitsPhone375,g as Horizontal,L as HorizontalGridPhone375,v as OptimalRange,_ as OptimalTick,S as Overflow,b as Segmented,O as SevenVertical320,N as SharedMax,w as ShortLabel,E as Sizes,T as Tones,x as Unknown,y as WithBands,R as __namedExportsOrder,m as default};