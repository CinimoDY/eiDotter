import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{r as n,t as r}from"./registry-EhIcK3QA.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a,t as o}from"./cn-CHNjZLmO.js";var s,c,l;function u(){return(u=e((()=>{t(),a(),s=i(),c={horizontal:`h-px w-full`,vertical:`w-px h-full`},l=({orientation:e=`horizontal`,className:t})=>(0,s.jsx)(`div`,{role:`separator`,"aria-orientation":e,className:o(`shrink-0 bg-dos-border-default`,`eidotter-separator`,c[e],t)}),l.__docgenInfo={description:`DOS-styled Separator component for visual division of content.
Pure presentational — no React Aria needed.`,methods:[],displayName:`Separator`,props:{orientation:{required:!1,tsType:{name:`union`,raw:`'horizontal' | 'vertical'`,elements:[{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'vertical'`}]},description:`Orientation of the separator line`,defaultValue:{value:`'horizontal'`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name`}}}})))()}var d,f,p,m,h;function g(){return(g=e((()=>{u(),n(),d=i(),f={title:`Components/Separator`,component:l,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:r.Separator},tags:[`autodocs`],argTypes:{orientation:{control:`select`,options:[`horizontal`,`vertical`],defaultValue:`horizontal`}}},p={args:{orientation:`horizontal`},decorators:[e=>(0,d.jsxs)(`div`,{style:{width:`300px`},children:[(0,d.jsx)(`p`,{style:{color:`#FFB000`,marginBottom:`8px`},children:`Content above`}),(0,d.jsx)(e,{}),(0,d.jsx)(`p`,{style:{color:`#FFB000`,marginTop:`8px`},children:`Content below`})]})]},m={args:{orientation:`vertical`},decorators:[e=>(0,d.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,height:`40px`},children:[(0,d.jsx)(`span`,{style:{color:`#FFB000`},children:`Left`}),(0,d.jsx)(e,{}),(0,d.jsx)(`span`,{style:{color:`#FFB000`},children:`Right`})]})]},h=[`Horizontal`,`Vertical`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal'
  },
  decorators: [Story => <div style={{
    width: '300px'
  }}>
        <p style={{
      color: '#FFB000',
      marginBottom: '8px'
    }}>Content above</p>
        <Story />
        <p style={{
      color: '#FFB000',
      marginTop: '8px'
    }}>Content below</p>
      </div>]
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  },
  decorators: [Story => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    height: '40px'
  }}>
        <span style={{
      color: '#FFB000'
    }}>Left</span>
        <Story />
        <span style={{
      color: '#FFB000'
    }}>Right</span>
      </div>]
}`,...m.parameters?.docs?.source}}}})))()}g();export{p as Horizontal,m as Vertical,h as __namedExportsOrder,f as default};