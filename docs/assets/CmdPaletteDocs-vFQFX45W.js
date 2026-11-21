import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,o as n}from"./blocks-Dgtmls0k.js";import{i as r,r as i}from"./react-ZJ8aMbiH.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,t as s}from"./ComponentOrigin-0fm9cGbx.js";function c(e){let n={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Docs/CmdPalette`}),`
`,(0,u.jsx)(n.h1,{id:`cmdpalette`,children:`CmdPalette`}),`
`,(0,u.jsxs)(n.p,{children:[`⌘K / Ctrl+K command palette overlay. The parent supplies the items (and
their `,(0,u.jsx)(n.code,{children:`onSelect`}),` handlers). CmdPalette handles search, keyboard navigation,
focus management, and the global hotkey binding.`]}),`
`,(0,u.jsxs)(n.p,{children:[`It is built on the same React Aria overlay primitives as `,(0,u.jsx)(n.code,{children:`<Modal>`}),`, so it
has a focus trap, Escape-to-close, and backdrop dismissal.`]}),`
`,(0,u.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsx)(n.li,{children:`⌘K / Ctrl+K launcher pattern`}),`
`,(0,u.jsx)(n.li,{children:`"Jump to" navigation across large item sets (routes, entries, commands)`}),`
`,(0,u.jsx)(n.li,{children:`Quick-action menu (run, search, filter) layered over any surface`}),`
`]}),`
`,(0,u.jsxs)(n.p,{children:[`For a form dialog, use `,(0,u.jsx)(n.code,{children:`<Modal>`}),`. For a menu tied to a trigger button, use
a popover.`]}),`
`,(0,u.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`import { useState } from 'react';
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
`,(0,u.jsx)(n.h2,{id:`mount-once-at-layout-level`,children:`Mount once, at layout level`}),`
`,(0,u.jsxs)(n.p,{children:[`Mount `,(0,u.jsx)(n.strong,{children:`one`}),` `,(0,u.jsx)(n.code,{children:`<CmdPalette>`}),` per site, in the root layout, so the ⌘K / Ctrl+K
shortcut works on every page rather than only on the page that renders it.
Rules:`]}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsx)(n.li,{children:`One palette per site, owned by the root layout (never per page).`}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.code,{children:`items`}),` is that site's list of public routes. Only public-safe pages go
into the index (publishing boundary): never private routes, internal
project names, or draft content.`]}),`
`,(0,u.jsxs)(n.li,{children:[`Show a ⌘K hint (e.g. in the site `,(0,u.jsx)(n.code,{children:`Footer`}),` or the `,(0,u.jsx)(n.code,{children:`Header`}),` `,(0,u.jsx)(n.code,{children:`end`}),` slot) only
on sites where the palette is mounted. Do not put it in `,(0,u.jsx)(n.code,{children:`footerHint`}),`,
because that row renders only inside the open palette.`]}),`
`,(0,u.jsxs)(n.li,{children:[`The default `,(0,u.jsx)(n.code,{children:`hotkey`}),` is `,(0,u.jsx)(n.code,{children:`'mod+k'`}),`; pass `,(0,u.jsx)(n.code,{children:`hotkey={false}`}),` to opt out of the
global binding and open it yourself.`]}),`
`]}),`
`,(0,u.jsx)(n.h3,{id:`astro`,children:`Astro`}),`
`,(0,u.jsxs)(n.p,{children:[`A `,(0,u.jsx)(n.code,{children:`client:load`}),` React island in the base layout. The island owns the state
and builds items from a static routes array.`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`// src/components/SiteCmdPalette.tsx
import { useState } from 'react';
import { CmdPalette, type CmdPaletteItem } from 'eidotter';

const routes = [
  { path: '/', label: 'HOME' },
  { path: '/about', label: 'ABOUT' },
];

const items: CmdPaletteItem[] = routes.map((r) => ({
  id: r.path,
  label: r.label,
  onSelect: () => { window.location.href = r.path; },
}));

