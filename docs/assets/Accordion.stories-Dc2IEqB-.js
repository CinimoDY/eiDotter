import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{S as A}from"./Section-DhWZ91mU.js";import{A as c}from"./AccordionFill-DijDjX02.js";import{c as b}from"./registry-CyM9n0D0.js";import"./iframe-DuFfgGUU.js";import"./preload-helper-Dp1pzeXC.js";import"./Button-CBQkCg2v.js";import"./useFocusRing-BtFWDqtK.js";import"./Hidden-D7HVVFJk.js";import"./usePress-ChW8_10P.js";import"./index-CjOovKeQ.js";import"./index-BOb-1P7R.js";import"./Icon-BUHYQ9Cx.js";import"./cn-CvUv5FIJ.js";const M={title:"Components/Accordion",component:c,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:b.Accordion},tags:["autodocs"]},e="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam netus consectetur magnis. Lorem est ac duis risus semper. Nunc faucibus turpis ac sollicitudin suscipit imperdiet est, cursus.",t={render:()=>s.jsx(A,{title:"Expandable Section",children:e})},o={render:()=>s.jsx(A,{title:"Pre-expanded Section",defaultExpanded:!0,children:e})},j=[{title:"Section 1",content:e},{title:"Section 2",content:e},{title:"Section 3",content:e}],r={render:()=>s.jsx(c,{sections:j})},n={render:()=>s.jsx(c,{sections:j,defaultExpandedIndex:0})};var a,i,d;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => <Section title="Expandable Section">
      {defaultContent}
    </Section>
}`,...(d=(i=t.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var p,m,u;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <Section title="Pre-expanded Section" defaultExpanded>
      {defaultContent}
    </Section>
}`,...(u=(m=o.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var l,S,x;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <AccordionFill sections={sections} />
}`,...(x=(S=r.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var f,E,g;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <AccordionFill sections={sections} defaultExpandedIndex={0} />
}`,...(g=(E=n.parameters)==null?void 0:E.docs)==null?void 0:g.source}}};const N=["SingleSection","ExpandedSection","DefaultAccordion","WithDefaultExpanded"];export{r as DefaultAccordion,o as ExpandedSection,t as SingleSection,n as WithDefaultExpanded,N as __namedExportsOrder,M as default};
