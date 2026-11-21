import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{r as n,t as r}from"./registry-EhIcK3QA.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{c as a,o,t as s}from"./health-Cu9HTD8r.js";import{n as c,t as l}from"./RangeBar-BgG-P8-T.js";var u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{t(),c(),n(),a(),u=i(),d={title:`Components/RangeBar`,component:l,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:r.RangeBar,docs:{description:{component:s}}},tags:[`autodocs`],argTypes:{orientation:{control:`select`,options:[`vertical`,`horizontal`]},size:{control:`select`,options:[`sm`,`md`,`lg`]},showLegend:{control:`boolean`},minSegmentShare:{control:{type:`number`}},labelThreshold:{control:{type:`number`}},locale:{control:`text`}}},f=o.map(({band:e,share:t},n)=>({id:`band-${n}`,label:e.label,share:t,tone:e.tone,bound:`${e.from}-${Number.isFinite(e.to)?e.to:`max`}`,duration:`${Math.round(t/100*24)} h`})),p=[{id:`a`,label:`Sample band A`,share:2,tone:`critical`,bound:`< 10`,duration:`30 min`},{id:`b`,label:`Sample band B`,share:3,tone:`warning`,bound:`10-20`,duration:`45 min`},{id:`c`,label:`Sample band C`,share:61,tone:`success`,bound:`20-70`,duration:`14 h`},{id:`d`,label:`Sample band D`,share:29,tone:`info`,bound:`70-90`,duration:`7 h`},{id:`e`,label:`Sample band E`,share:5,tone:`warning`,bound:`> 90`,duration:`1 h`}],m={args:{segments:f}},h={args:{segments:p,target:{segmentId:`c`,minShare:70,label:`Sample goal 70%`}}},g={args:{segments:p,orientation:`horizontal`},decorators:[e=>(0,u.jsx)(`div`,{style:{width:420},children:(0,u.jsx)(e,{})})]},_={args:{segments:[{id:`a`,label:`Sample band A`,share:60,tone:`success`},{id:`b`,label:`Sample band B`,share:39.2,tone:`info`}]}},v={args:{segments:p,showLegend:!1}},y={args:{segments:p,locale:`de`,labels:{other:`Rest`}}},b={render:()=>(0,u.jsx)(`div`,{style:{display:`flex`,gap:32,alignItems:`flex-start`},children:[`sm`,`md`,`lg`].map(e=>(0,u.jsx)(l,{segments:p,size:e,showLegend:!1},e))})},x={args:{segments:p,target:{segmentId:`c`,minShare:70,label:`Sample goal 70%`}}},S=p.map(e=>({...e,label:`${e.label}, a longer synthetic name`})),C={args:{segments:S,size:`lg`,locale:`de`,target:{segmentId:`c`,minShare:70,label:`Sample goal`},containerWidth:300},argTypes:{containerWidth:{control:{type:`range`,min:200,max:720,step:10}}},render:({containerWidth:e,...t})=>(0,u.jsx)(`div`,{style:{width:e,maxWidth:`100%`},children:(0,u.jsx)(l,{...t})})},w=[{id:`a`,label:`Unterhalb des Zielbereichs`,share:4,tone:`critical`,bound:`< 10`,duration:`58 Min./Tag`},{id:`b`,label:`Zielbereich`,share:70,tone:`success`,bound:`10-20`,duration:`16 Std. 48 Min./Tag`},{id:`c`,label:`Oberhalb des Zielbereichs`,share:26,tone:`warning`,bound:`> 20`,duration:`6 Std. 14 Min./Tag`}],T={args:{segments:w,size:`md`,locale:`de`,containerWidth:260},argTypes:{containerWidth:{control:{type:`range`,min:160,max:720,step:10}}},render:({containerWidth:e,...t})=>(0,u.jsx)(`div`,{style:{width:e,maxWidth:`100%`},children:(0,u.jsx)(l,{...t})})},E=[`Default`,`FiveBands`,`Horizontal`,`WithOtherRemainder`,`NoLegend`,`GermanLocale`,`Sizes`,`Print`,`NarrowLegend`,`NarrowLongNames`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    segments: fromFixture
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    segments: five,
    target: {
      segmentId: 'c',
      minShare: 70,
      label: 'Sample goal 70%'
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    segments: five,
    orientation: 'horizontal'
  },
  decorators: [Story => <div style={{
    width: 420
  }}>
        <Story />
      </div>]
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    segments: [{
      id: 'a',
      label: 'Sample band A',
      share: 60,
      tone: 'success'
    }, {
      id: 'b',
      label: 'Sample band B',
      share: 39.2,
      tone: 'info'
    }]
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    segments: five,
    showLegend: false
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    segments: five,
    locale: 'de',
    labels: {
      other: 'Rest'
    }
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 32,
    alignItems: 'flex-start'
  }}>
      {(['sm', 'md', 'lg'] as const).map(s => <RangeBar key={s} segments={five} size={s} showLegend={false} />)}
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    segments: five,
    target: {
      segmentId: 'c',
      minShare: 70,
      label: 'Sample goal 70%'
    }
  }
}`,...x.parameters?.docs?.source},description:{story:`Print this story to PDF in black and white: all bands stay distinguishable.`,...x.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    segments: longNames,
    size: 'lg',
    locale: 'de',
    target: {
      segmentId: 'c',
      minShare: 70,
      label: 'Sample goal'
    },
    containerWidth: 300
  },
  argTypes: {
    containerWidth: {
      control: {
        type: 'range',
        min: 200,
        max: 720,
        step: 10
      }
    }
  },
  render: ({
    containerWidth,
    ...args
  }) => <div style={{
    width: containerWidth,
    maxWidth: '100%'
  }}>
      <RangeBar {...args} />
    </div>
}`,...C.parameters?.docs?.source},description:{story:`DMNC-1610: in a narrow container the vertical legend wraps under the bar and
names and bounds wrap instead of truncating. DMNC-1612: the name wins width;
when name and meta do not fit on one line, the percent and duration move
under the name (right-aligned) before a name wraps, and a word never breaks
unless it alone is wider than the row. \`containerWidth\` (px) is a story
knob, not a prop; the percent and target label keep a gap ("61 % Ziel").`,...C.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    segments: germanLong,
    size: 'md',
    locale: 'de',
    containerWidth: 260
  },
  argTypes: {
    containerWidth: {
      control: {
        type: 'range',
        min: 160,
        max: 720,
        step: 10
      }
    }
  },
  render: ({
    containerWidth,
    ...args
  }) => <div style={{
    width: containerWidth,
    maxWidth: '100%'
  }}>
      <RangeBar {...args} />
    </div>
}`,...T.parameters?.docs?.source},description:{story:`DMNC-1612: long German names next to long duration text in a narrow
container. Names never break mid-word; the percent and duration wrap under
the name instead. Illustrative fixture data only.`,...T.parameters?.docs?.description}}}})))()}D();export{m as Default,h as FiveBands,y as GermanLocale,g as Horizontal,C as NarrowLegend,T as NarrowLongNames,v as NoLegend,x as Print,b as Sizes,_ as WithOtherRemainder,E as __namedExportsOrder,d as default};