import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./iframe-BU4rT9RF.js";import{$ as C}from"./Button-Ctavax2i.js";import{c as F}from"./cn-CvUv5FIJ.js";import{c as pe}from"./registry-CyM9n0D0.js";import"./preload-helper-Dp1pzeXC.js";import"./useFocusRing-BUJkGnC-.js";import"./Hidden-BtSPQEnR.js";import"./usePress-Bjtlcj0Z.js";import"./index-CqfCC26D.js";import"./index-C2QVYWFi.js";const T={sm:"eidotter-filter-bar--sm",md:"eidotter-filter-bar--md",lg:"eidotter-filter-bar--lg",small:"eidotter-filter-bar--sm",medium:"eidotter-filter-bar--md",large:"eidotter-filter-bar--lg"},n=({items:i,activeIds:m,defaultActiveIds:te=[],mode:I="multi",showAll:y=!1,allLabel:ae="All",size:le="md",onChange:u,className:se,...ie})=>{const[oe,ne]=s.useState(te),S=s.useRef(null),_=m!==void 0,a=_?m:oe,ce=i.filter(e=>!e.disabled).map(e=>e.id),w=a.length===0,d=s.useCallback(e=>{_||ne(e),u==null||u(e)},[_,u]),de=s.useCallback(e=>{if(I==="single"){const t=a.includes(e)?[]:[e];d(t)}else{const t=a.includes(e)?a.filter(l=>l!==e):[...a,e];d(t)}},[I,a,d]),me=s.useCallback(()=>{d([])},[d]),D=s.useCallback(()=>S.current?Array.from(S.current.querySelectorAll("button:not([disabled])")):[],[]),ue=s.useCallback(e=>{const t=D(),l=t.indexOf(e.target);if(l===-1)return;let o=null;switch(e.key){case"ArrowLeft":case"ArrowUp":e.preventDefault(),o=l>0?l-1:t.length-1;break;case"ArrowRight":case"ArrowDown":e.preventDefault(),o=l<t.length-1?l+1:0;break;case"Home":e.preventDefault(),o=0;break;case"End":e.preventDefault(),o=t.length-1;break}o!==null&&t[o].focus()},[D]),j=y&&w?"__all__":a.length>0?a[0]:y?"__all__":ce[0]||null;return r.jsxs("div",{ref:S,className:F("inline-flex flex-wrap items-center gap-1 p-1 font-dos max-w-full","bg-dos-bg-secondary border border-dos-border-default rounded-dos-sm","eidotter-filter-bar",T[le]||T.md,se),role:"toolbar",onKeyDown:ue,...ie,children:[y&&r.jsx(C,{className:F("eidotter-filter-bar__item","eidotter-filter-bar__item--all",w&&"eidotter-filter-bar__item--active"),"aria-pressed":w,excludeFromTabOrder:j!=="__all__",onPress:me,children:r.jsx("span",{className:"eidotter-filter-bar__label",children:ae})}),i.map(e=>{const t=a.includes(e.id),l=t&&e.color?{"--filter-bar-item-color":`var(${e.color})`}:void 0;return r.jsxs(C,{className:F("eidotter-filter-bar__item",t&&"eidotter-filter-bar__item--active",e.disabled&&"eidotter-filter-bar__item--disabled"),"aria-pressed":t,excludeFromTabOrder:j!==e.id,isDisabled:e.disabled,onPress:()=>de(e.id),style:l,children:[r.jsx("span",{className:"eidotter-filter-bar__label",children:e.label}),e.count!==void 0&&r.jsx("span",{className:"eidotter-filter-bar__count","aria-label":`${e.count} items`,children:e.count})]},e.id)})]})};n.__docgenInfo={description:`DOS-styled FilterBar for multi-select or single-select content filtering.\r
Pure presentational — uses CSS transitions for phosphor effects.`,methods:[],displayName:"FilterBar",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"FilterBarItem"}],raw:"FilterBarItem[]"},description:"Array of filter items to display"},activeIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Currently active filter IDs (controlled mode)"},defaultActiveIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Default active filter IDs (uncontrolled mode)",defaultValue:{value:"[]",computed:!1}},mode:{required:!1,tsType:{name:"union",raw:"'multi' | 'single'",elements:[{name:"literal",value:"'multi'"},{name:"literal",value:"'single'"}]},description:`Selection mode: 'multi' allows multiple selections, 'single' allows one at a time.\r
Default: 'multi'`,defaultValue:{value:"'multi'",computed:!1}},showAll:{required:!1,tsType:{name:"boolean"},description:'Show an "All" toggle that selects/deselects everything. Default: false',defaultValue:{value:"false",computed:!1}},allLabel:{required:!1,tsType:{name:"string"},description:`Label for the "All" toggle. Default: 'All'`,defaultValue:{value:"'All'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"Size variant. Use sm/md/lg — small/medium/large are @deprecated aliases.",defaultValue:{value:"'md'",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(activeIds: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"activeIds"}],return:{name:"void"}}},description:`Callback when selection changes.\r
Receives the new set of active IDs.`},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name"},"aria-label":{required:!1,tsType:{name:"string"},description:"Accessible label for the filter bar"}}};const je={title:"Components/FilterBar",component:n,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:pe.FilterBar},tags:["autodocs"],argTypes:{mode:{control:"select",options:["multi","single"],defaultValue:"multi"},size:{control:"select",options:["small","medium","large"],defaultValue:"medium"},showAll:{control:"boolean",defaultValue:!1},onChange:{action:"selectionChanged"}}},re=[{id:"active",label:"Active"},{id:"archived",label:"Archived"},{id:"draft",label:"Draft"}],c=[{id:"bugs",label:"Bugs",count:12},{id:"features",label:"Features",count:5},{id:"docs",label:"Docs",count:3},{id:"chores",label:"Chores",count:8}],fe=[{id:"project",label:"Projects",count:3,color:"--color-cga-bright-cyan"},{id:"area",label:"Areas",count:5,color:"--color-cga-bright-green"},{id:"resource",label:"Resources",count:12,color:"--color-cga-yellow"},{id:"archive",label:"Archives",count:8,color:"--color-cga-brown"},{id:"inbox",label:"Inbox",count:4}],p={args:{items:re,"aria-label":"Filter by status"}},f={args:{items:re,mode:"single","aria-label":"Filter by status"}},b={args:{items:c,"aria-label":"Filter by type"}},g={args:{items:c,showAll:!0,"aria-label":"Filter by type"}},be=()=>{const[i,m]=s.useState(["bugs"]);return r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[r.jsx(n,{items:c,activeIds:i,onChange:m,showAll:!0,"aria-label":"Filter by type"}),r.jsxs("p",{style:{color:"#AAAAAA",fontSize:"12px",fontFamily:"monospace"},children:["Active: ",i.length>0?i.join(", "):"(all)"]})]})},A={render:()=>r.jsx(be,{})},h={args:{items:fe,showAll:!0,allLabel:"All","aria-label":"Filter by PARA category"}},v={render:()=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[r.jsxs("div",{children:[r.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Small"}),r.jsx(n,{items:c,size:"small","aria-label":"Small filter"})]}),r.jsxs("div",{children:[r.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Medium"}),r.jsx(n,{items:c,size:"medium","aria-label":"Medium filter"})]}),r.jsxs("div",{children:[r.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Large"}),r.jsx(n,{items:c,size:"large","aria-label":"Large filter"})]})]})},x={args:{items:[{id:"active",label:"Active"},{id:"archived",label:"Archived",disabled:!0},{id:"draft",label:"Draft"}],"aria-label":"Filter with disabled option"}};var z,B,k;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    items: defaultItems,
    'aria-label': 'Filter by status'
  }
}`,...(k=(B=p.parameters)==null?void 0:B.docs)==null?void 0:k.source}}};var W,q,R;f.parameters={...f.parameters,docs:{...(W=f.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    items: defaultItems,
    mode: 'single',
    'aria-label': 'Filter by status'
  }
}`,...(R=(q=f.parameters)==null?void 0:q.docs)==null?void 0:R.source}}};var L,N,P;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    items: itemsWithCounts,
    'aria-label': 'Filter by type'
  }
}`,...(P=(N=b.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var V,E,O;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    items: itemsWithCounts,
    showAll: true,
    'aria-label': 'Filter by type'
  }
}`,...(O=(E=g.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var $,M,K;A.parameters={...A.parameters,docs:{...($=A.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <ControlledExample />
}`,...(K=(M=A.parameters)==null?void 0:M.docs)==null?void 0:K.source}}};var U,H,G;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    items: paraItems,
    showAll: true,
    allLabel: 'All',
    'aria-label': 'Filter by PARA category'
  }
}`,...(G=(H=h.parameters)==null?void 0:H.docs)==null?void 0:G.source}}};var J,Q,X;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(X=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(ee=(Z=x.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};const Ce=["Default","SingleSelect","WithCounts","WithAll","Controlled","PARAFilter","AllSizes","WithDisabledItem"];export{v as AllSizes,A as Controlled,p as Default,h as PARAFilter,f as SingleSelect,g as WithAll,b as WithCounts,x as WithDisabledItem,Ce as __namedExportsOrder,je as default};
