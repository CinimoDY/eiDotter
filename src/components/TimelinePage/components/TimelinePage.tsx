'use client';

import React, { useMemo, useState } from 'react';
import { cn } from '../../../utils/cn';
import { isSafeHref } from '../../../utils/isSafeHref';
import type { NavProps } from '../../Nav';
import type { TimelineCategory } from '../../TimelineFeed';
import type { TimelineEntryData, TimelineImage } from '../../TimelineContainer';
import './TimelinePage.css';

export interface TimelinePageProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Entries. Grouped by year and shown newest-first automatically. */
  entries: TimelineEntryData[];
  /** Categories for the filter chip row. Omit to hide the filter. */
  categories?: TimelineCategory[];
  /** Resolve an entry's category key. Default: `entry.tags?.[0]`. */
  categoryOf?: (entry: TimelineEntryData) => string | undefined;
  /** Resolve an entry's description line. Default: an `article` entry's `summary`. */
  descriptionOf?: (entry: TimelineEntryData) => string | undefined;
  /** Controlled active category (null = ALL). */
  activeCategory?: string | null;
  /** Uncontrolled initial category. Default null (ALL). */
  defaultCategory?: string | null;
  onCategoryChange?: (key: string | null) => void;
  /** Brand slot at the start of the filter row (e.g. a `<Mark/>`). */
  brand?: React.ReactNode;
  /** Show the right-hand hover-preview panel. Default true. */
  preview?: boolean;
  /** Custom link component for entry titles that carry an `article` href. */
  linkComponent?: NavProps['linkComponent'];
}

const defaultCategoryOf = (entry: TimelineEntryData): string | undefined => entry.tags?.[0];
const defaultDescriptionOf = (entry: TimelineEntryData): string | undefined =>
  entry.kind === 'article' ? entry.summary : undefined;

function previewImage(entry: TimelineEntryData): TimelineImage | undefined {
  if (entry.kind === 'image') return entry.image;
  if (entry.kind === 'gallery') return entry.images[0];
  if (entry.kind === 'article') return entry.images?.[0];
  return undefined;
}

function entryHref(entry: TimelineEntryData): string | undefined {
  return entry.kind === 'article' ? entry.href : undefined;
}

function yearOf(iso: string): string {
  const y = new Date(iso).getFullYear();
  return Number.isNaN(y) ? iso.slice(0, 4) : String(y);
}

/**
 * TimelinePage — a Bret-Victor-style blog timeline (the "K2" layout). A filter
 * chip row (with an optional Mark brand slot) sits above a year-grouped
 * timeline: an AMBER-ONLY spine + dots (never category-rainbow), neutral grey
 * dates, big titles and a description line — content leads. A right-hand panel
 * previews the focused entry's thumbnail on hover/focus.
 *
 * Presentational; shares the `TimelineEntryData` model with TimelineContainer.
 */
