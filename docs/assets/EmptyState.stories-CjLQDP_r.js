import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Button-DYwuDaLT.js";import{n as i,t as a}from"./EmptyState-sr81VtuY.js";var o,s,c,l,u,d,f;function p(){return(p=e((()=>{i(),n(),o=t(),s={title:`Components/EmptyState`,component:a,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]}},tags:[`autodocs`],argTypes:{tone:{control:`select`,options:[`default`,`error`,`warning`,`info`]}}},c={args:{title:`No documents yet`}},l={args:{title:`No documents yet`,description:`Upload a file or connect a source to populate this category.`}},u={args:{title:`Nothing here`,description:`Get started by adding your first entry.`,action:(0,o.jsx)(r,{size:`sm`,children:`Add entry`})}},d={render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--spacing-6)`},children:[(0,o.jsx)(a,{tone:`default`,title:`Default`,description:`Neutral zero-state.`}),(0,o.jsx)(a,{tone:`info`,title:`Info`,description:`Informational zero-state.`}),(0,o.jsx)(a,{tone:`warning`,title:`Warning`,description:`Something needs attention.`}),(0,o.jsx)(a,{tone:`error`,title:`Error`,description:`Something went wrong.`})]})},f=[`Default`,`WithDescription`,`WithAction`,`Tones`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'No documents yet'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'No documents yet',
    description: 'Upload a file or connect a source to populate this category.'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Nothing here',
    description: 'Get started by adding your first entry.',
    action: <Button size="sm">Add entry</Button>
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-6)'
  }}>
      <EmptyState tone="default" title="Default" description="Neutral zero-state." />
      <EmptyState tone="info" title="Info" description="Informational zero-state." />
      <EmptyState tone="warning" title="Warning" description="Something needs attention." />
      <EmptyState tone="error" title="Error" description="Something went wrong." />
    </div>
}`,...d.parameters?.docs?.source}}}})))()}p();export{c as Default,d as Tones,u as WithAction,l as WithDescription,f as __namedExportsOrder,s as default};