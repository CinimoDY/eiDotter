import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as a}from"./TimelineNode-DrvGGLlt.js";import{c as K}from"./registry-CyM9n0D0.js";import"./iframe-BU4rT9RF.js";import"./preload-helper-Dp1pzeXC.js";import"./cn-CvUv5FIJ.js";const $={title:"Components/TimelineNode",component:a,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:K.TimelineNode},tags:["autodocs"],argTypes:{shape:{control:"select",options:["circle","square","diamond"]},variant:{control:"select",options:["default","primary","secondary","accent"]},size:{control:"select",options:["small","medium","large"]},labelPosition:{control:"select",options:["left","right","top","bottom"]},isActive:{control:"boolean"},label:{control:"text"}}},i={args:{label:"2024-01-15"}},l={args:{label:"2024-01-15",isActive:!0}},s={args:{label:"Click me",onClick:()=>alert("Node clicked!")}},r={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{shape:"circle",label:"Circle"}),e.jsx(a,{shape:"square",label:"Square"}),e.jsx(a,{shape:"diamond",label:"Diamond"})]})},t={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{variant:"default",label:"Default"}),e.jsx(a,{variant:"primary",label:"Primary"}),e.jsx(a,{variant:"secondary",label:"Secondary"}),e.jsx(a,{variant:"accent",label:"Accent"})]})},o={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{size:"small",label:"Small"}),e.jsx(a,{size:"medium",label:"Medium"}),e.jsx(a,{size:"large",label:"Large"})]})},c={render:()=>e.jsxs("div",{style:{display:"flex",gap:"48px",alignItems:"center"},children:[e.jsx(a,{label:"Left",labelPosition:"left"}),e.jsx(a,{label:"Right",labelPosition:"right"}),e.jsx(a,{label:"Top",labelPosition:"top"}),e.jsx(a,{label:"Bottom",labelPosition:"bottom"})]})},n={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{label:"Inactive",isActive:!1}),e.jsx(a,{label:"Active",isActive:!0}),e.jsx(a,{label:"Interactive",onClick:()=>{}}),e.jsx(a,{label:"Active + Interactive",isActive:!0,onClick:()=>{}})]})},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px",position:"relative",paddingLeft:"80px"},children:[e.jsx("div",{style:{position:"absolute",left:"85px",top:"6px",bottom:"6px",width:"2px",background:"var(--color-cga-amber-dim)"}}),e.jsx(a,{label:"Jan 2024",isActive:!0}),e.jsx(a,{label:"Feb 2024"}),e.jsx(a,{label:"Mar 2024"}),e.jsx(a,{label:"Apr 2024"})]})},p={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0"},children:[e.jsx(a,{shape:"circle",variant:"primary",isActive:!0,label:"1",labelPosition:"bottom"}),e.jsx("div",{style:{width:"60px",height:"2px",background:"var(--color-cga-amber)"}}),e.jsx(a,{shape:"circle",variant:"primary",label:"2",labelPosition:"bottom"}),e.jsx("div",{style:{width:"60px",height:"2px",background:"var(--color-cga-amber-dim)"}}),e.jsx(a,{shape:"circle",variant:"default",label:"3",labelPosition:"bottom"}),e.jsx("div",{style:{width:"60px",height:"2px",background:"var(--color-cga-amber-dim)"}}),e.jsx(a,{shape:"circle",variant:"default",label:"4",labelPosition:"bottom"})]})},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsx("div",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Small"}),e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{size:"small",shape:"circle"}),e.jsx(a,{size:"small",shape:"square"}),e.jsx(a,{size:"small",shape:"diamond"}),e.jsx(a,{size:"small",shape:"circle",isActive:!0})]}),e.jsx("div",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Medium"}),e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{size:"medium",shape:"circle"}),e.jsx(a,{size:"medium",shape:"square"}),e.jsx(a,{size:"medium",shape:"diamond"}),e.jsx(a,{size:"medium",shape:"circle",isActive:!0})]}),e.jsx("div",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Large"}),e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{size:"large",shape:"circle"}),e.jsx(a,{size:"large",shape:"square"}),e.jsx(a,{size:"large",shape:"diamond"}),e.jsx(a,{size:"large",shape:"circle",isActive:!0})]})]})};var x,v,b;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: '2024-01-15'
  }
}`,...(b=(v=i.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var g,u,h;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: '2024-01-15',
    isActive: true
  }
}`,...(h=(u=l.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var y,f,j;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: 'Click me',
    onClick: () => alert('Node clicked!')
  }
}`,...(j=(f=s.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};var T,N,S;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'center'
  }}>
      <TimelineNode shape="circle" label="Circle" />
      <TimelineNode shape="square" label="Square" />
      <TimelineNode shape="diamond" label="Diamond" />
    </div>
}`,...(S=(N=r.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var z,A,I;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'center'
  }}>
      <TimelineNode variant="default" label="Default" />
      <TimelineNode variant="primary" label="Primary" />
      <TimelineNode variant="secondary" label="Secondary" />
      <TimelineNode variant="accent" label="Accent" />
    </div>
}`,...(I=(A=t.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var P,k,q;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'center'
  }}>
      <TimelineNode size="small" label="Small" />
      <TimelineNode size="medium" label="Medium" />
      <TimelineNode size="large" label="Large" />
    </div>
}`,...(q=(k=o.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var C,D,L;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '48px',
    alignItems: 'center'
  }}>
      <TimelineNode label="Left" labelPosition="left" />
      <TimelineNode label="Right" labelPosition="right" />
      <TimelineNode label="Top" labelPosition="top" />
      <TimelineNode label="Bottom" labelPosition="bottom" />
    </div>
}`,...(L=(D=c.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var w,M,R;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'center'
  }}>
      <TimelineNode label="Inactive" isActive={false} />
      <TimelineNode label="Active" isActive={true} />
      <TimelineNode label="Interactive" onClick={() => {}} />
      <TimelineNode label="Active + Interactive" isActive={true} onClick={() => {}} />
    </div>
}`,...(R=(M=n.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var V,B,E;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    position: 'relative',
    paddingLeft: '80px'
  }}>
      <div style={{
      position: 'absolute',
      left: '85px',
      top: '6px',
      bottom: '6px',
      width: '2px',
      background: 'var(--color-cga-amber-dim)'
    }} />
      <TimelineNode label="Jan 2024" isActive />
      <TimelineNode label="Feb 2024" />
      <TimelineNode label="Mar 2024" />
      <TimelineNode label="Apr 2024" />
    </div>
}`,...(E=(B=d.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var F,J,_;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '0'
  }}>
      <TimelineNode shape="circle" variant="primary" isActive label="1" labelPosition="bottom" />
      <div style={{
      width: '60px',
      height: '2px',
      background: 'var(--color-cga-amber)'
    }} />
      <TimelineNode shape="circle" variant="primary" label="2" labelPosition="bottom" />
      <div style={{
      width: '60px',
      height: '2px',
      background: 'var(--color-cga-amber-dim)'
    }} />
      <TimelineNode shape="circle" variant="default" label="3" labelPosition="bottom" />
      <div style={{
      width: '60px',
      height: '2px',
      background: 'var(--color-cga-amber-dim)'
    }} />
      <TimelineNode shape="circle" variant="default" label="4" labelPosition="bottom" />
    </div>
}`,...(_=(J=p.parameters)==null?void 0:J.docs)==null?void 0:_.source}}};var O,G,H;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
      <div style={{
      color: 'var(--color-semantic-text-disabled)',
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }}>
        Small
      </div>
      <div style={{
      display: 'flex',
      gap: '32px',
      alignItems: 'center'
    }}>
        <TimelineNode size="small" shape="circle" />
        <TimelineNode size="small" shape="square" />
        <TimelineNode size="small" shape="diamond" />
        <TimelineNode size="small" shape="circle" isActive />
      </div>
      <div style={{
      color: 'var(--color-semantic-text-disabled)',
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }}>
        Medium
      </div>
      <div style={{
      display: 'flex',
      gap: '32px',
      alignItems: 'center'
    }}>
        <TimelineNode size="medium" shape="circle" />
        <TimelineNode size="medium" shape="square" />
        <TimelineNode size="medium" shape="diamond" />
        <TimelineNode size="medium" shape="circle" isActive />
      </div>
      <div style={{
      color: 'var(--color-semantic-text-disabled)',
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }}>
        Large
      </div>
      <div style={{
      display: 'flex',
      gap: '32px',
      alignItems: 'center'
    }}>
        <TimelineNode size="large" shape="circle" />
        <TimelineNode size="large" shape="square" />
        <TimelineNode size="large" shape="diamond" />
        <TimelineNode size="large" shape="circle" isActive />
      </div>
    </div>
}`,...(H=(G=m.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const ee=["Default","Active","Interactive","Shapes","Variants","Sizes","LabelPositions","ActiveStates","VerticalTimeline","Stepper","AllShapesAndSizes"];export{l as Active,n as ActiveStates,m as AllShapesAndSizes,i as Default,s as Interactive,c as LabelPositions,r as Shapes,o as Sizes,p as Stepper,t as Variants,d as VerticalTimeline,ee as __namedExportsOrder,$ as default};
