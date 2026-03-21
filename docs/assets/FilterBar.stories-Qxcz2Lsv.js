import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as i}from"./iframe-K6BYEX5l.js";import{c as ue}from"./registry-DlnQDLA5.js";import"./preload-helper-Dp1pzeXC.js";const o=({items:n,activeIds:u,defaultActiveIds:Z=[],mode:F="multi",showAll:x=!1,allLabel:ee="All",size:te="medium",onChange:m,className:le="",...ae})=>{const[re,se]=i.useState(Z),S=i.useRef(null),_=u!==void 0,a=_?u:re,ie=n.filter(e=>!e.disabled).map(e=>e.id),w=a.length===0,d=i.useCallback(e=>{_||se(e),m==null||m(e)},[_,m]),ne=i.useCallback(e=>{if(F==="single"){const l=a.includes(e)?[]:[e];d(l)}else{const l=a.includes(e)?a.filter(r=>r!==e):[...a,e];d(l)}},[F,a,d]),oe=i.useCallback(()=>{d([])},[d]),I=i.useCallback(()=>S.current?Array.from(S.current.querySelectorAll("button:not([disabled])")):[],[]),ce=i.useCallback(e=>{const l=I(),r=l.indexOf(e.target);if(r===-1)return;let s=null;switch(e.key){case"ArrowLeft":case"ArrowUp":e.preventDefault(),s=r>0?r-1:l.length-1;break;case"ArrowRight":case"ArrowDown":e.preventDefault(),s=r<l.length-1?r+1:0;break;case"Home":e.preventDefault(),s=0;break;case"End":e.preventDefault(),s=l.length-1;break}s!==null&&l[s].focus()},[I]),j=x&&w?"__all__":a.length>0?a[0]:x?"__all__":ie[0]||null,de=["filter-bar",`filter-bar--${te}`,le].filter(Boolean).join(" ");return t.jsxs("div",{ref:S,className:de,role:"toolbar",onKeyDown:ce,...ae,children:[x&&t.jsx("button",{type:"button",className:["filter-bar__item","filter-bar__item--all",w&&"filter-bar__item--active"].filter(Boolean).join(" "),"aria-pressed":w,tabIndex:j==="__all__"?0:-1,onClick:oe,children:t.jsx("span",{className:"filter-bar__label",children:ee})}),n.map(e=>{const l=a.includes(e.id),r=["filter-bar__item",l&&"filter-bar__item--active",e.disabled&&"filter-bar__item--disabled"].filter(Boolean).join(" "),s=l&&e.color?{"--filter-bar-item-color":`var(${e.color})`}:void 0;return t.jsxs("button",{type:"button",className:r,"aria-pressed":l,tabIndex:j===e.id?0:-1,disabled:e.disabled,onClick:()=>ne(e.id),style:s,children:[t.jsx("span",{className:"filter-bar__label",children:e.label}),e.count!==void 0&&t.jsx("span",{className:"filter-bar__count","aria-label":`${e.count} items`,children:e.count})]},e.id)})]})};o.__docgenInfo={description:`DOS-styled FilterBar component for multi-select or single-select content filtering\r
\r
Features:\r
- Multi-select (default) or single-select mode\r
- Optional count badges on each filter item\r
- Optional "All" toggle that selects/deselects everything\r
- Full keyboard navigation (Arrow keys, Space, Enter, Home, End)\r
- Controlled and uncontrolled modes\r
- DOS-authentic styling with CGA colors\r
- WCAG 2.1 AA compliant\r
- prefers-reduced-motion support\r
- prefers-contrast: high support`,methods:[],displayName:"FilterBar",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"FilterBarItem"}],raw:"FilterBarItem[]"},description:"Array of filter items to display"},activeIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Currently active filter IDs (controlled mode)"},defaultActiveIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Default active filter IDs (uncontrolled mode)",defaultValue:{value:"[]",computed:!1}},mode:{required:!1,tsType:{name:"union",raw:"'multi' | 'single'",elements:[{name:"literal",value:"'multi'"},{name:"literal",value:"'single'"}]},description:`Selection mode: 'multi' allows multiple selections, 'single' allows one at a time.\r
Default: 'multi'`,defaultValue:{value:"'multi'",computed:!1}},showAll:{required:!1,tsType:{name:"boolean"},description:'Show an "All" toggle that selects/deselects everything. Default: false',defaultValue:{value:"false",computed:!1}},allLabel:{required:!1,tsType:{name:"string"},description:`Label for the "All" toggle. Default: 'All'`,defaultValue:{value:"'All'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"The size of the filter bar",defaultValue:{value:"'medium'",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(activeIds: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"activeIds"}],return:{name:"void"}}},description:`Callback when selection changes.\r
Receives the new set of active IDs.`},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name",defaultValue:{value:"''",computed:!1}},"aria-label":{required:!1,tsType:{name:"string"},description:"Accessible label for the filter bar"}}};const ye={title:"Components/FilterBar",component:o,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:ue.FilterBar},tags:["autodocs"],argTypes:{mode:{control:"select",options:["multi","single"],defaultValue:"multi"},size:{control:"select",options:["small","medium","large"],defaultValue:"medium"},showAll:{control:"boolean",defaultValue:!1},onChange:{action:"selectionChanged"}}},Y=[{id:"active",label:"Active"},{id:"archived",label:"Archived"},{id:"draft",label:"Draft"}],c=[{id:"bugs",label:"Bugs",count:12},{id:"features",label:"Features",count:5},{id:"docs",label:"Docs",count:3},{id:"chores",label:"Chores",count:8}],me=[{id:"project",label:"Projects",count:3,color:"--color-cga-bright-cyan"},{id:"area",label:"Areas",count:5,color:"--color-cga-bright-green"},{id:"resource",label:"Resources",count:12,color:"--color-cga-yellow"},{id:"archive",label:"Archives",count:8,color:"--color-cga-brown"},{id:"inbox",label:"Inbox",count:4}],p={args:{items:Y,"aria-label":"Filter by status"}},f={args:{items:Y,mode:"single","aria-label":"Filter by status"}},b={args:{items:c,"aria-label":"Filter by type"}},g={args:{items:c,showAll:!0,"aria-label":"Filter by type"}},pe=()=>{const[n,u]=i.useState(["bugs"]);return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[t.jsx(o,{items:c,activeIds:n,onChange:u,showAll:!0,"aria-label":"Filter by type"}),t.jsxs("p",{style:{color:"#AAAAAA",fontSize:"12px",fontFamily:"monospace"},children:["Active: ",n.length>0?n.join(", "):"(all)"]})]})},A={render:()=>t.jsx(pe,{})},h={args:{items:me,showAll:!0,allLabel:"All","aria-label":"Filter by PARA category"}},y={render:()=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[t.jsxs("div",{children:[t.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Small"}),t.jsx(o,{items:c,size:"small","aria-label":"Small filter"})]}),t.jsxs("div",{children:[t.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Medium"}),t.jsx(o,{items:c,size:"medium","aria-label":"Medium filter"})]}),t.jsxs("div",{children:[t.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Large"}),t.jsx(o,{items:c,size:"large","aria-label":"Large filter"})]})]})},v={args:{items:[{id:"active",label:"Active"},{id:"archived",label:"Archived",disabled:!0},{id:"draft",label:"Draft"}],"aria-label":"Filter with disabled option"}};var C,D,B;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    items: defaultItems,
    'aria-label': 'Filter by status'
  }
}`,...(B=(D=p.parameters)==null?void 0:D.docs)==null?void 0:B.source}}};var T,z,k;f.parameters={...f.parameters,docs:{...(T=f.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    items: defaultItems,
    mode: 'single',
    'aria-label': 'Filter by status'
  }
}`,...(k=(z=f.parameters)==null?void 0:z.docs)==null?void 0:k.source}}};var W,q,R;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    items: itemsWithCounts,
    'aria-label': 'Filter by type'
  }
}`,...(R=(q=b.parameters)==null?void 0:q.docs)==null?void 0:R.source}}};var L,V,E;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    items: itemsWithCounts,
    showAll: true,
    'aria-label': 'Filter by type'
  }
}`,...(E=(V=g.parameters)==null?void 0:V.docs)==null?void 0:E.source}}};var N,O,M;A.parameters={...A.parameters,docs:{...(N=A.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <ControlledExample />
}`,...(M=(O=A.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var P,$,G;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    items: paraItems,
    showAll: true,
    allLabel: 'All',
    'aria-label': 'Filter by PARA category'
  }
}`,...(G=($=h.parameters)==null?void 0:$.docs)==null?void 0:G.source}}};var H,K,U;y.parameters={...y.parameters,docs:{...(H=y.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(U=(K=y.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var J,Q,X;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(X=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};const ve=["Default","SingleSelect","WithCounts","WithAll","Controlled","PARAFilter","AllSizes","WithDisabledItem"];export{y as AllSizes,A as Controlled,p as Default,h as PARAFilter,f as SingleSelect,g as WithAll,b as WithCounts,v as WithDisabledItem,ve as __namedExportsOrder,ye as default};
