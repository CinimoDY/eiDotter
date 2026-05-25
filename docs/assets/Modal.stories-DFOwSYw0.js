import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";import{c as o,l as s,m as c,t as l,u}from"./exports-BpCMfcBQ.js";import{n as d,t as f}from"./Icon-CtcS3o9J.js";import{n as p,t as m}from"./registry-BqccLuet.js";import{n as h,t as g}from"./Button-e4Q1UI6E.js";var _=e((()=>{})),v,y,b,x=e((()=>{v=t(n(),1),l(),d(),i(),_(),y=r(),b=(0,v.forwardRef)(({isOpen:e,onOpenChange:t,onClose:n,title:r,children:i,footer:l,className:d},p)=>{let m=(0,v.useRef)(e),h=(0,v.useRef)(!1);(0,v.useEffect)(()=>{e!==m.current&&(m.current=e,h.current||(t?.(e),e||n?.()),h.current=!1)},[e,t,n]);let g=e=>{h.current=!0,t?.(e),e||n?.()};return(0,y.jsx)(s,{isOpen:e,onOpenChange:g,isDismissable:!0,className:({isEntering:e,isExiting:t})=>a(`eidotter-modal-overlay`,e&&`eidotter-modal-overlay--entering`,t&&`eidotter-modal-overlay--exiting`),children:(0,y.jsx)(o,{className:({isEntering:e,isExiting:t})=>a(`eidotter-modal`,e&&`eidotter-modal--entering`,t&&`eidotter-modal--exiting`),children:(0,y.jsxs)(u,{ref:p,"aria-label":r,className:a(`eidotter-modal__container outline-none`,d),children:[(0,y.jsxs)(`header`,{className:`eidotter-modal__header`,children:[(0,y.jsx)(`h2`,{className:`eidotter-modal__title`,children:r}),(0,y.jsx)(c,{className:`eidotter-modal__close`,onPress:()=>g(!1),"aria-label":`Close modal`,children:(0,y.jsx)(f,{name:`Close`,size:`S`})})]}),(0,y.jsx)(`div`,{className:`eidotter-modal__body`,children:i}),l&&(0,y.jsx)(`footer`,{className:`eidotter-modal__footer`,children:l})]})})})}),b.displayName=`Modal`,b.__docgenInfo={description:`DOS-styled Modal with React Aria Dialog.
React Aria provides focus trapping, scroll lock, backdrop dismiss, and escape handling.
CRT phosphor enter/exit animations via isEntering/isExiting render props.
Ref forwards to the inner AriaDialog element (not the overlay).`,methods:[],displayName:`Modal`,props:{isOpen:{required:!0,tsType:{name:`boolean`},description:`Whether the modal is open`},onOpenChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(isOpen: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`isOpen`}],return:{name:`void`}}},description:`Called when the modal's open state changes (React Aria convention)`},onClose:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:"@deprecated Use `onOpenChange` instead. Called when modal should close."},title:{required:!0,tsType:{name:`string`},description:`Modal title (required for accessibility)`},children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Modal body content`},footer:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Footer content, typically action buttons`},className:{required:!1,tsType:{name:`string`},description:`Optional CSS class name`}}}})),S,C,w,T,E,D,O,k,A,j,M,N;e((()=>{S=t(n(),1),x(),h(),p(),C=r(),w={title:`Components/Modal`,component:b,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:m.Modal},tags:[`autodocs`],argTypes:{isOpen:{control:`boolean`,description:`Whether the modal is open`},title:{control:`text`,description:`Modal title (required for accessibility)`},onClose:{action:`close`},onOpenChange:{action:`openChange`}}},T=({title:e,children:t,footer:n})=>{let[r,i]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(g,{onClick:()=>i(!0),children:`Open Modal`}),(0,C.jsx)(b,{isOpen:r,onClose:()=>i(!1),title:e,footer:n,children:t})]})},E={render:()=>(0,C.jsx)(T,{title:`Modal Title`,children:(0,C.jsx)(`p`,{children:`This is the modal body content. You can put any content here.`})})},D={render:()=>(0,C.jsx)(T,{title:`Confirm Action`,footer:(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(g,{variant:`ghost`,children:`Cancel`}),(0,C.jsx)(g,{variant:`primary`,children:`Confirm`})]}),children:(0,C.jsx)(`p`,{children:`Are you sure you want to proceed with this action?`})})},O={render:()=>(0,C.jsx)(T,{title:`Terms and Conditions`,footer:(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(g,{variant:`ghost`,children:`Decline`}),(0,C.jsx)(g,{variant:`primary`,children:`Accept`})]}),children:(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`p`,{children:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}),(0,C.jsx)(`p`,{children:`Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}),(0,C.jsx)(`p`,{children:`Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`}),(0,C.jsx)(`p`,{children:`Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}),(0,C.jsx)(`p`,{children:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}),(0,C.jsx)(`p`,{children:`Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`})]})})},k={render:()=>(0,C.jsx)(T,{title:`Delete Item`,footer:(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(g,{variant:`ghost`,children:`Cancel`}),(0,C.jsx)(g,{variant:`primary`,children:`Delete`})]}),children:(0,C.jsx)(`p`,{children:`Are you sure you want to delete this item? This action cannot be undone.`})})},A={render:()=>(0,C.jsx)(T,{title:`Button Variants`,footer:(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(g,{variant:`link`,children:`Link`}),(0,C.jsx)(g,{variant:`ghost`,children:`Ghost`}),(0,C.jsx)(g,{variant:`secondary`,children:`Secondary`}),(0,C.jsx)(g,{variant:`primary`,children:`Confirm`})]}),children:(0,C.jsx)(`p`,{children:`All four Button variants in the Modal footer.`})})},j={render:()=>(0,C.jsxs)(`div`,{"data-theme":`cga-mode4-p1`,style:{padding:`2rem`},children:[(0,C.jsxs)(`p`,{style:{color:`var(--color-semantic-text-primary)`,marginBottom:`1rem`},children:[`This section uses `,(0,C.jsx)(`code`,{children:`cga-mode4-p1`}),` theme. The Modal portal should inherit these theme tokens.`]}),(0,C.jsx)(T,{title:`Theme Propagation Test`,footer:(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(g,{variant:`ghost`,children:`Cancel`}),(0,C.jsx)(g,{variant:`primary`,children:`Confirm`})]}),children:(0,C.jsx)(`p`,{children:`This modal content should use cga-mode4-p1 theme colors, not the page default.`})})]})},M={render:()=>(0,C.jsx)(T,{title:`Create New Project`,footer:(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(g,{variant:`ghost`,children:`Cancel`}),(0,C.jsx)(g,{variant:`primary`,children:`Create`})]}),children:(0,C.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,C.jsxs)(`label`,{style:{color:`var(--color-cga-light-gray)`},children:[`Project Name`,(0,C.jsx)(`input`,{type:`text`,placeholder:`Enter project name`,style:{display:`block`,width:`100%`,marginTop:`4px`,padding:`8px`,background:`var(--color-cga-black)`,border:`1px solid var(--color-cga-dark-gray)`,color:`var(--color-cga-light-gray)`,fontFamily:`inherit`}})]}),(0,C.jsxs)(`label`,{style:{color:`var(--color-cga-light-gray)`},children:[`Description`,(0,C.jsx)(`textarea`,{placeholder:`Enter description`,rows:3,style:{display:`block`,width:`100%`,marginTop:`4px`,padding:`8px`,background:`var(--color-cga-black)`,border:`1px solid var(--color-cga-dark-gray)`,color:`var(--color-cga-light-gray)`,fontFamily:`inherit`,resize:`vertical`}})]})]})})},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Modal Title">
      <p>This is the modal body content. You can put any content here.</p>
    </ModalDemo>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Confirm Action" footer={<>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </>}>
      <p>Are you sure you want to proceed with this action?</p>
    </ModalDemo>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Terms and Conditions" footer={<>
          <Button variant="ghost">Decline</Button>
          <Button variant="primary">Accept</Button>
        </>}>
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </ModalDemo>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Delete Item" footer={<>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Delete</Button>
        </>}>
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
    </ModalDemo>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Button Variants" footer={<>
          <Button variant="link">Link</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="primary">Confirm</Button>
        </>}>
      <p>All four Button variants in the Modal footer.</p>
    </ModalDemo>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div data-theme="cga-mode4-p1" style={{
    padding: '2rem'
  }}>
      <p style={{
      color: 'var(--color-semantic-text-primary)',
      marginBottom: '1rem'
    }}>
        This section uses <code>cga-mode4-p1</code> theme. The Modal portal
        should inherit these theme tokens.
      </p>
      <ModalDemo title="Theme Propagation Test" footer={<>
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </>}>
        <p>This modal content should use cga-mode4-p1 theme colors, not the page default.</p>
      </ModalDemo>
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Create New Project" footer={<>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Create</Button>
        </>}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
        <label style={{
        color: 'var(--color-cga-light-gray)'
      }}>
          Project Name
          <input type="text" placeholder="Enter project name" style={{
          display: 'block',
          width: '100%',
          marginTop: '4px',
          padding: '8px',
          background: 'var(--color-cga-black)',
          border: '1px solid var(--color-cga-dark-gray)',
          color: 'var(--color-cga-light-gray)',
          fontFamily: 'inherit'
        }} />
        </label>
        <label style={{
        color: 'var(--color-cga-light-gray)'
      }}>
          Description
          <textarea placeholder="Enter description" rows={3} style={{
          display: 'block',
          width: '100%',
          marginTop: '4px',
          padding: '8px',
          background: 'var(--color-cga-black)',
          border: '1px solid var(--color-cga-dark-gray)',
          color: 'var(--color-cga-light-gray)',
          fontFamily: 'inherit',
          resize: 'vertical'
        }} />
        </label>
      </div>
    </ModalDemo>
}`,...M.parameters?.docs?.source}}},N=[`Default`,`WithFooter`,`LongContent`,`DeleteConfirmation`,`AllButtonVariants`,`ThemePropagation`,`FormModal`]}))();export{A as AllButtonVariants,E as Default,k as DeleteConfirmation,M as FormModal,O as LongContent,j as ThemePropagation,D as WithFooter,N as __namedExportsOrder,w as default};