import{j as e}from"./jsx-runtime-bb4eca5c.js";import"./index-9ab4f09c.js";import"./_commonjsHelpers-725317a4.js";const a=({shape:X="circle",variant:Y="default",isActive:f=!1,label:l,labelPosition:s="left",size:Z="medium",className:ee="",onClick:i,...ae})=>{const le=["timeline-node",`timeline-node--${X}`,`timeline-node--${Y}`,`timeline-node--${Z}`,`timeline-node--label-${s}`,f&&"timeline-node--active",i&&"timeline-node--interactive",ee].filter(Boolean).join(" "),ie=()=>{i&&i()},se=b=>{i&&(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),i())};return e.jsxs("div",{className:le,onClick:ie,onKeyDown:se,role:i?"button":void 0,tabIndex:i?0:void 0,"aria-pressed":i?f:void 0,...ae,children:[l&&s==="left"&&e.jsx("span",{className:"timeline-node__label timeline-node__label--left",children:l}),l&&s==="top"&&e.jsx("span",{className:"timeline-node__label timeline-node__label--top",children:l}),e.jsx("span",{className:"timeline-node__marker","aria-hidden":"true"}),l&&s==="right"&&e.jsx("span",{className:"timeline-node__label timeline-node__label--right",children:l}),l&&s==="bottom"&&e.jsx("span",{className:"timeline-node__label timeline-node__label--bottom",children:l})]})};a.__docgenInfo={description:`TimelineNode - Axis marker for timeline/stepper interfaces\r
\r
A versatile node component for timelines, steppers, and progress indicators.\r
Features multiple shapes, glow effects on hover/active states, and optional labels.\r
\r
Uses DOS/CGA aesthetic with amber phosphor glow effects.`,methods:[],displayName:"TimelineNode",props:{shape:{required:!1,tsType:{name:"union",raw:"'circle' | 'square' | 'diamond'",elements:[{name:"literal",value:"'circle'"},{name:"literal",value:"'square'"},{name:"literal",value:"'diamond'"}]},description:`Shape of the node marker\r
@default 'circle'`,defaultValue:{value:"'circle'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'primary' | 'secondary' | 'accent'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'accent'"}]},description:`Visual variant of the node\r
@default 'default'`,defaultValue:{value:"'default'",computed:!1}},isActive:{required:!1,tsType:{name:"boolean"},description:`Whether this node is in active/selected state\r
@default false`,defaultValue:{value:"false",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"Optional label to display next to the node (e.g., date, time)"},labelPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'top' | 'bottom'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"}]},description:`Position of the label relative to the node\r
@default 'left'`,defaultValue:{value:"'left'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`Size of the node\r
@default 'medium'`,defaultValue:{value:"'medium'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name",defaultValue:{value:"''",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Click handler for interactive nodes"}}};const ne={title:"Components/TimelineNode",component:a,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{shape:{control:"select",options:["circle","square","diamond"]},variant:{control:"select",options:["default","primary","secondary","accent"]},size:{control:"select",options:["small","medium","large"]},labelPosition:{control:"select",options:["left","right","top","bottom"]},isActive:{control:"boolean"},label:{control:"text"}}},t={args:{label:"2024-01-15"}},r={args:{label:"2024-01-15",isActive:!0}},o={args:{label:"Click me",onClick:()=>alert("Node clicked!")}},n={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{shape:"circle",label:"Circle"}),e.jsx(a,{shape:"square",label:"Square"}),e.jsx(a,{shape:"diamond",label:"Diamond"})]})},d={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{variant:"default",label:"Default"}),e.jsx(a,{variant:"primary",label:"Primary"}),e.jsx(a,{variant:"secondary",label:"Secondary"}),e.jsx(a,{variant:"accent",label:"Accent"})]})},c={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{size:"small",label:"Small"}),e.jsx(a,{size:"medium",label:"Medium"}),e.jsx(a,{size:"large",label:"Large"})]})},m={render:()=>e.jsxs("div",{style:{display:"flex",gap:"48px",alignItems:"center"},children:[e.jsx(a,{label:"Left",labelPosition:"left"}),e.jsx(a,{label:"Right",labelPosition:"right"}),e.jsx(a,{label:"Top",labelPosition:"top"}),e.jsx(a,{label:"Bottom",labelPosition:"bottom"})]})},p={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{label:"Inactive",isActive:!1}),e.jsx(a,{label:"Active",isActive:!0}),e.jsx(a,{label:"Interactive",onClick:()=>{}}),e.jsx(a,{label:"Active + Interactive",isActive:!0,onClick:()=>{}})]})},u={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px",position:"relative",paddingLeft:"80px"},children:[e.jsx("div",{style:{position:"absolute",left:"85px",top:"6px",bottom:"6px",width:"2px",background:"var(--color-cga-amber-dim)"}}),e.jsx(a,{label:"Jan 2024",labelPosition:"left",isActive:!0}),e.jsx(a,{label:"Feb 2024",labelPosition:"left"}),e.jsx(a,{label:"Mar 2024",labelPosition:"left"}),e.jsx(a,{label:"Apr 2024",labelPosition:"left"})]})},v={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0"},children:[e.jsx(a,{shape:"circle",variant:"primary",isActive:!0,label:"1",labelPosition:"bottom"}),e.jsx("div",{style:{width:"60px",height:"2px",background:"var(--color-cga-amber)"}}),e.jsx(a,{shape:"circle",variant:"primary",label:"2",labelPosition:"bottom"}),e.jsx("div",{style:{width:"60px",height:"2px",background:"var(--color-cga-amber-dim)"}}),e.jsx(a,{shape:"circle",variant:"default",label:"3",labelPosition:"bottom"}),e.jsx("div",{style:{width:"60px",height:"2px",background:"var(--color-cga-amber-dim)"}}),e.jsx(a,{shape:"circle",variant:"default",label:"4",labelPosition:"bottom"})]})},x={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsx("div",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Small"}),e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{size:"small",shape:"circle"}),e.jsx(a,{size:"small",shape:"square"}),e.jsx(a,{size:"small",shape:"diamond"}),e.jsx(a,{size:"small",shape:"circle",isActive:!0})]}),e.jsx("div",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Medium"}),e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{size:"medium",shape:"circle"}),e.jsx(a,{size:"medium",shape:"square"}),e.jsx(a,{size:"medium",shape:"diamond"}),e.jsx(a,{size:"medium",shape:"circle",isActive:!0})]}),e.jsx("div",{style:{color:"var(--color-semantic-text-disabled)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em"},children:"Large"}),e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsx(a,{size:"large",shape:"circle"}),e.jsx(a,{size:"large",shape:"square"}),e.jsx(a,{size:"large",shape:"diamond"}),e.jsx(a,{size:"large",shape:"circle",isActive:!0})]})]})};var g,h,y;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: '2024-01-15'
  }
}`,...(y=(h=t.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var j,T,N;r.parameters={...r.parameters,docs:{...(j=r.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: '2024-01-15',
    isActive: true
  }
}`,...(N=(T=r.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var S,z,A;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Click me',
    onClick: () => alert('Node clicked!')
  }
}`,...(A=(z=o.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var I,P,_;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'center'
  }}>
      <TimelineNode shape="circle" label="Circle" />
      <TimelineNode shape="square" label="Square" />
      <TimelineNode shape="diamond" label="Diamond" />
    </div>
}`,...(_=(P=n.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};var k,q,w;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(w=(q=d.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};var D,V,C;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'center'
  }}>
      <TimelineNode size="small" label="Small" />
      <TimelineNode size="medium" label="Medium" />
      <TimelineNode size="large" label="Large" />
    </div>
}`,...(C=(V=c.parameters)==null?void 0:V.docs)==null?void 0:C.source}}};var L,M,$;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...($=(M=m.parameters)==null?void 0:M.docs)==null?void 0:$.source}}};var B,E,F;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(F=(E=p.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var O,R,J;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
      <TimelineNode label="Jan 2024" labelPosition="left" isActive />
      <TimelineNode label="Feb 2024" labelPosition="left" />
      <TimelineNode label="Mar 2024" labelPosition="left" />
      <TimelineNode label="Apr 2024" labelPosition="left" />
    </div>
}`,...(J=(R=u.parameters)==null?void 0:R.docs)==null?void 0:J.source}}};var K,G,U;v.parameters={...v.parameters,docs:{...(K=v.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(U=(G=v.parameters)==null?void 0:G.docs)==null?void 0:U.source}}};var W,H,Q;x.parameters={...x.parameters,docs:{...(W=x.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(Q=(H=x.parameters)==null?void 0:H.docs)==null?void 0:Q.source}}};const de=["Default","Active","Interactive","Shapes","Variants","Sizes","LabelPositions","ActiveStates","VerticalTimeline","Stepper","AllShapesAndSizes"];export{r as Active,p as ActiveStates,x as AllShapesAndSizes,t as Default,o as Interactive,m as LabelPositions,n as Shapes,c as Sizes,v as Stepper,d as Variants,u as VerticalTimeline,de as __namedExportsOrder,ne as default};
