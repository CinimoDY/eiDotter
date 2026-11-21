import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./cn-CHNjZLmO.js";import{n as o,t as s}from"./LogoGeometry-DiaFjKS6.js";function c(e,t,n={}){let{curvature:r=24,startRadius:i=0}=n;if(e.width===0||e.height===0)return[];let a=t.filter(e=>e.width!==0||e.height!==0);if(a.length===0)return[];let o=e.width/2,s=e.height/2,c=[];return a.forEach((t,n)=>{let a=t.x-e.x,l=t.y-e.y,d=a+t.width/2>=o?a:a+t.width,f=l+t.height/2,p=d-o,m=f-s,h=Math.hypot(p,m);if(h-i<1)return;let g=o+p/h*i,_=s+m/h*i,v=d-g,y=f-_,b=Math.hypot(v,y),x=(n%2==0?1:-1)*Math.min(r,b/3),S=(g+d)/2,C=(_+f)/2,w=S+-y/b*x,T=C+v/b*x;c.push(`M ${u(g)} ${u(_)} Q ${u(w)} ${u(T)} ${u(d)} ${u(f)}`)}),c}var l,u;function d(){return(d=t((()=>{l=9.25/22,u=e=>Math.round(e*100)/100})))()}var f,p,m,h;function g(){return(g=t((()=>{f=e(n(),1),i(),d(),o(),p=r(),m=[],h=(0,f.forwardRef)(({size:e=48,label:t=`eiDotter`,morph:n=!0,glow:r=!0,arms:i,className:o,style:u,...d},h)=>{let g=(0,f.useRef)(null),[_,v]=(0,f.useState)(m),y=(0,f.useCallback)(e=>{g.current=e,typeof h==`function`?h(e):h&&(h.current=e)},[h]);return(0,f.useEffect)(()=>{if(!i){v(m);return}let e=g.current,t=i.scopeRef.current;if(!e)return;let n=[],r=()=>{let t=e.getBoundingClientRect(),r=c(t,n.map(e=>e.getBoundingClientRect()),{startRadius:t.width*l});v(e=>e.length===r.length&&e.every((e,t)=>e===r[t])?e:r)},a=()=>i.targetRefs?i.targetRefs.map(e=>e.current).filter(e=>!!e):t?Array.from(t.querySelectorAll(i.targetSelector??`.eidotter-header__category`)):[],o=typeof ResizeObserver<`u`?new ResizeObserver(r):void 0,s=()=>{o?.disconnect(),n=a(),o?.observe(e),t&&o?.observe(t),n.forEach(e=>o?.observe(e)),r()};s();let u=t&&typeof MutationObserver<`u`?new MutationObserver(s):void 0;return t&&u?.observe(t,{childList:!0,subtree:!0}),window.addEventListener(`resize`,r),()=>{o?.disconnect(),u?.disconnect(),window.removeEventListener(`resize`,r)}},[i?.scopeRef,i?.targetSelector,i?.refreshKey,i?.targetRefs?.length,+!!i]),(0,p.jsxs)(`div`,{ref:y,role:t?`img`:void 0,"aria-label":t||void 0,"aria-hidden":!t||void 0,className:a(`eidotter-mark relative inline-block`,n&&`eidotter-mark--breath`,r&&`eidotter-mark--glow`,o),style:{width:e,height:e,...u},...d,children:[i&&(0,p.jsx)(`svg`,{className:`eidotter-mark__arms pointer-events-none absolute inset-0 h-full w-full overflow-visible text-dos-text-accent`,"aria-hidden":`true`,focusable:`false`,children:_.map((e,t)=>(0,p.jsx)(`path`,{d:e,fill:`none`,stroke:`currentColor`,strokeWidth:2},t))}),(0,p.jsx)(s,{size:`100%`,title:``,focusable:`false`,className:`eidotter-mark__logo relative block h-full w-full`})]})}),h.displayName=`Mark`,h.__docgenInfo={description:`eiDotter Mark: the Logo's egg-yolk drawing (pixel ring + lit yolk, shared
via the internal \`LogoGeometry\`, DMNC-1586) with a slow breath animation and
an optional set of SVG arm connectors drawn from the mark to a variable set
of nav badges, measured at runtime via getBoundingClientRect(). Arms redraw
on resize and on badge-set change, never intercept pointer events, and are
aria-hidden.

The root class \`eidotter-mark\` is a stable contract — the future tentacle
mode discovers the anchor via \`scope.querySelector('.eidotter-mark')\`; never
rename it.

There is NO rAF work in this design, so no \`prefersReducedMotion()\` call is
needed. Any FUTURE rAF animation (e.g. arm draw-in) MUST gate on
\`prefersReducedMotion()\` (src/utils/prefersReducedMotion.ts) plus a CSS media
block.`,methods:[],displayName:`Mark`,props:{size:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:`Size in px (or CSS length). Default 48.`,defaultValue:{value:`48`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`Accessible label. Default 'eiDotter'. Empty string → decorative (aria-hidden).`,defaultValue:{value:`'eiDotter'`,computed:!1}},morph:{required:!1,tsType:{name:`boolean`},description:`Enable the breath animation (scale 1 to 1.045 with a glow swell, ~4.3s
loop; off under prefers-reduced-motion). Default true. The name is kept
from the retired border-radius morph (DMNC-1586): \`morph\` now means breath.`,defaultValue:{value:`true`,computed:!1}},glow:{required:!1,tsType:{name:`boolean`},description:`Amber phosphor drop-shadow glow (5px, same as Logo). Default true.`,defaultValue:{value:`true`,computed:!1}},arms:{required:!1,tsType:{name:`MarkArmsConfig`},description:`Arm-connector configuration. Omit to render the mark alone.

Caveats:
- Any \`overflow: hidden\` / \`clip\` ancestor between the Mark and the badges
  amputates the arms (paths extend beyond the Mark's own box).
- Pure position changes with no size change anywhere are covered by
  window-resize + the scope ResizeObserver in practice; use \`refreshKey\` as
  the escape hatch if a layout shift is missed.
- \`arms\` is for the conventional badge ROW only — it is mutually exclusive
  with the future Header \`layout="tentacle"\` mode (PLAN-tentacle-menu),
  which draws its own overlay: transforms fire neither ResizeObserver nor a
  childList MutationObserver, so \`arms\` can never track transformed tips.`}},composes:[`Omit`]}})))()}export{g as n,h as t};