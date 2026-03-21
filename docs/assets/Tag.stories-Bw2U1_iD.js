import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as f}from"./iframe-K6BYEX5l.js";import{T as r,a as s}from"./TagGroup-DQbdAM4Q.js";import{c as Z}from"./registry-DlnQDLA5.js";import"./preload-helper-Dp1pzeXC.js";import"./useAnimatedDismiss-B4JOHfQW.js";import"./prefersReducedMotion-lKH2k1Yv.js";const ne={title:"Components/Tag",component:r,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:Z.Tag},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","outlined","filled"]},size:{control:"select",options:["small","medium"]},selected:{control:"boolean"},closeable:{control:"boolean"},disabled:{control:"boolean"}}},d={args:{children:"tag"}},p={render:()=>e.jsxs(s,{children:[e.jsx(r,{variant:"default",children:"default"}),e.jsx(r,{variant:"outlined",children:"outlined"}),e.jsx(r,{variant:"filled",children:"filled"})]})},g={render:()=>e.jsxs(s,{children:[e.jsx(r,{size:"small",children:"small"}),e.jsx(r,{size:"medium",children:"medium"})]})},m={render:()=>{const l=()=>{const[o,n]=f.useState(["react","typescript","dos","cga"]);return e.jsxs(s,{children:[o.map(i=>e.jsx(r,{closeable:!0,onClose:()=>n(a=>a.filter(t=>t!==i)),children:i},i)),o.length===0&&e.jsx("span",{style:{color:"#5F340E",fontFamily:"monospace",fontSize:"12px"},children:"All tags removed"})]})};return e.jsx(l,{})}},u={render:()=>{const l=()=>{const[o,n]=f.useState(new Set(["active"])),i=["active","archived","draft","published"],a=t=>{n(y=>{const c=new Set(y);return c.has(t)?c.delete(t):c.add(t),c})};return e.jsx(s,{children:i.map(t=>e.jsx(r,{selected:o.has(t),onClick:()=>a(t),children:t},t))})};return e.jsx(l,{})}},x={name:"Custom CGA Colors",render:()=>{const l={project:"--color-cga-bright-cyan",area:"--color-cga-bright-green",resource:"--color-cga-yellow",archive:"--color-cga-brown"};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px"},children:"PARA categories with CGA colors (outlined)"}),e.jsx(s,{children:Object.entries(l).map(([o,n])=>e.jsx(r,{variant:"outlined",color:n,children:o},o))}),e.jsx("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px",marginTop:"8px"},children:"PARA categories with CGA colors (filled)"}),e.jsx(s,{children:Object.entries(l).map(([o,n])=>e.jsx(r,{variant:"filled",color:n,children:o},o))})]})}},T={name:"TagGroup Gaps",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px",marginBottom:"4px"},children:"tight"}),e.jsxs(s,{gap:"tight",children:[e.jsx(r,{children:"one"}),e.jsx(r,{children:"two"}),e.jsx(r,{children:"three"})]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px",marginBottom:"4px"},children:"normal (default)"}),e.jsxs(s,{gap:"normal",children:[e.jsx(r,{children:"one"}),e.jsx(r,{children:"two"}),e.jsx(r,{children:"three"})]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px",marginBottom:"4px"},children:"loose"}),e.jsxs(s,{gap:"loose",children:[e.jsx(r,{children:"one"}),e.jsx(r,{children:"two"}),e.jsx(r,{children:"three"})]})]})]})},A={render:()=>{const l=()=>{const[o,n]=f.useState("all"),i=["all","photos","notes","bookmarks"];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsx(s,{children:i.map(a=>e.jsx(r,{selected:o===a,onClick:()=>n(a),children:a},a))}),e.jsxs("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px"},children:["Showing: ",o]})]})};return e.jsx(l,{})}},v={render:()=>e.jsxs(s,{children:[e.jsx(r,{disabled:!0,children:"disabled"}),e.jsx(r,{disabled:!0,closeable:!0,children:"closeable disabled"}),e.jsx(r,{disabled:!0,onClick:()=>{},children:"interactive disabled"})]})},h={name:"Timeline Entry (Real-world)",render:()=>{const l=()=>{const[o,n]=f.useState(["design","eidotter","milestone"]),i=a=>n(t=>t.filter(y=>y!==a));return e.jsxs("div",{style:{border:"1px solid var(--color-semantic-border-default)",padding:"12px",fontFamily:"monospace",maxWidth:"400px"},children:[e.jsx("div",{style:{color:"var(--color-semantic-text-primary)",fontSize:"14px",marginBottom:"8px"},children:"Released eiDotter v0.6.0"}),e.jsx("div",{style:{color:"#AAAAAA",fontSize:"11px",marginBottom:"8px"},children:"2026-02-08 22:00"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(r,{variant:"filled",size:"small",color:"--color-cga-bright-cyan",onClick:()=>{},children:"project"}),e.jsx(s,{gap:"tight",children:o.map(a=>e.jsx(r,{size:"small",closeable:!0,onClose:()=>i(a),children:a},a))})]})]})};return e.jsx(l,{})}};var j,S,b;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    children: 'tag'
  }
}`,...(b=(S=d.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var G,C,z;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <TagGroup>
      <Tag variant="default">default</Tag>
      <Tag variant="outlined">outlined</Tag>
      <Tag variant="filled">filled</Tag>
    </TagGroup>
}`,...(z=(C=p.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};var w,F,k;g.parameters={...g.parameters,docs:{...(w=g.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <TagGroup>
      <Tag size="small">small</Tag>
      <Tag size="medium">medium</Tag>
    </TagGroup>
}`,...(k=(F=g.parameters)==null?void 0:F.docs)==null?void 0:k.source}}};var D,R,B;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(B=(R=m.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var E,O,I;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(I=(O=u.parameters)==null?void 0:O.docs)==null?void 0:I.source}}};var P,W,V;x.parameters={...x.parameters,docs:{...(P=x.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(V=(W=x.parameters)==null?void 0:W.docs)==null?void 0:V.source}}};var _,M,q;T.parameters={...T.parameters,docs:{...(_=T.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(q=(M=T.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var H,J,K;A.parameters={...A.parameters,docs:{...(H=A.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(K=(J=A.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var L,N,Q;v.parameters={...v.parameters,docs:{...(L=v.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <TagGroup>
      <Tag disabled>disabled</Tag>
      <Tag disabled closeable>closeable disabled</Tag>
      <Tag disabled onClick={() => {}}>interactive disabled</Tag>
    </TagGroup>
}`,...(Q=(N=v.parameters)==null?void 0:N.docs)==null?void 0:Q.source}}};var U,X,Y;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(Y=(X=h.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const le=["Default","Variants","Sizes","Closeable","Selectable","WithColors","TagGroupStory","Interactive","Disabled","TimelineEntry"];export{m as Closeable,d as Default,v as Disabled,A as Interactive,u as Selectable,g as Sizes,T as TagGroupStory,h as TimelineEntry,p as Variants,x as WithColors,le as __namedExportsOrder,ne as default};
