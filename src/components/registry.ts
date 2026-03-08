export type ProjectId =
  | 'eidotter' | 'spacewar' | 'rizomorf' | 'pomodoke-calendar'
  | 'keepcoin' | 'steuerdash' | 'sella' | 'lifelines' | 'betamorf';

export interface ProjectInfo {
  displayName: string;
  url?: string;
}

export const projects: Record<ProjectId, ProjectInfo> = {
  eidotter:            { displayName: 'eiDotter' },
  spacewar:            { displayName: 'Spacewar!' },
  rizomorf:            { displayName: 'rizomorf' },
  'pomodoke-calendar': { displayName: 'PomoDoke Calendar' },
  keepcoin:            { displayName: 'KeepCoin' },
  steuerdash:          { displayName: 'Steuerdash' },
  sella:               { displayName: 'sella' },
  lifelines:           { displayName: 'Lifelines' },
  betamorf:            { displayName: 'betamorf' },
};

export interface ComponentMeta {
  origin: ProjectId;
  consumers: ProjectId[];
  since?: string;
  originNote?: string;
}

export const componentRegistry: Record<string, ComponentMeta> = {
  Alert:         { origin: 'eidotter', consumers: ['rizomorf', 'steuerdash'] },
  Accordion:     { origin: 'eidotter', consumers: ['rizomorf'] },
  AccordionFill: { origin: 'eidotter', consumers: ['rizomorf'] },
  Badge:         { origin: 'eidotter', consumers: ['rizomorf', 'steuerdash'] },
  Breadcrumb:    { origin: 'rizomorf', consumers: ['rizomorf'] },
  Button:        { origin: 'eidotter', consumers: ['spacewar', 'rizomorf', 'pomodoke-calendar', 'steuerdash'] },
  Card:          { origin: 'eidotter', consumers: ['rizomorf', 'steuerdash'] },
  Checkbox:      { origin: 'eidotter', consumers: ['steuerdash'] },
  CommandPrompt: { origin: 'eidotter', consumers: ['rizomorf'] },
  Icon:          { origin: 'eidotter', consumers: ['rizomorf'] },
  Input:         { origin: 'eidotter', consumers: ['steuerdash'] },
  Modal:         { origin: 'eidotter', consumers: ['pomodoke-calendar'] },
  Progress:      { origin: 'eidotter', consumers: ['steuerdash'], since: '0.3.0' },
  RetroEffects:  { origin: 'spacewar', consumers: ['spacewar', 'rizomorf'], originNote: 'CRT scanline/glow effects from Spacewar!' },
  Stat:          { origin: 'steuerdash', consumers: ['steuerdash'], originNote: 'Key-value display created for tax dashboard' },
  Switch:        { origin: 'eidotter', consumers: [] },
  FilterBar:     { origin: 'eidotter', consumers: ['lifelines', 'rizomorf'], originNote: 'Multi-select toggle group for faceted filtering' },
  Tag:           { origin: 'eidotter', consumers: ['lifelines', 'rizomorf'], originNote: 'Interactive labels for tags, categories, and filter chips' },
  Tabs:          { origin: 'eidotter', consumers: ['steuerdash'] },
  Terminal:      { origin: 'eidotter', consumers: ['rizomorf'] },
  TimelineNode:  { origin: 'lifelines', consumers: ['lifelines', 'rizomorf'], originNote: 'Timeline markers from Lifelines project' },
  InlineExpand:  { origin: 'rizomorf', consumers: ['rizomorf'], originNote: 'Inline disclosure widget for expanding text within prose' },
};

export function getComponentMeta(name: string): ComponentMeta | undefined {
  return componentRegistry[name];
}

export function getComponentsByOrigin(projectId: ProjectId): string[] {
  return Object.entries(componentRegistry)
    .filter(([, meta]) => meta.origin === projectId)
    .map(([name]) => name);
}

export function getComponentsByConsumer(projectId: ProjectId): string[] {
  return Object.entries(componentRegistry)
    .filter(([, meta]) => meta.consumers.includes(projectId))
    .map(([name]) => name);
}
