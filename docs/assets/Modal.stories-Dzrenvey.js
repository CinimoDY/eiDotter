import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{r,t as i}from"./registry-EhIcK3QA.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./cn-CHNjZLmO.js";import{n as c,t as l}from"./DosDialog-ClJmGf0M.js";import{n as u,t as d}from"./IconButton-6lIXA5ND.js";import{n as f,t as p}from"./Button-DYwuDaLT.js";import"./Modal-ChQgXbl3.js";var m,h,g;function _(){return(_=t((()=>{m=e(n(),1),u(),c(),o(),h=a(),g=(0,m.forwardRef)(({isOpen:e,onOpenChange:t,onClose:n,title:r,children:i,footer:a,size:o=`md`,isDismissable:c=!0,className:u},f)=>{let p=(0,m.useRef)(e),g=(0,m.useRef)(!1);(0,m.useEffect)(()=>{e!==p.current&&(p.current=e,g.current||(t?.(e),e||n?.()),g.current=!1)},[e,t,n]);let _=e=>{g.current=!0,t?.(e),e||n?.()};return(0,h.jsx)(l,{ref:f,open:e,onOpenChange:_,isDismissable:c,size:o,"aria-label":r,className:s(`eidotter-modal__container`,u),head:{title:r,end:(0,h.jsx)(d,{icon:`Close`,label:`Close modal`,className:`eidotter-modal__close`,onPress:()=>_(!1)})},footer:a?(0,h.jsx)(`footer`,{className:`eidotter-modal__footer`,children:a}):void 0,children:(0,h.jsx)(`div`,{className:`eidotter-modal__body`,children:i})})}),g.displayName=`Modal`,g.__docgenInfo={description:`DOS-styled Modal on the DosDialog shell (DMNC-1592).
The title sits in the title strip with the close control at its end; the
footer keeps its 1px top rule. React Aria provides focus trapping, scroll
lock, backdrop dismiss, and escape handling.
Ref forwards to the dialog element (not the overlay).

The close IconButton carries \`eidotter-modal__close\`. eidotter ships no CSS
for it; it is kept as a stable consumer hook for targeting the control.`,methods:[],displayName:`Modal`,props:{isOpen:{required:!0,tsType:{name:`boolean`},description:`Whether the modal is open`},onOpenChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(isOpen: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`isOpen`}],return:{name:`void`}}},description:`Called when the modal's open state changes (React Aria convention)`},onClose:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:"@deprecated Use `onOpenChange` instead. Called when modal should close."},title:{required:!0,tsType:{name:`string`},description:`Modal title (required for accessibility). Rendered in the title strip.`},children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Modal body content`},footer:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Footer content, typically action buttons`},size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md' | 'lg' | 'full'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`},{name:`literal`,value:`'lg'`},{name:`literal`,value:`'full'`}]},description:"Width step from the shared dialog map (DosDialog): `sm` 24rem,\n`md` 30rem (default, the historical 480px), `lg` 40rem, `full`.",defaultValue:{value:`'md'`,computed:!1}},isDismissable:{required:!1,tsType:{name:`boolean`},description:"Close on backdrop click. Escape and the close button always close. Defaults to `true`.",defaultValue:{value:`true`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Optional CSS class name, merged onto the dialog container`}}}})))()}var v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=t((()=>{v=e(n(),1),_(),f(),r(),y=a(),b={title:`Components/Modal`,component:g,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:i.Modal},tags:[`autodocs`],argTypes:{isOpen:{control:`boolean`,description:`Whether the modal is open`},title:{control:`text`,description:`Modal title (required for accessibility)`},onClose:{action:`close`},onOpenChange:{action:`openChange`}}},x=({title:e,children:t,footer:n})=>{let[r,i]=(0,v.useState)(!1);return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{onClick:()=>i(!0),children:`Open Modal`}),(0,y.jsx)(g,{isOpen:r,onClose:()=>i(!1),title:e,footer:n,children:t})]})},S={render:()=>(0,y.jsx)(x,{title:`Modal Title`,children:(0,y.jsx)(`p`,{children:`This is the modal body content. You can put any content here.`})})},C={render:()=>(0,y.jsx)(x,{title:`Confirm Action`,footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{variant:`ghost`,children:`Cancel`}),(0,y.jsx)(p,{variant:`primary`,children:`Confirm`})]}),children:(0,y.jsx)(`p`,{children:`Are you sure you want to proceed with this action?`})})},w={render:()=>(0,y.jsx)(x,{title:`Terms and Conditions`,footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{variant:`ghost`,children:`Decline`}),(0,y.jsx)(p,{variant:`primary`,children:`Accept`})]}),children:(0,y.jsxs)(`div`,{children:[(0,y.jsx)(`p`,{children:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}),(0,y.jsx)(`p`,{children:`Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}),(0,y.jsx)(`p`,{children:`Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`}),(0,y.jsx)(`p`,{children:`Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}),(0,y.jsx)(`p`,{children:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}),(0,y.jsx)(`p`,{children:`Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`})]})})},T={render:()=>(0,y.jsx)(x,{title:`Delete all archived project timeline items`,children:(0,y.jsx)(`p`,{children:`The full title stays readable: Modal titles wrap in the strip.`})})},E={render:()=>(0,y.jsx)(x,{title:`Delete Item`,footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{variant:`ghost`,children:`Cancel`}),(0,y.jsx)(p,{variant:`primary`,children:`Delete`})]}),children:(0,y.jsx)(`p`,{children:`Are you sure you want to delete this item? This action cannot be undone.`})})},D={render:()=>(0,y.jsx)(x,{title:`Button Variants`,footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{variant:`link`,children:`Link`}),(0,y.jsx)(p,{variant:`ghost`,children:`Ghost`}),(0,y.jsx)(p,{variant:`secondary`,children:`Secondary`}),(0,y.jsx)(p,{variant:`primary`,children:`Confirm`})]}),children:(0,y.jsx)(`p`,{children:`All four Button variants in the Modal footer.`})})},O={render:()=>(0,y.jsxs)(`div`,{"data-theme":`cga-mode4-p1`,style:{padding:`2rem`},children:[(0,y.jsxs)(`p`,{style:{color:`var(--color-semantic-text-primary)`,marginBottom:`1rem`},children:[`This section uses `,(0,y.jsx)(`code`,{children:`cga-mode4-p1`}),` theme. The Modal portal should inherit these theme tokens.`]}),(0,y.jsx)(x,{title:`Theme Propagation Test`,footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{variant:`ghost`,children:`Cancel`}),(0,y.jsx)(p,{variant:`primary`,children:`Confirm`})]}),children:(0,y.jsx)(`p`,{children:`This modal content should use cga-mode4-p1 theme colors, not the page default.`})})]})},k={render:()=>(0,y.jsx)(x,{title:`Create New Project`,footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{variant:`ghost`,children:`Cancel`}),(0,y.jsx)(p,{variant:`primary`,children:`Create`})]}),children:(0,y.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,y.jsxs)(`label`,{style:{color:`var(--color-cga-light-gray)`},children:[`Project Name`,(0,y.jsx)(`input`,{type:`text`,placeholder:`Enter project name`,style:{display:`block`,width:`100%`,marginTop:`4px`,padding:`8px`,background:`var(--color-cga-black)`,border:`1px solid var(--color-cga-dark-gray)`,color:`var(--color-cga-light-gray)`,fontFamily:`inherit`}})]}),(0,y.jsxs)(`label`,{style:{color:`var(--color-cga-light-gray)`},children:[`Description`,(0,y.jsx)(`textarea`,{placeholder:`Enter description`,rows:3,style:{display:`block`,width:`100%`,marginTop:`4px`,padding:`8px`,background:`var(--color-cga-black)`,border:`1px solid var(--color-cga-dark-gray)`,color:`var(--color-cga-light-gray)`,fontFamily:`inherit`,resize:`vertical`}})]})]})})},A=[`Default`,`WithFooter`,`LongContent`,`LongTitle`,`DeleteConfirmation`,`AllButtonVariants`,`ThemePropagation`,`FormModal`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Modal Title">
      <p>This is the modal body content. You can put any content here.</p>
    </ModalDemo>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Confirm Action" footer={<>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </>}>
      <p>Are you sure you want to proceed with this action?</p>
    </ModalDemo>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Delete all archived project timeline items">
      <p>The full title stays readable: Modal titles wrap in the strip.</p>
    </ModalDemo>
}`,...T.parameters?.docs?.source},description:{story:`A ~40-character title wraps onto a second strip line instead of being cut off.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Delete Item" footer={<>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Delete</Button>
        </>}>
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
    </ModalDemo>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Button Variants" footer={<>
          <Button variant="link">Link</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="primary">Confirm</Button>
        </>}>
      <p>All four Button variants in the Modal footer.</p>
    </ModalDemo>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}}})))()}j();export{D as AllButtonVariants,S as Default,E as DeleteConfirmation,k as FormModal,w as LongContent,T as LongTitle,O as ThemePropagation,C as WithFooter,A as __namedExportsOrder,b as default};