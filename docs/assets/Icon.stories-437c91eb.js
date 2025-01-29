import{j as e}from"./jsx-runtime-50395f49.js";import"./index-9fa1aa67.js";const l=({name:n,className:r="",size:i=24,title:d})=>e.jsx("span",{className:`icon icon--${n} ${r}`.trim(),style:{width:i,height:i},role:"img","aria-label":d,children:e.jsx("i",{className:"icon__sprite"})});l.__docgenInfo={description:"",methods:[],displayName:"Icon",props:{name:{required:!0,tsType:{name:"union",raw:`| 'placeholder'\r
| 'open-in-new'\r
| 'arrow-right'\r
| 'arrow-left'`,elements:[{name:"literal",value:"'placeholder'"},{name:"literal",value:"'open-in-new'"},{name:"literal",value:"'arrow-right'"},{name:"literal",value:"'arrow-left'"}]},description:"The name of the icon to display"},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name",defaultValue:{value:"''",computed:!1}},size:{required:!1,tsType:{name:"number"},description:"Size of the icon (in pixels)",defaultValue:{value:"24",computed:!1}},title:{required:!1,tsType:{name:"string"},description:"Optional title for accessibility"}}};const y={title:"Components/Icon",component:l,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"]},c=["placeholder","open-in-new","arrow-right","arrow-left"],m=[16,24,32],a={render:()=>e.jsx("div",{style:{display:"grid",gap:"2rem",color:"var(--color-dos-yellow)"},children:m.map(n=>e.jsxs("div",{children:[e.jsxs("h3",{style:{marginBottom:"1rem"},children:[n,"px"]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(100px, 1fr))",gap:"1rem"},children:c.map(r=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem"},children:[e.jsx(l,{name:r,size:n}),e.jsx("code",{style:{fontSize:"12px"},children:r})]},r))})]},n))})};var o,s,t;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: '2rem',
    color: 'var(--color-dos-yellow)'
  }}>\r
      {sizes.map(size => <div key={size}>\r
          <h3 style={{
        marginBottom: '1rem'
      }}>{size}px</h3>\r
          <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '1rem'
      }}>\r
            {allIcons.map(name => <div key={name} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}>\r
                <Icon name={name} size={size} />\r
                <code style={{
            fontSize: '12px'
          }}>{name}</code>\r
              </div>)}\r
          </div>\r
        </div>)}\r
    </div>
}`,...(t=(s=a.parameters)==null?void 0:s.docs)==null?void 0:t.source}}};const f=["IconCollection"];export{a as IconCollection,f as __namedExportsOrder,y as default};
