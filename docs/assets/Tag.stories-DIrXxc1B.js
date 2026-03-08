import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as j}from"./iframe-Cnx5oUV1.js";import{c as de}from"./registry-B_NR6ZmP.js";import"./preload-helper-Dp1pzeXC.js";const a=({children:n,variant:t="default",size:s="medium",color:l,selected:r=!1,closeable:o=!1,disabled:i=!1,onClick:p,onClose:m,className:ae="","aria-label":te,...re})=>{const S=!!p&&!i,oe=["tag",`tag--${t}`,`tag--${s}`,r&&"tag--selected",i&&"tag--disabled",o&&"tag--closeable",S&&"tag--interactive",ae].filter(Boolean).join(" "),ne=c=>{i||((c.key==="Enter"||c.key===" ")&&p&&(c.preventDefault(),p(c)),(c.key==="Delete"||c.key==="Backspace")&&o&&m&&(c.preventDefault(),m(c)))},se=c=>{c.stopPropagation(),i||m==null||m(c)},le=c=>{i||p==null||p(c)},ie=l?{"--tag-color":`var(${l})`}:void 0,ce=S?{role:"button",tabIndex:0}:{};return e.jsxs("span",{className:oe,style:ie,onClick:S?le:void 0,onKeyDown:ne,"aria-label":te,"aria-selected":r||void 0,"aria-disabled":i||void 0,...ce,...re,children:[e.jsx("span",{className:"tag__content",children:n}),o&&e.jsx("button",{className:"tag__close",type:"button","aria-label":`Remove ${typeof n=="string"?n:"tag"}`,tabIndex:-1,onClick:se,disabled:i,children:"[x]"})]})};a.__docgenInfo={description:`DOS-styled Tag component for interactive labels\r
\r
Extends Badge's display-only approach with click, close, and selection\r
behaviors. Use for content labels, category indicators, and filter chips.\r
\r
Features:\r
- Three visual variants (default, outlined, filled)\r
- Optional close button with DOS-authentic [x]\r
- Toggle-able selected state\r
- Custom CGA color support via CSS custom property\r
- Keyboard accessible (Enter/Space to click, Delete/Backspace to close)\r
- WCAG 2.1 AA compliant`,methods:[],displayName:"Tag",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Tag display text"},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'outlined' | 'filled'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'outlined'"},{name:"literal",value:"'filled'"}]},description:"Visual variant",defaultValue:{value:"'default'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}]},description:"The size of the tag",defaultValue:{value:"'medium'",computed:!1}},color:{required:!1,tsType:{name:"string"},description:"CGA color token for border and text (e.g. '--color-cga-bright-cyan')"},selected:{required:!1,tsType:{name:"boolean"},description:"Whether the tag appears in selected/active state",defaultValue:{value:"false",computed:!1}},closeable:{required:!1,tsType:{name:"boolean"},description:"Whether to show a close button",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the tag is disabled",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent<HTMLElement>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLElement>",elements:[{name:"HTMLElement"}]},name:"event"}],return:{name:"void"}}},description:"Click handler for the tag body"},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) => void",signature:{arguments:[{type:{name:"union",raw:"React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent",elements:[{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLButtonElement>",elements:[{name:"HTMLButtonElement"}]},{name:"ReactKeyboardEvent",raw:"React.KeyboardEvent"}]},name:"event"}],return:{name:"void"}}},description:"Close handler, called when close button is clicked or Delete key pressed"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name",defaultValue:{value:"''",computed:!1}},"aria-label":{required:!1,tsType:{name:"string"},description:"Accessible label for the tag"}}};const d=({children:n,gap:t="normal",wrap:s=!0,className:l="","aria-label":r,...o})=>{const i=["tag-group",`tag-group--${t}`,!s&&"tag-group--nowrap",l].filter(Boolean).join(" ");return e.jsx("div",{className:i,role:"group","aria-label":r,...o,children:n})};d.__docgenInfo={description:`Wrapper for rendering multiple Tag components with consistent spacing\r
\r
Provides flex layout with configurable gap and optional wrapping.`,methods:[],displayName:"TagGroup",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Tag elements to render"},gap:{required:!1,tsType:{name:"union",raw:"'tight' | 'normal' | 'loose'",elements:[{name:"literal",value:"'tight'"},{name:"literal",value:"'normal'"},{name:"literal",value:"'loose'"}]},description:"Spacing between tags",defaultValue:{value:"'normal'",computed:!1}},wrap:{required:!1,tsType:{name:"boolean"},description:"Wrap tags to multiple lines (default true)",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class name",defaultValue:{value:"''",computed:!1}},"aria-label":{required:!1,tsType:{name:"string"},description:"Accessible label for the tag group"}}};const fe={title:"Components/Tag",component:a,parameters:{layout:"centered",backgrounds:{default:"dos",values:[{name:"dos",value:"#000000"}]},projectMeta:de.Tag},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","outlined","filled"]},size:{control:"select",options:["small","medium"]},selected:{control:"boolean"},closeable:{control:"boolean"},disabled:{control:"boolean"}}},g={args:{children:"tag"}},u={render:()=>e.jsxs(d,{children:[e.jsx(a,{variant:"default",children:"default"}),e.jsx(a,{variant:"outlined",children:"outlined"}),e.jsx(a,{variant:"filled",children:"filled"})]})},f={render:()=>e.jsxs(d,{children:[e.jsx(a,{size:"small",children:"small"}),e.jsx(a,{size:"medium",children:"medium"})]})},v={render:()=>{const n=()=>{const[t,s]=j.useState(["react","typescript","dos","cga"]);return e.jsxs(d,{children:[t.map(l=>e.jsx(a,{closeable:!0,onClose:()=>s(r=>r.filter(o=>o!==l)),children:l},l)),t.length===0&&e.jsx("span",{style:{color:"#5F340E",fontFamily:"monospace",fontSize:"12px"},children:"All tags removed"})]})};return e.jsx(n,{})}},x={render:()=>{const n=()=>{const[t,s]=j.useState(new Set(["active"])),l=["active","archived","draft","published"],r=o=>{s(i=>{const p=new Set(i);return p.has(o)?p.delete(o):p.add(o),p})};return e.jsx(d,{children:l.map(o=>e.jsx(a,{selected:t.has(o),onClick:()=>r(o),children:o},o))})};return e.jsx(n,{})}},T={name:"Custom CGA Colors",render:()=>{const n={project:"--color-cga-bright-cyan",area:"--color-cga-bright-green",resource:"--color-cga-yellow",archive:"--color-cga-brown"};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px"},children:"PARA categories with CGA colors (outlined)"}),e.jsx(d,{children:Object.entries(n).map(([t,s])=>e.jsx(a,{variant:"outlined",color:s,children:t},t))}),e.jsx("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px",marginTop:"8px"},children:"PARA categories with CGA colors (filled)"}),e.jsx(d,{children:Object.entries(n).map(([t,s])=>e.jsx(a,{variant:"filled",color:s,children:t},t))})]})}},h={name:"TagGroup Gaps",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px",marginBottom:"4px"},children:"tight"}),e.jsxs(d,{gap:"tight",children:[e.jsx(a,{children:"one"}),e.jsx(a,{children:"two"}),e.jsx(a,{children:"three"})]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px",marginBottom:"4px"},children:"normal (default)"}),e.jsxs(d,{gap:"normal",children:[e.jsx(a,{children:"one"}),e.jsx(a,{children:"two"}),e.jsx(a,{children:"three"})]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px",marginBottom:"4px"},children:"loose"}),e.jsxs(d,{gap:"loose",children:[e.jsx(a,{children:"one"}),e.jsx(a,{children:"two"}),e.jsx(a,{children:"three"})]})]})]})},y={render:()=>{const n=()=>{const[t,s]=j.useState("all"),l=["all","photos","notes","bookmarks"];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsx(d,{children:l.map(r=>e.jsx(a,{selected:t===r,onClick:()=>s(r),children:r},r))}),e.jsxs("div",{style:{color:"#AAAAAA",fontFamily:"monospace",fontSize:"12px"},children:["Showing: ",t]})]})};return e.jsx(n,{})}},A={render:()=>e.jsxs(d,{children:[e.jsx(a,{disabled:!0,children:"disabled"}),e.jsx(a,{disabled:!0,closeable:!0,children:"closeable disabled"}),e.jsx(a,{disabled:!0,onClick:()=>{},children:"interactive disabled"})]})},b={name:"Timeline Entry (Real-world)",render:()=>{const n=()=>{const[t,s]=j.useState(["design","eidotter","milestone"]),l=r=>s(o=>o.filter(i=>i!==r));return e.jsxs("div",{style:{border:"1px solid var(--color-semantic-border-default)",padding:"12px",fontFamily:"monospace",maxWidth:"400px"},children:[e.jsx("div",{style:{color:"var(--color-semantic-text-primary)",fontSize:"14px",marginBottom:"8px"},children:"Released eiDotter v0.6.0"}),e.jsx("div",{style:{color:"#AAAAAA",fontSize:"11px",marginBottom:"8px"},children:"2026-02-08 22:00"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(a,{variant:"filled",size:"small",color:"--color-cga-bright-cyan",onClick:()=>{},children:"project"}),e.jsx(d,{gap:"tight",children:t.map(r=>e.jsx(a,{size:"small",closeable:!0,onClose:()=>l(r),children:r},r))})]})]})};return e.jsx(n,{})}};var w,G,C;g.parameters={...g.parameters,docs:{...(w=g.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: 'tag'
  }
}`,...(C=(G=g.parameters)==null?void 0:G.docs)==null?void 0:C.source}}};var z,R,E;u.parameters={...u.parameters,docs:{...(z=u.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <TagGroup>
      <Tag variant="default">default</Tag>
      <Tag variant="outlined">outlined</Tag>
      <Tag variant="filled">filled</Tag>
    </TagGroup>
}`,...(E=(R=u.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var k,D,F;f.parameters={...f.parameters,docs:{...(k=f.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <TagGroup>
      <Tag size="small">small</Tag>
      <Tag size="medium">medium</Tag>
    </TagGroup>
}`,...(F=(D=f.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var B,q,M;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(M=(q=v.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};var N,V,W;x.parameters={...x.parameters,docs:{...(N=x.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(W=(V=x.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var _,I,O;T.parameters={...T.parameters,docs:{...(_=T.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(O=(I=T.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var H,K,L;h.parameters={...h.parameters,docs:{...(H=h.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(L=(K=h.parameters)==null?void 0:K.docs)==null?void 0:L.source}}};var P,$,U;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(U=($=y.parameters)==null?void 0:$.docs)==null?void 0:U.source}}};var J,Q,X;A.parameters={...A.parameters,docs:{...(J=A.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <TagGroup>
      <Tag disabled>disabled</Tag>
      <Tag disabled closeable>closeable disabled</Tag>
      <Tag disabled onClick={() => {}}>interactive disabled</Tag>
    </TagGroup>
}`,...(X=(Q=A.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;b.parameters={...b.parameters,docs:{...(Y=b.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(ee=(Z=b.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};const ve=["Default","Variants","Sizes","Closeable","Selectable","WithColors","TagGroupStory","Interactive","Disabled","TimelineEntry"];export{v as Closeable,g as Default,A as Disabled,y as Interactive,x as Selectable,f as Sizes,h as TagGroupStory,b as TimelineEntry,u as Variants,T as WithColors,ve as __namedExportsOrder,fe as default};
