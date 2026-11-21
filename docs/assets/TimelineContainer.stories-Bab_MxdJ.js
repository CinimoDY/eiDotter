import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{r,t as i}from"./registry-EhIcK3QA.js";import"./keyframes-D-6fbS_z.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./cn-CHNjZLmO.js";import{n as c,r as l}from"./Button-rb3g4e97.js";import{n as u,t as d}from"./Badge-BkcUmlDI.js";import{n as f,t as ee}from"./isSafeHref-C3uNgdiy.js";import{n as p,t as m}from"./Breadcrumb-C0HyCkgd.js";import{n as h,t as g}from"./Button-DYwuDaLT.js";import{n as _,t as v}from"./Lightbox-CoF722Pe.js";import{i as te,n as ne,r as re,t as ie}from"./TagGroup-BlF8P8QZ.js";import{n as y,t as b}from"./TimelineNode-CAtULyht.js";var x;function ae(){return(ae=t((()=>{x=[`year`,`month`,`day`,`hour`]})))()}function oe({zoomLevel:e,defaultZoomLevel:t=`month`,onZoomChange:n}={}){let r=e===void 0,[i,a]=(0,S.useState)(t),[o,s]=(0,S.useState)([]),c=(0,S.useRef)(r);(0,S.useEffect)(()=>{c.current&&!r&&s([]),c.current=r},[r]);let l=e??i,u=x.indexOf(l),d=u<x.length-1,f=u>0,ee=o.length>0?o[o.length-1].periodStart:null,p=(0,S.useRef)(r),m=(0,S.useRef)(d),h=(0,S.useRef)(u),g=(0,S.useRef)(o),_=(0,S.useRef)(n);(0,S.useEffect)(()=>{p.current=r,m.current=d,h.current=u,g.current=o,_.current=n});let v=(0,S.useCallback)(e=>{p.current&&a(e),_.current?.(e)},[]);return{zoomLevel:l,canZoomIn:d,canZoomOut:f,breadcrumbs:o,currentPeriod:ee,isDrillDownEnabled:r,drillDown:(0,S.useCallback)((e,t)=>{if(!p.current||!m.current)return;let n=x[h.current+1];n!==void 0&&(s(n=>[...n,{periodStart:e,label:t}]),v(n))},[v]),drillUp:(0,S.useCallback)(()=>{if(!p.current||g.current.length===0)return;let e=x[h.current-1];e!==void 0&&(s(e=>e.slice(0,-1)),v(e))},[v]),reset:(0,S.useCallback)(()=>{p.current&&(s([]),v(`year`))},[v])}}var S;function se(){return(se=t((()=>{S=n(),ae()})))()}function ce({selectedEntryId:e,defaultSelectedEntryId:t=null,onSelectEntry:n}={}){let[r,i]=(0,C.useState)(t),a=e!==void 0,o=e===void 0?r:e,s=(0,C.useRef)(o),c=(0,C.useRef)(a),l=(0,C.useRef)(n);(0,C.useEffect)(()=>{s.current=o,c.current=a,l.current=n});let u=(0,C.useCallback)(e=>{c.current||i(e),l.current?.(e)},[]);return{selectedEntryId:o,select:(0,C.useCallback)(e=>{u(e)},[u]),deselect:(0,C.useCallback)(()=>{u(null)},[u]),toggle:(0,C.useCallback)(e=>{c.current?l.current?.(s.current===e?null:e):i(t=>{let n=t===e?null:e;return l.current?.(n),n})},[])}}var C;function le(){return(le=t((()=>{C=n()})))()}function w(e){return new Date(e).getUTCFullYear()}function ue(e){return new Date(e).getUTCMonth()}function de(e){return new Date(e).getUTCDate()}function fe(e){return new Date(e).getUTCHours()}function pe(e){return String(e)}function me(e,t){return`${Ae[t]} ${e}`}function he(e,t,n){return`${je[t]} ${n}`}function ge(e,t,n,r){let i=r>=12?`pm`:`am`,a=r===0?12:r>12?r-12:r;return`${je[t]} ${n}, ${a}${i}`}function _e(e){let t=new Date(e),n=je[t.getUTCMonth()],r=t.getUTCDate(),i=t.getUTCFullYear(),a=t.getUTCHours(),o=t.getUTCMinutes(),s=a>=12?`pm`:`am`;return`${n} ${r}, ${i} at ${a===0?12:a>12?a-12:a}${o>0?`:${String(o).padStart(2,`0`)}`:``}${s}`}function ve(e){return new Date(Date.UTC(e,0,1)).toISOString()}function ye(e,t){return new Date(Date.UTC(e,t,1)).toISOString()}function be(e,t,n){return new Date(Date.UTC(e,t,n)).toISOString()}function xe(e,t,n,r){return new Date(Date.UTC(e,t,n,r)).toISOString()}function T(e,t,n,r,i){let a=new Map,o=[];for(let n of e){let e=t(n),r=a.get(e);r?r.push(n):(a.set(e,[n]),o.push(e))}o.sort((e,t)=>i===`asc`?e.localeCompare(t):t.localeCompare(e));for(let[,e]of a)e.sort((e,t)=>{let n=e.date.localeCompare(t.date);return i===`asc`?n:-n});return o.map(e=>({label:n(e),periodStart:r(e),entries:a.get(e)??[]}))}function E(e){return String(w(e.date))}function D(e){let t=w(e.date),n=ue(e.date);return`${t}-${String(n).padStart(2,`0`)}`}function Se(e){let t=w(e.date),n=ue(e.date),r=de(e.date);return`${t}-${String(n).padStart(2,`0`)}-${String(r).padStart(2,`0`)}`}function Ce(e){let t=w(e.date),n=ue(e.date),r=de(e.date),i=fe(e.date);return`${t}-${String(n).padStart(2,`0`)}-${String(r).padStart(2,`0`)}-${String(i).padStart(2,`0`)}`}function we(e){return{year:parseInt(e)}}function Te(e){let[t,n]=e.split(`-`);return{year:parseInt(t),month:parseInt(n)}}function Ee(e){let[t,n,r]=e.split(`-`);return{year:parseInt(t),month:parseInt(n),day:parseInt(r)}}function De(e){let[t,n,r,i]=e.split(`-`);return{year:parseInt(t),month:parseInt(n),day:parseInt(r),hour:parseInt(i)}}function Oe(e,t,n){if(t===null||n===`hour`)return e;let r=Me[n];if(r===void 0)return e;let i=t.slice(0,r);return e.filter(e=>e.periodStart.slice(0,r)===i)}function ke(e,t,n=`desc`){if(e.length===0)return[];let r=e.filter(e=>!isNaN(new Date(e.date).getTime()));if(r.length===0)return[];switch(t){case`year`:return T(r,E,e=>{let{year:t}=we(e);return pe(t)},e=>{let{year:t}=we(e);return ve(t)},n);case`month`:return T(r,D,e=>{let{year:t,month:n}=Te(e);return me(t,n)},e=>{let{year:t,month:n}=Te(e);return ye(t,n)},n);case`day`:return T(r,Se,e=>{let{year:t,month:n,day:r}=Ee(e);return he(t,n,r)},e=>{let{year:t,month:n,day:r}=Ee(e);return be(t,n,r)},n);case`hour`:return T(r,Ce,e=>{let{year:t,month:n,day:r,hour:i}=De(e);return ge(t,n,r,i)},e=>{let{year:t,month:n,day:r,hour:i}=De(e);return xe(t,n,r,i)},n)}}var Ae,je,Me;function Ne(){return(Ne=t((()=>{Ae=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],je=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],Me={year:4,month:7,day:10}})))()}var O,Pe;function Fe(){return(Fe=t((()=>{n(),l(),h(),u(),p(),O=a(),Pe=({zoomLevel:e,canZoomIn:t,canZoomOut:n,onZoomIn:r,onZoomOut:i,onReset:a,breadcrumbs:o=[],onBreadcrumbClick:s})=>{let l=o.length>0;return(0,O.jsxs)(`div`,{className:`timeline-zoom-controls`,role:`toolbar`,"aria-label":`Timeline zoom controls`,children:[(0,O.jsx)(g,{variant:`secondary`,size:`small`,onClick:i,disabled:!n,"aria-label":`Zoom out`,children:`[-]`}),l?(0,O.jsx)(m,{trail:[{label:`ALL`,onClick:a},...o.slice(0,-1).map((e,t)=>({label:e.label,onClick:()=>s?.(t)}))],currentLabel:o[o.length-1].label,showBackArrow:!1,separator:`>`,className:`timeline-zoom-controls__breadcrumb`}):(0,O.jsx)(c,{className:`timeline-zoom-controls__level`,onPress:a,"aria-label":`Current zoom: ${e}. Click to reset.`,children:(0,O.jsx)(d,{variant:`accent`,size:`medium`,children:e.toUpperCase()})}),(0,O.jsx)(g,{variant:`secondary`,size:`small`,onClick:r,disabled:!t,"aria-label":`Zoom in`,children:`[+]`})]})},Pe.__docgenInfo={description:``,methods:[],displayName:`ZoomControls`,props:{zoomLevel:{required:!0,tsType:{name:`unknown[number]`,raw:`(typeof ZOOM_LEVELS)[number]`},description:``},canZoomIn:{required:!0,tsType:{name:`boolean`},description:``},canZoomOut:{required:!0,tsType:{name:`boolean`},description:``},onZoomIn:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onZoomOut:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onReset:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},breadcrumbs:{required:!1,tsType:{name:`unknown`},description:``,defaultValue:{value:`[]`,computed:!1}},onBreadcrumbClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(index: number) => void`,signature:{arguments:[{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``}}}})))()}var Ie,Le;function Re(){return(Re=t((()=>{n(),Ie=a(),Le=({children:e})=>(0,Ie.jsxs)(`div`,{className:`timeline-axis`,children:[(0,Ie.jsx)(`div`,{className:`timeline-axis__line`,"aria-hidden":`true`}),(0,Ie.jsx)(`div`,{className:`timeline-axis__content`,children:e})]}),Le.__docgenInfo={description:`Vertical spine connecting timeline nodes.\r
Wraps content with a continuous vertical line on the left side.`,methods:[],displayName:`TimelineAxis`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}}})))()}var ze,k,Be;function Ve(){return(Ve=t((()=>{ze=e(n(),1),l(),y(),u(),k=a(),Be=ze.memo(({buckets:e,onBucketClick:t})=>(0,k.jsx)(`div`,{className:`timeline-view timeline-view--year`,role:`list`,children:e.map(e=>(0,k.jsx)(`div`,{className:`timeline-view__bucket timeline-view__bucket--year`,role:`listitem`,children:t?(0,k.jsxs)(c,{className:`timeline-view__bucket-button`,onPress:()=>t(e),children:[(0,k.jsx)(`div`,{className:`timeline-view__node`,children:(0,k.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:e.label,labelPosition:`right`})}),(0,k.jsx)(`div`,{className:`timeline-view__content`,children:(0,k.jsxs)(d,{variant:`default`,size:`small`,children:[e.entries.length,` `,e.entries.length===1?`entry`:`entries`]})})]}):(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(`div`,{className:`timeline-view__node`,children:(0,k.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:e.label,labelPosition:`right`})}),(0,k.jsx)(`div`,{className:`timeline-view__content`,children:(0,k.jsxs)(d,{variant:`default`,size:`small`,children:[e.entries.length,` `,e.entries.length===1?`entry`:`entries`]})})]})},e.periodStart))})),Be.displayName=`YearView`,Be.__docgenInfo={description:`Year-level zoom view: shows year labels with entry counts per year.`,methods:[],displayName:`YearView`}})))()}var He,A,Ue;function We(){return(We=t((()=>{He=e(n(),1),l(),_(),ee(),A=a(),Ue=({entry:e,isExpanded:t,onSelect:n})=>{let[r,i]=(0,He.useState)(!1),{image:a}=e,o=a.thumbnail||a.src,s=a.link&&f(a.link)?a.link:void 0;return(0,He.useEffect)(()=>{t||i(!1)},[t]),s?(0,A.jsxs)(`a`,{className:`eidotter-timeline-card-image eidotter-timeline-card-image--link`,href:s,rel:`noopener noreferrer`,children:[(0,A.jsx)(`p`,{className:`eidotter-timeline-card__title`,children:e.title}),(0,A.jsx)(`img`,{className:`eidotter-timeline-card-image__media`,src:o,alt:a.alt,width:a.width,height:a.height})]}):(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(c,{className:`eidotter-timeline-card__trigger`,onPress:()=>n?.(e.id),"aria-expanded":t,children:(0,A.jsx)(`p`,{className:`eidotter-timeline-card__title`,children:e.title})}),(0,A.jsx)(`div`,{className:`eidotter-timeline-card-image`,children:t?(0,A.jsx)(c,{className:`eidotter-timeline-card-image__media-button`,onPress:()=>i(!0),"aria-label":a.alt?`Open ${a.alt} in lightbox`:`Open image in lightbox`,children:(0,A.jsx)(`img`,{className:`eidotter-timeline-card-image__media eidotter-timeline-card-image__media--expanded`,src:a.src,alt:a.alt,width:a.width,height:a.height})}):(0,A.jsx)(`img`,{className:`eidotter-timeline-card-image__media eidotter-timeline-card-image__media--thumb`,src:o,alt:a.alt,width:a.width,height:a.height})}),(0,A.jsx)(v,{images:[a],isOpen:r,onClose:()=>i(!1)})]})},Ue.__docgenInfo={description:`Image variant of TimelineEntryCard.

Collapsed: title + thumbnail. Expanded: title + full-width image. Click on
the expanded image opens a Lightbox. If \`entry.image.link\` is set and uses
a safe scheme (http/https/mailto/relative), the thumbnail is wrapped in a
plain anchor and clicks navigate out — no expansion, no lightbox.`,methods:[],displayName:`TimelineEntryCardImage`,props:{entry:{required:!0,tsType:{name:`Extract`,elements:[{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
| (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
| (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })
| (TimelineEntryBase & {
    kind: 'article';
    /** Short plain-text preview shown while collapsed (80-char truncated, like the \`text\` kind). */
    summary?: string;
    /** Full body rendered in the expandable panel. */
    content?: ReactNode;
    /**
     * Hero images: a decorative thumbnail strip while collapsed; an
     * interactive gallery + Lightbox when expanded.
     */
    images?: TimelineImage[];
    /**
     * "Read more" URL. Rendered as a plain \`<a>\` inside the expanded panel;
     * it never hijacks expand/collapse. Sanitized via \`isSafeHref\`.
     *
     * Contrast with {@link TimelineImage.link}: an image \`link\` *replaces*
     * the image interaction (navigates out, skips the lightbox), whereas an
     * article \`href\` is *supplementary* — a separate anchor that never
     * interferes with expand/collapse or the gallery.
     */
    href?: string;
    /** Read-more link label. @default 'READ MORE' */
    hrefLabel?: string;
  })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`},{name:`unknown`}]},{name:`signature`,type:`object`,raw:`{ kind: 'image' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'image'`,required:!0}}]}}],raw:`Extract<TimelineEntryData, { kind: 'image' }>`},description:``},isExpanded:{required:!0,tsType:{name:`boolean`},description:``},onSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``}}}})))()}var Ge,j,Ke,qe;function Je(){return(Je=t((()=>{Ge=e(n(),1),l(),_(),o(),ee(),j=a(),Ke=({images:e,isExpanded:t})=>{let[n,r]=(0,Ge.useState)({phase:`grid`});if((0,Ge.useEffect)(()=>{t||r({phase:`grid`})},[t]),(0,Ge.useEffect)(()=>{r(t=>t.phase===`grid`?t:t.index>=e.length?{phase:`grid`}:t)},[e.length]),e.length===0)return null;let i=(e,t)=>{t.link&&f(t.link)||r(t=>t.phase===`focused`&&t.index===e?{phase:`lightbox`,index:e}:{phase:`focused`,index:e})},a=n.phase===`focused`||n.phase===`lightbox`?n.index:null;return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(`div`,{className:`eidotter-timeline-card-gallery__grid`,role:`list`,children:e.map((e,t)=>(0,j.jsx)(qe,{image:e,isFocused:a===t,onClick:()=>i(t,e)},t))}),(0,j.jsx)(v,{images:e,isOpen:n.phase===`lightbox`,initialIndex:n.phase===`lightbox`?n.index:0,onClose:()=>{r(e=>e.phase===`lightbox`?{phase:`focused`,index:e.index}:e)},onIndexChange:e=>{r(t=>t.phase===`lightbox`?{phase:`lightbox`,index:e}:t)}})]})},qe=({image:e,isFocused:t,onClick:n})=>{let r=e.thumbnail||e.src,i=e.link&&f(e.link)?e.link:void 0;return i?(0,j.jsx)(`div`,{role:`listitem`,className:`eidotter-timeline-card-gallery__cell eidotter-timeline-card-gallery__cell--link`,children:(0,j.jsx)(`a`,{className:`eidotter-timeline-card-gallery__link`,href:i,rel:`noopener noreferrer`,children:(0,j.jsx)(`img`,{className:`eidotter-timeline-card-gallery__img`,src:r,alt:e.alt,loading:`lazy`,width:e.width,height:e.height})})}):(0,j.jsx)(`div`,{role:`listitem`,className:s(`eidotter-timeline-card-gallery__cell`,t&&`eidotter-timeline-card-gallery__cell--focused`),children:(0,j.jsx)(c,{className:`eidotter-timeline-card-gallery__button`,onPress:n,"aria-label":e.alt||`Image`,"aria-pressed":t,children:(0,j.jsx)(`img`,{className:`eidotter-timeline-card-gallery__img`,src:r,alt:e.alt,width:e.width,height:e.height})})})},Ke.__docgenInfo={description:"Shared iOS-Photos-style gallery: grid → focused (grow-in-place) → lightbox.\n\nOwns the full interaction state machine **and** the Lightbox mount, so both\nthe `gallery` entry variant and the `article` variant's expanded body can\ndrop it in with only `{ images, isExpanded }`. Resets to grid on parent\ncollapse via a `useEffect` on `isExpanded`.\n\nClass names retain the `eidotter-timeline-card-gallery__*` prefix so existing\ngallery styling and consumer hooks keep working after the extraction.",methods:[],displayName:`GalleryGrid`,props:{images:{required:!0,tsType:{name:`Array`,elements:[{name:`TimelineImage`}],raw:`TimelineImage[]`},description:`Images to render as a grid.`},isExpanded:{required:!0,tsType:{name:`boolean`},description:`When false (parent collapsed) the interaction state resets to the grid.`}}}})))()}var M,Ye;function Xe(){return(Xe=t((()=>{n(),l(),Je(),M=a(),Ye=({entry:e,isExpanded:t,onSelect:n})=>e.images.length===0?(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(`p`,{className:`eidotter-timeline-card__title`,children:e.title}),(0,M.jsx)(`p`,{className:`eidotter-timeline-card-gallery__empty`,children:`No images.`})]}):(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(c,{className:`eidotter-timeline-card__trigger`,onPress:()=>n?.(e.id),"aria-expanded":t,children:(0,M.jsx)(`p`,{className:`eidotter-timeline-card__title`,children:e.title})}),(0,M.jsx)(Ke,{images:e.images,isExpanded:t})]}),Ye.__docgenInfo={description:`Gallery variant of TimelineEntryCard. Thin wrapper: renders the trigger
(title) + the shared {@link GalleryGrid} (grid → focused → lightbox). Empty
galleries render a title + placeholder instead of a trigger.`,methods:[],displayName:`TimelineEntryCardGallery`,props:{entry:{required:!0,tsType:{name:`Extract`,elements:[{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
| (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
| (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })
| (TimelineEntryBase & {
    kind: 'article';
    /** Short plain-text preview shown while collapsed (80-char truncated, like the \`text\` kind). */
    summary?: string;
    /** Full body rendered in the expandable panel. */
    content?: ReactNode;
    /**
     * Hero images: a decorative thumbnail strip while collapsed; an
     * interactive gallery + Lightbox when expanded.
     */
    images?: TimelineImage[];
    /**
     * "Read more" URL. Rendered as a plain \`<a>\` inside the expanded panel;
     * it never hijacks expand/collapse. Sanitized via \`isSafeHref\`.
     *
     * Contrast with {@link TimelineImage.link}: an image \`link\` *replaces*
     * the image interaction (navigates out, skips the lightbox), whereas an
     * article \`href\` is *supplementary* — a separate anchor that never
     * interferes with expand/collapse or the gallery.
     */
    href?: string;
    /** Read-more link label. @default 'READ MORE' */
    hrefLabel?: string;
  })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`},{name:`unknown`}]},{name:`signature`,type:`object`,raw:`{ kind: 'gallery' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'gallery'`,required:!0}}]}}],raw:`Extract<TimelineEntryData, { kind: 'gallery' }>`},description:``},isExpanded:{required:!0,tsType:{name:`boolean`},description:``},onSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``}}}})))()}var N,Ze,Qe;function $e(){return($e=t((()=>{n(),l(),ee(),Je(),N=a(),Ze=4,Qe=({entry:e,isExpanded:t,onSelect:n,children:r})=>{let{summary:i,content:a,href:o,hrefLabel:s}=e,l=e.images??[],u=l.length>0,d=o&&f(o)?o:void 0,ee=u||a!=null||d!==void 0,p=l.slice(0,Ze),m=l.length-p.length;return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(c,{className:`eidotter-timeline-card__trigger`,onPress:()=>n?.(e.id),"aria-expanded":t,children:[(0,N.jsxs)(`div`,{className:`eidotter-timeline-card__header`,children:[e.type&&(0,N.jsx)(`span`,{className:`eidotter-timeline-card__type`,children:e.type.toUpperCase()}),e.tags&&e.tags.length>0&&(0,N.jsx)(`span`,{className:`eidotter-timeline-card__tags`,children:e.tags.map(e=>`#${e}`).join(` `)})]}),(0,N.jsx)(`p`,{className:`eidotter-timeline-card__title`,children:e.title}),!t&&typeof i==`string`&&i.length>0&&(0,N.jsxs)(`p`,{className:`eidotter-timeline-card__preview`,children:[i.slice(0,80),i.length>80?`...`:``]}),r,!t&&u&&(0,N.jsxs)(`div`,{className:`eidotter-timeline-card-article__thumbstrip`,"aria-hidden":`true`,children:[p.map((e,t)=>(0,N.jsx)(`span`,{className:`eidotter-timeline-card-article__thumb`,children:(0,N.jsx)(`img`,{className:`eidotter-timeline-card-article__thumb-img`,src:e.thumbnail||e.src,alt:``,loading:`lazy`,width:e.width,height:e.height})},t)),m>0&&(0,N.jsxs)(`span`,{className:`eidotter-timeline-card-article__thumb eidotter-timeline-card-article__thumb--more`,children:[`+`,m]})]})]}),ee&&(0,N.jsx)(`div`,{className:`eidotter-timeline-card__body`,children:(0,N.jsxs)(`div`,{className:`eidotter-timeline-card__body-inner`,inert:!t||void 0,children:[u&&(0,N.jsx)(Ke,{images:l,isExpanded:t}),a!=null&&(0,N.jsx)(`div`,{className:`eidotter-timeline-card-article__content`,children:a}),d&&(0,N.jsx)(`div`,{className:`eidotter-timeline-card-article__footer`,children:(0,N.jsxs)(`a`,{className:`eidotter-timeline-card-article__readmore`,href:d,rel:`noopener noreferrer`,children:[s??`READ MORE`,` →`]})})]})})]})},Qe.__docgenInfo={description:`Article variant of TimelineEntryCard — a devlog-style entry.

Collapsed: type/tags header, title, an 80-char \`summary\` preview, then a
decorative thumbnail strip. Everything sits inside the single trigger button
(\`aria-hidden\` thumbs, no nested interactive elements) so a click anywhere
toggles expand/collapse.

Expanded: uses the shared always-in-DOM \`__body\`/\`__body-inner\` + \`inert\` +
0fr→1fr grid pattern (like the text branch), so the interactive gallery,
body content, and sanitized "READ MORE →" link are unfocusable/unclickable
while collapsed — correct a11y for free.`,methods:[],displayName:`TimelineEntryCardArticle`,props:{entry:{required:!0,tsType:{name:`Extract`,elements:[{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
| (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
| (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })
| (TimelineEntryBase & {
    kind: 'article';
    /** Short plain-text preview shown while collapsed (80-char truncated, like the \`text\` kind). */
    summary?: string;
    /** Full body rendered in the expandable panel. */
    content?: ReactNode;
    /**
     * Hero images: a decorative thumbnail strip while collapsed; an
     * interactive gallery + Lightbox when expanded.
     */
    images?: TimelineImage[];
    /**
     * "Read more" URL. Rendered as a plain \`<a>\` inside the expanded panel;
     * it never hijacks expand/collapse. Sanitized via \`isSafeHref\`.
     *
     * Contrast with {@link TimelineImage.link}: an image \`link\` *replaces*
     * the image interaction (navigates out, skips the lightbox), whereas an
     * article \`href\` is *supplementary* — a separate anchor that never
     * interferes with expand/collapse or the gallery.
     */
    href?: string;
    /** Read-more link label. @default 'READ MORE' */
    hrefLabel?: string;
  })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`},{name:`unknown`}]},{name:`signature`,type:`object`,raw:`{ kind: 'article' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'article'`,required:!0}}]}}],raw:`Extract<TimelineEntryData, { kind: 'article' }>`},description:``},isExpanded:{required:!0,tsType:{name:`boolean`},description:``},onSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``},children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}}})))()}function et(e,t,n,r){switch(e.kind){case`text`:return(0,P.jsx)(rt,{entry:e,isExpanded:t,onSelect:n,children:r});case`image`:return(0,P.jsx)(Ue,{entry:e,isExpanded:t,onSelect:n});case`gallery`:return(0,P.jsx)(Ye,{entry:e,isExpanded:t,onSelect:n});case`article`:return(0,P.jsx)(Qe,{entry:e,isExpanded:t,onSelect:n,children:r});default:return tt(e)}}function tt(e){throw Error(`TimelineEntryCard: unhandled entry kind: ${JSON.stringify(e)}`)}var nt,P,F,rt;function it(){return(it=t((()=>{nt=e(n(),1),l(),o(),We(),Xe(),$e(),P=a(),F=nt.memo(({entry:e,isSelected:t,isExpanded:n=!1,onSelect:r,footer:i,children:a})=>(0,P.jsxs)(`div`,{className:s(`eidotter-timeline-card`,t&&`eidotter-timeline-card--selected`,n&&`eidotter-timeline-card--expanded`),children:[et(e,n,r,a),i&&(0,P.jsx)(`div`,{className:`eidotter-timeline-card__footer`,children:i})]})),F.displayName=`TimelineEntryCard`,rt=({entry:e,isExpanded:t,onSelect:n,children:r})=>{let i=typeof e.content==`string`,a=e.content!=null;return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(c,{className:`eidotter-timeline-card__trigger`,onPress:()=>n?.(e.id),"aria-expanded":t,children:[(0,P.jsxs)(`div`,{className:`eidotter-timeline-card__header`,children:[e.type&&(0,P.jsx)(`span`,{className:`eidotter-timeline-card__type`,children:e.type.toUpperCase()}),e.tags&&e.tags.length>0&&(0,P.jsx)(`span`,{className:`eidotter-timeline-card__tags`,children:e.tags.map(e=>`#${e}`).join(` `)})]}),(0,P.jsx)(`p`,{className:`eidotter-timeline-card__title`,children:e.title}),!t&&i&&(()=>{let t=String(e.content);return(0,P.jsxs)(`p`,{className:`eidotter-timeline-card__preview`,children:[t.slice(0,80),t.length>80?`...`:``]})})(),r]}),a&&(0,P.jsx)(`div`,{className:`eidotter-timeline-card__body`,children:(0,P.jsx)(`div`,{className:`eidotter-timeline-card__body-inner`,inert:!t||void 0,children:e.content})})]})},F.__docgenInfo={description:"Dispatcher for content-aware timeline entry rendering.\n\nBranches on `entry.kind`:\n - `text`    — trigger + expandable panel with `entry.content`.\n - `image`   — single-image thumbnail → lightbox.\n - `gallery` — thumbnail grid → focused → lightbox.\n - `article` — devlog card: collapsed thumb-strip + summary; expanded\n               gallery + body + read-more link.\n\nThe card chrome (border, hover slide+glow, selected/expanded states)\nlives on the outer `.eidotter-timeline-card` element and applies to all\nkinds.",methods:[],displayName:`TimelineEntryCard`,props:{isExpanded:{defaultValue:{value:`false`,computed:!1},required:!1}}}})))()}var at,I,ot;function st(){return(st=t((()=>{at=e(n(),1),y(),it(),I=a(),ot=at.memo(({buckets:e,selectedEntryId:t,onEntrySelect:n,onBucketClick:r,renderEntry:i})=>(0,I.jsx)(`div`,{className:`timeline-view timeline-view--month`,role:`list`,children:e.map(e=>(0,I.jsxs)(`div`,{className:`timeline-view__bucket timeline-view__bucket--month`,role:`listitem`,children:[(0,I.jsx)(`div`,{className:`timeline-view__node`,children:(0,I.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:e.label,labelPosition:`right`,onClick:()=>r?.(e)})}),(0,I.jsx)(`div`,{className:`timeline-view__content`,children:e.entries.map(e=>{let r=t===e.id,a=()=>(0,I.jsx)(F,{entry:e,isSelected:r,isExpanded:r,onSelect:n});return(0,I.jsx)(at.Fragment,{children:i?i(e,{isExpanded:r,isSelected:r,defaultRender:a}):a()},e.id)})})]},e.periodStart))})),ot.displayName=`MonthView`,ot.__docgenInfo={description:`Month-level zoom view: shows month labels with entry title lists.`,methods:[],displayName:`MonthView`}})))()}var ct,L,lt;function ut(){return(ut=t((()=>{ct=e(n(),1),y(),te(),ne(),it(),L=a(),lt=ct.memo(({buckets:e,selectedEntryId:t,onEntrySelect:n,renderEntry:r})=>(0,L.jsx)(`div`,{className:`timeline-view timeline-view--day`,role:`list`,children:e.map(e=>(0,L.jsxs)(`div`,{className:`timeline-view__bucket timeline-view__bucket--day`,role:`listitem`,children:[(0,L.jsx)(`div`,{className:`timeline-view__node`,children:(0,L.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:e.label,labelPosition:`right`})}),(0,L.jsx)(`div`,{className:`timeline-view__content`,children:e.entries.map(e=>{let i=t===e.id,a=()=>(0,L.jsx)(F,{entry:e,isSelected:i,isExpanded:i,onSelect:n,footer:e.tags&&e.tags.length>0?(0,L.jsx)(ie,{gap:`tight`,"aria-label":`Tags for ${e.title}`,children:e.tags.map(e=>(0,L.jsx)(re,{size:`small`,variant:`outlined`,children:e},e))}):void 0});return(0,L.jsx)(ct.Fragment,{children:r?r(e,{isExpanded:i,isSelected:i,defaultRender:a}):a()},e.id)})})]},e.periodStart))})),lt.displayName=`DayView`,lt.__docgenInfo={description:`Day-level zoom view: shows day labels with entry cards and content preview.`,methods:[],displayName:`DayView`}})))()}var dt,R,ft;function pt(){return(pt=t((()=>{dt=e(n(),1),y(),te(),ne(),u(),it(),Ne(),R=a(),ft=dt.memo(({buckets:e,selectedEntryId:t,onEntrySelect:n,renderEntry:r})=>(0,R.jsx)(`div`,{className:`timeline-view timeline-view--hour`,role:`list`,children:e.map(e=>(0,R.jsxs)(`div`,{className:`timeline-view__bucket timeline-view__bucket--hour`,role:`listitem`,children:[(0,R.jsx)(`div`,{className:`timeline-view__node`,children:(0,R.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:e.label,labelPosition:`right`})}),(0,R.jsx)(`div`,{className:`timeline-view__content`,children:e.entries.map(e=>{let i=t===e.id,a=()=>(0,R.jsxs)(F,{entry:e,isSelected:i,isExpanded:!0,onSelect:n,footer:(0,R.jsxs)(`div`,{className:`timeline-view__entry-footer`,children:[e.tags&&e.tags.length>0&&(0,R.jsx)(ie,{gap:`tight`,"aria-label":`Tags for ${e.title}`,children:e.tags.map(e=>(0,R.jsx)(re,{size:`small`,variant:`outlined`,children:e},e))}),e.type&&(0,R.jsx)(d,{variant:`default`,size:`small`,children:e.type})]}),children:[(0,R.jsx)(`time`,{className:`timeline-view__timestamp`,dateTime:e.date,children:_e(e.date)}),e.kind===`text`&&e.content!==void 0&&(0,R.jsx)(`div`,{className:`timeline-view__entry-content`,children:e.content}),e.kind===`article`&&e.summary!==void 0&&(0,R.jsx)(`div`,{className:`timeline-view__entry-content`,children:e.summary})]});return(0,R.jsx)(dt.Fragment,{children:r?r(e,{isExpanded:!0,isSelected:i,defaultRender:a}):a()},e.id)})})]},e.periodStart))})),ft.displayName=`HourView`,ft.__docgenInfo={description:`Hour-level zoom view: full detail with timestamps and complete content.`,methods:[],displayName:`HourView`}})))()}var mt,ht;function gt(){return(gt=t((()=>{n(),Ve(),st(),ut(),pt(),mt=a(),ht=({zoomLevel:e,buckets:t,selectedEntryId:n,onEntrySelect:r,onBucketClick:i,renderEntry:a})=>{switch(e){case`year`:return(0,mt.jsx)(Be,{buckets:t,onBucketClick:i});case`month`:return(0,mt.jsx)(ot,{buckets:t,selectedEntryId:n,onEntrySelect:r,onBucketClick:i,renderEntry:a});case`day`:return(0,mt.jsx)(lt,{buckets:t,selectedEntryId:n,onEntrySelect:r,renderEntry:a});case`hour`:return(0,mt.jsx)(ft,{buckets:t,selectedEntryId:n,onEntrySelect:r,renderEntry:a});default:return e}},ht.__docgenInfo={description:`View switcher that renders the appropriate zoom level view.`,methods:[],displayName:`TimelineContent`,props:{zoomLevel:{required:!0,tsType:{name:`unknown[number]`,raw:`(typeof ZOOM_LEVELS)[number]`},description:``},buckets:{required:!0,tsType:{name:`unknown`},description:``},selectedEntryId:{required:!0,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},onEntrySelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(entryId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`entryId`}],return:{name:`void`}}},description:``},onBucketClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(bucket: DateBucket) => void`,signature:{arguments:[{type:{name:`DateBucket`},name:`bucket`}],return:{name:`void`}}},description:``},renderEntry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  entry: TimelineEntryData,
  context: TimelineEntryRenderContext,
) => ReactNode`,signature:{arguments:[{type:{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
| (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
| (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })
| (TimelineEntryBase & {
    kind: 'article';
    /** Short plain-text preview shown while collapsed (80-char truncated, like the \`text\` kind). */
    summary?: string;
    /** Full body rendered in the expandable panel. */
    content?: ReactNode;
    /**
     * Hero images: a decorative thumbnail strip while collapsed; an
     * interactive gallery + Lightbox when expanded.
     */
    images?: TimelineImage[];
    /**
     * "Read more" URL. Rendered as a plain \`<a>\` inside the expanded panel;
     * it never hijacks expand/collapse. Sanitized via \`isSafeHref\`.
     *
     * Contrast with {@link TimelineImage.link}: an image \`link\` *replaces*
     * the image interaction (navigates out, skips the lightbox), whereas an
     * article \`href\` is *supplementary* — a separate anchor that never
     * interferes with expand/collapse or the gallery.
     */
    href?: string;
    /** Read-more link label. @default 'READ MORE' */
    hrefLabel?: string;
  })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`},{name:`unknown`}]},name:`entry`},{type:{name:`TimelineEntryRenderContext`},name:`context`}],return:{name:`ReactNode`}}},description:``}}}})))()}var z,B,_t;function vt(){return(vt=t((()=>{z=e(n(),1),o(),y(),it(),B=a(),_t=({entries:e,selectedEntryId:t,onSelect:n,onDeselect:r,renderEntry:i,formatDate:a})=>{let o=e.find(e=>e.id===t)??null,c=(0,z.useRef)(null),l=(0,z.useRef)(null),u=(0,z.useRef)(t);(0,z.useEffect)(()=>{let e=u.current;u.current=t,t&&t!==e?requestAnimationFrame(()=>l.current?.focus()):!t&&e&&requestAnimationFrame(()=>{c.current?.querySelector(`[data-entry-id="${e}"]`)?.focus()})},[t]);let d=(0,z.useCallback)(r=>{if(e.length===0)return;let i=e.findIndex(e=>e.id===t),a=i===-1?r>0?-1:e.length:i;n(e[Math.max(0,Math.min(e.length-1,a+r))].id)},[e,t,n]),f=(0,z.useCallback)(e=>{e.key===`ArrowDown`?(e.preventDefault(),d(1)):e.key===`ArrowUp`?(e.preventDefault(),d(-1)):e.key===`Escape`&&t&&(e.preventDefault(),r())},[d,r,t]);return(0,B.jsxs)(`div`,{className:s(`eidotter-timeline-md`,o&&`eidotter-timeline-md--detail-open`),children:[(0,B.jsx)(`nav`,{ref:c,className:`eidotter-timeline-md__rail`,"aria-label":`Timeline entries`,onKeyDown:f,children:(0,B.jsx)(`ul`,{className:`eidotter-timeline-md__rail-list`,children:e.map(e=>{let r=e.id===t;return(0,B.jsx)(`li`,{className:`eidotter-timeline-md__rail-item`,children:(0,B.jsxs)(`button`,{type:`button`,"data-entry-id":e.id,className:s(`eidotter-timeline-md__rail-button`,r&&`eidotter-timeline-md__rail-button--active`),"aria-current":r?`true`:void 0,onClick:()=>n(e.id),children:[(0,B.jsx)(`span`,{className:`eidotter-timeline-md__rail-node`,"aria-hidden":`true`,children:(0,B.jsx)(b,{shape:`circle`,size:`sm`,variant:`default`,isActive:r})}),(0,B.jsxs)(`span`,{className:`eidotter-timeline-md__rail-text`,children:[(0,B.jsx)(`span`,{className:`eidotter-timeline-md__rail-date`,children:a(e.date)}),(0,B.jsx)(`span`,{className:`eidotter-timeline-md__rail-title`,children:e.title})]})]})},e.id)})})}),(0,B.jsx)(`div`,{ref:l,className:`eidotter-timeline-md__detail`,role:`region`,"aria-label":`Entry detail`,tabIndex:-1,children:o?(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(`button`,{type:`button`,className:`eidotter-timeline-md__back`,onClick:r,children:`‹ BACK`}),(0,B.jsx)(`div`,{className:`eidotter-timeline-md__detail-body`,children:(e=>{let t=()=>(0,B.jsx)(F,{entry:e,isSelected:!0,isExpanded:!0});return i?i(e,{isExpanded:!0,isSelected:!0,defaultRender:t}):t()})(o)},o.id)]}):(0,B.jsxs)(`div`,{className:`eidotter-timeline-md__detail-empty`,role:`status`,children:[(0,B.jsx)(`p`,{children:`C:\\TIMELINE> Select an entry to read.`}),(0,B.jsx)(`p`,{children:`_`})]})})]})},_t.displayName=`MasterDetailLayout`,_t.__docgenInfo={description:`Level-3 "master-detail" timeline layout (DMNC-878).

A split view: a navigable timeline rail (left) plus a detail pane (right)
that renders the selected entry in full. Switching entries swaps the detail
pane without remounting the rail, so rail scroll position is preserved.

Selection is owned by the orchestrator (controlled/uncontrolled via
\`useSelection\`), so the open entry is deep-linkable by consumers. The rail
uses navigation semantics (\`aria-current\`), arrow keys walk entries, and
focus moves into the pane on open and back to the rail on close — without a
focus trap, so both panes stay reachable.`,methods:[],displayName:`MasterDetailLayout`,props:{entries:{required:!0,tsType:{name:`Array`,elements:[{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
| (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
| (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })
| (TimelineEntryBase & {
    kind: 'article';
    /** Short plain-text preview shown while collapsed (80-char truncated, like the \`text\` kind). */
    summary?: string;
    /** Full body rendered in the expandable panel. */
    content?: ReactNode;
    /**
     * Hero images: a decorative thumbnail strip while collapsed; an
     * interactive gallery + Lightbox when expanded.
     */
    images?: TimelineImage[];
    /**
     * "Read more" URL. Rendered as a plain \`<a>\` inside the expanded panel;
     * it never hijacks expand/collapse. Sanitized via \`isSafeHref\`.
     *
     * Contrast with {@link TimelineImage.link}: an image \`link\` *replaces*
     * the image interaction (navigates out, skips the lightbox), whereas an
     * article \`href\` is *supplementary* — a separate anchor that never
     * interferes with expand/collapse or the gallery.
     */
    href?: string;
    /** Read-more link label. @default 'READ MORE' */
    hrefLabel?: string;
  })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`},{name:`unknown`}]}],raw:`TimelineEntryData[]`},description:`Pre-sorted entries (the orchestrator sorts; the rail renders in order).`},selectedEntryId:{required:!0,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`The entry currently filling the detail pane, or null for none.`},onSelect:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:`Open an entry in the detail pane (set semantics).`},onDeselect:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Return to the rail (close the detail pane).`},renderEntry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  entry: TimelineEntryData,
  context: TimelineEntryRenderContext,
) => ReactNode`,signature:{arguments:[{type:{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
| (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
| (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })
| (TimelineEntryBase & {
    kind: 'article';
    /** Short plain-text preview shown while collapsed (80-char truncated, like the \`text\` kind). */
    summary?: string;
    /** Full body rendered in the expandable panel. */
    content?: ReactNode;
    /**
     * Hero images: a decorative thumbnail strip while collapsed; an
     * interactive gallery + Lightbox when expanded.
     */
    images?: TimelineImage[];
    /**
     * "Read more" URL. Rendered as a plain \`<a>\` inside the expanded panel;
     * it never hijacks expand/collapse. Sanitized via \`isSafeHref\`.
     *
     * Contrast with {@link TimelineImage.link}: an image \`link\` *replaces*
     * the image interaction (navigates out, skips the lightbox), whereas an
     * article \`href\` is *supplementary* — a separate anchor that never
     * interferes with expand/collapse or the gallery.
     */
    href?: string;
    /** Read-more link label. @default 'READ MORE' */
    hrefLabel?: string;
  })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`},{name:`unknown`}]},name:`entry`},{type:{name:`TimelineEntryRenderContext`},name:`context`}],return:{name:`ReactNode`}}},description:`Optional pluggable entry renderer, used for the detail body.`},formatDate:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(iso: string) => string`,signature:{arguments:[{type:{name:`string`},name:`iso`}],return:{name:`string`}}},description:`Date formatter shared with the orchestrator.`}}}})))()}var V,H,yt;function bt(){return(bt=t((()=>{V=e(n(),1),o(),se(),le(),Ne(),Fe(),Re(),gt(),y(),it(),vt(),H=a(),yt=({entries:e,mode:t=`interactive`,zoomLevel:n,defaultZoomLevel:r=`month`,onZoomChange:i,selectedEntryId:a,defaultSelectedEntryId:o,onSelectEntry:c,sortOrder:l=`desc`,scrollToZoom:u=!0,keyboardShortcuts:d=!0,renderEntry:f,pageSize:ee=10,onLoadMore:p,...m})=>{let h=t===`static`,g=t===`feed`,_=h||g,v=t===`master-detail`,te=(0,V.useRef)(null),ne=(0,V.useRef)(null),[re,ie]=(0,V.useState)(``),{zoomLevel:y,canZoomIn:x,canZoomOut:ae,breadcrumbs:S,currentPeriod:se,isDrillDownEnabled:C,drillDown:le,drillUp:w,reset:ue}=oe({zoomLevel:n,defaultZoomLevel:r,onZoomChange:i}),{selectedEntryId:de,select:fe,toggle:pe,deselect:me}=ce({selectedEntryId:a,defaultSelectedEntryId:o,onSelectEntry:c}),he=(0,V.useMemo)(()=>ke(e,y,l),[e,y,l]),ge=S.length>0?[`year`,`month`,`day`,`hour`][S.length-1]:null,_e=(0,V.useMemo)(()=>se&&ge?Oe(he,se,ge):he,[he,se,ge]),ve=(0,V.useCallback)(e=>{x&&(le(e.periodStart,e.label),ie(`Showing ${y===`year`?`months`:y===`month`?`days`:`hours`} in ${e.label}`))},[x,le,y]),ye=(0,V.useCallback)(()=>{_e.length>0&&ve(_e[0])},[_e,ve]);(0,V.useEffect)(()=>{if(_||v||!u)return;let e=te.current;if(!e)return;let t=null,n=e=>{(e.ctrlKey||e.metaKey)&&(e.preventDefault(),t===null&&(t=requestAnimationFrame(()=>{e.deltaY>0&&w(),t=null})))};return e.addEventListener(`wheel`,n,{passive:!1}),()=>{e.removeEventListener(`wheel`,n),t!==null&&cancelAnimationFrame(t)}},[_,v,u,C,x,w]),(0,V.useEffect)(()=>{if(_||v||!d)return;let e=e=>{if(!te.current?.contains(document.activeElement)&&document.activeElement!==te.current)return;let t=e.ctrlKey||e.metaKey;t&&(e.key===`=`||e.key===`+`)?(e.preventDefault(),ye()):t&&e.key===`-`?(e.preventDefault(),w()):t&&e.key===`0`?(e.preventDefault(),ue(),ie(`Showing all years`)):e.key===`Escape`&&(e.preventDefault(),me())};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[_,v,d,ye,w,ue,me]);let be=(0,V.useCallback)(e=>ve(e),[ve]),xe=(0,V.useRef)(S.length);(0,V.useEffect)(()=>{if(S.length!==xe.current){xe.current=S.length;let e=ne.current?.querySelector(`.eidotter-timeline-card__trigger, .timeline-view__bucket-button, .eidotter-timeline-node[role="button"]`);e&&requestAnimationFrame(()=>e.focus())}},[S.length]);let T=(0,V.useMemo)(()=>!_&&!v?e:[...e].sort((e,t)=>{let n=e.date.localeCompare(t.date);return l===`desc`?-n:n}),[_,v,e,l]),E=Math.max(1,ee),[D,Se]=(0,V.useState)(E);(0,V.useEffect)(()=>{g&&Se(e=>{let t=T.length;return t===0?E:e>t?Math.max(E,t):e})},[g,E,T.length]);let Ce=(0,V.useMemo)(()=>g?T.slice(0,D):T,[g,T,D]),we=g&&D<T.length,Te=(0,V.useCallback)(()=>{let e=Math.min(D+E,T.length);e<=D||(Se(e),p?.(e))},[D,E,T.length,p]),Ee=(0,V.useMemo)(()=>new Intl.DateTimeFormat(`en-US`,{year:`numeric`,month:`short`,day:`numeric`}),[]),De=e=>{try{return Ee.format(new Date(e))}catch{return e}};return(0,H.jsxs)(`div`,{ref:te,...m,className:s(`font-dos text-dos-text-brand p-4`,`eidotter-timeline-container`,h&&`eidotter-timeline-container--static`,g&&`eidotter-timeline-container--feed`,v&&`eidotter-timeline-container--master-detail`,m.className),role:`region`,"aria-label":m[`aria-label`]??`Timeline`,tabIndex:_||v?void 0:0,children:[(0,H.jsx)(`div`,{className:`sr-only`,role:`status`,"aria-live":`polite`,"aria-atomic":`true`,children:re}),!_&&!v&&(0,H.jsx)(Pe,{zoomLevel:y,canZoomIn:x,canZoomOut:ae,onZoomIn:ye,onZoomOut:w,onReset:ue,breadcrumbs:C?S:[],onBreadcrumbClick:e=>{let t=S.length-1-e;for(let e=0;e<t;e++)w()}}),(0,H.jsx)(`div`,{ref:ne,children:e.length===0?(0,H.jsxs)(`div`,{className:`eidotter-timeline-container__empty`,role:`status`,children:[(0,H.jsx)(`p`,{children:`C:\\TIMELINE> No entries found.`}),(0,H.jsx)(`p`,{children:`_`})]}):h?(0,H.jsx)(Le,{children:(0,H.jsx)(`div`,{className:`eidotter-timeline-container__static`,role:`list`,"aria-label":`Timeline`,children:T.map(e=>{let t=()=>(0,H.jsx)(F,{entry:e,isSelected:!1,isExpanded:!0});return(0,H.jsxs)(`div`,{className:`eidotter-timeline-container__static-entry`,role:`listitem`,children:[(0,H.jsx)(`div`,{className:`timeline-view__node`,children:(0,H.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:De(e.date),labelPosition:`right`})}),f?f(e,{isExpanded:!0,isSelected:!1,defaultRender:t}):t()]},e.id)})})}):g?(0,H.jsxs)(Le,{children:[(0,H.jsx)(`div`,{className:`eidotter-timeline-container__feed`,role:`list`,"aria-label":`Timeline`,children:Ce.map(e=>{let t=de===e.id,n=()=>(0,H.jsx)(F,{entry:e,isSelected:t,isExpanded:t,onSelect:pe});return(0,H.jsxs)(`div`,{className:`eidotter-timeline-container__feed-entry`,role:`listitem`,children:[(0,H.jsx)(`div`,{className:`timeline-view__node`,children:(0,H.jsx)(b,{shape:`circle`,size:`medium`,variant:`default`,label:De(e.date),labelPosition:`right`})}),f?f(e,{isExpanded:t,isSelected:t,defaultRender:n}):n()]},e.id)})}),we&&(0,H.jsx)(`button`,{type:`button`,className:`eidotter-timeline-container__load-more`,onClick:Te,"aria-label":`Load more entries (showing ${D} of ${T.length})`,children:`LOAD MORE...`})]}):v?(0,H.jsx)(_t,{entries:T,selectedEntryId:de,onSelect:fe,onDeselect:me,renderEntry:f,formatDate:De}):_e.length===0&&se?(0,H.jsx)(Le,{children:(0,H.jsxs)(`div`,{className:`eidotter-timeline-container__empty`,role:`status`,children:[(0,H.jsxs)(`p`,{children:[`C:\\TIMELINE> No entries in `,S[S.length-1]?.label??`this period`,`.`]}),(0,H.jsx)(`p`,{children:`_`})]})}):(0,H.jsx)(Le,{children:(0,H.jsx)(ht,{zoomLevel:y,buckets:_e,selectedEntryId:de,onEntrySelect:pe,onBucketClick:be,renderEntry:f})})})]})},yt.__docgenInfo={description:`TimelineContainer - Interactive multi-level zoom timeline

