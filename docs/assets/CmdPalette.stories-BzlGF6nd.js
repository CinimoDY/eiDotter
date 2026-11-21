import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{r,t as i}from"./registry-EhIcK3QA.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./Button-DYwuDaLT.js";import{n as c,t as l}from"./CmdPalette-rRdLyrXx.js";var u,d,f,p,m,h,g,_,v,y,b,x,S;function C(){return(C=t((()=>{u=e(n(),1),c(),o(),r(),d=a(),f=[{id:`dir`,label:`DIR`,hint:`LIST FILES`,keywords:[`ls`,`listing`]},{id:`mem`,label:`MEM`,hint:`SHOW MEMORY`,keywords:[`memory`,`free`]},{id:`ver`,label:`VER`,hint:`VERSION`,keywords:[`version`]},{id:`help`,label:`HELP`,hint:`OPEN HELP`,keywords:[`?`,`man`,`documentation`]},{id:`cls`,label:`CLS`,hint:`CLEAR SCREEN`,keywords:[`clear`]},{id:`tree`,label:`TREE`,hint:`SHOW TREE`,keywords:[`directory`]},{id:`copy`,label:`COPY`,hint:`COPY FILE`,keywords:[`cp`]},{id:`move`,label:`MOVE`,hint:`MOVE FILE`,keywords:[`mv`,`rename`]},{id:`del`,label:`DEL`,hint:`DELETE FILE`,keywords:[`rm`,`remove`]},{id:`exit`,label:`EXIT`,hint:`QUIT SHELL`,keywords:[`quit`,`bye`]}],p={title:`Components/CmdPalette`,component:l,parameters:{layout:`fullscreen`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#020003`}]},projectMeta:i.CmdPalette},tags:[`autodocs`]},m=({initialOpen:e=!1,items:t=f,renderItem:n,hotkey:r=`mod+k`,footerHint:i})=>{let[a,o]=(0,u.useState)(e),[c,p]=(0,u.useState)(`(none)`),m=t.map(e=>({...e,onSelect:e=>p(e.id)}));return(0,d.jsxs)(`div`,{style:{minHeight:`100vh`,background:`var(--color-semantic-background-primary)`,color:`var(--color-semantic-text-primary)`,fontFamily:`var(--typography-font-family-primary)`,padding:`32px`,display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,d.jsx)(s,{onClick:()=>o(!0),children:`OPEN COMMAND PALETTE`}),(0,d.jsxs)(`p`,{style:{fontSize:`14px`},children:[`Hotkey: `,r?String(r):`disabled`]}),(0,d.jsxs)(`p`,{style:{fontSize:`14px`},children:[`Last selected: `,(0,d.jsx)(`strong`,{children:c})]}),(0,d.jsx)(l,{open:a,onOpenChange:o,items:m,renderItem:n,hotkey:r,footerHint:i})]})},h={render:()=>(0,d.jsx)(m,{})},g={render:()=>(0,d.jsx)(m,{initialOpen:!0})},_={render:()=>(0,d.jsx)(m,{initialOpen:!0,renderItem:(e,t)=>(0,d.jsxs)(`span`,{style:{display:`flex`,width:`100%`,justifyContent:`space-between`,alignItems:`center`,gap:`12px`},children:[(0,d.jsxs)(`span`,{style:{display:`inline-flex`,gap:`8px`},children:[(0,d.jsx)(`span`,{style:{color:`var(--color-cga-amber)`},children:t?`▶`:`◦`}),(0,d.jsx)(`strong`,{children:e.label}),(0,d.jsxs)(`span`,{style:{color:`var(--color-cga-brown)`},children:[`· `,e.keywords?.join(`, `)||`—`]})]}),(0,d.jsx)(`span`,{style:{color:`var(--color-cga-amber-dim)`},children:e.hint})]})})},v={render:()=>(0,d.jsx)(m,{hotkey:!1})},y={render:()=>(0,d.jsx)(m,{initialOpen:!0,footerHint:(0,d.jsx)(`span`,{children:`⌘K · TYPE TO SEARCH · ENTER TO EXECUTE`})})},b=[{id:`home`,label:`HOMEPAGE`,hint:`/`,keywords:[`start`]},{id:`projects`,label:`PROJECTS`,hint:`/projects/all-projects-by-year`,keywords:[`work`]},{id:`archive`,label:`ARCHIVES`,hint:`/archive/2026/october/notes`,keywords:[`old`]},{id:`settings`,label:`SETTINGS`,hint:`/account/settings/display`,keywords:[`prefs`]},{id:`long`,label:`A VERY LONG LABEL THAT IS WIDER THAN A PHONE ROW`,hint:`/long`}],x={render:()=>(0,d.jsx)(m,{initialOpen:!0,items:b})},S=[`Basic`,`WithHints`,`CustomItemRenderer`,`DisabledHotkey`,`CustomFooter`,`RouteHints`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Harness />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Harness initialOpen />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Harness initialOpen renderItem={(item, isSelected) => <span style={{
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px'
  }}>
          <span style={{
      display: 'inline-flex',
      gap: '8px'
    }}>
            <span style={{
        color: 'var(--color-cga-amber)'
      }}>{isSelected ? '▶' : '◦'}</span>
            <strong>{item.label}</strong>
            <span style={{
        color: 'var(--color-cga-brown)'
      }}>· {item.keywords?.join(', ') || '—'}</span>
          </span>
          <span style={{
      color: 'var(--color-cga-amber-dim)'
    }}>{item.hint}</span>
        </span>} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Harness hotkey={false} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Harness initialOpen footerHint={<span>⌘K · TYPE TO SEARCH · ENTER TO EXECUTE</span>} />
}`,...y.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Harness initialOpen items={routeItems} />
}`,...x.parameters?.docs?.source},description:{story:`DMNC-1612: at phone widths (view at phone375) the label keeps every
character and the route hint truncates with an ellipsis instead; a label
wider than the row truncates itself. The footer wraps between key hints,
never inside "ESC CLOSE". Narrow rules are a container query on the palette.`,...x.parameters?.docs?.description}}}})))()}C();export{h as Basic,y as CustomFooter,_ as CustomItemRenderer,v as DisabledHotkey,x as RouteHints,g as WithHints,S as __namedExportsOrder,p as default};