import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./registry-BqccLuet.js";import{n as o,t as s}from"./InlineExpand-Dvq-jQV3.js";var c,l,u,d,f,p,m,h,g,_,v,y,b;e((()=>{o(),c=t(n(),1),i(),l=r(),u={title:`Components/InlineExpand`,component:s,parameters:{layout:`padded`,projectMeta:a.InlineExpand},tags:[`autodocs`],argTypes:{content:{control:`text`,description:`Content revealed when expanded`},defaultExpanded:{control:`boolean`,description:`Whether expanded by default (uncontrolled)`},onToggle:{action:`toggle`,description:`Callback when expand state changes`}}},d={args:{children:`CGA color palette`,content:`16 colors defined by the IBM Color Graphics Adapter standard from 1981, used across all DOS-era applications.`}},f={args:{children:`CGA color palette`,content:`16 colors defined by the IBM Color Graphics Adapter standard from 1981, used across all DOS-era applications.`,defaultExpanded:!0}},p={render:()=>(0,l.jsxs)(`p`,{style:{color:`var(--color-semantic-text-primary)`,maxWidth:`600px`,lineHeight:`1.6`},children:[`The system uses a`,` `,(0,l.jsx)(s,{content:`16 colors defined by the IBM Color Graphics Adapter standard from 1981. The palette includes 4 shades of gray, plus pure red, green, blue, cyan, magenta, yellow, brown, and their bright variants.`,children:`CGA color palette`}),` `,`for all visual elements. Each component respects the`,` `,(0,l.jsx)(s,{content:`Tokens are design decisions stored as named values. Colors, spacing, typography, and timing are all tokenized so themes can override any value without changing component code.`,children:`design token pipeline`}),` `,`to ensure consistency across themes.`]})},m={render:()=>(0,l.jsxs)(`p`,{style:{color:`var(--color-semantic-text-primary)`,maxWidth:`600px`,lineHeight:`1.6`},children:[`The`,` `,(0,l.jsx)(s,{defaultExpanded:!0,content:`A phosphor display uses a coating that glows when struck by an electron beam, producing visible light. Amber phosphor (P3) was popular for reducing eye strain during long sessions.`,children:`phosphor display`}),` `,`technology defined the visual character of early computing. The`,` `,(0,l.jsx)(s,{defaultExpanded:!0,content:`Cathode Ray Tube — a vacuum tube containing electron guns that fire beams at a phosphor-coated screen. Scanlines, flicker, and bloom are characteristic CRT artifacts.`,children:`CRT`}),` `,`artifacts we simulate are authentic to that era.`]})},h={args:{children:`photosynthesis`,content:`Photosynthesis is a biological process used by most plants, algae, and certain bacteria to convert light energy into chemical energy stored in glucose. The process occurs in two main stages: the light-dependent reactions, which take place in the thylakoid membranes, and the Calvin cycle, which occurs in the stroma of the chloroplast. During the light reactions, water molecules are split, releasing oxygen as a byproduct, while ATP and NADPH are generated. These energy carriers then power the Calvin cycle, where carbon dioxide is fixed into organic molecules through a series of enzyme-catalyzed reactions.`}},g={render:function(){let[e,t]=c.useState(!1);return(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,l.jsxs)(`p`,{style:{color:`var(--color-semantic-text-primary)`},children:[`Click the trigger or the button below to toggle:`,` `,(0,l.jsx)(s,{expanded:e,onToggle:t,content:`This expansion is controlled by external state. Both the trigger and the button below toggle it.`,children:`controlled term`})]}),(0,l.jsxs)(`button`,{type:`button`,onClick:()=>t(!e),style:{color:`var(--color-semantic-text-primary)`,background:`var(--color-semantic-background-secondary)`,border:`1px solid var(--color-semantic-border-default)`,padding:`4px 12px`,cursor:`pointer`,fontFamily:`inherit`},children:[e?`Collapse`:`Expand`,` externally`]})]})}},_={render:()=>(0,l.jsxs)(`p`,{style:{color:`var(--color-semantic-text-primary)`,maxWidth:`600px`,lineHeight:`1.6`},children:[`The display uses a`,` `,(0,l.jsx)(s,{defaultExpanded:!0,content:`16 colors defined by the IBM Color Graphics Adapter standard from 1981. The palette was designed around the limitations of composite video output.`,sources:[{title:`Wikipedia: CGA`,url:`https://en.wikipedia.org/wiki/Color_Graphics_Adapter`,favicon:`https://en.wikipedia.org/favicon.ico`},{title:`IBM Technical Reference`,url:`https://www.ibm.com/docs`},{title:`CGA Compatibility Guide`,url:`https://www.dosnostalgic.com/cga`,favicon:`https://www.dosnostalgic.com/favicon.ico`}],children:`CGA color palette`}),` `,`for all visual elements.`]})},v={render:()=>(0,l.jsxs)(`p`,{style:{color:`var(--color-semantic-text-primary)`,maxWidth:`600px`,lineHeight:`1.6`},children:[`Learn about`,` `,(0,l.jsx)(s,{defaultExpanded:!0,content:`Phosphor displays use a coating that glows when struck by an electron beam.`,sources:[{title:`Working Source`,url:`https://example.com`,favicon:`https://example.com/favicon.ico`},{title:`Broken Favicon`,url:`https://example.org`,favicon:`https://invalid.example/broken.ico`},{title:`No Favicon`,url:`https://example.net`}],children:`phosphor displays`}),` `,`to understand CRT technology.`]})},y={name:`Composition Patterns`,render:()=>(0,l.jsxs)(`div`,{style:{color:`var(--color-semantic-text-primary)`,maxWidth:`600px`,lineHeight:`1.6`,display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,l.jsxs)(`p`,{children:[(0,l.jsx)(`strong`,{children:`Icon via children:`}),` `,(0,l.jsxs)(s,{content:`Style Dictionary transforms token definitions into platform-specific outputs.`,sources:[{title:`Docs`,url:`https://styledictionary.com`}],children:[`📖 `,`Style Dictionary`]})]}),(0,l.jsxs)(`p`,{children:[(0,l.jsx)(`strong`,{children:`Collapse via composed content:`}),` `,(0,l.jsx)(s,{content:(0,l.jsxs)(`span`,{children:[`This expansion uses a composed collapse button inside the content prop.`,(0,l.jsx)(`span`,{style:{display:`block`,marginTop:`8px`,fontSize:`12px`,color:`var(--color-cga-brown)`,cursor:`pointer`,textDecoration:`underline dotted`},children:`[click trigger above to collapse]`})]}),children:`composed collapse`})]})]})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'CGA color palette',
    content: '16 colors defined by the IBM Color Graphics Adapter standard from 1981, used across all DOS-era applications.'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'CGA color palette',
    content: '16 colors defined by the IBM Color Graphics Adapter standard from 1981, used across all DOS-era applications.',
    defaultExpanded: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'photosynthesis',
    content: 'Photosynthesis is a biological process used by most plants, algae, and certain bacteria to convert light energy into chemical energy stored in glucose. The process occurs in two main stages: the light-dependent reactions, which take place in the thylakoid membranes, and the Calvin cycle, which occurs in the stroma of the chloroplast. During the light reactions, water molecules are split, releasing oxygen as a byproduct, while ATP and NADPH are generated. These energy carriers then power the Calvin cycle, where carbon dioxide is fixed into organic molecules through a series of enzyme-catalyzed reactions.'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b=[`Default`,`Expanded`,`InParagraph`,`MultipleExpanded`,`LongContent`,`Controlled`,`WithSources`,`WithBrokenFavicon`,`CompositionPatterns`]}))();export{y as CompositionPatterns,g as Controlled,d as Default,f as Expanded,p as InParagraph,h as LongContent,m as MultipleExpanded,v as WithBrokenFavicon,_ as WithSources,b as __namedExportsOrder,u as default};