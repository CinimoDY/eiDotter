import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as a}from"./iframe-DLEjTnR4.js";import{r as te}from"./index-BVbWfVPw.js";import{I as oe}from"./Icon-CqEaCbnm.js";import{p as re}from"./prefersReducedMotion-lKH2k1Yv.js";import{c as ae}from"./cn-CvUv5FIJ.js";import{B as o}from"./Button-ldI8bcNF.js";import{c as ne}from"./registry-BXQUvPFZ.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DCDPYD8f.js";import"./useFocusRing-B9CBo9Hr.js";/* empty css                  */function ie(r){if(typeof document>"u")return null;const i=a.useRef(null);if(!i.current){const t=document.createElement("div");t.setAttribute("data-eidotter-portal",""),i.current=t}return a.useEffect(()=>{const t=i.current;return document.body.appendChild(t),()=>{t.remove()}},[]),a.useEffect(()=>{const t=r.current,u=i.current;if(!t)return;const s=t.closest("[data-theme]");function m(){const l=s==null?void 0:s.getAttribute("data-theme");l?u.setAttribute("data-theme",l):u.removeAttribute("data-theme")}if(m(),!s)return;const p=new MutationObserver(m);return p.observe(s,{attributes:!0,attributeFilter:["data-theme"]}),()=>p.disconnect()},[r]),i.current}const B=({isOpen:r,onClose:i,onOpenChange:t,title:u,children:s,footer:m,className:p=""})=>{const l=a.useRef(null),M=a.useRef(r),c=a.useRef(!1),T=a.useRef(null),D=a.useId(),[Q,h]=a.useState(!1),k=ie(T),q=a.useCallback(()=>{const n=l.current;if(!(!n||!n.open||c.current)){if(re()){n.close();return}c.current=!0,h(!0)}},[]),X=a.useCallback(n=>{if(n.animationName==="modal-crt-exit"&&c.current){c.current=!1,h(!1);const g=l.current;g!=null&&g.open&&g.close()}},[]);a.useEffect(()=>{const n=l.current;n&&(r&&c.current?(c.current=!1,h(!1)):r&&!n.open?(c.current=!1,h(!1),n.showModal()):!r&&n.open&&q(),r!==M.current&&(M.current=r,t==null||t(r)))},[r,t,q]);const Z=()=>{i()},$=n=>{n.target===l.current&&i()},ee=ae("eidotter-modal",Q&&"eidotter-modal--closing",p);return e.jsxs(e.Fragment,{children:[e.jsx("span",{ref:T,style:{display:"none"},"aria-hidden":"true"}),k&&te.createPortal(e.jsx("dialog",{ref:l,className:ee,"aria-labelledby":D,onClose:Z,onClick:$,onAnimationEnd:X,children:e.jsxs("div",{className:"eidotter-modal__container",children:[e.jsxs("header",{className:"eidotter-modal__header",children:[e.jsx("h2",{id:D,className:"eidotter-modal__title",children:u}),e.jsx("button",{type:"button",className:"eidotter-modal__close",onClick:i,"aria-label":"Close modal",children:e.jsx(oe,{name:"Close",size:"S"})})]}),e.jsx("div",{className:"eidotter-modal__body",children:s}),m&&e.jsx("footer",{className:"eidotter-modal__footer",children:m})]})}),k)]})};B.__docgenInfo={description:"",methods:[],displayName:"Modal",props:{isOpen:{required:!0,tsType:{name:"boolean"},description:"Whether the modal is open"},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when modal should close (escape, backdrop, close button)"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(isOpen: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isOpen"}],return:{name:"void"}}},description:`Called when the modal's open state actually changes.
Fires after the dialog opens or closes, enabling agents
to observe state transitions (e.g. form ready, dialog dismissed).`},title:{required:!0,tsType:{name:"string"},description:"Modal title (required for accessibility)"},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Modal body content"},footer:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Footer content, typically action buttons"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name",defaultValue:{value:"''",computed:!1}}}};const ve={title:"Components/Modal",component:B,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:ne.Modal},tags:["autodocs"],argTypes:{isOpen:{control:"boolean",description:"Whether the modal is open"},title:{control:"text",description:"Modal title (required for accessibility)"},onClose:{action:"close"},onOpenChange:{action:"openChange"}}},d=({title:r,children:i,footer:t})=>{const[u,s]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(o,{onClick:()=>s(!0),children:"Open Modal"}),e.jsx(B,{isOpen:u,onClose:()=>s(!1),title:r,footer:t,children:i})]})},f={render:()=>e.jsx(d,{title:"Modal Title",children:e.jsx("p",{children:"This is the modal body content. You can put any content here."})})},x={render:()=>e.jsx(d,{title:"Confirm Action",footer:e.jsxs(e.Fragment,{children:[e.jsx(o,{variant:"ghost",children:"Cancel"}),e.jsx(o,{variant:"primary",children:"Confirm"})]}),children:e.jsx("p",{children:"Are you sure you want to proceed with this action?"})})},y={render:()=>e.jsx(d,{title:"Terms and Conditions",footer:e.jsxs(e.Fragment,{children:[e.jsx(o,{variant:"ghost",children:"Decline"}),e.jsx(o,{variant:"primary",children:"Accept"})]}),children:e.jsxs("div",{children:[e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}),e.jsx("p",{children:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}),e.jsx("p",{children:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}),e.jsx("p",{children:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})})},v={render:()=>e.jsx(d,{title:"Delete Item",footer:e.jsxs(e.Fragment,{children:[e.jsx(o,{variant:"ghost",children:"Cancel"}),e.jsx(o,{variant:"primary",children:"Delete"})]}),children:e.jsx("p",{children:"Are you sure you want to delete this item? This action cannot be undone."})})},j={render:()=>e.jsx(d,{title:"Button Variants",footer:e.jsxs(e.Fragment,{children:[e.jsx(o,{variant:"link",children:"Link"}),e.jsx(o,{variant:"ghost",children:"Ghost"}),e.jsx(o,{variant:"secondary",children:"Secondary"}),e.jsx(o,{variant:"primary",children:"Confirm"})]}),children:e.jsx("p",{children:"All four Button variants in the Modal footer."})})},b={render:()=>e.jsxs("div",{"data-theme":"cga-mode4-p1",style:{padding:"2rem"},children:[e.jsxs("p",{style:{color:"var(--color-semantic-text-primary)",marginBottom:"1rem"},children:["This section uses ",e.jsx("code",{children:"cga-mode4-p1"})," theme. The Modal portal should inherit these theme tokens."]}),e.jsx(d,{title:"Theme Propagation Test",footer:e.jsxs(e.Fragment,{children:[e.jsx(o,{variant:"ghost",children:"Cancel"}),e.jsx(o,{variant:"primary",children:"Confirm"})]}),children:e.jsx("p",{children:"This modal content should use cga-mode4-p1 theme colors, not the page default."})})]})},C={render:()=>e.jsx(d,{title:"Create New Project",footer:e.jsxs(e.Fragment,{children:[e.jsx(o,{variant:"ghost",children:"Cancel"}),e.jsx(o,{variant:"primary",children:"Create"})]}),children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("label",{style:{color:"var(--color-cga-lightGray)"},children:["Project Name",e.jsx("input",{type:"text",placeholder:"Enter project name",style:{display:"block",width:"100%",marginTop:"4px",padding:"8px",background:"var(--color-cga-black)",border:"1px solid var(--color-cga-darkGray)",color:"var(--color-cga-lightGray)",fontFamily:"inherit"}})]}),e.jsxs("label",{style:{color:"var(--color-cga-lightGray)"},children:["Description",e.jsx("textarea",{placeholder:"Enter description",rows:3,style:{display:"block",width:"100%",marginTop:"4px",padding:"8px",background:"var(--color-cga-black)",border:"1px solid var(--color-cga-darkGray)",color:"var(--color-cga-lightGray)",fontFamily:"inherit",resize:"vertical"}})]})]})})};var w,R,F;f.parameters={...f.parameters,docs:{...(w=f.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Modal Title">
      <p>This is the modal body content. You can put any content here.</p>
    </ModalDemo>
}`,...(F=(R=f.parameters)==null?void 0:R.docs)==null?void 0:F.source}}};var N,A,S;x.parameters={...x.parameters,docs:{...(N=x.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Confirm Action" footer={<>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </>}>
      <p>Are you sure you want to proceed with this action?</p>
    </ModalDemo>
}`,...(S=(A=x.parameters)==null?void 0:A.docs)==null?void 0:S.source}}};var E,_,G;y.parameters={...y.parameters,docs:{...(E=y.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(G=(_=y.parameters)==null?void 0:_.docs)==null?void 0:G.source}}};var P,I,L;v.parameters={...v.parameters,docs:{...(P=v.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Delete Item" footer={<>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Delete</Button>
        </>}>
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
    </ModalDemo>
}`,...(L=(I=v.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var V,W,U;j.parameters={...j.parameters,docs:{...(V=j.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Button Variants" footer={<>
          <Button variant="link">Link</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="primary">Confirm</Button>
        </>}>
      <p>All four Button variants in the Modal footer.</p>
    </ModalDemo>
}`,...(U=(W=j.parameters)==null?void 0:W.docs)==null?void 0:U.source}}};var z,Y,O;b.parameters={...b.parameters,docs:{...(z=b.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(O=(Y=b.parameters)==null?void 0:Y.docs)==null?void 0:O.source}}};var H,J,K;C.parameters={...C.parameters,docs:{...(H=C.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
        color: 'var(--color-cga-lightGray)'
      }}>
          Project Name
          <input type="text" placeholder="Enter project name" style={{
          display: 'block',
          width: '100%',
          marginTop: '4px',
          padding: '8px',
          background: 'var(--color-cga-black)',
          border: '1px solid var(--color-cga-darkGray)',
          color: 'var(--color-cga-lightGray)',
          fontFamily: 'inherit'
        }} />
        </label>
        <label style={{
        color: 'var(--color-cga-lightGray)'
      }}>
          Description
          <textarea placeholder="Enter description" rows={3} style={{
          display: 'block',
          width: '100%',
          marginTop: '4px',
          padding: '8px',
          background: 'var(--color-cga-black)',
          border: '1px solid var(--color-cga-darkGray)',
          color: 'var(--color-cga-lightGray)',
          fontFamily: 'inherit',
          resize: 'vertical'
        }} />
        </label>
      </div>
    </ModalDemo>
}`,...(K=(J=C.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};const je=["Default","WithFooter","LongContent","DeleteConfirmation","AllButtonVariants","ThemePropagation","FormModal"];export{j as AllButtonVariants,f as Default,v as DeleteConfirmation,C as FormModal,y as LongContent,b as ThemePropagation,x as WithFooter,je as __namedExportsOrder,ve as default};
