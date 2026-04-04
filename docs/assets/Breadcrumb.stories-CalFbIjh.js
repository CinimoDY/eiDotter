import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as i}from"./Breadcrumb-BH91x1Ux.js";import{c as k}from"./registry-BXQUvPFZ.js";import"./cn-CvUv5FIJ.js";const U={title:"Components/Breadcrumb",component:i,parameters:{layout:"centered",projectMeta:k.Breadcrumb},tags:["autodocs"],argTypes:{trail:{control:"object",description:"Array of breadcrumb trail items"},currentLabel:{control:"text",description:"Current page label"},showBackArrow:{control:"boolean",description:"Show back arrow on last trail item"},separator:{control:"text",description:"Custom separator character"}}},r={args:{trail:[{href:"/",label:"Home"},{href:"/projects",label:"Projects"}],currentLabel:"Eidotter"}},a={args:{trail:[{href:"/",label:"Home"}],currentLabel:"About"}},t={args:{trail:[{href:"/",label:"Home"},{href:"/projects",label:"Projects"},{href:"/projects/design-systems",label:"Design Systems"}],currentLabel:"Eidotter"}},o={args:{trail:[],currentLabel:"Home"}},s={args:{trail:[{href:"/",label:"Home"},{href:"/projects",label:"Projects"}],currentLabel:"Eidotter",showBackArrow:!1}},l={args:{trail:[{href:"/",label:"C:"},{href:"/projects",label:"Projects"}],currentLabel:"Readme.txt",separator:"\\"}},n={args:{trail:[{href:"/",label:"C:"},{href:"/dos",label:"DOS"}],currentLabel:"COMMAND.COM",separator:"\\",showBackArrow:!1}},c={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Default"}),e.jsx(i,{trail:[{href:"/",label:"Home"},{href:"/projects",label:"Projects"}],currentLabel:"Eidotter"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"DOS Path Style"}),e.jsx(i,{trail:[{href:"/",label:"C:"},{href:"/dos",label:"DOS"}],currentLabel:"AUTOEXEC.BAT",separator:"\\",showBackArrow:!1})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"10px",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Single Level"}),e.jsx(i,{trail:[{href:"/",label:"Home"}],currentLabel:"Contact"})]})]})};var m,p,d;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(d=(p=r.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var u,b,f;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'Home'
    }],
    currentLabel: 'About'
  }
}`,...(f=(b=a.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var h,g,x;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(x=(g=t.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var S,j,v;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    trail: [],
    currentLabel: 'Home'
  }
}`,...(v=(j=o.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var L,B,y;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(y=(B=s.parameters)==null?void 0:B.docs)==null?void 0:y.source}}};var A,D,C;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(C=(D=l.parameters)==null?void 0:D.docs)==null?void 0:C.source}}};var w,O,E;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(E=(O=n.parameters)==null?void 0:O.docs)==null?void 0:E.source}}};var H,P,T;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(T=(P=c.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};const V=["Default","SingleLevel","DeepNavigation","NoTrail","WithoutBackArrow","CustomSeparator","DOSPath","AllVariants"];export{c as AllVariants,l as CustomSeparator,n as DOSPath,t as DeepNavigation,r as Default,o as NoTrail,a as SingleLevel,s as WithoutBackArrow,V as __namedExportsOrder,U as default};
