import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ModalOverlay as AriaModalOverlay,
  Modal as AriaModal,
  Dialog as AriaDialog,
} from 'react-aria-components';
import { cn } from '../../../utils/cn';
import './CmdPalette.css';

export interface CmdPaletteItem {
  /** Stable identifier for React keys and `onSelect` lookups. */
  id: string;
  /** Primary label shown in the list. Uppercase recommended. */
  label: string;
  /** Optional secondary hint shown on the right (shortcut, type, etc.). */
  hint?: React.ReactNode;
  /** Additional keywords that contribute to search matching. */
  keywords?: string[];
  /** Optional type tag used for grouping/filtering by callers. */
  type?: string;
  /** Called when the item is activated via click or Enter. */
  onSelect?: (item: CmdPaletteItem) => void;
}

export interface CmdPaletteProps {
  /** Controlled open state. */
  open: boolean;
  /**
   * Called when the overlay requests open/close (Escape, backdrop click,
   * item selection, hotkey toggle).
   */
  onOpenChange: (open: boolean) => void;
  /** Items to search. Pure data — parent owns the list. */
  items: CmdPaletteItem[];
  /** Input placeholder. */
  placeholder?: string;
  /** Global activation hotkey. `"mod+k"`, `"mod+shift+p"`, or `false` to disable. */
  hotkey?: string | false;
  /** Message shown when search matches nothing. */
  emptyMessage?: React.ReactNode;
  /** Footer hint row text / JSX. Pass `null` to hide. */
  footerHint?: React.ReactNode;
  /** Custom renderer for each row. Falls back to label + hint. */
  renderItem?: (item: CmdPaletteItem, isSelected: boolean) => React.ReactNode;
  /** Cap on filtered result rows. */
  maxResults?: number;
  /** Extra class names merged onto the dialog container. */
  className?: string;
  /** Accessible dialog label. */
  ariaLabel?: string;
}

const defaultFooterHint = (
  <>↑/↓ NAVIGATE · ↵ OPEN · ESC CLOSE</>
);

/** Split hotkey string like "mod+shift+p" into a predicate. */
function parseHotkey(hotkey: string): (e: KeyboardEvent) => boolean {
  const parts = hotkey.toLowerCase().split('+').map(p => p.trim());
  const key = parts[parts.length - 1];
  const mod = parts.includes('mod');
  const shift = parts.includes('shift');
  const alt = parts.includes('alt');
  return (e: KeyboardEvent) => {
    if (e.key.toLowerCase() !== key) return false;
    const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
    const modMatches = mod ? (isMac ? e.metaKey : e.ctrlKey) : !(e.metaKey || e.ctrlKey);
    if (!modMatches) return false;
    if (shift !== e.shiftKey) return false;
    if (alt !== e.altKey) return false;
    return true;
  };
}

/** Rank items: starts-with on label/keyword ranks first, then substring. */
function scoreItem(item: CmdPaletteItem, query: string): number {
  if (!query) return 0;
  const q = query.toLowerCase();
  const label = item.label.toLowerCase();
  const kw = (item.keywords || []).map(k => k.toLowerCase());
  if (label.startsWith(q)) return 100;
  if (kw.some(k => k.startsWith(q))) return 80;
  if (label.includes(q)) return 50;
  if (kw.some(k => k.includes(q))) return 30;
  if ((item.type || '').toLowerCase().includes(q)) return 10;
  return -1;
}

/**
 * CmdPalette — ⌘K / Ctrl+K launcher overlay.
 *
 * Controlled component. Parent owns `open` and item list; CmdPalette handles
 * search, keyboard navigation, focus management, and hotkey binding.
 *
 * Built on React Aria `ModalOverlay` + `Modal` + `Dialog` — same primitives
 * as `<Modal>` — so focus trap, Esc-to-close, and backdrop dismissal are
 * standard.
 */
