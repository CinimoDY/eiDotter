import{j as s}from"./jsx-runtime-e7d94ccb.js";import{S as g}from"./Section-7d975694.js";import{A}from"./AccordionFill-75b7e327.js";import"./index-981f9478.js";import"./Icon-e2c40cbf.js";const v={title:"Components/Accordion",parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"]},e="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.",t={render:()=>s.jsx(g,{title:"Expandable Section",children:e})},r={render:()=>s.jsx(g,{title:"Pre-expanded Section",defaultExpanded:!0,children:e})},j=[{title:"Section 1",content:e},{title:"Section 2",content:e},{title:"Section 3",content:e}],n={render:()=>s.jsx(A,{sections:j})},o={render:()=>s.jsx(A,{sections:j,defaultExpandedIndex:0})};var a,c,i;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => <Section title="Expandable Section">\r
      {defaultContent}\r
    </Section>
}`,...(i=(c=t.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var d,u,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <Section title="Pre-expanded Section" defaultExpanded>\r
      {defaultContent}\r
    </Section>
}`,...(l=(u=r.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};var p,m,S;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <AccordionFill sections={sections} />
}`,...(S=(m=n.parameters)==null?void 0:m.docs)==null?void 0:S.source}}};var x,f,E;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <AccordionFill sections={sections} defaultExpandedIndex={0} />
}`,...(E=(f=o.parameters)==null?void 0:f.docs)==null?void 0:E.source}}};const I=["SingleSection","ExpandedSection","DefaultAccordion","WithDefaultExpanded"];export{n as DefaultAccordion,r as ExpandedSection,t as SingleSection,o as WithDefaultExpanded,I as __namedExportsOrder,v as default};
