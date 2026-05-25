import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";import{m as o,t as s}from"./exports-BpCMfcBQ.js";import{n as c,t as l}from"./registry-BqccLuet.js";import{n as u,t as d}from"./Badge-CNVMUUWt.js";import{n as f,t as ee}from"./Breadcrumb-0T11SU9K.js";import{n as p,t as m}from"./Button-e4Q1UI6E.js";import{n as h,t as g}from"./Lightbox-BKt8Bg8m.js";import{i as _,n as v,r as te,t as ne}from"./TagGroup-53tAzqpR.js";import{n as y,t as b}from"./TimelineNode-BNYRnL-I.js";var x,re=e((()=>{x=[`year`,`month`,`day`,`hour`]}));function ie({zoomLevel:e,defaultZoomLevel:t=`month`,onZoomChange:n}={}){let r=e===void 0,[i,a]=(0,S.useState)(t),[o,s]=(0,S.useState)([]),c=(0,S.useRef)(r);(0,S.useEffect)(()=>{c.current&&!r&&s([]),c.current=r},[r]);let l=e??i,u=x.indexOf(l),d=u<x.length-1,f=u>0,ee=o.length>0?o[o.length-1].periodStart:null,p=(0,S.useRef)(r),m=(0,S.useRef)(d),h=(0,S.useRef)(u),g=(0,S.useRef)(o),_=(0,S.useRef)(n);(0,S.useEffect)(()=>{p.current=r,m.current=d,h.current=u,g.current=o,_.current=n});let v=(0,S.useCallback)(e=>{p.current&&a(e),_.current?.(e)},[]);return{zoomLevel:l,canZoomIn:d,canZoomOut:f,breadcrumbs:o,currentPeriod:ee,isDrillDownEnabled:r,drillDown:(0,S.useCallback)((e,t)=>{if(!p.current||!m.current)return;let n=x[h.current+1];n!==void 0&&(s(n=>[...n,{periodStart:e,label:t}]),v(n))},[v]),drillUp:(0,S.useCallback)(()=>{if(!p.current||g.current.length===0)return;let e=x[h.current-1];e!==void 0&&(s(e=>e.slice(0,-1)),v(e))},[v]),reset:(0,S.useCallback)(()=>{p.current&&(s([]),v(`year`))},[v])}}var S,C=e((()=>{S=t(n(),1),re()}));function ae({selectedEntryId:e,defaultSelectedEntryId:t=null,onSelectEntry:n}={}){let[r,i]=(0,w.useState)(t),a=e!==void 0,o=e===void 0?r:e,s=(0,w.useRef)(o),c=(0,w.useRef)(a),l=(0,w.useRef)(n);(0,w.useEffect)(()=>{s.current=o,c.current=a,l.current=n});let u=(0,w.useCallback)(e=>{c.current||i(e),l.current?.(e)},[]);return{selectedEntryId:o,select:(0,w.useCallback)(e=>{u(e)},[u]),deselect:(0,w.useCallback)(()=>{u(null)},[u]),toggle:(0,w.useCallback)(e=>{c.current?l.current?.(s.current===e?null:e):i(t=>{let n=t===e?null:e;return l.current?.(n),n})},[])}}var w,oe=e((()=>{w=t(n(),1)}));function T(e){return new Date(e).getUTCFullYear()}function E(e){return new Date(e).getUTCMonth()}function se(e){return new Date(e).getUTCDate()}function ce(e){return new Date(e).getUTCHours()}function le(e){return String(e)}function ue(e,t){return`${Ee[t]} ${e}`}function de(e,t,n){return`${De[t]} ${n}`}function fe(e,t,n,r){let i=r>=12?`pm`:`am`,a=r===0?12:r>12?r-12:r;return`${De[t]} ${n}, ${a}${i}`}function pe(e){let t=new Date(e),n=De[t.getUTCMonth()],r=t.getUTCDate(),i=t.getUTCFullYear(),a=t.getUTCHours(),o=t.getUTCMinutes(),s=a>=12?`pm`:`am`;return`${n} ${r}, ${i} at ${a===0?12:a>12?a-12:a}${o>0?`:${String(o).padStart(2,`0`)}`:``}${s}`}function me(e){return new Date(Date.UTC(e,0,1)).toISOString()}function he(e,t){return new Date(Date.UTC(e,t,1)).toISOString()}function D(e,t,n){return new Date(Date.UTC(e,t,n)).toISOString()}function O(e,t,n,r){return new Date(Date.UTC(e,t,n,r)).toISOString()}function k(e,t,n,r,i){let a=new Map,o=[];for(let n of e){let e=t(n),r=a.get(e);r?r.push(n):(a.set(e,[n]),o.push(e))}o.sort((e,t)=>i===`asc`?e.localeCompare(t):t.localeCompare(e));for(let[,e]of a)e.sort((e,t)=>{let n=e.date.localeCompare(t.date);return i===`asc`?n:-n});return o.map(e=>({label:n(e),periodStart:r(e),entries:a.get(e)??[]}))}function ge(e){return String(T(e.date))}function _e(e){let t=T(e.date),n=E(e.date);return`${t}-${String(n).padStart(2,`0`)}`}function ve(e){let t=T(e.date),n=E(e.date),r=se(e.date);return`${t}-${String(n).padStart(2,`0`)}-${String(r).padStart(2,`0`)}`}function ye(e){let t=T(e.date),n=E(e.date),r=se(e.date),i=ce(e.date);return`${t}-${String(n).padStart(2,`0`)}-${String(r).padStart(2,`0`)}-${String(i).padStart(2,`0`)}`}function be(e){return{year:parseInt(e)}}function xe(e){let[t,n]=e.split(`-`);return{year:parseInt(t),month:parseInt(n)}}function Se(e){let[t,n,r]=e.split(`-`);return{year:parseInt(t),month:parseInt(n),day:parseInt(r)}}function Ce(e){let[t,n,r,i]=e.split(`-`);return{year:parseInt(t),month:parseInt(n),day:parseInt(r),hour:parseInt(i)}}function we(e,t,n){if(t===null||n===`hour`)return e;let r=Oe[n];if(r===void 0)return e;let i=t.slice(0,r);return e.filter(e=>e.periodStart.slice(0,r)===i)}function Te(e,t,n=`desc`){if(e.length===0)return[];let r=e.filter(e=>!isNaN(new Date(e.date).getTime()));if(r.length===0)return[];switch(t){case`year`:return k(r,ge,e=>{let{year:t}=be(e);return le(t)},e=>{let{year:t}=be(e);return me(t)},n);case`month`:return k(r,_e,e=>{let{year:t,month:n}=xe(e);return ue(t,n)},e=>{let{year:t,month:n}=xe(e);return he(t,n)},n);case`day`:return k(r,ve,e=>{let{year:t,month:n,day:r}=Se(e);return de(t,n,r)},e=>{let{year:t,month:n,day:r}=Se(e);return D(t,n,r)},n);case`hour`:return k(r,ye,e=>{let{year:t,month:n,day:r,hour:i}=Ce(e);return fe(t,n,r,i)},e=>{let{year:t,month:n,day:r,hour:i}=Ce(e);return O(t,n,r,i)},n)}}var Ee,De,Oe,ke=e((()=>{Ee=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],De=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],Oe={year:4,month:7,day:10}})),Ae=e((()=>{})),A,je,Me=e((()=>{n(),s(),p(),u(),f(),Ae(),A=r(),je=({zoomLevel:e,canZoomIn:t,canZoomOut:n,onZoomIn:r,onZoomOut:i,onReset:a,breadcrumbs:s=[],onBreadcrumbClick:c})=>{let l=s.length>0;return(0,A.jsxs)(`div`,{className:`timeline-zoom-controls`,role:`toolbar`,"aria-label":`Timeline zoom controls`,children:[(0,A.jsx)(m,{variant:`secondary`,size:`small`,onClick:i,disabled:!n,"aria-label":`Zoom out`,children:`[-]`}),l?(0,A.jsx)(ee,{trail:[{label:`ALL`,onClick:a},...s.slice(0,-1).map((e,t)=>({label:e.label,onClick:()=>c?.(t)}))],currentLabel:s[s.length-1].label,showBackArrow:!1,separator:`>`,className:`timeline-zoom-controls__breadcrumb`}):(0,A.jsx)(o,{className:`timeline-zoom-controls__level`,onPress:a,"aria-label":`Current zoom: ${e}. Click to reset.`,children:(0,A.jsx)(d,{variant:`accent`,size:`medium`,children:e.toUpperCase()})}),(0,A.jsx)(m,{variant:`secondary`,size:`small`,onClick:r,disabled:!t,"aria-label":`Zoom in`,children:`[+]`})]})},je.__docgenInfo={description:``,methods:[],displayName:`ZoomControls`,props:{zoomLevel:{required:!0,tsType:{name:`unknown[number]`,raw:`(typeof ZOOM_LEVELS)[number]`},description:``},canZoomIn:{required:!0,tsType:{name:`boolean`},description:``},canZoomOut:{required:!0,tsType:{name:`boolean`},description:``},onZoomIn:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onZoomOut:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onReset:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},breadcrumbs:{required:!1,tsType:{name:`unknown`},description:``,defaultValue:{value:`[]`,computed:!1}},onBreadcrumbClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(index: number) => void`,signature:{arguments:[{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``}}}})),Ne=e((()=>{})),Pe,j,Fe=e((()=>{n(),Ne(),Pe=r(),j=({children:e})=>(0,Pe.jsxs)(`div`,{className:`timeline-axis`,children:[(0,Pe.jsx)(`div`,{className:`timeline-axis__line`,"aria-hidden":`true`}),(0,Pe.jsx)(`div`,{className:`timeline-axis__content`,children:e})]}),j.__docgenInfo={description:`Vertical spine connecting timeline nodes.\r
Wraps content with a continuous vertical line on the left side.`,methods:[],displayName:`TimelineAxis`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}}})),Ie,M,Le,Re=e((()=>{Ie=t(n(),1),s(),y(),u(),M=r(),Le=Ie.memo(({buckets:e,onBucketClick:t})=>(0,M.jsx)(`div`,{className:`timeline-view timeline-view--year`,role:`list`,children:e.map(e=>(0,M.jsx)(`div`,{className:`timeline-view__bucket timeline-view__bucket--year`,role:`listitem`,children:t?(0,M.jsxs)(o,{className:`timeline-view__bucket-button`,onPress:()=>t(e),children:[(0,M.jsx)(`div`,{className:`timeline-view__node`,children:(0,M.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:e.label,labelPosition:`right`})}),(0,M.jsx)(`div`,{className:`timeline-view__content`,children:(0,M.jsxs)(d,{variant:`default`,size:`small`,children:[e.entries.length,` `,e.entries.length===1?`entry`:`entries`]})})]}):(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(`div`,{className:`timeline-view__node`,children:(0,M.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:e.label,labelPosition:`right`})}),(0,M.jsx)(`div`,{className:`timeline-view__content`,children:(0,M.jsxs)(d,{variant:`default`,size:`small`,children:[e.entries.length,` `,e.entries.length===1?`entry`:`entries`]})})]})},e.periodStart))})),Le.displayName=`YearView`,Le.__docgenInfo={description:`Year-level zoom view: shows year labels with entry counts per year.`,methods:[],displayName:`YearView`}})),ze=e((()=>{h()})),Be=e((()=>{ze()}));function Ve(e){if(typeof e!=`string`)return!1;let t=e.trim();return t.length===0?!1:/^[a-z][a-z0-9+\-.]*:/i.test(t)?He.test(t):!0}var He,Ue=e((()=>{He=/^(?:https?:|mailto:)/i})),We=e((()=>{})),Ge,N,Ke,qe=e((()=>{Ge=t(n(),1),s(),Be(),Ue(),We(),N=r(),Ke=({entry:e,isExpanded:t,onSelect:n})=>{let[r,i]=(0,Ge.useState)(!1),{image:a}=e,s=a.thumbnail||a.src,c=a.link&&Ve(a.link)?a.link:void 0;return(0,Ge.useEffect)(()=>{t||i(!1)},[t]),c?(0,N.jsxs)(`a`,{className:`eidotter-timeline-card-image eidotter-timeline-card-image--link`,href:c,rel:`noopener noreferrer`,children:[(0,N.jsx)(`p`,{className:`eidotter-timeline-card__title`,children:e.title}),(0,N.jsx)(`img`,{className:`eidotter-timeline-card-image__media`,src:s,alt:a.alt,width:a.width,height:a.height})]}):(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(o,{className:`eidotter-timeline-card__trigger`,onPress:()=>n?.(e.id),"aria-expanded":t,children:(0,N.jsx)(`p`,{className:`eidotter-timeline-card__title`,children:e.title})}),(0,N.jsx)(`div`,{className:`eidotter-timeline-card-image`,children:t?(0,N.jsx)(o,{className:`eidotter-timeline-card-image__media-button`,onPress:()=>i(!0),"aria-label":a.alt?`Open ${a.alt} in lightbox`:`Open image in lightbox`,children:(0,N.jsx)(`img`,{className:`eidotter-timeline-card-image__media eidotter-timeline-card-image__media--expanded`,src:a.src,alt:a.alt,width:a.width,height:a.height})}):(0,N.jsx)(`img`,{className:`eidotter-timeline-card-image__media eidotter-timeline-card-image__media--thumb`,src:s,alt:a.alt,width:a.width,height:a.height})}),(0,N.jsx)(g,{images:[a],isOpen:r,onClose:()=>i(!1)})]})},Ke.__docgenInfo={description:`Image variant of TimelineEntryCard.

