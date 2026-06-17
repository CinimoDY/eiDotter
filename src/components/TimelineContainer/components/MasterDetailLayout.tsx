'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { cn } from '../../../utils/cn';
import type { TimelineEntryData, TimelineRenderEntry } from './types';
import { TimelineNode } from '../../TimelineNode/components/TimelineNode';
import { TimelineEntryCard } from './TimelineEntryCard';
import '../../../styles/keyframes.css';
import './MasterDetailLayout.css';

export interface MasterDetailLayoutProps {
  /** Pre-sorted entries (the orchestrator sorts; the rail renders in order). */
  entries: TimelineEntryData[];
  /** The entry currently filling the detail pane, or null for none. */
  selectedEntryId: string | null;
  /** Open an entry in the detail pane (set semantics). */
  onSelect: (id: string) => void;
  /** Return to the rail (close the detail pane). */
  onDeselect: () => void;
  /** Optional pluggable entry renderer, used for the detail body. */
  renderEntry?: TimelineRenderEntry;
  /** Date formatter shared with the orchestrator. */
  formatDate: (iso: string) => string;
}

/**
 * Level-3 "master-detail" timeline layout (DMNC-878).
 *
 * A split view: a navigable timeline rail (left) plus a detail pane (right)
 * that renders the selected entry in full. Switching entries swaps the detail
 * pane without remounting the rail, so rail scroll position is preserved.
 *
 * Selection is owned by the orchestrator (controlled/uncontrolled via
 * `useSelection`), so the open entry is deep-linkable by consumers. The rail
 * uses navigation semantics (`aria-current`), arrow keys walk entries, and
 * focus moves into the pane on open and back to the rail on close — without a
 * focus trap, so both panes stay reachable.
 */
export const MasterDetailLayout: React.FC<MasterDetailLayoutProps> = ({
  entries,
  selectedEntryId,
  onSelect,
  onDeselect,
  renderEntry,
  formatDate,
}) => {
  const selectedEntry = entries.find((e) => e.id === selectedEntryId) ?? null;
  const railRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  // Focus management (DMNC-878): move focus into the detail pane when an entry
  // opens, and restore focus to the active rail row when it closes. Mirrors the
  // requestAnimationFrame focus-move pattern used for drill-down transitions.
  const prevSelectedRef = useRef<string | null>(selectedEntryId);
  useEffect(() => {
    const prev = prevSelectedRef.current;
    prevSelectedRef.current = selectedEntryId;
    if (selectedEntryId && selectedEntryId !== prev) {
      requestAnimationFrame(() => detailRef.current?.focus());
    } else if (!selectedEntryId && prev) {
      requestAnimationFrame(() => {
        railRef.current
          ?.querySelector<HTMLElement>(`[data-entry-id="${prev}"]`)
          ?.focus();
      });
    }
  }, [selectedEntryId]);

  // Arrow-key walk over the flat sorted entries (mirrors CmdPalette). With
  // nothing selected, ArrowDown opens the first entry and ArrowUp the last.
  const moveSelection = useCallback(
    (delta: number) => {
      if (entries.length === 0) return;
      const idx = entries.findIndex((e) => e.id === selectedEntryId);
      const base = idx === -1 ? (delta > 0 ? -1 : entries.length) : idx;
      const next = Math.max(0, Math.min(entries.length - 1, base + delta));
      onSelect(entries[next].id);
    },
    [entries, selectedEntryId, onSelect],
  );

  const handleRailKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveSelection(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveSelection(-1);
      } else if (e.key === 'Escape' && selectedEntryId) {
        e.preventDefault();
        onDeselect();
      }
    },
    [moveSelection, onDeselect, selectedEntryId],
  );

  const renderDetailBody = (entry: TimelineEntryData) => {
    const defaultRender = () => (
      <TimelineEntryCard entry={entry} isSelected isExpanded />
    );
    return renderEntry
      ? renderEntry(entry, { isExpanded: true, isSelected: true, defaultRender })
      : defaultRender();
  };

  return (
    <div
      className={cn(
        'eidotter-timeline-md',
        selectedEntry && 'eidotter-timeline-md--detail-open',
      )}
    >
      <nav
        ref={railRef}
        className="eidotter-timeline-md__rail"
        aria-label="Timeline entries"
        onKeyDown={handleRailKeyDown}
      >
        <ul className="eidotter-timeline-md__rail-list">
          {entries.map((entry) => {
            const isActive = entry.id === selectedEntryId;
            return (
              <li key={entry.id} className="eidotter-timeline-md__rail-item">
                <button
                  type="button"
                  data-entry-id={entry.id}
                  className={cn(
                    'eidotter-timeline-md__rail-button',
                    isActive && 'eidotter-timeline-md__rail-button--active',
                  )}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => onSelect(entry.id)}
                >
                  <span className="eidotter-timeline-md__rail-node" aria-hidden="true">
                    <TimelineNode shape="circle" size="sm" variant="default" isActive={isActive} />
                  </span>
                  <span className="eidotter-timeline-md__rail-text">
                    <span className="eidotter-timeline-md__rail-date">{formatDate(entry.date)}</span>
                    <span className="eidotter-timeline-md__rail-title">{entry.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        ref={detailRef}
        className="eidotter-timeline-md__detail"
        role="region"
        aria-label="Entry detail"
        tabIndex={-1}
      >
        {selectedEntry ? (
          <>
            <button
              type="button"
              className="eidotter-timeline-md__back"
              onClick={onDeselect}
            >
              &lsaquo; BACK
            </button>
            <div key={selectedEntry.id} className="eidotter-timeline-md__detail-body">
              {renderDetailBody(selectedEntry)}
            </div>
          </>
        ) : (
          <div className="eidotter-timeline-md__detail-empty" role="status">
            <p>C:\TIMELINE&gt; Select an entry to read.</p>
            <p>_</p>
          </div>
        )}
      </div>
    </div>
  );
};

MasterDetailLayout.displayName = 'MasterDetailLayout';
