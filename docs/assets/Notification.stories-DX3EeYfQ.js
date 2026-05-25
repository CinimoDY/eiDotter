import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";import{m as o,t as s}from"./exports-BpCMfcBQ.js";import{n as c,t as l}from"./Icon-CtcS3o9J.js";import{n as u,t as d}from"./useAnimatedDismiss-BcLHVxl6.js";import{n as f,t as p}from"./Progress-DSfd0atb.js";var m=e((()=>{})),h,g,_,v,y=e((()=>{h=t(n(),1),s(),i(),c(),f(),d(),m(),g=r(),_={primary:`Info`,gray:`Info`,success:`Done`,warning:`Warning`,error:`Error`},v=({type:e=`primary`,title:t,children:n,actions:r,onClose:i,avatar:s,image:c,progress:d,progressLabel:f,duration:m,showIcon:v=!0,className:y})=>{let{isClosing:b,triggerClose:x,handleAnimationEnd:S}=u(`notification-exit`,i);(0,h.useEffect)(()=>{if(m==null||!i)return;let e=setTimeout(()=>x(),m);return()=>clearTimeout(e)},[m,i,x]);let C=v&&!s,w=d!=null;return(0,g.jsxs)(`div`,{className:a(`w-full max-w-[400px]`,`font-dos text-dos-text-sm`,`border border-dos-border-default rounded-dos-base`,`eidotter-notification`,`eidotter-notification--${e}`,b&&`eidotter-notification--closing`,y),onAnimationEnd:S,role:e===`error`?`alert`:`status`,"data-type":e,children:[c&&(0,g.jsx)(`div`,{className:`eidotter-notification__image`,children:c}),(0,g.jsxs)(`div`,{className:`flex flex-row gap-4 p-4`,children:[s&&(0,g.jsx)(`div`,{className:`eidotter-notification__avatar flex-shrink-0`,children:s}),C&&(0,g.jsx)(`div`,{className:`eidotter-notification__icon`,children:(0,g.jsx)(l,{name:_[e]||`Info`,size:`S`,"aria-label":`${e} notification`})}),(0,g.jsxs)(`div`,{className:a(`flex-1 flex flex-col gap-3 min-w-0`,i&&!C&&!s&&`pr-8`),children:[(t||n)&&(0,g.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[t&&(0,g.jsx)(`div`,{className:`eidotter-notification__title font-dos leading-[140%]`,children:t}),n&&(0,g.jsx)(`div`,{className:`eidotter-notification__text font-dos leading-[140%]`,children:n})]}),w&&(0,g.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[(0,g.jsx)(p,{value:d,max:100,size:`sm`,fullWidth:!0,showLabel:!1}),f&&(0,g.jsx)(`div`,{className:`eidotter-notification__text font-dos text-dos-text-xs`,children:f})]}),r&&r.length>0&&(0,g.jsx)(`div`,{className:`flex flex-row gap-3`,children:r.map((e,t)=>(0,g.jsxs)(o,{className:`eidotter-notification__action`,onPress:e.onClick,children:[e.label,e.icon]},t))})]}),i&&(0,g.jsx)(o,{className:`eidotter-notification__close`,onPress:x,"aria-label":`Close notification`,children:(0,g.jsx)(l,{name:`Close`,size:`S`})})]})]})},v.__docgenInfo={description:`DOS-styled Notification (toast) with V.37 design: layered amber glow,
featured icon with outline rings, optional progress bar and auto-dismiss.

