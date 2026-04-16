import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as d}from"./iframe-BU4rT9RF.js";import{N as F,M as T,D as R}from"./Nav-BF0YILcW.js";import"./preload-helper-Dp1pzeXC.js";import"./cn-CvUv5FIJ.js";import"./Icon-CtGTmgBb.js";const i=[{label:"projects",href:"/projects"},{label:"tiny ideas",href:"/blog"},{label:"contact",href:"/contact"}],V=[{label:"work",href:"/work"},{label:"projects",href:"/projects"},{label:"blog",href:"/blog"},{label:"contact",href:"/contact"}],G={title:"Components/Nav",component:F,parameters:{layout:"fullscreen",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["retro","modern"]},activeHref:{control:"text"}}},t={name:"Desktop – Retro",render:()=>e.jsx("div",{style:{padding:"16px"},children:e.jsx(R,{items:i,activeHref:"/projects",variant:"retro"})})},a={name:"Desktop – Modern",render:()=>e.jsx("div",{style:{padding:"16px",backgroundColor:"#fff"},children:e.jsx(R,{items:i,activeHref:"/blog",variant:"modern"})}),parameters:{backgrounds:{default:"light",values:[{name:"light",value:"#ffffff"}]}}},r={name:"Mobile – MENU trigger (closed)",render:()=>e.jsx("div",{style:{padding:"16px"},children:e.jsx(T,{items:i,activeHref:"/projects",variant:"retro"})}),parameters:{viewport:{defaultViewport:"phone375"},docs:{description:{story:"The MENU text button replaces the previous hamburger icon. Click to open the right-side flyout panel."}}}};function I(U){const p=d.useRef(null);return d.useEffect(()=>{var c;const l=(c=p.current)==null?void 0:c.querySelector(".eidotter-nav__menu-trigger");l==null||l.click()},[]),e.jsx("div",{ref:p,children:e.jsx(T,{...U})})}const o={name:"Mobile – flyout panel (open)",render:()=>e.jsx(I,{items:V,activeHref:"/work",variant:"retro"}),parameters:{viewport:{defaultViewport:"phone375"},docs:{description:{story:"The flyout panel slides in from the right. Nav links are right-aligned and uppercase. Clicking any link, the backdrop, the ✕ button, or pressing Escape closes the panel."}}}},s={name:"Mobile – flyout panel, Modern variant",render:()=>e.jsx(I,{items:V,activeHref:"/projects",variant:"modern"}),parameters:{viewport:{defaultViewport:"phone375"},backgrounds:{default:"light",values:[{name:"light",value:"#ffffff"}]}}},n={name:"Full Nav (responsive)",args:{items:i,activeHref:"/projects",variant:"retro"}};var m,u,f;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: 'Desktop – Retro',
  render: () => <div style={{
    padding: '16px'
  }}>
      <DesktopNav items={sampleItems} activeHref="/projects" variant="retro" />
    </div>
}`,...(f=(u=t.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var v,g,h;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'Desktop – Modern',
  render: () => <div style={{
    padding: '16px',
    backgroundColor: '#fff'
  }}>
      <DesktopNav items={sampleItems} activeHref="/blog" variant="modern" />
    </div>,
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{
        name: 'light',
        value: '#ffffff'
      }]
    }
  }
}`,...(h=(g=a.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var b,k,M,y,x;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: 'Mobile – MENU trigger (closed)',
  render: () => <div style={{
    padding: '16px'
  }}>
      <MobileNav items={sampleItems} activeHref="/projects" variant="retro" />
    </div>,
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    docs: {
      description: {
        story: 'The MENU text button replaces the previous hamburger icon. Click to open the right-side flyout panel.'
      }
    }
  }
}`,...(M=(k=r.parameters)==null?void 0:k.docs)==null?void 0:M.source},description:{story:`Shows the MENU text button in its resting state at mobile width.
Click it to open the flyout panel.`,...(x=(y=r.parameters)==null?void 0:y.docs)==null?void 0:x.description}}};var j,N,w;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: 'Mobile – flyout panel (open)',
  render: () => <MobileNavOpen items={richer} activeHref="/work" variant="retro" />,
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    docs: {
      description: {
        story: 'The flyout panel slides in from the right. Nav links are right-aligned and uppercase. ' + 'Clicking any link, the backdrop, the ✕ button, or pressing Escape closes the panel.'
      }
    }
  }
}`,...(w=(N=o.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};var H,D,E;s.parameters={...s.parameters,docs:{...(H=s.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: 'Mobile – flyout panel, Modern variant',
  render: () => <MobileNavOpen items={richer} activeHref="/projects" variant="modern" />,
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    backgrounds: {
      default: 'light',
      values: [{
        name: 'light',
        value: '#ffffff'
      }]
    }
  }
}`,...(E=(D=s.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var C,O,S;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: 'Full Nav (responsive)',
  args: {
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro'
  }
}`,...(S=(O=n.parameters)==null?void 0:O.docs)==null?void 0:S.source}}};const J=["RetroDesktop","ModernDesktop","MobileTrigger","MobilePanelOpen","MobilePanelOpenModern","FullNav"];export{n as FullNav,o as MobilePanelOpen,s as MobilePanelOpenModern,r as MobileTrigger,a as ModernDesktop,t as RetroDesktop,J as __namedExportsOrder,G as default};
