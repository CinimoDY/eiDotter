import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{z as n}from"./iframe-BZiwcFj0.js";import{t as r}from"./jsx-runtime-C2T8EUXA.js";import{n as i,t as a}from"./cn-CXvY-dOT.js";import{m as o,t as s}from"./exports-BpCMfcBQ.js";import{n as c,t as l}from"./registry-BqccLuet.js";var u=e((()=>{})),d,f,p,m,h=e((()=>{d=t(n(),1),s(),i(),u(),f=r(),p={sm:`eidotter-filter-bar--sm`,md:`eidotter-filter-bar--md`,lg:`eidotter-filter-bar--lg`,small:`eidotter-filter-bar--sm`,medium:`eidotter-filter-bar--md`,large:`eidotter-filter-bar--lg`},m=({items:e,activeIds:t,defaultActiveIds:n=[],mode:r=`multi`,showAll:i=!1,allLabel:s=`All`,size:c=`md`,onChange:l,className:u,...m})=>{let[h,g]=(0,d.useState)(n),_=(0,d.useRef)(null),v=t!==void 0,y=v?t:h,b=e.filter(e=>!e.disabled).map(e=>e.id),x=y.length===0,S=(0,d.useCallback)(e=>{v||g(e),l?.(e)},[v,l]),C=(0,d.useCallback)(e=>{S(r===`single`?y.includes(e)?[]:[e]:y.includes(e)?y.filter(t=>t!==e):[...y,e])},[r,y,S]),w=(0,d.useCallback)(()=>{S([])},[S]),T=(0,d.useCallback)(()=>_.current?Array.from(_.current.querySelectorAll(`button:not([disabled])`)):[],[]),E=(0,d.useCallback)(e=>{let t=T(),n=t.indexOf(e.target);if(n===-1)return;let r=null;switch(e.key){case`ArrowLeft`:case`ArrowUp`:e.preventDefault(),r=n>0?n-1:t.length-1;break;case`ArrowRight`:case`ArrowDown`:e.preventDefault(),r=n<t.length-1?n+1:0;break;case`Home`:e.preventDefault(),r=0;break;case`End`:e.preventDefault(),r=t.length-1;break}r!==null&&t[r].focus()},[T]),D=i&&x?`__all__`:y.length>0?y[0]:i?`__all__`:b[0]||null;return(0,f.jsxs)(`div`,{ref:_,className:a(`inline-flex flex-wrap items-center gap-1 p-1 font-dos max-w-full`,`bg-dos-bg-secondary border border-dos-border-default rounded-dos-sm`,`eidotter-filter-bar`,p[c]||p.md,u),role:`toolbar`,onKeyDown:E,...m,children:[i&&(0,f.jsx)(o,{className:a(`eidotter-filter-bar__item`,`eidotter-filter-bar__item--all`,x&&`eidotter-filter-bar__item--active`),"aria-pressed":x,excludeFromTabOrder:D!==`__all__`,onPress:w,children:(0,f.jsx)(`span`,{className:`eidotter-filter-bar__label`,children:s})}),e.map(e=>{let t=y.includes(e.id),n=t&&e.color?{"--filter-bar-item-color":`var(${e.color})`}:void 0;return(0,f.jsxs)(o,{className:a(`eidotter-filter-bar__item`,t&&`eidotter-filter-bar__item--active`,e.disabled&&`eidotter-filter-bar__item--disabled`),"aria-pressed":t,excludeFromTabOrder:D!==e.id,isDisabled:e.disabled,onPress:()=>C(e.id),style:n,children:[(0,f.jsx)(`span`,{className:`eidotter-filter-bar__label`,children:e.label}),e.count!==void 0&&(0,f.jsx)(`span`,{className:`eidotter-filter-bar__count`,"aria-label":`${e.count} items`,children:e.count})]},e.id)})]})},m.__docgenInfo={description:`DOS-styled FilterBar for multi-select or single-select content filtering.\r
Pure presentational — uses CSS transitions for phosphor effects.`,methods:[],displayName:`FilterBar`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`FilterBarItem`}],raw:`FilterBarItem[]`},description:`Array of filter items to display`},activeIds:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Currently active filter IDs (controlled mode)`},defaultActiveIds:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Default active filter IDs (uncontrolled mode)`,defaultValue:{value:`[]`,computed:!1}},mode:{required:!1,tsType:{name:`union`,raw:`'multi' | 'single'`,elements:[{name:`literal`,value:`'multi'`},{name:`literal`,value:`'single'`}]},description:`Selection mode: 'multi' allows multiple selections, 'single' allows one at a time.\r
Default: 'multi'`,defaultValue:{value:`'multi'`,computed:!1}},showAll:{required:!1,tsType:{name:`boolean`},description:`Show an "All" toggle that selects/deselects everything. Default: false`,defaultValue:{value:`false`,computed:!1}},allLabel:{required:!1,tsType:{name:`string`},description:`Label for the "All" toggle. Default: 'All'`,defaultValue:{value:`'All'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`},{name:`literal`,value:`'lg'`},{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'large'`}]},description:`Size variant. Use sm/md/lg — small/medium/large are @deprecated aliases.`,defaultValue:{value:`'md'`,computed:!1}},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(activeIds: string[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},name:`activeIds`}],return:{name:`void`}}},description:`Callback when selection changes.\r
Receives the new set of active IDs.`},className:{required:!1,tsType:{name:`string`},description:`Optional CSS class name`},"aria-label":{required:!1,tsType:{name:`string`},description:`Accessible label for the filter bar`}}}})),g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j;e((()=>{g=t(n(),1),h(),c(),_=r(),v={title:`Components/FilterBar`,component:m,parameters:{layout:`centered`,backgrounds:{default:`dos`,values:[{name:`dos`,value:`#000000`}]},projectMeta:l.FilterBar},tags:[`autodocs`],argTypes:{mode:{control:`select`,options:[`multi`,`single`],defaultValue:`multi`},size:{control:`select`,options:[`small`,`medium`,`large`],defaultValue:`medium`},showAll:{control:`boolean`,defaultValue:!1},onChange:{action:`selectionChanged`}}},y=[{id:`active`,label:`Active`},{id:`archived`,label:`Archived`},{id:`draft`,label:`Draft`}],b=[{id:`bugs`,label:`Bugs`,count:12},{id:`features`,label:`Features`,count:5},{id:`docs`,label:`Docs`,count:3},{id:`chores`,label:`Chores`,count:8}],x=[{id:`project`,label:`Projects`,count:3,color:`--color-cga-bright-cyan`},{id:`area`,label:`Areas`,count:5,color:`--color-cga-bright-green`},{id:`resource`,label:`Resources`,count:12,color:`--color-cga-yellow`},{id:`archive`,label:`Archives`,count:8,color:`--color-cga-brown`},{id:`inbox`,label:`Inbox`,count:4}],S={args:{items:y,"aria-label":`Filter by status`}},C={args:{items:y,mode:`single`,"aria-label":`Filter by status`}},w={args:{items:b,"aria-label":`Filter by type`}},T={args:{items:b,showAll:!0,"aria-label":`Filter by type`}},E=()=>{let[e,t]=(0,g.useState)([`bugs`]);return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,_.jsx)(m,{items:b,activeIds:e,onChange:t,showAll:!0,"aria-label":`Filter by type`}),(0,_.jsxs)(`p`,{style:{color:`#AAAAAA`,fontSize:`12px`,fontFamily:`monospace`},children:[`Active: `,e.length>0?e.join(`, `):`(all)`]})]})},D={render:()=>(0,_.jsx)(E,{})},O={args:{items:x,showAll:!0,allLabel:`All`,"aria-label":`Filter by PARA category`}},k={render:()=>(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`p`,{style:{color:`#AAAAAA`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Small`}),(0,_.jsx)(m,{items:b,size:`small`,"aria-label":`Small filter`})]}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`p`,{style:{color:`#AAAAAA`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Medium`}),(0,_.jsx)(m,{items:b,size:`medium`,"aria-label":`Medium filter`})]}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`p`,{style:{color:`#AAAAAA`,fontSize:`10px`,marginBottom:`8px`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Large`}),(0,_.jsx)(m,{items:b,size:`large`,"aria-label":`Large filter`})]})]})},A={args:{items:[{id:`active`,label:`Active`},{id:`archived`,label:`Archived`,disabled:!0},{id:`draft`,label:`Draft`}],"aria-label":`Filter with disabled option`}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    items: defaultItems,
    'aria-label': 'Filter by status'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    items: defaultItems,
    mode: 'single',
    'aria-label': 'Filter by status'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    items: itemsWithCounts,
    'aria-label': 'Filter by type'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    items: itemsWithCounts,
    showAll: true,
    'aria-label': 'Filter by type'
  }
}`,...T.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledExample />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    items: paraItems,
    showAll: true,
    allLabel: 'All',
    'aria-label': 'Filter by PARA category'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
      <div>
        <p style={{
        color: '#AAAAAA',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Small
        </p>
        <FilterBar items={itemsWithCounts} size="small" aria-label="Small filter" />
      </div>
      <div>
        <p style={{
        color: '#AAAAAA',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Medium
        </p>
        <FilterBar items={itemsWithCounts} size="medium" aria-label="Medium filter" />
      </div>
      <div>
        <p style={{
        color: '#AAAAAA',
        fontSize: '10px',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
          Large
        </p>
        <FilterBar items={itemsWithCounts} size="large" aria-label="Large filter" />
      </div>
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'active',
      label: 'Active'
    }, {
      id: 'archived',
      label: 'Archived',
      disabled: true
    }, {
      id: 'draft',
      label: 'Draft'
    }],
    'aria-label': 'Filter with disabled option'
  }
}`,...A.parameters?.docs?.source}}},j=[`Default`,`SingleSelect`,`WithCounts`,`WithAll`,`Controlled`,`PARAFilter`,`AllSizes`,`WithDisabledItem`]}))();export{k as AllSizes,D as Controlled,S as Default,O as PARAFilter,C as SingleSelect,T as WithAll,w as WithCounts,A as WithDisabledItem,j as __namedExportsOrder,v as default};