export const CmdPalette = forwardRef<HTMLDivElement, CmdPaletteProps>(({
  open,
  onOpenChange,
  items,
  placeholder = 'SEARCH · TYPE · ▸',
  hotkey = 'mod+k',
  emptyMessage = 'NO MATCHES',
  footerHint = defaultFooterHint,
  renderItem,
  maxResults = 20,
  className,
  ariaLabel = 'Command palette',
}, ref) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Ranked, filtered results
  const results = useMemo(() => {
    if (!query.trim()) return items.slice(0, maxResults);
    const scored = items
      .map(i => ({ item: i, score: scoreItem(i, query.trim()) }))
      .filter(s => s.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map(s => s.item);
    return scored;
  }, [items, query, maxResults]);

  // Reset state when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
    }
  }, [open]);

  // Reset selection when results change
  useEffect(() => {
    setSelected(0);
  }, [query]);

  // Focus input when open (React Aria handles focus trap; we steer to input)
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 10);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  // Global hotkey
  useEffect(() => {
    if (hotkey === false) return;
    const predicate = parseHotkey(hotkey);
    const handler = (e: KeyboardEvent) => {
      if (predicate(e)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hotkey, open, onOpenChange]);

  // Keep the selected row scrolled into view
  useEffect(() => {
    if (!open || results.length === 0) return;
    const el = listRef.current?.querySelector<HTMLLIElement>(
      `[data-index="${selected}"]`,
    );
    // jsdom doesn't implement scrollIntoView — guard so tests don't throw.
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ block: 'nearest' });
    }
  }, [selected, results, open]);

  const handleSelect = useCallback((item: CmdPaletteItem) => {
    item.onSelect?.(item);
    onOpenChange(false);
  }, [onOpenChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(i => Math.min(i + 1, Math.max(0, results.length - 1)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(i => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      const item = results[selected];
      if (item) {
        e.preventDefault();
        handleSelect(item);
      }
    }
  };

  return (
    <AriaModalOverlay
      isOpen={open}
      onOpenChange={onOpenChange}
      isDismissable
      className={({ isEntering, isExiting }) => cn(
        'eidotter-cmdpal-overlay',
        isEntering && 'eidotter-cmdpal-overlay--entering',
        isExiting && 'eidotter-cmdpal-overlay--exiting',
      )}
    >
      <AriaModal
        className={({ isEntering, isExiting }) => cn(
          'eidotter-cmdpal',
          isEntering && 'eidotter-cmdpal--entering',
          isExiting && 'eidotter-cmdpal--exiting',
        )}
      >
        <AriaDialog
          aria-label={ariaLabel}
          className={cn('eidotter-cmdpal__container outline-none', className)}
          ref={ref as React.Ref<HTMLDivElement>}
        >
          <div className="eidotter-cmdpal__head" aria-hidden="true">
            <span>▸ JUMP TO</span>
            <span className="eidotter-cmdpal__blink">_</span>
          </div>

          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-controls="eidotter-cmdpal-listbox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-activedescendant={
              results[selected] ? `eidotter-cmdpal-item-${results[selected].id}` : undefined
            }
            className="eidotter-cmdpal__input"
            value={query}
            placeholder={placeholder}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <ul
            ref={listRef}
            id="eidotter-cmdpal-listbox"
            role="listbox"
            aria-label={ariaLabel}
            className="eidotter-cmdpal__results"
          >
            {results.length === 0 && (
              <li className="eidotter-cmdpal__empty" role="presentation">
                {emptyMessage}
              </li>
            )}
            {results.map((item, i) => {
              const isSelected = i === selected;
              return (
                <li
                  key={item.id}
                  id={`eidotter-cmdpal-item-${item.id}`}
                  role="option"
                  aria-selected={isSelected}
                  data-index={i}
                  className={cn(
                    'eidotter-cmdpal__item',
                    isSelected && 'eidotter-cmdpal__item--selected',
                  )}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => handleSelect(item)}
                >
                  {renderItem ? renderItem(item, isSelected) : (
                    <>
                      <span className="eidotter-cmdpal__item-label">
                        <span className="eidotter-cmdpal__item-caret" aria-hidden="true">
                          {isSelected ? '▸' : ' '}
                        </span>
                        {item.label}
                      </span>
                      {item.hint !== undefined && (
                        <span className="eidotter-cmdpal__item-hint">{item.hint}</span>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>

          {footerHint && (
            <div className="eidotter-cmdpal__footer" aria-hidden="true">
              {footerHint}
            </div>
          )}
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
});

CmdPalette.displayName = 'CmdPalette';