export function TimelinePage({
  entries,
  categories,
  categoryOf = defaultCategoryOf,
  descriptionOf = defaultDescriptionOf,
  activeCategory,
  defaultCategory = null,
  onCategoryChange,
  brand,
  preview = true,
  linkComponent,
  className,
  ...rest
}: TimelinePageProps) {
  const LinkTag = (linkComponent as React.ElementType | undefined) ?? 'a';
  const isControlled = activeCategory !== undefined;
  const [internal, setInternal] = useState<string | null>(defaultCategory);
  const active = isControlled ? activeCategory! : internal;
  const setActive = (key: string | null) => {
    if (!isControlled) setInternal(key);
    onCategoryChange?.(key);
  };

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }),
    [],
  );
  const formatDate = (iso: string) => {
    try {
      return dateFormatter.format(new Date(iso));
    } catch {
      return iso;
    }
  };

  const visible = useMemo(
    () => (active ? entries.filter((e) => categoryOf(e) === active) : entries),
    [active, entries, categoryOf],
  );

  const groups = useMemo(() => {
    const byYear = new Map<string, TimelineEntryData[]>();
    for (const e of visible) {
      const y = yearOf(e.date);
      const list = byYear.get(y);
      if (list) list.push(e);
      else byYear.set(y, [e]);
    }
    return Array.from(byYear.entries())
      .map(([year, es]) => ({ year, entries: [...es].sort((a, b) => b.date.localeCompare(a.date)) }))
      .sort((a, b) => b.year.localeCompare(a.year));
  }, [visible]);

  const [focusedId, setFocusedId] = useState<string | null>(null);
  const focused = useMemo(
    () => visible.find((e) => e.id === focusedId) ?? visible[0],
    [visible, focusedId],
  );
  const focusedImage = focused ? previewImage(focused) : undefined;

  return (
    <section className={cn('eidotter-blog font-dos', className)} {...rest}>
      {(brand || (categories && categories.length > 0)) && (
        <div className="eidotter-blog__filter">
          {brand && <div className="eidotter-blog__brand">{brand}</div>}
          {categories && categories.length > 0 && (
            <div className="eidotter-blog__chips" role="group" aria-label="Filter by category">
              <button
                type="button"
                className={cn('eidotter-blog__chip', active === null && 'eidotter-blog__chip--active')}
                aria-pressed={active === null}
                onClick={() => setActive(null)}
              >
                all
              </button>
              {categories.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  className={cn('eidotter-blog__chip', active === c.key && 'eidotter-blog__chip--active')}
                  aria-pressed={active === c.key}
                  onClick={() => setActive(c.key)}
                  style={c.color ? ({ '--eidotter-blog-chip': c.color } as React.CSSProperties) : undefined}
                >
                  <span className="eidotter-blog__chip-dot" aria-hidden="true" />
                  {c.label}
                </button>
              ))}
              {active !== null && (
                <span className="eidotter-blog__count">
                  {visible.length} of {entries.length}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      <div className="eidotter-blog__body">
        <div className="eidotter-blog__timeline">
          {groups.map((group) => (
            <div key={group.year} className="eidotter-blog__year-group">
              <h2 className="eidotter-blog__year">{group.year}</h2>
              <ol className="eidotter-blog__entries">
                {group.entries.map((entry) => {
                  const href = entryHref(entry);
                  const safeHref = href && isSafeHref(href) ? href : undefined;
                  const desc = descriptionOf(entry);
                  const focus = () => setFocusedId(entry.id);
                  return (
                    <li
                      key={entry.id}
                      className={cn('eidotter-blog__entry', focused?.id === entry.id && 'eidotter-blog__entry--focused')}
                      onMouseEnter={focus}
                      onFocus={focus}
                    >
                      <span className="eidotter-blog__dot" aria-hidden="true" />
                      <time className="eidotter-blog__date" dateTime={entry.date}>
                        {formatDate(entry.date)}
                      </time>
                      <h3 className="eidotter-blog__title">
                        {safeHref ? (
                          <LinkTag href={safeHref} className="eidotter-blog__title-link">
                            {entry.title}
                          </LinkTag>
                        ) : (
                          entry.title
                        )}
                      </h3>
                      {desc && <p className="eidotter-blog__desc">{desc}</p>}
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
          {groups.length === 0 && <p className="eidotter-blog__empty">C:\LOG&gt; No entries.</p>}
        </div>

        {preview && (
          <aside className="eidotter-blog__preview" aria-hidden="true">
            <div className="eidotter-blog__preview-inner">
              {focusedImage ? (
                <img
                  className="eidotter-blog__preview-img"
                  src={focusedImage.thumbnail ?? focusedImage.src}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <div className="eidotter-blog__preview-placeholder">▓▒░ · ░▒▓</div>
              )}
              {focused && (
                <div className="eidotter-blog__preview-caption">
                  <span className="eidotter-blog__preview-title">{focused.title}</span>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
