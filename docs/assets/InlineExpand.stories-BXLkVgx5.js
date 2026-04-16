import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as i,R as ie}from"./iframe-BU4rT9RF.js";import{$ as le}from"./Button-Ctavax2i.js";import{c as ce}from"./cn-CvUv5FIJ.js";import{c as de}from"./registry-CyM9n0D0.js";import"./preload-helper-Dp1pzeXC.js";import"./useFocusRing-BUJkGnC-.js";import"./Hidden-BtSPQEnR.js";import"./usePress-Bjtlcj0Z.js";import"./index-CqfCC26D.js";import"./index-C2QVYWFi.js";const T=r=>{if(!r)return!1;try{const o=new URL(r);return["http:","https:","mailto:"].includes(o.protocol)}catch{return!1}},n=({children:r,content:o,defaultExpanded:s=!1,expanded:b,onToggle:f,sources:v=[],className:ee,...te})=>{const[ne,oe]=i.useState(s),[ae,re]=i.useState(new Set),w=i.useRef(s),C=i.useId(),E=i.useRef(null),k=b!==void 0,a=k?b:ne;a&&(w.current=!0);const I=()=>{const t=!a;k||oe(t),f==null||f(t)},se=t=>{var l;t.key==="Escape"&&a&&(t.stopPropagation(),I(),(l=E.current)==null||l.focus())};return e.jsxs("span",{className:ce("eidotter-inline-expand",a&&"eidotter-inline-expand--expanded",ee),onKeyDown:se,...te,children:[e.jsxs(le,{ref:E,className:"eidotter-inline-expand__trigger","aria-expanded":a,"aria-controls":C,onPress:I,children:[r,e.jsx("span",{className:"eidotter-inline-expand__indicator","aria-hidden":"true",children:a?"[-]":"[+]"})]}),e.jsxs("span",{id:C,className:"eidotter-inline-expand__content",role:"region",inert:!a,children:[e.jsx("span",{className:"eidotter-inline-expand__inner",children:o}),v.length>0&&e.jsx("span",{className:"eidotter-inline-expand__sources",role:"list",children:v.map(t=>e.jsx("span",{className:"eidotter-inline-expand__source-item",role:"listitem",children:e.jsxs("a",{href:T(t.url)?t.url:void 0,className:"eidotter-inline-expand__source-link",target:"_blank",rel:"noopener noreferrer","aria-label":`${t.title} (opens external website)`,children:[w.current&&t.favicon&&T(t.favicon)&&!ae.has(t.url)?e.jsx("img",{className:"eidotter-inline-expand__source-favicon",src:t.favicon,alt:"",width:16,height:16,decoding:"async",onError:()=>re(l=>new Set(l).add(t.url))}):e.jsx("span",{className:"eidotter-inline-expand__source-icon","aria-hidden":"true",children:"[→]"}),e.jsx("span",{className:"eidotter-inline-expand__source-title",children:t.title})]})},t.url))})]})]})};n.__docgenInfo={description:`Inline disclosure widget that reveals content when trigger text is clicked.

Unlike Section/Accordion (block-level, bordered sections), InlineExpand is
designed for inline use within paragraphs and prose content.

Features:
- Controlled and uncontrolled modes
- Native <button> trigger for full keyboard/screen reader support
- Optional citation sources with favicons
- DOS-authentic styling with phosphor glow and CGA tokens
- WCAG 2.1 AA compliant

Content stays in the DOM when collapsed (with visibility: hidden) to enable
smooth CSS transition exit animations. This differs from Section which
unmounts content on collapse via conditional rendering.`,methods:[],displayName:"InlineExpand",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Trigger text or element displayed inline — the clickable toggle"},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content revealed when expanded — accepts ReactNode for composability"},defaultExpanded:{required:!1,tsType:{name:"boolean"},description:"Whether the content is expanded on first render (uncontrolled mode)",defaultValue:{value:"false",computed:!1}},expanded:{required:!1,tsType:{name:"boolean"},description:"Controlled expanded state — overrides internal state when provided"},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(isExpanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isExpanded"}],return:{name:"void"}}},description:"Called when the expand/collapse state changes"},sources:{required:!1,tsType:{name:"Array",elements:[{name:"InlineExpandSource"}],raw:"InlineExpandSource[]"},description:"Optional citation sources rendered after expanded content",defaultValue:{value:"[]",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class names"}}};const Ce={title:"Components/InlineExpand",component:n,parameters:{layout:"padded",projectMeta:de.InlineExpand},tags:["autodocs"],argTypes:{content:{control:"text",description:"Content revealed when expanded"},defaultExpanded:{control:"boolean",description:"Whether expanded by default (uncontrolled)"},onToggle:{action:"toggle",description:"Callback when expand state changes"}}},c={args:{children:"CGA color palette",content:"16 colors defined by the IBM Color Graphics Adapter standard from 1981, used across all DOS-era applications."}},d={args:{children:"CGA color palette",content:"16 colors defined by the IBM Color Graphics Adapter standard from 1981, used across all DOS-era applications.",defaultExpanded:!0}},p={render:()=>e.jsxs("p",{style:{color:"var(--color-semantic-text-primary)",maxWidth:"600px",lineHeight:"1.6"},children:["The system uses a"," ",e.jsx(n,{content:"16 colors defined by the IBM Color Graphics Adapter standard from 1981. The palette includes 4 shades of gray, plus pure red, green, blue, cyan, magenta, yellow, brown, and their bright variants.",children:"CGA color palette"})," ","for all visual elements. Each component respects the"," ",e.jsx(n,{content:"Tokens are design decisions stored as named values. Colors, spacing, typography, and timing are all tokenized so themes can override any value without changing component code.",children:"design token pipeline"})," ","to ensure consistency across themes."]})},h={render:()=>e.jsxs("p",{style:{color:"var(--color-semantic-text-primary)",maxWidth:"600px",lineHeight:"1.6"},children:["The"," ",e.jsx(n,{defaultExpanded:!0,content:"A phosphor display uses a coating that glows when struck by an electron beam, producing visible light. Amber phosphor (P3) was popular for reducing eye strain during long sessions.",children:"phosphor display"})," ","technology defined the visual character of early computing. The"," ",e.jsx(n,{defaultExpanded:!0,content:"Cathode Ray Tube — a vacuum tube containing electron guns that fire beams at a phosphor-coated screen. Scanlines, flicker, and bloom are characteristic CRT artifacts.",children:"CRT"})," ","artifacts we simulate are authentic to that era."]})},u={args:{children:"photosynthesis",content:"Photosynthesis is a biological process used by most plants, algae, and certain bacteria to convert light energy into chemical energy stored in glucose. The process occurs in two main stages: the light-dependent reactions, which take place in the thylakoid membranes, and the Calvin cycle, which occurs in the stroma of the chloroplast. During the light reactions, water molecules are split, releasing oxygen as a byproduct, while ATP and NADPH are generated. These energy carriers then power the Calvin cycle, where carbon dioxide is fixed into organic molecules through a series of enzyme-catalyzed reactions."}},m={render:function(){const[o,s]=ie.useState(!1);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("p",{style:{color:"var(--color-semantic-text-primary)"},children:["Click the trigger or the button below to toggle:"," ",e.jsx(n,{expanded:o,onToggle:s,content:"This expansion is controlled by external state. Both the trigger and the button below toggle it.",children:"controlled term"})]}),e.jsxs("button",{type:"button",onClick:()=>s(!o),style:{color:"var(--color-semantic-text-primary)",background:"var(--color-semantic-background-secondary)",border:"1px solid var(--color-semantic-border-default)",padding:"4px 12px",cursor:"pointer",fontFamily:"inherit"},children:[o?"Collapse":"Expand"," externally"]})]})}},x={render:()=>e.jsxs("p",{style:{color:"var(--color-semantic-text-primary)",maxWidth:"600px",lineHeight:"1.6"},children:["The display uses a"," ",e.jsx(n,{defaultExpanded:!0,content:"16 colors defined by the IBM Color Graphics Adapter standard from 1981. The palette was designed around the limitations of composite video output.",sources:[{title:"Wikipedia: CGA",url:"https://en.wikipedia.org/wiki/Color_Graphics_Adapter",favicon:"https://en.wikipedia.org/favicon.ico"},{title:"IBM Technical Reference",url:"https://www.ibm.com/docs"},{title:"CGA Compatibility Guide",url:"https://www.dosnostalgic.com/cga",favicon:"https://www.dosnostalgic.com/favicon.ico"}],children:"CGA color palette"})," ","for all visual elements."]})},g={render:()=>e.jsxs("p",{style:{color:"var(--color-semantic-text-primary)",maxWidth:"600px",lineHeight:"1.6"},children:["Learn about"," ",e.jsx(n,{defaultExpanded:!0,content:"Phosphor displays use a coating that glows when struck by an electron beam.",sources:[{title:"Working Source",url:"https://example.com",favicon:"https://example.com/favicon.ico"},{title:"Broken Favicon",url:"https://example.org",favicon:"https://invalid.example/broken.ico"},{title:"No Favicon",url:"https://example.net"}],children:"phosphor displays"})," ","to understand CRT technology."]})},y={name:"Composition Patterns",render:()=>e.jsxs("div",{style:{color:"var(--color-semantic-text-primary)",maxWidth:"600px",lineHeight:"1.6",display:"flex",flexDirection:"column",gap:"24px"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Icon via children:"})," ",e.jsxs(n,{content:"Style Dictionary transforms token definitions into platform-specific outputs.",sources:[{title:"Docs",url:"https://styledictionary.com"}],children:["📖 ","Style Dictionary"]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Collapse via composed content:"})," ",e.jsx(n,{content:e.jsxs("span",{children:["This expansion uses a composed collapse button inside the content prop.",e.jsx("span",{style:{display:"block",marginTop:"8px",fontSize:"12px",color:"var(--color-cga-brown)",cursor:"pointer",textDecoration:"underline dotted"},children:"[click trigger above to collapse]"})]}),children:"composed collapse"})]})]})};var S,j,A;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    children: 'CGA color palette',
    content: '16 colors defined by the IBM Color Graphics Adapter standard from 1981, used across all DOS-era applications.'
  }
}`,...(A=(j=c.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};var _,R,D;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    children: 'CGA color palette',
    content: '16 colors defined by the IBM Color Graphics Adapter standard from 1981, used across all DOS-era applications.',
    defaultExpanded: true
  }
}`,...(D=(R=d.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var G,N,W;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <p style={{
    color: 'var(--color-semantic-text-primary)',
    maxWidth: '600px',
    lineHeight: '1.6'
  }}>
      The system uses a{' '}
      <InlineExpand content="16 colors defined by the IBM Color Graphics Adapter standard from 1981. The palette includes 4 shades of gray, plus pure red, green, blue, cyan, magenta, yellow, brown, and their bright variants.">
        CGA color palette
      </InlineExpand>{' '}
      for all visual elements. Each component respects the{' '}
      <InlineExpand content="Tokens are design decisions stored as named values. Colors, spacing, typography, and timing are all tokenized so themes can override any value without changing component code.">
        design token pipeline
      </InlineExpand>{' '}
      to ensure consistency across themes.
    </p>
}`,...(W=(N=p.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};var P,B,M;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <p style={{
    color: 'var(--color-semantic-text-primary)',
    maxWidth: '600px',
    lineHeight: '1.6'
  }}>
      The{' '}
      <InlineExpand defaultExpanded content="A phosphor display uses a coating that glows when struck by an electron beam, producing visible light. Amber phosphor (P3) was popular for reducing eye strain during long sessions.">
        phosphor display
      </InlineExpand>{' '}
      technology defined the visual character of early computing. The{' '}
      <InlineExpand defaultExpanded content="Cathode Ray Tube — a vacuum tube containing electron guns that fire beams at a phosphor-coated screen. Scanlines, flicker, and bloom are characteristic CRT artifacts.">
        CRT
      </InlineExpand>{' '}
      artifacts we simulate are authentic to that era.
    </p>
}`,...(M=(B=h.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var F,H,O;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    children: 'photosynthesis',
    content: 'Photosynthesis is a biological process used by most plants, algae, and certain bacteria to convert light energy into chemical energy stored in glucose. The process occurs in two main stages: the light-dependent reactions, which take place in the thylakoid membranes, and the Calvin cycle, which occurs in the stroma of the chloroplast. During the light reactions, water molecules are split, releasing oxygen as a byproduct, while ATP and NADPH are generated. These energy carriers then power the Calvin cycle, where carbon dioxide is fixed into organic molecules through a series of enzyme-catalyzed reactions.'
  }
}`,...(O=(H=u.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};var z,q,L;m.parameters={...m.parameters,docs:{...(z=m.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: function ControlledInlineExpand() {
    const [isExpanded, setIsExpanded] = React.useState(false);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
        <p style={{
        color: 'var(--color-semantic-text-primary)'
      }}>
          Click the trigger or the button below to toggle:{' '}
          <InlineExpand expanded={isExpanded} onToggle={setIsExpanded} content="This expansion is controlled by external state. Both the trigger and the button below toggle it.">
            controlled term
          </InlineExpand>
        </p>
        <button type="button" onClick={() => setIsExpanded(!isExpanded)} style={{
        color: 'var(--color-semantic-text-primary)',
        background: 'var(--color-semantic-background-secondary)',
        border: '1px solid var(--color-semantic-border-default)',
        padding: '4px 12px',
        cursor: 'pointer',
        fontFamily: 'inherit'
      }}>
          {isExpanded ? 'Collapse' : 'Expand'} externally
        </button>
      </div>;
  }
}`,...(L=(q=m.parameters)==null?void 0:q.docs)==null?void 0:L.source}}};var $,U,K;x.parameters={...x.parameters,docs:{...($=x.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <p style={{
    color: 'var(--color-semantic-text-primary)',
    maxWidth: '600px',
    lineHeight: '1.6'
  }}>
      The display uses a{' '}
      <InlineExpand defaultExpanded content="16 colors defined by the IBM Color Graphics Adapter standard from 1981. The palette was designed around the limitations of composite video output." sources={[{
      title: 'Wikipedia: CGA',
      url: 'https://en.wikipedia.org/wiki/Color_Graphics_Adapter',
      favicon: 'https://en.wikipedia.org/favicon.ico'
    }, {
      title: 'IBM Technical Reference',
      url: 'https://www.ibm.com/docs'
    }, {
      title: 'CGA Compatibility Guide',
      url: 'https://www.dosnostalgic.com/cga',
      favicon: 'https://www.dosnostalgic.com/favicon.ico'
    }]}>
        CGA color palette
      </InlineExpand>{' '}
      for all visual elements.
    </p>
}`,...(K=(U=x.parameters)==null?void 0:U.docs)==null?void 0:K.source}}};var V,J,Q;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <p style={{
    color: 'var(--color-semantic-text-primary)',
    maxWidth: '600px',
    lineHeight: '1.6'
  }}>
      Learn about{' '}
      <InlineExpand defaultExpanded content="Phosphor displays use a coating that glows when struck by an electron beam." sources={[{
      title: 'Working Source',
      url: 'https://example.com',
      favicon: 'https://example.com/favicon.ico'
    }, {
      title: 'Broken Favicon',
      url: 'https://example.org',
      favicon: 'https://invalid.example/broken.ico'
    }, {
      title: 'No Favicon',
      url: 'https://example.net'
    }]}>
        phosphor displays
      </InlineExpand>{' '}
      to understand CRT technology.
    </p>
}`,...(Q=(J=g.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,Y,Z;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: 'Composition Patterns',
  render: () => <div style={{
    color: 'var(--color-semantic-text-primary)',
    maxWidth: '600px',
    lineHeight: '1.6',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
      <p>
        <strong>Icon via children:</strong>{' '}
        <InlineExpand content="Style Dictionary transforms token definitions into platform-specific outputs." sources={[{
        title: 'Docs',
        url: 'https://styledictionary.com'
      }]}>
          {'📖 '}Style Dictionary
        </InlineExpand>
      </p>
      <p>
        <strong>Collapse via composed content:</strong>{' '}
        <InlineExpand content={<span>
              This expansion uses a composed collapse button inside the content prop.
              <span style={{
          display: 'block',
          marginTop: '8px',
          fontSize: '12px',
          color: 'var(--color-cga-brown)',
          cursor: 'pointer',
          textDecoration: 'underline dotted'
        }}>
                [click trigger above to collapse]
              </span>
            </span>}>
          composed collapse
        </InlineExpand>
      </p>
    </div>
}`,...(Z=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};const Ee=["Default","Expanded","InParagraph","MultipleExpanded","LongContent","Controlled","WithSources","WithBrokenFavicon","CompositionPatterns"];export{y as CompositionPatterns,m as Controlled,c as Default,d as Expanded,p as InParagraph,u as LongContent,h as MultipleExpanded,g as WithBrokenFavicon,x as WithSources,Ee as __namedExportsOrder,Ce as default};
