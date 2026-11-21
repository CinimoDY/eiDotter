import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./cn-CHNjZLmO.js";import{n as o,t as s}from"./isSafeHref-C3uNgdiy.js";function c(e){if(e.kind===`image`)return e.image;if(e.kind===`gallery`)return e.images[0];if(e.kind===`article`)return e.images?.[0]}function l(e){return e.kind===`article`?e.href:void 0}function u(e){let t=new Date(e).getFullYear();return Number.isNaN(t)?e.slice(0,4):String(t)}function d({entries:e,categories:t,categoryOf:n=m,descriptionOf:r=h,activeCategory:i,defaultCategory:s=null,onCategoryChange:d,brand:g,preview:_=!0,linkComponent:v,className:y,...b}){let x=v??`a`,S=i!==void 0,[C,w]=(0,f.useState)(s),T=S?i:C,E=e=>{S||w(e),d?.(e)},D=(0,f.useMemo)(()=>new Intl.DateTimeFormat(`en-US`,{month:`short`,day:`numeric`}),[]),O=e=>{try{return D.format(new Date(e))}catch{return e}},k=(0,f.useMemo)(()=>T?e.filter(e=>n(e)===T):e,[T,e,n]),A=(0,f.useMemo)(()=>{let e=new Map;for(let t of k){let n=u(t.date),r=e.get(n);r?r.push(t):e.set(n,[t])}return Array.from(e.entries()).map(([e,t])=>({year:e,entries:[...t].sort((e,t)=>t.date.localeCompare(e.date))})).sort((e,t)=>t.year.localeCompare(e.year))},[k]),[j,M]=(0,f.useState)(null),N=(0,f.useMemo)(()=>k.find(e=>e.id===j)??k[0],[k,j]),P=N?c(N):void 0;return(0,p.jsxs)(`section`,{className:a(`eidotter-blog font-dos`,y),...b,children:[(g||t&&t.length>0)&&(0,p.jsxs)(`div`,{className:`eidotter-blog__filter`,children:[g&&(0,p.jsx)(`div`,{className:`eidotter-blog__brand`,children:g}),t&&t.length>0&&(0,p.jsxs)(`div`,{className:`eidotter-blog__chips`,role:`group`,"aria-label":`Filter by category`,children:[(0,p.jsx)(`button`,{type:`button`,className:a(`eidotter-blog__chip`,T===null&&`eidotter-blog__chip--active`),"aria-pressed":T===null,onClick:()=>E(null),children:`all`}),t.map(e=>(0,p.jsxs)(`button`,{type:`button`,className:a(`eidotter-blog__chip`,T===e.key&&`eidotter-blog__chip--active`),"aria-pressed":T===e.key,onClick:()=>E(e.key),style:e.color?{"--eidotter-blog-chip":e.color}:void 0,children:[(0,p.jsx)(`span`,{className:`eidotter-blog__chip-dot`,"aria-hidden":`true`}),e.label]},e.key)),T!==null&&(0,p.jsxs)(`span`,{className:`eidotter-blog__count`,children:[k.length,` of `,e.length]})]})]}),(0,p.jsxs)(`div`,{className:`eidotter-blog__body`,children:[(0,p.jsxs)(`div`,{className:`eidotter-blog__timeline`,children:[A.map(e=>(0,p.jsxs)(`div`,{className:`eidotter-blog__year-group`,children:[(0,p.jsx)(`h2`,{className:`eidotter-blog__year`,children:e.year}),(0,p.jsx)(`ol`,{className:`eidotter-blog__entries`,children:e.entries.map(e=>{let t=l(e),n=t&&o(t)?t:void 0,i=r(e),s=()=>M(e.id);return(0,p.jsxs)(`li`,{className:a(`eidotter-blog__entry`,N?.id===e.id&&`eidotter-blog__entry--focused`),onMouseEnter:s,onFocus:s,children:[(0,p.jsx)(`span`,{className:`eidotter-blog__dot`,"aria-hidden":`true`}),(0,p.jsx)(`time`,{className:`eidotter-blog__date`,dateTime:e.date,children:O(e.date)}),(0,p.jsx)(`h3`,{className:`eidotter-blog__title`,children:n?(0,p.jsx)(x,{href:n,className:`eidotter-blog__title-link`,children:e.title}):e.title}),i&&(0,p.jsx)(`p`,{className:`eidotter-blog__desc`,children:i})]},e.id)})})]},e.year)),A.length===0&&(0,p.jsx)(`p`,{className:`eidotter-blog__empty`,children:`C:\\LOG> No entries.`})]}),_&&(0,p.jsx)(`aside`,{className:`eidotter-blog__preview`,"aria-hidden":`true`,children:(0,p.jsxs)(`div`,{className:`eidotter-blog__preview-inner`,children:[P?(0,p.jsx)(`img`,{className:`eidotter-blog__preview-img`,src:P.thumbnail??P.src,alt:``,loading:`lazy`}):(0,p.jsx)(`div`,{className:`eidotter-blog__preview-placeholder`,children:`▓▒░ · ░▒▓`}),N&&(0,p.jsx)(`div`,{className:`eidotter-blog__preview-caption`,children:(0,p.jsx)(`span`,{className:`eidotter-blog__preview-title`,children:N.title})})]})})]})]})}var f,p,m,h;function g(){return(g=t((()=>{f=e(n(),1),i(),s(),p=r(),m=e=>e.tags?.[0],h=e=>e.kind===`article`?e.summary:void 0,d.__docgenInfo={description:`TimelinePage — a Bret-Victor-style blog timeline (the "K2" layout). A filter
chip row (with an optional Mark brand slot) sits above a year-grouped
timeline: an AMBER-ONLY spine + dots (never category-rainbow), neutral grey
dates, big titles and a description line — content leads. A right-hand panel
previews the focused entry's thumbnail on hover/focus.

