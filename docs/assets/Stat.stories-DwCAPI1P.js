import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as ne}from"./iframe-BU4rT9RF.js";import{u as de}from"./useTextScramble-Bz9_l-iJ.js";import{c as s}from"./cn-CvUv5FIJ.js";import{c as oe}from"./registry-CyM9n0D0.js";import"./preload-helper-Dp1pzeXC.js";import"./prefersReducedMotion-lKH2k1Yv.js";const S={sm:{root:"gap-0.5",label:"text-dos-text-xs",value:"text-dos-display-xs",trend:"text-dos-text-xs"},md:{root:"gap-1",label:"text-dos-text-sm",value:"text-dos-display-sm",trend:"text-dos-text-sm"},lg:{root:"gap-1.5",label:"text-dos-text-md",value:"text-dos-display-md",trend:"text-dos-text-md"},small:{root:"gap-0.5",label:"text-dos-text-xs",value:"text-dos-display-xs",trend:"text-dos-text-xs"},medium:{root:"gap-1",label:"text-dos-text-sm",value:"text-dos-display-sm",trend:"text-dos-text-sm"},large:{root:"gap-1.5",label:"text-dos-text-md",value:"text-dos-display-md",trend:"text-dos-text-md"}},ue={up:"text-cga-bright-green",down:"text-cga-bright-red",neutral:"text-cga-amber"},ie={up:"▲",down:"▼",neutral:"►"},me={up:"increasing",down:"decreasing",neutral:"unchanged"},a=ne.forwardRef(({label:Z,value:b,trend:r,trendValue:t,size:ee="md",scramble:f=!1,className:ae,...re},te)=>{const{text:le}=de(String(b),{speed:30,enabled:f}),se=f?le:String(b),l=S[ee]||S.md;return e.jsxs("div",{ref:te,className:s("flex flex-col font-dos","eidotter-stat",l.root,ae),...re,children:[e.jsx("span",{className:s("text-cga-amber uppercase tracking-wider leading-tight",l.label),children:Z}),e.jsx("span",{className:s("text-dos-text-accent font-bold leading-none tabular-nums",l.value),children:se}),r&&e.jsxs("span",{className:s("inline-flex items-center gap-1 leading-none",ue[r],l.trend),"aria-label":`Trend: ${me[r]}${t?`, ${t}`:""}`,children:[e.jsx("span",{className:"text-[0.8em]","aria-hidden":"true",children:ie[r]}),t&&e.jsx("span",{className:"tabular-nums",children:t})]})]})});a.displayName="Stat";a.__docgenInfo={description:`DOS-styled Stat component for displaying metrics with optional trends.\r
Pure presentational — no React Aria needed.`,methods:[],displayName:"Stat",props:{label:{required:!0,tsType:{name:"string"},description:"The label describing the metric"},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"The metric value to display"},trend:{required:!1,tsType:{name:"union",raw:"'up' | 'down' | 'neutral'",elements:[{name:"literal",value:"'up'"},{name:"literal",value:"'down'"},{name:"literal",value:"'neutral'"}]},description:"Optional trend direction"},trendValue:{required:!1,tsType:{name:"string"},description:'Optional trend value (e.g., "+5%", "-12")'},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"Size variant. Use sm/md/lg — small/medium/large are @deprecated aliases.",defaultValue:{value:"'md'",computed:!1}},scramble:{required:!1,tsType:{name:"boolean"},description:"Whether to animate value changes with a text scramble effect",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name"}}};const Se={title:"Components/Stat",component:a,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:oe.Stat},tags:["autodocs"],argTypes:{label:{control:"text",defaultValue:"Metric"},value:{control:"text",defaultValue:"42"},trend:{control:"select",options:[void 0,"up","down","neutral"]},trendValue:{control:"text"},size:{control:"select",options:["sm","md","lg"],defaultValue:"md"}}},n={args:{label:"Total Tasks",value:"24"}},d={args:{label:"Completed",value:"18",trend:"up",trendValue:"+12%"}},o={args:{label:"Overdue",value:"3",trend:"down",trendValue:"-2"}},u={args:{label:"In Progress",value:"5",trend:"neutral",trendValue:"0%"}},i={args:{label:"Focus Time",value:"2.5h",size:"sm"}},m={args:{label:"Focus Time",value:"2.5h",size:"md"}},c={args:{label:"Focus Time",value:"2.5h",size:"lg"}},p={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"flex-end"},children:[e.jsx(a,{label:"Small",value:"42",size:"sm"}),e.jsx(a,{label:"Medium",value:"42",size:"md"}),e.jsx(a,{label:"Large",value:"42",size:"lg"})]})},x={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px"},children:[e.jsx(a,{label:"Up",value:"128",trend:"up",trendValue:"+15%"}),e.jsx(a,{label:"Down",value:"64",trend:"down",trendValue:"-8%"}),e.jsx(a,{label:"Neutral",value:"96",trend:"neutral",trendValue:"0%"})]})},g={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"24px",padding:"16px",border:"1px solid var(--color-semantic-border-default)",maxWidth:"400px"},children:[e.jsx(a,{label:"Pomodoros Today",value:"6",trend:"up",trendValue:"+2"}),e.jsx(a,{label:"Focus Time",value:"3.5h",trend:"up",trendValue:"+45m"}),e.jsx(a,{label:"Tasks Done",value:"12",trend:"neutral",trendValue:"same"}),e.jsx(a,{label:"Breaks Taken",value:"5",trend:"down",trendValue:"-1"})]})},v={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px"},children:[e.jsx(a,{label:"Count",value:1234}),e.jsx(a,{label:"Percentage",value:"87%"}),e.jsx(a,{label:"Currency",value:"$1,250"}),e.jsx(a,{label:"Time",value:"04:32"})]})};var y,T,h;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: 'Total Tasks',
    value: '24'
  }
}`,...(h=(T=n.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};var V,j,w;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    label: 'Completed',
    value: '18',
    trend: 'up',
    trendValue: '+12%'
  }
}`,...(w=(j=d.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var z,N,C;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: 'Overdue',
    value: '3',
    trend: 'down',
    trendValue: '-2'
  }
}`,...(C=(N=o.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};var D,k,F;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: 'In Progress',
    value: '5',
    trend: 'neutral',
    trendValue: '0%'
  }
}`,...(F=(k=u.parameters)==null?void 0:k.docs)==null?void 0:F.source}}};var q,O,P;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'sm'
  }
}`,...(P=(O=i.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var I,M,A;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'md'
  }
}`,...(A=(M=m.parameters)==null?void 0:M.docs)==null?void 0:A.source}}};var E,L,U;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'lg'
  }
}`,...(U=(L=c.parameters)==null?void 0:L.docs)==null?void 0:U.source}}};var $,R,_;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-end'
  }}>
      <Stat label="Small" value="42" size="sm" />
      <Stat label="Medium" value="42" size="md" />
      <Stat label="Large" value="42" size="lg" />
    </div>
}`,...(_=(R=p.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};var W,B,G;x.parameters={...x.parameters,docs:{...(W=x.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px'
  }}>
      <Stat label="Up" value="128" trend="up" trendValue="+15%" />
      <Stat label="Down" value="64" trend="down" trendValue="-8%" />
      <Stat label="Neutral" value="96" trend="neutral" trendValue="0%" />
    </div>
}`,...(G=(B=x.parameters)==null?void 0:B.docs)==null?void 0:G.source}}};var H,J,K;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(K=(J=g.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Y;v.parameters={...v.parameters,docs:{...(Q=v.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px'
  }}>
      <Stat label="Count" value={1234} />
      <Stat label="Percentage" value="87%" />
      <Stat label="Currency" value="$1,250" />
      <Stat label="Time" value="04:32" />
    </div>
}`,...(Y=(X=v.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const ye=["Default","TrendUp","TrendDown","TrendNeutral","Small","Medium","Large","AllSizes","AllTrends","DashboardExample","NumericValues"];export{p as AllSizes,x as AllTrends,g as DashboardExample,n as Default,c as Large,m as Medium,v as NumericValues,i as Small,o as TrendDown,u as TrendNeutral,d as TrendUp,ye as __namedExportsOrder,Se as default};
