import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{r as n,t as r}from"./registry-EhIcK3QA.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a,t as o}from"./Section-CkbVQpsO.js";import{n as s,t as c}from"./AccordionFill-ZhM8Mmi0.js";var l,u,d,f,p,m,h,g,_;function v(){return(v=e((()=>{t(),a(),s(),n(),l=i(),u={title:`Components/Accordion`,component:c,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:r.Accordion},tags:[`autodocs`]},d=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.`,f={render:()=>(0,l.jsx)(o,{title:`Expandable Section`,children:d})},p={render:()=>(0,l.jsx)(o,{title:`Pre-expanded Section`,defaultExpanded:!0,children:d})},m=[{title:`Section 1`,content:d},{title:`Section 2`,content:d},{title:`Section 3`,content:d}],h={render:()=>(0,l.jsx)(c,{sections:m})},g={render:()=>(0,l.jsx)(c,{sections:m,defaultExpandedIndex:0})},_=[`SingleSection`,`ExpandedSection`,`DefaultAccordion`,`WithDefaultExpanded`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}}})))()}v();export{h as DefaultAccordion,p as ExpandedSection,f as SingleSection,g as WithDefaultExpanded,_ as __namedExportsOrder,u as default};