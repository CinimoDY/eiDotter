import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as le}from"./registry-DmuPb2r9.js";const a=({label:J,value:K,trend:r,trendValue:l,size:Q="medium",className:X="",...Y})=>{const Z=["stat",`stat--${Q}`,X].filter(Boolean).join(" "),ee=["stat__trend",r&&`stat__trend--${r}`].filter(Boolean).join(" "),ae=()=>{switch(r){case"up":return"▲";case"down":return"▼";case"neutral":return"►";default:return null}},re=()=>{switch(r){case"up":return"increasing";case"down":return"decreasing";case"neutral":return"unchanged";default:return""}};return e.jsxs("div",{className:Z,...Y,children:[e.jsx("span",{className:"stat__label",children:J}),e.jsx("span",{className:"stat__value",children:K}),r&&e.jsxs("span",{className:ee,"aria-label":`Trend: ${re()}${l?`, ${l}`:""}`,children:[e.jsx("span",{className:"stat__trend-icon","aria-hidden":"true",children:ae()}),l&&e.jsx("span",{className:"stat__trend-value",children:l})]})]})};a.__docgenInfo={description:`DOS-styled Stat component for displaying metrics with optional trends\r
\r
Features:\r
- Label and value display\r
- Optional trend indicator (up/down/neutral)\r
- Three sizes (small, medium, large)\r
- DOS-authentic styling with CGA colors\r
- WCAG 2.1 AA compliant`,methods:[],displayName:"Stat",props:{label:{required:!0,tsType:{name:"string"},description:"The label describing the metric"},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"The metric value to display"},trend:{required:!1,tsType:{name:"union",raw:"'up' | 'down' | 'neutral'",elements:[{name:"literal",value:"'up'"},{name:"literal",value:"'down'"},{name:"literal",value:"'neutral'"}]},description:"Optional trend direction"},trendValue:{required:!1,tsType:{name:"string"},description:'Optional trend value (e.g., "+5%", "-12")'},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"Size variant",defaultValue:{value:"'medium'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name",defaultValue:{value:"''",computed:!1}}}};const ne={title:"Components/Stat",component:a,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:le.Stat},tags:["autodocs"],argTypes:{label:{control:"text",defaultValue:"Metric"},value:{control:"text",defaultValue:"42"},trend:{control:"select",options:[void 0,"up","down","neutral"]},trendValue:{control:"text"},size:{control:"select",options:["small","medium","large"],defaultValue:"medium"}}},s={args:{label:"Total Tasks",value:"24"}},t={args:{label:"Completed",value:"18",trend:"up",trendValue:"+12%"}},n={args:{label:"Overdue",value:"3",trend:"down",trendValue:"-2"}},d={args:{label:"In Progress",value:"5",trend:"neutral",trendValue:"0%"}},o={args:{label:"Focus Time",value:"2.5h",size:"small"}},u={args:{label:"Focus Time",value:"2.5h",size:"medium"}},i={args:{label:"Focus Time",value:"2.5h",size:"large"}},c={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"flex-end"},children:[e.jsx(a,{label:"Small",value:"42",size:"small"}),e.jsx(a,{label:"Medium",value:"42",size:"medium"}),e.jsx(a,{label:"Large",value:"42",size:"large"})]})},m={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px"},children:[e.jsx(a,{label:"Up",value:"128",trend:"up",trendValue:"+15%"}),e.jsx(a,{label:"Down",value:"64",trend:"down",trendValue:"-8%"}),e.jsx(a,{label:"Neutral",value:"96",trend:"neutral",trendValue:"0%"})]})},p={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"24px",padding:"16px",border:"1px solid var(--color-semantic-border-default)",maxWidth:"400px"},children:[e.jsx(a,{label:"Pomodoros Today",value:"6",trend:"up",trendValue:"+2"}),e.jsx(a,{label:"Focus Time",value:"3.5h",trend:"up",trendValue:"+45m"}),e.jsx(a,{label:"Tasks Done",value:"12",trend:"neutral",trendValue:"same"}),e.jsx(a,{label:"Breaks Taken",value:"5",trend:"down",trendValue:"-1"})]})},v={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px"},children:[e.jsx(a,{label:"Count",value:1234}),e.jsx(a,{label:"Percentage",value:"87%"}),e.jsx(a,{label:"Currency",value:"$1,250"}),e.jsx(a,{label:"Time",value:"04:32"})]})};var g,b,x;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Total Tasks',
    value: '24'
  }
}`,...(x=(b=s.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var T,S,f;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    label: 'Completed',
    value: '18',
    trend: 'up',
    trendValue: '+12%'
  }
}`,...(f=(S=t.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var y,h,j;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: 'Overdue',
    value: '3',
    trend: 'down',
    trendValue: '-2'
  }
}`,...(j=(h=n.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};var V,w,z;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    label: 'In Progress',
    value: '5',
    trend: 'neutral',
    trendValue: '0%'
  }
}`,...(z=(w=d.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var _,C,N;o.parameters={...o.parameters,docs:{...(_=o.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'small'
  }
}`,...(N=(C=o.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var D,k,F;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'medium'
  }
}`,...(F=(k=u.parameters)==null?void 0:k.docs)==null?void 0:F.source}}};var O,A,$;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'large'
  }
}`,...($=(A=i.parameters)==null?void 0:A.docs)==null?void 0:$.source}}};var q,I,L;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-end'
  }}>
      <Stat label="Small" value="42" size="small" />
      <Stat label="Medium" value="42" size="medium" />
      <Stat label="Large" value="42" size="large" />
    </div>
}`,...(L=(I=c.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var M,P,B;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px'
  }}>
      <Stat label="Up" value="128" trend="up" trendValue="+15%" />
      <Stat label="Down" value="64" trend="down" trendValue="-8%" />
      <Stat label="Neutral" value="96" trend="neutral" trendValue="0%" />
    </div>
}`,...(B=(P=m.parameters)==null?void 0:P.docs)==null?void 0:B.source}}};var E,U,W;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(W=(U=p.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var G,R,H;v.parameters={...v.parameters,docs:{...(G=v.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px'
  }}>
      <Stat label="Count" value={1234} />
      <Stat label="Percentage" value="87%" />
      <Stat label="Currency" value="$1,250" />
      <Stat label="Time" value="04:32" />
    </div>
}`,...(H=(R=v.parameters)==null?void 0:R.docs)==null?void 0:H.source}}};const de=["Default","TrendUp","TrendDown","TrendNeutral","Small","Medium","Large","AllSizes","AllTrends","DashboardExample","NumericValues"];export{c as AllSizes,m as AllTrends,p as DashboardExample,s as Default,i as Large,u as Medium,v as NumericValues,o as Small,n as TrendDown,d as TrendNeutral,t as TrendUp,de as __namedExportsOrder,ne as default};
