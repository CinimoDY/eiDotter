import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./cn-CHNjZLmO.js";import{n as a,t as o}from"./Badge-BkcUmlDI.js";var s,c,l;function u(){return(u=e((()=>{t(),r(),s=n(),c={default:`text-dos-text-primary`,muted:`text-dos-text-muted line-through`,error:`text-dos-error`},l=({checked:e,onToggle:t,disabled:n,pending:r,ariaLabel:a,labelTone:o=`default`,label:l,children:u,note:d,leading:f,trailing:p,className:m})=>(0,s.jsxs)(`div`,{className:i(`eidotter-checklist-row`,`flex items-start gap-3 py-2 border-b border-dos-border-disabled`,r&&`opacity-50`,m),children:[(0,s.jsx)(`button`,{type:`button`,role:`checkbox`,"aria-checked":e,onClick:t,disabled:n,"aria-label":a??(e?`Mark as incomplete`:`Mark as complete`),className:i(`shrink-0 pt-0.5 font-dos text-dos-text-base`,`text-dos-text-primary hover:text-dos-text-accent`,`cursor-pointer disabled:cursor-not-allowed`),children:e?`[x]`:`[ ]`}),(0,s.jsxs)(`div`,{className:`flex-1 min-w-0`,children:[f&&(0,s.jsx)(`div`,{className:`mb-1`,children:f}),l!==void 0&&(0,s.jsx)(`div`,{className:i(`font-dos text-dos-text-base`,c[o]),children:l}),u,d&&(0,s.jsx)(`p`,{className:`font-dos text-dos-text-base text-dos-text-muted mt-0.5`,children:d})]}),p&&(0,s.jsx)(`div`,{className:`flex items-center gap-2 shrink-0`,children:p})]}),l.displayName=`ChecklistRow`,l.__docgenInfo={description:"DOS-styled checklist row — a `[x]`/`[ ]` toggle plus label, optional note,\nand leading/trailing slots. Ported from a private consumer (DMNC-856).\n\nThe toggle is a real `<button>` (keyboard + screen-reader operable); the\n`[x]`/`[ ]` glyph is the DOS checkbox aesthetic. Tones and the note route\nthrough `text-dos-*` semantic roles (not raw `cga-*`) so the row re-themes.",methods:[],displayName:`ChecklistRow`,props:{checked:{required:!0,tsType:{name:`boolean`},description:`Whether the item is checked.`},onToggle:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Toggle handler.`},disabled:{required:!1,tsType:{name:`boolean`},description:`Disable the toggle.`},pending:{required:!1,tsType:{name:`boolean`},description:`Dim the row while a mutation is in flight.`},ariaLabel:{required:!1,tsType:{name:`string`},description:`Accessible label for the toggle (overrides the default).`},labelTone:{required:!1,tsType:{name:`union`,raw:`'default' | 'muted' | 'error'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'muted'`},{name:`literal`,value:`'error'`}]},description:"Label colour. `muted` strikes through + dims (completed items). Routes\nthrough `text-dos-*` semantic roles, AA-safe under amber-mono.\n@default 'default'",defaultValue:{value:`'default'`,computed:!1}},label:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:"Primary label content (toned). Optional — omit and use `children` for free body content."},children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:"Free body content rendered below the label (alternative/addition to `label`)."},note:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Optional secondary note rendered under the label.`},leading:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Optional content above the label (e.g. a badge row).`},trailing:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Optional trailing content (e.g. an action), right-aligned.`},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name.`}}}})))()}var d,f,p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{d=t(),u(),a(),f=n(),p={title:`Components/ChecklistRow`,component:l,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]}},tags:[`autodocs`]},m=e=>{let[t,n]=(0,d.useState)(!1);return(0,f.jsx)(l,{checked:t,onToggle:()=>n(e=>!e),label:e.label??`Upload W-2 form`,labelTone:t?`muted`:e.labelTone??`default`})},h={render:()=>(0,f.jsx)(m,{})},g={args:{checked:!0,onToggle:()=>{},label:`Filed return`,labelTone:`muted`}},_={args:{checked:!1,onToggle:()=>{},label:`Anlage N — Werbungskosten`,note:`Last edited 2 days ago`,leading:(0,f.jsxs)(`span`,{style:{display:`flex`,gap:`var(--spacing-2)`},children:[(0,f.jsx)(o,{variant:`warning`,children:`high`}),(0,f.jsx)(o,{variant:`info`,children:`Dom`})]})}},v={args:{checked:!1,onToggle:()=>{},label:`Verify receipts`,trailing:(0,f.jsx)(o,{variant:`error`,children:`3 open`})}},y={args:{checked:!1,onToggle:()=>{},label:`Locked item`,disabled:!0}},b={args:{checked:!0,onToggle:()=>{},label:`Saving…`,pending:!0}},x=[`Basic`,`Checked`,`WithLeadingBadges`,`WithTrailing`,`Disabled`,`Pending`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Interactive />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    onToggle: () => {},
    label: 'Filed return',
    labelTone: 'muted'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    onToggle: () => {},
    label: 'Anlage N — Werbungskosten',
    note: 'Last edited 2 days ago',
    leading: <span style={{
      display: 'flex',
      gap: 'var(--spacing-2)'
    }}>
        <Badge variant="warning">high</Badge>
        <Badge variant="info">Dom</Badge>
      </span>
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    onToggle: () => {},
    label: 'Verify receipts',
    trailing: <Badge variant="error">3 open</Badge>
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    onToggle: () => {},
    label: 'Locked item',
    disabled: true
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    onToggle: () => {},
    label: 'Saving…',
    pending: true
  }
}`,...b.parameters?.docs?.source}}}})))()}S();export{h as Basic,g as Checked,y as Disabled,b as Pending,_ as WithLeadingBadges,v as WithTrailing,x as __namedExportsOrder,p as default};