export default function SiteCmdPalette() {
  const [open, setOpen] = useState(false);
  return <CmdPalette open={open} onOpenChange={setOpen} items={items} />;
}
`})}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-astro`,children:`---
// src/layouts/Base.astro
import SiteCmdPalette from '../components/SiteCmdPalette';
---
<html><body>
  <slot />
  <SiteCmdPalette client:load />
</body></html>
`})}),`
`,(0,u.jsx)(n.h3,{id:`nextjs-app-router`,children:`Next.js (App Router)`}),`
`,(0,u.jsxs)(n.p,{children:[`A `,(0,u.jsx)(n.code,{children:`'use client'`}),` component rendered once in `,(0,u.jsx)(n.code,{children:`app/layout.tsx`}),`, navigating
with `,(0,u.jsx)(n.code,{children:`useRouter().push`}),`.`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`// components/SiteCmdPalette.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CmdPalette, type CmdPaletteItem } from 'eidotter';

const routes = [
  { path: '/', label: 'HOME' },
  { path: '/about', label: 'ABOUT' },
];

export function SiteCmdPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const items: CmdPaletteItem[] = routes.map((r) => ({
    id: r.path,
    label: r.label,
    onSelect: () => router.push(r.path),
  }));
  return <CmdPalette open={open} onOpenChange={setOpen} items={items} />;
}
`})}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`// app/layout.tsx
import { SiteCmdPalette } from '@/components/SiteCmdPalette';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body>
      {children}
      <SiteCmdPalette />
    </body></html>
  );
}
`})}),`
`,(0,u.jsx)(n.h3,{id:`vite--react-router`,children:`Vite / react-router`}),`
`,(0,u.jsxs)(n.p,{children:[`Inside the `,(0,u.jsx)(n.code,{children:`Layout`}),` component that wraps the routes, using `,(0,u.jsx)(n.code,{children:`useNavigate()`}),`.`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`// src/Layout.tsx
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CmdPalette, type CmdPaletteItem } from 'eidotter';

const routes = [
  { path: '/', label: 'HOME' },
  { path: '/about', label: 'ABOUT' },
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const items: CmdPaletteItem[] = routes.map((r) => ({
    id: r.path,
    label: r.label,
    onSelect: () => navigate(r.path),
  }));
  return (
    <>
      <Outlet />
      <CmdPalette open={open} onOpenChange={setOpen} items={items} />
    </>
  );
}
`})}),`
`,(0,u.jsx)(n.h2,{id:`keyboard`,children:`Keyboard`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Key`}),(0,u.jsx)(n.th,{children:`Action`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`⌘K`}),` / `,(0,u.jsx)(n.code,{children:`Ctrl+K`})]}),(0,u.jsx)(n.td,{children:`Toggle open/close (default hotkey)`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsxs)(n.td,{children:[(0,u.jsx)(n.code,{children:`↓`}),` / `,(0,u.jsx)(n.code,{children:`↑`})]}),(0,u.jsx)(n.td,{children:`Move selection`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`↵`})}),(0,u.jsx)(n.td,{children:`Select highlighted item, close palette`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`Esc`})}),(0,u.jsx)(n.td,{children:`Close`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:`Typing`}),(0,u.jsx)(n.td,{children:`Live-filter the result list`})]})]})]}),`
`,(0,u.jsxs)(n.p,{children:[(0,u.jsx)(n.code,{children:`hotkey`}),` accepts `,(0,u.jsx)(n.code,{children:`"mod+<key>"`}),`, `,(0,u.jsx)(n.code,{children:`"mod+shift+<key>"`}),`, `,(0,u.jsx)(n.code,{children:`"alt+<key>"`}),`, or
combinations. Pass `,(0,u.jsx)(n.code,{children:`hotkey={false}`}),` to disable the global binding and
manage opening yourself.`]}),`
`,(0,u.jsx)(n.h2,{id:`search-ranking`,children:`Search ranking`}),`
`,(0,u.jsxs)(n.p,{children:[`Results rank as follows (`,(0,u.jsx)(n.code,{children:`1`}),` highest):`]}),`
`,(0,u.jsxs)(n.ol,{children:[`
`,(0,u.jsxs)(n.li,{children:[`Label `,(0,u.jsx)(n.strong,{children:`starts with`}),` the query`]}),`
`,(0,u.jsxs)(n.li,{children:[`Any keyword `,(0,u.jsx)(n.strong,{children:`starts with`}),` the query`]}),`
`,(0,u.jsxs)(n.li,{children:[`Label `,(0,u.jsx)(n.strong,{children:`contains`}),` the query`]}),`
`,(0,u.jsxs)(n.li,{children:[`Any keyword `,(0,u.jsx)(n.strong,{children:`contains`}),` the query`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.code,{children:`type`}),` contains the query`]}),`
`]}),`
`,(0,u.jsxs)(n.p,{children:[`Items with no match are filtered out. `,(0,u.jsx)(n.code,{children:`maxResults`}),` (default `,(0,u.jsx)(n.code,{children:`20`}),`) caps the
rendered list. Use a smaller value for wide item sets.`]}),`
`,(0,u.jsx)(n.h2,{id:`custom-rendering`,children:`Custom rendering`}),`
`,(0,u.jsxs)(n.p,{children:[`Override a row's layout via `,(0,u.jsx)(n.code,{children:`renderItem`}),`:`]}),`
`,(0,u.jsx)(n.pre,{children:(0,u.jsx)(n.code,{className:`language-tsx`,children:`<CmdPalette
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
`,(0,u.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsxs)(n.ul,{children:[`
`,(0,u.jsxs)(n.li,{children:[`Overlay is a React Aria `,(0,u.jsx)(n.code,{children:`Dialog`}),` with focus trap and backdrop dismissal`]}),`
`,(0,u.jsxs)(n.li,{children:[`Input is `,(0,u.jsx)(n.code,{children:`role="combobox"`}),` with `,(0,u.jsx)(n.code,{children:`aria-activedescendant`}),` pointing at the
current list option`]}),`
`,(0,u.jsxs)(n.li,{children:[`Results list is `,(0,u.jsx)(n.code,{children:`role="listbox"`}),`, items are `,(0,u.jsx)(n.code,{children:`role="option"`}),` with
`,(0,u.jsx)(n.code,{children:`aria-selected`}),` reflecting the current selection`]}),`
`,(0,u.jsx)(n.li,{children:`Opening the palette focuses the search input in the same user gesture,
so phones raise the keyboard straight away`}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.code,{children:`prefers-reduced-motion: reduce`}),` disables the phosphor open/exit
animation`]}),`
`,(0,u.jsxs)(n.li,{children:[(0,u.jsx)(n.code,{children:`prefers-contrast: more`}),` bumps the container border to 3px and drops
phosphor text-shadows`]}),`
`]}),`
`,(0,u.jsx)(n.h2,{id:`api-reference`,children:`API reference`}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Prop`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Default`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`open`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`boolean`})}),(0,u.jsx)(n.td,{children:`— (required)`}),(0,u.jsx)(n.td,{children:`Controlled open state`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onOpenChange`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`(open: boolean) => void`})}),(0,u.jsx)(n.td,{children:`— (required)`}),(0,u.jsx)(n.td,{children:`Called when the palette wants to open/close`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`items`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`CmdPaletteItem[]`})}),(0,u.jsx)(n.td,{children:`— (required)`}),(0,u.jsx)(n.td,{children:`Items to search/select`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`placeholder`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'SEARCH · TYPE · ▸'`})}),(0,u.jsx)(n.td,{children:`Input placeholder`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`hotkey`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string | false`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'mod+k'`})}),(0,u.jsx)(n.td,{children:`Global open/close hotkey`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`emptyMessage`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`ReactNode`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'NO MATCHES'`})}),(0,u.jsx)(n.td,{children:`Empty-state row`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`footerHint`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`ReactNode`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`↑/↓ · ↵ · ESC`})}),(0,u.jsxs)(n.td,{children:[`Bottom-row hint; pass `,(0,u.jsx)(n.code,{children:`null`}),` to hide`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`renderItem`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`(item, selected) => ReactNode`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Custom row renderer`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`maxResults`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`number`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`20`})}),(0,u.jsx)(n.td,{children:`Cap on rendered rows`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`aria-label`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`'Command palette'`})}),(0,u.jsx)(n.td,{children:`Dialog accessible label`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`className`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`—`}),(0,u.jsx)(n.td,{children:`Extra classes on the dialog container`})]})]})]}),`
`,(0,u.jsx)(n.h3,{id:`cmdpaletteitem`,children:(0,u.jsx)(n.code,{children:`CmdPaletteItem`})}),`
`,(0,u.jsxs)(n.table,{children:[(0,u.jsx)(n.thead,{children:(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.th,{children:`Field`}),(0,u.jsx)(n.th,{children:`Type`}),(0,u.jsx)(n.th,{children:`Description`})]})}),(0,u.jsxs)(n.tbody,{children:[(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`id`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsxs)(n.td,{children:[`Stable identifier (React key + `,(0,u.jsx)(n.code,{children:`aria-activedescendant`}),` target)`]})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`label`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string`})}),(0,u.jsx)(n.td,{children:`Primary text`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`hint`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`ReactNode?`})}),(0,u.jsx)(n.td,{children:`Secondary text shown right-aligned`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`keywords`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string[]?`})}),(0,u.jsx)(n.td,{children:`Extra search tokens`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`type`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`string?`})}),(0,u.jsx)(n.td,{children:`Free-form type tag`})]}),(0,u.jsxs)(n.tr,{children:[(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`onSelect`})}),(0,u.jsx)(n.td,{children:(0,u.jsx)(n.code,{children:`(item) => void`})}),(0,u.jsx)(n.td,{children:`Fired on Enter or click`})]})]})]}),`
`,(0,u.jsx)(n.h2,{id:`origin`,children:`Origin`}),`
`,(0,u.jsx)(s,{name:`CmdPalette`})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=a(),i(),n(),o()})))()}d();export{l as default};