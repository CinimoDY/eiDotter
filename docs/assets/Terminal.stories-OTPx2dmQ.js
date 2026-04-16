import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as p}from"./Terminal-B2gbCEpE.js";import{c as W}from"./registry-CyM9n0D0.js";import"./iframe-DuFfgGUU.js";import"./preload-helper-Dp1pzeXC.js";import"./Button-CBQkCg2v.js";import"./useFocusRing-BtFWDqtK.js";import"./Hidden-D7HVVFJk.js";import"./usePress-ChW8_10P.js";import"./index-CjOovKeQ.js";import"./index-BOb-1P7R.js";/* empty css                  */import"./Icon-BUHYQ9Cx.js";import"./cn-CvUv5FIJ.js";const ee={title:"Components/Terminal",component:p,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#0000AA"}]},projectMeta:W.Terminal},tags:["autodocs"],argTypes:{size:{control:"select",options:["small","medium","large"],description:"Size variant of the terminal window"},title:{control:"text",description:"Title displayed in the terminal title bar"},state:{control:"select",options:["active","inactive","minimized"],description:"Current state of the terminal window"},resizable:{control:"boolean",description:"Whether the terminal can be resized"},minimizable:{control:"boolean",description:"Whether the terminal can be minimized"},maximizable:{control:"boolean",description:"Whether the terminal can be maximized"},closeable:{control:"boolean",description:"Whether the terminal can be closed"},autoFocus:{control:"boolean",description:"Whether the terminal should auto-focus on mount"},onMinimize:{action:"minimized"},onMaximize:{action:"maximized"},onClose:{action:"closed"},onFocus:{action:"focused"}}},r={args:{title:"MS-DOS Terminal",size:"medium",state:"active"}},a={args:{title:"Command Prompt",size:"small",state:"active"}},t={args:{title:"Terminal Session",size:"large",state:"active"}},n={args:{title:"Background Terminal",state:"inactive"}},i={args:{title:"Minimized Terminal",state:"minimized"},render:m=>e.jsx("div",{style:{position:"absolute",bottom:10,left:10},children:e.jsx(p,{...m})})},s={args:{title:"Active Session",children:e.jsxs("div",{style:{fontFamily:"'Flexi IBM VGA True', monospace",color:"var(--color-semantic-text-primary)",whiteSpace:"pre"},children:[`Microsoft(R) MS-DOS(R) Version 6.22
(C)Copyright Microsoft Corp 1981-1994.

C:\\>dir
 Volume in drive C has no label.
 Volume Serial Number is 1234-5678

 Directory of C:\\

AUTOEXEC BAT     123  12-03-94   9:30a
CONFIG   SYS      45  12-03-94   9:30a
COMMAND  COM  54,645  05-31-94   6:22a
        3 file(s)     54,813 bytes
        1,234,567 bytes free

C:\\>`,e.jsx("span",{className:"terminal__cursor",children:"█"})]})}},o={args:{title:"Read-Only Terminal",minimizable:!1,maximizable:!1,closeable:!1,resizable:!1}},l={args:{title:"File Manager - C:\\DOS",children:e.jsxs("div",{style:{fontFamily:"'Flexi IBM VGA True', monospace",color:"var(--color-semantic-text-primary)",whiteSpace:"pre"},children:[` Directory of C:\\DOS

EDIT     COM   12,345  05-31-94   6:22a
FORMAT   COM   29,816  05-31-94   6:22a
FDISK    EXE   29,334  05-31-94   6:22a
        3 file(s)     71,495 bytes

C:\\DOS>`,e.jsx("span",{className:"terminal__cursor",children:"█"})]})}},c={name:"Interactive Example (Check Actions tab)",args:{title:"Interactive Terminal",autoFocus:!0},render:m=>e.jsx(p,{...m,children:e.jsxs("div",{style:{fontFamily:"'Flexi IBM VGA True', monospace",color:"var(--color-semantic-text-primary)",whiteSpace:"pre"},children:[`Welcome to eiDotter Terminal
Type 'help' for available commands

C:\\EIDOTTER>help
Available commands:
  help    - Show this help message
  cls     - Clear screen
  dir     - List directory contents
  exit    - Exit terminal

C:\\EIDOTTER>`,e.jsx("span",{className:"terminal__cursor",children:"█"})]})})};var d,u,h;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    title: 'MS-DOS Terminal',
    size: 'medium',
    state: 'active'
  }
}`,...(h=(u=r.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var C,T,g;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    title: 'Command Prompt',
    size: 'small',
    state: 'active'
  }
}`,...(g=(T=a.parameters)==null?void 0:T.docs)==null?void 0:g.source}}};var v,S,b;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    title: 'Terminal Session',
    size: 'large',
    state: 'active'
  }
}`,...(b=(S=t.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var f,y,x;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    title: 'Background Terminal',
    state: 'inactive'
  }
}`,...(x=(y=n.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var M,z,O;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    title: 'Minimized Terminal',
    state: 'minimized'
  },
  render: args => <div style={{
    position: 'absolute',
    bottom: 10,
    left: 10
  }}>
        <Terminal {...args} />
    </div>
}`,...(O=(z=i.parameters)==null?void 0:z.docs)==null?void 0:O.source}}};var D,E,F;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    title: 'Active Session',
    children: <div style={{
      fontFamily: \`'Flexi IBM VGA True', monospace\`,
      color: 'var(--color-semantic-text-primary)',
      whiteSpace: 'pre'
    }}>
{\`Microsoft(R) MS-DOS(R) Version 6.22
(C)Copyright Microsoft Corp 1981-1994.

C:\\\\>dir
 Volume in drive C has no label.
 Volume Serial Number is 1234-5678

 Directory of C:\\\\

AUTOEXEC BAT     123  12-03-94   9:30a
CONFIG   SYS      45  12-03-94   9:30a
COMMAND  COM  54,645  05-31-94   6:22a
        3 file(s)     54,813 bytes
        1,234,567 bytes free

C:\\\\>\`}
        <span className="terminal__cursor">█</span>
      </div>
  }
}`,...(F=(E=s.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var I,A,N;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    title: 'Read-Only Terminal',
    minimizable: false,
    maximizable: false,
    closeable: false,
    resizable: false
  }
}`,...(N=(A=o.parameters)==null?void 0:A.docs)==null?void 0:N.source}}};var R,_,j;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    title: 'File Manager - C:\\\\DOS',
    children: <div style={{
      fontFamily: \`'Flexi IBM VGA True', monospace\`,
      color: 'var(--color-semantic-text-primary)',
      whiteSpace: 'pre'
    }}>
{\` Directory of C:\\\\DOS

EDIT     COM   12,345  05-31-94   6:22a
FORMAT   COM   29,816  05-31-94   6:22a
FDISK    EXE   29,334  05-31-94   6:22a
        3 file(s)     71,495 bytes

C:\\\\DOS>\`}
        <span className="terminal__cursor">█</span>
      </div>
  }
}`,...(j=(_=l.parameters)==null?void 0:_.docs)==null?void 0:j.source}}};var w,V,B;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: 'Interactive Example (Check Actions tab)',
  args: {
    title: 'Interactive Terminal',
    autoFocus: true
  },
  render: args => {
    return <Terminal {...args}>
        <div style={{
        fontFamily: \`'Flexi IBM VGA True', monospace\`,
        color: 'var(--color-semantic-text-primary)',
        whiteSpace: 'pre'
      }}>
{\`Welcome to eiDotter Terminal
Type 'help' for available commands

C:\\\\EIDOTTER>help
Available commands:
  help    - Show this help message
  cls     - Clear screen
  dir     - List directory contents
  exit    - Exit terminal

C:\\\\EIDOTTER>\`}
          <span className="terminal__cursor">█</span>
        </div>
      </Terminal>;
  }
}`,...(B=(V=c.parameters)==null?void 0:V.docs)==null?void 0:B.source}}};const re=["Default","Small","Large","Inactive","Minimized","WithContent","NoControls","CustomTitle","InteractiveExample"];export{l as CustomTitle,r as Default,n as Inactive,c as InteractiveExample,t as Large,i as Minimized,o as NoControls,a as Small,s as WithContent,re as __namedExportsOrder,ee as default};
