import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";import{n as o,t as s}from"./registry-BqccLuet.js";var c=e((()=>{})),l,u,d,f=e((()=>{l=t(n(),1),i(),c(),u=r(),d=(0,l.forwardRef)(({title:e,resolution:t,subject:n,caption:r,pins:i=[],animated:o=!0,"aria-label":s,className:c},d)=>{let f=(0,l.useId)(),p=r?f:void 0;return(0,u.jsxs)(`figure`,{ref:d,className:a(`eidotter-dos-figure`,o&&`eidotter-dos-figure--animated`,c),role:`img`,"aria-label":s,"aria-describedby":p,children:[e&&(0,u.jsx)(`div`,{className:`eidotter-dos-figure__title`,"aria-hidden":`true`,children:(0,u.jsx)(`span`,{children:e})}),(0,u.jsxs)(`div`,{className:`eidotter-dos-figure__frame`,children:[(0,u.jsx)(`div`,{className:`eidotter-dos-figure__subject`,children:n}),i.length>0&&(0,u.jsx)(`ul`,{className:`eidotter-dos-figure__pins`,role:`list`,children:i.map((e,t)=>{let n=Number.isFinite(e.x)?Math.max(0,Math.min(100,e.x)):0,r=Number.isFinite(e.y)?Math.max(0,Math.min(100,e.y)):0;return(0,u.jsxs)(`li`,{className:`eidotter-dos-figure__pin`,style:{left:`${n}%`,top:`${r}%`},children:[(0,u.jsx)(`span`,{className:`eidotter-dos-figure__pin-dot`,"aria-hidden":`true`}),(0,u.jsx)(`span`,{className:`eidotter-dos-figure__pin-label`,children:e.label})]},`${n}-${r}-${t}`)})}),(0,u.jsx)(`span`,{className:`eidotter-dos-figure__scanline`,"aria-hidden":`true`}),t&&(0,u.jsx)(`span`,{className:`eidotter-dos-figure__resolution`,"aria-hidden":`true`,children:t})]}),r&&(0,u.jsx)(`figcaption`,{id:f,className:`eidotter-dos-figure__caption`,children:r})]})}),d.displayName=`DosFigure`,d.__docgenInfo={description:`DosFigure — demoscene-style placeholder for media.

Sierra / LucasArts / demoscene title cards painted the screen with a
limited palette, dithering, and annotated frames. DosFigure recreates
that aesthetic: amber chrome, scanline sweep, optional pins, and a
resolution tag. Use as a lead-in for blog articles or as a placeholder
where a photograph would otherwise go.

