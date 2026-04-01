import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as te}from"./iframe-BHAUrTqb.js";import{T as r}from"./Tabs-B3OifMVX.js";import{c as oe}from"./registry-BH4hA_P8.js";import"./preload-helper-Dp1pzeXC.js";const me={title:"Components/Tabs",component:r,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:oe.Tabs},tags:["autodocs"],argTypes:{variant:{control:"select",options:["underline","pills"],defaultValue:"underline"},size:{control:"select",options:["small","medium","large"],defaultValue:"medium"},onTabChange:{action:"tabChanged"}}},a=[{id:"schedule",label:"Schedule"},{id:"ai",label:"AI Console"},{id:"calendars",label:"Calendars"}],b=[{id:"pomodoke",label:"Pomodoke"},{id:"short",label:"Short Break"},{id:"long",label:"Long Break"}],s={args:{tabs:a}},t={args:{tabs:a,variant:"underline"}},o={args:{tabs:a,variant:"pills"}},l={args:{tabs:a,size:"small"}},i={args:{tabs:a,size:"medium"}},n={args:{tabs:a,size:"large"}},p={args:{tabs:[{id:"active",label:"Active"},{id:"disabled",label:"Disabled",disabled:!0},{id:"another",label:"Another"}]}},le=()=>{const[g,se]=te.useState("ai");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(r,{tabs:a,activeTab:g,onTabChange:se}),e.jsxs("p",{style:{color:"#AAAAAA",fontSize:"12px"},children:["Active tab: ",g]})]})},c={render:()=>e.jsx(le,{})},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Underline variant"}),e.jsx(r,{tabs:a,variant:"underline"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Pills variant"}),e.jsx(r,{tabs:a,variant:"pills"})]})]})},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Small"}),e.jsx(r,{tabs:b,size:"small"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Medium"}),e.jsx(r,{tabs:b,size:"medium"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Large"}),e.jsx(r,{tabs:b,size:"large"})]})]})},A={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Pomodoro Timer Mode Selection"}),e.jsx(r,{tabs:b,variant:"underline",defaultActiveTab:"pomodoke","aria-label":"Timer mode"})]})},x={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"App Navigation"}),e.jsx(r,{tabs:a,variant:"pills",defaultActiveTab:"schedule","aria-label":"Main navigation"})]})},u={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Small pills"}),e.jsx(r,{tabs:a,variant:"pills",size:"small"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Medium pills"}),e.jsx(r,{tabs:a,variant:"pills",size:"medium"})]}),e.jsxs("div",{children:[e.jsx("p",{style:{color:"#AAAAAA",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Large pills"}),e.jsx(r,{tabs:a,variant:"pills",size:"large"})]})]})};var f,v,T;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs
  }
}`,...(T=(v=s.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var S,y,z;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    variant: 'underline'
  }
}`,...(z=(y=t.parameters)==null?void 0:y.docs)==null?void 0:z.source}}};var h,j,B;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    variant: 'pills'
  }
}`,...(B=(j=o.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var D,M,P;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    size: 'small'
  }
}`,...(P=(M=l.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var C,k,L;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    size: 'medium'
  }
}`,...(L=(k=i.parameters)==null?void 0:k.docs)==null?void 0:L.source}}};var E,N,U;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    size: 'large'
  }
}`,...(U=(N=n.parameters)==null?void 0:N.docs)==null?void 0:U.source}}};var V,R,W;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(W=(R=p.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var _,I,O;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <ControlledExample />
}`,...(O=(I=c.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var q,w,F;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(F=(w=d.parameters)==null?void 0:w.docs)==null?void 0:F.source}}};var G,H,J;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(J=(H=m.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var K,Q,X;A.parameters={...A.parameters,docs:{...(K=A.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(X=(Q=A.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,$;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...($=(Z=x.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,ae,re;u.parameters={...u.parameters,docs:{...(ee=u.parameters)==null?void 0:ee.docs,source:{originalSource:`{
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
}`,...(re=(ae=u.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};const Ae=["Default","Underline","Pills","Small","Medium","Large","WithDisabledTab","Controlled","AllVariants","AllSizes","PomodoroTimerTabs","NavigationTabs","PillsAllSizes"];export{m as AllSizes,d as AllVariants,c as Controlled,s as Default,n as Large,i as Medium,x as NavigationTabs,o as Pills,u as PillsAllSizes,A as PomodoroTimerTabs,l as Small,t as Underline,p as WithDisabledTab,Ae as __namedExportsOrder,me as default};
