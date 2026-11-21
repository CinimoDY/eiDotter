import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./cn-CHNjZLmO.js";var a,o,s;function c(){return(c=e((()=>{t(),r(),a=n(),o={default:`text-dos-text-primary`,error:`text-dos-error`,warning:`text-dos-warning`,info:`text-dos-info`},s=({title:e,count:t,tone:n=`default`,children:r,className:s})=>(0,a.jsxs)(`h3`,{className:i(`eidotter-section-heading`,`font-dos-heading uppercase tracking-wider mb-2 text-dos-text-sm`,o[n],s),children:[e,t!==void 0&&` (${t})`,r]}),s.displayName=`SectionHeading`,s.__docgenInfo={description:"DOS-styled section heading — an uppercase `<h3>` label with an optional\ntrailing `(count)` and tone-driven colour. Pure presentational.\n\nPorted from a private consumer (DMNC-855); that version hardcoded\n`text-cga-*` — this routes tones through `text-dos-*` semantic roles instead\nso the heading re-themes and stays AA-safe under amber-mono.",methods:[],displayName:`SectionHeading`,props:{title:{required:!0,tsType:{name:`string`},description:`Heading text.`},count:{required:!1,tsType:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}]},description:`Optional trailing count, rendered as " (count)".`},tone:{required:!1,tsType:{name:`union`,raw:`'default' | 'error' | 'warning' | 'info'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'info'`}]},description:`Tone-driven colour. Routes through semantic roles so it re-themes:
amber-family under amber-mono, honest under colour themes.
@default 'default'`,defaultValue:{value:`'default'`,computed:!1}},children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Additional content rendered after the title/count (e.g. an action).`},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name.`}}}})))()}var l,u,d,f,p,m;function h(){return(h=e((()=>{c(),l=n(),u={title:`Components/SectionHeading`,component:s,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]}},tags:[`autodocs`],argTypes:{tone:{control:`select`,options:[`default`,`error`,`warning`,`info`]}}},d={args:{title:`Documents`}},f={args:{title:`Open actions`,count:9}},p={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--spacing-4)`},children:[(0,l.jsx)(s,{title:`Default`,tone:`default`,count:3}),(0,l.jsx)(s,{title:`Info`,tone:`info`,count:3}),(0,l.jsx)(s,{title:`Warning`,tone:`warning`,count:3}),(0,l.jsx)(s,{title:`Error`,tone:`error`,count:3})]})},m=[`Default`,`WithCount`,`Tones`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Documents'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Open actions',
    count: 9
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-4)'
  }}>
      <SectionHeading title="Default" tone="default" count={3} />
      <SectionHeading title="Info" tone="info" count={3} />
      <SectionHeading title="Warning" tone="warning" count={3} />
      <SectionHeading title="Error" tone="error" count={3} />
    </div>
}`,...p.parameters?.docs?.source}}}})))()}h();export{d as Default,p as Tones,f as WithCount,m as __namedExportsOrder,u as default};