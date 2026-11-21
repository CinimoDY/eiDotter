import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{r,t as i}from"./registry-EhIcK3QA.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./cn-CHNjZLmO.js";import{n as c}from"./prefersReducedMotion-Bo85Vmtk.js";import{n as l,t as u}from"./ProgressRing-Drevhwi5.js";var d,f,p,m,h,g;function _(){return(_=t((()=>{d=e(n(),1),o(),l(),f=a(),p=e=>e*e,m=.02,h=120,g=(0,d.forwardRef)(({onHold:e,onTap:t,onHoldProgress:n,holdDuration:r=700,ringColor:i,ringScale:a=.72,disabled:o=!1,"aria-label":l,className:g,children:_},v)=>{let[y,b]=(0,d.useState)(0),[x,S]=(0,d.useState)(0),C=(0,d.useRef)(null),w=(0,d.useRef)(null),T=(0,d.useRef)(0),E=(0,d.useRef)(0),D=(0,d.useRef)(0),O=(0,d.useRef)(0),k=(0,d.useRef)(r),A=(0,d.useRef)(!1),j=(0,d.useRef)(e),M=(0,d.useRef)(n);j.current=e,M.current=n;let N=(0,d.useCallback)(e=>{T.current=e,b(e),M.current?.(e)},[]),P=(0,d.useCallback)(()=>{w.current!=null&&(cancelAnimationFrame(w.current),w.current=null)},[]),F=(0,d.useCallback)(e=>{let t=e-O.current,n=k.current,r=n<=0?1:Math.min(1,t/n),i=D.current===1?p(r):r,a=E.current+(D.current-E.current)*i;N(a),r>=1?(w.current=null,D.current===1&&(A.current=!0,N(0),j.current())):w.current=requestAnimationFrame(F)},[N]),I=(0,d.useCallback)((e,t)=>{P(),E.current=T.current,D.current=e,k.current=t,O.current=typeof performance<`u`?performance.now():0,w.current=requestAnimationFrame(F)},[P,F]),L=(0,d.useCallback)(e=>{if(!o){try{e.currentTarget.setPointerCapture?.(e.pointerId)}catch{}A.current=!1,N(0),I(1,r)}},[o,r,I,N]),R=(0,d.useCallback)(()=>{A.current||(T.current<=0?P():c()?(P(),N(0)):I(0,h))},[I,P,N]),z=(0,d.useCallback)(()=>{o||(A.current||t?.(),A.current=!1)},[o,t]),B=(0,d.useCallback)(t=>{o||t.repeat||(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e())},[o,e]);(0,d.useEffect)(()=>{let e=C.current;if(!e)return;let t=()=>S(Math.min(e.clientWidth,e.clientHeight));if(t(),typeof ResizeObserver<`u`){let n=new ResizeObserver(t);return n.observe(e),()=>n.disconnect()}},[]),(0,d.useEffect)(()=>P,[P]);let V=(0,d.useCallback)(e=>{C.current=e,typeof v==`function`?v(e):v&&(v.current=e)},[v]),H=y>m&&x>0;return(0,f.jsxs)(`div`,{ref:V,className:s(`eidotter-hold`,o&&`eidotter-hold--disabled`,g),role:`button`,tabIndex:o?-1:0,"aria-label":l,"aria-disabled":o||void 0,onPointerDown:L,onPointerUp:R,onPointerCancel:R,onClick:z,onKeyDown:B,children:[_,H&&(0,f.jsx)(`div`,{className:`eidotter-hold__overlay`,children:(0,f.jsx)(u,{value:y*100,size:Math.floor(x*a),color:i,"aria-label":`Hold progress`})})]})}),g.displayName=`HoldToComplete`,g.__docgenInfo={description:`Press-and-hold to complete, with a chunky {@link ProgressRing} filling during
the hold and reversing on an early release. Works with mouse, touch, and pen
via Pointer Events; keyboard users complete directly with Enter or Space.
Ported from a private habit app's hold-to-complete tile (DMNC-1040).`,methods:[],displayName:`HoldToComplete`,props:{onHold:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Fired when the hold reaches completion — the primary action.`},onTap:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Fired on a plain click/tap that did not complete a hold (e.g. open details).`},onHoldProgress:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(progress: number) => void`,signature:{arguments:[{type:{name:`number`},name:`progress`}],return:{name:`void`}}},description:"Fired with progress `0..1` as the hold builds — hook for haptics or sound."},holdDuration:{required:!1,tsType:{name:`number`},description:`Milliseconds the user must hold to complete (default 700).`,defaultValue:{value:`700`,computed:!1}},ringColor:{required:!1,tsType:{name:`string`},description:`Ring colour. Defaults to the amber brand token.`},ringScale:{required:!1,tsType:{name:`number`},description:`Ring diameter as a fraction of the tile's smaller side (default 0.72).`,defaultValue:{value:`0.72`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:`Disable the interaction.`,defaultValue:{value:`false`,computed:!1}},"aria-label":{required:!1,tsType:{name:`string`},description:`Accessible label for the control.`},className:{required:!1,tsType:{name:`string`},description:`Additional CSS class name.`},children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`The tile content.`}}}})))()}var v,y,b,x,S,C,w,T,E;function D(){return(D=t((()=>{v=e(n(),1),_(),r(),y=a(),b={title:`Components/HoldToComplete`,component:g,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:i.HoldToComplete},tags:[`autodocs`],argTypes:{holdDuration:{control:{type:`range`,min:200,max:2e3,step:100}},ringColor:{control:`color`},ringScale:{control:{type:`range`,min:.3,max:1,step:.02}},disabled:{control:`boolean`},onHold:{action:`held`},onTap:{action:`tapped`}}},x={width:160,height:160,display:`flex`,alignItems:`center`,justifyContent:`center`,border:`2px solid var(--color-semantic-border-default)`,color:`var(--color-semantic-text-brand)`,fontFamily:`'Perfect DOS VGA 437', monospace`,fontSize:20,textAlign:`center`},S={args:{"aria-label":`Hold to complete habit`},render:e=>(0,y.jsx)(()=>{let[t,n]=(0,v.useState)(!1);return(0,y.jsx)(g,{...e,onHold:()=>n(e=>!e),onTap:()=>{},children:(0,y.jsx)(`div`,{style:x,children:t?`█ DONE`:`HOLD
TO DO`})})},{})},C={args:{holdDuration:350,"aria-label":`Hold to complete`},render:S.render},w={args:{ringColor:`#55FF55`,"aria-label":`Hold to complete`},render:S.render},T={args:{disabled:!0,"aria-label":`Completed`},render:e=>(0,y.jsx)(g,{...e,onHold:()=>void 0,children:(0,y.jsx)(`div`,{style:{...x,opacity:.5},children:`LOCKED`})})},E=[`Default`,`FastHold`,`CustomRingColor`,`Disabled`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Hold to complete habit'
  },
  render: args => {
    const Demo = () => {
      const [done, setDone] = useState(false);
      return <HoldToComplete {...args} onHold={() => setDone(d => !d)} onTap={() => {
        /* open details — noop in demo */
      }}>
          <div style={tileStyle}>{done ? '█ DONE' : 'HOLD\\nTO DO'}</div>
        </HoldToComplete>;
    };
    return <Demo />;
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    holdDuration: 350,
    'aria-label': 'Hold to complete'
  },
  render: Default.render
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    ringColor: '#55FF55',
    'aria-label': 'Hold to complete'
  },
  render: Default.render
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    'aria-label': 'Completed'
  },
  render: args => <HoldToComplete {...args} onHold={() => undefined}>
      <div style={{
      ...tileStyle,
      opacity: 0.5
    }}>LOCKED</div>
    </HoldToComplete>
}`,...T.parameters?.docs?.source}}}})))()}D();export{w as CustomRingColor,S as Default,T as Disabled,C as FastHold,E as __namedExportsOrder,b as default};