import{i as e}from"./preload-helper-Cs4UwXAW.js";import{z as t}from"./iframe-BZiwcFj0.js";import{t as n}from"./jsx-runtime-C2T8EUXA.js";import{n as r,t as i}from"./cn-CXvY-dOT.js";import{n as a,t as o}from"./registry-BqccLuet.js";var s=e((()=>{})),c,l,u,d=e((()=>{t(),r(),s(),c=n(),l={horizontal:`h-px w-full`,vertical:`w-px h-full`},u=({orientation:e=`horizontal`,className:t})=>(0,c.jsx)(`div`,{role:`separator`,"aria-orientation":e,className:i(`shrink-0 bg-dos-border-default`,`eidotter-separator`,l[e],t)}),u.__docgenInfo={description:`DOS-styled Separator component for visual division of content.
Pure presentational — no React Aria needed.`,methods:[],displayName:`Separator`,props:{orientation:{required:!1,tsType:{name:`union`,raw:`'horizontal' | 'vertical'`,elements:[{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'vertical'`}]},description:`Orientation of the separator line`,defaultValue:{value:`'horizontal'`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name`}}}})),f,p,m,h,g;e((()=>{d(),a(),f=n(),p={title:`Components/Separator`,component:u,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:o.Separator},tags:[`autodocs`],argTypes:{orientation:{control:`select`,options:[`horizontal`,`vertical`],defaultValue:`horizontal`}}},m={args:{orientation:`horizontal`},decorators:[e=>(0,f.jsxs)(`div`,{style:{width:`300px`},children:[(0,f.jsx)(`p`,{style:{color:`#FFB000`,marginBottom:`8px`},children:`Content above`}),(0,f.jsx)(e,{}),(0,f.jsx)(`p`,{style:{color:`#FFB000`,marginTop:`8px`},children:`Content below`})]})]},h={args:{orientation:`vertical`},decorators:[e=>(0,f.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,height:`40px`},children:[(0,f.jsx)(`span`,{style:{color:`#FFB000`},children:`Left`}),(0,f.jsx)(e,{}),(0,f.jsx)(`span`,{style:{color:`#FFB000`},children:`Right`})]})]},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g=[`Horizontal`,`Vertical`]}))();export{m as Horizontal,h as Vertical,g as __namedExportsOrder,p as default};