Not intended as a replacement for semantic imagery — pass \`aria-label\`
(or a \`<figcaption>\` via \`caption\`) so the figure is meaningful to AT.`,methods:[],displayName:`DosFigure`,props:{title:{required:!1,tsType:{name:`string`},description:`Title shown in the top chrome strip. Uppercase recommended.`},resolution:{required:!1,tsType:{name:`string`},description:'Resolution tag rendered bottom-right (e.g. `"640×480"`).'},subject:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Subject content — ASCII, SVG, or anything you'd "paint the screen" with.`},caption:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:"Caption rendered beneath the frame via `<figcaption>`."},pins:{required:!1,tsType:{name:`Array`,elements:[{name:`DosFigurePin`}],raw:`DosFigurePin[]`},description:`Optional annotation pins positioned as percentages over the subject.`,defaultValue:{value:`[]`,computed:!1}},animated:{required:!1,tsType:{name:`boolean`},description:`Disables the scanline-sweep animation. Defaults to true (enabled).`,defaultValue:{value:`true`,computed:!1}},"aria-label":{required:!1,tsType:{name:`string`},description:"Accessible label when `subject` has no inherent semantics."},className:{required:!1,tsType:{name:`string`},description:"Extra class names merged onto the `<figure>` root."}}}})),p,m,h,g,_,v,y,b,x,S;e((()=>{n(),f(),o(),p=r(),m=()=>(0,p.jsx)(`pre`,{style:{margin:0,fontFamily:`var(--typography-font-family-primary)`,fontSize:`12px`,lineHeight:1.1,color:`var(--color-cga-amber)`,whiteSpace:`pre`},children:String.raw`
    ██████╗  ██████╗ ███████╗
    ██╔══██╗██╔═══██╗██╔════╝
    ██║  ██║██║   ██║███████╗
    ██║  ██║██║   ██║╚════██║
    ██████╔╝╚██████╔╝███████║
    ╚═════╝  ╚═════╝ ╚══════╝
       amber phosphor · 602nm
`}),h=()=>(0,p.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 200 150`,style:{width:`100%`,height:`100%`},"aria-hidden":`true`,children:[(0,p.jsx)(`defs`,{children:(0,p.jsxs)(`radialGradient`,{id:`planet`,cx:`40%`,cy:`40%`,r:`70%`,children:[(0,p.jsx)(`stop`,{offset:`0%`,stopColor:`var(--color-cga-amber)`,stopOpacity:`0.95`}),(0,p.jsx)(`stop`,{offset:`60%`,stopColor:`var(--color-cga-amber-dim)`,stopOpacity:`0.85`}),(0,p.jsx)(`stop`,{offset:`100%`,stopColor:`var(--color-cga-black)`})]})}),(0,p.jsx)(`rect`,{width:`200`,height:`150`,fill:`var(--color-cga-black)`}),(0,p.jsx)(`circle`,{cx:`100`,cy:`80`,r:`44`,fill:`url(#planet)`}),(0,p.jsxs)(`g`,{fill:`var(--color-cga-amber)`,children:[(0,p.jsx)(`circle`,{cx:`30`,cy:`20`,r:`1.2`}),(0,p.jsx)(`circle`,{cx:`160`,cy:`12`,r:`0.8`}),(0,p.jsx)(`circle`,{cx:`180`,cy:`40`,r:`1`}),(0,p.jsx)(`circle`,{cx:`12`,cy:`60`,r:`0.7`}),(0,p.jsx)(`circle`,{cx:`70`,cy:`18`,r:`0.6`})]})]}),g={title:`Components/DosFigure`,component:d,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#020003`}]},projectMeta:s.DosFigure},tags:[`autodocs`],argTypes:{title:{control:`text`},resolution:{control:`text`},caption:{control:`text`},animated:{control:`boolean`},"aria-label":{control:`text`}}},_={args:{title:`SCREEN.014`,resolution:`640×480`,caption:`ASCII painted-screen placeholder for blog lead-ins.`,"aria-label":`Eidotter wordmark rendered in ASCII amber phosphor.`,subject:(0,p.jsx)(m,{})},render:e=>(0,p.jsx)(`div`,{style:{maxWidth:`520px`},children:(0,p.jsx)(d,{...e})})},v={args:{title:`SCREEN.021`,resolution:`320×240`,caption:`SVG amber-mono planet — painted with a single phosphor tone.`,"aria-label":`Stylised planet rendered in single-tone amber.`,subject:(0,p.jsx)(h,{})},render:e=>(0,p.jsx)(`div`,{style:{maxWidth:`520px`},children:(0,p.jsx)(d,{...e})})},y={args:{title:`ANNOTATED`,resolution:`640×480`,caption:`Annotation pins highlight regions of interest.`,"aria-label":`Annotated amber-mono planet.`,subject:(0,p.jsx)(h,{}),pins:[{x:50,y:56,label:`ATMOSPHERE`},{x:78,y:34,label:`STAR`},{x:18,y:45,label:`TERMINATOR`}]},render:e=>(0,p.jsx)(`div`,{style:{maxWidth:`520px`},children:(0,p.jsx)(d,{...e})})},b={args:{title:`STATIC`,resolution:`640×480`,caption:`Scanline sweep and flicker disabled.`,"aria-label":`Static demo.`,subject:(0,p.jsx)(h,{}),animated:!1},render:e=>(0,p.jsx)(`div`,{style:{maxWidth:`520px`},children:(0,p.jsx)(d,{...e})})},x={render:()=>(0,p.jsxs)(`div`,{style:{maxWidth:`640px`,display:`grid`,gap:`16px`},children:[(0,p.jsx)(d,{title:`POST.001`,resolution:`640×480`,"aria-label":`Title card for a blog post about CRT phosphor.`,subject:(0,p.jsx)(m,{}),caption:`Phosphor decay and why amber feels warmer than green.`}),(0,p.jsx)(`p`,{style:{color:`var(--color-semantic-text-primary)`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`16px`,lineHeight:1.6},children:`DosFigure replaces the photograph convention for article headers in the eidotter aesthetic. Paint the screen; don't photograph it.`})]})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'SCREEN.014',
    resolution: '640×480',
    caption: 'ASCII painted-screen placeholder for blog lead-ins.',
    'aria-label': 'Eidotter wordmark rendered in ASCII amber phosphor.',
    subject: <AsciiHero />
  },
  render: args => <div style={{
    maxWidth: '520px'
  }}>
      <DosFigure {...args} />
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'SCREEN.021',
    resolution: '320×240',
    caption: 'SVG amber-mono planet — painted with a single phosphor tone.',
    'aria-label': 'Stylised planet rendered in single-tone amber.',
    subject: <SvgPlanet />
  },
  render: args => <div style={{
    maxWidth: '520px'
  }}>
      <DosFigure {...args} />
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'ANNOTATED',
    resolution: '640×480',
    caption: 'Annotation pins highlight regions of interest.',
    'aria-label': 'Annotated amber-mono planet.',
    subject: <SvgPlanet />,
    pins: [{
      x: 50,
      y: 56,
      label: 'ATMOSPHERE'
    }, {
      x: 78,
      y: 34,
      label: 'STAR'
    }, {
      x: 18,
      y: 45,
      label: 'TERMINATOR'
    }]
  },
  render: args => <div style={{
    maxWidth: '520px'
  }}>
      <DosFigure {...args} />
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'STATIC',
    resolution: '640×480',
    caption: 'Scanline sweep and flicker disabled.',
    'aria-label': 'Static demo.',
    subject: <SvgPlanet />,
    animated: false
  },
  render: args => <div style={{
    maxWidth: '520px'
  }}>
      <DosFigure {...args} />
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '640px',
    display: 'grid',
    gap: '16px'
  }}>
      <DosFigure title="POST.001" resolution="640×480" aria-label="Title card for a blog post about CRT phosphor." subject={<AsciiHero />} caption="Phosphor decay and why amber feels warmer than green." />
      <p style={{
      color: 'var(--color-semantic-text-primary)',
      fontFamily: 'var(--typography-font-family-primary)',
      fontSize: '16px',
      lineHeight: 1.6
    }}>
        DosFigure replaces the photograph convention for article headers in
        the eidotter aesthetic. Paint the screen; don't photograph it.
      </p>
    </div>
}`,...x.parameters?.docs?.source}}},S=[`WithAsciiSubject`,`WithSvgSubject`,`WithPins`,`NoAnimation`,`BlogLeadIn`]}))();export{x as BlogLeadIn,b as NoAnimation,_ as WithAsciiSubject,y as WithPins,v as WithSvgSubject,S as __namedExportsOrder,g as default};