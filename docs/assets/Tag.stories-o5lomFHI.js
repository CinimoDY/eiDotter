import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./registry-BqccLuet.js";import{i as o,n as s,r as c,t as l}from"./TagGroup-53tAzqpR.js";var u,d,f,p,m,h,g,_,v,y,b,x,S,C;e((()=>{u=t(n(),1),o(),s(),i(),d=r(),f={title:`Components/Tag`,component:c,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:a.Tag},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`default`,`outlined`,`filled`]},size:{control:`select`,options:[`small`,`medium`]},selected:{control:`boolean`},closeable:{control:`boolean`},disabled:{control:`boolean`}}},p={args:{children:`tag`}},m={render:()=>(0,d.jsxs)(l,{children:[(0,d.jsx)(c,{variant:`default`,children:`default`}),(0,d.jsx)(c,{variant:`outlined`,children:`outlined`}),(0,d.jsx)(c,{variant:`filled`,children:`filled`})]})},h={render:()=>(0,d.jsxs)(l,{children:[(0,d.jsx)(c,{size:`small`,children:`small`}),(0,d.jsx)(c,{size:`medium`,children:`medium`})]})},g={render:()=>(0,d.jsx)(()=>{let[e,t]=(0,u.useState)([`react`,`typescript`,`dos`,`cga`]);return(0,d.jsxs)(l,{children:[e.map(e=>(0,d.jsx)(c,{closeable:!0,onClose:()=>t(t=>t.filter(t=>t!==e)),children:e},e)),e.length===0&&(0,d.jsx)(`span`,{style:{color:`#5F340E`,fontFamily:`monospace`,fontSize:`12px`},children:`All tags removed`})]})},{})},_={render:()=>(0,d.jsx)(()=>{let[e,t]=(0,u.useState)(new Set([`active`])),n=[`active`,`archived`,`draft`,`published`],r=e=>{t(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})};return(0,d.jsx)(l,{children:n.map(t=>(0,d.jsx)(c,{selected:e.has(t),onClick:()=>r(t),children:t},t))})},{})},v={name:`Custom CGA Colors`,render:()=>{let e={project:`--color-cga-bright-cyan`,area:`--color-cga-bright-green`,resource:`--color-cga-yellow`,archive:`--color-cga-brown`};return(0,d.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`},children:[(0,d.jsx)(`div`,{style:{color:`#AAAAAA`,fontFamily:`monospace`,fontSize:`12px`},children:`PARA categories with CGA colors (outlined)`}),(0,d.jsx)(l,{children:Object.entries(e).map(([e,t])=>(0,d.jsx)(c,{variant:`outlined`,color:t,children:e},e))}),(0,d.jsx)(`div`,{style:{color:`#AAAAAA`,fontFamily:`monospace`,fontSize:`12px`,marginTop:`8px`},children:`PARA categories with CGA colors (filled)`}),(0,d.jsx)(l,{children:Object.entries(e).map(([e,t])=>(0,d.jsx)(c,{variant:`filled`,color:t,children:e},e))})]})}},y={name:`TagGroup Gaps`,render:()=>(0,d.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`div`,{style:{color:`#AAAAAA`,fontFamily:`monospace`,fontSize:`12px`,marginBottom:`4px`},children:`tight`}),(0,d.jsxs)(l,{gap:`tight`,children:[(0,d.jsx)(c,{children:`one`}),(0,d.jsx)(c,{children:`two`}),(0,d.jsx)(c,{children:`three`})]})]}),(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`div`,{style:{color:`#AAAAAA`,fontFamily:`monospace`,fontSize:`12px`,marginBottom:`4px`},children:`normal (default)`}),(0,d.jsxs)(l,{gap:`normal`,children:[(0,d.jsx)(c,{children:`one`}),(0,d.jsx)(c,{children:`two`}),(0,d.jsx)(c,{children:`three`})]})]}),(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`div`,{style:{color:`#AAAAAA`,fontFamily:`monospace`,fontSize:`12px`,marginBottom:`4px`},children:`loose`}),(0,d.jsxs)(l,{gap:`loose`,children:[(0,d.jsx)(c,{children:`one`}),(0,d.jsx)(c,{children:`two`}),(0,d.jsx)(c,{children:`three`})]})]})]})},b={render:()=>(0,d.jsx)(()=>{let[e,t]=(0,u.useState)(`all`);return(0,d.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,d.jsx)(l,{children:[`all`,`photos`,`notes`,`bookmarks`].map(n=>(0,d.jsx)(c,{selected:e===n,onClick:()=>t(n),children:n},n))}),(0,d.jsxs)(`div`,{style:{color:`#AAAAAA`,fontFamily:`monospace`,fontSize:`12px`},children:[`Showing: `,e]})]})},{})},x={render:()=>(0,d.jsxs)(l,{children:[(0,d.jsx)(c,{disabled:!0,children:`disabled`}),(0,d.jsx)(c,{disabled:!0,closeable:!0,children:`closeable disabled`}),(0,d.jsx)(c,{disabled:!0,onClick:()=>{},children:`interactive disabled`})]})},S={name:`Timeline Entry (Real-world)`,render:()=>(0,d.jsx)(()=>{let[e,t]=(0,u.useState)([`design`,`eidotter`,`milestone`]),n=e=>t(t=>t.filter(t=>t!==e));return(0,d.jsxs)(`div`,{style:{border:`1px solid var(--color-semantic-border-default)`,padding:`12px`,fontFamily:`monospace`,maxWidth:`400px`},children:[(0,d.jsx)(`div`,{style:{color:`var(--color-semantic-text-primary)`,fontSize:`14px`,marginBottom:`8px`},children:`Released eiDotter v0.6.0`}),(0,d.jsx)(`div`,{style:{color:`#AAAAAA`,fontSize:`11px`,marginBottom:`8px`},children:`2026-02-08 22:00`}),(0,d.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,d.jsx)(c,{variant:`filled`,size:`small`,color:`--color-cga-bright-cyan`,onClick:()=>{},children:`project`}),(0,d.jsx)(l,{gap:`tight`,children:e.map(e=>(0,d.jsx)(c,{size:`small`,closeable:!0,onClose:()=>n(e),children:e},e))})]})]})},{})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'tag'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <TagGroup>
      <Tag variant="default">default</Tag>
      <Tag variant="outlined">outlined</Tag>
      <Tag variant="filled">filled</Tag>
    </TagGroup>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <TagGroup>
      <Tag size="small">small</Tag>
      <Tag size="medium">medium</Tag>
    </TagGroup>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const CloseTags = () => {
      const [tags, setTags] = useState(['react', 'typescript', 'dos', 'cga']);
      return <TagGroup>
          {tags.map(tag => <Tag key={tag} closeable onClose={() => setTags(prev => prev.filter(t => t !== tag))}>
              {tag}
            </Tag>)}
          {tags.length === 0 && <span style={{
          color: '#5F340E',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
              All tags removed
            </span>}
        </TagGroup>;
    };
    return <CloseTags />;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => {
    const SelectTags = () => {
      const [selected, setSelected] = useState<Set<string>>(new Set(['active']));
      const tags = ['active', 'archived', 'draft', 'published'];
      const toggle = (tag: string) => {
        setSelected(prev => {
          const next = new Set(prev);
          if (next.has(tag)) next.delete(tag);else next.add(tag);
          return next;
        });
      };
      return <TagGroup>
          {tags.map(tag => <Tag key={tag} selected={selected.has(tag)} onClick={() => toggle(tag)}>
              {tag}
            </Tag>)}
        </TagGroup>;
    };
    return <SelectTags />;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Custom CGA Colors',
  render: () => {
    const paraColors: Record<string, string> = {
      project: '--color-cga-bright-cyan',
      area: '--color-cga-bright-green',
      resource: '--color-cga-yellow',
      archive: '--color-cga-brown'
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
        <div style={{
        color: '#AAAAAA',
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>
          PARA categories with CGA colors (outlined)
        </div>
        <TagGroup>
          {Object.entries(paraColors).map(([name, color]) => <Tag key={name} variant="outlined" color={color}>
              {name}
            </Tag>)}
        </TagGroup>
        <div style={{
        color: '#AAAAAA',
        fontFamily: 'monospace',
        fontSize: '12px',
        marginTop: '8px'
      }}>
          PARA categories with CGA colors (filled)
        </div>
        <TagGroup>
          {Object.entries(paraColors).map(([name, color]) => <Tag key={name} variant="filled" color={color}>
              {name}
            </Tag>)}
        </TagGroup>
      </div>;
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'TagGroup Gaps',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <div>
        <div style={{
        color: '#AAAAAA',
        fontFamily: 'monospace',
        fontSize: '12px',
        marginBottom: '4px'
      }}>
          tight
        </div>
        <TagGroup gap="tight">
          <Tag>one</Tag><Tag>two</Tag><Tag>three</Tag>
        </TagGroup>
      </div>
      <div>
        <div style={{
        color: '#AAAAAA',
        fontFamily: 'monospace',
        fontSize: '12px',
        marginBottom: '4px'
      }}>
          normal (default)
        </div>
        <TagGroup gap="normal">
          <Tag>one</Tag><Tag>two</Tag><Tag>three</Tag>
        </TagGroup>
      </div>
      <div>
        <div style={{
        color: '#AAAAAA',
        fontFamily: 'monospace',
        fontSize: '12px',
        marginBottom: '4px'
      }}>
          loose
        </div>
        <TagGroup gap="loose">
          <Tag>one</Tag><Tag>two</Tag><Tag>three</Tag>
        </TagGroup>
      </div>
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const FilterTags = () => {
      const [active, setActive] = useState('all');
      const filters = ['all', 'photos', 'notes', 'bookmarks'];
      return <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
          <TagGroup>
            {filters.map(f => <Tag key={f} selected={active === f} onClick={() => setActive(f)}>
                {f}
              </Tag>)}
          </TagGroup>
          <div style={{
          color: '#AAAAAA',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
            Showing: {active}
          </div>
        </div>;
    };
    return <FilterTags />;
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <TagGroup>
      <Tag disabled>disabled</Tag>
      <Tag disabled closeable>closeable disabled</Tag>
      <Tag disabled onClick={() => {}}>interactive disabled</Tag>
    </TagGroup>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Timeline Entry (Real-world)',
  render: () => {
    const TimelineDemo = () => {
      const [tags, setTags] = useState(['design', 'eidotter', 'milestone']);
      const remove = (tag: string) => setTags(prev => prev.filter(t => t !== tag));
      return <div style={{
        border: '1px solid var(--color-semantic-border-default)',
        padding: '12px',
        fontFamily: 'monospace',
        maxWidth: '400px'
      }}>
          <div style={{
          color: 'var(--color-semantic-text-primary)',
          fontSize: '14px',
          marginBottom: '8px'
        }}>
            Released eiDotter v0.6.0
          </div>
          <div style={{
          color: '#AAAAAA',
          fontSize: '11px',
          marginBottom: '8px'
        }}>
            2026-02-08 22:00
          </div>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
            <Tag variant="filled" size="small" color="--color-cga-bright-cyan" onClick={() => {}}>
              project
            </Tag>
            <TagGroup gap="tight">
              {tags.map(tag => <Tag key={tag} size="small" closeable onClose={() => remove(tag)}>
                  {tag}
                </Tag>)}
            </TagGroup>
          </div>
        </div>;
    };
    return <TimelineDemo />;
  }
}`,...S.parameters?.docs?.source}}},C=[`Default`,`Variants`,`Sizes`,`Closeable`,`Selectable`,`WithColors`,`TagGroupStory`,`Interactive`,`Disabled`,`TimelineEntry`]}))();export{g as Closeable,p as Default,x as Disabled,b as Interactive,_ as Selectable,h as Sizes,y as TagGroupStory,S as TimelineEntry,m as Variants,v as WithColors,C as __namedExportsOrder,f as default};