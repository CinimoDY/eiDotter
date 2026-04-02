import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as p}from"./Terminal-SOQB4jYo.js";import{c as G}from"./registry-BMuWnSIt.js";import"./iframe-CMgb2h7h.js";import"./preload-helper-Dp1pzeXC.js";/* empty css                  */import"./Icon-CqEaCbnm.js";const Y={title:"Components/Terminal",component:p,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#0000AA"}]},projectMeta:G.Terminal},tags:["autodocs"],argTypes:{size:{control:"select",options:["small","medium","large"],description:"Size variant of the terminal window"},title:{control:"text",description:"Title displayed in the terminal title bar"},state:{control:"select",options:["active","inactive","minimized"],description:"Current state of the terminal window"},resizable:{control:"boolean",description:"Whether the terminal can be resized"},minimizable:{control:"boolean",description:"Whether the terminal can be minimized"},maximizable:{control:"boolean",description:"Whether the terminal can be maximized"},closeable:{control:"boolean",description:"Whether the terminal can be closed"},autoFocus:{control:"boolean",description:"Whether the terminal should auto-focus on mount"},onMinimize:{action:"minimized"},onMaximize:{action:"maximized"},onClose:{action:"closed"},onFocus:{action:"focused"}}},a={args:{title:"MS-DOS Terminal",size:"medium",state:"active"}},r={args:{title:"Command Prompt",size:"small",state:"active"}},t={args:{title:"Terminal Session",size:"large",state:"active"}},n={args:{title:"Background Terminal",state:"inactive"}},i={args:{title:"Minimized Terminal",state:"minimized"},render:m=>e.jsx("div",{style:{position:"absolute",bottom:10,left:10},children:e.jsx(p,{...m})})},s={args:{title:"Active Session",children:e.jsxs("div",{style:{fontFamily:"'Perfect DOS VGA', monospace",color:"var(--color-semantic-text-primary)",whiteSpace:"pre"},children:[`Microsoft(R) MS-DOS(R) Version 6.22
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

C:\\>`,e.jsx("span",{className:"terminal__cursor",children:"█"})]})}},o={args:{title:"Read-Only Terminal",minimizable:!1,maximizable:!1,closeable:!1,resizable:!1}},l={args:{title:"File Manager - C:\\DOS",children:e.jsxs("div",{style:{fontFamily:"'Perfect DOS VGA', monospace",color:"var(--color-semantic-text-primary)",whiteSpace:"pre"},children:[` Directory of C:\\DOS

EDIT     COM   12,345  05-31-94   6:22a
FORMAT   COM   29,816  05-31-94   6:22a
FDISK    EXE   29,334  05-31-94   6:22a
        3 file(s)     71,495 bytes

C:\\DOS>`,e.jsx("span",{className:"terminal__cursor",children:"█"})]})}},c={name:"Interactive Example (Check Actions tab)",args:{title:"Interactive Terminal",autoFocus:!0},render:m=>e.jsx(p,{...m,children:e.jsxs("div",{style:{fontFamily:"'Perfect DOS VGA', monospace",color:"var(--color-semantic-text-primary)",whiteSpace:"pre"},children:[`Welcome to eiDotter Terminal
Type 'help' for available commands

C:\\EIDOTTER>help
Available commands:
  help    - Show this help message
  cls     - Clear screen
  dir     - List directory contents
  exit    - Exit terminal

C:\\EIDOTTER>`,e.jsx("span",{className:"terminal__cursor",children:"█"})]})})};var d,u,h;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    title: 'MS-DOS Terminal',
    size: 'medium',
    state: 'active'
  }
}`,...(h=(u=a.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var S,C,f;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    title: 'Command Prompt',
    size: 'small',
    state: 'active'
  }
}`,...(f=(C=r.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};var g,v,b;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    title: 'Terminal Session',
    size: 'large',
    state: 'active'
  }
}`,...(b=(v=t.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var T,y,O;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    title: 'Background Terminal',
    state: 'inactive'
  }
}`,...(O=(y=n.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};var x,D,z;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(z=(D=i.parameters)==null?void 0:D.docs)==null?void 0:z.source}}};var M,E,A;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    title: 'Active Session',
    children: <div style={{
      fontFamily: \`'Perfect DOS VGA', monospace\`,
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
}`,...(A=(E=s.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var F,I,N;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    title: 'Read-Only Terminal',
    minimizable: false,
    maximizable: false,
    closeable: false,
    resizable: false
  }
}`,...(N=(I=o.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var R,_,j;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    title: 'File Manager - C:\\\\DOS',
    children: <div style={{
      fontFamily: \`'Perfect DOS VGA', monospace\`,
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
}`,...(j=(_=l.parameters)==null?void 0:_.docs)==null?void 0:j.source}}};var w,V,W;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: 'Interactive Example (Check Actions tab)',
  args: {
    title: 'Interactive Terminal',
    autoFocus: true
  },
  render: args => {
    return <Terminal {...args}>
        <div style={{
        fontFamily: \`'Perfect DOS VGA', monospace\`,
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
}`,...(W=(V=c.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};const q=["Default","Small","Large","Inactive","Minimized","WithContent","NoControls","CustomTitle","InteractiveExample"];export{l as CustomTitle,a as Default,n as Inactive,c as InteractiveExample,t as Large,i as Minimized,o as NoControls,r as Small,s as WithContent,q as __namedExportsOrder,Y as default};
