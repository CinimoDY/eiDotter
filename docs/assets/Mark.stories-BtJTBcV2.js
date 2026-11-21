import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Badge-BkcUmlDI.js";import{n as o,t as s}from"./Mark-DEnYLl8u.js";function c({badgeCount:e=3}){let t=(0,l.useRef)(null);return(0,u.jsxs)(`div`,{ref:t,style:{position:`relative`,display:`flex`,alignItems:`center`,gap:96,padding:48},children:[(0,u.jsx)(s,{size:40,arms:{scopeRef:t}}),(0,u.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:28},children:Array.from({length:e}).map((e,t)=>(0,u.jsxs)(a,{className:`eidotter-header__category`,variant:`accent`,children:[`cat `,t+1]},t))})]})}var l,u,d,f,p,m,h,g,_,v,y;function b(){return(b=t((()=>{l=e(n(),1),o(),i(),u=r(),d={title:`Brand/Mark`,component:s,parameters:{layout:`centered`}},f={name:`Breath (default)`,args:{size:64},parameters:{docs:{description:{story:"The Logo drawing (pixel ring + lit yolk) breathing: scale 1 to 1.045 with the 5px glow swelling to 1.8x over a ~4.3s loop. Off under `prefers-reduced-motion`; glow removed under `prefers-contrast: high` (DMNC-1586)."}}}},p={args:{size:64,morph:!1},parameters:{docs:{description:{story:"`morph={false}` stops the breath: the static mark, identical to `<Logo>`."}}}},m={args:{size:64,glow:!1},parameters:{docs:{description:{story:"`glow={false}` drops the drop-shadow glow; the breath keeps only its scale."}}}},h={args:{size:64,label:``},parameters:{docs:{description:{story:"An empty `label` marks the mark decorative — `aria-hidden`, no role."}}}},g={render:()=>(0,u.jsxs)(`div`,{style:{display:`flex`,gap:32,alignItems:`center`},children:[(0,u.jsx)(s,{size:16}),(0,u.jsx)(s,{size:32}),(0,u.jsx)(s,{size:64}),(0,u.jsx)(s,{size:128})]})},_={render:()=>(0,u.jsx)(c,{}),parameters:{docs:{description:{story:"Arm connectors drawn from the mark to badges carrying the stable `.eidotter-header__category` class (the DMNC-1326 measurement contract). Arms are aria-hidden and never intercept pointer events."}}}},v={args:{badgeCount:3},argTypes:{badgeCount:{control:{type:`range`,min:2,max:5,step:1}}},render:({badgeCount:e})=>(0,u.jsx)(c,{badgeCount:e}),parameters:{docs:{description:{story:"Drag the `badgeCount` control (2–5) to watch the arms redraw with alternating curvature."}}}},y=[`Default`,`Still`,`NoGlow`,`Decorative`,`Sizes`,`WithArms`,`VariableBadges`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Breath (default)',
  args: {
    size: 64
  },
  parameters: {
    docs: {
      description: {
        story: 'The Logo drawing (pixel ring + lit yolk) breathing: scale 1 to 1.045 with the 5px glow ' + 'swelling to 1.8x over a ~4.3s loop. Off under \`prefers-reduced-motion\`; glow removed under ' + '\`prefers-contrast: high\` (DMNC-1586).'
      }
    }
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    size: 64,
    morph: false
  },
  parameters: {
    docs: {
      description: {
        story: '\`morph={false}\` stops the breath: the static mark, identical to \`<Logo>\`.'
      }
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: 64,
    glow: false
  },
  parameters: {
    docs: {
      description: {
        story: '\`glow={false}\` drops the drop-shadow glow; the breath keeps only its scale.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    size: 64,
    label: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'An empty \`label\` marks the mark decorative — \`aria-hidden\`, no role.'
      }
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 32,
    alignItems: 'center'
  }}>
      <Mark size={16} />
      <Mark size={32} />
      <Mark size={64} />
      <Mark size={128} />
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <ArmsDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Arm connectors drawn from the mark to badges carrying the stable ' + '\`.eidotter-header__category\` class (the DMNC-1326 measurement contract). ' + 'Arms are aria-hidden and never intercept pointer events.'
      }
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    badgeCount: 3
  },
  argTypes: {
    badgeCount: {
      control: {
        type: 'range',
        min: 2,
        max: 5,
        step: 1
      }
    }
  },
  render: ({
    badgeCount
  }) => <ArmsDemo badgeCount={badgeCount} />,
  parameters: {
    docs: {
      description: {
        story: 'Drag the \`badgeCount\` control (2–5) to watch the arms redraw with alternating curvature.'
      }
    }
  }
}`,...v.parameters?.docs?.source}}}})))()}b();export{h as Decorative,f as Default,m as NoGlow,g as Sizes,p as Still,v as VariableBadges,_ as WithArms,y as __namedExportsOrder,d as default};