Presentational; shares the \`TimelineEntryData\` model with TimelineContainer.`,methods:[],displayName:`TimelinePage`,props:{entries:{required:!0,tsType:{name:`Array`,elements:[{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
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
  })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`},{name:`unknown`}]}],raw:`TimelineEntryData[]`},description:`Entries. Grouped by year and shown newest-first automatically.`},categories:{required:!1,tsType:{name:`Array`,elements:[{name:`TimelineCategory`}],raw:`TimelineCategory[]`},description:`Categories for the filter chip row. Omit to hide the filter.`},categoryOf:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(entry: TimelineEntryData) => string | undefined`,signature:{arguments:[{type:{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
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
  })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`},{name:`unknown`}]},name:`entry`}],return:{name:`union`,raw:`string | undefined`,elements:[{name:`string`},{name:`undefined`}]}}},description:"Resolve an entry's category key. Default: `entry.tags?.[0]`.",defaultValue:{value:`(entry: TimelineEntryData): string | undefined => entry.tags?.[0]`,computed:!1}},descriptionOf:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(entry: TimelineEntryData) => string | undefined`,signature:{arguments:[{type:{name:`union`,raw:`| (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
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
  })`,elements:[{name:`unknown`},{name:`unknown`},{name:`unknown`},{name:`unknown`}]},name:`entry`}],return:{name:`union`,raw:`string | undefined`,elements:[{name:`string`},{name:`undefined`}]}}},description:"Resolve an entry's description line. Default: an `article` entry's `summary`.",defaultValue:{value:`(entry: TimelineEntryData): string | undefined =>
entry.kind === 'article' ? entry.summary : undefined`,computed:!1}},activeCategory:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`Controlled active category (null = ALL).`},defaultCategory:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`Uncontrolled initial category. Default null (ALL).`,defaultValue:{value:`null`,computed:!1}},onCategoryChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(key: string | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},name:`key`}],return:{name:`void`}}},description:``},brand:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:"Brand slot at the start of the filter row (e.g. a `<Mark/>`)."},preview:{required:!1,tsType:{name:`boolean`},description:`Show the right-hand hover-preview panel. Default true.`,defaultValue:{value:`true`,computed:!1}},linkComponent:{required:!1,tsType:{name:`NavProps['linkComponent']`,raw:`NavProps['linkComponent']`},description:"Custom link component for entry titles that carry an `article` href."}},composes:[`Omit`]}})))()}export{g as n,d as t};