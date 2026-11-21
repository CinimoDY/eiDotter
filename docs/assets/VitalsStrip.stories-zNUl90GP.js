import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{r as n,t as r}from"./registry-EhIcK3QA.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{c as a,n as o,s,t as c}from"./health-Cu9HTD8r.js";import{n as l,t as u}from"./VitalsStrip-BvmX_EfR.js";var d,f,p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{t(),l(),n(),a(),d=i(),f={title:`Components/VitalsStrip`,component:u,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:r.VitalsStrip,docs:{description:{component:c}}},tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},locale:{control:`text`}},decorators:[(e,{parameters:t})=>t.phone?(0,d.jsx)(`div`,{style:{width:`100%`,padding:16,boxSizing:`border-box`},children:(0,d.jsx)(e,{})}):(0,d.jsx)(`div`,{style:{width:480},children:(0,d.jsx)(e,{})})]},p=[{id:`a`,label:`Sample A`,value:s.current,unit:`units`,secondary:`sample time`},{id:`b`,label:`Sample pair`,value:null,pair:[124,78],unit:`units`,tone:`info`},{id:`c`,label:`Sample C`,value:38,unit:s.unit,bands:o},{id:`d`,label:`Sample D`,value:90,unit:`units`,tone:`success`},{id:`e`,label:`Sample E`,value:12,unit:s.unit,bands:o}],m={args:{tiles:p}},h={args:{tiles:[p[0],{id:`x`,label:`Sample offline`,value:null,status:`empty`}]}},g={args:{tiles:[{...p[0],status:`stale`},p[3]]}},_={args:{tiles:[{...p[0],status:`loading`},p[3]]}},v={args:{tiles:[{...p[0],tone:`critical`},p[3]]}},y={args:{locale:`de`,labels:{offline:`getrennt`,stale:`veraltet`},tiles:[{id:`a`,label:`Probe`,value:1.5,unit:`units`},{id:`b`,label:`Probe offline`,value:null},{id:`c`,label:`Probe alt`,value:4.2,unit:`units`,status:`stale`}]}},b={args:{tiles:p},decorators:[e=>(0,d.jsx)(`div`,{style:{width:320},children:(0,d.jsx)(e,{})})]},x={args:{tiles:p.slice(0,3)},render:e=>(0,d.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[`sm`,`md`,`lg`].map(t=>(0,d.jsx)(u,{...e,size:t},t))})},S={args:{tiles:[...p,{id:`f`,label:`Sample offline`,value:null,status:`empty`},{id:`g`,label:`Sample unknown`,value:NaN,unit:`units`}]},parameters:{phone:!0,layout:`fullscreen`,viewport:{defaultViewport:`phone375`}}},C=[`Default`,`Offline`,`Stale`,`Loading`,`Critical`,`German`,`Narrow`,`Sizes`,`Phone375`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    tiles
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    tiles: [tiles[0], {
      id: 'x',
      label: 'Sample offline',
      value: null,
      status: 'empty'
    }]
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    tiles: [{
      ...tiles[0],
      status: 'stale'
    }, tiles[3]]
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    tiles: [{
      ...tiles[0],
      status: 'loading'
    }, tiles[3]]
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    tiles: [{
      ...tiles[0],
      tone: 'critical'
    }, tiles[3]]
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    locale: 'de',
    labels: {
      offline: 'getrennt',
      stale: 'veraltet'
    },
    tiles: [{
      id: 'a',
      label: 'Probe',
      value: 1.5,
      unit: 'units'
    }, {
      id: 'b',
      label: 'Probe offline',
      value: null
    }, {
      id: 'c',
      label: 'Probe alt',
      value: 4.2,
      unit: 'units',
      status: 'stale'
    }]
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    tiles
  },
  decorators: [Story => <div style={{
    width: 320
  }}>
        <Story />
      </div>]
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    tiles: tiles.slice(0, 3)
  },
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }}>
      {(['sm', 'md', 'lg'] as const).map(s => <VitalsStrip key={s} {...args} size={s} />)}
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    tiles: [...tiles, {
      id: 'f',
      label: 'Sample offline',
      value: null,
      status: 'empty'
    }, {
      id: 'g',
      label: 'Sample unknown',
      value: NaN,
      unit: 'units'
    }]
  },
  parameters: {
    phone: true,
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'phone375'
    }
  }
}`,...S.parameters?.docs?.source},description:{story:`DMNC-1573: at phone width tiles step to two columns and the value one size
down; long readings never widen a tile, and state words use body size.
FIXTURE ONLY, illustrative.`,...S.parameters?.docs?.description}}}})))()}w();export{v as Critical,m as Default,y as German,_ as Loading,b as Narrow,h as Offline,S as Phone375,x as Sizes,g as Stale,C as __namedExportsOrder,f as default};