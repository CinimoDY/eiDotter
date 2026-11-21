import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{r,t as i}from"./registry-EhIcK3QA.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./DosDialog-ClJmGf0M.js";import{n as c,t as l}from"./IconButton-6lIXA5ND.js";import{n as u,t as d}from"./Button-DYwuDaLT.js";import"./Modal-ChQgXbl3.js";var f,p,m,h,g,_,v,y,b,x,S,C,w;function T(){return(T=t((()=>{f=e(n(),1),o(),u(),c(),r(),p=a(),m={title:`Components/DosDialog`,component:s,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:i.DosDialog,docs:{description:{component:`The one overlay shell. CmdPalette chrome (brand border, amber glow, square corners, blurred scrim) with a dark title strip (yellow title, ▸ marker, dim-amber rule). Modal, Lightbox and CmdPalette are built on it. Use it directly for any overlay that is not one of those three.`}}},tags:[`autodocs`],argTypes:{placement:{control:`inline-radio`,options:[`center`,`top`]},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`,`full`]},isDismissable:{control:`boolean`}}},h=({label:e=`OPEN DIALOG`,startOpen:t=!1,children:n,...r})=>{let[i,a]=(0,f.useState)(t);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(d,{onClick:()=>a(!0),children:e}),(0,p.jsx)(s,{open:i,onOpenChange:a,...r,children:n})]})},g=({onPress:e})=>(0,p.jsx)(l,{className:`eidotter-modal__close`,icon:`Close`,label:`Close dialog`,onPress:e}),_={render:()=>(0,p.jsx)(h,{head:{title:`SYSTEM MESSAGE`},children:(0,p.jsx)(`p`,{style:{margin:0,color:`var(--color-cga-light-gray)`},children:`C:\\> All drives checked. No errors found.`})})},v={render:()=>(0,p.jsx)(()=>{let[e,t]=(0,f.useState)(!1);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(d,{onClick:()=>t(!0),children:`OPEN DIALOG`}),(0,p.jsx)(s,{open:e,onOpenChange:t,head:{title:`FORMAT A:`,end:(0,p.jsx)(g,{onPress:()=>t(!1)})},footer:(0,p.jsxs)(`div`,{style:{display:`flex`,gap:8,justifyContent:`flex-end`},children:[(0,p.jsx)(d,{variant:`ghost`,onClick:()=>t(!1),children:`Cancel`}),(0,p.jsx)(d,{variant:`primary`,onClick:()=>t(!1),children:`Proceed`})]}),children:(0,p.jsx)(`p`,{style:{margin:0,color:`var(--color-cga-light-gray)`},children:`All data on drive A: will be lost. Proceed with format?`})})]})},{})},y={render:()=>(0,p.jsx)(h,{placement:`top`,size:`lg`,head:{title:`JUMP TO`},children:(0,p.jsx)(`p`,{style:{margin:0,color:`var(--color-cga-light-gray)`},children:`Anchored near the top of the viewport.`})})},b={render:()=>(0,p.jsx)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[`sm`,`md`,`lg`,`full`].map(e=>(0,p.jsx)(h,{label:`SIZE ${e.toUpperCase()}`,size:e,head:{title:`SIZE ${e}`},children:(0,p.jsxs)(`p`,{style:{margin:0,color:`var(--color-cga-light-gray)`},children:[`size="`,e,`"`]})},e))})},x={render:()=>(0,p.jsx)(h,{head:{title:`PLAIN STRIP`,marker:!1},children:(0,p.jsx)(`p`,{style:{margin:0,color:`var(--color-cga-light-gray)`},children:`The marker is optional.`})})},S={render:()=>(0,p.jsx)(h,{startOpen:!0,head:{title:`SYSTEM MESSAGE`},footer:(0,p.jsx)(`span`,{children:`F1 HELP · ESC CLOSE`}),children:(0,p.jsx)(`p`,{style:{margin:0,color:`var(--color-cga-light-gray)`},children:`The shell: brand border, amber glow, title strip, body, footer rule.`})})},C={parameters:{layout:`padded`},render:()=>(0,p.jsx)(s,{inline:!0,open:!0,head:{title:`FORMAT A:`,end:(0,p.jsx)(g,{})},footer:(0,p.jsxs)(`div`,{style:{display:`flex`,gap:8,justifyContent:`flex-end`},children:[(0,p.jsx)(d,{variant:`ghost`,children:`Cancel`}),(0,p.jsx)(d,{variant:`primary`,children:`Proceed`})]}),children:(0,p.jsx)(`p`,{style:{margin:0,color:`var(--color-cga-light-gray)`},children:`All data on drive A: will be lost. Proceed with format?`})})},w=[`Default`,`WithFooterAndClose`,`TopPlacement`,`Sizes`,`NoMarker`,`OpenOnLoad`,`Inline`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <DialogDemo head={{
    title: 'SYSTEM MESSAGE'
  }}>
      <p style={{
      margin: 0,
      color: 'var(--color-cga-light-gray)'
    }}>
        C:\\&gt; All drives checked. No errors found.
      </p>
    </DialogDemo>
}`,..._.parameters?.docs?.source},description:{story:`Title strip with the ▸ marker, body, and the default md width.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return <>
          <Button onClick={() => setOpen(true)}>OPEN DIALOG</Button>
          <DosDialog open={open} onOpenChange={setOpen} head={{
          title: 'FORMAT A:',
          end: <CloseGlyph onPress={() => setOpen(false)} />
        }} footer={<div style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'flex-end'
        }}>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setOpen(false)}>Proceed</Button>
              </div>}>
            <p style={{
            margin: 0,
            color: 'var(--color-cga-light-gray)'
          }}>
              All data on drive A: will be lost. Proceed with format?
            </p>
          </DosDialog>
        </>;
    };
    return <Demo />;
  }
}`,...v.parameters?.docs?.source},description:{story:`Strip end slot carries the close control; footer gets the 1px rule.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <DialogDemo placement="top" size="lg" head={{
    title: 'JUMP TO'
  }}>
      <p style={{
      margin: 0,
      color: 'var(--color-cga-light-gray)'
    }}>Anchored near the top of the viewport.</p>
    </DialogDemo>
}`,...y.parameters?.docs?.source},description:{story:`Top placement — CmdPalette's ~18vh anchor.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap'
  }}>
      {(['sm', 'md', 'lg', 'full'] as const).map(size => <DialogDemo key={size} label={\`SIZE \${size.toUpperCase()}\`} size={size} head={{
      title: \`SIZE \${size}\`
    }}>
          <p style={{
        margin: 0,
        color: 'var(--color-cga-light-gray)'
      }}>size=&quot;{size}&quot;</p>
        </DialogDemo>)}
    </div>
}`,...b.parameters?.docs?.source},description:{story:`The shared width map: sm 24rem, md 30rem, lg 40rem, full.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <DialogDemo head={{
    title: 'PLAIN STRIP',
    marker: false
  }}>
      <p style={{
      margin: 0,
      color: 'var(--color-cga-light-gray)'
    }}>The marker is optional.</p>
    </DialogDemo>
}`,...x.parameters?.docs?.source},description:{story:`Strip without the ▸ marker.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <DialogDemo startOpen head={{
    title: 'SYSTEM MESSAGE'
  }} footer={<span>F1 HELP · ESC CLOSE</span>}>
      <p style={{
      margin: 0,
      color: 'var(--color-cga-light-gray)'
    }}>
        The shell: brand border, amber glow, title strip, body, footer rule.
      </p>
    </DialogDemo>
}`,...S.parameters?.docs?.source},description:{story:`Opens on load — for visual review of the chrome.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <DosDialog inline open head={{
    title: 'FORMAT A:',
    end: <CloseGlyph />
  }} footer={<div style={{
    display: 'flex',
    gap: 8,
    justifyContent: 'flex-end'
  }}>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Proceed</Button>
        </div>}>
      <p style={{
      margin: 0,
      color: 'var(--color-cga-light-gray)'
    }}>
        All data on drive A: will be lost. Proceed with format?
      </p>
    </DosDialog>
}`,...C.parameters?.docs?.source},description:{story:'`inline`: the same chrome rendered in place, with no overlay, portal, scrim\nor focus trap, so docs pages can show it without hydration. The container\nis a `role="group"` named by the title; Escape does nothing.',...C.parameters?.docs?.description}}}})))()}T();export{_ as Default,C as Inline,x as NoMarker,S as OpenOnLoad,b as Sizes,y as TopPlacement,v as WithFooterAndClose,w as __namedExportsOrder,m as default};