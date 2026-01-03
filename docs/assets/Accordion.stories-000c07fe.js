import{j as s}from"./jsx-runtime-bb4eca5c.js";import{S as g}from"./Section-a74476b2.js";import{A}from"./AccordionFill-ab86ac61.js";import"./index-9ab4f09c.js";import"./_commonjsHelpers-725317a4.js";import"./Icon-abc1e2a4.js";const I={title:"Components/Accordion",parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"]},e="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.",t={render:()=>s.jsx(g,{title:"Expandable Section",children:e})},n={render:()=>s.jsx(g,{title:"Pre-expanded Section",defaultExpanded:!0,children:e})},j=[{title:"Section 1",content:e},{title:"Section 2",content:e},{title:"Section 3",content:e}],r={render:()=>s.jsx(A,{sections:j})},o={render:()=>s.jsx(A,{sections:j,defaultExpandedIndex:0})};var a,c,i;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => <Section title="Expandable Section">
      {defaultContent}
    </Section>
}`,...(i=(c=t.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var d,u,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <Section title="Pre-expanded Section" defaultExpanded>
      {defaultContent}
    </Section>
}`,...(p=(u=n.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var l,m,S;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <AccordionFill sections={sections} />
}`,...(S=(m=r.parameters)==null?void 0:m.docs)==null?void 0:S.source}}};var x,f,E;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <AccordionFill sections={sections} defaultExpandedIndex={0} />
}`,...(E=(f=o.parameters)==null?void 0:f.docs)==null?void 0:E.source}}};const L=["SingleSection","ExpandedSection","DefaultAccordion","WithDefaultExpanded"];export{r as DefaultAccordion,n as ExpandedSection,t as SingleSection,o as WithDefaultExpanded,L as __namedExportsOrder,I as default};
