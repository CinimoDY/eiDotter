import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as u}from"./registry-DlnQDLA5.js";const p=({orientation:o="horizontal",className:d=""})=>{const m=["separator",`separator--${o}`,d].filter(Boolean).join(" ");return e.jsx("div",{role:"separator","aria-orientation":o,className:m})};p.__docgenInfo={description:`DOS-styled Separator component for visual division of content

Features:
- Horizontal and vertical orientations
- Uses semantic border color from design tokens
- Decorative role (aria-hidden)
- High contrast mode support`,methods:[],displayName:"Separator",props:{orientation:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"Orientation of the separator line",defaultValue:{value:"'horizontal'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name",defaultValue:{value:"''",computed:!1}}}};const x={title:"Components/Separator",component:p,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:u.Separator},tags:["autodocs"],argTypes:{orientation:{control:"select",options:["horizontal","vertical"],defaultValue:"horizontal"}}},t={args:{orientation:"horizontal"},decorators:[o=>e.jsxs("div",{style:{width:"300px"},children:[e.jsx("p",{style:{color:"#FFB000",marginBottom:"8px"},children:"Content above"}),e.jsx(o,{}),e.jsx("p",{style:{color:"#FFB000",marginTop:"8px"},children:"Content below"})]})]},r={args:{orientation:"vertical"},decorators:[o=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",height:"40px"},children:[e.jsx("span",{style:{color:"#FFB000"},children:"Left"}),e.jsx(o,{}),e.jsx("span",{style:{color:"#FFB000"},children:"Right"})]})]};var a,n,s;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal'
  },
  decorators: [Story => <div style={{
    width: '300px'
  }}>
        <p style={{
      color: '#FFB000',
      marginBottom: '8px'
    }}>Content above</p>
        <Story />
        <p style={{
      color: '#FFB000',
      marginTop: '8px'
    }}>Content below</p>
      </div>]
}`,...(s=(n=t.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var i,l,c;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  },
  decorators: [Story => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    height: '40px'
  }}>
        <span style={{
      color: '#FFB000'
    }}>Left</span>
        <Story />
        <span style={{
      color: '#FFB000'
    }}>Right</span>
      </div>]
}`,...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const y=["Horizontal","Vertical"];export{t as Horizontal,r as Vertical,y as __namedExportsOrder,x as default};
