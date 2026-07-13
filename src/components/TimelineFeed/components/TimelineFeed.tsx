'use client';

import React, { useMemo, useState } from 'react';
import { cn } from '../../../utils/cn';
import { isSafeHref } from '../../../utils/isSafeHref';
import type { NavProps } from '../../Nav';
import type { TimelineEntryData } from '../../TimelineContainer';
import './TimelineFeed.css';

/** A filterable category: a dot/chip colour and a human label. */
export interface TimelineCategory {
  key: string;
  label: string;
  /** CSS colour for the dot + active chip. Omit → amber (currentColor). */
  color?: string;
}

export interface TimelineFeedProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Entries to list, newest-first is the consumer's responsibility. */
  entries: TimelineEntryData[];
  /** Categories for the filter chip row + dot colours. Omit to hide the filter. */
  categories?: TimelineCategory[];
  /** Resolve an entry's category key. Default: `entry.tags?.[0]`. */
  categoryOf?: (entry: TimelineEntryData) => string | undefined;
  /** Controlled active category (null = ALL). Leave undefined for uncontrolled. */
  activeCategory?: string | null;
  /** Uncontrolled initial category. Default null (ALL). */
  defaultCategory?: string | null;
  /** Fired when the filter changes. */
  onCategoryChange?: (key: string | null) => void;
  /** Custom link component for entry titles that carry an `article` href. */
  linkComponent?: NavProps['linkComponent'];
}

const KIND_LABEL: Record<string, string> = {
  milestone: 'milestone',
  project: 'project',
  event: 'event',
};

const defaultCategoryOf = (entry: TimelineEntryData): string | undefined => entry.tags?.[0];

/** Read an entry's optional read-more href (only the `article` kind has one). */
function entryHref(entry: TimelineEntryData): string | undefined {
  return entry.kind === 'article' ? entry.href : undefined;
}

/**
 * TimelineFeed — a dense, product-grade feed (the "J" layout): each row is a
 * category dot · neutral date · title · a delicate outlined kind-tag, threaded
 * by a thin amber spine. An optional category chip row culls the list
 * ("navigation becomes a course through time"). Amber-mono; category colour
 * lives only in the small dots + the active chip.
 *
 * Presentational — shares the `TimelineEntryData` model with TimelineContainer;
 * the consumer owns ordering and data.
 */
export function TimelineFeed({
  entries,
  categories,
  categoryOf = defaultCategoryOf,
  activeCategory,
  defaultCategory = null,
  onCategoryChange,
  linkComponent,
  className,
  ...rest
}: TimelineFeedProps) {
  const LinkTag = (linkComponent as React.ElementType | undefined) ?? 'a';
  const isControlled = activeCategory !== undefined;
  const [internal, setInternal] = useState<string | null>(defaultCategory);
  const active = isControlled ? activeCategory! : internal;

  const setActive = (key: string | null) => {
    if (!isControlled) setInternal(key);
    onCategoryChange?.(key);
  };

  const colorByKey = useMemo(() => {
    const map = new Map<string, string | undefined>();
    categories?.forEach((c) => map.set(c.key, c.color));
    return map;
  }, [categories]);

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
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

  return (
    <section className={cn('eidotter-feed font-dos', className)} {...rest}>
      {categories && categories.length > 0 && (
        <div className="eidotter-feed__filter" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={cn('eidotter-feed__chip', active === null && 'eidotter-feed__chip--active')}
            aria-pressed={active === null}
            onClick={() => setActive(null)}
          >
            all
            {active !== null && <span className="eidotter-feed__count"> · {visible.length} of {entries.length}</span>}
          </button>
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              className={cn('eidotter-feed__chip', active === c.key && 'eidotter-feed__chip--active')}
              aria-pressed={active === c.key}
              onClick={() => setActive(c.key)}
              style={c.color ? ({ '--eidotter-feed-chip': c.color } as React.CSSProperties) : undefined}
            >
              <span className="eidotter-feed__chip-dot" aria-hidden="true" />
              {c.label}
            </button>
          ))}
        </div>
      )}

      <ol className="eidotter-feed__list" aria-label={rest['aria-label'] ?? 'Timeline feed'}>
        {visible.map((entry) => {
          const catKey = categoryOf(entry);
          const dotColor = catKey ? colorByKey.get(catKey) : undefined;
          const href = entryHref(entry);
          const safeHref = href && isSafeHref(href) ? href : undefined;
          const kind = entry.type ? KIND_LABEL[entry.type] : undefined;
          return (
            <li key={entry.id} className="eidotter-feed__row">
              <span
                className="eidotter-feed__dot"
                aria-hidden="true"
                style={dotColor ? ({ '--eidotter-feed-dot': dotColor } as React.CSSProperties) : undefined}
              />
              <time className="eidotter-feed__date" dateTime={entry.date}>
                {formatDate(entry.date)}
              </time>
              <span className="eidotter-feed__title">
                {safeHref ? (
                  <LinkTag href={safeHref} className="eidotter-feed__title-link">
                    {entry.title}
                  </LinkTag>
                ) : (
                  entry.title
                )}
              </span>
              {kind && <span className="eidotter-feed__kind">{kind}</span>}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
