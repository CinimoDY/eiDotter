import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./cn-CHNjZLmO.js";import{n as o,t as s}from"./isSafeHref-C3uNgdiy.js";function c(e){return e.kind===`article`?e.href:void 0}function l({entries:e,categories:t,categoryOf:n=p,activeCategory:r,defaultCategory:i=null,onCategoryChange:s,linkComponent:l,className:m,...h}){let g=l??`a`,_=r!==void 0,[v,y]=(0,u.useState)(i),b=_?r:v,x=e=>{_||y(e),s?.(e)},S=(0,u.useMemo)(()=>{let e=new Map;return t?.forEach(t=>e.set(t.key,t.color)),e},[t]),C=(0,u.useMemo)(()=>new Intl.DateTimeFormat(`en-US`,{year:`numeric`,month:`short`,day:`numeric`}),[]),w=e=>{try{return C.format(new Date(e))}catch{return e}},T=(0,u.useMemo)(()=>b?e.filter(e=>n(e)===b):e,[b,e,n]);return(0,d.jsxs)(`section`,{className:a(`eidotter-feed font-dos`,m),...h,children:[t&&t.length>0&&(0,d.jsxs)(`div`,{className:`eidotter-feed__filter`,role:`group`,"aria-label":`Filter by category`,children:[(0,d.jsxs)(`button`,{type:`button`,className:a(`eidotter-feed__chip`,b===null&&`eidotter-feed__chip--active`),"aria-pressed":b===null,onClick:()=>x(null),children:[`all`,b!==null&&(0,d.jsxs)(`span`,{className:`eidotter-feed__count`,children:[` · `,T.length,` of `,e.length]})]}),t.map(e=>(0,d.jsxs)(`button`,{type:`button`,className:a(`eidotter-feed__chip`,b===e.key&&`eidotter-feed__chip--active`),"aria-pressed":b===e.key,onClick:()=>x(e.key),style:e.color?{"--eidotter-feed-chip":e.color}:void 0,children:[(0,d.jsx)(`span`,{className:`eidotter-feed__chip-dot`,"aria-hidden":`true`}),e.label]},e.key))]}),(0,d.jsx)(`ol`,{className:`eidotter-feed__list`,"aria-label":h[`aria-label`]??`Timeline feed`,children:T.map(e=>{let t=n(e),r=t?S.get(t):void 0,i=c(e),a=i&&o(i)?i:void 0,s=e.type?f[e.type]:void 0;return(0,d.jsxs)(`li`,{className:`eidotter-feed__row`,children:[(0,d.jsx)(`span`,{className:`eidotter-feed__dot`,"aria-hidden":`true`,style:r?{"--eidotter-feed-dot":r}:void 0}),(0,d.jsx)(`time`,{className:`eidotter-feed__date`,dateTime:e.date,children:w(e.date)}),(0,d.jsx)(`span`,{className:`eidotter-feed__title`,children:a?(0,d.jsx)(g,{href:a,className:`eidotter-feed__title-link`,children:e.title}):e.title}),s&&(0,d.jsx)(`span`,{className:`eidotter-feed__kind`,children:s})]},e.id)})})]})}var u,d,f,p;function m(){return(m=t((()=>{u=e(n(),1),i(),s(),d=r(),f={milestone:`milestone`,project:`project`,event:`event`},p=e=>e.tags?.[0],l.__docgenInfo={description:`TimelineFeed — a dense, product-grade feed (the "J" layout): each row is a
category dot · neutral date · title · a delicate outlined kind-tag, threaded
by a thin amber spine. An optional category chip row culls the list
("navigation becomes a course through time"). Amber-mono; category colour
lives only in the small dots + the active chip.

Presentational — shares the \`TimelineEntryData\` model with TimelineContainer;
the consumer owns ordering and data.`,methods:[],displayName:`TimelineFeed`,props:{entries:{required:!0,tsType:{name:`Array`,elements:[{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
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
  })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`},{name:`unknown`}]}],raw:`TimelineEntryData[]`},description:`Entries to list, newest-first is the consumer's responsibility.`},categories:{required:!1,tsType:{name:`Array`,elements:[{name:`TimelineCategory`}],raw:`TimelineCategory[]`},description:`Categories for the filter chip row + dot colours. Omit to hide the filter.`},categoryOf:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(entry: TimelineEntryData) => string | undefined`,signature:{arguments:[{type:{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
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
  })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`},{name:`unknown`}]},name:`entry`}],return:{name:`union`,raw:`string | undefined`,elements:[{name:`string`},{name:`undefined`}]}}},description:"Resolve an entry's category key. Default: `entry.tags?.[0]`.",defaultValue:{value:`(entry: TimelineEntryData): string | undefined => entry.tags?.[0]`,computed:!1}},activeCategory:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`Controlled active category (null = ALL). Leave undefined for uncontrolled.`},defaultCategory:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`Uncontrolled initial category. Default null (ALL).`,defaultValue:{value:`null`,computed:!1}},onCategoryChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(key: string | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},name:`key`}],return:{name:`void`}}},description:`Fired when the filter changes.`},linkComponent:{required:!1,tsType:{name:`NavProps['linkComponent']`,raw:`NavProps['linkComponent']`},description:"Custom link component for entry titles that carry an `article` href."}},composes:[`Omit`]}})))()}var h,g,_,v,y,b,x;function S(){return(S=t((()=>{m(),h={title:`Components/TimelineFeed`,component:l,parameters:{layout:`padded`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]}}},g=[{id:`1`,kind:`article`,date:`2026-07-12`,title:`Connector system converges on the runny yolk`,type:`milestone`,tags:[`work`],href:`/log/connector`},{id:`2`,kind:`article`,date:`2026-06-30`,title:`TimelineContainer grows an article entry kind`,type:`project`,tags:[`work`],href:`/log/article-kind`},{id:`3`,kind:`text`,date:`2026-06-12`,title:`Sketching the nav-as-course model`,type:`event`,tags:[`ideas`]},{id:`4`,kind:`text`,date:`2026-05-20`,title:`Two-tier typography lands`,type:`project`,tags:[`work`]},{id:`5`,kind:`text`,date:`2026-05-05`,title:`Accessibility baseline, WCAG 2.1 AA`,type:`milestone`,tags:[`work`]},{id:`6`,kind:`text`,date:`2026-04-18`,title:`A quiet walk, no code`,type:`event`,tags:[`life`]}],_=[{key:`work`,label:`work`,color:`#FFB000`},{key:`ideas`,label:`ideas`,color:`#55FFFF`},{key:`life`,label:`life`,color:`#55FF55`}],v={args:{entries:g}},y={args:{entries:g,categories:_},parameters:{docs:{description:{story:`Category chips cull the feed — "navigation becomes a course through time". Colour lives only in the small dots + active chip; the rest stays amber-mono.`}}}},b={args:{entries:[],categories:_}},x=[`Default`,`WithCategoryFilter`,`Empty`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    entries
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    entries,
    categories
  },
  parameters: {
    docs: {
      description: {
        story: 'Category chips cull the feed — "navigation becomes a course through time". Colour lives only in the small dots + active chip; the rest stays amber-mono.'
      }
    }
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    entries: [],
    categories
  }
}`,...b.parameters?.docs?.source}}}})))()}S();export{v as Default,b as Empty,y as WithCategoryFilter,x as __namedExportsOrder,h as default};