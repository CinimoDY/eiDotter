import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";import{n as o,t as s}from"./registry-BqccLuet.js";import{n as c,t as l}from"./useTextScramble-BcHXIWtz.js";var u=e((()=>{})),d,f,p,m,h,g,_,v=e((()=>{d=t(n(),1),l(),i(),u(),f=r(),p={sm:{root:`gap-0.5`,label:`text-dos-text-xs`,value:`text-dos-display-xs`,trend:`text-dos-text-xs`},md:{root:`gap-1`,label:`text-dos-text-sm`,value:`text-dos-display-sm`,trend:`text-dos-text-sm`},lg:{root:`gap-1.5`,label:`text-dos-text-md`,value:`text-dos-display-md`,trend:`text-dos-text-md`},small:{root:`gap-0.5`,label:`text-dos-text-xs`,value:`text-dos-display-xs`,trend:`text-dos-text-xs`},medium:{root:`gap-1`,label:`text-dos-text-sm`,value:`text-dos-display-sm`,trend:`text-dos-text-sm`},large:{root:`gap-1.5`,label:`text-dos-text-md`,value:`text-dos-display-md`,trend:`text-dos-text-md`}},m={up:`text-cga-bright-green`,down:`text-cga-bright-red`,neutral:`text-cga-amber`},h={up:`▲`,down:`▼`,neutral:`►`},g={up:`increasing`,down:`decreasing`,neutral:`unchanged`},_=(0,d.forwardRef)(({label:e,value:t,trend:n,trendValue:r,size:i=`md`,scramble:o=!1,className:s,...l},u)=>{let{text:d}=c(String(t),{speed:30,enabled:o}),_=o?d:String(t),v=p[i]||p.md;return(0,f.jsxs)(`div`,{ref:u,className:a(`flex flex-col font-dos`,`eidotter-stat`,v.root,s),...l,children:[(0,f.jsx)(`span`,{className:a(`text-cga-amber uppercase tracking-wider leading-tight`,v.label),children:e}),(0,f.jsx)(`span`,{className:a(`text-dos-text-accent font-bold leading-none tabular-nums`,v.value),children:_}),n&&(0,f.jsxs)(`span`,{className:a(`inline-flex items-center gap-1 leading-none`,m[n],v.trend),"aria-label":`Trend: ${g[n]}${r?`, ${r}`:``}`,children:[(0,f.jsx)(`span`,{className:`text-[0.8em]`,"aria-hidden":`true`,children:h[n]}),r&&(0,f.jsx)(`span`,{className:`tabular-nums`,children:r})]})]})}),_.displayName=`Stat`,_.__docgenInfo={description:`DOS-styled Stat component for displaying metrics with optional trends.\r
Pure presentational — no React Aria needed.`,methods:[],displayName:`Stat`,props:{label:{required:!0,tsType:{name:`string`},description:`The label describing the metric`},value:{required:!0,tsType:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}]},description:`The metric value to display`},trend:{required:!1,tsType:{name:`union`,raw:`'up' | 'down' | 'neutral'`,elements:[{name:`literal`,value:`'up'`},{name:`literal`,value:`'down'`},{name:`literal`,value:`'neutral'`}]},description:`Optional trend direction`},trendValue:{required:!1,tsType:{name:`string`},description:`Optional trend value (e.g., "+5%", "-12")`},size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`},{name:`literal`,value:`'lg'`},{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'large'`}]},description:`Size variant. Use sm/md/lg — small/medium/large are @deprecated aliases.`,defaultValue:{value:`'md'`,computed:!1}},scramble:{required:!1,tsType:{name:`boolean`},description:`Whether to animate value changes with a text scramble effect`,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Optional CSS class name`}}}})),y,b,x,S,C,w,T,E,D,O,k,A,j,M;e((()=>{n(),v(),o(),y=r(),b={title:`Components/Stat`,component:_,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:s.Stat},tags:[`autodocs`],argTypes:{label:{control:`text`,defaultValue:`Metric`},value:{control:`text`,defaultValue:`42`},trend:{control:`select`,options:[void 0,`up`,`down`,`neutral`]},trendValue:{control:`text`},size:{control:`select`,options:[`sm`,`md`,`lg`],defaultValue:`md`}}},x={args:{label:`Total Tasks`,value:`24`}},S={args:{label:`Completed`,value:`18`,trend:`up`,trendValue:`+12%`}},C={args:{label:`Overdue`,value:`3`,trend:`down`,trendValue:`-2`}},w={args:{label:`In Progress`,value:`5`,trend:`neutral`,trendValue:`0%`}},T={args:{label:`Focus Time`,value:`2.5h`,size:`sm`}},E={args:{label:`Focus Time`,value:`2.5h`,size:`md`}},D={args:{label:`Focus Time`,value:`2.5h`,size:`lg`}},O={render:()=>(0,y.jsxs)(`div`,{style:{display:`flex`,gap:`32px`,alignItems:`flex-end`},children:[(0,y.jsx)(_,{label:`Small`,value:`42`,size:`sm`}),(0,y.jsx)(_,{label:`Medium`,value:`42`,size:`md`}),(0,y.jsx)(_,{label:`Large`,value:`42`,size:`lg`})]})},k={render:()=>(0,y.jsxs)(`div`,{style:{display:`flex`,gap:`32px`},children:[(0,y.jsx)(_,{label:`Up`,value:`128`,trend:`up`,trendValue:`+15%`}),(0,y.jsx)(_,{label:`Down`,value:`64`,trend:`down`,trendValue:`-8%`}),(0,y.jsx)(_,{label:`Neutral`,value:`96`,trend:`neutral`,trendValue:`0%`})]})},A={render:()=>(0,y.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(2, 1fr)`,gap:`24px`,padding:`16px`,border:`1px solid var(--color-semantic-border-default)`,maxWidth:`400px`},children:[(0,y.jsx)(_,{label:`Pomodoros Today`,value:`6`,trend:`up`,trendValue:`+2`}),(0,y.jsx)(_,{label:`Focus Time`,value:`3.5h`,trend:`up`,trendValue:`+45m`}),(0,y.jsx)(_,{label:`Tasks Done`,value:`12`,trend:`neutral`,trendValue:`same`}),(0,y.jsx)(_,{label:`Breaks Taken`,value:`5`,trend:`down`,trendValue:`-1`})]})},j={render:()=>(0,y.jsxs)(`div`,{style:{display:`flex`,gap:`32px`},children:[(0,y.jsx)(_,{label:`Count`,value:1234}),(0,y.jsx)(_,{label:`Percentage`,value:`87%`}),(0,y.jsx)(_,{label:`Currency`,value:`$1,250`}),(0,y.jsx)(_,{label:`Time`,value:`04:32`})]})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Total Tasks',
    value: '24'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Completed',
    value: '18',
    trend: 'up',
    trendValue: '+12%'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Overdue',
    value: '3',
    trend: 'down',
    trendValue: '-2'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'In Progress',
    value: '5',
    trend: 'neutral',
    trendValue: '0%'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'sm'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'md'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'lg'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-end'
  }}>
      <Stat label="Small" value="42" size="sm" />
      <Stat label="Medium" value="42" size="md" />
      <Stat label="Large" value="42" size="lg" />
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px'
  }}>
      <Stat label="Up" value="128" trend="up" trendValue="+15%" />
      <Stat label="Down" value="64" trend="down" trendValue="-8%" />
      <Stat label="Neutral" value="96" trend="neutral" trendValue="0%" />
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    padding: '16px',
    border: '1px solid var(--color-semantic-border-default)',
    maxWidth: '400px'
  }}>
      <Stat label="Pomodoros Today" value="6" trend="up" trendValue="+2" />
      <Stat label="Focus Time" value="3.5h" trend="up" trendValue="+45m" />
      <Stat label="Tasks Done" value="12" trend="neutral" trendValue="same" />
      <Stat label="Breaks Taken" value="5" trend="down" trendValue="-1" />
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px'
  }}>
      <Stat label="Count" value={1234} />
      <Stat label="Percentage" value="87%" />
      <Stat label="Currency" value="$1,250" />
      <Stat label="Time" value="04:32" />
    </div>
}`,...j.parameters?.docs?.source}}},M=[`Default`,`TrendUp`,`TrendDown`,`TrendNeutral`,`Small`,`Medium`,`Large`,`AllSizes`,`AllTrends`,`DashboardExample`,`NumericValues`]}))();export{O as AllSizes,k as AllTrends,A as DashboardExample,x as Default,D as Large,E as Medium,j as NumericValues,T as Small,C as TrendDown,w as TrendNeutral,S as TrendUp,M as __namedExportsOrder,b as default};