Purely presentational — consumers handle positioning.`,methods:[],displayName:`Notification`,props:{type:{required:!1,tsType:{name:`union`,raw:`'primary' | 'gray' | 'success' | 'warning' | 'error'`,elements:[{name:`literal`,value:`'primary'`},{name:`literal`,value:`'gray'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'error'`}]},description:`Color/icon variant`,defaultValue:{value:`'primary'`,computed:!1}},title:{required:!1,tsType:{name:`string`},description:`Title text`},children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Supporting text / description`},actions:{required:!1,tsType:{name:`Array`,elements:[{name:`AlertAction`}],raw:`AlertAction[]`},description:`Action buttons`},onClose:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Close handler — shows close button when provided`},avatar:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Renders avatar element instead of featured icon`},image:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Renders image element above text content`},progress:{required:!1,tsType:{name:`number`},description:`Progress value 0-100 — renders Progress bar below text`},progressLabel:{required:!1,tsType:{name:`string`},description:`Label for progress bar`},duration:{required:!1,tsType:{name:`number`},description:`Auto-dismiss after N milliseconds`},showIcon:{required:!1,tsType:{name:`boolean`},description:`Hide the featured icon`,defaultValue:{value:`true`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class`}}}})),b,x,S,C,w,T,E,D,O,k,A;e((()=>{n(),y(),b=r(),x={title:`Components/Notification`,component:v,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]}},tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`primary`,`gray`,`success`,`warning`,`error`]},title:{control:`text`},children:{control:`text`},showIcon:{control:`boolean`},progress:{control:{type:`range`,min:0,max:100}},progressLabel:{control:`text`},duration:{control:`number`},onClose:{action:`close clicked`}}},S={args:{type:`primary`,title:`We've just released a new update!`,children:`Check out the all new dashboard view. Pages and exports now load faster.`,actions:[{label:`Dismiss`,onClick:()=>{}},{label:`View changes`,onClick:()=>{}}]}},C={args:{...S.args,onClose:()=>{}}},w={args:{type:`error`,title:`This project has been unpublished`,children:`Please contact the owner to restore access.`,actions:[{label:`Dismiss`,onClick:()=>{}},{label:`Contact owner`,onClick:()=>{}}],onClose:()=>{}}},T={args:{type:`success`,title:`Successfully updated profile`,children:`Your changes have been saved.`,actions:[{label:`Dismiss`,onClick:()=>{}},{label:`View profile`,onClick:()=>{}}]}},E={render:()=>(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,b.jsx)(v,{type:`primary`,title:`Primary`,onClose:()=>{},children:`System update available.`}),(0,b.jsx)(v,{type:`gray`,title:`Gray`,onClose:()=>{},children:`No new notifications.`}),(0,b.jsx)(v,{type:`success`,title:`Success`,onClose:()=>{},children:`Configuration saved successfully.`}),(0,b.jsx)(v,{type:`warning`,title:`Warning`,onClose:()=>{},children:`Disk space running low.`}),(0,b.jsx)(v,{type:`error`,title:`Error`,onClose:()=>{},children:`Fatal error: Sector not found.`})]})},D={args:{showIcon:!1,title:`Updates have been made to your profile`,children:`Your recent changes are now live.`,actions:[{label:`Dismiss`,onClick:()=>{}},{label:`View changes`,onClick:()=>{}}],onClose:()=>{}}},O={args:{type:`primary`,title:`Uploading 'website-FINAL06.fig'`,children:`Please wait while we upload your file.`,progress:60,progressLabel:`60% uploaded...`,actions:[{label:`Cancel`,onClick:()=>{}},{label:`Upload another`,onClick:()=>{}}],onClose:()=>{}}},k={name:`Mobile Layout (narrow container)`,render:()=>(0,b.jsx)(`div`,{style:{maxWidth:`343px`},children:(0,b.jsx)(v,{type:`warning`,title:`Just to let you know`,actions:[{label:`Dismiss`,onClick:()=>{}},{label:`Learn more`,onClick:()=>{}}],onClose:()=>{},children:`Disk space running low on C:\\. Consider cleaning up.`})})},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    onClose: () => {}
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A=[`Default`,`WithCloseButton`,`ErrorType`,`SuccessType`,`AllTypes`,`NoIcon`,`WithProgress`,`MobileLayout`]}))();export{E as AllTypes,S as Default,w as ErrorType,k as MobileLayout,D as NoIcon,T as SuccessType,C as WithCloseButton,O as WithProgress,A as __namedExportsOrder,x as default};