import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{r,t as i}from"./registry-EhIcK3QA.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./cn-CHNjZLmO.js";import{n as c,t as l}from"./useTextScramble-Da-_48fW.js";var u,d,f,p,m,h,g;function _(){return(_=t((()=>{u=e(n(),1),l(),o(),d=a(),f={sm:{root:`gap-0.5`,label:`text-dos-text-base`,value:`text-dos-display-xs`,trend:`text-dos-text-base`},md:{root:`gap-1`,label:`text-dos-text-base`,value:`text-dos-display-sm`,trend:`text-dos-text-base`},lg:{root:`gap-1.5`,label:`text-dos-text-base`,value:`text-dos-display-md`,trend:`text-dos-text-base`},small:{root:`gap-0.5`,label:`text-dos-text-base`,value:`text-dos-display-xs`,trend:`text-dos-text-base`},medium:{root:`gap-1`,label:`text-dos-text-base`,value:`text-dos-display-sm`,trend:`text-dos-text-base`},large:{root:`gap-1.5`,label:`text-dos-text-base`,value:`text-dos-display-md`,trend:`text-dos-text-base`}},p={up:`text-dos-text-success`,down:`text-dos-text-error`,neutral:`text-dos-text-brand`},m={up:`▲`,down:`▼`,neutral:`►`},h={up:`increasing`,down:`decreasing`,neutral:`unchanged`},g=(0,u.forwardRef)(({label:e,value:t,trend:n,trendValue:r,size:i=`md`,scramble:a=!1,unit:o,note:l,target:u,className:g,..._},v)=>{let{text:y}=c(String(t),{speed:30,enabled:a}),b=a?y:String(t),x=f[i]||f.md;return(0,d.jsxs)(`div`,{ref:v,className:s(`flex flex-col font-dos`,`eidotter-stat`,x.root,g),..._,children:[(0,d.jsx)(`span`,{className:s(`text-dos-text-brand uppercase tracking-wider leading-tight`,x.label),children:e}),(0,d.jsxs)(`span`,{className:s(`font-dos-heading text-dos-text-accent font-bold leading-none tabular-nums`,x.value),children:[b,o&&(0,d.jsxs)(`span`,{className:`eidotter-stat__unit text-[0.5em] font-normal text-dos-text-brand`,children:[` `,o]})]}),l&&(0,d.jsx)(`span`,{className:`eidotter-stat__note text-dos-text-muted leading-tight ${x.trend}`,children:l}),u&&(0,d.jsx)(`span`,{className:`eidotter-stat__target text-dos-text-brand leading-tight ${x.trend}`,children:u}),n&&(0,d.jsxs)(`span`,{className:s(`inline-flex items-center gap-1 leading-none`,p[n],x.trend),"aria-label":`Trend: ${h[n]}${r?`, ${r}`:``}`,children:[(0,d.jsx)(`span`,{className:`text-[0.8em]`,"aria-hidden":`true`,children:m[n]}),r&&(0,d.jsx)(`span`,{className:`tabular-nums`,children:r})]})]})}),g.displayName=`Stat`,g.__docgenInfo={description:`DOS-styled Stat component for displaying metrics with optional trends.\r
Pure presentational — no React Aria needed.`,methods:[],displayName:`Stat`,props:{label:{required:!0,tsType:{name:`string`},description:`The label describing the metric`},value:{required:!0,tsType:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}]},description:`The metric value to display`},trend:{required:!1,tsType:{name:`union`,raw:`'up' | 'down' | 'neutral'`,elements:[{name:`literal`,value:`'up'`},{name:`literal`,value:`'down'`},{name:`literal`,value:`'neutral'`}]},description:`Optional trend direction`},trendValue:{required:!1,tsType:{name:`string`},description:`Optional trend value (e.g., "+5%", "-12")`},size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`},{name:`literal`,value:`'lg'`},{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'large'`}]},description:`Size variant. Use sm/md/lg — small/medium/large are @deprecated aliases.`,defaultValue:{value:`'md'`,computed:!1}},unit:{required:!1,tsType:{name:`string`},description:`Optional unit rendered after the value (e.g., "kg")`},note:{required:!1,tsType:{name:`string`},description:`Optional muted note rendered below the value`},target:{required:!1,tsType:{name:`string`},description:`Optional target text rendered below the value; the consumer supplies the copy`},scramble:{required:!1,tsType:{name:`boolean`},description:`Whether to animate value changes with a text scramble effect`,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Optional CSS class name`}}}})))()}var v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=t((()=>{n(),_(),r(),v=a(),y={title:`Components/Stat`,component:g,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:i.Stat},tags:[`autodocs`],argTypes:{label:{control:`text`,defaultValue:`Metric`},value:{control:`text`,defaultValue:`42`},trend:{control:`select`,options:[void 0,`up`,`down`,`neutral`]},trendValue:{control:`text`},size:{control:`select`,options:[`sm`,`md`,`lg`],defaultValue:`md`}}},b={args:{label:`Total Tasks`,value:`24`}},x={args:{label:`Completed`,value:`18`,trend:`up`,trendValue:`+12%`}},S={args:{label:`Overdue`,value:`3`,trend:`down`,trendValue:`-2`}},C={args:{label:`In Progress`,value:`5`,trend:`neutral`,trendValue:`0%`}},w={args:{label:`Focus Time`,value:`2.5h`,size:`sm`}},T={args:{label:`Focus Time`,value:`2.5h`,size:`md`}},E={args:{label:`Focus Time`,value:`2.5h`,size:`lg`}},D={render:()=>(0,v.jsxs)(`div`,{style:{display:`flex`,gap:`32px`,alignItems:`flex-end`},children:[(0,v.jsx)(g,{label:`Small`,value:`42`,size:`sm`}),(0,v.jsx)(g,{label:`Medium`,value:`42`,size:`md`}),(0,v.jsx)(g,{label:`Large`,value:`42`,size:`lg`})]})},O={render:()=>(0,v.jsxs)(`div`,{style:{display:`flex`,gap:`32px`},children:[(0,v.jsx)(g,{label:`Up`,value:`128`,trend:`up`,trendValue:`+15%`}),(0,v.jsx)(g,{label:`Down`,value:`64`,trend:`down`,trendValue:`-8%`}),(0,v.jsx)(g,{label:`Neutral`,value:`96`,trend:`neutral`,trendValue:`0%`})]})},k={render:()=>(0,v.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(2, 1fr)`,gap:`24px`,padding:`16px`,border:`1px solid var(--color-semantic-border-default)`,maxWidth:`400px`},children:[(0,v.jsx)(g,{label:`Pomodoros Today`,value:`6`,trend:`up`,trendValue:`+2`}),(0,v.jsx)(g,{label:`Focus Time`,value:`3.5h`,trend:`up`,trendValue:`+45m`}),(0,v.jsx)(g,{label:`Tasks Done`,value:`12`,trend:`neutral`,trendValue:`same`}),(0,v.jsx)(g,{label:`Breaks Taken`,value:`5`,trend:`down`,trendValue:`-1`})]})},A={render:()=>(0,v.jsxs)(`div`,{style:{display:`flex`,gap:`32px`},children:[(0,v.jsx)(g,{label:`Count`,value:1234}),(0,v.jsx)(g,{label:`Percentage`,value:`87%`}),(0,v.jsx)(g,{label:`Currency`,value:`$1,250`}),(0,v.jsx)(g,{label:`Time`,value:`04:32`})]})},j={args:{label:`Sample reading`,value:`104`,unit:`units`,note:`sample note`,target:`target 70-140`}},M=[`Default`,`TrendUp`,`TrendDown`,`TrendNeutral`,`Small`,`Medium`,`Large`,`AllSizes`,`AllTrends`,`DashboardExample`,`NumericValues`,`WithUnitNoteTarget`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Total Tasks',
    value: '24'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Completed',
    value: '18',
    trend: 'up',
    trendValue: '+12%'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Overdue',
    value: '3',
    trend: 'down',
    trendValue: '-2'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'In Progress',
    value: '5',
    trend: 'neutral',
    trendValue: '0%'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'sm'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'md'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'lg'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-end'
  }}>
      <Stat label="Small" value="42" size="sm" />
      <Stat label="Medium" value="42" size="md" />
      <Stat label="Large" value="42" size="lg" />
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px'
  }}>
      <Stat label="Up" value="128" trend="up" trendValue="+15%" />
      <Stat label="Down" value="64" trend="down" trendValue="-8%" />
      <Stat label="Neutral" value="96" trend="neutral" trendValue="0%" />
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px'
  }}>
      <Stat label="Count" value={1234} />
      <Stat label="Percentage" value="87%" />
      <Stat label="Currency" value="$1,250" />
      <Stat label="Time" value="04:32" />
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sample reading',
    value: '104',
    unit: 'units',
    note: 'sample note',
    target: 'target 70-140'
  }
}`,...j.parameters?.docs?.source}}}})))()}N();export{D as AllSizes,O as AllTrends,k as DashboardExample,b as Default,E as Large,T as Medium,A as NumericValues,w as Small,S as TrendDown,C as TrendNeutral,x as TrendUp,j as WithUnitNoteTarget,M as __namedExportsOrder,y as default};