import{j as e}from"./jsx-runtime-50395f49.js";import"./index-9fa1aa67.js";const l=({name:a,size:n="medium",className:t="",title:m})=>{const d=`/assets/icons/${a}.svg`;return e.jsx("span",{className:`icon icon--${n} ${t}`.trim(),style:{width:n,height:n},role:"img","aria-label":m,children:e.jsx("img",{src:d,alt:a})})};l.__docgenInfo={description:"",methods:[],displayName:"Icon",props:{name:{required:!0,tsType:{name:"union",raw:"'placeholder' | 'open-in-new' | 'arrow-right' | 'arrow-left'",elements:[{name:"literal",value:"'placeholder'"},{name:"literal",value:"'open-in-new'"},{name:"literal",value:"'arrow-right'"},{name:"literal",value:"'arrow-left'"}]},description:"The name of the icon to display"},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"Size of the icon (in pixels)",defaultValue:{value:"'medium'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name",defaultValue:{value:"''",computed:!1}},title:{required:!1,tsType:{name:"string"},description:"Optional title for accessibility"}}};const y={title:"Components/Icon",component:l,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]}},tags:["autodocs"]},c=["placeholder","open-in-new","arrow-right","arrow-left"],p=[16,24,32],r={render:()=>e.jsx("div",{style:{display:"grid",gap:"2rem",color:"var(--color-dos-yellow)"},children:p.map(a=>e.jsxs("div",{children:[e.jsxs("h3",{style:{marginBottom:"1rem"},children:[a,"px"]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(100px, 1fr))",gap:"1rem"},children:c.map(n=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem"},children:[e.jsx(l,{name:n,size:a}),e.jsx("code",{style:{fontSize:"12px"},children:n})]},n))})]},a))})};var i,s,o;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(o=(s=r.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};const f=["IconCollection"];export{r as IconCollection,f as __namedExportsOrder,y as default};
