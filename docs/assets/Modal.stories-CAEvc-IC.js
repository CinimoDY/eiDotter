import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-qdalL59a.js";import{r as A}from"./index-U5RXDE5f.js";import{I}from"./Icon-Bxky9y3F.js";import{B as o}from"./Button-DuquRA5i.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-DysNHEwH.js";const G=({isOpen:t,onClose:a,title:p,children:h,footer:i,className:E=""})=>{const x=u.useRef(null),g=u.useId();u.useEffect(()=>{const r=x.current;r&&(t&&!r.open?r.showModal():!t&&r.open&&r.close())},[t]);const N=()=>{a()},S=r=>{r.target===x.current&&a()};return A.createPortal(e.jsx("dialog",{ref:x,className:`modal ${E}`.trim(),"aria-labelledby":g,onClose:N,onClick:S,children:e.jsxs("div",{className:"modal__container",children:[e.jsxs("header",{className:"modal__header",children:[e.jsx("h2",{id:g,className:"modal__title",children:p}),e.jsx("button",{type:"button",className:"modal__close",onClick:a,"aria-label":"Close modal",children:e.jsx(I,{name:"Close",size:"S"})})]}),e.jsx("div",{className:"modal__body",children:h}),i&&e.jsx("footer",{className:"modal__footer",children:i})]})}),document.body)},Y={title:"Components/Modal",component:G,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{isOpen:{control:"boolean",description:"Whether the modal is open"},title:{control:"text",description:"Modal title (required for accessibility)"},onClose:{action:"close"}}},n=({title:t,children:a,footer:p})=>{const[h,i]=u.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(o,{onClick:()=>i(!0),children:"Open Modal"}),e.jsx(G,{isOpen:h,onClose:()=>i(!1),title:t,footer:p,children:a})]})},l={render:()=>e.jsx(n,{title:"Modal Title",children:e.jsx("p",{children:"This is the modal body content. You can put any content here."})})},s={render:()=>e.jsx(n,{title:"Confirm Action",footer:e.jsxs(e.Fragment,{children:[e.jsx(o,{variant:"ghost",children:"Cancel"}),e.jsx(o,{variant:"primary",children:"Confirm"})]}),children:e.jsx("p",{children:"Are you sure you want to proceed with this action?"})})},c={render:()=>e.jsx(n,{title:"Terms and Conditions",footer:e.jsxs(e.Fragment,{children:[e.jsx(o,{variant:"ghost",children:"Decline"}),e.jsx(o,{variant:"primary",children:"Accept"})]}),children:e.jsxs("div",{children:[e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}),e.jsx("p",{children:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}),e.jsx("p",{children:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}),e.jsx("p",{children:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})})},d={render:()=>e.jsx(n,{title:"Delete Item",footer:e.jsxs(e.Fragment,{children:[e.jsx(o,{variant:"ghost",children:"Cancel"}),e.jsx(o,{variant:"primary",children:"Delete"})]}),children:e.jsx("p",{children:"Are you sure you want to delete this item? This action cannot be undone."})})},m={render:()=>e.jsx(n,{title:"Create New Project",footer:e.jsxs(e.Fragment,{children:[e.jsx(o,{variant:"ghost",children:"Cancel"}),e.jsx(o,{variant:"primary",children:"Create"})]}),children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("label",{style:{color:"var(--color-cga-lightGray)"},children:["Project Name",e.jsx("input",{type:"text",placeholder:"Enter project name",style:{display:"block",width:"100%",marginTop:"4px",padding:"8px",background:"var(--color-cga-black)",border:"1px solid var(--color-cga-darkGray)",color:"var(--color-cga-lightGray)",fontFamily:"inherit"}})]}),e.jsxs("label",{style:{color:"var(--color-cga-lightGray)"},children:["Description",e.jsx("textarea",{placeholder:"Enter description",rows:3,style:{display:"block",width:"100%",marginTop:"4px",padding:"8px",background:"var(--color-cga-black)",border:"1px solid var(--color-cga-darkGray)",color:"var(--color-cga-lightGray)",fontFamily:"inherit",resize:"vertical"}})]})]})})};var y,v,j;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Modal Title">
      <p>This is the modal body content. You can put any content here.</p>
    </ModalDemo>
}`,...(j=(v=l.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var f,b,C;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Confirm Action" footer={<>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </>}>
      <p>Are you sure you want to proceed with this action?</p>
    </ModalDemo>
}`,...(C=(b=s.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var D,k,M;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(M=(k=c.parameters)==null?void 0:k.docs)==null?void 0:M.source}}};var q,B,w;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Delete Item" footer={<>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Delete</Button>
        </>}>
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
    </ModalDemo>
}`,...(w=(B=d.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};var _,F,T;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(T=(F=m.parameters)==null?void 0:F.docs)==null?void 0:T.source}}};const $=["Default","WithFooter","LongContent","DeleteConfirmation","FormModal"];export{l as Default,d as DeleteConfirmation,m as FormModal,c as LongContent,s as WithFooter,$ as __namedExportsOrder,Y as default};
