import{j as e}from"./jsx-runtime-D_zvdyIk.js";import"./iframe-Cnx5oUV1.js";import"./preload-helper-Dp1pzeXC.js";const G={title:"Design System/Color Tokens",parameters:{layout:"fullscreen",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"},{name:"light",value:"#AAAAAA"}]}}},a=({name:o,value:n,cssVar:z,description:m})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px",padding:"8px 0",borderBottom:"1px solid #333"},children:[e.jsx("div",{style:{width:"64px",height:"64px",backgroundColor:n,border:"2px solid #555",flexShrink:0},title:n}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{color:"#FFFFFF",fontFamily:"monospace",fontSize:"14px",fontWeight:"bold"},children:o}),e.jsx("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px",marginTop:"4px"},children:z}),e.jsx("div",{style:{color:"#55FFFF",fontFamily:"monospace",fontSize:"14px",marginTop:"4px"},children:n}),m&&e.jsx("div",{style:{color:"#555555",fontFamily:"monospace",fontSize:"11px",marginTop:"4px"},children:m})]})]}),r=({title:o,children:n})=>e.jsxs("div",{style:{marginBottom:"32px"},children:[e.jsx("h2",{style:{color:"#FFFF55",fontFamily:"monospace",fontSize:"16px",textTransform:"uppercase",letterSpacing:"0.1em",borderBottom:"2px solid #FFFF55",paddingBottom:"8px",marginBottom:"16px"},children:o}),n]}),V=[{name:"black",value:"#020003",cssVar:"--color-cga-black",description:"Amber mono - darkest"},{name:"blue",value:"#2C1203",cssVar:"--color-cga-blue",description:"Amber monochrome"},{name:"green",value:"#411F06",cssVar:"--color-cga-green",description:"Amber monochrome"},{name:"cyan",value:"#552D0A",cssVar:"--color-cga-cyan",description:"Amber monochrome"},{name:"red",value:"#65360C",cssVar:"--color-cga-red",description:"Amber monochrome"},{name:"magenta",value:"#713E0D",cssVar:"--color-cga-magenta",description:"Amber monochrome"},{name:"brown",value:"#5F340E",cssVar:"--color-cga-brown",description:"Amber monochrome"},{name:"lightGray",value:"#B87C1A",cssVar:"--color-cga-light-gray",description:"Amber monochrome"},{name:"darkGray",value:"#010103",cssVar:"--color-cga-dark-gray",description:"Amber mono - near black"},{name:"brightBlue",value:"#C38A23",cssVar:"--color-cga-bright-blue",description:"Amber monochrome"},{name:"brightGreen",value:"#CB9529",cssVar:"--color-cga-bright-green",description:"Amber monochrome"},{name:"brightCyan",value:"#D4A030",cssVar:"--color-cga-bright-cyan",description:"Amber monochrome"},{name:"brightRed",value:"#DCA934",cssVar:"--color-cga-bright-red",description:"Amber monochrome"},{name:"brightMagenta",value:"#DDB030",cssVar:"--color-cga-bright-magenta",description:"Amber monochrome"},{name:"yellow",value:"#E5B936",cssVar:"--color-cga-yellow",description:"Amber mono - accent"},{name:"white",value:"#BA8225",cssVar:"--color-cga-white",description:"Amber monochrome"}],w=[{name:"amber",value:"#FFB000",cssVar:"--color-cga-amber",description:"P3 phosphor amber (602nm)"},{name:"amberBright",value:"#FDCA9F",cssVar:"--color-cga-amber-bright",description:"P3 phosphor amber bright"},{name:"amberDim",value:"#9A5700",cssVar:"--color-cga-amber-dim",description:"P3 phosphor amber dim"}],t={render:()=>e.jsxs("div",{style:{padding:"24px",maxWidth:"800px"},children:[e.jsx("h1",{style:{color:"#FFFFFF",fontFamily:"monospace",fontSize:"24px",marginBottom:"8px"},children:"Primitive Color Tokens"}),e.jsxs("p",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px",marginBottom:"32px"},children:["Edit in: ",e.jsx("code",{style:{color:"#55FFFF"},children:"src/tokens/base.tokens.json"})," → then run ",e.jsx("code",{style:{color:"#55FF55"},children:"npm run build-tokens"})]}),e.jsx(r,{title:"Amber Monochrome Palette (Default)",children:V.map(o=>e.jsx(a,{...o},o.name))}),e.jsx(r,{title:"Amber Phosphor Extension",children:w.map(o=>e.jsx(a,{...o},o.name))})]})},d=[{name:"black",value:"#000000",cssVar:"--color-cga-black",description:"Background"},{name:"green",value:"#00FF00",cssVar:"--color-cga-green",description:"Primary"},{name:"red",value:"#FF0000",cssVar:"--color-cga-red",description:"Secondary"},{name:"yellow",value:"#FFFF00",cssVar:"--color-cga-yellow",description:"Accent"}],p=[{name:"black",value:"#000000",cssVar:"--color-cga-black",description:"Background"},{name:"cyan",value:"#00FFFF",cssVar:"--color-cga-cyan",description:"Primary"},{name:"magenta",value:"#FF00FF",cssVar:"--color-cga-magenta",description:"Secondary"},{name:"white",value:"#FFFFFF",cssVar:"--color-cga-white",description:"Accent"}],x=[{name:"black",value:"#000000",cssVar:"--color-cga-black",description:"Background"},{name:"cyan",value:"#00FFFF",cssVar:"--color-cga-cyan",description:"Primary"},{name:"red",value:"#FF0000",cssVar:"--color-cga-red",description:"Secondary"},{name:"white",value:"#FFFFFF",cssVar:"--color-cga-white",description:"Accent"}],i={render:()=>e.jsxs("div",{style:{padding:"24px",maxWidth:"800px"},children:[e.jsx("h1",{style:{color:"#00FF00",fontFamily:"monospace",fontSize:"24px",marginBottom:"8px"},children:"CGA Mode 4 - Palette 0"}),e.jsx("p",{style:{color:"#FFFF00",fontFamily:"monospace",fontSize:"12px",marginBottom:"32px"},children:"Green/Red/Yellow/Black • Early PC games aesthetic"}),e.jsx(r,{title:"4-Color Palette",children:d.map(o=>e.jsx(a,{...o},o.name))}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"4px",maxWidth:"400px",marginTop:"24px"},children:d.map(o=>e.jsx("div",{style:{aspectRatio:"1",backgroundColor:o.value,border:"2px solid #333"},title:`${o.name}: ${o.value}`},o.name))})]})},l={render:()=>e.jsxs("div",{style:{padding:"24px",maxWidth:"800px"},children:[e.jsx("h1",{style:{color:"#00FFFF",fontFamily:"monospace",fontSize:"24px",marginBottom:"8px"},children:"CGA Mode 4 - Palette 1"}),e.jsx("p",{style:{color:"#FF00FF",fontFamily:"monospace",fontSize:"12px",marginBottom:"32px"},children:"Cyan/Magenta/White/Black • Commander Keen era"}),e.jsx(r,{title:"4-Color Palette",children:p.map(o=>e.jsx(a,{...o},o.name))}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"4px",maxWidth:"400px",marginTop:"24px"},children:p.map(o=>e.jsx("div",{style:{aspectRatio:"1",backgroundColor:o.value,border:"2px solid #333"},title:`${o.name}: ${o.value}`},o.name))})]})},s={render:()=>e.jsxs("div",{style:{padding:"24px",maxWidth:"800px"},children:[e.jsx("h1",{style:{color:"#00FFFF",fontFamily:"monospace",fontSize:"24px",marginBottom:"8px"},children:"CGA Mode 5"}),e.jsx("p",{style:{color:"#FF0000",fontFamily:"monospace",fontSize:"12px",marginBottom:"32px"},children:"Cyan/Red/White/Black • Composite monitor mode"}),e.jsx(r,{title:"4-Color Palette",children:x.map(o=>e.jsx(a,{...o},o.name))}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"4px",maxWidth:"400px",marginTop:"24px"},children:x.map(o=>e.jsx("div",{style:{aspectRatio:"1",backgroundColor:o.value,border:"2px solid #333"},title:`${o.name}: ${o.value}`},o.name))})]})},c={render:()=>e.jsxs("div",{style:{padding:"24px"},children:[e.jsx("h1",{style:{color:"#FFFFFF",fontFamily:"monospace",fontSize:"24px",marginBottom:"24px"},children:"Amber Monochrome Grid"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(8, 1fr)",gap:"4px",maxWidth:"600px"},children:V.map(o=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{width:"100%",aspectRatio:"1",backgroundColor:o.value,border:"2px solid #333"},title:`${o.name}: ${o.value}`}),e.jsx("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"9px",marginTop:"4px",overflow:"hidden",textOverflow:"ellipsis"},children:o.name})]},o.name))}),e.jsx("h2",{style:{color:"#FFB000",fontFamily:"monospace",fontSize:"16px",marginTop:"32px",marginBottom:"16px"},children:"Amber Extension"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"4px",maxWidth:"225px"},children:w.map(o=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{width:"100%",aspectRatio:"1",backgroundColor:o.value,border:"2px solid #333"},title:`${o.name}: ${o.value}`}),e.jsx("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"9px",marginTop:"4px"},children:o.name})]},o.name))})]})};var g,F,h;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px',
    maxWidth: '800px'
  }}>
      <h1 style={{
      color: '#FFFFFF',
      fontFamily: 'monospace',
      fontSize: '24px',
      marginBottom: '8px'
    }}>
        Primitive Color Tokens
      </h1>
      <p style={{
      color: '#AAAAAA',
      fontFamily: 'monospace',
      fontSize: '12px',
      marginBottom: '32px'
    }}>
        Edit in: <code style={{
        color: '#55FFFF'
      }}>src/tokens/base.tokens.json</code> → then run <code style={{
        color: '#55FF55'
      }}>npm run build-tokens</code>
      </p>

      <Section title="Amber Monochrome Palette (Default)">
        {cgaPrimitives.map(color => <ColorSwatch key={color.name} {...color} />)}
      </Section>

      <Section title="Amber Phosphor Extension">
        {amberColors.map(color => <ColorSwatch key={color.name} {...color} />)}
      </Section>
    </div>
}`,...(h=(F=t.parameters)==null?void 0:F.docs)==null?void 0:h.source}}};var y,v,u;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px',
    maxWidth: '800px'
  }}>
      <h1 style={{
      color: '#00FF00',
      fontFamily: 'monospace',
      fontSize: '24px',
      marginBottom: '8px'
    }}>
        CGA Mode 4 - Palette 0
      </h1>
      <p style={{
      color: '#FFFF00',
      fontFamily: 'monospace',
      fontSize: '12px',
      marginBottom: '32px'
    }}>
        Green/Red/Yellow/Black • Early PC games aesthetic
      </p>

      <Section title="4-Color Palette">
        {cgaMode4P0.map(color => <ColorSwatch key={color.name} {...color} />)}
      </Section>

      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '4px',
      maxWidth: '400px',
      marginTop: '24px'
    }}>
        {cgaMode4P0.map(color => <div key={color.name} style={{
        aspectRatio: '1',
        backgroundColor: color.value,
        border: '2px solid #333'
      }} title={\`\${color.name}: \${color.value}\`} />)}
      </div>
    </div>
}`,...(u=(v=i.parameters)==null?void 0:v.docs)==null?void 0:u.source}}};var A,b,f;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px',
    maxWidth: '800px'
  }}>
      <h1 style={{
      color: '#00FFFF',
      fontFamily: 'monospace',
      fontSize: '24px',
      marginBottom: '8px'
    }}>
        CGA Mode 4 - Palette 1
      </h1>
      <p style={{
      color: '#FF00FF',
      fontFamily: 'monospace',
      fontSize: '12px',
      marginBottom: '32px'
    }}>
        Cyan/Magenta/White/Black • Commander Keen era
      </p>

      <Section title="4-Color Palette">
        {cgaMode4P1.map(color => <ColorSwatch key={color.name} {...color} />)}
      </Section>

      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '4px',
      maxWidth: '400px',
      marginTop: '24px'
    }}>
        {cgaMode4P1.map(color => <div key={color.name} style={{
        aspectRatio: '1',
        backgroundColor: color.value,
        border: '2px solid #333'
      }} title={\`\${color.name}: \${color.value}\`} />)}
      </div>
    </div>
}`,...(f=(b=l.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var C,S,j;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px',
    maxWidth: '800px'
  }}>
      <h1 style={{
      color: '#00FFFF',
      fontFamily: 'monospace',
      fontSize: '24px',
      marginBottom: '8px'
    }}>
        CGA Mode 5
      </h1>
      <p style={{
      color: '#FF0000',
      fontFamily: 'monospace',
      fontSize: '12px',
      marginBottom: '32px'
    }}>
        Cyan/Red/White/Black • Composite monitor mode
      </p>

      <Section title="4-Color Palette">
        {cgaMode5.map(color => <ColorSwatch key={color.name} {...color} />)}
      </Section>

      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '4px',
      maxWidth: '400px',
      marginTop: '24px'
    }}>
        {cgaMode5.map(color => <div key={color.name} style={{
        aspectRatio: '1',
        backgroundColor: color.value,
        border: '2px solid #333'
      }} title={\`\${color.name}: \${color.value}\`} />)}
      </div>
    </div>
}`,...(j=(S=s.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var k,B,P;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px'
  }}>
      <h1 style={{
      color: '#FFFFFF',
      fontFamily: 'monospace',
      fontSize: '24px',
      marginBottom: '24px'
    }}>
        Amber Monochrome Grid
      </h1>

      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      gap: '4px',
      maxWidth: '600px'
    }}>
        {cgaPrimitives.map(color => <div key={color.name} style={{
        textAlign: 'center'
      }}>
            <div style={{
          width: '100%',
          aspectRatio: '1',
          backgroundColor: color.value,
          border: '2px solid #333'
        }} title={\`\${color.name}: \${color.value}\`} />
            <div style={{
          color: '#AAAAAA',
          fontFamily: 'monospace',
          fontSize: '9px',
          marginTop: '4px',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
              {color.name}
            </div>
          </div>)}
      </div>

      <h2 style={{
      color: '#FFB000',
      fontFamily: 'monospace',
      fontSize: '16px',
      marginTop: '32px',
      marginBottom: '16px'
    }}>
        Amber Extension
      </h2>

      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '4px',
      maxWidth: '225px'
    }}>
        {amberColors.map(color => <div key={color.name} style={{
        textAlign: 'center'
      }}>
            <div style={{
          width: '100%',
          aspectRatio: '1',
          backgroundColor: color.value,
          border: '2px solid #333'
        }} title={\`\${color.name}: \${color.value}\`} />
            <div style={{
          color: '#AAAAAA',
          fontFamily: 'monospace',
          fontSize: '9px',
          marginTop: '4px'
        }}>
              {color.name}
            </div>
          </div>)}
      </div>
    </div>
}`,...(P=(B=c.parameters)==null?void 0:B.docs)==null?void 0:P.source}}};const $=["PrimitiveColors","CGAMode4Palette0","CGAMode4Palette1","CGAMode5","ColorGrid"];export{i as CGAMode4Palette0,l as CGAMode4Palette1,s as CGAMode5,c as ColorGrid,t as PrimitiveColors,$ as __namedExportsOrder,G as default};
