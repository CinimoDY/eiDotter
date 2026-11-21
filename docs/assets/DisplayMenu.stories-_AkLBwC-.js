import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-Bqic0Zac.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Badge-BkcUmlDI.js";import{n as o,t as s}from"./Button-DYwuDaLT.js";import{n as c,t as l}from"./Header-Cp7iOg1e.js";import{n as u,t as d}from"./DisplayMenu-Cd1SVFne.js";function f(e){let t=e.dosDark??h.dosDark,n=e.dosPure??null;return{dosDark:t,dosLight:e.dosLight===void 0?g(t):e.dosLight,dosPure:n&&!y(n,t)?n:null,modernLight:e.modernLight??null,modernDark:e.modernDark??null}}function p(e,t={}){let n=f(t);return!(n.modernLight||n.modernDark)||e.dos?e.light&&n.dosLight?n.dosLight:e.pure&&n.dosPure?n.dosPure:n.dosDark:n.modernLight&&n.modernDark?e.light?n.modernLight:n.modernDark:n.modernLight??n.modernDark}function m(e,t,n={},r={}){let i=f(n),a={..._,...r},o=!!(i.modernLight||i.modernDark),s=[];o&&s.push({id:`dos`,label:a.dos,checked:e.dos,onChange:n=>t({...e,dos:n})});let c=!o||e.dos,l=n=>t({...e,light:n});if(c){i.dosLight&&s.push({id:`light`,label:a.light,checked:e.light,onChange:l});let n=e.light&&!!i.dosLight;i.dosPure&&!n&&s.push({id:`pure`,label:a.pure,checked:!!e.pure,onChange:n=>t({...e,pure:n})})}else i.modernLight&&i.modernDark&&s.push({id:`light`,label:a.light,checked:e.light,onChange:l});return s}var h,g,_,v,y;function b(){return(b=t((()=>{h={dosDark:`dos-86`},g=e=>e===`dos-86`?`dos-86-light`:`amber-paper`,_={dos:`DOS`,light:`Light`,pure:`Pure`},v={"amber-mono":`pure-amber`},y=(e,t)=>(v[e]??e)===(v[t]??t)})))()}function x(){let[e,t]=(0,w.useState)({dos:!0,light:!1});return m(e,t,{modernLight:`light`})}function S({open:e=!1,brandName:t=`EXAMPLE`,collapse:n=!1}){let r=x();return(0,T.jsx)(l,{brandName:t,brandCollapse:n?`mark`:`none`,items:D,sticky:!1,end:(0,T.jsx)(d,{items:r,defaultOpen:e})})}function C({theme:e}){return(0,T.jsxs)(`div`,{"data-theme":e,style:{display:`grid`,gap:`var(--spacing-2, 8px)`,padding:`var(--spacing-4, 16px)`,background:`var(--color-semantic-background-primary)`,color:`var(--color-semantic-text-primary)`},children:[(0,T.jsxs)(`span`,{children:[`data-theme="`,e,`"`]}),(0,T.jsxs)(`span`,{style:{display:`flex`,gap:`var(--spacing-2, 8px)`,flexWrap:`wrap`},children:[(0,T.jsx)(a,{variant:`success`,children:`OK`}),(0,T.jsx)(a,{variant:`warning`,children:`WARN`}),(0,T.jsx)(a,{variant:`error`,children:`ERROR`}),(0,T.jsx)(a,{variant:`info`,children:`INFO`})]})]})}var w,T,E,D,O,k,A,j,M,N,P,F,I,L,R;function z(){return(z=t((()=>{w=e(n(),1),u(),b(),c(),i(),o(),T=r(),E={title:`Components/DisplayMenu`,component:d,parameters:{layout:`fullscreen`,docs:{description:{component:"One header control for display options (DMNC-1619). The trigger opens a small panel with one Switch per option: DOS (style: DOS or modern) and LIGHT (brightness; under DOS this is the amber-paper theme, a.k.a. Eggyolk). Sites without a modern mode show only LIGHT. Options that do not apply in the current mode are hidden, not disabled. `displayMenuItems()` builds the rows from the themes a site offers. Put it in Header `end`; the consumer owns the state and applies it (for example `data-theme` on `<html>`). Icon only below 640px. Escape and a click outside close it and return focus to the trigger."}}},tags:[`autodocs`]},D=[{label:`Home`,href:`#home`},{label:`Work`,href:`#work`},{label:`Blog`,href:`#blog`}],O=e=>(0,T.jsx)(`div`,{style:{margin:`calc(-1 * var(--spacing-8))`,minHeight:`320px`},children:(0,T.jsx)(e,{})}),k={args:{items:[]},render:()=>(0,T.jsx)(S,{}),decorators:[O]},A={args:{items:[]},render:()=>(0,T.jsx)(S,{open:!0}),decorators:[O],parameters:{stable:{watch:[`.eidotter-display-menu`,`.eidotter-nav__desktop-list`,`.eidotter-display-menu__row`],themes:[`dos-86-light`],click:`.eidotter-display-menu__row:last-child .eidotter-display-menu__switch`}}},j={name:`Open (display face themes)`,args:{items:[]},render:()=>(0,T.jsx)(S,{open:!0}),decorators:[O],globals:{theme:`pure-amber`},parameters:{stable:{watch:[`.eidotter-display-menu`,`.eidotter-nav__desktop-list`,`.eidotter-display-menu__row`],themes:[`amber-paper`,`light`],click:`.eidotter-display-menu__row:last-child .eidotter-display-menu__switch`}}},M={name:`Phone 320`,args:{items:[]},render:()=>(0,T.jsxs)(`div`,{style:{display:`grid`,gap:`var(--spacing-4, 16px)`},children:[(0,T.jsx)(S,{}),(0,T.jsx)(S,{brandName:`DMNC.TECH`}),(0,T.jsx)(S,{brandName:`EIDOTTER`})]}),decorators:[O],parameters:{viewport:{defaultViewport:`phone320`},noOverflowAt:[320,390],noHeaderEndClip:!0}},N={name:`Label displays`,args:{items:[]},render:function(){let e=x();return(0,T.jsxs)(`div`,{style:{display:`flex`,gap:`var(--spacing-4, 16px)`,alignItems:`center`},children:[(0,T.jsx)(d,{items:e,labelDisplay:`label`}),(0,T.jsx)(d,{items:e,labelDisplay:`icon`}),(0,T.jsx)(d,{items:e,label:`Theme`,labelDisplay:`label`})]})}},P={dosDark:`dos-86`,dosPure:`pure-amber`,modernLight:`light`},F={name:`Pure switch (shipped)`,args:{items:[]},render:function(){let[e,t]=(0,w.useState)({dos:!0,light:!1,pure:!1}),n=p(e,P);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:`var(--spacing-4, 16px)`},children:[(0,T.jsx)(l,{brandName:`EXAMPLE`,items:D,sticky:!1,end:(0,T.jsx)(d,{items:m(e,t,P),defaultOpen:!0})}),(0,T.jsx)(C,{theme:n})]})},decorators:[O]},I={name:`Alternative: three-way row (not shipped)`,args:{items:[]},render:function(){let e=[{id:`dos-86`,label:`Amber`},{id:`pure-amber`,label:`Pure`},{id:`amber-paper`,label:`Light`}],[t,n]=(0,w.useState)(`dos-86`);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:`var(--spacing-4, 16px)`,maxWidth:`28rem`},children:[(0,T.jsx)(`p`,{children:`ALTERNATIVE (not shipped): one SCREEN row with three choices.`}),(0,T.jsx)(`div`,{className:`eidotter-display-menu__panel`,role:`group`,"aria-label":`Display (mock)`,children:(0,T.jsxs)(`fieldset`,{style:{border:0,margin:0,padding:0,display:`grid`,gap:`var(--spacing-2, 8px)`},children:[(0,T.jsx)(`legend`,{children:`Screen`}),(0,T.jsx)(`div`,{style:{display:`flex`,gap:`var(--spacing-2, 8px)`},children:e.map(e=>(0,T.jsx)(s,{size:`sm`,variant:t===e.id?`primary`:`secondary`,"aria-label":`${e.label}${t===e.id?` (selected)`:``}`,onPress:()=>n(e.id),children:e.label},e.id))})]})}),(0,T.jsx)(C,{theme:t})]})}},L={name:`Alternative: Pure as Light’s dark sibling (not shipped)`,args:{items:[]},render:function(){let[e,t]=(0,w.useState)({dos:!0,light:!1,pure:!1}),n=[{id:`dos`,label:`DOS`,checked:e.dos,onChange:n=>t({...e,dos:n})},...e.dos?[{id:`light`,label:`Light`,checked:e.light,onChange:n=>t({...e,light:n,pure:!n&&e.pure})},{id:`pure`,label:`Pure`,checked:!!e.pure,onChange:n=>t({...e,pure:n,light:!n&&e.light})}]:[]],r=p(e,P);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:`var(--spacing-4, 16px)`},children:[(0,T.jsx)(`p`,{children:`ALTERNATIVE (not shipped): LIGHT and PURE always shown under DOS, one excludes the other.`}),(0,T.jsx)(l,{brandName:`EXAMPLE`,items:D,sticky:!1,end:(0,T.jsx)(d,{items:n,defaultOpen:!0})}),(0,T.jsx)(C,{theme:r})]})},decorators:[O]},R=[`Default`,`Open`,`OpenDisplayFace`,`Phone320`,`LabelDisplays`,`PureSwitch`,`AlternativeThreeWayRow`,`AlternativeLightSibling`],k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    items: []
  },
  render: () => <InHeader />,
  decorators: [resetRoot]
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    items: []
  },
  render: () => <InHeader open />,
  decorators: [resetRoot],
  // Controls never move: the trigger, the nav and the DOS row keep their
  // boxes across themes and when a switch is used. The guard holds the body
  // face pair here (dos-86 and its light theme dos-86-light); the display
  // face group is OpenDisplayFace. dos-86 to pure-amber (the PURE switch) and
  // dos-86 to light (the DOS switch on a site with a modern theme) still shift
  // by design: the body face is wider than the display face.
  parameters: {
    stable: {
      watch: ['.eidotter-display-menu', '.eidotter-nav__desktop-list', '.eidotter-display-menu__row'],
      themes: ['dos-86-light'],
      click: '.eidotter-display-menu__row:last-child .eidotter-display-menu__switch'
    }
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Open (display face themes)',
  args: {
    items: []
  },
  render: () => <InHeader open />,
  decorators: [resetRoot],
  globals: {
    theme: 'pure-amber'
  },
  parameters: {
    stable: {
      watch: ['.eidotter-display-menu', '.eidotter-nav__desktop-list', '.eidotter-display-menu__row'],
      themes: ['amber-paper', 'light'],
      click: '.eidotter-display-menu__row:last-child .eidotter-display-menu__switch'
    }
  }
}`,...j.parameters?.docs?.source},description:{story:`The display face group: Pure Amber, amber-paper and light keep every box
across themes, the same guard as Open for the sites that keep Pure Amber.`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Phone 320',
  args: {
    items: []
  },
  render: () => <div style={{
    display: 'grid',
    gap: 'var(--spacing-4, 16px)'
  }}>
      <InHeader />
      <InHeader brandName="DMNC.TECH" />
      <InHeader brandName="EIDOTTER" />
    </div>,
  decorators: [resetRoot],
  parameters: {
    viewport: {
      defaultViewport: 'phone320'
    },
    noOverflowAt: [320, 390],
    noHeaderEndClip: true
  }
}`,...M.parameters?.docs?.source},description:{story:`320px. A short lockup keeps its icon. A longer title (DMNC.TECH) drops the
logo icon first and keeps the title whole on one line; the display button
stays whole. The test runner fails if the page scrolls sideways or the
display button is clipped.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Label displays',
  args: {
    items: []
  },
  render: function LabelDisplaysStory() {
    const items = useDisplayItems();
    return <div style={{
      display: 'flex',
      gap: 'var(--spacing-4, 16px)',
      alignItems: 'center'
    }}>
        <DisplayMenu items={items} labelDisplay="label" />
        <DisplayMenu items={items} labelDisplay="icon" />
        <DisplayMenu items={items} label="Theme" labelDisplay="label" />
      </div>;
  }
}`,...N.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Pure switch (shipped)',
  args: {
    items: []
  },
  render: function PureSwitchStory() {
    const [state, setState] = useState<DisplayState>({
      dos: true,
      light: false,
      pure: false
    });
    const theme = resolveDisplayTheme(state, PURE_SITE);
    return <div style={{
      display: 'grid',
      gap: 'var(--spacing-4, 16px)'
    }}>
        <Header brandName="EXAMPLE" items={navItems} sticky={false} end={<DisplayMenu items={displayMenuItems(state, setState, PURE_SITE)} defaultOpen />} />
        <ThemePreview theme={theme} />
      </div>;
  },
  decorators: [resetRoot]
}`,...F.parameters?.docs?.source},description:{story:"Shipped (DMNC-1643): a third switch, PURE, under DOS while LIGHT is off, on a\nsite that passes `dosPure`. It is hidden, never disabled, in modern mode and\nwhile LIGHT is on. DOS on + LIGHT off + PURE on = `dosPure` (Pure Amber);\nPURE off = `dosDark` (dos-86 here). Without `dosPure` no row appears, so no\nexisting site's menu changes.",...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Alternative: three-way row (not shipped)',
  args: {
    items: []
  },
  render: function ThreeWayStory() {
    const options = [{
      id: 'dos-86',
      label: 'Amber'
    }, {
      id: 'pure-amber',
      label: 'Pure'
    }, {
      id: 'amber-paper',
      label: 'Light'
    }];
    const [screen, setScreen] = useState('dos-86');
    return <div style={{
      display: 'grid',
      gap: 'var(--spacing-4, 16px)',
      maxWidth: '28rem'
    }}>
        <p>ALTERNATIVE (not shipped): one SCREEN row with three choices.</p>
        <div className="eidotter-display-menu__panel" role="group" aria-label="Display (mock)">
          <fieldset style={{
          border: 0,
          margin: 0,
          padding: 0,
          display: 'grid',
          gap: 'var(--spacing-2, 8px)'
        }}>
            <legend>Screen</legend>
            <div style={{
            display: 'flex',
            gap: 'var(--spacing-2, 8px)'
          }}>
              {options.map(o => <Button key={o.id} size="sm" variant={screen === o.id ? 'primary' : 'secondary'} aria-label={\`\${o.label}\${screen === o.id ? ' (selected)' : ''}\`} onPress={() => setScreen(o.id)}>
                  {o.label}
                </Button>)}
            </div>
          </fieldset>
        </div>
        <ThemePreview theme={screen} />
      </div>;
  }
}`,...I.parameters?.docs?.source},description:{story:`ALTERNATIVE, NOT SHIPPED (for comparison, DMNC-1643 G3): one three-way row
for the DOS screen instead of LIGHT plus PURE. A static mock of the panel:
DisplayMenu only renders switch rows, and this direction would need a new
row type.`,...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Alternative: Pure as Light’s dark sibling (not shipped)',
  args: {
    items: []
  },
  render: function LightSiblingStory() {
    const [state, setState] = useState<DisplayState>({
      dos: true,
      light: false,
      pure: false
    });
    const items: DisplayMenuItem[] = [{
      id: 'dos',
      label: 'DOS',
      checked: state.dos,
      onChange: dos => setState({
        ...state,
        dos
      })
    }, ...(state.dos ? [{
      id: 'light',
      label: 'Light',
      checked: state.light,
      onChange: (light: boolean) => setState({
        ...state,
        light,
        pure: light ? false : state.pure
      })
    }, {
      id: 'pure',
      label: 'Pure',
      checked: !!state.pure,
      onChange: (pure: boolean) => setState({
        ...state,
        pure,
        light: pure ? false : state.light
      })
    }] : [])];
    const theme = resolveDisplayTheme(state, PURE_SITE);
    return <div style={{
      display: 'grid',
      gap: 'var(--spacing-4, 16px)'
    }}>
        <p>ALTERNATIVE (not shipped): LIGHT and PURE always shown under DOS, one excludes the other.</p>
        <Header brandName="EXAMPLE" items={navItems} sticky={false} end={<DisplayMenu items={items} defaultOpen />} />
        <ThemePreview theme={theme} />
      </div>;
  },
  decorators: [resetRoot]
}`,...L.parameters?.docs?.source},description:{story:`ALTERNATIVE, NOT SHIPPED (for comparison, DMNC-1643 G3): Pure Amber as the
LIGHT row's dark sibling. Under DOS both rows are always visible and act as
one choice: turning PURE on turns LIGHT off and the other way round. Uses the
real DisplayMenu with story-local wiring.`,...L.parameters?.docs?.description}}}})))()}z();export{L as AlternativeLightSibling,I as AlternativeThreeWayRow,k as Default,N as LabelDisplays,A as Open,j as OpenDisplayFace,M as Phone320,F as PureSwitch,R as __namedExportsOrder,E as default};