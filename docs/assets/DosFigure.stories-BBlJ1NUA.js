import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{r,t as i}from"./registry-EhIcK3QA.js";import"./keyframes-D-6fbS_z.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./cn-CHNjZLmO.js";import{n as c,t as l}from"./DosWindow-DV2S_uh-.js";var u,d,f;function p(){return(p=t((()=>{u=e(n(),1),o(),c(),d=a(),f=(0,u.forwardRef)(({title:e,resolution:t,subject:n,caption:r,pins:i=[],animated:a=!0,"aria-label":o,className:c},f)=>{let p=(0,u.useId)(),m=r?p:void 0;return(0,d.jsxs)(`figure`,{ref:f,className:s(`eidotter-dos-figure`,a&&`eidotter-dos-figure--animated`,c),role:`img`,"aria-label":o,"aria-describedby":m,children:[(0,d.jsx)(l,{title:e&&(0,d.jsx)(`span`,{"aria-hidden":`true`,children:e}),className:`eidotter-dos-figure__window`,children:(0,d.jsxs)(`div`,{className:`eidotter-dos-figure__frame`,children:[(0,d.jsx)(`div`,{className:`eidotter-dos-figure__subject`,children:n}),i.length>0&&(0,d.jsx)(`ul`,{className:`eidotter-dos-figure__pins`,role:`list`,children:i.map((e,t)=>{let n=Number.isFinite(e.x)?Math.max(0,Math.min(100,e.x)):0,r=Number.isFinite(e.y)?Math.max(0,Math.min(100,e.y)):0;return(0,d.jsxs)(`li`,{className:`eidotter-dos-figure__pin`,style:{left:`${n}%`,top:`${r}%`},children:[(0,d.jsx)(`span`,{className:`eidotter-dos-figure__pin-dot`,"aria-hidden":`true`}),(0,d.jsx)(`span`,{className:`eidotter-dos-figure__pin-label`,children:e.label})]},`${n}-${r}-${t}`)})}),(0,d.jsx)(`span`,{className:`eidotter-dos-figure__scanline`,"aria-hidden":`true`}),t&&(0,d.jsx)(`span`,{className:`eidotter-dos-figure__resolution`,"aria-hidden":`true`,children:t})]})}),r&&(0,d.jsx)(`figcaption`,{id:p,className:`eidotter-dos-figure__caption`,children:r})]})}),f.displayName=`DosFigure`,f.__docgenInfo={description:`DosFigure — demoscene-style placeholder for media.

Sierra / LucasArts / demoscene title cards painted the screen with a
limited palette, dithering, and annotated frames. DosFigure recreates
that aesthetic: the DosWindow chrome (title strip, brand border, drop
shadow), scanline sweep, optional pins, and a resolution tag. Use as a lead-in for blog articles or as a placeholder
where a photograph would otherwise go.

Not intended as a replacement for semantic imagery — pass \`aria-label\`
(or a \`<figcaption>\` via \`caption\`) so the figure is meaningful to AT.`,methods:[],displayName:`DosFigure`,props:{title:{required:!1,tsType:{name:`string`},description:`Title shown in the top chrome strip. Uppercase recommended.`},resolution:{required:!1,tsType:{name:`string`},description:'Resolution tag rendered bottom-right (e.g. `"640×480"`).'},subject:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Subject content — ASCII, SVG, or anything you'd "paint the screen" with.`},caption:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:"Caption rendered beneath the frame via `<figcaption>`."},pins:{required:!1,tsType:{name:`Array`,elements:[{name:`DosFigurePin`}],raw:`DosFigurePin[]`},description:`Optional annotation pins positioned as percentages over the subject.`,defaultValue:{value:`[]`,computed:!1}},animated:{required:!1,tsType:{name:`boolean`},description:`Disables the scanline-sweep animation. Defaults to true (enabled).`,defaultValue:{value:`true`,computed:!1}},"aria-label":{required:!1,tsType:{name:`string`},description:"Accessible label when `subject` has no inherent semantics."},className:{required:!1,tsType:{name:`string`},description:"Extra class names merged onto the `<figure>` root."}}}})))()}var m,h,g,_,v,y,b,x,S,C;function w(){return(w=t((()=>{n(),p(),r(),m=a(),h=()=>(0,m.jsx)(`pre`,{style:{margin:0,fontFamily:`var(--typography-font-family-primary)`,fontSize:`12px`,lineHeight:1.1,color:`var(--color-cga-amber)`,whiteSpace:`pre`},children:String.raw`
    ██████╗  ██████╗ ███████╗
    ██╔══██╗██╔═══██╗██╔════╝
    ██║  ██║██║   ██║███████╗
    ██║  ██║██║   ██║╚════██║
    ██████╔╝╚██████╔╝███████║
    ╚═════╝  ╚═════╝ ╚══════╝
       amber phosphor · 602nm
`}),g=()=>(0,m.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 200 150`,style:{width:`100%`,height:`100%`},"aria-hidden":`true`,children:[(0,m.jsx)(`defs`,{children:(0,m.jsxs)(`radialGradient`,{id:`planet`,cx:`40%`,cy:`40%`,r:`70%`,children:[(0,m.jsx)(`stop`,{offset:`0%`,stopColor:`var(--color-cga-amber)`,stopOpacity:`0.95`}),(0,m.jsx)(`stop`,{offset:`60%`,stopColor:`var(--color-cga-amber-dim)`,stopOpacity:`0.85`}),(0,m.jsx)(`stop`,{offset:`100%`,stopColor:`var(--color-cga-black)`})]})}),(0,m.jsx)(`rect`,{width:`200`,height:`150`,fill:`var(--color-cga-black)`}),(0,m.jsx)(`circle`,{cx:`100`,cy:`80`,r:`44`,fill:`url(#planet)`}),(0,m.jsxs)(`g`,{fill:`var(--color-cga-amber)`,children:[(0,m.jsx)(`circle`,{cx:`30`,cy:`20`,r:`1.2`}),(0,m.jsx)(`circle`,{cx:`160`,cy:`12`,r:`0.8`}),(0,m.jsx)(`circle`,{cx:`180`,cy:`40`,r:`1`}),(0,m.jsx)(`circle`,{cx:`12`,cy:`60`,r:`0.7`}),(0,m.jsx)(`circle`,{cx:`70`,cy:`18`,r:`0.6`})]})]}),_={title:`Components/DosFigure`,component:f,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#020003`}]},projectMeta:i.DosFigure},tags:[`autodocs`],argTypes:{title:{control:`text`},resolution:{control:`text`},caption:{control:`text`},animated:{control:`boolean`},"aria-label":{control:`text`}}},v={args:{title:`SCREEN.014`,resolution:`640×480`,caption:`ASCII painted-screen placeholder for blog lead-ins.`,"aria-label":`Eidotter wordmark rendered in ASCII amber phosphor.`,subject:(0,m.jsx)(h,{})},render:e=>(0,m.jsx)(`div`,{style:{maxWidth:`520px`},children:(0,m.jsx)(f,{...e})})},y={args:{title:`SCREEN.021`,resolution:`320×240`,caption:`SVG amber-mono planet — painted with a single phosphor tone.`,"aria-label":`Stylised planet rendered in single-tone amber.`,subject:(0,m.jsx)(g,{})},render:e=>(0,m.jsx)(`div`,{style:{maxWidth:`520px`},children:(0,m.jsx)(f,{...e})})},b={args:{title:`ANNOTATED`,resolution:`640×480`,caption:`Annotation pins highlight regions of interest.`,"aria-label":`Annotated amber-mono planet.`,subject:(0,m.jsx)(g,{}),pins:[{x:50,y:56,label:`ATMOSPHERE`},{x:78,y:34,label:`STAR`},{x:18,y:45,label:`TERMINATOR`}]},render:e=>(0,m.jsx)(`div`,{style:{maxWidth:`520px`},children:(0,m.jsx)(f,{...e})})},x={args:{title:`STATIC`,resolution:`640×480`,caption:`Scanline sweep and flicker disabled.`,"aria-label":`Static demo.`,subject:(0,m.jsx)(g,{}),animated:!1},render:e=>(0,m.jsx)(`div`,{style:{maxWidth:`520px`},children:(0,m.jsx)(f,{...e})})},S={render:()=>(0,m.jsxs)(`div`,{style:{maxWidth:`640px`,display:`grid`,gap:`16px`},children:[(0,m.jsx)(f,{title:`POST.001`,resolution:`640×480`,"aria-label":`Title card for a blog post about CRT phosphor.`,subject:(0,m.jsx)(h,{}),caption:`Phosphor decay and why amber feels warmer than green.`}),(0,m.jsx)(`p`,{style:{color:`var(--color-semantic-text-primary)`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`16px`,lineHeight:1.6},children:`DosFigure replaces the photograph convention for article headers in the eidotter aesthetic. Paint the screen; don't photograph it.`})]})},C=[`WithAsciiSubject`,`WithSvgSubject`,`WithPins`,`NoAnimation`,`BlogLeadIn`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}}})))()}w();export{S as BlogLeadIn,x as NoAnimation,v as WithAsciiSubject,b as WithPins,y as WithSvgSubject,C as __namedExportsOrder,_ as default};