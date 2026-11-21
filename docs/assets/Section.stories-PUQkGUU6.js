import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{r as t,t as n}from"./registry-EhIcK3QA.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Section-CkbVQpsO.js";var o,s,c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{i(),t(),o=r(),s={title:`Components/Accordion/Section`,component:a,parameters:{layout:`centered`,projectMeta:n.Accordion},tags:[`autodocs`]},c=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.`,l={args:{title:`Title`,children:c}},u={args:{title:`Title`,children:c,isHovered:!0}},d={args:{title:`Title`,children:c,isActive:!0}},f={args:{title:`Title`,children:c,defaultExpanded:!0}},p={args:{title:`Title`,children:c,defaultExpanded:!0,isHovered:!0}},m={args:{title:`Title`,children:c,defaultExpanded:!0,isActive:!0}},h={args:{title:`Tall content (regression: DMNC-928)`,defaultExpanded:!0,children:(0,o.jsxs)(`div`,{children:[Array.from({length:12},(e,t)=>(0,o.jsxs)(`p`,{style:{marginBottom:`var(--spacing-4, 16px)`},children:[`Paragraph `,t+1,` of 12 — `,c]},t)),(0,o.jsx)(`button`,{type:`button`,children:`Reachable control below 500px`})]})}},g=[`Default`,`Hover`,`Active`,`Expanded`,`ExpandedHover`,`ExpandedActive`,`ExpandedTallContent`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Title',
    children: defaultContent
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Title',
    children: defaultContent,
    isHovered: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Title',
    children: defaultContent,
    isActive: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Title',
    children: defaultContent,
    defaultExpanded: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Title',
    children: defaultContent,
    defaultExpanded: true,
    isHovered: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Title',
    children: defaultContent,
    defaultExpanded: true,
    isActive: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Tall content (regression: DMNC-928)',
    defaultExpanded: true,
    children: <div>
        {Array.from({
        length: 12
      }, (_, i) => <p key={i} style={{
        marginBottom: 'var(--spacing-4, 16px)'
      }}>
            Paragraph {i + 1} of 12 — {defaultContent}
          </p>)}
        <button type="button">Reachable control below 500px</button>
      </div>
  }
}`,...h.parameters?.docs?.source},description:{story:`Regression story for DMNC-928: content far taller than the old 500px
max-height cap must be fully visible when expanded — nothing clipped,
the section grows to its natural content height.`,...h.parameters?.docs?.description}}}})))()}_();export{d as Active,l as Default,f as Expanded,m as ExpandedActive,p as ExpandedHover,h as ExpandedTallContent,u as Hover,g as __namedExportsOrder,s as default};