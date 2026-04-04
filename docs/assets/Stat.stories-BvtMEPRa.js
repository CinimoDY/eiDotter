import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as se}from"./useTextScramble-CE0t0qLN.js";import{c as s}from"./cn-CvUv5FIJ.js";import{c as ne}from"./registry-BXQUvPFZ.js";import"./iframe-DLEjTnR4.js";import"./preload-helper-Dp1pzeXC.js";import"./prefersReducedMotion-lKH2k1Yv.js";const S={sm:{root:"gap-0.5",label:"text-[10px]",value:"text-lg",trend:"text-[10px]"},md:{root:"gap-1",label:"text-[10px]",value:"text-2xl",trend:"text-[10px]"},lg:{root:"gap-1.5",label:"text-xs",value:"text-4xl",trend:"text-xs"},small:{root:"gap-0.5",label:"text-[10px]",value:"text-lg",trend:"text-[10px]"},medium:{root:"gap-1",label:"text-[10px]",value:"text-2xl",trend:"text-[10px]"},large:{root:"gap-1.5",label:"text-xs",value:"text-4xl",trend:"text-xs"}},oe={up:"text-cga-bright-green",down:"text-cga-bright-red",neutral:"text-cga-amber"},de={up:"▲",down:"▼",neutral:"►"},ue={up:"increasing",down:"decreasing",neutral:"unchanged"},a=({label:Z,value:b,trend:r,trendValue:l,size:ee="md",scramble:f=!1,className:ae,...re})=>{const{text:le}=se(String(b),{speed:30,enabled:f}),te=f?le:String(b),t=S[ee]||S.md;return e.jsxs("div",{className:s("flex flex-col font-dos","eidotter-stat",t.root,ae),...re,children:[e.jsx("span",{className:s("text-cga-amber uppercase tracking-wider leading-tight",t.label),children:Z}),e.jsx("span",{className:s("text-dos-text-accent font-bold leading-none tabular-nums",t.value),children:te}),r&&e.jsxs("span",{className:s("inline-flex items-center gap-1 leading-none",oe[r],t.trend),"aria-label":`Trend: ${ue[r]}${l?`, ${l}`:""}`,children:[e.jsx("span",{className:"text-[0.8em]","aria-hidden":"true",children:de[r]}),l&&e.jsx("span",{className:"tabular-nums",children:l})]})]})};a.__docgenInfo={description:`DOS-styled Stat component for displaying metrics with optional trends.\r
Pure presentational — no React Aria needed.`,methods:[],displayName:"Stat",props:{label:{required:!0,tsType:{name:"string"},description:"The label describing the metric"},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"The metric value to display"},trend:{required:!1,tsType:{name:"union",raw:"'up' | 'down' | 'neutral'",elements:[{name:"literal",value:"'up'"},{name:"literal",value:"'down'"},{name:"literal",value:"'neutral'"}]},description:"Optional trend direction"},trendValue:{required:!1,tsType:{name:"string"},description:'Optional trend value (e.g., "+5%", "-12")'},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"Size variant",defaultValue:{value:"'md'",computed:!1}},scramble:{required:!1,tsType:{name:"boolean"},description:"Whether to animate value changes with a text scramble effect",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name"}}};const be={title:"Components/Stat",component:a,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:ne.Stat},tags:["autodocs"],argTypes:{label:{control:"text",defaultValue:"Metric"},value:{control:"text",defaultValue:"42"},trend:{control:"select",options:[void 0,"up","down","neutral"]},trendValue:{control:"text"},size:{control:"select",options:["sm","md","lg"],defaultValue:"md"}}},n={args:{label:"Total Tasks",value:"24"}},o={args:{label:"Completed",value:"18",trend:"up",trendValue:"+12%"}},d={args:{label:"Overdue",value:"3",trend:"down",trendValue:"-2"}},u={args:{label:"In Progress",value:"5",trend:"neutral",trendValue:"0%"}},i={args:{label:"Focus Time",value:"2.5h",size:"sm"}},m={args:{label:"Focus Time",value:"2.5h",size:"md"}},c={args:{label:"Focus Time",value:"2.5h",size:"lg"}},p={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"flex-end"},children:[e.jsx(a,{label:"Small",value:"42",size:"sm"}),e.jsx(a,{label:"Medium",value:"42",size:"md"}),e.jsx(a,{label:"Large",value:"42",size:"lg"})]})},x={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px"},children:[e.jsx(a,{label:"Up",value:"128",trend:"up",trendValue:"+15%"}),e.jsx(a,{label:"Down",value:"64",trend:"down",trendValue:"-8%"}),e.jsx(a,{label:"Neutral",value:"96",trend:"neutral",trendValue:"0%"})]})},g={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"24px",padding:"16px",border:"1px solid var(--color-semantic-border-default)",maxWidth:"400px"},children:[e.jsx(a,{label:"Pomodoros Today",value:"6",trend:"up",trendValue:"+2"}),e.jsx(a,{label:"Focus Time",value:"3.5h",trend:"up",trendValue:"+45m"}),e.jsx(a,{label:"Tasks Done",value:"12",trend:"neutral",trendValue:"same"}),e.jsx(a,{label:"Breaks Taken",value:"5",trend:"down",trendValue:"-1"})]})},v={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px"},children:[e.jsx(a,{label:"Count",value:1234}),e.jsx(a,{label:"Percentage",value:"87%"}),e.jsx(a,{label:"Currency",value:"$1,250"}),e.jsx(a,{label:"Time",value:"04:32"})]})};var T,h,y;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    label: 'Total Tasks',
    value: '24'
  }
}`,...(y=(h=n.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var V,j,w;o.parameters={...o.parameters,docs:{...(V=o.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    label: 'Completed',
    value: '18',
    trend: 'up',
    trendValue: '+12%'
  }
}`,...(w=(j=o.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var z,N,C;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: 'Overdue',
    value: '3',
    trend: 'down',
    trendValue: '-2'
  }
}`,...(C=(N=d.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};var D,k,F;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(A=(M=m.parameters)==null?void 0:M.docs)==null?void 0:A.source}}};var L,$,E;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'lg'
  }
}`,...(E=($=c.parameters)==null?void 0:$.docs)==null?void 0:E.source}}};var U,_,R;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-end'
  }}>
      <Stat label="Small" value="42" size="sm" />
      <Stat label="Medium" value="42" size="md" />
      <Stat label="Large" value="42" size="lg" />
    </div>
}`,...(R=(_=p.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};var W,B,G;x.parameters={...x.parameters,docs:{...(W=x.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(Y=(X=v.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const fe=["Default","TrendUp","TrendDown","TrendNeutral","Small","Medium","Large","AllSizes","AllTrends","DashboardExample","NumericValues"];export{p as AllSizes,x as AllTrends,g as DashboardExample,n as Default,c as Large,m as Medium,v as NumericValues,i as Small,d as TrendDown,u as TrendNeutral,o as TrendUp,fe as __namedExportsOrder,be as default};
