import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import"./fonts-DgPQINKq.js";import"./tokens-D3Sp2hkn.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import"./dos-utilities-Bj35VRQO.js";import{n as r,t as i}from"./Skeleton-B7cPeAfv.js";var a,o,s,c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{t(),r(),a=n(),o={title:`Design System/Skeleton`,component:i,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#020003`},{name:`light`,value:`#FFE8A8`}]},docs:{description:{component:'DOS/CGA loading placeholder. Shade-character rows (░ ▒ ▓) with a CRT hum-bar glow band rolling top→bottom (phosphor-decay tail, 1.6s cycle). Variants: `text`, `card`, `figure`, `timeline`. Compositor-only; under `prefers-reduced-motion` the band becomes a gentle opacity breathing. The wrapper announces `label` via `role="status"` while the glyphs stay `aria-hidden`.'}}},argTypes:{variant:{control:`select`,options:[`text`,`card`,`figure`,`timeline`],description:`Placeholder shape`},lines:{control:{type:`number`,min:1,max:12},description:`Line / row count (defaults per variant: text 3, card 3, figure 4, timeline 2)`},animated:{control:`boolean`,description:`CRT hum-bar band rolling top→bottom; replaced by gentle opacity breathing under prefers-reduced-motion`},label:{control:`text`,description:`Screen-reader announcement, default "Loading"`}}},s={maxWidth:`48ch`},c={render:e=>(0,a.jsx)(`div`,{style:s,children:(0,a.jsx)(i,{...e})}),args:{}},l={render:e=>(0,a.jsx)(`div`,{style:s,children:(0,a.jsx)(i,{...e})}),args:{variant:`card`}},u={render:e=>(0,a.jsx)(`div`,{style:s,children:(0,a.jsx)(i,{...e})}),args:{variant:`figure`,lines:6}},d={render:e=>(0,a.jsx)(`div`,{style:s,children:(0,a.jsx)(i,{...e})}),args:{variant:`timeline`}},f={render:e=>(0,a.jsx)(`div`,{style:s,children:(0,a.jsx)(i,{...e})}),args:{lines:6}},p={render:e=>(0,a.jsx)(`div`,{style:s,children:(0,a.jsx)(i,{...e})}),args:{animated:!1}},m={render:()=>(0,a.jsxs)(`div`,{style:{...s,display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,a.jsx)(i,{variant:`timeline`,label:`Loading entry 1 of 3`}),(0,a.jsx)(i,{variant:`timeline`,label:`Loading entry 2 of 3`}),(0,a.jsx)(i,{variant:`timeline`,label:`Loading entry 3 of 3`})]})},h=[`Text`,`Card`,`Figure`,`Timeline`,`ParagraphSized`,`Static`,`PendingFeed`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <div style={demoWidth}>
      <Skeleton {...args} />
    </div>,
  args: {}
}`,...c.parameters?.docs?.source},description:{story:`Default — three pending text lines, last one shortened.`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div style={demoWidth}>
      <Skeleton {...args} />
    </div>,
  args: {
    variant: 'card'
  }
}`,...l.parameters?.docs?.source},description:{story:`Card — bordered surface with a denser heading line above the body.`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <div style={demoWidth}>
      <Skeleton {...args} />
    </div>,
  args: {
    variant: 'figure',
    lines: 6
  }
}`,...u.parameters?.docs?.source},description:{story:"Figure — contiguous dense shade field for pending media (pairs with `DosFigure`).",...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <div style={demoWidth}>
      <Skeleton {...args} />
    </div>,
  args: {
    variant: 'timeline'
  }
}`,...d.parameters?.docs?.source},description:{story:`Timeline — marker square + entry column, for pending timeline entries.`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <div style={demoWidth}>
      <Skeleton {...args} />
    </div>,
  args: {
    lines: 6
  }
}`,...f.parameters?.docs?.source},description:{story:`More lines — paragraph-sized placeholder.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <div style={demoWidth}>
      <Skeleton {...args} />
    </div>,
  args: {
    animated: false
  }
}`,...p.parameters?.docs?.source},description:{story:"Static — `animated={false}`. (Reduced-motion users get a gentle opacity breathing instead, not this.)",...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    ...demoWidth,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
      <Skeleton variant="timeline" label="Loading entry 1 of 3" />
      <Skeleton variant="timeline" label="Loading entry 2 of 3" />
      <Skeleton variant="timeline" label="Loading entry 3 of 3" />
    </div>
}`,...m.parameters?.docs?.source},description:{story:'A pending feed: several entry skeletons stacked, as in `mode="feed"` timelines.',...m.parameters?.docs?.description}}}})))()}g();export{l as Card,u as Figure,f as ParagraphSized,m as PendingFeed,p as Static,c as Text,d as Timeline,h as __namedExportsOrder,o as default};