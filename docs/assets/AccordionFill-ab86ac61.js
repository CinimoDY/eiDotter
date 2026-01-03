import{j as n}from"./jsx-runtime-bb4eca5c.js";import{r as l}from"./index-9ab4f09c.js";import{S as c}from"./Section-a74476b2.js";const d=({sections:i,defaultExpandedIndex:r=-1})=>{const[p,o]=l.useState(r),s=(t,e)=>{o(e?t:-1)};return n.jsx("div",{className:"accordion-fill",children:i.map((t,e)=>n.jsx(c,{title:t.title,defaultExpanded:e===r,onToggle:a=>s(e,a),children:t.content},e))})};d.__docgenInfo={description:"",methods:[],displayName:"AccordionFill",props:{sections:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{\r
  title: string;\r
  content: string;\r
}`,signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"content",value:{name:"string",required:!0}}]}}],raw:`Array<{\r
  title: string;\r
  content: string;\r
}>`},description:""},defaultExpandedIndex:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"-1",computed:!1}}}};export{d as A};
