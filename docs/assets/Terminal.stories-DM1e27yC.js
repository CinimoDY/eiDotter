import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./index-qdalL59a.js";import{I as n}from"./Icon-Bxky9y3F.js";import"./_commonjsHelpers-CqkleIqs.js";const v=({size:a="medium",title:r="MS-DOS Terminal",state:te="active",resizable:ie=!0,minimizable:ne=!0,maximizable:re=!0,closeable:T=!0,children:se,onMinimize:b,onMaximize:y,onClose:x,onFocus:S,className:z="",autoFocus:w=!1})=>{const[_,D]=s.useState(te),[t,le]=s.useState(!1),g=s.useRef(null);s.useEffect(()=>{w&&g.current&&g.current.focus()},[w]);const oe=()=>{D("minimized"),b==null||b()},me=()=>{le(!t),y==null||y()},O=()=>{x==null||x()},C=()=>{D("active"),S==null||S()},ce=i=>{i.altKey&&i.key==="F4"&&T&&(i.preventDefault(),O())};return _==="minimized"?e.jsx("div",{className:`terminal terminal--minimized ${z}`.trim(),onClick:C,role:"button",tabIndex:0,"aria-label":`Restore ${r} window`,onKeyDown:i=>i.key==="Enter"&&C(),children:e.jsxs("div",{className:"terminal__taskbar-item",children:[e.jsx(n,{name:"App",size:"S"}),e.jsx("span",{className:"terminal__taskbar-title",children:r})]})}):e.jsxs("div",{ref:g,className:`terminal terminal--${a} terminal--${_} ${t?"terminal--maximized":""} ${z}`.trim(),tabIndex:0,role:"dialog","aria-label":`${r} terminal window`,onFocus:C,onKeyDown:ce,children:[e.jsxs("div",{className:"terminal__title-bar",children:[e.jsxs("div",{className:"terminal__title",children:[e.jsx(n,{name:"App",size:"S","aria-hidden":"true"}),e.jsx("span",{className:"terminal__title-text",children:r})]}),e.jsxs("div",{className:"terminal__controls",children:[ne&&e.jsx("button",{className:"terminal__control terminal__control--minimize",onClick:oe,"aria-label":"Minimize window",title:"Minimize",children:e.jsx(n,{name:"Cancel",size:"S"})}),re&&e.jsx("button",{className:"terminal__control terminal__control--maximize",onClick:me,"aria-label":t?"Restore window":"Maximize window",title:t?"Restore":"Maximize",children:e.jsx(n,{name:t?"Fullscreen":"Add",size:"S"})}),T&&e.jsx("button",{className:"terminal__control terminal__control--close",onClick:O,"aria-label":"Close window",title:"Close",children:e.jsx(n,{name:"Close",size:"S"})})]})]}),e.jsx("div",{className:"terminal__content",role:"main",children:se||e.jsx("div",{className:"terminal__default-content",children:e.jsxs("div",{className:"terminal__prompt",children:[e.jsx("span",{className:"terminal__path",children:"C:\\\\>"}),e.jsx("span",{className:"terminal__cursor",children:"█"})]})})}),ie&&e.jsx("div",{className:"terminal__resize-handle","aria-hidden":"true"})]})};v.__docgenInfo={description:"",methods:[],displayName:"Terminal",props:{size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"The size variant of the terminal window",defaultValue:{value:"'medium'",computed:!1}},title:{required:!1,tsType:{name:"string"},description:"The title displayed in the terminal title bar",defaultValue:{value:"'MS-DOS Terminal'",computed:!1}},state:{required:!1,tsType:{name:"union",raw:"'active' | 'inactive' | 'minimized'",elements:[{name:"literal",value:"'active'"},{name:"literal",value:"'inactive'"},{name:"literal",value:"'minimized'"}]},description:"The initial state of the terminal window",defaultValue:{value:"'active'",computed:!1}},resizable:{required:!1,tsType:{name:"boolean"},description:"Whether the terminal window can be resized",defaultValue:{value:"true",computed:!1}},minimizable:{required:!1,tsType:{name:"boolean"},description:"Whether the terminal window can be minimized",defaultValue:{value:"true",computed:!1}},maximizable:{required:!1,tsType:{name:"boolean"},description:"Whether the terminal window can be maximized",defaultValue:{value:"true",computed:!1}},closeable:{required:!1,tsType:{name:"boolean"},description:"Whether the terminal window can be closed",defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"The content to display inside the terminal"},onMinimize:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when the terminal is minimized"},onMaximize:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when the terminal is maximized"},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when the terminal is closed"},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when the terminal gains focus"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name",defaultValue:{value:"''",computed:!1}},autoFocus:{required:!1,tsType:{name:"boolean"},description:"Whether the terminal should auto-focus on mount",defaultValue:{value:"false",computed:!1}}}};const fe={title:"Components/Terminal",component:v,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#0000AA"}]}},tags:["autodocs"],argTypes:{size:{control:"select",options:["small","medium","large"],description:"Size variant of the terminal window"},title:{control:"text",description:"Title displayed in the terminal title bar"},state:{control:"select",options:["active","inactive","minimized"],description:"Current state of the terminal window"},resizable:{control:"boolean",description:"Whether the terminal can be resized"},minimizable:{control:"boolean",description:"Whether the terminal can be minimized"},maximizable:{control:"boolean",description:"Whether the terminal can be maximized"},closeable:{control:"boolean",description:"Whether the terminal can be closed"},autoFocus:{control:"boolean",description:"Whether the terminal should auto-focus on mount"},onMinimize:{action:"minimized"},onMaximize:{action:"maximized"},onClose:{action:"closed"},onFocus:{action:"focused"}}},l={args:{title:"MS-DOS Terminal",size:"medium",state:"active"}},o={args:{title:"Command Prompt",size:"small",state:"active"}},m={args:{title:"Terminal Session",size:"large",state:"active"}},c={args:{title:"Background Terminal",state:"inactive"}},d={args:{title:"Minimized Terminal",state:"minimized"},render:a=>e.jsx("div",{style:{position:"absolute",bottom:10,left:10},children:e.jsx(v,{...a})})},u={args:{title:"Active Session",children:e.jsxs("div",{style:{fontFamily:"'Perfect DOS VGA', monospace",color:"var(--color-semantic-text-primary)",whiteSpace:"pre"},children:[`Microsoft(R) MS-DOS(R) Version 6.22
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

C:\\>`,e.jsx("span",{className:"terminal__cursor",children:"█"})]})}},p={args:{title:"Read-Only Terminal",minimizable:!1,maximizable:!1,closeable:!1,resizable:!1}},h={args:{title:"File Manager - C:\\DOS",children:e.jsxs("div",{style:{fontFamily:"'Perfect DOS VGA', monospace",color:"var(--color-semantic-text-primary)",whiteSpace:"pre"},children:[` Directory of C:\\DOS

EDIT     COM   12,345  05-31-94   6:22a
FORMAT   COM   29,816  05-31-94   6:22a
FDISK    EXE   29,334  05-31-94   6:22a
        3 file(s)     71,495 bytes

C:\\DOS>`,e.jsx("span",{className:"terminal__cursor",children:"█"})]})}},f={name:"Interactive Example (Check Actions tab)",args:{title:"Interactive Terminal",autoFocus:!0},render:a=>e.jsx(v,{...a,children:e.jsxs("div",{style:{fontFamily:"'Perfect DOS VGA', monospace",color:"var(--color-semantic-text-primary)",whiteSpace:"pre"},children:[`Welcome to eiDotter Terminal
Type 'help' for available commands

C:\\EIDOTTER>help
Available commands:
  help    - Show this help message
  cls     - Clear screen
  dir     - List directory contents
  exit    - Exit terminal

C:\\EIDOTTER>`,e.jsx("span",{className:"terminal__cursor",children:"█"})]})})};var N,j,M;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    title: 'MS-DOS Terminal',
    size: 'medium',
    state: 'active'
  }
}`,...(M=(j=l.parameters)==null?void 0:j.docs)==null?void 0:M.source}}};var E,A,I;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    title: 'Command Prompt',
    size: 'small',
    state: 'active'
  }
}`,...(I=(A=o.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var R,V,F;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    title: 'Terminal Session',
    size: 'large',
    state: 'active'
  }
}`,...(F=(V=m.parameters)==null?void 0:V.docs)==null?void 0:F.source}}};var k,W,q;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    title: 'Background Terminal',
    state: 'inactive'
  }
}`,...(q=(W=c.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var G,P,$;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...($=(P=d.parameters)==null?void 0:P.docs)==null?void 0:$.source}}};var K,B,L;u.parameters={...u.parameters,docs:{...(K=u.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(L=(B=u.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var X,U,Y;p.parameters={...p.parameters,docs:{...(X=p.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    title: 'Read-Only Terminal',
    minimizable: false,
    maximizable: false,
    closeable: false,
    resizable: false
  }
}`,...(Y=(U=p.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};var H,J,Q;h.parameters={...h.parameters,docs:{...(H=h.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(Q=(J=h.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var Z,ee,ae;f.parameters={...f.parameters,docs:{...(Z=f.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
}`,...(ae=(ee=f.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};const ve=["Default","Small","Large","Inactive","Minimized","WithContent","NoControls","CustomTitle","InteractiveExample"];export{h as CustomTitle,l as Default,c as Inactive,f as InteractiveExample,m as Large,d as Minimized,p as NoControls,o as Small,u as WithContent,ve as __namedExportsOrder,fe as default};