Collapsed: title + thumbnail. Expanded: title + full-width image. Click on
the expanded image opens a Lightbox. If \`entry.image.link\` is set and uses
a safe scheme (http/https/mailto/relative), the thumbnail is wrapped in a
plain anchor and clicks navigate out — no expansion, no lightbox.`,methods:[],displayName:`TimelineEntryCardImage`,props:{entry:{required:!0,tsType:{name:`Extract`,elements:[{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
| (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
| (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`}]},{name:`signature`,type:`object`,raw:`{ kind: 'image' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'image'`,required:!0}}]}}],raw:`Extract<TimelineEntryData, { kind: 'image' }>`},description:``},isExpanded:{required:!0,tsType:{name:`boolean`},description:``},onSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``}}}})),Je=e((()=>{})),Ye,P,Xe,Ze,Qe=e((()=>{Ye=t(n(),1),s(),Be(),i(),Ue(),Je(),P=r(),Xe=({entry:e,isExpanded:t,onSelect:n})=>{let[r,i]=(0,Ye.useState)({phase:`grid`});if((0,Ye.useEffect)(()=>{t||i({phase:`grid`})},[t]),(0,Ye.useEffect)(()=>{i(t=>t.phase===`grid`?t:t.index>=e.images.length?{phase:`grid`}:t)},[e.images.length]),e.images.length===0)return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`p`,{className:`eidotter-timeline-card__title`,children:e.title}),(0,P.jsx)(`p`,{className:`eidotter-timeline-card-gallery__empty`,children:`No images.`})]});let a=(e,t)=>{t.link&&Ve(t.link)||i(t=>t.phase===`focused`&&t.index===e?{phase:`lightbox`,index:e}:{phase:`focused`,index:e})},s=r.phase===`focused`||r.phase===`lightbox`?r.index:null;return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(o,{className:`eidotter-timeline-card__trigger`,onPress:()=>n?.(e.id),"aria-expanded":t,children:(0,P.jsx)(`p`,{className:`eidotter-timeline-card__title`,children:e.title})}),(0,P.jsx)(`div`,{className:`eidotter-timeline-card-gallery__grid`,role:`list`,children:e.images.map((e,t)=>(0,P.jsx)(Ze,{image:e,isFocused:s===t,onClick:()=>a(t,e)},t))}),(0,P.jsx)(g,{images:e.images,isOpen:r.phase===`lightbox`,initialIndex:r.phase===`lightbox`?r.index:0,onClose:()=>{i(e=>e.phase===`lightbox`?{phase:`focused`,index:e.index}:e)},onIndexChange:e=>{i(t=>t.phase===`lightbox`?{phase:`lightbox`,index:e}:t)}})]})},Ze=({image:e,isFocused:t,onClick:n})=>{let r=e.thumbnail||e.src,i=e.link&&Ve(e.link)?e.link:void 0;return i?(0,P.jsx)(`div`,{role:`listitem`,className:`eidotter-timeline-card-gallery__cell eidotter-timeline-card-gallery__cell--link`,children:(0,P.jsx)(`a`,{className:`eidotter-timeline-card-gallery__link`,href:i,rel:`noopener noreferrer`,children:(0,P.jsx)(`img`,{className:`eidotter-timeline-card-gallery__img`,src:r,alt:e.alt,width:e.width,height:e.height})})}):(0,P.jsx)(`div`,{role:`listitem`,className:a(`eidotter-timeline-card-gallery__cell`,t&&`eidotter-timeline-card-gallery__cell--focused`),children:(0,P.jsx)(o,{className:`eidotter-timeline-card-gallery__button`,onPress:n,"aria-label":e.alt||`Image`,"aria-pressed":t,children:(0,P.jsx)(`img`,{className:`eidotter-timeline-card-gallery__img`,src:r,alt:e.alt,width:e.width,height:e.height})})})},Xe.__docgenInfo={description:`Gallery variant of TimelineEntryCard. iOS Photos two-stage interaction:
grid → focused (grow-in-place) → lightbox. Resets to grid on parent
collapse via useEffect on \`isExpanded\`.`,methods:[],displayName:`TimelineEntryCardGallery`,props:{entry:{required:!0,tsType:{name:`Extract`,elements:[{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
| (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
| (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`}]},{name:`signature`,type:`object`,raw:`{ kind: 'gallery' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'gallery'`,required:!0}}]}}],raw:`Extract<TimelineEntryData, { kind: 'gallery' }>`},description:``},isExpanded:{required:!0,tsType:{name:`boolean`},description:``},onSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``}}}})),$e=e((()=>{}));function et(e,t,n,r){switch(e.kind){case`text`:return(0,F.jsx)(rt,{entry:e,isExpanded:t,onSelect:n,children:r});case`image`:return(0,F.jsx)(Ke,{entry:e,isExpanded:t,onSelect:n});case`gallery`:return(0,F.jsx)(Xe,{entry:e,isExpanded:t,onSelect:n});default:return tt(e)}}function tt(e){throw Error(`TimelineEntryCard: unhandled entry kind: ${JSON.stringify(e)}`)}var nt,F,I,rt,it=e((()=>{nt=t(n(),1),s(),i(),qe(),Qe(),$e(),F=r(),I=nt.memo(({entry:e,isSelected:t,isExpanded:n=!1,onSelect:r,footer:i,children:o})=>(0,F.jsxs)(`div`,{className:a(`eidotter-timeline-card`,t&&`eidotter-timeline-card--selected`,n&&`eidotter-timeline-card--expanded`),children:[et(e,n,r,o),i&&(0,F.jsx)(`div`,{className:`eidotter-timeline-card__footer`,children:i})]})),I.displayName=`TimelineEntryCard`,rt=({entry:e,isExpanded:t,onSelect:n,children:r})=>{let i=typeof e.content==`string`,a=e.content!=null;return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(o,{className:`eidotter-timeline-card__trigger`,onPress:()=>n?.(e.id),"aria-expanded":t,children:[(0,F.jsxs)(`div`,{className:`eidotter-timeline-card__header`,children:[e.type&&(0,F.jsx)(`span`,{className:`eidotter-timeline-card__type`,children:e.type.toUpperCase()}),e.tags&&e.tags.length>0&&(0,F.jsx)(`span`,{className:`eidotter-timeline-card__tags`,children:e.tags.map(e=>`#${e}`).join(` `)})]}),(0,F.jsx)(`p`,{className:`eidotter-timeline-card__title`,children:e.title}),!t&&i&&(()=>{let t=String(e.content);return(0,F.jsxs)(`p`,{className:`eidotter-timeline-card__preview`,children:[t.slice(0,80),t.length>80?`...`:``]})})(),r]}),a&&(0,F.jsx)(`div`,{className:`eidotter-timeline-card__body`,children:(0,F.jsx)(`div`,{className:`eidotter-timeline-card__body-inner`,inert:t?void 0:!0,children:e.content})})]})},I.__docgenInfo={description:"Dispatcher for content-aware timeline entry rendering.\n\nBranches on `entry.kind`:\n - `text`    — existing trigger+panel rendering with `entry.content`.\n - `image`   — placeholder for now; filled in by Task 6.\n - `gallery` — placeholder for now; filled in by Tasks 7–8.\n\nThe card chrome (border, hover slide+glow, selected/expanded states)\nlives on the outer `.eidotter-timeline-card` element and applies to all\nkinds.",methods:[],displayName:`TimelineEntryCard`,props:{isExpanded:{defaultValue:{value:`false`,computed:!1},required:!1}}}})),at,L,ot,st=e((()=>{at=t(n(),1),y(),it(),L=r(),ot=at.memo(({buckets:e,selectedEntryId:t,onEntrySelect:n,onBucketClick:r,renderEntry:i})=>(0,L.jsx)(`div`,{className:`timeline-view timeline-view--month`,role:`list`,children:e.map(e=>(0,L.jsxs)(`div`,{className:`timeline-view__bucket timeline-view__bucket--month`,role:`listitem`,children:[(0,L.jsx)(`div`,{className:`timeline-view__node`,children:(0,L.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:e.label,labelPosition:`right`,onClick:()=>r?.(e)})}),(0,L.jsx)(`div`,{className:`timeline-view__content`,children:e.entries.map(e=>{let r=t===e.id,a=()=>(0,L.jsx)(I,{entry:e,isSelected:r,isExpanded:r,onSelect:n});return(0,L.jsx)(at.Fragment,{children:i?i(e,{isExpanded:r,isSelected:r,defaultRender:a}):a()},e.id)})})]},e.periodStart))})),ot.displayName=`MonthView`,ot.__docgenInfo={description:`Month-level zoom view: shows month labels with entry title lists.`,methods:[],displayName:`MonthView`}})),ct,R,lt,ut=e((()=>{ct=t(n(),1),y(),_(),v(),it(),R=r(),lt=ct.memo(({buckets:e,selectedEntryId:t,onEntrySelect:n,renderEntry:r})=>(0,R.jsx)(`div`,{className:`timeline-view timeline-view--day`,role:`list`,children:e.map(e=>(0,R.jsxs)(`div`,{className:`timeline-view__bucket timeline-view__bucket--day`,role:`listitem`,children:[(0,R.jsx)(`div`,{className:`timeline-view__node`,children:(0,R.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:e.label,labelPosition:`right`})}),(0,R.jsx)(`div`,{className:`timeline-view__content`,children:e.entries.map(e=>{let i=t===e.id,a=()=>(0,R.jsx)(I,{entry:e,isSelected:i,isExpanded:i,onSelect:n,footer:e.tags&&e.tags.length>0?(0,R.jsx)(ne,{gap:`tight`,"aria-label":`Tags for ${e.title}`,children:e.tags.map(e=>(0,R.jsx)(te,{size:`small`,variant:`outlined`,children:e},e))}):void 0});return(0,R.jsx)(ct.Fragment,{children:r?r(e,{isExpanded:i,isSelected:i,defaultRender:a}):a()},e.id)})})]},e.periodStart))})),lt.displayName=`DayView`,lt.__docgenInfo={description:`Day-level zoom view: shows day labels with entry cards and content preview.`,methods:[],displayName:`DayView`}})),dt,z,ft,pt=e((()=>{dt=t(n(),1),y(),_(),v(),u(),it(),ke(),z=r(),ft=dt.memo(({buckets:e,selectedEntryId:t,onEntrySelect:n,renderEntry:r})=>(0,z.jsx)(`div`,{className:`timeline-view timeline-view--hour`,role:`list`,children:e.map(e=>(0,z.jsxs)(`div`,{className:`timeline-view__bucket timeline-view__bucket--hour`,role:`listitem`,children:[(0,z.jsx)(`div`,{className:`timeline-view__node`,children:(0,z.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:e.label,labelPosition:`right`})}),(0,z.jsx)(`div`,{className:`timeline-view__content`,children:e.entries.map(e=>{let i=t===e.id,a=()=>(0,z.jsxs)(I,{entry:e,isSelected:i,isExpanded:!0,onSelect:n,footer:(0,z.jsxs)(`div`,{className:`timeline-view__entry-footer`,children:[e.tags&&e.tags.length>0&&(0,z.jsx)(ne,{gap:`tight`,"aria-label":`Tags for ${e.title}`,children:e.tags.map(e=>(0,z.jsx)(te,{size:`small`,variant:`outlined`,children:e},e))}),e.type&&(0,z.jsx)(d,{variant:`default`,size:`small`,children:e.type})]}),children:[(0,z.jsx)(`time`,{className:`timeline-view__timestamp`,dateTime:e.date,children:pe(e.date)}),e.kind===`text`&&e.content!==void 0&&(0,z.jsx)(`div`,{className:`timeline-view__entry-content`,children:e.content})]});return(0,z.jsx)(dt.Fragment,{children:r?r(e,{isExpanded:!0,isSelected:i,defaultRender:a}):a()},e.id)})})]},e.periodStart))})),ft.displayName=`HourView`,ft.__docgenInfo={description:`Hour-level zoom view: full detail with timestamps and complete content.`,methods:[],displayName:`HourView`}})),mt=e((()=>{Re(),st(),ut(),pt()})),ht,gt,_t=e((()=>{n(),mt(),ht=r(),gt=({zoomLevel:e,buckets:t,selectedEntryId:n,onEntrySelect:r,onBucketClick:i,renderEntry:a})=>{switch(e){case`year`:return(0,ht.jsx)(Le,{buckets:t,onBucketClick:i});case`month`:return(0,ht.jsx)(ot,{buckets:t,selectedEntryId:n,onEntrySelect:r,onBucketClick:i,renderEntry:a});case`day`:return(0,ht.jsx)(lt,{buckets:t,selectedEntryId:n,onEntrySelect:r,renderEntry:a});case`hour`:return(0,ht.jsx)(ft,{buckets:t,selectedEntryId:n,onEntrySelect:r,renderEntry:a});default:return e}},gt.__docgenInfo={description:`View switcher that renders the appropriate zoom level view.`,methods:[],displayName:`TimelineContent`,props:{zoomLevel:{required:!0,tsType:{name:`unknown[number]`,raw:`(typeof ZOOM_LEVELS)[number]`},description:``},buckets:{required:!0,tsType:{name:`unknown`},description:``},selectedEntryId:{required:!0,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},onEntrySelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(entryId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`entryId`}],return:{name:`void`}}},description:``},onBucketClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(bucket: DateBucket) => void`,signature:{arguments:[{type:{name:`DateBucket`},name:`bucket`}],return:{name:`void`}}},description:``},renderEntry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  entry: TimelineEntryData,
  context: TimelineEntryRenderContext,
) => ReactNode`,signature:{arguments:[{type:{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
| (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
| (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`}]},name:`entry`},{type:{name:`TimelineEntryRenderContext`},name:`context`}],return:{name:`ReactNode`}}},description:``}}}})),vt=e((()=>{})),yt=e((()=>{})),B,V,bt,xt=e((()=>{B=t(n(),1),i(),C(),oe(),ke(),Me(),Fe(),_t(),y(),it(),vt(),yt(),V=r(),bt=({entries:e,mode:t=`interactive`,zoomLevel:n,defaultZoomLevel:r=`month`,onZoomChange:i,selectedEntryId:o,defaultSelectedEntryId:s,onSelectEntry:c,sortOrder:l=`desc`,scrollToZoom:u=!0,keyboardShortcuts:d=!0,renderEntry:f,pageSize:ee=10,onLoadMore:p,...m})=>{let h=t===`static`,g=t===`feed`,_=h||g,v=(0,B.useRef)(null),te=(0,B.useRef)(null),[ne,y]=(0,B.useState)(``),{zoomLevel:x,canZoomIn:re,canZoomOut:S,breadcrumbs:C,currentPeriod:w,isDrillDownEnabled:oe,drillDown:T,drillUp:E,reset:se}=ie({zoomLevel:n,defaultZoomLevel:r,onZoomChange:i}),{selectedEntryId:ce,toggle:le,deselect:ue}=ae({selectedEntryId:o,defaultSelectedEntryId:s,onSelectEntry:c}),de=(0,B.useMemo)(()=>Te(e,x,l),[e,x,l]),fe=C.length>0?[`year`,`month`,`day`,`hour`][C.length-1]:null,pe=(0,B.useMemo)(()=>w&&fe?we(de,w,fe):de,[de,w,fe]);(0,B.useEffect)(()=>{if(_||!u)return;let e=v.current;if(!e)return;let t=null,n=e=>{!e.ctrlKey&&!e.metaKey||(e.preventDefault(),t===null&&(t=requestAnimationFrame(()=>{e.deltaY>0&&E(),t=null})))};return e.addEventListener(`wheel`,n,{passive:!1}),()=>{e.removeEventListener(`wheel`,n),t!==null&&cancelAnimationFrame(t)}},[_,u,oe,re,E]),(0,B.useEffect)(()=>{if(_||!d)return;let e=e=>{if(!v.current?.contains(document.activeElement)&&document.activeElement!==v.current)return;let t=e.ctrlKey||e.metaKey;t&&e.key===`-`?(e.preventDefault(),E()):t&&e.key===`0`?(e.preventDefault(),se(),y(`Showing all years`)):e.key===`Escape`&&(e.preventDefault(),ue())};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[_,d,E,se,ue]);let me=(0,B.useCallback)(e=>{re&&(T(e.periodStart,e.label),y(`Showing ${x===`year`?`months`:x===`month`?`days`:`hours`} in ${e.label}`))},[re,T,x]),he=(0,B.useRef)(C.length);(0,B.useEffect)(()=>{if(C.length!==he.current){he.current=C.length;let e=te.current?.querySelector(`.eidotter-timeline-card__trigger, .timeline-view__bucket-button, .eidotter-timeline-node[role="button"]`);e&&requestAnimationFrame(()=>e.focus())}},[C.length]);let D=(0,B.useMemo)(()=>_?[...e].sort((e,t)=>{let n=e.date.localeCompare(t.date);return l===`desc`?-n:n}):e,[_,e,l]),O=Math.max(1,ee),[k,ge]=(0,B.useState)(O);(0,B.useEffect)(()=>{g&&ge(e=>{let t=D.length;return t===0?O:e>t?Math.max(O,t):e})},[g,O,D.length]);let _e=(0,B.useMemo)(()=>g?D.slice(0,k):D,[g,D,k]),ve=g&&k<D.length,ye=(0,B.useCallback)(()=>{let e=Math.min(k+O,D.length);e<=k||(ge(e),p?.(e))},[k,O,D.length,p]),be=(0,B.useMemo)(()=>new Intl.DateTimeFormat(`en-US`,{year:`numeric`,month:`short`,day:`numeric`}),[]),xe=e=>{try{return be.format(new Date(e))}catch{return e}};return(0,V.jsxs)(`div`,{ref:v,...m,className:a(`font-dos text-cga-amber p-4 min-h-[200px]`,`eidotter-timeline-container`,h&&`eidotter-timeline-container--static`,g&&`eidotter-timeline-container--feed`,m.className),role:`region`,"aria-label":m[`aria-label`]??`Timeline`,tabIndex:_?void 0:0,children:[(0,V.jsx)(`div`,{className:`sr-only`,role:`status`,"aria-live":`polite`,"aria-atomic":`true`,children:ne}),!_&&(0,V.jsx)(je,{zoomLevel:x,canZoomIn:re,canZoomOut:S,onZoomIn:()=>{},onZoomOut:E,onReset:se,breadcrumbs:oe?C:[],onBreadcrumbClick:e=>{let t=C.length-1-e;for(let e=0;e<t;e++)E()}}),(0,V.jsx)(`div`,{ref:te,children:e.length===0?(0,V.jsxs)(`div`,{className:`eidotter-timeline-container__empty`,role:`status`,children:[(0,V.jsx)(`p`,{children:`C:\\TIMELINE> No entries found.`}),(0,V.jsx)(`p`,{children:`_`})]}):h?(0,V.jsx)(j,{children:(0,V.jsx)(`div`,{className:`eidotter-timeline-container__static`,role:`list`,"aria-label":`Timeline`,children:D.map(e=>{let t=()=>(0,V.jsx)(I,{entry:e,isSelected:!1,isExpanded:!0});return(0,V.jsxs)(`div`,{className:`eidotter-timeline-container__static-entry`,role:`listitem`,children:[(0,V.jsx)(`div`,{className:`timeline-view__node`,children:(0,V.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:xe(e.date),labelPosition:`right`})}),f?f(e,{isExpanded:!0,isSelected:!1,defaultRender:t}):t()]},e.id)})})}):g?(0,V.jsxs)(j,{children:[(0,V.jsx)(`div`,{className:`eidotter-timeline-container__feed`,role:`list`,"aria-label":`Timeline`,children:_e.map(e=>{let t=ce===e.id,n=()=>(0,V.jsx)(I,{entry:e,isSelected:t,isExpanded:t,onSelect:le});return(0,V.jsxs)(`div`,{className:`eidotter-timeline-container__feed-entry`,role:`listitem`,children:[(0,V.jsx)(`div`,{className:`timeline-view__node`,children:(0,V.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:xe(e.date),labelPosition:`right`})}),f?f(e,{isExpanded:t,isSelected:t,defaultRender:n}):n()]},e.id)})}),ve&&(0,V.jsx)(`button`,{type:`button`,className:`eidotter-timeline-container__load-more`,onClick:ye,"aria-label":`Load more entries (showing ${k} of ${D.length})`,children:`LOAD MORE...`})]}):pe.length===0&&w?(0,V.jsx)(j,{children:(0,V.jsxs)(`div`,{className:`eidotter-timeline-container__empty`,role:`status`,children:[(0,V.jsxs)(`p`,{children:[`C:\\TIMELINE> No entries in `,C[C.length-1]?.label??`this period`,`.`]}),(0,V.jsx)(`p`,{children:`_`})]})}):(0,V.jsx)(j,{children:(0,V.jsx)(gt,{zoomLevel:x,buckets:pe,selectedEntryId:ce,onEntrySelect:le,onBucketClick:me,renderEntry:f})})})]})},bt.__docgenInfo={description:`TimelineContainer - Interactive multi-level zoom timeline

A composite timeline component with 4 zoom levels (year, month, day, hour),
entry selection, keyboard shortcuts, scroll-to-zoom, and drill-down navigation.
Uses DOS/CGA aesthetic with eidotter primitives.

Supports both controlled and uncontrolled patterns for zoom and selection.
When zoom is uncontrolled, clicking a bucket drills down into that time period.`,methods:[],displayName:`TimelineContainer`,props:{entries:{required:!0,tsType:{name:`Array`,elements:[{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
| (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
| (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`}]}],raw:`TimelineEntryData[]`},description:`Timeline entries to display`},mode:{required:!1,tsType:{name:`union`,raw:`'interactive' | 'static' | 'feed'`,elements:[{name:`literal`,value:`'interactive'`},{name:`literal`,value:`'static'`},{name:`literal`,value:`'feed'`}]},description:`Display mode
- "interactive" (default): zoom controls, selection, keyboard shortcuts
- "static": read-only vertical feed of always-expanded entries (replaces TimelineList)
- "feed": paginated vertical list with collapsed-by-default entries that
  expand on selection. Renders a DOS-style "LOAD MORE..." button while
  more entries are available. No zoom controls.
@default 'interactive'`,defaultValue:{value:`'interactive'`,computed:!1}},zoomLevel:{required:!1,tsType:{name:`unknown[number]`,raw:`(typeof ZOOM_LEVELS)[number]`},description:"Controlled zoom level — overrides internal state when provided.\nUse with `onZoomChange` for full control. Disables drill-down navigation."},defaultZoomLevel:{required:!1,tsType:{name:`unknown[number]`,raw:`(typeof ZOOM_LEVELS)[number]`},description:`Initial zoom level for uncontrolled mode
@default 'month'`,defaultValue:{value:`'month'`,computed:!1}},onZoomChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(level: ZoomLevel) => void`,signature:{arguments:[{type:{name:`unknown[number]`,raw:`(typeof ZOOM_LEVELS)[number]`},name:`level`}],return:{name:`void`}}},description:`Callback fired when the zoom level changes`},selectedEntryId:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:"Controlled selection — overrides internal state when provided.\n`null` means nothing selected, `undefined` means uncontrolled."},defaultSelectedEntryId:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`Initial selected entry for uncontrolled mode
@default null`},onSelectEntry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(entryId: string | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},name:`entryId`}],return:{name:`void`}}},description:`Callback fired when entry selection changes`},sortOrder:{required:!1,tsType:{name:`union`,raw:`'asc' | 'desc'`,elements:[{name:`literal`,value:`'asc'`},{name:`literal`,value:`'desc'`}]},description:`Sort order for entries within buckets
@default 'desc'`,defaultValue:{value:`'desc'`,computed:!1}},scrollToZoom:{required:!1,tsType:{name:`boolean`},description:`Enable Ctrl/Cmd + scroll wheel to zoom
@default true`,defaultValue:{value:`true`,computed:!1}},keyboardShortcuts:{required:!1,tsType:{name:`boolean`},description:`Enable keyboard shortcuts (Ctrl+=/-/0, Escape)
@default true`,defaultValue:{value:`true`,computed:!1}},renderEntry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  entry: TimelineEntryData,
  context: TimelineEntryRenderContext,
) => ReactNode`,signature:{arguments:[{type:{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
| (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
| (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`}]},name:`entry`},{type:{name:`TimelineEntryRenderContext`},name:`context`}],return:{name:`ReactNode`}}},description:`Pluggable entry renderer. When provided, this is called for every entry
in every zoom-level view (and in static / feed modes) instead of rendering
the built-in \`TimelineEntryCard\`. Return \`context.defaultRender()\` to keep
the default card for some entries while customising others.

Use this to render different card UIs per entry type — blog posts,
photos, financial records, etc.`},pageSize:{required:!1,tsType:{name:`number`},description:`Number of entries to show per page in feed mode. Ignored for other modes.
@default 10`,defaultValue:{value:`10`,computed:!1}},onLoadMore:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(visibleCount: number) => void`,signature:{arguments:[{type:{name:`number`},name:`visibleCount`}],return:{name:`void`}}},description:`Fired in feed mode after the user clicks "LOAD MORE…", with the new total
number of visible entries. Use this to fetch the next batch from a backend
and append to \`entries\`, or for analytics.`}}}})),St,H,U,Ct,W,G,K,q,wt,Tt,Et,J,Dt,Y,Ot,kt,X,At,jt,Mt,Nt,Pt,Z,Q,Ft,It,$,Lt;e((()=>{St=t(n(),1),xt(),c(),H=r(),U=[{id:`1`,type:`event`,date:`2024-01-15T10:30:00Z`,title:`Project Kickoff`,kind:`text`,content:`Initial planning session for the DOS revival project`,tags:[`planning`,`milestone`]},{id:`2`,type:`milestone`,date:`2024-02-20T14:00:00Z`,title:`Alpha Release`,kind:`text`,content:`First working prototype with CGA color palette`,tags:[`release`]},{id:`3`,type:`event`,date:`2024-03-10T09:00:00Z`,title:`Design Review`,kind:`text`,content:`Reviewed all component designs against DOS aesthetic guidelines`,tags:[`design`,`review`]},{id:`4`,type:`project`,date:`2024-06-01T11:00:00Z`,title:`Beta Launch`,kind:`text`,content:`Public beta of the eiDotter design system`,tags:[`release`,`milestone`]},{id:`5`,type:`event`,date:`2024-06-15T16:30:00Z`,title:`Community Feedback`,kind:`text`,content:`Incorporated feedback from early adopters`,tags:[`community`]},{id:`6`,type:`milestone`,date:`2025-01-05T08:00:00Z`,title:`v1.0 Stable`,kind:`text`,content:`Production-ready release with full component library`,tags:[`release`,`milestone`]},{id:`7`,type:`event`,date:`2025-03-20T13:45:00Z`,title:`Token Pipeline Upgrade`,kind:`text`,content:`Migrated to Style Dictionary v5 with DTCG format`,tags:[`infrastructure`]}],Ct={title:`Components/TimelineContainer`,component:bt,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:l.TimelineContainer},tags:[`autodocs`],argTypes:{defaultZoomLevel:{control:`select`,options:[`year`,`month`,`day`,`hour`]},sortOrder:{control:`select`,options:[`asc`,`desc`]},scrollToZoom:{control:`boolean`},keyboardShortcuts:{control:`boolean`}}},W={args:{entries:U}},G={args:{entries:U,defaultZoomLevel:`year`}},K={args:{entries:U,defaultZoomLevel:`month`}},q={args:{entries:U,defaultZoomLevel:`day`}},wt={args:{entries:U,defaultZoomLevel:`hour`}},Tt={args:{entries:U,mode:`static`}},Et=Array.from({length:25},(e,t)=>({id:`feed-${t+1}`,type:[`event`,`milestone`,`project`][t%3],date:new Date(2025,11-t%12,15-t%14,10+t%8,0).toISOString(),title:`Update #${t+1}`,kind:`text`,content:`Body copy for update #${t+1}. Sample feed entry to demonstrate paginated rendering with collapse / expand on selection.`,tags:t%2==0?[`weekly`]:[`announcement`]})),J={args:{entries:Et,mode:`feed`,pageSize:5}},Dt=()=>{let[e,t]=(0,St.useState)(0);return(0,H.jsxs)(`div`,{children:[(0,H.jsxs)(`div`,{style:{color:`var(--color-cga-amber)`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`var(--typography-font-size-text-sm)`,marginBottom:`var(--spacing-4)`},children:[`onLoadMore fired: `,e,` `,e===1?`time`:`times`]}),(0,H.jsx)(bt,{entries:Et,mode:`feed`,pageSize:5,onLoadMore:()=>t(e=>e+1)})]})},Y={render:()=>(0,H.jsx)(Dt,{})},Ot={args:{entries:U,defaultZoomLevel:`year`,sortOrder:`asc`}},kt={args:{entries:[]}},X={args:{entries:U},parameters:{backgrounds:{default:`light`,values:[{name:`light`,value:`#FFE8A8`}]}}},At={args:{entries:[U[0]],defaultZoomLevel:`day`}},jt={args:{entries:U,defaultZoomLevel:`month`},globals:{viewport:{value:`phone375`}}},Mt={args:{entries:U,defaultZoomLevel:`month`},globals:{viewport:{value:`tablet768`}}},Nt={args:{entries:U,defaultZoomLevel:`day`},globals:{viewport:{value:`ultrawide`}}},Pt=()=>{let[e,t]=(0,St.useState)(`month`),[n,r]=(0,St.useState)(null);return(0,H.jsxs)(`div`,{children:[(0,H.jsxs)(`div`,{style:{color:`var(--color-cga-amber)`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`var(--typography-font-size-text-sm)`,marginBottom:`var(--spacing-4)`},children:[`Zoom: `,e,` | Selected: `,n??`none`]}),(0,H.jsx)(bt,{entries:U,zoomLevel:e,onZoomChange:t,selectedEntryId:n,onSelectEntry:r})]})},Z={render:()=>(0,H.jsx)(Pt,{})},Q={args:{entries:U,defaultZoomLevel:`month`,renderEntry:(e,t)=>e.type===`milestone`?(0,H.jsxs)(`div`,{style:{border:`2px solid var(--color-cga-amber)`,borderRadius:`var(--border-radius-base)`,padding:`var(--spacing-3)`,marginBottom:`var(--spacing-2)`,background:`var(--color-semantic-background-secondary)`,boxShadow:t.isSelected?`var(--shadow-glow-md)`:`none`},children:[(0,H.jsx)(`div`,{style:{fontSize:`var(--typography-font-size-text-xs)`,color:`var(--color-cga-amber-dim)`,textTransform:`uppercase`,letterSpacing:`0.1em`,marginBottom:`var(--spacing-1)`},children:`★ MILESTONE`}),(0,H.jsx)(`div`,{style:{fontSize:`var(--typography-font-size-text-md)`,color:`var(--color-cga-amber)`},children:e.title})]}):t.defaultRender()}},Ft={args:{entries:[{id:`t1`,date:`2024-03-01`,title:`Text entry one`,kind:`text`,content:`Inline body text that expands when selected.`},{id:`t2`,date:`2024-03-02`,title:`Text entry two`,kind:`text`,content:`Second one.`}],mode:`static`}},It={args:{entries:[{id:`i1`,date:`2024-03-01`,title:`Single image entry`,kind:`image`,image:{src:`https://placehold.co/800x600/000/ffb000?text=ONE`,alt:`One`}},{id:`i2`,date:`2024-03-02`,title:`Linked image entry`,kind:`image`,image:{src:`https://placehold.co/800x600/000/ffb000?text=TWO`,alt:`Two`,link:`https://example.com`}}],mode:`static`}},$={args:{entries:[{id:`g1`,date:`2024-03-01`,title:`Gallery entry`,kind:`gallery`,images:[{src:`https://placehold.co/800x600/000/ffb000?text=ONE`,alt:`One`,caption:`First`},{src:`https://placehold.co/800x600/000/ffb000?text=TWO`,alt:`Two`},{src:`https://placehold.co/800x600/000/ffb000?text=THREE`,alt:`Three`,caption:`Third`},{src:`https://placehold.co/800x600/000/ffb000?text=FOUR`,alt:`Four`}]}],mode:`static`}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'year'
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'month'
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'day'
  }
}`,...q.parameters?.docs?.source}}},wt.parameters={...wt.parameters,docs:{...wt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'hour'
  }
}`,...wt.parameters?.docs?.source}}},Tt.parameters={...Tt.parameters,docs:{...Tt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    mode: 'static'
  }
}`,...Tt.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    entries: feedEntries,
    mode: 'feed',
    pageSize: 5
  }
}`,...J.parameters?.docs?.source},description:{story:`Feed mode: paginated vertical list, collapsed-by-default with click-to-expand
via selection, and a DOS-styled "LOAD MORE..." button while more entries are
available. No zoom controls. Use this when you want a Twitter / changelog-
style read of a single chronological list rather than a multi-zoom timeline.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <FeedModeOnLoadMoreExample />
}`,...Y.parameters?.docs?.source},description:{story:"`onLoadMore` fires after each LOAD MORE click with the new visible count.\nUse it to trigger backend fetches and append to `entries`, or for analytics.",...Y.parameters?.docs?.description}}},Ot.parameters={...Ot.parameters,docs:{...Ot.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'year',
    sortOrder: 'asc'
  }
}`,...Ot.parameters?.docs?.source}}},kt.parameters={...kt.parameters,docs:{...kt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: []
  }
}`,...kt.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{
        name: 'light',
        value: '#FFE8A8'
      }]
    }
  }
}`,...X.parameters?.docs?.source},description:{story:"Verifies that TimelineContainer does not paint its own background.\nThe component renders against a light backdrop (overridden via\nStorybook's `backgrounds` parameter) — if a `bg-dos-bg-primary`\nregression slips back in, this story will show a black box.",...X.parameters?.docs?.description}}},At.parameters={...At.parameters,docs:{...At.parameters?.docs,source:{originalSource:`{
  args: {
    entries: [sampleEntries[0]],
    defaultZoomLevel: 'day'
  }
}`,...At.parameters?.docs?.source}}},jt.parameters={...jt.parameters,docs:{...jt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'month'
  },
  globals: {
    viewport: {
      value: 'phone375'
    }
  }
}`,...jt.parameters?.docs?.source}}},Mt.parameters={...Mt.parameters,docs:{...Mt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'month'
  },
  globals: {
    viewport: {
      value: 'tablet768'
    }
  }
}`,...Mt.parameters?.docs?.source}}},Nt.parameters={...Nt.parameters,docs:{...Nt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'day'
  },
  globals: {
    viewport: {
      value: 'ultrawide'
    }
  }
}`,...Nt.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledExample />
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'month',
    renderEntry: (entry, ctx) => entry.type === 'milestone' ? <div style={{
      border: '2px solid var(--color-cga-amber)',
      borderRadius: 'var(--border-radius-base)',
      padding: 'var(--spacing-3)',
      marginBottom: 'var(--spacing-2)',
      background: 'var(--color-semantic-background-secondary)',
      boxShadow: ctx.isSelected ? 'var(--shadow-glow-md)' : 'none'
    }}>
          <div style={{
        fontSize: 'var(--typography-font-size-text-xs)',
        color: 'var(--color-cga-amber-dim)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: 'var(--spacing-1)'
      }}>
            ★ MILESTONE
          </div>
          <div style={{
        fontSize: 'var(--typography-font-size-text-md)',
        color: 'var(--color-cga-amber)'
      }}>
            {entry.title}
          </div>
        </div> : ctx.defaultRender()
  }
}`,...Q.parameters?.docs?.source},description:{story:"`renderEntry` lets consumers swap the default `TimelineEntryCard` for any\ncustom node — useful for blog posts, photos, or domain-specific layouts.\n\nThe render context exposes `defaultRender()` so you can opt in per-entry:\ncustomise some entries while letting the rest fall through to the default\ncard. Selection and expansion state are passed through unchanged.",...Q.parameters?.docs?.description}}},Ft.parameters={...Ft.parameters,docs:{...Ft.parameters?.docs,source:{originalSource:`{
  args: {
    entries: [{
      id: 't1',
      date: '2024-03-01',
      title: 'Text entry one',
      kind: 'text',
      content: 'Inline body text that expands when selected.'
    }, {
      id: 't2',
      date: '2024-03-02',
      title: 'Text entry two',
      kind: 'text',
      content: 'Second one.'
    }],
    mode: 'static'
  }
}`,...Ft.parameters?.docs?.source}}},It.parameters={...It.parameters,docs:{...It.parameters?.docs,source:{originalSource:`{
  args: {
    entries: [{
      id: 'i1',
      date: '2024-03-01',
      title: 'Single image entry',
      kind: 'image',
      image: {
        src: 'https://placehold.co/800x600/000/ffb000?text=ONE',
        alt: 'One'
      }
    }, {
      id: 'i2',
      date: '2024-03-02',
      title: 'Linked image entry',
      kind: 'image',
      image: {
        src: 'https://placehold.co/800x600/000/ffb000?text=TWO',
        alt: 'Two',
        link: 'https://example.com'
      }
    }],
    mode: 'static'
  }
}`,...It.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    entries: [{
      id: 'g1',
      date: '2024-03-01',
      title: 'Gallery entry',
      kind: 'gallery',
      images: [{
        src: 'https://placehold.co/800x600/000/ffb000?text=ONE',
        alt: 'One',
        caption: 'First'
      }, {
        src: 'https://placehold.co/800x600/000/ffb000?text=TWO',
        alt: 'Two'
      }, {
        src: 'https://placehold.co/800x600/000/ffb000?text=THREE',
        alt: 'Three',
        caption: 'Third'
      }, {
        src: 'https://placehold.co/800x600/000/ffb000?text=FOUR',
        alt: 'Four'
      }]
    }],
    mode: 'static'
  }
}`,...$.parameters?.docs?.source}}},Lt=[`Default`,`YearView`,`MonthView`,`DayView`,`HourView`,`StaticMode`,`FeedMode`,`FeedModeWithOnLoadMore`,`Ascending`,`Empty`,`OnLightBackdrop`,`SingleEntry`,`Mobile`,`Tablet`,`Ultrawide`,`Controlled`,`CustomRenderEntry`,`TextEntries`,`ImageEntries`,`GalleryEntries`]}))();export{Ot as Ascending,Z as Controlled,Q as CustomRenderEntry,q as DayView,W as Default,kt as Empty,J as FeedMode,Y as FeedModeWithOnLoadMore,$ as GalleryEntries,wt as HourView,It as ImageEntries,jt as Mobile,K as MonthView,X as OnLightBackdrop,At as SingleEntry,Tt as StaticMode,Mt as Tablet,Ft as TextEntries,Nt as Ultrawide,G as YearView,Lt as __namedExportsOrder,Ct as default};