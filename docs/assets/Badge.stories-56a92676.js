import{j as e}from"./jsx-runtime-bb4eca5c.js";import"./index-9ab4f09c.js";import"./_commonjsHelpers-725317a4.js";const a=({variant:ae="default",size:re="medium",dot:f=!1,children:se,className:ne="",...te})=>{const ie=["badge",`badge--${ae}`,`badge--${re}`,f&&"badge--with-dot",ne].filter(Boolean).join(" ");return e.jsxs("span",{className:ie,...te,children:[f&&e.jsx("span",{className:"badge__dot","aria-hidden":"true"}),e.jsx("span",{className:"badge__content",children:se})]})};a.__docgenInfo={description:`DOS-styled Badge component for status indicators, labels, and tags\r
\r
Features:\r
- Multiple color variants (default, success, warning, error, info, accent)\r
- Two sizes (small, medium)\r
- Optional dot indicator\r
- DOS-authentic styling with CGA colors\r
- WCAG 2.1 AA compliant`,methods:[],displayName:"Badge",props:{variant:{required:!1,tsType:{name:"union",raw:"'default' | 'success' | 'warning' | 'error' | 'info' | 'accent'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"},{name:"literal",value:"'info'"},{name:"literal",value:"'accent'"}]},description:"The variant determines the badge's color scheme",defaultValue:{value:"'default'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}]},description:"The size of the badge",defaultValue:{value:"'medium'",computed:!1}},dot:{required:!1,tsType:{name:"boolean"},description:"Show a dot indicator before the text",defaultValue:{value:"false",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Badge content"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name",defaultValue:{value:"''",computed:!1}},"aria-label":{required:!1,tsType:{name:"string"},description:"Optional aria-label for accessibility"}}};const oe={title:"Components/Badge",component:a,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","success","warning","error","info","accent"],defaultValue:"default"},size:{control:"select",options:["small","medium"],defaultValue:"medium"},dot:{control:"boolean",defaultValue:!1},children:{control:"text",defaultValue:"Badge"}}},r={args:{children:"Default"}},s={args:{variant:"success",children:"Success"}},n={args:{variant:"warning",children:"Warning"}},t={args:{variant:"error",children:"Error"}},i={args:{variant:"info",children:"Info"}},l={args:{variant:"accent",children:"Accent"}},d={args:{size:"small",children:"Small"}},c={args:{size:"medium",children:"Medium"}},o={args:{dot:!0,children:"Active"}},u={render:()=>e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx(a,{variant:"default",children:"Default"}),e.jsx(a,{variant:"success",children:"Success"}),e.jsx(a,{variant:"warning",children:"Warning"}),e.jsx(a,{variant:"error",children:"Error"}),e.jsx(a,{variant:"info",children:"Info"}),e.jsx(a,{variant:"accent",children:"Accent"})]})},p={render:()=>e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center"},children:[e.jsx(a,{size:"small",children:"Small"}),e.jsx(a,{size:"medium",children:"Medium"})]})},m={render:()=>e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx(a,{variant:"default",dot:!0,children:"Default"}),e.jsx(a,{variant:"success",dot:!0,children:"Online"}),e.jsx(a,{variant:"warning",dot:!0,children:"Pending"}),e.jsx(a,{variant:"error",dot:!0,children:"Offline"}),e.jsx(a,{variant:"info",dot:!0,children:"Syncing"}),e.jsx(a,{variant:"accent",dot:!0,children:"Active"})]})},g={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("span",{style:{color:"#AAAAAA",fontSize:"12px"},children:"Priority:"}),e.jsx(a,{variant:"error",size:"small",children:"High"}),e.jsx(a,{variant:"warning",size:"small",children:"Medium"}),e.jsx(a,{variant:"default",size:"small",children:"Low"})]}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("span",{style:{color:"#AAAAAA",fontSize:"12px"},children:"Source:"}),e.jsx(a,{variant:"accent",size:"small",children:"Claude"}),e.jsx(a,{variant:"default",size:"small",children:"Manual"})]}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("span",{style:{color:"#AAAAAA",fontSize:"12px"},children:"Scope:"}),e.jsx(a,{variant:"info",size:"small",children:"Personal"}),e.jsx(a,{variant:"success",size:"small",children:"Work"})]}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("span",{style:{color:"#AAAAAA",fontSize:"12px"},children:"Status:"}),e.jsx(a,{variant:"success",dot:!0,size:"small",children:"Online"}),e.jsx(a,{variant:"error",dot:!0,size:"small",children:"Offline"}),e.jsx(a,{variant:"warning",dot:!0,size:"small",children:"Away"})]})]})};var v,x,h;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    children: 'Default'
  }
}`,...(h=(x=r.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var A,y,B;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    children: 'Success'
  }
}`,...(B=(y=s.parameters)==null?void 0:y.docs)==null?void 0:B.source}}};var S,j,z;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    children: 'Warning'
  }
}`,...(z=(j=n.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var w,W,b;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    children: 'Error'
  }
}`,...(b=(W=t.parameters)==null?void 0:W.docs)==null?void 0:b.source}}};var I,D,O;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    children: 'Info'
  }
}`,...(O=(D=i.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var M,E,T;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    variant: 'accent',
    children: 'Accent'
  }
}`,...(T=(E=l.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var V,_,C;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    size: 'small',
    children: 'Small'
  }
}`,...(C=(_=d.parameters)==null?void 0:_.docs)==null?void 0:C.source}}};var N,R,q;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    children: 'Medium'
  }
}`,...(q=(R=c.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};var P,k,$;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    dot: true,
    children: 'Active'
  }
}`,...($=(k=o.parameters)==null?void 0:k.docs)==null?void 0:$.source}}};var G,H,L;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="accent">Accent</Badge>
    </div>
}`,...(L=(H=u.parameters)==null?void 0:H.docs)==null?void 0:L.source}}};var F,J,K;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  }}>
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
    </div>
}`,...(K=(J=p.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,X;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Badge variant="default" dot>Default</Badge>
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="error" dot>Offline</Badge>
      <Badge variant="info" dot>Syncing</Badge>
      <Badge variant="accent" dot>Active</Badge>
    </div>
}`,...(X=(U=m.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,Z,ee;g.parameters={...g.parameters,docs:{...(Y=g.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }}>
        <span style={{
        color: '#AAAAAA',
        fontSize: '12px'
      }}>Priority:</span>
        <Badge variant="error" size="small">High</Badge>
        <Badge variant="warning" size="small">Medium</Badge>
        <Badge variant="default" size="small">Low</Badge>
      </div>
      <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }}>
        <span style={{
        color: '#AAAAAA',
        fontSize: '12px'
      }}>Source:</span>
        <Badge variant="accent" size="small">Claude</Badge>
        <Badge variant="default" size="small">Manual</Badge>
      </div>
      <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }}>
        <span style={{
        color: '#AAAAAA',
        fontSize: '12px'
      }}>Scope:</span>
        <Badge variant="info" size="small">Personal</Badge>
        <Badge variant="success" size="small">Work</Badge>
      </div>
      <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }}>
        <span style={{
        color: '#AAAAAA',
        fontSize: '12px'
      }}>Status:</span>
        <Badge variant="success" dot size="small">Online</Badge>
        <Badge variant="error" dot size="small">Offline</Badge>
        <Badge variant="warning" dot size="small">Away</Badge>
      </div>
    </div>
}`,...(ee=(Z=g.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};const ue=["Default","Success","Warning","Error","Info","Accent","Small","Medium","WithDot","AllVariants","AllSizes","AllWithDots","RealWorldExamples"];export{l as Accent,p as AllSizes,u as AllVariants,m as AllWithDots,r as Default,t as Error,i as Info,c as Medium,g as RealWorldExamples,d as Small,s as Success,n as Warning,o as WithDot,ue as __namedExportsOrder,oe as default};
