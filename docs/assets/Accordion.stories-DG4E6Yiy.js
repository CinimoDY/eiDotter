import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{S as A}from"./Section-DzOIa8aw.js";import{A as c}from"./AccordionFill-BRApc_8S.js";import{c as b}from"./registry-DmuPb2r9.js";import"./iframe-QfvwKf1z.js";import"./preload-helper-Dp1pzeXC.js";import"./Icon-DJ-fNxBJ.js";const L={title:"Components/Accordion",component:c,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:b.Accordion},tags:["autodocs"]},e="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.",t={render:()=>s.jsx(A,{title:"Expandable Section",children:e})},o={render:()=>s.jsx(A,{title:"Pre-expanded Section",defaultExpanded:!0,children:e})},j=[{title:"Section 1",content:e},{title:"Section 2",content:e},{title:"Section 3",content:e}],n={render:()=>s.jsx(c,{sections:j})},r={render:()=>s.jsx(c,{sections:j,defaultExpandedIndex:0})};var a,i,d;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => <Section title="Expandable Section">
      {defaultContent}
    </Section>
}`,...(d=(i=t.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var p,u,l;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <Section title="Pre-expanded Section" defaultExpanded>
      {defaultContent}
    </Section>
}`,...(l=(u=o.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};var m,S,x;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <AccordionFill sections={sections} />
}`,...(x=(S=n.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var f,E,g;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <AccordionFill sections={sections} defaultExpandedIndex={0} />
}`,...(g=(E=r.parameters)==null?void 0:E.docs)==null?void 0:g.source}}};const P=["SingleSection","ExpandedSection","DefaultAccordion","WithDefaultExpanded"];export{n as DefaultAccordion,o as ExpandedSection,t as SingleSection,r as WithDefaultExpanded,P as __namedExportsOrder,L as default};
