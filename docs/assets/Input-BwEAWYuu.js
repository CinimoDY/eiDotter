import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./iframe-CMgb2h7h.js";const a=l.forwardRef(({variant:e="default",className:r="",disabled:t,...n},s)=>{const i=["input",`input--${e}`,t&&"input--disabled",r].filter(Boolean).join(" ");return o.jsx("input",{ref:s,className:i,disabled:t,"aria-invalid":e==="error",...n})});a.displayName="Input";a.__docgenInfo={description:`DOS-styled Input component with authentic terminal aesthetics\r
\r
Features:\r
- Extends native HTML input attributes\r
- Error variant for validation states\r
- DOS-authentic styling with CGA colors\r
- WCAG 2.1 AA compliant focus states`,methods:[],displayName:"Input",props:{variant:{required:!1,tsType:{name:"union",raw:"'default' | 'error'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'error'"}]},description:"Visual variant for validation states",defaultValue:{value:"'default'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional class name",defaultValue:{value:"''",computed:!1}}},composes:["Omit"]};export{a as I};
