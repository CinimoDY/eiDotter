import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";var o=e((()=>{})),s,c,l,u=e((()=>{s=t(n(),1),i(),o(),c=r(),l=(0,s.forwardRef)(({size:e=32,glow:t=!0,title:n=`eiDotter`,className:r,...i},o)=>(0,c.jsxs)(`svg`,{ref:o,width:e,height:e,viewBox:`0 0 32 32`,xmlns:`http://www.w3.org/2000/svg`,role:n?`img`:void 0,"aria-hidden":n?void 0:!0,className:a(`eidotter-logo`,t&&`eidotter-logo--glow`,r),...i,children:[n?(0,c.jsx)(`title`,{children:n}):null,(0,c.jsx)(`circle`,{cx:`16`,cy:`16`,r:`11`,fill:`#FFB000`}),(0,c.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3.2`,fill:`#FFD97A`}),(0,c.jsx)(`circle`,{cx:`11`,cy:`11`,r:`1.1`,fill:`#FFE8A8`})]})),l.displayName=`Logo`,l.__docgenInfo={description:`eiDotter brand mark — V2 yolk (pure, no legs).

The "payload" of the eiDotter identity — a bright CGA amber yolk with a soft
highlight and specular, no shell or drip ornamentation. Scales cleanly from
16px (favicon) to hero sizes without the 1px shell outline collapsing into
mush at small sizes.

Fill colors are brand-locked (explicit amber hexes) rather than themed so the
mark reads identically across themes. Consumers who need a non-amber treatment
can override the SVG fills via the \`style\` prop or by recoloring the child
\`<circle>\` elements through a CSS selector.`,methods:[],displayName:`Logo`,props:{size:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:`Icon size in pixels. Defaults to 32. Pass a number or CSS-valid string.`,defaultValue:{value:`32`,computed:!1}},glow:{required:!1,tsType:{name:`boolean`},description:`Add the amber phosphor drop-shadow glow. Defaults to true.`,defaultValue:{value:`true`,computed:!1}},title:{required:!1,tsType:{name:`string`},description:`Accessible label. Defaults to "eiDotter". Set to empty string for decorative use.`,defaultValue:{value:`'eiDotter'`,computed:!1}}},composes:[`Omit`]}})),d,f,p,m=e((()=>{d=t(n(),1),i(),o(),f=r(),p=(0,d.forwardRef)(({glow:e=!0,className:t,...n},r)=>(0,f.jsxs)(`span`,{ref:r,className:a(`eidotter-wordmark font-dos`,e&&`eidotter-wordmark--glow`,t),"aria-label":`eiDotter`,...n,children:[(0,f.jsx)(`span`,{className:`eidotter-wordmark__prefix`,"aria-hidden":`true`,children:`ei`}),(0,f.jsx)(`span`,{className:`eidotter-wordmark__body`,"aria-hidden":`true`,children:`Dotter`})]})),p.displayName=`Wordmark`,p.__docgenInfo={description:`eiDotter wordmark — "eiDotter" with the "ei" prefix dimmed against the full-bright "Dotter".

Uses the primary DOS font (Flexi IBM VGA True) and the amber phosphor palette.
Sized via \`font-size\` on the host; the component does not set its own size by
default so it inherits from the surrounding type scale. Wrap in a heading
element if you need semantic weight.`,methods:[],displayName:`Wordmark`,props:{glow:{required:!1,tsType:{name:`boolean`},description:`Add the amber phosphor text-shadow glow. Defaults to true.`,defaultValue:{value:`true`,computed:!1}}},composes:[`HTMLAttributes`]}})),h,g,_,v=e((()=>{h=t(n(),1),i(),u(),m(),g=r(),_=(0,h.forwardRef)(({logoSize:e=32,iconOnly:t=!1,wordmarkOnly:n=!1,glow:r=!0,className:i,...o},s)=>(0,g.jsxs)(`div`,{ref:s,className:a(`eidotter-brand-lockup inline-flex items-center gap-3`,i),role:`img`,"aria-label":`eiDotter`,...o,children:[!n&&(0,g.jsx)(l,{size:e,glow:r,title:``}),!t&&(0,g.jsx)(p,{glow:r,"aria-hidden":`true`})]})),_.displayName=`BrandLockup`,_.__docgenInfo={description:"eiDotter brand lockup — Logo + Wordmark composed horizontally.\n\nThe canonical public-facing brand mark. Scales by setting the host's\n`font-size` (wordmark) and `logoSize` prop (icon). The two should stay\nproportional: roughly `logoSize ≈ font-size × 1.75`.",methods:[],displayName:`BrandLockup`,props:{logoSize:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:`Logo size in pixels. Defaults to 32.`,defaultValue:{value:`32`,computed:!1}},iconOnly:{required:!1,tsType:{name:`boolean`},description:`Render only the logo (no wordmark).`,defaultValue:{value:`false`,computed:!1}},wordmarkOnly:{required:!1,tsType:{name:`boolean`},description:`Render only the wordmark (no logo).`,defaultValue:{value:`false`,computed:!1}},glow:{required:!1,tsType:{name:`boolean`},description:`Add amber phosphor glow on both logo + wordmark. Defaults to true.`,defaultValue:{value:`true`,computed:!1}}},composes:[`HTMLAttributes`]}})),y,b,x,S,C,w,T,E,D,O,k;e((()=>{u(),m(),v(),y=r(),b={title:`Brand/Lockup`,component:_,parameters:{layout:`centered`}},x={args:{logoSize:48}},S={args:{logoSize:24},parameters:{docs:{description:{story:`24px — toolbar / inline brand.`}}}},C={args:{logoSize:96},parameters:{docs:{description:{story:`96px — hero / splash.`}}}},w={args:{logoSize:64,iconOnly:!0},parameters:{docs:{description:{story:`Yolk icon without the wordmark — favicons, app icons.`}}}},T={args:{wordmarkOnly:!0},parameters:{docs:{description:{story:`"eiDotter" wordmark alone.`}}}},E={args:{logoSize:48,glow:!1},parameters:{docs:{description:{story:`Phosphor glow disabled — print, email, dark-mode-off surfaces.`}}}},D={render:()=>(0,y.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:24},children:[(0,y.jsx)(l,{size:16}),(0,y.jsx)(l,{size:24}),(0,y.jsx)(l,{size:32}),(0,y.jsx)(l,{size:48}),(0,y.jsx)(l,{size:64}),(0,y.jsx)(l,{size:96})]}),parameters:{docs:{description:{story:`Scale study: 16 / 24 / 32 / 48 / 64 / 96 px.`}}}},O={render:()=>(0,y.jsxs)(`p`,{style:{fontSize:18},children:[`Welcome to `,(0,y.jsx)(p,{style:{fontSize:`inherit`}}),` — a DOS design system.`]}),parameters:{docs:{description:{story:`Wordmark inherits host font-size via CSS — drop inline in prose.`}}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    logoSize: 48
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 24
  }}>
      <Logo size={16} />
      <Logo size={24} />
      <Logo size={32} />
      <Logo size={48} />
      <Logo size={64} />
      <Logo size={96} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Scale study: 16 / 24 / 32 / 48 / 64 / 96 px.'
      }
    }
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k=[`Default`,`SmallLockup`,`HeroLockup`,`LogoOnly`,`WordmarkOnly`,`NoGlow`,`LogoSizes`,`WordmarkInline`]}))();export{x as Default,C as HeroLockup,w as LogoOnly,D as LogoSizes,E as NoGlow,S as SmallLockup,O as WordmarkInline,T as WordmarkOnly,k as __namedExportsOrder,b as default};