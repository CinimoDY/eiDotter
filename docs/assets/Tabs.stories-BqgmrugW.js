import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as j}from"./index-qdalL59a.js";import"./_commonjsHelpers-CqkleIqs.js";const s=({tabs:i,variant:B="underline",size:xe="medium",activeTab:c,defaultActiveTab:fe,onTabChange:p,className:ge="",...ve})=>{var w;const[Te,Se]=j.useState(fe||((w=i[0])==null?void 0:w.id)||""),ye=c!==void 0?c:Te,k=j.useCallback((a,d)=>{d||(c===void 0&&Se(a),p==null||p(a))},[c,p]),he=j.useCallback((a,d)=>{var C;const t=i.filter(o=>!o.disabled),n=t.findIndex(o=>o.id===i[d].id);let l=null;switch(a.key){case"ArrowLeft":case"ArrowUp":a.preventDefault(),l=n>0?n-1:t.length-1;break;case"ArrowRight":case"ArrowDown":a.preventDefault(),l=n<t.length-1?n+1:0;break;case"Home":a.preventDefault(),l=0;break;case"End":a.preventDefault(),l=t.length-1;break}if(l!==null){const o=t[l];k(o.id,o.disabled),(C=document.querySelectorAll('[role="tab"]:not([disabled])')[l])==null||C.focus()}},[i,k]),ze=["tabs",`tabs--${B}`,`tabs--${xe}`,ge].filter(Boolean).join(" ");return e.jsx("div",{className:ze,role:"tablist",...ve,children:i.map((a,d)=>{const t=ye===a.id,n=["tabs__tab",t&&"tabs__tab--active",a.disabled&&"tabs__tab--disabled"].filter(Boolean).join(" ");return e.jsx("button",{role:"tab",id:`tab-${a.id}`,"aria-selected":t,tabIndex:t?0:-1,disabled:a.disabled,className:n,onClick:()=>k(a.id,a.disabled),onKeyDown:l=>he(l,d),children:a.label},a.id)})})};s.__docgenInfo={description:`DOS-styled Tabs component for navigation and content switching\r
\r
Features:\r
- Two variants: underline (minimal) and pills (contained)\r
- Three sizes (small, medium, large)\r
- Controlled and uncontrolled modes\r
- Full keyboard navigation (Arrow keys, Home, End)\r
- DOS-authentic styling with CGA colors\r
- WCAG 2.1 AA compliant`,methods:[],displayName:"Tabs",props:{tabs:{required:!0,tsType:{name:"Array",elements:[{name:"TabItem"}],raw:"TabItem[]"},description:"Array of tab items to display"},variant:{required:!1,tsType:{name:"union",raw:"'underline' | 'pills'",elements:[{name:"literal",value:"'underline'"},{name:"literal",value:"'pills'"}]},description:"The variant determines the tab styling",defaultValue:{value:"'underline'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"The size of the tabs",defaultValue:{value:"'medium'",computed:!1}},activeTab:{required:!1,tsType:{name:"string"},description:"Currently active tab ID (controlled mode)"},defaultActiveTab:{required:!1,tsType:{name:"string"},description:"Default active tab ID (uncontrolled mode)"},onTabChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(tabId: string) => void",signature:{arguments:[{type:{name:"string"},name:"tabId"}],return:{name:"void"}}},description:"Callback when tab changes"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name",defaultValue:{value:"''",computed:!1}},"aria-label":{required:!1,tsType:{name:"string"},description:"Accessible label for the tab list"}}};const we={title:"Components/Tabs",component:s,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["underline","pills"],defaultValue:"underline"},size:{control:"select",options:["small","medium","large"],defaultValue:"medium"},onTabChange:{action:"tabChanged"}}},r=[{id:"schedule",label:"Schedule"},{id:"ai",label:"AI Console"},{id:"calendars",label:"Calendars"}],D=[{id:"pomodoke",label:"Pomodoke"},{id:"short",label:"Short Break"},{id:"long",label:"Long Break"}],m={args:{tabs:r}},u={args:{tabs:r,variant:"underline"}},A={args:{tabs:r,variant:"pills"}},b={args:{tabs:r,size:"small"}},x={args:{tabs:r,size:"medium"}},f={args:{tabs:r,size:"large"}},g={args:{tabs:[{id:"active",label:"Active"},{id:"disabled",label:"Disabled",disabled:!0},{id:"another",label:"Another"}]}},v={render:()=>{const[i,B]=j.useState("ai");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(s,{tabs:r,activeTab:i,onTabChange:B}),e.jsxs("p",{style:{color:"#AAAAAA",fontSize:"12px"},children:["Active tab: ",i]})]})}},T={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Underline variant"}),e.jsx(s,{tabs:r,variant:"underline"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Pills variant"}),e.jsx(s,{tabs:r,variant:"pills"})]})]})},S={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Small"}),e.jsx(s,{tabs:D,size:"small"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Medium"}),e.jsx(s,{tabs:D,size:"medium"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Large"}),e.jsx(s,{tabs:D,size:"large"})]})]})},y={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Pomodoro Timer Mode Selection"}),e.jsx(s,{tabs:D,variant:"underline",defaultActiveTab:"pomodoke","aria-label":"Timer mode"})]})},h={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"App Navigation"}),e.jsx(s,{tabs:r,variant:"pills",defaultActiveTab:"schedule","aria-label":"Main navigation"})]})},z={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Small pills"}),e.jsx(s,{tabs:r,variant:"pills",size:"small"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Medium pills"}),e.jsx(s,{tabs:r,variant:"pills",size:"medium"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Large pills"}),e.jsx(s,{tabs:r,variant:"pills",size:"large"})]})]})};var I,P,M;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs
  }
}`,...(M=(P=m.parameters)==null?void 0:P.docs)==null?void 0:M.source}}};var _,q,L;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    variant: 'underline'
  }
}`,...(L=(q=u.parameters)==null?void 0:q.docs)==null?void 0:L.source}}};var N,V,E;A.parameters={...A.parameters,docs:{...(N=A.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    variant: 'pills'
  }
}`,...(E=(V=A.parameters)==null?void 0:V.docs)==null?void 0:E.source}}};var U,O,W;b.parameters={...b.parameters,docs:{...(U=b.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    size: 'small'
  }
}`,...(W=(O=b.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var $,F,G;x.parameters={...x.parameters,docs:{...($=x.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    size: 'medium'
  }
}`,...(G=(F=x.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var H,K,R;f.parameters={...f.parameters,docs:{...(H=f.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    size: 'large'
  }
}`,...(R=(K=f.parameters)==null?void 0:K.docs)==null?void 0:R.source}}};var J,Q,X;g.parameters={...g.parameters,docs:{...(J=g.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    tabs: [{
      id: 'active',
      label: 'Active'
    }, {
      id: 'disabled',
      label: 'Disabled',
      disabled: true
    }, {
      id: 'another',
      label: 'Another'
    }]
  }
}`,...(X=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;v.parameters={...v.parameters,docs:{...(Y=v.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => {
    const [activeTab, setActiveTab] = useState('ai');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
        <Tabs tabs={defaultTabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <p style={{
        color: '#AAAAAA',
        fontSize: '12px'
      }}>
          Active tab: {activeTab}
        </p>
      </div>;
  }
}`,...(ee=(Z=v.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ae,se,re;T.parameters={...T.parameters,docs:{...(ae=T.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
          Underline variant
        </p>
        <Tabs tabs={defaultTabs} variant="underline" />
      </div>
      <div>
        <p style={{
        color: '#AAAAAA',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Pills variant
        </p>
        <Tabs tabs={defaultTabs} variant="pills" />
      </div>
    </div>
}`,...(re=(se=T.parameters)==null?void 0:se.docs)==null?void 0:re.source}}};var te,le,ie;S.parameters={...S.parameters,docs:{...(te=S.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
        <Tabs tabs={pomodoroTabs} size="small" />
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
        <Tabs tabs={pomodoroTabs} size="medium" />
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
        <Tabs tabs={pomodoroTabs} size="large" />
      </div>
    </div>
}`,...(ie=(le=S.parameters)==null?void 0:le.docs)==null?void 0:ie.source}}};var ne,oe,de;y.parameters={...y.parameters,docs:{...(ne=y.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
      <p style={{
      color: '#AAAAAA',
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }}>
        Pomodoro Timer Mode Selection
      </p>
      <Tabs tabs={pomodoroTabs} variant="underline" defaultActiveTab="pomodoke" aria-label="Timer mode" />
    </div>
}`,...(de=(oe=y.parameters)==null?void 0:oe.docs)==null?void 0:de.source}}};var ce,pe,me;h.parameters={...h.parameters,docs:{...(ce=h.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
      <p style={{
      color: '#AAAAAA',
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }}>
        App Navigation
      </p>
      <Tabs tabs={defaultTabs} variant="pills" defaultActiveTab="schedule" aria-label="Main navigation" />
    </div>
}`,...(me=(pe=h.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var ue,Ae,be;z.parameters={...z.parameters,docs:{...(ue=z.parameters)==null?void 0:ue.docs,source:{originalSource:`{
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
          Small pills
        </p>
        <Tabs tabs={defaultTabs} variant="pills" size="small" />
      </div>
      <div>
        <p style={{
        color: '#AAAAAA',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Medium pills
        </p>
        <Tabs tabs={defaultTabs} variant="pills" size="medium" />
      </div>
      <div>
        <p style={{
        color: '#AAAAAA',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Large pills
        </p>
        <Tabs tabs={defaultTabs} variant="pills" size="large" />
      </div>
    </div>
}`,...(be=(Ae=z.parameters)==null?void 0:Ae.docs)==null?void 0:be.source}}};const Ce=["Default","Underline","Pills","Small","Medium","Large","WithDisabledTab","Controlled","AllVariants","AllSizes","PomodoroTimerTabs","NavigationTabs","PillsAllSizes"];export{S as AllSizes,T as AllVariants,v as Controlled,m as Default,f as Large,x as Medium,h as NavigationTabs,A as Pills,z as PillsAllSizes,y as PomodoroTimerTabs,b as Small,u as Underline,g as WithDisabledTab,Ce as __namedExportsOrder,we as default};
