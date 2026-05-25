import{i as e}from"./preload-helper-Cs4UwXAW.js";import{z as t}from"./iframe-BZiwcFj0.js";import{t as n}from"./jsx-runtime-C2T8EUXA.js";import{n as r,t as i}from"./Section-DISmgGLF.js";import{n as a,t as o}from"./AccordionFill-B5h9d8kG.js";import{n as s,t as c}from"./registry-BqccLuet.js";var l,u,d,f,p,m,h,g,_;e((()=>{t(),r(),a(),s(),l=n(),u={title:`Components/Accordion`,component:o,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:c.Accordion},tags:[`autodocs`]},d=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.`,f={render:()=>(0,l.jsx)(i,{title:`Expandable Section`,children:d})},p={render:()=>(0,l.jsx)(i,{title:`Pre-expanded Section`,defaultExpanded:!0,children:d})},m=[{title:`Section 1`,content:d},{title:`Section 2`,content:d},{title:`Section 3`,content:d}],h={render:()=>(0,l.jsx)(o,{sections:m})},g={render:()=>(0,l.jsx)(o,{sections:m,defaultExpandedIndex:0})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Section title="Expandable Section">
      {defaultContent}
    </Section>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Section title="Pre-expanded Section" defaultExpanded>
      {defaultContent}
    </Section>
}`,...p.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <AccordionFill sections={sections} />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <AccordionFill sections={sections} defaultExpandedIndex={0} />
}`,...g.parameters?.docs?.source}}},_=[`SingleSection`,`ExpandedSection`,`DefaultAccordion`,`WithDefaultExpanded`]}))();export{h as DefaultAccordion,p as ExpandedSection,f as SingleSection,g as WithDefaultExpanded,_ as __namedExportsOrder,u as default};