import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./cn-CHNjZLmO.js";import{n as a,t as o}from"./Badge-BkcUmlDI.js";import{n as s,t as c}from"./CopyButton-CVSWREhO.js";var l,u;function d(){return(d=e((()=>{t(),r(),s(),l=n(),u=({label:e,note:t,value:n,copyValue:r,trailing:a,pending:o,className:s})=>(0,l.jsxs)(`div`,{className:i(`eidotter-ledger-row`,`flex items-center gap-3 py-2 border-b border-dos-border-disabled`,o&&`opacity-50`,s),children:[(0,l.jsxs)(`div`,{className:`flex-1 min-w-0`,children:[(0,l.jsx)(`div`,{className:`font-dos text-dos-text-base text-dos-text-primary`,children:e}),t&&(0,l.jsx)(`p`,{className:`font-dos text-dos-text-base text-dos-text-muted mt-0.5`,children:t})]}),(0,l.jsxs)(`div`,{className:`flex items-center gap-1 shrink-0`,children:[(0,l.jsx)(`span`,{className:`font-dos text-dos-text-base text-dos-text-accent tabular-nums`,children:n}),r!==void 0&&(0,l.jsx)(c,{value:r}),a]})]}),u.displayName=`LedgerRow`,u.__docgenInfo={description:"DOS-styled ledger row — a label/note on the left and a right-aligned value\nwith optional copy + trailing slot. A generic value-row primitive.\n\nGeneralised from a private consumer's money-specific LedgerRow (DMNC-857): currency\nformatting, Paperless links, and verify/shared badges are intentionally NOT\nbuilt in — pass a pre-formatted `value`, a raw `copyValue` for the copy\naffordance, and compose domain chrome via `trailing`. Routes through\n`text-dos-*` semantic roles so it re-themes.",methods:[],displayName:`LedgerRow`,props:{label:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Primary label (left side).`},note:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Optional secondary note under the label.`},value:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Right-aligned value. Pass a **pre-formatted** string or node — the consumer
owns currency/locale formatting (the DS stays locale-agnostic). Rendered
with the accent colour + \`tabular-nums\` for column alignment.`},copyValue:{required:!1,tsType:{name:`string`},description:`When set, renders a {@link CopyButton} that copies this raw string.`},trailing:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Optional trailing content (badges, links, toggles) right of the value.`},pending:{required:!1,tsType:{name:`boolean`},description:`Dim the row while a mutation is in flight.`},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name.`}}}})))()}var f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{d(),a(),f=n(),p={title:`Components/LedgerRow`,component:u,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]}},tags:[`autodocs`]},m={args:{label:`Travel expenses`,value:`€1.234,56`}},h={args:{label:`Office supplies`,note:`3 receipts attached`,value:`€89,90`}},g={args:{label:`Net total`,value:`€12.500,00`,copyValue:`12500,00`}},_={args:{label:`Insurance`,note:`Verified against bank statement`,value:`€480,00`,copyValue:`480,00`,trailing:(0,f.jsx)(o,{variant:`success`,children:`DB`})}},v={args:{label:`Saving…`,value:`€0,00`,pending:!0}},y=[`Default`,`WithNote`,`WithCopy`,`WithTrailing`,`Pending`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Travel expenses',
    value: '€1.234,56'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Office supplies',
    note: '3 receipts attached',
    value: '€89,90'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Net total',
    value: '€12.500,00',
    copyValue: '12500,00'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Insurance',
    note: 'Verified against bank statement',
    value: '€480,00',
    copyValue: '480,00',
    // Domain chrome (verify state, source tags) composes via \`trailing\`.
    trailing: <Badge variant="success">DB</Badge>
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Saving…',
    value: '€0,00',
    pending: true
  }
}`,...v.parameters?.docs?.source}}}})))()}b();export{m as Default,v as Pending,g as WithCopy,h as WithNote,_ as WithTrailing,y as __namedExportsOrder,p as default};