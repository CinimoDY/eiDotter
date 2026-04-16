import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as c}from"./iframe-DuFfgGUU.js";import{S as d}from"./Section-DhWZ91mU.js";import{c as m}from"./cn-CvUv5FIJ.js";const p=({sections:s,defaultExpandedIndex:r=-1,className:i})=>{const[,a]=c.useState(r),o=(t,e)=>{a(e?t:-1)};return n.jsx("div",{className:m("w-full flex flex-col items-stretch gap-2 text-left text-base font-dos text-cga-amber","eidotter-accordion-fill",i),children:s.map((t,e)=>n.jsx(d,{title:t.title,defaultExpanded:e===r,onToggle:l=>o(e,l),children:t.content},e))})};p.__docgenInfo={description:"",methods:[],displayName:"AccordionFill",props:{sections:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{\r
  title: string;\r
  content: string;\r
}`,signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"content",value:{name:"string",required:!0}}]}}],raw:`Array<{\r
  title: string;\r
  content: string;\r
}>`},description:""},defaultExpandedIndex:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"-1",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};export{p as A};
