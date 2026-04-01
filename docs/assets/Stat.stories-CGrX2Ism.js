import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as ne}from"./useTextScramble-CP8d6l7n.js";import{c as de}from"./registry-BH4hA_P8.js";import"./iframe-BHAUrTqb.js";import"./preload-helper-Dp1pzeXC.js";import"./prefersReducedMotion-lKH2k1Yv.js";const a=({label:Q,value:v,trend:r,trendValue:l,size:X="medium",scramble:b=!1,className:Y="",...Z})=>{const{text:ee}=ne(String(v),{speed:30,enabled:b}),ae=b?ee:String(v),re=["stat",`stat--${X}`,Y].filter(Boolean).join(" "),le=["stat__trend",r&&`stat__trend--${r}`].filter(Boolean).join(" "),se=()=>{switch(r){case"up":return"▲";case"down":return"▼";case"neutral":return"►";default:return null}},te=()=>{switch(r){case"up":return"increasing";case"down":return"decreasing";case"neutral":return"unchanged";default:return""}};return e.jsxs("div",{className:re,...Z,children:[e.jsx("span",{className:"stat__label",children:Q}),e.jsx("span",{className:"stat__value",children:ae}),r&&e.jsxs("span",{className:le,"aria-label":`Trend: ${te()}${l?`, ${l}`:""}`,children:[e.jsx("span",{className:"stat__trend-icon","aria-hidden":"true",children:se()}),l&&e.jsx("span",{className:"stat__trend-value",children:l})]})]})};a.__docgenInfo={description:`DOS-styled Stat component for displaying metrics with optional trends\r
\r
Features:\r
- Label and value display\r
- Optional trend indicator (up/down/neutral)\r
- Three sizes (small, medium, large)\r
- DOS-authentic styling with CGA colors\r
- WCAG 2.1 AA compliant`,methods:[],displayName:"Stat",props:{label:{required:!0,tsType:{name:"string"},description:"The label describing the metric"},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"The metric value to display"},trend:{required:!1,tsType:{name:"union",raw:"'up' | 'down' | 'neutral'",elements:[{name:"literal",value:"'up'"},{name:"literal",value:"'down'"},{name:"literal",value:"'neutral'"}]},description:"Optional trend direction"},trendValue:{required:!1,tsType:{name:"string"},description:'Optional trend value (e.g., "+5%", "-12")'},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"Size variant",defaultValue:{value:"'medium'",computed:!1}},scramble:{required:!1,tsType:{name:"boolean"},description:"Whether to animate value changes with a text scramble effect",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name",defaultValue:{value:"''",computed:!1}}}};const ge={title:"Components/Stat",component:a,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:de.Stat},tags:["autodocs"],argTypes:{label:{control:"text",defaultValue:"Metric"},value:{control:"text",defaultValue:"42"},trend:{control:"select",options:[void 0,"up","down","neutral"]},trendValue:{control:"text"},size:{control:"select",options:["small","medium","large"],defaultValue:"medium"}}},s={args:{label:"Total Tasks",value:"24"}},t={args:{label:"Completed",value:"18",trend:"up",trendValue:"+12%"}},n={args:{label:"Overdue",value:"3",trend:"down",trendValue:"-2"}},d={args:{label:"In Progress",value:"5",trend:"neutral",trendValue:"0%"}},o={args:{label:"Focus Time",value:"2.5h",size:"small"}},u={args:{label:"Focus Time",value:"2.5h",size:"medium"}},i={args:{label:"Focus Time",value:"2.5h",size:"large"}},c={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"flex-end"},children:[e.jsx(a,{label:"Small",value:"42",size:"small"}),e.jsx(a,{label:"Medium",value:"42",size:"medium"}),e.jsx(a,{label:"Large",value:"42",size:"large"})]})},m={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px"},children:[e.jsx(a,{label:"Up",value:"128",trend:"up",trendValue:"+15%"}),e.jsx(a,{label:"Down",value:"64",trend:"down",trendValue:"-8%"}),e.jsx(a,{label:"Neutral",value:"96",trend:"neutral",trendValue:"0%"})]})},p={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"24px",padding:"16px",border:"1px solid var(--color-semantic-border-default)",maxWidth:"400px"},children:[e.jsx(a,{label:"Pomodoros Today",value:"6",trend:"up",trendValue:"+2"}),e.jsx(a,{label:"Focus Time",value:"3.5h",trend:"up",trendValue:"+45m"}),e.jsx(a,{label:"Tasks Done",value:"12",trend:"neutral",trendValue:"same"}),e.jsx(a,{label:"Breaks Taken",value:"5",trend:"down",trendValue:"-1"})]})},g={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px"},children:[e.jsx(a,{label:"Count",value:1234}),e.jsx(a,{label:"Percentage",value:"87%"}),e.jsx(a,{label:"Currency",value:"$1,250"}),e.jsx(a,{label:"Time",value:"04:32"})]})};var x,T,S;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: 'Total Tasks',
    value: '24'
  }
}`,...(S=(T=s.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};var f,h,y;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Completed',
    value: '18',
    trend: 'up',
    trendValue: '+12%'
  }
}`,...(y=(h=t.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var j,V,w;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'Overdue',
    value: '3',
    trend: 'down',
    trendValue: '-2'
  }
}`,...(w=(V=n.parameters)==null?void 0:V.docs)==null?void 0:w.source}}};var z,_,C;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: 'In Progress',
    value: '5',
    trend: 'neutral',
    trendValue: '0%'
  }
}`,...(C=(_=d.parameters)==null?void 0:_.docs)==null?void 0:C.source}}};var N,D,k;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'small'
  }
}`,...(k=(D=o.parameters)==null?void 0:D.docs)==null?void 0:k.source}}};var F,O,A;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'medium'
  }
}`,...(A=(O=u.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var q,$,I;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'large'
  }
}`,...(I=($=i.parameters)==null?void 0:$.docs)==null?void 0:I.source}}};var L,M,P;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-end'
  }}>
      <Stat label="Small" value="42" size="small" />
      <Stat label="Medium" value="42" size="medium" />
      <Stat label="Large" value="42" size="large" />
    </div>
}`,...(P=(M=c.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var B,E,U;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px'
  }}>
      <Stat label="Up" value="128" trend="up" trendValue="+15%" />
      <Stat label="Down" value="64" trend="down" trendValue="-8%" />
      <Stat label="Neutral" value="96" trend="neutral" trendValue="0%" />
    </div>
}`,...(U=(E=m.parameters)==null?void 0:E.docs)==null?void 0:U.source}}};var W,G,R;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(R=(G=p.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};var H,J,K;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px'
  }}>
      <Stat label="Count" value={1234} />
      <Stat label="Percentage" value="87%" />
      <Stat label="Currency" value="$1,250" />
      <Stat label="Time" value="04:32" />
    </div>
}`,...(K=(J=g.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};const ve=["Default","TrendUp","TrendDown","TrendNeutral","Small","Medium","Large","AllSizes","AllTrends","DashboardExample","NumericValues"];export{c as AllSizes,m as AllTrends,p as DashboardExample,s as Default,i as Large,u as Medium,g as NumericValues,o as Small,n as TrendDown,d as TrendNeutral,t as TrendUp,ve as __namedExportsOrder,ge as default};