A composite timeline component with 4 zoom levels (year, month, day, hour),
entry selection, keyboard shortcuts, scroll-to-zoom, and drill-down navigation.
Uses DOS/CGA aesthetic with eidotter primitives.

Supports both controlled and uncontrolled patterns for zoom and selection.
When zoom is uncontrolled, clicking a bucket drills down into that time period.`,methods:[],displayName:`TimelineContainer`,props:{entries:{required:!0,tsType:{name:`Array`,elements:[{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
| (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
| (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })
| (TimelineEntryBase & {
    kind: 'article';
    /** Short plain-text preview shown while collapsed (80-char truncated, like the \`text\` kind). */
    summary?: string;
    /** Full body rendered in the expandable panel. */
    content?: ReactNode;
    /**
     * Hero images: a decorative thumbnail strip while collapsed; an
     * interactive gallery + Lightbox when expanded.
     */
    images?: TimelineImage[];
    /**
     * "Read more" URL. Rendered as a plain \`<a>\` inside the expanded panel;
     * it never hijacks expand/collapse. Sanitized via \`isSafeHref\`.
     *
     * Contrast with {@link TimelineImage.link}: an image \`link\` *replaces*
     * the image interaction (navigates out, skips the lightbox), whereas an
     * article \`href\` is *supplementary* — a separate anchor that never
     * interferes with expand/collapse or the gallery.
     */
    href?: string;
    /** Read-more link label. @default 'READ MORE' */
    hrefLabel?: string;
  })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`},{name:`unknown`}]}],raw:`TimelineEntryData[]`},description:`Timeline entries to display`},mode:{required:!1,tsType:{name:`union`,raw:`'interactive' | 'static' | 'feed' | 'master-detail'`,elements:[{name:`literal`,value:`'interactive'`},{name:`literal`,value:`'static'`},{name:`literal`,value:`'feed'`},{name:`literal`,value:`'master-detail'`}]},description:`Display mode
- "interactive" (default): zoom controls, selection, keyboard shortcuts
- "static": read-only vertical feed of always-expanded entries (replaces TimelineList)
- "feed": paginated vertical list with collapsed-by-default entries that
  expand on selection. Renders a DOS-style "LOAD MORE..." button while
  more entries are available. No zoom controls.
- "master-detail": level-3 split view — a navigable timeline rail plus a
  detail pane that renders the selected entry in full (DMNC-878). The open
  entry is the \`selectedEntryId\`, so it is deep-linkable. No zoom controls.
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
| (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })
| (TimelineEntryBase & {
    kind: 'article';
    /** Short plain-text preview shown while collapsed (80-char truncated, like the \`text\` kind). */
    summary?: string;
    /** Full body rendered in the expandable panel. */
    content?: ReactNode;
    /**
     * Hero images: a decorative thumbnail strip while collapsed; an
     * interactive gallery + Lightbox when expanded.
     */
    images?: TimelineImage[];
    /**
     * "Read more" URL. Rendered as a plain \`<a>\` inside the expanded panel;
     * it never hijacks expand/collapse. Sanitized via \`isSafeHref\`.
     *
     * Contrast with {@link TimelineImage.link}: an image \`link\` *replaces*
     * the image interaction (navigates out, skips the lightbox), whereas an
     * article \`href\` is *supplementary* — a separate anchor that never
     * interferes with expand/collapse or the gallery.
     */
    href?: string;
    /** Read-more link label. @default 'READ MORE' */
    hrefLabel?: string;
  })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`},{name:`unknown`}]},name:`entry`},{type:{name:`TimelineEntryRenderContext`},name:`context`}],return:{name:`ReactNode`}}},description:`Pluggable entry renderer. When provided, this is called for every entry
in every zoom-level view (and in static / feed modes) instead of rendering
the built-in \`TimelineEntryCard\`. Return \`context.defaultRender()\` to keep
the default card for some entries while customising others.

Use this to render different card UIs per entry type — blog posts,
photos, financial records, etc.`},pageSize:{required:!1,tsType:{name:`number`},description:`Number of entries to show per page in feed mode. Ignored for other modes.
@default 10`,defaultValue:{value:`10`,computed:!1}},onLoadMore:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(visibleCount: number) => void`,signature:{arguments:[{type:{name:`number`},name:`visibleCount`}],return:{name:`void`}}},description:`Fired in feed mode after the user clicks "LOAD MORE…", with the new total
number of visible entries. Use this to fetch the next batch from a backend
and append to \`entries\`, or for analytics.`}}}})))()}var xt,U,W,St,Ct,wt,Tt,Et,Dt,Ot,kt,G,At,K,jt,Mt,q,Nt,Pt,Ft,It,Lt,Rt,zt,J,Y,X,Bt,Vt,Ht,Ut,Z,Q,$,Wt,Gt;function Kt(){return(Kt=t((()=>{xt=e(n(),1),bt(),r(),U=a(),W=[{id:`1`,type:`event`,date:`2024-01-15T10:30:00Z`,title:`Project Kickoff`,kind:`text`,content:`Initial planning session for the DOS revival project`,tags:[`planning`,`milestone`]},{id:`2`,type:`milestone`,date:`2024-02-20T14:00:00Z`,title:`Alpha Release`,kind:`text`,content:`First working prototype with CGA color palette`,tags:[`release`]},{id:`3`,type:`event`,date:`2024-03-10T09:00:00Z`,title:`Design Review`,kind:`text`,content:`Reviewed all component designs against DOS aesthetic guidelines`,tags:[`design`,`review`]},{id:`4`,type:`project`,date:`2024-06-01T11:00:00Z`,title:`Beta Launch`,kind:`text`,content:`Public beta of the eiDotter design system`,tags:[`release`,`milestone`]},{id:`5`,type:`event`,date:`2024-06-15T16:30:00Z`,title:`Community Feedback`,kind:`text`,content:`Incorporated feedback from early adopters`,tags:[`community`]},{id:`6`,type:`milestone`,date:`2025-01-05T08:00:00Z`,title:`v1.0 Stable`,kind:`text`,content:`Production-ready release with full component library`,tags:[`release`,`milestone`]},{id:`7`,type:`event`,date:`2025-03-20T13:45:00Z`,title:`Token Pipeline Upgrade`,kind:`text`,content:`Migrated to Style Dictionary v5 with DTCG format`,tags:[`infrastructure`]}],St={title:`Components/TimelineContainer`,component:yt,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:i.TimelineContainer},tags:[`autodocs`],argTypes:{defaultZoomLevel:{control:`select`,options:[`year`,`month`,`day`,`hour`]},sortOrder:{control:`select`,options:[`asc`,`desc`]},scrollToZoom:{control:`boolean`},keyboardShortcuts:{control:`boolean`}}},Ct={args:{entries:W}},wt={args:{entries:W,defaultZoomLevel:`year`}},Tt={args:{entries:W,defaultZoomLevel:`month`}},Et={args:{entries:W,defaultZoomLevel:`day`}},Dt={args:{entries:W,defaultZoomLevel:`hour`}},Ot={args:{entries:W,mode:`static`}},kt=Array.from({length:25},(e,t)=>({id:`feed-${t+1}`,type:[`event`,`milestone`,`project`][t%3],date:new Date(2025,11-t%12,15-t%14,10+t%8,0).toISOString(),title:`Update #${t+1}`,kind:`text`,content:`Body copy for update #${t+1}. Sample feed entry to demonstrate paginated rendering with collapse / expand on selection.`,tags:t%2==0?[`weekly`]:[`announcement`]})),G={args:{entries:kt,mode:`feed`,pageSize:5}},At=()=>{let[e,t]=(0,xt.useState)(0);return(0,U.jsxs)(`div`,{children:[(0,U.jsxs)(`div`,{style:{color:`var(--color-cga-amber)`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`var(--typography-font-size-text-sm)`,marginBottom:`var(--spacing-4)`},children:[`onLoadMore fired: `,e,` `,e===1?`time`:`times`]}),(0,U.jsx)(yt,{entries:kt,mode:`feed`,pageSize:5,onLoadMore:()=>t(e=>e+1)})]})},K={render:()=>(0,U.jsx)(At,{})},jt={args:{entries:W,defaultZoomLevel:`year`,sortOrder:`asc`}},Mt={args:{entries:[]}},q={args:{entries:W},parameters:{backgrounds:{default:`light`,values:[{name:`light`,value:`#FFE8A8`}]}}},Nt={args:{entries:[W[0]],defaultZoomLevel:`day`}},Pt={args:{entries:W,defaultZoomLevel:`month`},globals:{viewport:{value:`phone375`}}},Ft={args:{entries:W,defaultZoomLevel:`month`},globals:{viewport:{value:`tablet768`}}},It={args:{entries:W,defaultZoomLevel:`day`},globals:{viewport:{value:`ultrawide`}}},Lt=()=>{let[e,t]=(0,xt.useState)(`month`),[n,r]=(0,xt.useState)(null);return(0,U.jsxs)(`div`,{children:[(0,U.jsxs)(`div`,{style:{color:`var(--color-cga-amber)`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`var(--typography-font-size-text-sm)`,marginBottom:`var(--spacing-4)`},children:[`Zoom: `,e,` | Selected: `,n??`none`]}),(0,U.jsx)(yt,{entries:W,zoomLevel:e,onZoomChange:t,selectedEntryId:n,onSelectEntry:r})]})},Rt={render:()=>(0,U.jsx)(Lt,{})},zt=()=>{let[e,t]=(0,xt.useState)(null);return(0,U.jsxs)(`div`,{children:[(0,U.jsxs)(`div`,{style:{color:`var(--color-semantic-text-brand)`,fontFamily:`var(--typography-font-family-primary)`,fontSize:`var(--typography-font-size-text-sm)`,marginBottom:`var(--spacing-4)`},children:[`Open entry: `,e??`none`," — deep-linkable via `selectedEntryId`"]}),(0,U.jsx)(yt,{entries:W,mode:`master-detail`,selectedEntryId:e,onSelectEntry:t})]})},J={render:()=>(0,U.jsx)(zt,{})},Y={args:{entries:W,mode:`master-detail`,defaultSelectedEntryId:`2`},globals:{viewport:{value:`phone375`}}},X={args:{entries:W,defaultZoomLevel:`month`,renderEntry:(e,t)=>e.type===`milestone`?(0,U.jsxs)(`div`,{style:{border:`2px solid var(--color-cga-amber)`,borderRadius:`var(--border-radius-base)`,padding:`var(--spacing-3)`,marginBottom:`var(--spacing-2)`,background:`var(--color-semantic-background-secondary)`,boxShadow:t.isSelected?`var(--shadow-glow-md)`:`none`},children:[(0,U.jsx)(`div`,{style:{fontSize:`var(--typography-font-size-text-xs)`,color:`var(--color-semantic-text-muted)`,textTransform:`uppercase`,letterSpacing:`0.1em`,marginBottom:`var(--spacing-1)`},children:`★ MILESTONE`}),(0,U.jsx)(`div`,{style:{fontSize:`var(--typography-font-size-text-md)`,color:`var(--color-cga-amber)`},children:e.title})]}):t.defaultRender()}},Bt={args:{entries:[{id:`t1`,date:`2024-03-01`,title:`Text entry one`,kind:`text`,content:`Inline body text that expands when selected.`},{id:`t2`,date:`2024-03-02`,title:`Text entry two`,kind:`text`,content:`Second one.`}],mode:`static`}},Vt={args:{entries:[{id:`i1`,date:`2024-03-01`,title:`Single image entry`,kind:`image`,image:{src:`https://placehold.co/800x600/000/ffb000?text=ONE`,alt:`One`}},{id:`i2`,date:`2024-03-02`,title:`Linked image entry`,kind:`image`,image:{src:`https://placehold.co/800x600/000/ffb000?text=TWO`,alt:`Two`,link:`https://example.com`}}],mode:`static`}},Ht={args:{entries:[{id:`g1`,date:`2024-03-01`,title:`Gallery entry`,kind:`gallery`,images:[{src:`https://placehold.co/800x600/000/ffb000?text=ONE`,alt:`One`,caption:`First`},{src:`https://placehold.co/800x600/000/ffb000?text=TWO`,alt:`Two`},{src:`https://placehold.co/800x600/000/ffb000?text=THREE`,alt:`Three`,caption:`Third`},{src:`https://placehold.co/800x600/000/ffb000?text=FOUR`,alt:`Four`}]}],mode:`static`}},Ut=[{id:`ar1`,type:`project`,date:`2026-06-10T09:00:00Z`,title:`Devlog: CRT boot sequence`,kind:`article`,tags:[`devlog`,`retro-effects`],summary:`Shipping the one-time CGA monitor turn-on that plays on first load across the portfolio.`,images:[{src:`https://placehold.co/800x600/000/ffb000?text=BOOT+1`,alt:`Boot frame — ignition line`,caption:`Ignition line`},{src:`https://placehold.co/800x600/000/ffb000?text=BOOT+2`,alt:`Boot frame — raster opens`,caption:`Raster opens`},{src:`https://placehold.co/800x600/000/ffb000?text=BOOT+3`,alt:`Boot frame — phosphor wash`},{src:`https://placehold.co/800x600/000/ffb000?text=BOOT+4`,alt:`Boot frame — settle`},{src:`https://placehold.co/800x600/000/ffb000?text=BOOT+5`,alt:`Boot frame — steady`},{src:`https://placehold.co/800x600/000/ffb000?text=BOOT+6`,alt:`Boot frame — done`}],content:(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`p`,{children:`The boot sequence opens with a full-viewport blackout that ships in the server HTML, so the page is never visible before the turn-on — the animation is the reveal.`}),(0,U.jsx)(`p`,{children:`Compositor-only, skipped under reduced motion, and gated to once per tab via sessionStorage.`})]}),href:`https://dmnc.tech/log/crt-boot`},{id:`ar2`,type:`event`,date:`2026-06-20T14:00:00Z`,title:`Devlog: two-tier typography`,kind:`article`,tags:[`devlog`,`typography`],summary:`Splitting the display tier (Perfect DOS VGA 437) from a body tier (JetBrains Mono Nerd Font).`,images:[{src:`https://placehold.co/800x600/000/ffb000?text=TYPE+1`,alt:`Display specimen`},{src:`https://placehold.co/800x600/000/ffb000?text=TYPE+2`,alt:`Body specimen`}],content:(0,U.jsx)(`p`,{children:`Body text now supports real weights 400–700 while headings stay single-weight and pixel-perfect.`}),href:`https://dmnc.tech/log/two-tier-type`,hrefLabel:`READ THE WRITE-UP`},{id:`ar3`,type:`milestone`,date:`2026-07-01T10:00:00Z`,title:`Devlog: a short text-only note`,kind:`article`,tags:[`devlog`],summary:`A text-only devlog entry with no hero images — just a summary, body, and a permalink.`,content:(0,U.jsx)(`p`,{children:`Sometimes an entry is just prose. The thumbnail strip and gallery simply do not render.`}),href:`https://dmnc.tech/log/short-note`}],Z={args:{entries:Ut,defaultZoomLevel:`hour`}},Q={args:{entries:Ut,mode:`feed`,pageSize:2}},$={args:{entries:Ut,mode:`static`}},Wt={args:{entries:[{id:`ar-safe`,type:`project`,date:`2026-07-02T09:00:00Z`,title:`Devlog: safe permalink`,kind:`article`,tags:[`devlog`],summary:`An https permalink passes isSafeHref, so the read-more anchor renders.`,content:(0,U.jsx)(`p`,{children:`This entry has an ordinary https permalink — the anchor below is rendered.`}),href:`https://dmnc.tech/log/safe-permalink`},{id:`ar-unsafe`,type:`event`,date:`2026-07-03T09:00:00Z`,title:`Devlog: unsafe permalink (dropped)`,kind:`article`,tags:[`devlog`,`security`],summary:`A javascript: href fails isSafeHref — the entry renders with no anchor at all.`,content:(0,U.jsx)(`p`,{children:`This entry was given a javascript: URL. Nothing is rendered in the anchor slot — no disabled link, no # fallback.`}),href:`javascript:alert(1)`}],mode:`static`}},Gt=`Default.YearView.MonthView.DayView.HourView.StaticMode.FeedMode.FeedModeWithOnLoadMore.Ascending.Empty.OnLightBackdrop.SingleEntry.Mobile.Tablet.Ultrawide.Controlled.MasterDetail.MasterDetailMobile.CustomRenderEntry.TextEntries.ImageEntries.GalleryEntries.ArticleEntries.ArticleFeed.ArticleStatic.ArticleUnsafeHref`.split(`.`),Ct.parameters={...Ct.parameters,docs:{...Ct.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries
  }
}`,...Ct.parameters?.docs?.source}}},wt.parameters={...wt.parameters,docs:{...wt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'year'
  }
}`,...wt.parameters?.docs?.source}}},Tt.parameters={...Tt.parameters,docs:{...Tt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'month'
  }
}`,...Tt.parameters?.docs?.source}}},Et.parameters={...Et.parameters,docs:{...Et.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'day'
  }
}`,...Et.parameters?.docs?.source}}},Dt.parameters={...Dt.parameters,docs:{...Dt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'hour'
  }
}`,...Dt.parameters?.docs?.source}}},Ot.parameters={...Ot.parameters,docs:{...Ot.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    mode: 'static'
  }
}`,...Ot.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    entries: feedEntries,
    mode: 'feed',
    pageSize: 5
  }
}`,...G.parameters?.docs?.source},description:{story:`Feed mode: paginated vertical list, collapsed-by-default with click-to-expand
via selection, and a DOS-styled "LOAD MORE..." button while more entries are
available. No zoom controls. Use this when you want a Twitter / changelog-
style read of a single chronological list rather than a multi-zoom timeline.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <FeedModeOnLoadMoreExample />
}`,...K.parameters?.docs?.source},description:{story:"`onLoadMore` fires after each LOAD MORE click with the new visible count.\nUse it to trigger backend fetches and append to `entries`, or for analytics.",...K.parameters?.docs?.description}}},jt.parameters={...jt.parameters,docs:{...jt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'year',
    sortOrder: 'asc'
  }
}`,...jt.parameters?.docs?.source}}},Mt.parameters={...Mt.parameters,docs:{...Mt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: []
  }
}`,...Mt.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source},description:{story:"Verifies that TimelineContainer does not paint its own background.\nThe component renders against a light backdrop (overridden via\nStorybook's `backgrounds` parameter) — if a `bg-dos-bg-primary`\nregression slips back in, this story will show a black box.",...q.parameters?.docs?.description}}},Nt.parameters={...Nt.parameters,docs:{...Nt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: [sampleEntries[0]],
    defaultZoomLevel: 'day'
  }
}`,...Nt.parameters?.docs?.source}}},Pt.parameters={...Pt.parameters,docs:{...Pt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'month'
  },
  globals: {
    viewport: {
      value: 'phone375'
    }
  }
}`,...Pt.parameters?.docs?.source}}},Ft.parameters={...Ft.parameters,docs:{...Ft.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'month'
  },
  globals: {
    viewport: {
      value: 'tablet768'
    }
  }
}`,...Ft.parameters?.docs?.source}}},It.parameters={...It.parameters,docs:{...It.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'day'
  },
  globals: {
    viewport: {
      value: 'ultrawide'
    }
  }
}`,...It.parameters?.docs?.source}}},Rt.parameters={...Rt.parameters,docs:{...Rt.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledExample />
}`,...Rt.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <MasterDetailExample />
}`,...J.parameters?.docs?.source},description:{story:`Level-3 master-detail split view (DMNC-878): the timeline becomes a navigable
rail and the selected entry fills the detail pane, swapping without losing
rail position. The open entry is the controlled \`selectedEntryId\`, so it is
deep-linkable — wire it to your router. Arrow keys walk entries; Escape (or
the mobile BACK button) returns to the rail.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    entries: sampleEntries,
    mode: 'master-detail',
    defaultSelectedEntryId: '2'
  },
  globals: {
    viewport: {
      value: 'phone375'
    }
  }
}`,...Y.parameters?.docs?.source},description:{story:`Master-detail on a narrow viewport collapses to one pane at a time: the rail,
then a full-screen detail with a BACK button (container-query driven).`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
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
        color: 'var(--color-semantic-text-muted)',
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
}`,...X.parameters?.docs?.source},description:{story:"`renderEntry` lets consumers swap the default `TimelineEntryCard` for any\ncustom node — useful for blog posts, photos, or domain-specific layouts.\n\nThe render context exposes `defaultRender()` so you can opt in per-entry:\ncustomise some entries while letting the rest fall through to the default\ncard. Selection and expansion state are passed through unchanged.",...X.parameters?.docs?.description}}},Bt.parameters={...Bt.parameters,docs:{...Bt.parameters?.docs,source:{originalSource:`{
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
}`,...Bt.parameters?.docs?.source}}},Vt.parameters={...Vt.parameters,docs:{...Vt.parameters?.docs,source:{originalSource:`{
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
}`,...Vt.parameters?.docs?.source}}},Ht.parameters={...Ht.parameters,docs:{...Ht.parameters?.docs,source:{originalSource:`{
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
}`,...Ht.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    entries: articleEntries,
    defaultZoomLevel: 'hour'
  }
}`,...Z.parameters?.docs?.source},description:{story:`Interactive mode at hour zoom — cards expand in place; collapsed cards show
the thumb strip + summary.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    entries: articleEntries,
    mode: 'feed',
    pageSize: 2
  }
}`,...Q.parameters?.docs?.source},description:{story:`Feed mode — collapsed-by-default devlog list with pagination.`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    entries: articleEntries,
    mode: 'static'
  }
}`,...$.parameters?.docs?.source},description:{story:`Static mode — every article permanently expanded (gallery + body + read-more).`,...$.parameters?.docs?.description}}},Wt.parameters={...Wt.parameters,docs:{...Wt.parameters?.docs,source:{originalSource:`{
  args: {
    entries: [{
      id: 'ar-safe',
      type: 'project',
      date: '2026-07-02T09:00:00Z',
      title: 'Devlog: safe permalink',
      kind: 'article',
      tags: ['devlog'],
      summary: 'An https permalink passes isSafeHref, so the read-more anchor renders.',
      content: <p>This entry has an ordinary https permalink — the anchor below is rendered.</p>,
      href: 'https://dmnc.tech/log/safe-permalink'
    }, {
      id: 'ar-unsafe',
      type: 'event',
      date: '2026-07-03T09:00:00Z',
      title: 'Devlog: unsafe permalink (dropped)',
      kind: 'article',
      tags: ['devlog', 'security'],
      summary: 'A javascript: href fails isSafeHref — the entry renders with no anchor at all.',
      content: <p>This entry was given a javascript: URL. Nothing is rendered in the anchor slot — no disabled link, no # fallback.</p>,
      href: 'javascript:alert(1)'
    }],
    mode: 'static'
  }
}`,...Wt.parameters?.docs?.source},description:{story:'Unsafe `href` schemes (`javascript:` etc.) fail `isSafeHref` and render NO\nread-more anchor at all — not a disabled link, not a `#` fallback. Shown\nexpanded (static mode) next to a safe-href entry for contrast: only the\nfirst entry gets its "READ MORE →".',...Wt.parameters?.docs?.description}}}})))()}Kt();export{Z as ArticleEntries,Q as ArticleFeed,$ as ArticleStatic,Wt as ArticleUnsafeHref,jt as Ascending,Rt as Controlled,X as CustomRenderEntry,Et as DayView,Ct as Default,Mt as Empty,G as FeedMode,K as FeedModeWithOnLoadMore,Ht as GalleryEntries,Dt as HourView,Vt as ImageEntries,J as MasterDetail,Y as MasterDetailMobile,Pt as Mobile,Tt as MonthView,q as OnLightBackdrop,Nt as SingleEntry,Ot as StaticMode,Ft as Tablet,Bt as TextEntries,It as Ultrawide,wt as YearView,Gt as __namedExportsOrder,St as default};