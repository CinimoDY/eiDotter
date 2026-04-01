import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as U}from"./registry-BH4hA_P8.js";const a=({trail:t=[],currentLabel:z,showBackArrow:V=!0,separator:b="/",linkComponent:h,className:I=""})=>{const F=["breadcrumb",I].filter(Boolean).join(" "),W=(r,s)=>{const n=e.jsxs(e.Fragment,{children:[V&&s&&e.jsx("span",{className:"breadcrumb__back-arrow","aria-hidden":"true",children:"<"}),e.jsx("span",{children:r.label})]});return h?e.jsx(h,{href:r.href,className:"breadcrumb__link",children:n}):e.jsx("a",{href:r.href,className:"breadcrumb__link",children:n})};return e.jsx("nav",{"aria-label":"Breadcrumb",className:F,children:e.jsxs("ol",{className:"breadcrumb__list",children:[t.map((r,s)=>{const n=s===t.length-1,G=s<t.length-1;return e.jsxs("li",{className:"breadcrumb__item",children:[W(r,n),G&&e.jsx("span",{className:"breadcrumb__separator","aria-hidden":"true",children:b})]},`${r.href}-${r.label}`)}),t.length>0&&e.jsx("li",{className:"breadcrumb__item",children:e.jsx("span",{className:"breadcrumb__separator","aria-hidden":"true",children:b})}),e.jsx("li",{className:"breadcrumb__item breadcrumb__item--current","aria-current":"page",children:e.jsx("span",{className:"breadcrumb__current",children:z})})]})})};a.__docgenInfo={description:`DOS-styled Breadcrumb navigation component

Features:
- Configurable trail items
- Optional back arrow on last trail item
- Custom separator support
- Framework-agnostic (works with any router)
- WCAG 2.1 AA compliant
- DOS-authentic styling with CGA colors`,methods:[],displayName:"Breadcrumb",props:{trail:{required:!1,tsType:{name:"Array",elements:[{name:"BreadcrumbItem"}],raw:"BreadcrumbItem[]"},description:"Array of breadcrumb items forming the trail",defaultValue:{value:"[]",computed:!1}},currentLabel:{required:!0,tsType:{name:"string"},description:"Current page label (not a link)"},showBackArrow:{required:!1,tsType:{name:"boolean"},description:"Show back arrow on the last trail item",defaultValue:{value:"true",computed:!1}},separator:{required:!1,tsType:{name:"string"},description:"Custom separator character",defaultValue:{value:"'/'",computed:!1}},linkComponent:{required:!1,tsType:{name:"ReactComponentType",raw:`React.ComponentType<{
  href: string;
  className?: string;
  children: React.ReactNode;
}>`,elements:[{name:"signature",type:"object",raw:`{
  href: string;
  className?: string;
  children: React.ReactNode;
}`,signature:{properties:[{key:"href",value:{name:"string",required:!0}},{key:"className",value:{name:"string",required:!1}},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}}]}}]},description:`Custom link component (e.g., Next.js Link)
If not provided, uses regular anchor tags`},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name",defaultValue:{value:"''",computed:!1}}}};const J={title:"Components/Breadcrumb",component:a,parameters:{layout:"centered",projectMeta:U.Breadcrumb},tags:["autodocs"],argTypes:{trail:{control:"object",description:"Array of breadcrumb trail items"},currentLabel:{control:"text",description:"Current page label"},showBackArrow:{control:"boolean",description:"Show back arrow on last trail item"},separator:{control:"text",description:"Custom separator character"}}},o={args:{trail:[{href:"/",label:"Home"},{href:"/projects",label:"Projects"}],currentLabel:"Eidotter"}},l={args:{trail:[{href:"/",label:"Home"}],currentLabel:"About"}},c={args:{trail:[{href:"/",label:"Home"},{href:"/projects",label:"Projects"},{href:"/projects/design-systems",label:"Design Systems"}],currentLabel:"Eidotter"}},i={args:{trail:[],currentLabel:"Home"}},m={args:{trail:[{href:"/",label:"Home"},{href:"/projects",label:"Projects"}],currentLabel:"Eidotter",showBackArrow:!1}},d={args:{trail:[{href:"/",label:"C:"},{href:"/projects",label:"Projects"}],currentLabel:"Readme.txt",separator:"\\"}},p={args:{trail:[{href:"/",label:"C:"},{href:"/dos",label:"DOS"}],currentLabel:"COMMAND.COM",separator:"\\",showBackArrow:!1}},u={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Default"}),e.jsx(a,{trail:[{href:"/",label:"Home"},{href:"/projects",label:"Projects"}],currentLabel:"Eidotter"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"DOS Path Style"}),e.jsx(a,{trail:[{href:"/",label:"C:"},{href:"/dos",label:"DOS"}],currentLabel:"AUTOEXEC.BAT",separator:"\\",showBackArrow:!1})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Single Level"}),e.jsx(a,{trail:[{href:"/",label:"Home"}],currentLabel:"Contact"})]})]})};var f,g,x;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'Home'
    }, {
      href: '/projects',
      label: 'Projects'
    }],
    currentLabel: 'Eidotter'
  }
}`,...(x=(g=o.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var j,S,v;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'Home'
    }],
    currentLabel: 'About'
  }
}`,...(v=(S=l.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var y,w,C;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'Home'
    }, {
      href: '/projects',
      label: 'Projects'
    }, {
      href: '/projects/design-systems',
      label: 'Design Systems'
    }],
    currentLabel: 'Eidotter'
  }
}`,...(C=(w=c.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var B,k,A;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    trail: [],
    currentLabel: 'Home'
  }
}`,...(A=(k=i.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var L,N,_;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'Home'
    }, {
      href: '/projects',
      label: 'Projects'
    }],
    currentLabel: 'Eidotter',
    showBackArrow: false
  }
}`,...(_=(N=m.parameters)==null?void 0:N.docs)==null?void 0:_.source}}};var D,T,O;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'C:'
    }, {
      href: '/projects',
      label: 'Projects'
    }],
    currentLabel: 'Readme.txt',
    separator: '\\\\'
  }
}`,...(O=(T=d.parameters)==null?void 0:T.docs)==null?void 0:O.source}}};var E,H,P;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'C:'
    }, {
      href: '/dos',
      label: 'DOS'
    }],
    currentLabel: 'COMMAND.COM',
    separator: '\\\\',
    showBackArrow: false
  }
}`,...(P=(H=p.parameters)==null?void 0:H.docs)==null?void 0:P.source}}};var R,q,M;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
      <div>
        <div style={{
        color: 'var(--color-semantic-text-disabled)',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Default
        </div>
        <Breadcrumb trail={[{
        href: '/',
        label: 'Home'
      }, {
        href: '/projects',
        label: 'Projects'
      }]} currentLabel="Eidotter" />
      </div>
      <div>
        <div style={{
        color: 'var(--color-semantic-text-disabled)',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          DOS Path Style
        </div>
        <Breadcrumb trail={[{
        href: '/',
        label: 'C:'
      }, {
        href: '/dos',
        label: 'DOS'
      }]} currentLabel="AUTOEXEC.BAT" separator="\\" showBackArrow={false} />
      </div>
      <div>
        <div style={{
        color: 'var(--color-semantic-text-disabled)',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Single Level
        </div>
        <Breadcrumb trail={[{
        href: '/',
        label: 'Home'
      }]} currentLabel="Contact" />
      </div>
    </div>
}`,...(M=(q=u.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};const K=["Default","SingleLevel","DeepNavigation","NoTrail","WithoutBackArrow","CustomSeparator","DOSPath","AllVariants"];export{u as AllVariants,d as CustomSeparator,p as DOSPath,c as DeepNavigation,o as Default,i as NoTrail,l as SingleLevel,m as WithoutBackArrow,K as __namedExportsOrder,J as default};
