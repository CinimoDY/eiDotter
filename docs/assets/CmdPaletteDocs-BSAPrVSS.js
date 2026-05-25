import{i as e}from"./preload-helper-Cs4UwXAW.js";import{A as t,a as n,o as r}from"./blocks-CCw2EY47.js";import{t as i}from"./jsx-runtime-C2T8EUXA.js";import{n as a,r as o,t as s}from"./ComponentOrigin-C0nhywhB.js";function c(e){let r={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Docs/CmdPalette`}),`
`,(0,u.jsx)(r.h1,{id:`cmdpalette`,children:`CmdPalette`}),`
`,(0,u.jsxs)(r.p,{children:[`⌘K / Ctrl+K command palette overlay. Generic: parent supplies the items
(and their `,(0,u.jsx)(r.code,{children:`onSelect`}),` handlers); CmdPalette handles search, keyboard
navigation, focus management, and the global hotkey binding.`]}),`
`,(0,u.jsxs)(r.p,{children:[`Built on the same React Aria overlay primitives as `,(0,u.jsx)(r.code,{children:`<Modal>`}),` — focus trap,
Escape-to-close, and backdrop dismissal are standard.`]}),`
`,(0,u.jsx)(r.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsx)(r.li,{children:`⌘K / Ctrl+K launcher pattern`}),`
`,(0,u.jsx)(r.li,{children:`"Jump to" navigation across large item sets (routes, entries, commands)`}),`
`,(0,u.jsx)(r.li,{children:`Quick-action menu (run, search, filter) layered over any surface`}),`
`]}),`
`,(0,u.jsxs)(r.p,{children:[`For a form dialog, use `,(0,u.jsx)(r.code,{children:`<Modal>`}),`. For a menu tied to a trigger button, a
popover pattern is more appropriate.`]}),`
`,(0,u.jsx)(r.h2,{id:`usage`,children:`Usage`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`import { useState } from 'react';
import { CmdPalette, type CmdPaletteItem } from 'eidotter';

const items: CmdPaletteItem[] = [
  { id: 'dir',  label: 'DIR',  hint: 'LIST FILES',
    onSelect: () => runDir() },
  { id: 'help', label: 'HELP', hint: 'OPEN HELP',
    keywords: ['?', 'man'],
    onSelect: () => openHelp() },
];

export function App() {
  const [open, setOpen] = useState(false);
  return (
    <CmdPalette
      open={open}
      onOpenChange={setOpen}
      items={items}
      hotkey="mod+k"
    />
  );
}
`})}),`
`,(0,u.jsx)(r.h2,{id:`keyboard`,children:`Keyboard`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Key`}),(0,u.jsx)(r.th,{children:`Action`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsxs)(r.td,{children:[(0,u.jsx)(r.code,{children:`⌘K`}),` / `,(0,u.jsx)(r.code,{children:`Ctrl+K`})]}),(0,u.jsx)(r.td,{children:`Toggle open/close (default hotkey)`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsxs)(r.td,{children:[(0,u.jsx)(r.code,{children:`↓`}),` / `,(0,u.jsx)(r.code,{children:`↑`})]}),(0,u.jsx)(r.td,{children:`Move selection`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`↵`})}),(0,u.jsx)(r.td,{children:`Select highlighted item, close palette`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`Esc`})}),(0,u.jsx)(r.td,{children:`Close`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:`Typing`}),(0,u.jsx)(r.td,{children:`Live-filter the result list`})]})]})]}),`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.code,{children:`hotkey`}),` accepts `,(0,u.jsx)(r.code,{children:`"mod+<key>"`}),`, `,(0,u.jsx)(r.code,{children:`"mod+shift+<key>"`}),`, `,(0,u.jsx)(r.code,{children:`"alt+<key>"`}),`, or
combinations. Pass `,(0,u.jsx)(r.code,{children:`hotkey={false}`}),` to disable the global binding and
manage opening yourself.`]}),`
`,(0,u.jsx)(r.h2,{id:`search-ranking`,children:`Search ranking`}),`
`,(0,u.jsxs)(r.p,{children:[`Results rank as follows (`,(0,u.jsx)(r.code,{children:`1`}),` highest):`]}),`
`,(0,u.jsxs)(r.ol,{children:[`
`,(0,u.jsxs)(r.li,{children:[`Label `,(0,u.jsx)(r.strong,{children:`starts with`}),` the query`]}),`
`,(0,u.jsxs)(r.li,{children:[`Any keyword `,(0,u.jsx)(r.strong,{children:`starts with`}),` the query`]}),`
`,(0,u.jsxs)(r.li,{children:[`Label `,(0,u.jsx)(r.strong,{children:`contains`}),` the query`]}),`
`,(0,u.jsxs)(r.li,{children:[`Any keyword `,(0,u.jsx)(r.strong,{children:`contains`}),` the query`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.code,{children:`type`}),` contains the query`]}),`
`]}),`
`,(0,u.jsxs)(r.p,{children:[`Items with no match are filtered out. `,(0,u.jsx)(r.code,{children:`maxResults`}),` (default `,(0,u.jsx)(r.code,{children:`20`}),`) caps the
rendered list — use smaller values on wide item sets.`]}),`
`,(0,u.jsx)(r.h2,{id:`custom-rendering`,children:`Custom rendering`}),`
`,(0,u.jsxs)(r.p,{children:[`Override a row's layout via `,(0,u.jsx)(r.code,{children:`renderItem`}),`:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-tsx`,children:`<CmdPalette
  open={open}
  onOpenChange={setOpen}
  items={items}
  renderItem={(item, isSelected) => (
    <span>
      {isSelected ? '▶' : '◦'} {item.label}
      <em>· {item.keywords?.join(', ')}</em>
    </span>
  )}
