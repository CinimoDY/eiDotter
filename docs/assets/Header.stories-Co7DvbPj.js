import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as f}from"./iframe-DuFfgGUU.js";import{c as b}from"./cn-CvUv5FIJ.js";import{D as B,M as P}from"./Nav-sVBRDC7l.js";import"./preload-helper-Dp1pzeXC.js";import"./Icon-BUHYQ9Cx.js";const Z={retro:"eidotter-header--retro",modern:"eidotter-header--modern"},d=f.forwardRef(({brandName:p,brandHref:t="/",items:r,activeHref:a,variant:m="retro",sticky:D=!0,linkComponent:u,children:V,className:_,...A},F)=>{const U=u??"a";return e.jsxs("header",{ref:F,className:b("flex items-center justify-between px-4 py-3 font-dos","eidotter-header",Z[m],D&&"sticky top-0 z-50",_),...A,children:[e.jsx(U,{href:t,className:b("no-underline text-base font-bold tracking-wide","eidotter-header__branding"),children:V||p}),e.jsx(B,{items:r,activeHref:a,variant:m,linkComponent:u}),e.jsx(P,{items:r,activeHref:a,variant:m,linkComponent:u})]})});d.displayName="Header";d.__docgenInfo={description:"",methods:[],displayName:"Header",props:{brandName:{required:!1,tsType:{name:"string"},description:"Site brand name displayed in the header"},brandHref:{required:!1,tsType:{name:"string"},description:'Href for the brand link (default: "/")',defaultValue:{value:"'/'",computed:!1}},items:{required:!0,tsType:{name:"Array",elements:[{name:"NavItem"}],raw:"NavItem[]"},description:"Navigation items passed through to Nav"},activeHref:{required:!1,tsType:{name:"string"},description:"Currently active href (highlights matching nav link)"},variant:{required:!1,tsType:{name:"union",raw:"'retro' | 'modern'",elements:[{name:"literal",value:"'retro'"},{name:"literal",value:"'modern'"}]},description:"Visual variant applied to both header and nav",defaultValue:{value:"'retro'",computed:!1}},sticky:{required:!1,tsType:{name:"boolean"},description:"Whether the header sticks to viewport top",defaultValue:{value:"true",computed:!1}},linkComponent:{required:!1,tsType:{name:"NavProps['linkComponent']",raw:"NavProps['linkComponent']"},description:"Custom link component for framework routing (Next.js Link, React Router Link, etc.)"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Custom branding content — replaces brandName when provided"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name"}}};const h=[{label:"projects",href:"/projects"},{label:"tiny ideas",href:"/blog"},{label:"contact",href:"/contact"}],Q={title:"Components/Header",component:d,parameters:{layout:"fullscreen",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["retro","modern"]},sticky:{control:"boolean"},activeHref:{control:"text"},brandHref:{control:"text"}}},n={args:{brandName:"DMNC.TECH",items:h,activeHref:"/projects",variant:"retro"}},o={args:{brandName:"Dominic Kennedy",items:h,activeHref:"/blog",variant:"modern"},parameters:{backgrounds:{default:"light",values:[{name:"light",value:"#ffffff"}]}}},s={args:{items:[{label:"components",href:"/components"},{label:"storybook",href:"/storybook"},{label:"github",href:"/github"}],activeHref:"/components",variant:"retro",children:e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx("span",{"aria-hidden":"true",children:"🥚"}),e.jsx("span",{children:"eiDotter"})]})}},i={name:"Mobile – MENU trigger (closed)",args:{brandName:"RIZOMORF",items:[{label:"work",href:"/work"},{label:"projects",href:"/projects"},{label:"blog",href:"/blog"},{label:"contact",href:"/contact"}],activeHref:"/work",variant:"retro"},parameters:{viewport:{defaultViewport:"phone375"},docs:{description:{story:"At mobile width the desktop nav is hidden and the MENU text trigger appears. Click MENU to open the flyout."}}}};function L(p){const t=f.useRef(null);return f.useEffect(()=>{var a;const r=(a=t.current)==null?void 0:a.querySelector(".eidotter-nav__menu-trigger");r==null||r.click()},[]),e.jsx("div",{ref:t,children:e.jsx(d,{...p})})}const l={name:"Mobile – flyout panel (open)",render:()=>e.jsx(L,{brandName:"RIZOMORF",items:[{label:"work",href:"/work"},{label:"projects",href:"/projects"},{label:"blog",href:"/blog"},{label:"contact",href:"/contact"}],activeHref:"/work",variant:"retro"}),parameters:{viewport:{defaultViewport:"phone375"},docs:{description:{story:"The right-side flyout panel with right-aligned uppercase nav items and pixel-art X close button. Backdrop, ✕ button, nav link clicks, and Escape all close the panel."}}}},c={args:{brandName:"SITE.NAME",items:h,activeHref:"/projects",variant:"retro",sticky:!0}};var g,v,k;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    brandName: 'DMNC.TECH',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro'
  }
}`,...(k=(v=n.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var y,N,w;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    brandName: 'Dominic Kennedy',
    items: sampleItems,
    activeHref: '/blog',
    variant: 'modern'
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{
        name: 'light',
        value: '#ffffff'
      }]
    }
  }
}`,...(w=(N=o.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};var H,x,j;s.parameters={...s.parameters,docs:{...(H=s.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'components',
      href: '/components'
    }, {
      label: 'storybook',
      href: '/storybook'
    }, {
      label: 'github',
      href: '/github'
    }],
    activeHref: '/components',
    variant: 'retro',
    children: <span style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
        <span aria-hidden="true">&#x1F95A;</span>
        <span>eiDotter</span>
      </span>
  }
}`,...(j=(x=s.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var M,R,E;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: 'Mobile – MENU trigger (closed)',
  args: {
    brandName: 'RIZOMORF',
    items: [{
      label: 'work',
      href: '/work'
    }, {
      label: 'projects',
      href: '/projects'
    }, {
      label: 'blog',
      href: '/blog'
    }, {
      label: 'contact',
      href: '/contact'
    }],
    activeHref: '/work',
    variant: 'retro'
  },
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    docs: {
      description: {
        story: 'At mobile width the desktop nav is hidden and the MENU text trigger appears. Click MENU to open the flyout.'
      }
    }
  }
}`,...(E=(R=i.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var T,C,I;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'Mobile – flyout panel (open)',
  render: () => <HeaderWithPanelOpen brandName="RIZOMORF" items={[{
    label: 'work',
    href: '/work'
  }, {
    label: 'projects',
    href: '/projects'
  }, {
    label: 'blog',
    href: '/blog'
  }, {
    label: 'contact',
    href: '/contact'
  }]} activeHref="/work" variant="retro" />,
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    },
    docs: {
      description: {
        story: 'The right-side flyout panel with right-aligned uppercase nav items and pixel-art X close button. ' + 'Backdrop, ✕ button, nav link clicks, and Escape all close the panel.'
      }
    }
  }
}`,...(I=(C=l.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var O,S,q;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    brandName: 'SITE.NAME',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    sticky: true
  }
}`,...(q=(S=c.parameters)==null?void 0:S.docs)==null?void 0:q.source}}};const Y=["RetroHeader","ModernHeader","CustomBranding","MobileHeader","MobileMenuOpen","FullHeader"];export{s as CustomBranding,c as FullHeader,i as MobileHeader,l as MobileMenuOpen,o as ModernHeader,n as RetroHeader,Y as __namedExportsOrder,Q as default};
