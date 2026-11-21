import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{r as n,t as r}from"./registry-EhIcK3QA.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{c as a,r as o,t as s}from"./health-Cu9HTD8r.js";import{n as c,t as l}from"./Gauge-Bzub3qhb.js";var u,d;function f(){return(f=e((()=>{u=t(),d=e=>(0,u.createElement)(`svg`,Object.assign({viewBox:`0 0 24 24`,width:`24`,height:`24`,fill:`currentColor`,xmlns:`http://www.w3.org/2000/svg`},e),(0,u.createElement)(`path`,{d:`M4 13h8v6h2v2h-2v2h-2v-8H2v-4h2v2Zm12 6h-2v-2h2v2Zm2-2h-2v-2h2v2Zm2-2h-2v-2h2v2Zm-6-6h8v4h-2v-2h-8V5h-2V3h2V1h2v8Zm-8 2H4V9h2v2Zm2-2H6V7h2v2Zm2-2H8V5h2v2Z`}))})))()}var p,m;function h(){return(h=e((()=>{p=t(),m=e=>(0,p.createElement)(`svg`,Object.assign({viewBox:`0 0 24 24`,width:`24`,height:`24`,fill:`currentColor`,xmlns:`http://www.w3.org/2000/svg`},e),(0,p.createElement)(`path`,{d:`M4 4h16v2H4zm0 2h2v8H4zm2 8h10v2H6zm14-8h2v4h-2zm-2 4h2v2h-2zm-2-4h2v8h-2zM2 18h18v2H2z`}))})))()}var g,_;function v(){return(v=e((()=>{g=t(),_=e=>(0,g.createElement)(`svg`,Object.assign({viewBox:`0 0 24 24`,width:`24`,height:`24`,fill:`currentColor`,xmlns:`http://www.w3.org/2000/svg`},e),(0,g.createElement)(`path`,{d:`M10 2h4v4h-4zM3 7h18v2H3zm6 2h2v7H9zm4 0h2v7h-2zm-4 7h2v6H9zm4 0h2v6h-2zm-2-2h2v2h-2z`}))})))()}var y,b;function x(){return(x=e((()=>{y=t(),b=e=>(0,y.createElement)(`svg`,Object.assign({viewBox:`0 0 24 24`,width:`24`,height:`24`,fill:`currentColor`,xmlns:`http://www.w3.org/2000/svg`},e),(0,y.createElement)(`path`,{d:`M13 22h-2v-2h2v2Zm-2-2H9v-2h2v2Zm4 0h-2v-2h2v2Zm-6-2H7v-2h2v2Zm8 0h-2v-2h2v2ZM7 16H5v-2h2v2Zm12 0h-2v-2h2v2ZM5 14H3v-2h2v2Zm16 0h-2v-2h2v2ZM3 12H1V6h2v6Zm20 0h-2V6h2v6ZM13 8h-2V6h2v2ZM5 6H3V4h2v2Zm6 0H9V4h2v2Zm4 0h-2V4h2v2Zm6 0h-2V4h2v2ZM9 4H5V2h4v2Zm10 0h-4V2h4v2Z`}))})))()}function S(e){let t=null;for(let n of e){let e=T.indexOf(n.tone);(t===null||e<t.rank)&&(t={id:n.id,rank:e})}return t&&T[t.rank]!==`neutral`?t.id:null}function C({tiles:e}){let t=S(e);return(0,w.jsx)(`div`,{className:`grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-3xl p-4`,children:e.map((e,n)=>{let r=E[n%E.length],i=e.id===t;return(0,w.jsxs)(`div`,{"data-emphasised":i?`true`:void 0,className:`min-w-0 flex flex-col items-center gap-1 p-2 border-2 ${i?`border-dos-border-error`:`border-transparent`}`,children:[(0,w.jsx)(r,{width:24,height:24,"aria-hidden":`true`,focusable:`false`}),(0,w.jsx)(l,{label:e.label,value:e.value,tone:e.tone,size:`sm`}),i&&(0,w.jsx)(`span`,{className:`text-dos-text-xs`,children:`>> PRIORITY`})]},e.id)})})}var w,T,E,D,O,k,A,j,M,N,P,F,I;function L(){return(L=e((()=>{t(),f(),h(),v(),x(),c(),n(),a(),w=i(),T=[`critical`,`warning`,`info`,`success`,`neutral`],E=[d,m,_,b],D={title:`Compositions/GlanceStrip`,component:C,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:r.Gauge,docs:{description:{component:s}}},tags:[`autodocs`]},[O,k,A,j]=o.glance,M={args:{tiles:[O,k,A,{...j,tone:`neutral`}]}},N={args:{tiles:[O,k,A,j]}},P={args:{tiles:o.glance.map(e=>({...e,tone:`neutral`}))}},F={args:{tiles:[O,k,A,j]},parameters:{layout:`fullscreen`,viewport:{defaultViewport:`phone320`}}},I=[`Default`,`TwoCritical`,`AllNeutral`,`Phone320`],M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    tiles: [first, second, third, {
      ...fourth,
      tone: 'neutral' as const
    }]
  }
}`,...M.parameters?.docs?.source},description:{story:`One critical tile, emphasised.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    tiles: [first, second, third, fourth]
  }
}`,...N.parameters?.docs?.source},description:{story:`Two critical tiles: exactly one is emphasised (the first in list order).`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    tiles: fixtureDashboard.glance.map(t => ({
      ...t,
      tone: 'neutral' as const
    }))
  }
}`,...P.parameters?.docs?.source},description:{story:`No tile above neutral: nothing is emphasised.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    tiles: [first, second, third, fourth]
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'phone320'
    }
  }
}`,...F.parameters?.docs?.source}}}})))()}L();export{P as AllNeutral,M as Default,F as Phone320,N as TwoCritical,I as __namedExportsOrder,D as default};