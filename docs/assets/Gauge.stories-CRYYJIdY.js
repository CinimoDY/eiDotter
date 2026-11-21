import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{r as n,t as r}from"./registry-EhIcK3QA.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{c as a,n as o,s,t as c}from"./health-Cu9HTD8r.js";import{n as l,t as u}from"./Gauge-Bzub3qhb.js";var d,f,p,m,h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{t(),l(),n(),a(),d=i(),f={title:`Components/Gauge`,component:u,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:r.Gauge,docs:{description:{component:c}}},tags:[`autodocs`],argTypes:{value:{control:{type:`range`,min:-10,max:150,step:1}},max:{control:{type:`number`}},size:{control:`select`,options:[`sm`,`md`,`lg`]},tone:{control:`select`,options:[`neutral`,`info`,`success`,`warning`,`critical`]},status:{control:`select`,options:[`ok`,`loading`,`empty`,`stale`,`unknown`]},provenance:{control:`select`,options:[void 0,`measured`,`estimated`,`modelled`]},glow:{control:`boolean`}},decorators:[(e,{parameters:t})=>t.phone?(0,d.jsx)(`div`,{style:{width:`100%`,padding:16,boxSizing:`border-box`},children:(0,d.jsx)(e,{})}):(0,d.jsx)(`div`,{style:{width:200},children:(0,d.jsx)(e,{})})]},p={args:{label:`Sample gauge`,value:s.current,secondary:`890 units`}},m={args:{label:`Sample gauge`,value:30,unit:s.unit,bands:o}},h={args:{label:`Sample gauge`,value:null}},g={args:{label:`Sample gauge`,value:s.current,status:`stale`}},_={args:{label:`Sample gauge`,value:s.current,status:`loading`}},v={args:{label:`Sample gauge`,value:12,tone:`critical`}},y={args:{label:`Sample gauge`,value:120}},b={args:{label:`Sample gauge`,value:s.current,provenance:`modelled`,glow:!0}},x={args:{label:`Sample long label`,shortLabel:`Sample`,value:s.current},decorators:[e=>(0,d.jsx)(`div`,{style:{width:110},children:(0,d.jsx)(e,{})})]},S={render:()=>(0,d.jsx)(`div`,{style:{display:`flex`,gap:24,alignItems:`flex-end`},children:[`sm`,`md`,`lg`].map(e=>(0,d.jsx)(`div`,{style:{width:160},children:(0,d.jsx)(u,{label:`Size ${e}`,value:s.current,size:e})},e))})},C={render:()=>(0,d.jsx)(`div`,{style:{display:`flex`,gap:24},children:[`neutral`,`info`,`success`,`warning`,`critical`].map(e=>(0,d.jsx)(`div`,{style:{width:160},children:(0,d.jsx)(u,{label:e,value:s.current,tone:e})},e))})},w={render:()=>(0,d.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(2, minmax(0, 1fr))`,gap:16},children:[(0,d.jsx)(u,{label:`Sample energy`,value:72,secondary:`720 units`,size:`md`}),(0,d.jsx)(u,{label:`Sample hydration`,value:48,secondary:`480 units`,size:`md`}),(0,d.jsx)(u,{label:`Sample meal`,value:55,secondary:`40 units`,size:`sm`}),(0,d.jsx)(u,{label:`Sample long label`,value:33,size:`sm`})]}),parameters:{phone:!0,layout:`fullscreen`,viewport:{defaultViewport:`phone375`}}},T=[`Default`,`WithBands`,`Unknown`,`Stale`,`Loading`,`Critical`,`Overflow`,`Modelled`,`ShortLabel`,`Sizes`,`Tones`,`LongSecondaryPhone375`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample gauge',
    value: fixtureValues.current,
    secondary: '890 units'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample gauge',
    value: 30,
    unit: fixtureValues.unit,
    bands: fixtureBands
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample gauge',
    value: null
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample gauge',
    value: fixtureValues.current,
    status: 'stale'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample gauge',
    value: fixtureValues.current,
    status: 'loading'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample gauge',
    value: 12,
    tone: 'critical'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample gauge',
    value: 120
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample gauge',
    value: fixtureValues.current,
    provenance: 'modelled',
    glow: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample long label',
    shortLabel: 'Sample',
    value: fixtureValues.current
  },
  decorators: [Story => <div style={{
    width: 110
  }}>
        <Story />
      </div>]
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 24,
    alignItems: 'flex-end'
  }}>
      {(['sm', 'md', 'lg'] as const).map(s => <div key={s} style={{
      width: 160
    }}>
          <Gauge label={\`Size \${s}\`} value={fixtureValues.current} size={s} />
        </div>)}
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 24
  }}>
      {(['neutral', 'info', 'success', 'warning', 'critical'] as const).map(t => <div key={t} style={{
      width: 160
    }}>
          <Gauge label={t} value={fixtureValues.current} tone={t} />
        </div>)}
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 16
  }}>
      <Gauge label="Sample energy" value={72} secondary="720 units" size="md" />
      <Gauge label="Sample hydration" value={48} secondary="480 units" size="md" />
      <Gauge label="Sample meal" value={55} secondary="40 units" size="sm" />
      <Gauge label="Sample long label" value={33} size="sm" />
    </div>,
  parameters: {
    phone: true,
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'phone375'
    }
  }
}`,...w.parameters?.docs?.source},description:{story:`DMNC-1573: md gauges with a long secondary keep it inside the ring hole
(the unit takes its own line); sm gauges put it under the ring; without
\`shortLabel\` the full label stays visible. FIXTURE ONLY, illustrative.`,...w.parameters?.docs?.description}}}})))()}E();export{v as Critical,p as Default,_ as Loading,w as LongSecondaryPhone375,b as Modelled,y as Overflow,x as ShortLabel,S as Sizes,g as Stale,C as Tones,h as Unknown,m as WithBands,T as __namedExportsOrder,f as default};