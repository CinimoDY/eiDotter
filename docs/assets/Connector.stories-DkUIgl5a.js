import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Mark-DEnYLl8u.js";import{n as o,t as s}from"./Connector-hEojQWqS.js";function c(e,t){return{color:t,display:`inline-flex`,alignItems:`center`,gap:7,border:`1px solid currentColor`,padding:`5px 11px`,fontSize:12,letterSpacing:`0.14em`,textTransform:`uppercase`,fontFamily:`monospace`,whiteSpace:`nowrap`}}function l({sway:e=!0,weight:t=`delicate`,colored:n=!0}){let r=(0,u.useRef)(null),i=[(0,u.useRef)(null),(0,u.useRef)(null),(0,u.useRef)(null),(0,u.useRef)(null)];return(0,d.jsxs)(`div`,{style:{position:`relative`,display:`flex`,alignItems:`center`,gap:140,padding:56,minHeight:360,background:`#000`},children:[(0,d.jsx)(a,{ref:r,size:40}),(0,d.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:30},children:p.map((e,t)=>(0,d.jsxs)(`span`,{ref:i[t],style:c(e.label,n?e.color:`#FFB000`),children:[(0,d.jsx)(`span`,{style:{width:7,height:7,borderRadius:`50%`,background:`currentColor`}}),e.label]},e.label))}),(0,d.jsx)(s,{sourceRef:r,targets:i.map((e,t)=>({ref:e,color:n?p[t].color:void 0})),sway:e,weight:t})]})}var u,d,f,p,m,h,g,_,v;function y(){return(y=t((()=>{u=e(n(),1),o(),i(),d=r(),f={title:`Components/Connector`,component:s,parameters:{layout:`fullscreen`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]}}},p=[{label:`work`,color:`#FFB000`},{label:`ideas`,color:`#55FFFF`},{label:`life`,color:`#55FF55`},{label:`log`,color:`#FF55FF`}],m={render:()=>(0,d.jsx)(l,{}),parameters:{docs:{description:{story:`The Mark branches amber→category tapered ribbons to nav tags, born amber at the yolk and gaining each category colour as it arrives — stopping exactly at the tag edge. Gently sways.`}}}},h={render:()=>(0,d.jsx)(l,{sway:!1}),parameters:{docs:{description:{story:`Sway disabled — the same ribbons held still (also the reduced-motion rendering).`}}}},g={render:()=>(0,d.jsx)(l,{weight:`medium`}),parameters:{docs:{description:{story:"The bolder `medium` weight, for large surfaces where the delicate thread reads too thin."}}}},_={render:()=>(0,d.jsx)(l,{colored:!1}),parameters:{docs:{description:{story:`Solid-amber ribbons (no per-target colour) — the information/blog-spine treatment.`}}}},v=[`NavFan`,`Static`,`Medium`,`AmberOnly`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <FanDemo />,
  parameters: {
    docs: {
      description: {
        story: 'The Mark branches amber→category tapered ribbons to nav tags, born amber at the yolk and ' + 'gaining each category colour as it arrives — stopping exactly at the tag edge. Gently sways.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <FanDemo sway={false} />,
  parameters: {
    docs: {
      description: {
        story: 'Sway disabled — the same ribbons held still (also the reduced-motion rendering).'
      }
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <FanDemo weight="medium" />,
  parameters: {
    docs: {
      description: {
        story: 'The bolder \`medium\` weight, for large surfaces where the delicate thread reads too thin.'
      }
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <FanDemo colored={false} />,
  parameters: {
    docs: {
      description: {
        story: 'Solid-amber ribbons (no per-target colour) — the information/blog-spine treatment.'
      }
    }
  }
}`,..._.parameters?.docs?.source}}}})))()}y();export{_ as AmberOnly,g as Medium,m as NavFan,h as Static,v as __namedExportsOrder,f as default};