import{i as e}from"./preload-helper-Cs4UwXAW.js";import{z as t}from"./iframe-BZiwcFj0.js";import{t as n}from"./jsx-runtime-C2T8EUXA.js";import{n as r,t as i}from"./registry-BqccLuet.js";import{n as a,t as o}from"./ChatMessage-CrcEP5BI.js";var s,c,l,u,d,f,p,m,h;e((()=>{t(),a(),r(),s=n(),c={title:`Components/Chat/ChatMessage`,component:o,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:i.ChatMessage},tags:[`autodocs`],argTypes:{role:{control:`select`,options:[`user`,`assistant`,`system`]},isStreaming:{control:`boolean`}}},l={args:{role:`user`,content:`dir C:\\Projects`}},u={args:{role:`assistant`,content:`Volume in drive C has no label.
Directory of C:\\Projects

03/15/2026  10:24 AM    <DIR>    eidotter
03/15/2026  10:24 AM    <DIR>    rizomorf
               2 Dir(s)  42,069,420 bytes free`}},d={args:{role:`system`,content:`Connection established. ADOS Chat v1.0`}},f={args:{role:`assistant`,content:`Processing your request`,isStreaming:!0}},p={args:{role:`user`,content:`custom prefix example`,userPrefix:`$`}},m={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`4px`},children:[(0,s.jsx)(o,{role:`system`,content:`ADOS Chat v1.0 initialized`}),(0,s.jsx)(o,{role:`user`,content:`What can you do?`}),(0,s.jsx)(o,{role:`assistant`,content:`I can help you navigate the DOS filesystem, run programs, and answer questions about your system.`}),(0,s.jsx)(o,{role:`user`,content:`Show me the current directory`}),(0,s.jsx)(o,{role:`assistant`,content:`Loading...`,isStreaming:!0})]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    role: 'user',
    content: 'dir C:\\\\Projects'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    role: 'assistant',
    content: 'Volume in drive C has no label.\\nDirectory of C:\\\\Projects\\n\\n03/15/2026  10:24 AM    <DIR>    eidotter\\n03/15/2026  10:24 AM    <DIR>    rizomorf\\n               2 Dir(s)  42,069,420 bytes free'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    role: 'system',
    content: 'Connection established. ADOS Chat v1.0'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    role: 'assistant',
    content: 'Processing your request',
    isStreaming: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    role: 'user',
    content: 'custom prefix example',
    userPrefix: '$'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  }}>
      <ChatMessage role="system" content="ADOS Chat v1.0 initialized" />
      <ChatMessage role="user" content="What can you do?" />
      <ChatMessage role="assistant" content="I can help you navigate the DOS filesystem, run programs, and answer questions about your system." />
      <ChatMessage role="user" content="Show me the current directory" />
      <ChatMessage role="assistant" content="Loading..." isStreaming />
    </div>
}`,...m.parameters?.docs?.source}}},h=[`User`,`Assistant`,`System`,`Streaming`,`CustomPrefixes`,`AllRoles`]}))();export{m as AllRoles,u as Assistant,p as CustomPrefixes,f as Streaming,d as System,l as User,h as __namedExportsOrder,c as default};