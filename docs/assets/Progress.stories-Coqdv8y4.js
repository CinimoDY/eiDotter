import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{P as r}from"./Progress-DsLPrMq0.js";import{c as ze}from"./registry-BMuWnSIt.js";const We={title:"Components/Progress",component:r,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:ze.Progress},tags:["autodocs"],argTypes:{value:{control:{type:"range",min:0,max:100,step:5}},variant:{control:"select",options:["default","success","warning","error"]},size:{control:"select",options:["small","medium","large"]},trackStyle:{control:"select",options:["block","bordered","gradient"]},blocks:{control:{type:"range",min:3,max:80,step:1}},showLabel:{control:"boolean"},glow:{control:"boolean"},indeterminate:{control:"boolean"}}},a={args:{value:50}},s={args:{value:75,showLabel:!0}},o={args:{value:100,variant:"success",showLabel:!0}},l={args:{value:60,variant:"warning",showLabel:!0}},t={args:{value:25,variant:"error",showLabel:!0}},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx(r,{value:80,showLabel:!0}),e.jsx(r,{value:100,variant:"success",showLabel:!0}),e.jsx(r,{value:60,variant:"warning",showLabel:!0}),e.jsx(r,{value:25,variant:"error",showLabel:!0})]})},i={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx(r,{value:50,size:"small",showLabel:!0}),e.jsx(r,{value:50,size:"medium",showLabel:!0}),e.jsx(r,{value:50,size:"large",showLabel:!0})]})},c={name:"Track: Block (Default)",args:{value:60,trackStyle:"block",showLabel:!0}},d={name:"Track: Bordered",args:{value:60,trackStyle:"bordered",showLabel:!0}},u={name:"Track: Gradient",args:{value:60,trackStyle:"gradient",showLabel:!0}},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",marginBottom:"4px",fontFamily:"monospace",fontSize:"12px"},children:"block (default)"}),e.jsx(r,{value:60,trackStyle:"block",showLabel:!0})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",marginBottom:"4px",fontFamily:"monospace",fontSize:"12px"},children:"bordered"}),e.jsx(r,{value:60,trackStyle:"bordered",showLabel:!0})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",marginBottom:"4px",fontFamily:"monospace",fontSize:"12px"},children:"gradient"}),e.jsx(r,{value:60,trackStyle:"gradient",showLabel:!0})]})]})},p={args:{value:70,glow:!0,showLabel:!0}},v={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx(r,{value:80,glow:!0,showLabel:!0}),e.jsx(r,{value:100,variant:"success",glow:!0,showLabel:!0}),e.jsx(r,{value:60,variant:"warning",glow:!0,showLabel:!0}),e.jsx(r,{value:25,variant:"error",glow:!0,showLabel:!0})]})},x={args:{indeterminate:!0}},g={args:{indeterminate:!0,showLabel:!0}},A={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",marginBottom:"4px",fontFamily:"monospace",fontSize:"12px"},children:"10 blocks"}),e.jsx(r,{value:50,blocks:10,showLabel:!0})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",marginBottom:"4px",fontFamily:"monospace",fontSize:"12px"},children:"20 blocks (default)"}),e.jsx(r,{value:50,blocks:20,showLabel:!0})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",marginBottom:"4px",fontFamily:"monospace",fontSize:"12px"},children:"40 blocks"}),e.jsx(r,{value:50,blocks:40,showLabel:!0})]})]})},h={name:"States: 0% → 100%",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsx(r,{value:0,showLabel:!0}),e.jsx(r,{value:25,showLabel:!0}),e.jsx(r,{value:50,showLabel:!0}),e.jsx(r,{value:75,showLabel:!0}),e.jsx(r,{value:100,showLabel:!0})]})},b={name:"Full Width",render:()=>e.jsxs("div",{style:{width:"400px",display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx("div",{style:{color:"#AAAAAA",marginBottom:"4px",fontFamily:"monospace",fontSize:"12px"},children:"fullWidth — bar fills container, label stays adjacent"}),e.jsx(r,{value:73,fullWidth:!0,showLabel:!0}),e.jsx(r,{value:45,fullWidth:!0,showLabel:!0,variant:"success"}),e.jsx(r,{value:25,fullWidth:!0,showLabel:!0,variant:"error",glow:!0})]})},y={name:"Full Width vs Default",render:()=>e.jsxs("div",{style:{width:"500px",display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",marginBottom:"4px",fontFamily:"monospace",fontSize:"12px"},children:"default (inline, sized by blocks)"}),e.jsx(r,{value:60,showLabel:!0})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",marginBottom:"4px",fontFamily:"monospace",fontSize:"12px"},children:"fullWidth (fills container, label adjacent)"}),e.jsx(r,{value:60,fullWidth:!0,showLabel:!0})]})]})},f={name:"DOS Showcase",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",fontFamily:"monospace"},children:[e.jsx("div",{style:{color:"#AAAAAA",fontSize:"14px"},children:"PKZIP style"}),e.jsx(r,{value:73,trackStyle:"bordered",showLabel:!0}),e.jsx("div",{style:{color:"#AAAAAA",fontSize:"14px",marginTop:"8px"},children:"Norton Commander style"}),e.jsx(r,{value:45,trackStyle:"block",showLabel:!0,glow:!0}),e.jsx("div",{style:{color:"#AAAAAA",fontSize:"14px",marginTop:"8px"},children:"Defrag gradient"}),e.jsx(r,{value:62,trackStyle:"gradient",blocks:40,showLabel:!0}),e.jsx("div",{style:{color:"#AAAAAA",fontSize:"14px",marginTop:"8px"},children:"Scanning..."}),e.jsx(r,{indeterminate:!0,showLabel:!0})]})};var w,S,L;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    value: 50
  }
}`,...(L=(S=a.parameters)==null?void 0:S.docs)==null?void 0:L.source}}};var j,k,P;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    value: 75,
    showLabel: true
  }
}`,...(P=(k=s.parameters)==null?void 0:k.docs)==null?void 0:P.source}}};var z,D,B;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    value: 100,
    variant: 'success',
    showLabel: true
  }
}`,...(B=(D=o.parameters)==null?void 0:D.docs)==null?void 0:B.source}}};var F,W,T;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    value: 60,
    variant: 'warning',
    showLabel: true
  }
}`,...(T=(W=l.parameters)==null?void 0:W.docs)==null?void 0:T.source}}};var G,C,I;t.parameters={...t.parameters,docs:{...(G=t.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    value: 25,
    variant: 'error',
    showLabel: true
  }
}`,...(I=(C=t.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var O,E,V;n.parameters={...n.parameters,docs:{...(O=n.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <Progress value={80} showLabel />
      <Progress value={100} variant="success" showLabel />
      <Progress value={60} variant="warning" showLabel />
      <Progress value={25} variant="error" showLabel />
    </div>
}`,...(V=(E=n.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var K,N,R;i.parameters={...i.parameters,docs:{...(K=i.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <Progress value={50} size="small" showLabel />
      <Progress value={50} size="medium" showLabel />
      <Progress value={50} size="large" showLabel />
    </div>
}`,...(R=(N=i.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var Z,_,M;c.parameters={...c.parameters,docs:{...(Z=c.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  name: 'Track: Block (Default)',
  args: {
    value: 60,
    trackStyle: 'block',
    showLabel: true
  }
}`,...(M=(_=c.parameters)==null?void 0:_.docs)==null?void 0:M.source}}};var q,H,J;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: 'Track: Bordered',
  args: {
    value: 60,
    trackStyle: 'bordered',
    showLabel: true
  }
}`,...(J=(H=d.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var Q,U,X;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  name: 'Track: Gradient',
  args: {
    value: 60,
    trackStyle: 'gradient',
    showLabel: true
  }
}`,...(X=(U=u.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,$,ee;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <div>
        <div style={{
        color: '#AAAAAA',
        marginBottom: '4px',
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>block (default)</div>
        <Progress value={60} trackStyle="block" showLabel />
      </div>
      <div>
        <div style={{
        color: '#AAAAAA',
        marginBottom: '4px',
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>bordered</div>
        <Progress value={60} trackStyle="bordered" showLabel />
      </div>
      <div>
        <div style={{
        color: '#AAAAAA',
        marginBottom: '4px',
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>gradient</div>
        <Progress value={60} trackStyle="gradient" showLabel />
      </div>
    </div>
}`,...(ee=($=m.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var re,ae,se;p.parameters={...p.parameters,docs:{...(re=p.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    value: 70,
    glow: true,
    showLabel: true
  }
}`,...(se=(ae=p.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var oe,le,te;v.parameters={...v.parameters,docs:{...(oe=v.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <Progress value={80} glow showLabel />
      <Progress value={100} variant="success" glow showLabel />
      <Progress value={60} variant="warning" glow showLabel />
      <Progress value={25} variant="error" glow showLabel />
    </div>
}`,...(te=(le=v.parameters)==null?void 0:le.docs)==null?void 0:te.source}}};var ne,ie,ce;x.parameters={...x.parameters,docs:{...(ne=x.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    indeterminate: true
  }
}`,...(ce=(ie=x.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var de,ue,me;g.parameters={...g.parameters,docs:{...(de=g.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    indeterminate: true,
    showLabel: true
  }
}`,...(me=(ue=g.parameters)==null?void 0:ue.docs)==null?void 0:me.source}}};var pe,ve,xe;A.parameters={...A.parameters,docs:{...(pe=A.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <div>
        <div style={{
        color: '#AAAAAA',
        marginBottom: '4px',
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>10 blocks</div>
        <Progress value={50} blocks={10} showLabel />
      </div>
      <div>
        <div style={{
        color: '#AAAAAA',
        marginBottom: '4px',
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>20 blocks (default)</div>
        <Progress value={50} blocks={20} showLabel />
      </div>
      <div>
        <div style={{
        color: '#AAAAAA',
        marginBottom: '4px',
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>40 blocks</div>
        <Progress value={50} blocks={40} showLabel />
      </div>
    </div>
}`,...(xe=(ve=A.parameters)==null?void 0:ve.docs)==null?void 0:xe.source}}};var ge,Ae,he;h.parameters={...h.parameters,docs:{...(ge=h.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  name: 'States: 0% → 100%',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
      <Progress value={0} showLabel />
      <Progress value={25} showLabel />
      <Progress value={50} showLabel />
      <Progress value={75} showLabel />
      <Progress value={100} showLabel />
    </div>
}`,...(he=(Ae=h.parameters)==null?void 0:Ae.docs)==null?void 0:he.source}}};var be,ye,fe;b.parameters={...b.parameters,docs:{...(be=b.parameters)==null?void 0:be.docs,source:{originalSource:`{
  name: 'Full Width',
  render: () => <div style={{
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <div style={{
      color: '#AAAAAA',
      marginBottom: '4px',
      fontFamily: 'monospace',
      fontSize: '12px'
    }}>
        fullWidth — bar fills container, label stays adjacent
      </div>
      <Progress value={73} fullWidth showLabel />
      <Progress value={45} fullWidth showLabel variant="success" />
      <Progress value={25} fullWidth showLabel variant="error" glow />
    </div>
}`,...(fe=(ye=b.parameters)==null?void 0:ye.docs)==null?void 0:fe.source}}};var we,Se,Le;y.parameters={...y.parameters,docs:{...(we=y.parameters)==null?void 0:we.docs,source:{originalSource:`{
  name: 'Full Width vs Default',
  render: () => <div style={{
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <div>
        <div style={{
        color: '#AAAAAA',
        marginBottom: '4px',
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>
          default (inline, sized by blocks)
        </div>
        <Progress value={60} showLabel />
      </div>
      <div>
        <div style={{
        color: '#AAAAAA',
        marginBottom: '4px',
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>
          fullWidth (fills container, label adjacent)
        </div>
        <Progress value={60} fullWidth showLabel />
      </div>
    </div>
}`,...(Le=(Se=y.parameters)==null?void 0:Se.docs)==null?void 0:Le.source}}};var je,ke,Pe;f.parameters={...f.parameters,docs:{...(je=f.parameters)==null?void 0:je.docs,source:{originalSource:`{
  name: 'DOS Showcase',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    fontFamily: 'monospace'
  }}>
      <div style={{
      color: '#AAAAAA',
      fontSize: '14px'
    }}>PKZIP style</div>
      <Progress value={73} trackStyle="bordered" showLabel />

      <div style={{
      color: '#AAAAAA',
      fontSize: '14px',
      marginTop: '8px'
    }}>Norton Commander style</div>
      <Progress value={45} trackStyle="block" showLabel glow />

      <div style={{
      color: '#AAAAAA',
      fontSize: '14px',
      marginTop: '8px'
    }}>Defrag gradient</div>
      <Progress value={62} trackStyle="gradient" blocks={40} showLabel />

      <div style={{
      color: '#AAAAAA',
      fontSize: '14px',
      marginTop: '8px'
    }}>Scanning...</div>
      <Progress indeterminate showLabel />
    </div>
}`,...(Pe=(ke=f.parameters)==null?void 0:ke.docs)==null?void 0:Pe.source}}};const Te=["Default","WithLabel","Success","Warning","Error","AllVariants","AllSizes","TrackStyleBlock","TrackStyleBordered","TrackStyleGradient","AllTrackStyles","Glow","GlowVariants","Indeterminate","IndeterminateWithLabel","CustomBlocks","ProgressStates","FullWidth","FullWidthComparison","DOSShowcase"];export{i as AllSizes,m as AllTrackStyles,n as AllVariants,A as CustomBlocks,f as DOSShowcase,a as Default,t as Error,b as FullWidth,y as FullWidthComparison,p as Glow,v as GlowVariants,x as Indeterminate,g as IndeterminateWithLabel,h as ProgressStates,o as Success,c as TrackStyleBlock,d as TrackStyleBordered,u as TrackStyleGradient,l as Warning,s as WithLabel,Te as __namedExportsOrder,We as default};