/>
`})}),`
`,(0,u.jsx)(r.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[`Overlay is a React Aria `,(0,u.jsx)(r.code,{children:`Dialog`}),` with focus trap and backdrop dismissal`]}),`
`,(0,u.jsxs)(r.li,{children:[`Input is `,(0,u.jsx)(r.code,{children:`role="combobox"`}),` with `,(0,u.jsx)(r.code,{children:`aria-activedescendant`}),` pointing at the
current list option`]}),`
`,(0,u.jsxs)(r.li,{children:[`Results list is `,(0,u.jsx)(r.code,{children:`role="listbox"`}),`, items are `,(0,u.jsx)(r.code,{children:`role="option"`}),` with
`,(0,u.jsx)(r.code,{children:`aria-selected`}),` reflecting the current selection`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.code,{children:`prefers-reduced-motion: reduce`}),` disables the phosphor open/exit
animation and the head-strip blinking cursor`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.code,{children:`prefers-contrast: more`}),` bumps the container border to 3px and drops
phosphor text-shadows`]}),`
`]}),`
`,(0,u.jsx)(r.h2,{id:`api-reference`,children:`API Reference`}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Prop`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Default`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`open`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`boolean`})}),(0,u.jsx)(r.td,{children:`— (required)`}),(0,u.jsx)(r.td,{children:`Controlled open state`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onOpenChange`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`(open: boolean) => void`})}),(0,u.jsx)(r.td,{children:`— (required)`}),(0,u.jsx)(r.td,{children:`Called when the palette wants to open/close`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`items`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`CmdPaletteItem[]`})}),(0,u.jsx)(r.td,{children:`— (required)`}),(0,u.jsx)(r.td,{children:`Items to search/select`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`placeholder`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'SEARCH · TYPE · ▸'`})}),(0,u.jsx)(r.td,{children:`Input placeholder`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`hotkey`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string | false`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'mod+k'`})}),(0,u.jsx)(r.td,{children:`Global open/close hotkey`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`emptyMessage`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ReactNode`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'NO MATCHES'`})}),(0,u.jsx)(r.td,{children:`Empty-state row`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`footerHint`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ReactNode`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`↑/↓ · ↵ · ESC`})}),(0,u.jsxs)(r.td,{children:[`Bottom-row hint; pass `,(0,u.jsx)(r.code,{children:`null`}),` to hide`]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`renderItem`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`(item, selected) => ReactNode`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Custom row renderer`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`maxResults`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`number`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`20`})}),(0,u.jsx)(r.td,{children:`Cap on rendered rows`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`aria-label`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`'Command palette'`})}),(0,u.jsx)(r.td,{children:`Dialog accessible label`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`className`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`—`}),(0,u.jsx)(r.td,{children:`Extra classes on the dialog container`})]})]})]}),`
`,(0,u.jsx)(r.h3,{id:`cmdpaletteitem`,children:(0,u.jsx)(r.code,{children:`CmdPaletteItem`})}),`
`,(0,u.jsxs)(r.table,{children:[(0,u.jsx)(r.thead,{children:(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.th,{children:`Field`}),(0,u.jsx)(r.th,{children:`Type`}),(0,u.jsx)(r.th,{children:`Description`})]})}),(0,u.jsxs)(r.tbody,{children:[(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`id`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsxs)(r.td,{children:[`Stable identifier (React key + `,(0,u.jsx)(r.code,{children:`aria-activedescendant`}),` target)`]})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`label`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string`})}),(0,u.jsx)(r.td,{children:`Primary text`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`hint`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`ReactNode?`})}),(0,u.jsx)(r.td,{children:`Secondary text shown right-aligned`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`keywords`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string[]?`})}),(0,u.jsx)(r.td,{children:`Extra search tokens`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`type`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`string?`})}),(0,u.jsx)(r.td,{children:`Free-form type tag`})]}),(0,u.jsxs)(r.tr,{children:[(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`onSelect`})}),(0,u.jsx)(r.td,{children:(0,u.jsx)(r.code,{children:`(item) => void`})}),(0,u.jsx)(r.td,{children:`Fired on Enter or click`})]})]})]}),`
`,(0,u.jsx)(r.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`CmdPalette`})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=i(),o(),r(),a()}))();export{l as default};