import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{A as r}from"./Alert-BYsm9-yZ.js";import{c as U}from"./registry-CyM9n0D0.js";import"./iframe-BU4rT9RF.js";import"./preload-helper-Dp1pzeXC.js";import"./Button-Ctavax2i.js";import"./useFocusRing-BUJkGnC-.js";import"./Hidden-BtSPQEnR.js";import"./usePress-Bjtlcj0Z.js";import"./index-CqfCC26D.js";import"./index-C2QVYWFi.js";import"./cn-CvUv5FIJ.js";import"./Icon-CtGTmgBb.js";import"./useAnimatedDismiss-b12fDvVP.js";import"./prefersReducedMotion-lKH2k1Yv.js";const me={title:"Components/Alert",component:r,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:U.Alert},tags:["autodocs"],argTypes:{color:{control:"select",options:["default","brand","gray","error","warning","success"]},size:{control:"select",options:["floating","full-width"]},title:{control:"text"},children:{control:"text"},onClose:{action:"close clicked"}}},l={args:{color:"default",title:"Notification Title",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit amet diam neque bibendum.",actions:[{label:"Dismiss",onClick:()=>{}},{label:"Learn more →",onClick:()=>{}}]}},o={args:{...l.args,onClose:()=>{}}},s={args:{color:"error",title:"There was a problem with that action",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",actions:[{label:"Dismiss",onClick:()=>{}},{label:"View logs →",onClick:()=>{}}]}},i={args:{color:"warning",title:"Just to let you know",children:"Disk space running low on C:\\. Consider cleaning up temporary files.",actions:[{label:"Dismiss",onClick:()=>{}},{label:"Clean up →",onClick:()=>{}}]}},n={args:{color:"success",title:"Successfully updated profile",children:"Your changes have been saved to disk.",actions:[{label:"Dismiss",onClick:()=>{}},{label:"View changes →",onClick:()=>{}}]}},t={args:{color:"default",title:"System initialized. All modules loaded."}},a={args:{color:"warning",children:"Disk space running low on C:\\"}},c={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",maxWidth:"800px"},children:[e.jsx(r,{color:"default",title:"Default",actions:[{label:"Dismiss",onClick:()=>{}}],children:"System initialized. All modules loaded."}),e.jsx(r,{color:"brand",title:"Brand",actions:[{label:"Dismiss",onClick:()=>{}}],children:"We've just released a new feature."}),e.jsx(r,{color:"gray",title:"Gray",actions:[{label:"Dismiss",onClick:()=>{}}],children:"No new notifications."}),e.jsx(r,{color:"success",title:"Success",actions:[{label:"Dismiss",onClick:()=>{}}],children:"Configuration saved successfully."}),e.jsx(r,{color:"warning",title:"Warning",actions:[{label:"Dismiss",onClick:()=>{}}],children:"Disk space running low on C:\\"}),e.jsx(r,{color:"error",title:"Error",actions:[{label:"Dismiss",onClick:()=>{}}],children:"Fatal error: Sector not found."})]})},d={name:"Full Width Banner",render:()=>e.jsx("div",{style:{maxWidth:"1440px"},children:e.jsx(r,{color:"default",size:"full-width",title:"System update available",onClose:()=>{},children:"A new version is ready to install. Restart to apply changes."})})},u={name:"Full Width — All Colors",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px",maxWidth:"1440px"},children:[e.jsx(r,{color:"default",size:"full-width",title:"Default banner"}),e.jsx(r,{color:"brand",size:"full-width",title:"Brand banner"}),e.jsx(r,{color:"success",size:"full-width",title:"Success banner"}),e.jsx(r,{color:"warning",size:"full-width",title:"Warning banner"}),e.jsx(r,{color:"error",size:"full-width",title:"Error banner"})]})},m={name:"Mobile Layout (narrow container)",render:()=>e.jsx("div",{style:{maxWidth:"343px"},children:e.jsx(r,{color:"warning",title:"Just to let you know",actions:[{label:"Dismiss",onClick:()=>{}},{label:"Learn more →",onClick:()=>{}}],onClose:()=>{},children:"Disk space running low on C:\\. Consider cleaning up temporary files."})})},p={name:"Backward Compatible (type prop)",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",maxWidth:"800px"},children:[e.jsx(r,{type:"info",children:"System initialized. All modules loaded."}),e.jsx(r,{type:"success",children:"Configuration saved successfully."}),e.jsx(r,{type:"warning",children:"Disk space running low on C:\\"}),e.jsx(r,{type:"error",children:"Fatal error: Sector not found."})]})};var g,C,f;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(f=(C=l.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};var h,y,x;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    onClose: () => {}
  }
}`,...(x=(y=o.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var b,w,k;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(k=(w=s.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var A,D,S;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(S=(D=i.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var v,W,j;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(j=(W=n.parameters)==null?void 0:W.docs)==null?void 0:j.source}}};var z,B,F;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    color: 'default',
    title: 'System initialized. All modules loaded.'
  }
}`,...(F=(B=t.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var L,E,T;a.parameters={...a.parameters,docs:{...(L=a.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    color: 'warning',
    children: 'Disk space running low on C:\\\\'
  }
}`,...(T=(E=a.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var M,O,J;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(J=(O=c.parameters)==null?void 0:O.docs)==null?void 0:J.source}}};var N,R,V;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'Full Width Banner',
  render: () => <div style={{
    maxWidth: '1440px'
  }}>
      <Alert color="default" size="full-width" title="System update available" onClose={() => {}}>
        A new version is ready to install. Restart to apply changes.
      </Alert>
    </div>
}`,...(V=(R=d.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var q,G,Y;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(Y=(G=u.parameters)==null?void 0:G.docs)==null?void 0:Y.source}}};var _,H,I;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(I=(H=m.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var K,P,Q;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(Q=(P=p.parameters)==null?void 0:P.docs)==null?void 0:Q.source}}};const pe=["Default","WithCloseButton","ErrorColor","WarningColor","SuccessColor","TitleOnly","ChildrenOnly","AllColors","FullWidth","FullWidthAllColors","MobileLayout","BackwardCompat"];export{c as AllColors,p as BackwardCompat,a as ChildrenOnly,l as Default,s as ErrorColor,d as FullWidth,u as FullWidthAllColors,m as MobileLayout,n as SuccessColor,t as TitleOnly,i as WarningColor,o as WithCloseButton,pe as __namedExportsOrder,me as default};
