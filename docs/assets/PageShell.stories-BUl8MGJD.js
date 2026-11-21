import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Header-Cp7iOg1e.js";import{i as a,n as o,r as s,t as c}from"./PageSection-CL5Ntp7U.js";var l,u,d,f,p,m,h;function g(){return(g=e((()=>{t(),a(),o(),r(),l=n(),u={title:`Components/PageShell`,component:s,parameters:{layout:`fullscreen`,docs:{description:{component:'The "one block" page layout (0.43): one flush-left column (1200px cap, text at an 80-column measure; 0.46) with a `max(16px, safe-area)` gutter and 24px / 64px block padding. Header, intro, sections and footer share the left edge and stack with a 40px gap; no dividers. `PageSection` is one block: an h2 in the display face (accent, no rule) and its content 16px apart. See `Templates/ReviewPage` for the full composition.'}}},tags:[`autodocs`]},d=[{label:`docs`,href:`#one`},{label:`components`,href:`#two`}],f={args:{header:(0,l.jsx)(i,{brandName:`EXAMPLE`,items:d,layout:`stacked`,rule:!1,sticky:!1}),intro:{eyebrow:`Example · guide`,title:`Page title in the display face`,lead:`A lead paragraph, at most 68 characters wide, sits under the title. Everything shares one left edge.`,meta:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(`span`,{children:[`Updated: `,(0,l.jsx)(`b`,{children:`2026-10-24`})]}),(0,l.jsxs)(`span`,{children:[`Owner: `,(0,l.jsx)(`b`,{children:`Example`})]})]}),toc:[{href:`#one`,label:`First section`},{href:`#two`,label:`Second section`}]},children:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c,{id:`one`,title:`First section`,children:(0,l.jsx)(`p`,{children:`Sections stack 40px apart. Inside a section, the heading and its content are 16px apart.`})}),(0,l.jsx)(c,{id:`two`,title:`Second section`,children:(0,l.jsx)(`p`,{children:`No rule under headings and no dividers between sections.`})})]})}},p={name:`maxWidth 720px`,args:{...f.args,maxWidth:`720px`}},m={name:`Phone 375`,args:f.args,parameters:{viewport:{defaultViewport:`phone375`}}},h=[`Default`,`NarrowColumn`,`Phone`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    header: <Header brandName="EXAMPLE" items={items} layout="stacked" rule={false} sticky={false} />,
    intro: {
      eyebrow: 'Example · guide',
      title: 'Page title in the display face',
      lead: 'A lead paragraph, at most 68 characters wide, sits under the title. Everything shares one left edge.',
      meta: <>
          <span>Updated: <b>2026-10-24</b></span>
          <span>Owner: <b>Example</b></span>
        </>,
      toc: [{
        href: '#one',
        label: 'First section'
      }, {
        href: '#two',
        label: 'Second section'
      }]
    },
    children: <>
        <PageSection id="one" title="First section">
          <p>Sections stack 40px apart. Inside a section, the heading and its content are 16px apart.</p>
        </PageSection>
        <PageSection id="two" title="Second section">
          <p>No rule under headings and no dividers between sections.</p>
        </PageSection>
      </>
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'maxWidth 720px',
  args: {
    ...Default.args,
    maxWidth: '720px'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Phone 375',
  args: Default.args,
  parameters: {
    viewport: {
      defaultViewport: 'phone375'
    }
  }
}`,...m.parameters?.docs?.source}}}})))()}g();export{f as Default,p as NarrowColumn,m as Phone,h as __namedExportsOrder,u as default};