import{i as e}from"./preload-helper-Cs4UwXAW.js";import{z as t}from"./iframe-BZiwcFj0.js";import{t as n}from"./jsx-runtime-C2T8EUXA.js";import{n as r,t as i}from"./registry-BqccLuet.js";import{n as a,t as o}from"./Terminal-Bz_xF-_k.js";var s,c,l,u,d,f,p,m,h,g,_,v;e((()=>{t(),a(),r(),s=n(),c={title:`Components/Terminal`,component:o,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#0000AA`}]},projectMeta:i.Terminal},tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`small`,`medium`,`large`],description:`Size variant of the terminal window`},title:{control:`text`,description:`Title displayed in the terminal title bar`},state:{control:`select`,options:[`active`,`inactive`,`minimized`],description:`Current state of the terminal window`},resizable:{control:`boolean`,description:`Whether the terminal can be resized`},minimizable:{control:`boolean`,description:`Whether the terminal can be minimized`},maximizable:{control:`boolean`,description:`Whether the terminal can be maximized`},closeable:{control:`boolean`,description:`Whether the terminal can be closed`},autoFocus:{control:`boolean`,description:`Whether the terminal should auto-focus on mount`},onMinimize:{action:`minimized`},onMaximize:{action:`maximized`},onClose:{action:`closed`},onFocus:{action:`focused`}}},l={args:{title:`MS-DOS Terminal`,size:`medium`,state:`active`}},u={args:{title:`Command Prompt`,size:`small`,state:`active`}},d={args:{title:`Terminal Session`,size:`large`,state:`active`}},f={args:{title:`Background Terminal`,state:`inactive`}},p={args:{title:`Minimized Terminal`,state:`minimized`},render:e=>(0,s.jsx)(`div`,{style:{position:`absolute`,bottom:10,left:10},children:(0,s.jsx)(o,{...e})})},m={args:{title:`Active Session`,children:(0,s.jsxs)(`div`,{style:{fontFamily:`'Flexi IBM VGA True', monospace`,color:`var(--color-semantic-text-primary)`,whiteSpace:`pre`},children:[`Microsoft(R) MS-DOS(R) Version 6.22
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

C:\\>`,(0,s.jsx)(`span`,{className:`terminal__cursor`,children:`█`})]})}},h={args:{title:`Read-Only Terminal`,minimizable:!1,maximizable:!1,closeable:!1,resizable:!1}},g={args:{title:`File Manager - C:\\DOS`,children:(0,s.jsxs)(`div`,{style:{fontFamily:`'Flexi IBM VGA True', monospace`,color:`var(--color-semantic-text-primary)`,whiteSpace:`pre`},children:[` Directory of C:\\DOS

EDIT     COM   12,345  05-31-94   6:22a
FORMAT   COM   29,816  05-31-94   6:22a
FDISK    EXE   29,334  05-31-94   6:22a
        3 file(s)     71,495 bytes

C:\\DOS>`,(0,s.jsx)(`span`,{className:`terminal__cursor`,children:`█`})]})}},_={name:`Interactive Example (Check Actions tab)`,args:{title:`Interactive Terminal`,autoFocus:!0},render:e=>(0,s.jsx)(o,{...e,children:(0,s.jsxs)(`div`,{style:{fontFamily:`'Flexi IBM VGA True', monospace`,color:`var(--color-semantic-text-primary)`,whiteSpace:`pre`},children:[`Welcome to eiDotter Terminal
Type 'help' for available commands

C:\\EIDOTTER>help
Available commands:
  help    - Show this help message
  cls     - Clear screen
  dir     - List directory contents
  exit    - Exit terminal

C:\\EIDOTTER>`,(0,s.jsx)(`span`,{className:`terminal__cursor`,children:`█`})]})})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'MS-DOS Terminal',
    size: 'medium',
    state: 'active'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Command Prompt',
    size: 'small',
    state: 'active'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Terminal Session',
    size: 'large',
    state: 'active'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Background Terminal',
    state: 'inactive'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Read-Only Terminal',
    minimizable: false,
    maximizable: false,
    closeable: false,
    resizable: false
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v=[`Default`,`Small`,`Large`,`Inactive`,`Minimized`,`WithContent`,`NoControls`,`CustomTitle`,`InteractiveExample`]}))();export{g as CustomTitle,l as Default,f as Inactive,_ as InteractiveExample,d as Large,p as Minimized,h as NoControls,u as Small,m as WithContent,v as __namedExportsOrder,c as default};