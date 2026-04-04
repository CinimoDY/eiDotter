import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./iframe-CXx0QtOw.js";import{c as I}from"./cn-CvUv5FIJ.js";import{c as ue}from"./registry-BXQUvPFZ.js";import"./preload-helper-Dp1pzeXC.js";const D={sm:"eidotter-filter-bar--sm",md:"eidotter-filter-bar--md",lg:"eidotter-filter-bar--lg",small:"eidotter-filter-bar--sm",medium:"eidotter-filter-bar--md",large:"eidotter-filter-bar--lg"},n=({items:i,activeIds:m,defaultActiveIds:te=[],mode:F="multi",showAll:x=!1,allLabel:re="All",size:le="md",onChange:u,className:ae,...se})=>{const[ie,oe]=s.useState(te),S=s.useRef(null),_=m!==void 0,l=_?m:ie,ne=i.filter(e=>!e.disabled).map(e=>e.id),w=l.length===0,d=s.useCallback(e=>{_||oe(e),u==null||u(e)},[_,u]),ce=s.useCallback(e=>{if(F==="single"){const r=l.includes(e)?[]:[e];d(r)}else{const r=l.includes(e)?l.filter(a=>a!==e):[...l,e];d(r)}},[F,l,d]),de=s.useCallback(()=>{d([])},[d]),j=s.useCallback(()=>S.current?Array.from(S.current.querySelectorAll("button:not([disabled])")):[],[]),me=s.useCallback(e=>{const r=j(),a=r.indexOf(e.target);if(a===-1)return;let o=null;switch(e.key){case"ArrowLeft":case"ArrowUp":e.preventDefault(),o=a>0?a-1:r.length-1;break;case"ArrowRight":case"ArrowDown":e.preventDefault(),o=a<r.length-1?a+1:0;break;case"Home":e.preventDefault(),o=0;break;case"End":e.preventDefault(),o=r.length-1;break}o!==null&&r[o].focus()},[j]),C=x&&w?"__all__":l.length>0?l[0]:x?"__all__":ne[0]||null;return t.jsxs("div",{ref:S,className:I("inline-flex flex-wrap items-center gap-1 p-1 font-dos max-w-full","bg-dos-bg-secondary border border-dos-border-default rounded-dos-sm","eidotter-filter-bar",D[le]||D.md,ae),role:"toolbar",onKeyDown:me,...se,children:[x&&t.jsx("button",{type:"button",className:I("eidotter-filter-bar__item","eidotter-filter-bar__item--all",w&&"eidotter-filter-bar__item--active"),"aria-pressed":w,tabIndex:C==="__all__"?0:-1,onClick:de,children:t.jsx("span",{className:"eidotter-filter-bar__label",children:re})}),i.map(e=>{const r=l.includes(e.id),a=r&&e.color?{"--filter-bar-item-color":`var(${e.color})`}:void 0;return t.jsxs("button",{type:"button",className:I("eidotter-filter-bar__item",r&&"eidotter-filter-bar__item--active",e.disabled&&"eidotter-filter-bar__item--disabled"),"aria-pressed":r,tabIndex:C===e.id?0:-1,disabled:e.disabled,onClick:()=>ce(e.id),style:a,children:[t.jsx("span",{className:"eidotter-filter-bar__label",children:e.label}),e.count!==void 0&&t.jsx("span",{className:"eidotter-filter-bar__count","aria-label":`${e.count} items`,children:e.count})]},e.id)})]})};n.__docgenInfo={description:`DOS-styled FilterBar for multi-select or single-select content filtering.\r
Pure presentational — uses CSS transitions for phosphor effects.`,methods:[],displayName:"FilterBar",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"FilterBarItem"}],raw:"FilterBarItem[]"},description:"Array of filter items to display"},activeIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Currently active filter IDs (controlled mode)"},defaultActiveIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Default active filter IDs (uncontrolled mode)",defaultValue:{value:"[]",computed:!1}},mode:{required:!1,tsType:{name:"union",raw:"'multi' | 'single'",elements:[{name:"literal",value:"'multi'"},{name:"literal",value:"'single'"}]},description:`Selection mode: 'multi' allows multiple selections, 'single' allows one at a time.\r
Default: 'multi'`,defaultValue:{value:"'multi'",computed:!1}},showAll:{required:!1,tsType:{name:"boolean"},description:'Show an "All" toggle that selects/deselects everything. Default: false',defaultValue:{value:"false",computed:!1}},allLabel:{required:!1,tsType:{name:"string"},description:`Label for the "All" toggle. Default: 'All'`,defaultValue:{value:"'All'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"The size of the filter bar",defaultValue:{value:"'md'",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(activeIds: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"activeIds"}],return:{name:"void"}}},description:`Callback when selection changes.\r
Receives the new set of active IDs.`},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name"},"aria-label":{required:!1,tsType:{name:"string"},description:"Accessible label for the filter bar"}}};const xe={title:"Components/FilterBar",component:n,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:ue.FilterBar},tags:["autodocs"],argTypes:{mode:{control:"select",options:["multi","single"],defaultValue:"multi"},size:{control:"select",options:["small","medium","large"],defaultValue:"medium"},showAll:{control:"boolean",defaultValue:!1},onChange:{action:"selectionChanged"}}},ee=[{id:"active",label:"Active"},{id:"archived",label:"Archived"},{id:"draft",label:"Draft"}],c=[{id:"bugs",label:"Bugs",count:12},{id:"features",label:"Features",count:5},{id:"docs",label:"Docs",count:3},{id:"chores",label:"Chores",count:8}],pe=[{id:"project",label:"Projects",count:3,color:"--color-cga-bright-cyan"},{id:"area",label:"Areas",count:5,color:"--color-cga-bright-green"},{id:"resource",label:"Resources",count:12,color:"--color-cga-yellow"},{id:"archive",label:"Archives",count:8,color:"--color-cga-brown"},{id:"inbox",label:"Inbox",count:4}],p={args:{items:ee,"aria-label":"Filter by status"}},f={args:{items:ee,mode:"single","aria-label":"Filter by status"}},b={args:{items:c,"aria-label":"Filter by type"}},g={args:{items:c,showAll:!0,"aria-label":"Filter by type"}},fe=()=>{const[i,m]=s.useState(["bugs"]);return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[t.jsx(n,{items:c,activeIds:i,onChange:m,showAll:!0,"aria-label":"Filter by type"}),t.jsxs("p",{style:{color:"#AAAAAA",fontSize:"12px",fontFamily:"monospace"},children:["Active: ",i.length>0?i.join(", "):"(all)"]})]})},A={render:()=>t.jsx(fe,{})},h={args:{items:pe,showAll:!0,allLabel:"All","aria-label":"Filter by PARA category"}},y={render:()=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[t.jsxs("div",{children:[t.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Small"}),t.jsx(n,{items:c,size:"small","aria-label":"Small filter"})]}),t.jsxs("div",{children:[t.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Medium"}),t.jsx(n,{items:c,size:"medium","aria-label":"Medium filter"})]}),t.jsxs("div",{children:[t.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Large"}),t.jsx(n,{items:c,size:"large","aria-label":"Large filter"})]})]})},v={args:{items:[{id:"active",label:"Active"},{id:"archived",label:"Archived",disabled:!0},{id:"draft",label:"Draft"}],"aria-label":"Filter with disabled option"}};var T,z,B;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    items: defaultItems,
    'aria-label': 'Filter by status'
  }
}`,...(B=(z=p.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var k,W,q;f.parameters={...f.parameters,docs:{...(k=f.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    items: defaultItems,
    mode: 'single',
    'aria-label': 'Filter by status'
  }
}`,...(q=(W=f.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var R,L,N;b.parameters={...b.parameters,docs:{...(R=b.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    items: itemsWithCounts,
    'aria-label': 'Filter by type'
  }
}`,...(N=(L=b.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};var V,E,P;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    items: itemsWithCounts,
    showAll: true,
    'aria-label': 'Filter by type'
  }
}`,...(P=(E=g.parameters)==null?void 0:E.docs)==null?void 0:P.source}}};var M,O,K;A.parameters={...A.parameters,docs:{...(M=A.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <ControlledExample />
}`,...(K=(O=A.parameters)==null?void 0:O.docs)==null?void 0:K.source}}};var $,H,U;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    items: paraItems,
    showAll: true,
    allLabel: 'All',
    'aria-label': 'Filter by PARA category'
  }
}`,...(U=(H=h.parameters)==null?void 0:H.docs)==null?void 0:U.source}}};var G,J,Q;y.parameters={...y.parameters,docs:{...(G=y.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
      <div>
        <p style={{
        color: '#AAAAAA',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Small
        </p>
        <FilterBar items={itemsWithCounts} size="small" aria-label="Small filter" />
      </div>
      <div>
        <p style={{
        color: '#AAAAAA',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Medium
        </p>
        <FilterBar items={itemsWithCounts} size="medium" aria-label="Medium filter" />
      </div>
      <div>
        <p style={{
        color: '#AAAAAA',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Large
        </p>
        <FilterBar items={itemsWithCounts} size="large" aria-label="Large filter" />
      </div>
    </div>
}`,...(Q=(J=y.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,Y,Z;v.parameters={...v.parameters,docs:{...(X=v.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'active',
      label: 'Active'
    }, {
      id: 'archived',
      label: 'Archived',
      disabled: true
    }, {
      id: 'draft',
      label: 'Draft'
    }],
    'aria-label': 'Filter with disabled option'
  }
}`,...(Z=(Y=v.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};const Se=["Default","SingleSelect","WithCounts","WithAll","Controlled","PARAFilter","AllSizes","WithDisabledItem"];export{y as AllSizes,A as Controlled,p as Default,h as PARAFilter,f as SingleSelect,g as WithAll,b as WithCounts,v as WithDisabledItem,Se as __namedExportsOrder,xe as default};
