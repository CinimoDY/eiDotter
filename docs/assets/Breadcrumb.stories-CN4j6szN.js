import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-Bqic0Zac.js";import{r as n,t as r}from"./registry-EhIcK3QA.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import"./provenance-BYciLoif.js";import{n as a,t as o}from"./Breadcrumb-C0HyCkgd.js";var s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{a(),t(),n(),s=i(),c={title:`Components/Breadcrumb`,component:o,parameters:{layout:`centered`,projectMeta:r.Breadcrumb},tags:[`autodocs`],argTypes:{trail:{control:`object`,description:`Array of breadcrumb trail items`},currentLabel:{control:`text`,description:`Current page label`},showBackArrow:{control:`boolean`,description:`Show back arrow on last trail item`},separator:{control:`text`,description:`Custom separator character`}}},l={args:{trail:[{href:`/`,label:`Home`},{href:`/projects`,label:`Projects`}],currentLabel:`Eidotter`}},u={args:{trail:[{href:`/`,label:`Home`}],currentLabel:`About`}},d={args:{trail:[{href:`/`,label:`Home`},{href:`/projects`,label:`Projects`},{href:`/projects/design-systems`,label:`Design Systems`}],currentLabel:`Eidotter`}},f={args:{trail:[],currentLabel:`Home`}},p={args:{trail:[{href:`/`,label:`Home`},{href:`/projects`,label:`Projects`}],currentLabel:`Eidotter`,showBackArrow:!1}},m={args:{trail:[{href:`/`,label:`C:`},{href:`/projects`,label:`Projects`}],currentLabel:`Readme.txt`,separator:`\\`}},h={args:{trail:[{href:`/`,label:`C:`},{href:`/dos`,label:`DOS`}],currentLabel:`COMMAND.COM`,separator:`\\`,showBackArrow:!1}},g=`This paragraph is AI-drafted and not yet revised — it should render with the magenta provenance gradient clipped to its glyphs, unlike the breadcrumb above it.`,_=[{href:`/`,label:`Home`},{href:`/projects`,label:`Projects`}],v=new Set([`transparent`,`rgba(0, 0, 0, 0)`]),y=e=>getComputedStyle(e).getPropertyValue(`-webkit-text-fill-color`).trim(),b=e=>getComputedStyle(e).backgroundImage.trim(),x={parameters:{layout:`fullscreen`},render:()=>(0,s.jsxs)(`article`,{"data-ai-block":!0,style:{display:`flex`,flexDirection:`column`,gap:`24px`,padding:`24px`,background:`var(--color-semantic-background-primary)`,fontFamily:`var(--typography-font-family-primary)`},children:[(0,s.jsxs)(`section`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`},children:[(0,s.jsx)(o,{trail:_,currentLabel:`Eidotter`}),(0,s.jsx)(`p`,{style:{margin:0,maxWidth:`60ch`},children:g}),(0,s.jsx)(`ul`,{style:{margin:0},children:(0,s.jsx)(`li`,{children:`A content list item inside the AI block — this one keeps the gradient.`})})]}),(0,s.jsx)(`section`,{"data-theme":`light`,style:{display:`flex`,flexDirection:`column`,gap:`12px`,padding:`16px`,background:`#FFE8A8`},children:(0,s.jsx)(`p`,{style:{margin:0,maxWidth:`60ch`},children:g})})]}),play:async({canvasElement:e})=>{let t=e.querySelectorAll(`.eidotter-breadcrumb__link`);if(t.length===0)throw Error(`InsideAIBlock: expected breadcrumb links, found none`);t.forEach(e=>{if(v.has(y(e)))throw Error(`DMNC-1193 regression: breadcrumb link "${e.textContent}" has a transparent text-fill inside [data-ai-block] (invisible glyphs)`);if(b(e)!==`none`)throw Error(`DMNC-1193 regression: breadcrumb link "${e.textContent}" inherited a gradient background inside [data-ai-block]`)});let n=t[0],r=document.createElement(`span`);r.style.color=`var(--color-semantic-text-accent)`,n.parentElement?.appendChild(r);let i=getComputedStyle(r).color,a=getComputedStyle(n).color;if(r.remove(),a!==i)throw Error(`DMNC-1193: breadcrumb link colour ${a} != component accent ${i} — its own colour was stomped`);let o=e.querySelectorAll(`[data-ai-block] p, [data-ai-block] ul > li`);if(o.length===0)throw Error(`InsideAIBlock: expected gradient prose, found none`);o.forEach(e=>{if(!v.has(y(e)))throw Error(`DMNC-1193 over-exclusion: prose "${e.textContent?.slice(0,24)}…" lost its transparent fill`);if(!b(e).includes(`linear-gradient`))throw Error(`DMNC-1193 over-exclusion: prose "${e.textContent?.slice(0,24)}…" lost its gradient background`)})}},S={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`var(--color-semantic-text-muted)`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Default`}),(0,s.jsx)(o,{trail:[{href:`/`,label:`Home`},{href:`/projects`,label:`Projects`}],currentLabel:`Eidotter`})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`var(--color-semantic-text-muted)`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`DOS Path Style`}),(0,s.jsx)(o,{trail:[{href:`/`,label:`C:`},{href:`/dos`,label:`DOS`}],currentLabel:`AUTOEXEC.BAT`,separator:`\\`,showBackArrow:!1})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{color:`var(--color-semantic-text-muted)`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Single Level`}),(0,s.jsx)(o,{trail:[{href:`/`,label:`Home`}],currentLabel:`Contact`})]})]})},C=[`Default`,`SingleLevel`,`DeepNavigation`,`NoTrail`,`WithoutBackArrow`,`CustomSeparator`,`DOSPath`,`InsideAIBlock`,`AllVariants`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'Home'
    }, {
      href: '/projects',
      label: 'Projects'
    }],
    currentLabel: 'Eidotter'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'Home'
    }],
    currentLabel: 'About'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'Home'
    }, {
      href: '/projects',
      label: 'Projects'
    }, {
      href: '/projects/design-systems',
      label: 'Design Systems'
    }],
    currentLabel: 'Eidotter'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [],
    currentLabel: 'Home'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'Home'
    }, {
      href: '/projects',
      label: 'Projects'
    }],
    currentLabel: 'Eidotter',
    showBackArrow: false
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'C:'
    }, {
      href: '/projects',
      label: 'Projects'
    }],
    currentLabel: 'Readme.txt',
    separator: '\\\\'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    trail: [{
      href: '/',
      label: 'C:'
    }, {
      href: '/dos',
      label: 'DOS'
    }],
    currentLabel: 'COMMAND.COM',
    separator: '\\\\',
    showBackArrow: false
  }
}`,...h.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <article data-ai-block style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '24px',
    background: 'var(--color-semantic-background-primary)',
    fontFamily: 'var(--typography-font-family-primary)'
  }}>
      {/* Dark (default theme) */}
      <section style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
        <Breadcrumb trail={breadcrumbTrail} currentLabel="Eidotter" />
        <p style={{
        margin: 0,
        maxWidth: '60ch'
      }}>{aiProse}</p>
        <ul style={{
        margin: 0
      }}>
          <li>A content list item inside the AI block — this one keeps the gradient.</li>
        </ul>
      </section>

      {/* Light theme — gradient swaps to the deep-magenta→violet stops. Prose
          only (no breadcrumb): the point here is the gradient variant. */}
      <section data-theme="light" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '16px',
      background: '#FFE8A8'
    }}>
        <p style={{
        margin: 0,
        maxWidth: '60ch'
      }}>{aiProse}</p>
      </section>
    </article>,
  play: async ({
    canvasElement
  }: {
    canvasElement: HTMLElement;
  }) => {
    // 1. Every breadcrumb link (both theme scopes) must stay opaque with no
    //    inherited gradient — the DMNC-1193 bug made these transparent/invisible.
    const links = canvasElement.querySelectorAll('.eidotter-breadcrumb__link');
    if (links.length === 0) throw new Error('InsideAIBlock: expected breadcrumb links, found none');
    links.forEach(link => {
      if (TRANSPARENT_FILLS.has(fillColor(link))) {
        throw new Error(\`DMNC-1193 regression: breadcrumb link "\${link.textContent}" has a transparent text-fill inside [data-ai-block] (invisible glyphs)\`);
      }
      if (bgImage(link) !== 'none') {
        throw new Error(\`DMNC-1193 regression: breadcrumb link "\${link.textContent}" inherited a gradient background inside [data-ai-block]\`);
      }
    });

    // 2. Own-accent check — the first link must keep the component's own accent,
    //    not a layout-inherited colour. Probe with a live element in the same scope.
    const firstLink = links[0] as HTMLElement;
    const probe = document.createElement('span');
    probe.style.color = 'var(--color-semantic-text-accent)';
    firstLink.parentElement?.appendChild(probe);
    const accent = getComputedStyle(probe).color;
    const linkColor = getComputedStyle(firstLink).color;
    probe.remove();
    if (linkColor !== accent) {
      throw new Error(\`DMNC-1193: breadcrumb link colour \${linkColor} != component accent \${accent} — its own colour was stomped\`);
    }

    // 3. Prose regression guard — content <p> and content <ul><li> inside the
    //    block MUST still be gradient-clipped (transparent fill + linear-gradient),
    //    in BOTH theme scopes. The exclusion must be nav-scoped, not global.
    const prose = canvasElement.querySelectorAll('[data-ai-block] p, [data-ai-block] ul > li');
    if (prose.length === 0) throw new Error('InsideAIBlock: expected gradient prose, found none');
    prose.forEach(el => {
      if (!TRANSPARENT_FILLS.has(fillColor(el))) {
        throw new Error(\`DMNC-1193 over-exclusion: prose "\${el.textContent?.slice(0, 24)}…" lost its transparent fill\`);
      }
      if (!bgImage(el).includes('linear-gradient')) {
        throw new Error(\`DMNC-1193 over-exclusion: prose "\${el.textContent?.slice(0, 24)}…" lost its gradient background\`);
      }
    });
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
      <div>
        <div style={{
        color: 'var(--color-semantic-text-muted)',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Default
        </div>
        <Breadcrumb trail={[{
        href: '/',
        label: 'Home'
      }, {
        href: '/projects',
        label: 'Projects'
      }]} currentLabel="Eidotter" />
      </div>
      <div>
        <div style={{
        color: 'var(--color-semantic-text-muted)',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          DOS Path Style
        </div>
        <Breadcrumb trail={[{
        href: '/',
        label: 'C:'
      }, {
        href: '/dos',
        label: 'DOS'
      }]} currentLabel="AUTOEXEC.BAT" separator="\\" showBackArrow={false} />
      </div>
      <div>
        <div style={{
        color: 'var(--color-semantic-text-muted)',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Single Level
        </div>
        <Breadcrumb trail={[{
        href: '/',
        label: 'Home'
      }]} currentLabel="Contact" />
      </div>
    </div>
}`,...S.parameters?.docs?.source}}}})))()}w();export{S as AllVariants,m as CustomSeparator,h as DOSPath,d as DeepNavigation,l as Default,x as InsideAIBlock,f as NoTrail,u as SingleLevel,p as WithoutBackArrow,C as __namedExportsOrder,c as default};