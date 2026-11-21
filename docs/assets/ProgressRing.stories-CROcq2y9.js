import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{r as n,t as r}from"./registry-EhIcK3QA.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a,t as o}from"./ProgressRing-Drevhwi5.js";var s,c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{t(),a(),n(),s=i(),c={title:`Components/ProgressRing`,component:o,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:r.ProgressRing},tags:[`autodocs`],argTypes:{value:{control:{type:`range`,min:0,max:100,step:1}},max:{control:{type:`number`}},size:{control:{type:`range`,min:24,max:256,step:4}},thickness:{control:{type:`range`,min:2,max:32,step:1}},segments:{control:{type:`range`,min:3,max:48,step:1}},color:{control:`color`},showLabel:{control:`boolean`},glow:{control:`boolean`}}},l={args:{value:62,size:96}},u={args:{value:62,size:96,showLabel:!0}},d={args:{value:75,size:96,glow:!0,showLabel:!0}},f={name:`States: 0% → 100%`,render:()=>(0,s.jsx)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`},children:[0,25,50,75,100].map(e=>(0,s.jsx)(o,{value:e,size:72,showLabel:!0},e))})},p={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`},children:[(0,s.jsx)(o,{value:50,size:80,segments:8}),(0,s.jsx)(o,{value:50,size:80,segments:16}),(0,s.jsx)(o,{value:50,size:80,segments:24})]})},m={args:{value:66,size:96,color:`#55FF55`,showLabel:!0}},h={args:{value:80,size:120,thickness:18,segments:12,glow:!0}},g=[`Default`,`WithLabel`,`Glow`,`States`,`SegmentCounts`,`CustomColor`,`Thick`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    value: 62,
    size: 96
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    value: 62,
    size: 96,
    showLabel: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    value: 75,
    size: 96,
    glow: true,
    showLabel: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'States: 0% → 100%',
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  }}>
      {[0, 25, 50, 75, 100].map(v => <ProgressRing key={v} value={v} size={72} showLabel />)}
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  }}>
      <ProgressRing value={50} size={80} segments={8} />
      <ProgressRing value={50} size={80} segments={16} />
      <ProgressRing value={50} size={80} segments={24} />
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    value: 66,
    size: 96,
    color: '#55FF55',
    showLabel: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    value: 80,
    size: 120,
    thickness: 18,
    segments: 12,
    glow: true
  }
}`,...h.parameters?.docs?.source}}}})))()}_();export{m as CustomColor,l as Default,d as Glow,p as SegmentCounts,f as States,h as Thick,u as WithLabel,g as __namedExportsOrder,c as default};