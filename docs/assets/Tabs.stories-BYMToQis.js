import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./registry-BqccLuet.js";import{n as o,t as s}from"./Tabs-kmG8fm2k.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{c=t(n(),1),o(),i(),l=r(),u={title:`Components/Tabs`,component:s,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:a.Tabs},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`underline`,`pills`],defaultValue:`underline`},size:{control:`select`,options:[`small`,`medium`,`large`],defaultValue:`medium`},onTabChange:{action:`tabChanged`}}},d=[{id:`schedule`,label:`Schedule`},{id:`ai`,label:`AI Console`},{id:`calendars`,label:`Calendars`}],f=[{id:`pomodoke`,label:`Pomodoke`},{id:`short`,label:`Short Break`},{id:`long`,label:`Long Break`}],p={args:{tabs:d}},m={args:{tabs:d,variant:`underline`}},h={args:{tabs:d,variant:`pills`}},g={args:{tabs:d,size:`small`}},_={args:{tabs:d,size:`medium`}},v={args:{tabs:d,size:`large`}},y={args:{tabs:[{id:`active`,label:`Active`},{id:`disabled`,label:`Disabled`,disabled:!0},{id:`another`,label:`Another`}]}},b=()=>{let[e,t]=(0,c.useState)(`ai`);return(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,l.jsx)(s,{tabs:d,activeTab:e,onTabChange:t}),(0,l.jsxs)(`p`,{style:{color:`#AAAAAA`,fontSize:`12px`},children:[`Active tab: `,e]})]})},x={render:()=>(0,l.jsx)(b,{})},S={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{style:{color:`#AAAAAA`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Underline variant`}),(0,l.jsx)(s,{tabs:d,variant:`underline`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{style:{color:`#AAAAAA`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Pills variant`}),(0,l.jsx)(s,{tabs:d,variant:`pills`})]})]})},C={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{style:{color:`#AAAAAA`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Small`}),(0,l.jsx)(s,{tabs:f,size:`small`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{style:{color:`#AAAAAA`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Medium`}),(0,l.jsx)(s,{tabs:f,size:`medium`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{style:{color:`#AAAAAA`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Large`}),(0,l.jsx)(s,{tabs:f,size:`large`})]})]})},w={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,l.jsx)(`p`,{style:{color:`#AAAAAA`,fontSize:`10px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Pomodoro Timer Mode Selection`}),(0,l.jsx)(s,{tabs:f,variant:`underline`,defaultActiveTab:`pomodoke`,"aria-label":`Timer mode`})]})},T={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,l.jsx)(`p`,{style:{color:`#AAAAAA`,fontSize:`10px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`App Navigation`}),(0,l.jsx)(s,{tabs:d,variant:`pills`,defaultActiveTab:`schedule`,"aria-label":`Main navigation`})]})},E={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{style:{color:`#AAAAAA`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Small pills`}),(0,l.jsx)(s,{tabs:d,variant:`pills`,size:`small`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{style:{color:`#AAAAAA`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Medium pills`}),(0,l.jsx)(s,{tabs:d,variant:`pills`,size:`medium`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{style:{color:`#AAAAAA`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Large pills`}),(0,l.jsx)(s,{tabs:d,variant:`pills`,size:`large`})]})]})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    variant: 'underline'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    variant: 'pills'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    size: 'small'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    size: 'medium'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: defaultTabs,
    size: 'large'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledExample />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D=[`Default`,`Underline`,`Pills`,`Small`,`Medium`,`Large`,`WithDisabledTab`,`Controlled`,`AllVariants`,`AllSizes`,`PomodoroTimerTabs`,`NavigationTabs`,`PillsAllSizes`]}))();export{C as AllSizes,S as AllVariants,x as Controlled,p as Default,v as Large,_ as Medium,T as NavigationTabs,h as Pills,E as PillsAllSizes,w as PomodoroTimerTabs,g as Small,m as Underline,y as WithDisabledTab,D as __namedExportsOrder,u as default};