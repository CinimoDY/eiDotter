import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as se}from"./iframe-BU4rT9RF.js";import{$ as N}from"./Button-Ctavax2i.js";import{c as k}from"./cn-CvUv5FIJ.js";import{I as j}from"./Icon-CtGTmgBb.js";import{P as re}from"./Progress-B24hD0VR.js";import{u as ae}from"./useAnimatedDismiss-b12fDvVP.js";import"./preload-helper-Dp1pzeXC.js";import"./useFocusRing-BUJkGnC-.js";import"./Hidden-BtSPQEnR.js";import"./usePress-Bjtlcj0Z.js";import"./index-CqfCC26D.js";import"./index-C2QVYWFi.js";import"./prefersReducedMotion-lKH2k1Yv.js";const te={primary:"Info",gray:"Info",success:"Done",warning:"Warning",error:"Error"},o=({type:s="primary",title:f,children:g,actions:y,onClose:r,avatar:i,image:x,progress:w,progressLabel:C,duration:h,showIcon:K=!0,className:Q})=>{const{isClosing:X,triggerClose:b,handleAnimationEnd:Z}=ae("notification-exit",r);se.useEffect(()=>{if(h==null||!r)return;const a=setTimeout(()=>b(),h);return()=>clearTimeout(a)},[h,r,b]);const v=K&&!i,ee=w!=null;return e.jsxs("div",{className:k("w-full max-w-[400px]","font-dos text-dos-text-sm","bg-dos-bg-primary border border-dos-border-default rounded-dos-base","eidotter-notification",`eidotter-notification--${s}`,X&&"eidotter-notification--closing",Q),onAnimationEnd:Z,role:s==="error"?"alert":"status","data-type":s,children:[x&&e.jsx("div",{className:"eidotter-notification__image",children:x}),e.jsxs("div",{className:"flex flex-row gap-4 p-4",children:[i&&e.jsx("div",{className:"eidotter-notification__avatar flex-shrink-0",children:i}),v&&e.jsx("div",{className:"eidotter-notification__icon",children:e.jsx(j,{name:te[s]||"Info",size:"S","aria-label":`${s} notification`})}),e.jsxs("div",{className:k("flex-1 flex flex-col gap-3 min-w-0",r&&!v&&!i&&"pr-8"),children:[(f||g)&&e.jsxs("div",{className:"flex flex-col gap-1",children:[f&&e.jsx("div",{className:"eidotter-notification__title font-dos leading-[140%]",children:f}),g&&e.jsx("div",{className:"eidotter-notification__text font-dos leading-[140%]",children:g})]}),ee&&e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx(re,{value:w,max:100,size:"sm",fullWidth:!0,showLabel:!1}),C&&e.jsx("div",{className:"eidotter-notification__text font-dos text-dos-text-xs",children:C})]}),y&&y.length>0&&e.jsx("div",{className:"flex flex-row gap-3",children:y.map((a,oe)=>e.jsxs(N,{className:"eidotter-notification__action",onPress:a.onClick,children:[a.label,a.icon]},oe))})]}),r&&e.jsx(N,{className:"eidotter-notification__close",onPress:b,"aria-label":"Close notification",children:e.jsx(j,{name:"Close",size:"S"})})]})]})};o.__docgenInfo={description:`DOS-styled Notification (toast) with V.37 design: layered amber glow,
featured icon with outline rings, optional progress bar and auto-dismiss.

Purely presentational — consumers handle positioning.`,methods:[],displayName:"Notification",props:{type:{required:!1,tsType:{name:"union",raw:"'primary' | 'gray' | 'success' | 'warning' | 'error'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'gray'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"}]},description:"Color/icon variant",defaultValue:{value:"'primary'",computed:!1}},title:{required:!1,tsType:{name:"string"},description:"Title text"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Supporting text / description"},actions:{required:!1,tsType:{name:"Array",elements:[{name:"AlertAction"}],raw:"AlertAction[]"},description:"Action buttons"},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Close handler — shows close button when provided"},avatar:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Renders avatar element instead of featured icon"},image:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Renders image element above text content"},progress:{required:!1,tsType:{name:"number"},description:"Progress value 0-100 — renders Progress bar below text"},progressLabel:{required:!1,tsType:{name:"string"},description:"Label for progress bar"},duration:{required:!1,tsType:{name:"number"},description:"Auto-dismiss after N milliseconds"},showIcon:{required:!1,tsType:{name:"boolean"},description:"Hide the featured icon",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const we={title:"Components/Notification",component:o,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{type:{control:"select",options:["primary","gray","success","warning","error"]},title:{control:"text"},children:{control:"text"},showIcon:{control:"boolean"},progress:{control:{type:"range",min:0,max:100}},progressLabel:{control:"text"},duration:{control:"number"},onClose:{action:"close clicked"}}},t={args:{type:"primary",title:"We've just released a new update!",children:"Check out the all new dashboard view. Pages and exports now load faster.",actions:[{label:"Dismiss",onClick:()=>{}},{label:"View changes",onClick:()=>{}}]}},n={args:{...t.args,onClose:()=>{}}},l={args:{type:"error",title:"This project has been unpublished",children:"Please contact the owner to restore access.",actions:[{label:"Dismiss",onClick:()=>{}},{label:"Contact owner",onClick:()=>{}}],onClose:()=>{}}},c={args:{type:"success",title:"Successfully updated profile",children:"Your changes have been saved.",actions:[{label:"Dismiss",onClick:()=>{}},{label:"View profile",onClick:()=>{}}]}},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(o,{type:"primary",title:"Primary",onClose:()=>{},children:"System update available."}),e.jsx(o,{type:"gray",title:"Gray",onClose:()=>{},children:"No new notifications."}),e.jsx(o,{type:"success",title:"Success",onClose:()=>{},children:"Configuration saved successfully."}),e.jsx(o,{type:"warning",title:"Warning",onClose:()=>{},children:"Disk space running low."}),e.jsx(o,{type:"error",title:"Error",onClose:()=>{},children:"Fatal error: Sector not found."})]})},p={args:{showIcon:!1,title:"Updates have been made to your profile",children:"Your recent changes are now live.",actions:[{label:"Dismiss",onClick:()=>{}},{label:"View changes",onClick:()=>{}}],onClose:()=>{}}},u={args:{type:"primary",title:"Uploading 'website-FINAL06.fig'",children:"Please wait while we upload your file.",progress:60,progressLabel:"60% uploaded...",actions:[{label:"Cancel",onClick:()=>{}},{label:"Upload another",onClick:()=>{}}],onClose:()=>{}}},m={name:"Mobile Layout (narrow container)",render:()=>e.jsx("div",{style:{maxWidth:"343px"},children:e.jsx(o,{type:"warning",title:"Just to let you know",actions:[{label:"Dismiss",onClick:()=>{}},{label:"Learn more",onClick:()=>{}}],onClose:()=>{},children:"Disk space running low on C:\\. Consider cleaning up."})})};var S,T,D;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    type: 'primary',
    title: "We've just released a new update!",
    children: 'Check out the all new dashboard view. Pages and exports now load faster.',
    actions: [{
      label: 'Dismiss',
      onClick: () => {}
    }, {
      label: 'View changes',
      onClick: () => {}
    }]
  }
}`,...(D=(T=t.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var _,P,I;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    onClose: () => {}
  }
}`,...(I=(P=n.parameters)==null?void 0:P.docs)==null?void 0:I.source}}};var A,R,L;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    type: 'error',
    title: 'This project has been unpublished',
    children: 'Please contact the owner to restore access.',
    actions: [{
      label: 'Dismiss',
      onClick: () => {}
    }, {
      label: 'Contact owner',
      onClick: () => {}
    }],
    onClose: () => {}
  }
}`,...(L=(R=l.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var q,E,W;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    type: 'success',
    title: 'Successfully updated profile',
    children: 'Your changes have been saved.',
    actions: [{
      label: 'Dismiss',
      onClick: () => {}
    }, {
      label: 'View profile',
      onClick: () => {}
    }]
  }
}`,...(W=(E=c.parameters)==null?void 0:E.docs)==null?void 0:W.source}}};var V,U,$;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <Notification type="primary" title="Primary" onClose={() => {}}>
        System update available.
      </Notification>
      <Notification type="gray" title="Gray" onClose={() => {}}>
        No new notifications.
      </Notification>
      <Notification type="success" title="Success" onClose={() => {}}>
        Configuration saved successfully.
      </Notification>
      <Notification type="warning" title="Warning" onClose={() => {}}>
        Disk space running low.
      </Notification>
      <Notification type="error" title="Error" onClose={() => {}}>
        Fatal error: Sector not found.
      </Notification>
    </div>
}`,...($=(U=d.parameters)==null?void 0:U.docs)==null?void 0:$.source}}};var Y,F,M;p.parameters={...p.parameters,docs:{...(Y=p.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    showIcon: false,
    title: 'Updates have been made to your profile',
    children: 'Your recent changes are now live.',
    actions: [{
      label: 'Dismiss',
      onClick: () => {}
    }, {
      label: 'View changes',
      onClick: () => {}
    }],
    onClose: () => {}
  }
}`,...(M=(F=p.parameters)==null?void 0:F.docs)==null?void 0:M.source}}};var z,O,B;u.parameters={...u.parameters,docs:{...(z=u.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    type: 'primary',
    title: "Uploading 'website-FINAL06.fig'",
    children: 'Please wait while we upload your file.',
    progress: 60,
    progressLabel: '60% uploaded...',
    actions: [{
      label: 'Cancel',
      onClick: () => {}
    }, {
      label: 'Upload another',
      onClick: () => {}
    }],
    onClose: () => {}
  }
}`,...(B=(O=u.parameters)==null?void 0:O.docs)==null?void 0:B.source}}};var G,J,H;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: 'Mobile Layout (narrow container)',
  render: () => <div style={{
    maxWidth: '343px'
  }}>
      <Notification type="warning" title="Just to let you know" actions={[{
      label: 'Dismiss',
      onClick: () => {}
    }, {
      label: 'Learn more',
      onClick: () => {}
    }]} onClose={() => {}}>
        Disk space running low on C:\\. Consider cleaning up.
      </Notification>
    </div>
}`,...(H=(J=m.parameters)==null?void 0:J.docs)==null?void 0:H.source}}};const Ce=["Default","WithCloseButton","ErrorType","SuccessType","AllTypes","NoIcon","WithProgress","MobileLayout"];export{d as AllTypes,t as Default,l as ErrorType,m as MobileLayout,p as NoIcon,c as SuccessType,n as WithCloseButton,u as WithProgress,Ce as __namedExportsOrder,we as default};
