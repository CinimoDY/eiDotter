import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./IconButton-6lIXA5ND.js";import{n as a,t as o}from"./DosWindow-DV2S_uh-.js";var s,c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{t(),a(),r(),s=n(),c={title:`Components/DosWindow`,component:o,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},docs:{description:{component:"In-page window chrome (DMNC-1592): the DosDialog strip (dark, uppercase xs title, `▸` marker, dim-amber rule) on a brand border with `--shadow-drop`, no glow and no backdrop. Server-safe and presentational: pass `IconButton`s (default md, 36px) as `controls`. DosFigure and Card are built on it."}}},tags:[`autodocs`],args:{title:`System report`}},l={margin:0,color:`var(--color-cga-light-gray)`,lineHeight:1.5},u=(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i,{icon:`Cancel`,label:`Minimise`}),(0,s.jsx)(i,{icon:`Fullscreen`,label:`Maximise`}),(0,s.jsx)(i,{icon:`Close`,label:`Close window`})]}),d={render:e=>(0,s.jsx)(`div`,{style:{maxWidth:480},children:(0,s.jsx)(o,{...e,children:(0,s.jsx)(`p`,{style:l,children:`Window body. The frame is a brand border with a hard drop shadow.`})})})},f={render:()=>(0,s.jsx)(`div`,{style:{maxWidth:480},children:(0,s.jsx)(o,{title:`Disk usage`,controls:u,footer:(0,s.jsx)(`span`,{style:l,children:`3 of 4 drives mounted`}),children:(0,s.jsx)(`p`,{style:l,children:`Window controls are 36px IconButtons in the strip end slot; they overhang the strip padding so the strip keeps its height.`})})})},p={render:()=>(0,s.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:480},children:[(0,s.jsx)(o,{title:`Active window`,controls:u,children:(0,s.jsx)(`p`,{style:l,children:`Active: the strip title is in the active colour.`})}),(0,s.jsx)(o,{title:`Inactive window`,active:!1,controls:u,children:(0,s.jsx)(`p`,{style:l,children:`Inactive: the strip title dims to text-muted.`})})]})},m={render:()=>(0,s.jsx)(`div`,{style:{maxWidth:480},children:(0,s.jsx)(o,{children:(0,s.jsx)(`p`,{style:l,children:`Without a title or controls the window is just the frame.`})})})},h=[`Default`,`WithControlsAndFooter`,`ActiveAndInactive`,`NoStrip`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    maxWidth: 480
  }}>
      <DosWindow {...args}>
        <p style={body}>Window body. The frame is a brand border with a hard drop shadow.</p>
      </DosWindow>
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 480
  }}>
      <DosWindow title="Disk usage" controls={controls} footer={<span style={body}>3 of 4 drives mounted</span>}>
        <p style={body}>Window controls are 36px IconButtons in the strip end slot; they overhang the strip padding so the strip keeps its height.</p>
      </DosWindow>
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 24,
    maxWidth: 480
  }}>
      <DosWindow title="Active window" controls={controls}>
        <p style={body}>Active: the strip title is in the active colour.</p>
      </DosWindow>
      <DosWindow title="Inactive window" active={false} controls={controls}>
        <p style={body}>Inactive: the strip title dims to text-muted.</p>
      </DosWindow>
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 480
  }}>
      <DosWindow>
        <p style={body}>Without a title or controls the window is just the frame.</p>
      </DosWindow>
    </div>
}`,...m.parameters?.docs?.source}}}})))()}g();export{p as ActiveAndInactive,d as Default,m as NoStrip,f as WithControlsAndFooter,h as __namedExportsOrder,c as default};