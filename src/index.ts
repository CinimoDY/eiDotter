// eiDotter Design System - Main Export File
// DOS-themed React component library with terminal aesthetics

import './styles/tailwind.css';

// Core Components
export { Alert } from './components/Alert';
export { Section, AccordionFill } from './components/Accordion';
export { Button } from './components/Button';
export { Card } from './components/Card';
export { Checkbox } from './components/Checkbox';
export { CommandPrompt } from './components/CommandPrompt';
export { Progress } from './components/Progress';
export { Icon } from './components/Icon';
export { Input } from './components/Input';
export { Terminal } from './components/Terminal';
export { Tabs } from './components/Tabs';
export { Badge } from './components/Badge';
export { Switch } from './components/Switch';
export { Breadcrumb } from './components/Breadcrumb';
export { RetroEffects } from './components/RetroEffects';
export { TimelineNode } from './components/TimelineNode';
export { TimelineContainer } from './components/TimelineContainer';
export { Modal } from './components/Modal';
export { Stat } from './components/Stat';
export { FilterBar } from './components/FilterBar';
export { Tag, TagGroup } from './components/Tag';
export { InlineExpand } from './components/InlineExpand';
export { Separator } from './components/Separator';
export { TextScramble } from './components/TextScramble';
export { Nav, DesktopNav, MobileNav } from './components/Nav';
export { Header } from './components/Header';
export { ChatMessage, ChatHistory, ChatInput, ChatContainer } from './components/Chat';
export { Footer, defaultLegalLinks } from './components/Footer';
export { Notification } from './components/Notification';
export { InlineLink } from './components/InlineLink';
export { DosFigure } from './components/DosFigure';
export { CmdPalette } from './components/CmdPalette';

// Component Types
export type { AlertProps, AlertAction, AlertColor } from './components/Alert';
export type { NotificationProps, NotificationType } from './components/Notification';
export type { SectionProps, AccordionFillProps } from './components/Accordion';
export type { ButtonProps } from './components/Button';
export type { CardProps } from './components/Card';
export type { CheckboxProps } from './components/Checkbox';
export type { CommandPromptProps } from './components/CommandPrompt';
export type { ProgressProps } from './components/Progress';
export type { IconProps } from './components/Icon';
export type { InputProps } from './components/Input';
export type { TerminalProps } from './components/Terminal';
export type { TabsProps, TabItem } from './components/Tabs';
export type { BadgeProps } from './components/Badge';
export type { SwitchProps } from './components/Switch';
export type { BreadcrumbProps, BreadcrumbItem } from './components/Breadcrumb';
export type { RetroEffectsProps, PowerState } from './components/RetroEffects';
export type { TimelineNodeProps, TimelineNodeShape, TimelineNodeVariant } from './components/TimelineNode';
export type { TimelineContainerProps, TimelineEntry, TimelineEntryData, DateBucket, ZoomLevel } from './components/TimelineContainer';
export type { ModalProps } from './components/Modal';
export type { StatProps } from './components/Stat';
export type { FilterBarProps, FilterBarItem } from './components/FilterBar';
export type { TagProps, TagGroupProps } from './components/Tag';
export type { InlineExpandProps, InlineExpandSource } from './components/InlineExpand';
export type { SeparatorProps } from './components/Separator';
export type { TextScrambleProps } from './components/TextScramble';
export type { NavProps, NavItem, NavLinkComponent, NavVariant } from './components/Nav';
export type { HeaderProps, HeaderVariant } from './components/Header';
export type { ChatMessageProps, ChatHistoryProps, ChatMessageEntry, ChatInputProps, ChatContainerProps } from './components/Chat';
export type { FooterProps, FooterLink } from './components/Footer';
export type { InlineLinkProps } from './components/InlineLink';
export type { DosFigureProps, DosFigurePin } from './components/DosFigure';
export type { CmdPaletteProps, CmdPaletteItem } from './components/CmdPalette';

// Hooks
export { useTextScramble } from './hooks/useTextScramble';
export type { UseTextScrambleOptions } from './hooks/useTextScramble';

// Utilities
export { isSafeUrl } from './utils';
export { ZOOM_LEVELS } from './components/TimelineContainer';

// Component metadata registry
export {
  componentRegistry, projects,
  getComponentMeta, getComponentsByOrigin, getComponentsByConsumer,
  getVariantsUsedBy, getVariantConsumerMap,
} from './components/registry';
export type {
  ComponentMeta, ProjectId, ProjectInfo,
  VariantMeta, PlatformId, PlatformMeta, ChangelogEntry,
} from './components/registry';

// Version information
export const version = '0.18.0';