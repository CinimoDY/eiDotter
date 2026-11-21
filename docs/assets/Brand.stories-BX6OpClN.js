import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./cn-CHNjZLmO.js";import{n as o,t as s}from"./Logo-DFENwmnd.js";var c,l,u;function d(){return(d=t((()=>{c=e(n(),1),i(),l=r(),u=(0,c.forwardRef)(({glow:e=!0,className:t,...n},r)=>(0,l.jsxs)(`span`,{ref:r,className:a(`eidotter-wordmark font-dos-heading`,e&&`eidotter-wordmark--glow`,t),role:`img`,"aria-label":`eiDotter`,...n,children:[(0,l.jsx)(`span`,{className:`eidotter-wordmark__prefix`,"aria-hidden":`true`,children:`ei`}),(0,l.jsx)(`span`,{className:`eidotter-wordmark__body`,"aria-hidden":`true`,children:`Dotter`})]})),u.displayName=`Wordmark`,u.__docgenInfo={description:`eiDotter wordmark — "eiDotter" with the "ei" prefix dimmed against the full-bright "Dotter".

Uses the heading family (the display face, Perfect DOS VGA 437, in every theme)
and the amber phosphor palette.
Sized via \`font-size\` on the host; the component does not set its own size by
default so it inherits from the surrounding type scale. Wrap in a heading
element if you need semantic weight.`,methods:[],displayName:`Wordmark`,props:{glow:{required:!1,tsType:{name:`boolean`},description:`Add the amber phosphor text-shadow glow. Defaults to true.`,defaultValue:{value:`true`,computed:!1}}},composes:[`HTMLAttributes`]}})))()}var f,p,m;function h(){return(h=t((()=>{f=e(n(),1),i(),o(),d(),p=r(),m=(0,f.forwardRef)(({logoSize:e=32,iconOnly:t=!1,wordmarkOnly:n=!1,glow:r=!0,className:i,...o},c)=>(0,p.jsxs)(`div`,{ref:c,className:a(`eidotter-brand-lockup inline-flex items-center gap-3`,i),role:`img`,"aria-label":`eiDotter`,...o,children:[!n&&(0,p.jsx)(s,{size:e,glow:r,title:``}),!t&&(0,p.jsx)(u,{glow:r,"aria-hidden":`true`})]})),m.displayName=`BrandLockup`,m.__docgenInfo={description:"eiDotter brand lockup — Logo + Wordmark composed horizontally.\n\nThe canonical public-facing brand mark. Scales by setting the host's\n`font-size` (wordmark) and `logoSize` prop (icon). The two should stay\nproportional: roughly `logoSize ≈ font-size × 1.75`.",methods:[],displayName:`BrandLockup`,props:{logoSize:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:`Logo size in pixels. Defaults to 32.`,defaultValue:{value:`32`,computed:!1}},iconOnly:{required:!1,tsType:{name:`boolean`},description:`Render only the logo (no wordmark).`,defaultValue:{value:`false`,computed:!1}},wordmarkOnly:{required:!1,tsType:{name:`boolean`},description:`Render only the wordmark (no logo).`,defaultValue:{value:`false`,computed:!1}},glow:{required:!1,tsType:{name:`boolean`},description:`Add amber phosphor glow on both logo + wordmark. Defaults to true.`,defaultValue:{value:`true`,computed:!1}}},composes:[`HTMLAttributes`]}})))()}var g,_,v,y,b,x,S,C,w,T,E;function D(){return(D=t((()=>{o(),d(),h(),g=r(),_={title:`Brand/Lockup`,component:m,parameters:{layout:`centered`}},v={args:{logoSize:48}},y={args:{logoSize:24},parameters:{docs:{description:{story:`24px — toolbar / inline brand.`}}}},b={args:{logoSize:96},parameters:{docs:{description:{story:`96px — hero / splash.`}}}},x={args:{logoSize:64,iconOnly:!0},parameters:{docs:{description:{story:`Yolk icon without the wordmark — favicons, app icons.`}}}},S={args:{wordmarkOnly:!0},parameters:{docs:{description:{story:`"eiDotter" wordmark alone.`}}}},C={args:{logoSize:48,glow:!1},parameters:{docs:{description:{story:`Phosphor glow disabled — print, email, dark-mode-off surfaces.`}}}},w={render:()=>(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:24},children:[(0,g.jsx)(s,{size:16}),(0,g.jsx)(s,{size:32}),(0,g.jsx)(s,{size:64}),(0,g.jsx)(s,{size:128})]}),parameters:{docs:{description:{story:"Scale study: 16 / 32 / 64 / 128 px. Same drawing as `<Mark>` and the favicon (lit yolk, 5px glow; DMNC-1586)."}}}},T={render:()=>(0,g.jsxs)(`p`,{style:{fontSize:18},children:[`Welcome to `,(0,g.jsx)(u,{style:{fontSize:`inherit`}}),` — a DOS design system.`]}),parameters:{docs:{description:{story:`Wordmark inherits host font-size via CSS — drop inline in prose.`}}}},E=[`Default`,`SmallLockup`,`HeroLockup`,`LogoOnly`,`WordmarkOnly`,`NoGlow`,`LogoSizes`,`WordmarkInline`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    logoSize: 48
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    logoSize: 24
  },
  parameters: {
    docs: {
      description: {
        story: '24px — toolbar / inline brand.'
      }
    }
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    logoSize: 96
  },
  parameters: {
    docs: {
      description: {
        story: '96px — hero / splash.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    logoSize: 64,
    iconOnly: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Yolk icon without the wordmark — favicons, app icons.'
      }
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    wordmarkOnly: true
  },
  parameters: {
    docs: {
      description: {
        story: '"eiDotter" wordmark alone.'
      }
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    logoSize: 48,
    glow: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Phosphor glow disabled — print, email, dark-mode-off surfaces.'
      }
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 24
  }}>
      <Logo size={16} />
      <Logo size={32} />
      <Logo size={64} />
      <Logo size={128} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Scale study: 16 / 32 / 64 / 128 px. Same drawing as \`<Mark>\` and the favicon (lit yolk, 5px glow; DMNC-1586).'
      }
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <p style={{
    fontSize: 18
  }}>
      Welcome to <Wordmark style={{
      fontSize: 'inherit'
    }} /> — a DOS design system.
    </p>,
  parameters: {
    docs: {
      description: {
        story: 'Wordmark inherits host font-size via CSS — drop inline in prose.'
      }
    }
  }
}`,...T.parameters?.docs?.source}}}})))()}D();export{v as Default,b as HeroLockup,x as LogoOnly,w as LogoSizes,C as NoGlow,y as SmallLockup,T as WordmarkInline,S as WordmarkOnly,E as __namedExportsOrder,_ as default};