import{i as e}from"./preload-helper-Cs4UwXAW.js";import{z as t}from"./iframe-BZiwcFj0.js";import{t as n}from"./jsx-runtime-C2T8EUXA.js";import{n as r,t as i}from"./registry-BqccLuet.js";import{n as a,t as o}from"./Progress-DSfd0atb.js";var s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k;e((()=>{t(),a(),r(),s=n(),c={title:`Components/Progress`,component:o,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:i.Progress},tags:[`autodocs`],argTypes:{value:{control:{type:`range`,min:0,max:100,step:5}},variant:{control:`select`,options:[`default`,`success`,`warning`,`error`]},size:{control:`select`,options:[`sm`,`md`,`lg`]},trackStyle:{control:`select`,options:[`block`,`bordered`,`gradient`]},blocks:{control:{type:`range`,min:3,max:80,step:1}},showLabel:{control:`boolean`},glow:{control:`boolean`},indeterminate:{control:`boolean`}}},l={args:{value:50}},u={args:{value:75,showLabel:!0}},d={args:{value:100,variant:`success`,showLabel:!0}},f={args:{value:60,variant:`warning`,showLabel:!0}},p={args:{value:25,variant:`error`,showLabel:!0}},m={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`},children:[(0,s.jsx)(o,{value:80,showLabel:!0}),(0,s.jsx)(o,{value:100,variant:`success`,showLabel:!0}),(0,s.jsx)(o,{value:60,variant:`warning`,showLabel:!0}),(0,s.jsx)(o,{value:25,variant:`error`,showLabel:!0})]})},h={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`},children:[(0,s.jsx)(o,{value:50,size:`sm`,showLabel:!0}),(0,s.jsx)(o,{value:50,size:`md`,showLabel:!0}),(0,s.jsx)(o,{value:50,size:`lg`,showLabel:!0})]})},g={name:`Track: Block (Default)`,args:{value:60,trackStyle:`block`,showLabel:!0}},_={name:`Track: Bordered`,args:{value:60,trackStyle:`bordered`,showLabel:!0}},v={name:`Track: Gradient`,args:{value:60,trackStyle:`gradient`,showLabel:!0}},y={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`#AAAAAA`,marginBottom:`4px`,fontFamily:`monospace`,fontSize:`12px`},children:`block (default)`}),(0,s.jsx)(o,{value:60,trackStyle:`block`,showLabel:!0})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`#AAAAAA`,marginBottom:`4px`,fontFamily:`monospace`,fontSize:`12px`},children:`bordered`}),(0,s.jsx)(o,{value:60,trackStyle:`bordered`,showLabel:!0})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`#AAAAAA`,marginBottom:`4px`,fontFamily:`monospace`,fontSize:`12px`},children:`gradient`}),(0,s.jsx)(o,{value:60,trackStyle:`gradient`,showLabel:!0})]})]})},b={args:{value:70,glow:!0,showLabel:!0}},x={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`},children:[(0,s.jsx)(o,{value:80,glow:!0,showLabel:!0}),(0,s.jsx)(o,{value:100,variant:`success`,glow:!0,showLabel:!0}),(0,s.jsx)(o,{value:60,variant:`warning`,glow:!0,showLabel:!0}),(0,s.jsx)(o,{value:25,variant:`error`,glow:!0,showLabel:!0})]})},S={args:{indeterminate:!0}},C={args:{indeterminate:!0,showLabel:!0}},w={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`#AAAAAA`,marginBottom:`4px`,fontFamily:`monospace`,fontSize:`12px`},children:`10 blocks`}),(0,s.jsx)(o,{value:50,blocks:10,showLabel:!0})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`#AAAAAA`,marginBottom:`4px`,fontFamily:`monospace`,fontSize:`12px`},children:`20 blocks (default)`}),(0,s.jsx)(o,{value:50,blocks:20,showLabel:!0})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`#AAAAAA`,marginBottom:`4px`,fontFamily:`monospace`,fontSize:`12px`},children:`40 blocks`}),(0,s.jsx)(o,{value:50,blocks:40,showLabel:!0})]})]})},T={name:`States: 0% → 100%`,render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,s.jsx)(o,{value:0,showLabel:!0}),(0,s.jsx)(o,{value:25,showLabel:!0}),(0,s.jsx)(o,{value:50,showLabel:!0}),(0,s.jsx)(o,{value:75,showLabel:!0}),(0,s.jsx)(o,{value:100,showLabel:!0})]})},E={name:`Full Width`,render:()=>(0,s.jsxs)(`div`,{style:{width:`400px`,display:`flex`,flexDirection:`column`,gap:`12px`},children:[(0,s.jsx)(`div`,{style:{color:`#AAAAAA`,marginBottom:`4px`,fontFamily:`monospace`,fontSize:`12px`},children:`fullWidth — bar fills container, label stays adjacent`}),(0,s.jsx)(o,{value:73,fullWidth:!0,showLabel:!0}),(0,s.jsx)(o,{value:45,fullWidth:!0,showLabel:!0,variant:`success`}),(0,s.jsx)(o,{value:25,fullWidth:!0,showLabel:!0,variant:`error`,glow:!0})]})},D={name:`Full Width vs Default`,render:()=>(0,s.jsxs)(`div`,{style:{width:`500px`,display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`#AAAAAA`,marginBottom:`4px`,fontFamily:`monospace`,fontSize:`12px`},children:`default (inline, sized by blocks)`}),(0,s.jsx)(o,{value:60,showLabel:!0})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`#AAAAAA`,marginBottom:`4px`,fontFamily:`monospace`,fontSize:`12px`},children:`fullWidth (fills container, label adjacent)`}),(0,s.jsx)(o,{value:60,fullWidth:!0,showLabel:!0})]})]})},O={name:`DOS Showcase`,render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,fontFamily:`monospace`},children:[(0,s.jsx)(`div`,{style:{color:`#AAAAAA`,fontSize:`14px`},children:`PKZIP style`}),(0,s.jsx)(o,{value:73,trackStyle:`bordered`,showLabel:!0}),(0,s.jsx)(`div`,{style:{color:`#AAAAAA`,fontSize:`14px`,marginTop:`8px`},children:`Norton Commander style`}),(0,s.jsx)(o,{value:45,trackStyle:`block`,showLabel:!0,glow:!0}),(0,s.jsx)(`div`,{style:{color:`#AAAAAA`,fontSize:`14px`,marginTop:`8px`},children:`Defrag gradient`}),(0,s.jsx)(o,{value:62,trackStyle:`gradient`,blocks:40,showLabel:!0}),(0,s.jsx)(`div`,{style:{color:`#AAAAAA`,fontSize:`14px`,marginTop:`8px`},children:`Scanning...`}),(0,s.jsx)(o,{indeterminate:!0,showLabel:!0})]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    value: 50
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    value: 75,
    showLabel: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    value: 100,
    variant: 'success',
    showLabel: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    value: 60,
    variant: 'warning',
    showLabel: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: 25,
    variant: 'error',
    showLabel: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <Progress value={50} size="sm" showLabel />
      <Progress value={50} size="md" showLabel />
      <Progress value={50} size="lg" showLabel />
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Track: Block (Default)',
  args: {
    value: 60,
    trackStyle: 'block',
    showLabel: true
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Track: Bordered',
  args: {
    value: 60,
    trackStyle: 'bordered',
    showLabel: true
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Track: Gradient',
  args: {
    value: 60,
    trackStyle: 'gradient',
    showLabel: true
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    value: 70,
    glow: true,
    showLabel: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    indeterminate: true
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    indeterminate: true,
    showLabel: true
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k=[`Default`,`WithLabel`,`Success`,`Warning`,`Error`,`AllVariants`,`AllSizes`,`TrackStyleBlock`,`TrackStyleBordered`,`TrackStyleGradient`,`AllTrackStyles`,`Glow`,`GlowVariants`,`Indeterminate`,`IndeterminateWithLabel`,`CustomBlocks`,`ProgressStates`,`FullWidth`,`FullWidthComparison`,`DOSShowcase`]}))();export{h as AllSizes,y as AllTrackStyles,m as AllVariants,w as CustomBlocks,O as DOSShowcase,l as Default,p as Error,E as FullWidth,D as FullWidthComparison,b as Glow,x as GlowVariants,S as Indeterminate,C as IndeterminateWithLabel,T as ProgressStates,d as Success,g as TrackStyleBlock,_ as TrackStyleBordered,v as TrackStyleGradient,f as Warning,u as WithLabel,k as __namedExportsOrder,c as default};