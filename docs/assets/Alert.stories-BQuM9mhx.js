import{i as e}from"./preload-helper-Cs4UwXAW.js";import{z as t}from"./iframe-BZiwcFj0.js";import{t as n}from"./jsx-runtime-C2T8EUXA.js";import{n as r,t as i}from"./registry-BqccLuet.js";import{n as a,t as o}from"./Alert-8DvAOOV4.js";var s,c,l,u,d,f,p,m,h,g,_,v,y,b,x;e((()=>{t(),a(),r(),s=n(),c={title:`Components/Alert`,component:o,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:i.Alert},tags:[`autodocs`],argTypes:{color:{control:`select`,options:[`default`,`brand`,`gray`,`error`,`warning`,`success`]},size:{control:`select`,options:[`floating`,`full-width`]},title:{control:`text`},children:{control:`text`},onClose:{action:`close clicked`}}},l={args:{color:`default`,title:`Notification Title`,children:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit amet diam neque bibendum.`,actions:[{label:`Dismiss`,onClick:()=>{}},{label:`Learn more →`,onClick:()=>{}}]}},u={args:{...l.args,onClose:()=>{}}},d={args:{color:`error`,title:`There was a problem with that action`,children:`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,actions:[{label:`Dismiss`,onClick:()=>{}},{label:`View logs →`,onClick:()=>{}}]}},f={args:{color:`warning`,title:`Just to let you know`,children:`Disk space running low on C:\\. Consider cleaning up temporary files.`,actions:[{label:`Dismiss`,onClick:()=>{}},{label:`Clean up →`,onClick:()=>{}}]}},p={args:{color:`success`,title:`Successfully updated profile`,children:`Your changes have been saved to disk.`,actions:[{label:`Dismiss`,onClick:()=>{}},{label:`View changes →`,onClick:()=>{}}]}},m={args:{color:`default`,title:`System initialized. All modules loaded.`}},h={args:{color:`warning`,children:`Disk space running low on C:\\`}},g={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,maxWidth:`800px`},children:[(0,s.jsx)(o,{color:`default`,title:`Default`,actions:[{label:`Dismiss`,onClick:()=>{}}],children:`System initialized. All modules loaded.`}),(0,s.jsx)(o,{color:`brand`,title:`Brand`,actions:[{label:`Dismiss`,onClick:()=>{}}],children:`We've just released a new feature.`}),(0,s.jsx)(o,{color:`gray`,title:`Gray`,actions:[{label:`Dismiss`,onClick:()=>{}}],children:`No new notifications.`}),(0,s.jsx)(o,{color:`success`,title:`Success`,actions:[{label:`Dismiss`,onClick:()=>{}}],children:`Configuration saved successfully.`}),(0,s.jsx)(o,{color:`warning`,title:`Warning`,actions:[{label:`Dismiss`,onClick:()=>{}}],children:`Disk space running low on C:\\`}),(0,s.jsx)(o,{color:`error`,title:`Error`,actions:[{label:`Dismiss`,onClick:()=>{}}],children:`Fatal error: Sector not found.`})]})},_={name:`Full Width Banner`,render:()=>(0,s.jsx)(`div`,{style:{maxWidth:`1440px`},children:(0,s.jsx)(o,{color:`default`,size:`full-width`,title:`System update available`,onClose:()=>{},children:`A new version is ready to install. Restart to apply changes.`})})},v={name:`Full Width — All Colors`,render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`,maxWidth:`1440px`},children:[(0,s.jsx)(o,{color:`default`,size:`full-width`,title:`Default banner`}),(0,s.jsx)(o,{color:`brand`,size:`full-width`,title:`Brand banner`}),(0,s.jsx)(o,{color:`success`,size:`full-width`,title:`Success banner`}),(0,s.jsx)(o,{color:`warning`,size:`full-width`,title:`Warning banner`}),(0,s.jsx)(o,{color:`error`,size:`full-width`,title:`Error banner`})]})},y={name:`Mobile Layout (narrow container)`,render:()=>(0,s.jsx)(`div`,{style:{maxWidth:`343px`},children:(0,s.jsx)(o,{color:`warning`,title:`Just to let you know`,actions:[{label:`Dismiss`,onClick:()=>{}},{label:`Learn more →`,onClick:()=>{}}],onClose:()=>{},children:`Disk space running low on C:\\. Consider cleaning up temporary files.`})})},b={name:`Backward Compatible (type prop)`,render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,maxWidth:`800px`},children:[(0,s.jsx)(o,{type:`info`,children:`System initialized. All modules loaded.`}),(0,s.jsx)(o,{type:`success`,children:`Configuration saved successfully.`}),(0,s.jsx)(o,{type:`warning`,children:`Disk space running low on C:\\`}),(0,s.jsx)(o,{type:`error`,children:`Fatal error: Sector not found.`})]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'default',
    title: 'Notification Title',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit amet diam neque bibendum.',
    actions: [{
      label: 'Dismiss',
      onClick: () => {}
    }, {
      label: 'Learn more →',
      onClick: () => {}
    }]
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    onClose: () => {}
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'error',
    title: 'There was a problem with that action',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    actions: [{
      label: 'Dismiss',
      onClick: () => {}
    }, {
      label: 'View logs →',
      onClick: () => {}
    }]
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'warning',
    title: 'Just to let you know',
    children: 'Disk space running low on C:\\\\. Consider cleaning up temporary files.',
    actions: [{
      label: 'Dismiss',
      onClick: () => {}
    }, {
      label: 'Clean up →',
      onClick: () => {}
    }]
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'success',
    title: 'Successfully updated profile',
    children: 'Your changes have been saved to disk.',
    actions: [{
      label: 'Dismiss',
      onClick: () => {}
    }, {
      label: 'View changes →',
      onClick: () => {}
    }]
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'default',
    title: 'System initialized. All modules loaded.'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'warning',
    children: 'Disk space running low on C:\\\\'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '800px'
  }}>
      <Alert color="default" title="Default" actions={[{
      label: 'Dismiss',
      onClick: () => {}
    }]}>
        System initialized. All modules loaded.
      </Alert>
      <Alert color="brand" title="Brand" actions={[{
      label: 'Dismiss',
      onClick: () => {}
    }]}>
        We've just released a new feature.
      </Alert>
      <Alert color="gray" title="Gray" actions={[{
      label: 'Dismiss',
      onClick: () => {}
    }]}>
        No new notifications.
      </Alert>
      <Alert color="success" title="Success" actions={[{
      label: 'Dismiss',
      onClick: () => {}
    }]}>
        Configuration saved successfully.
      </Alert>
      <Alert color="warning" title="Warning" actions={[{
      label: 'Dismiss',
      onClick: () => {}
    }]}>
        Disk space running low on C:\\
      </Alert>
      <Alert color="error" title="Error" actions={[{
      label: 'Dismiss',
      onClick: () => {}
    }]}>
        Fatal error: Sector not found.
      </Alert>
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Full Width Banner',
  render: () => <div style={{
    maxWidth: '1440px'
  }}>
      <Alert color="default" size="full-width" title="System update available" onClose={() => {}}>
        A new version is ready to install. Restart to apply changes.
      </Alert>
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Full Width — All Colors',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxWidth: '1440px'
  }}>
      <Alert color="default" size="full-width" title="Default banner" />
      <Alert color="brand" size="full-width" title="Brand banner" />
      <Alert color="success" size="full-width" title="Success banner" />
      <Alert color="warning" size="full-width" title="Warning banner" />
      <Alert color="error" size="full-width" title="Error banner" />
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Mobile Layout (narrow container)',
  render: () => <div style={{
    maxWidth: '343px'
  }}>
      <Alert color="warning" title="Just to let you know" actions={[{
      label: 'Dismiss',
      onClick: () => {}
    }, {
      label: 'Learn more →',
      onClick: () => {}
    }]} onClose={() => {}}>
        Disk space running low on C:\\. Consider cleaning up temporary files.
      </Alert>
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Backward Compatible (type prop)',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '800px'
  }}>
      <Alert type="info">System initialized. All modules loaded.</Alert>
      <Alert type="success">Configuration saved successfully.</Alert>
      <Alert type="warning">Disk space running low on C:\\</Alert>
      <Alert type="error">Fatal error: Sector not found.</Alert>
    </div>
}`,...b.parameters?.docs?.source}}},x=[`Default`,`WithCloseButton`,`ErrorColor`,`WarningColor`,`SuccessColor`,`TitleOnly`,`ChildrenOnly`,`AllColors`,`FullWidth`,`FullWidthAllColors`,`MobileLayout`,`BackwardCompat`]}))();export{g as AllColors,b as BackwardCompat,h as ChildrenOnly,l as Default,d as ErrorColor,_ as FullWidth,v as FullWidthAllColors,y as MobileLayout,p as SuccessColor,m as TitleOnly,f as WarningColor,u as WithCloseButton,x as __namedExportsOrder,c as default};