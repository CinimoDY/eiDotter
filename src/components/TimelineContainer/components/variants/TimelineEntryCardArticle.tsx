'use client';

import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import type { TimelineEntryData } from '../types';
import { isSafeHref } from '../../../../utils/isSafeHref';
import { GalleryGrid } from './GalleryGrid';
import './TimelineEntryCardArticle.css';

type ArticleEntry = Extract<TimelineEntryData, { kind: 'article' }>;

export interface TimelineEntryCardArticleProps {
  entry: ArticleEntry;
  isExpanded: boolean;
  onSelect?: (id: string) => void;
  children?: React.ReactNode;
}

/** Max thumbnails shown in the collapsed decorative strip before a `+N` cell. */
const MAX_THUMBS = 4;

/**
 * Article variant of TimelineEntryCard — a devlog-style entry.
 *
 * Collapsed: type/tags header, title, an 80-char `summary` preview, then a
 * decorative thumbnail strip. Everything sits inside the single trigger button
 * (`aria-hidden` thumbs, no nested interactive elements) so a click anywhere
 * toggles expand/collapse.
 *
 * Expanded: uses the shared always-in-DOM `__body`/`__body-inner` + `inert` +
 * 0fr→1fr grid pattern (like the text branch), so the interactive gallery,
 * body content, and sanitized "READ MORE →" link are unfocusable/unclickable
 * while collapsed — correct a11y for free.
 */
export const TimelineEntryCardArticle: React.FC<TimelineEntryCardArticleProps> = ({
  entry,
  isExpanded,
  onSelect,
  children,
}) => {
  const { summary, content, href, hrefLabel } = entry;
  const imageList = entry.images ?? [];
  const hasImages = imageList.length > 0;

  const readMoreHref = href && isSafeHref(href) ? href : undefined;
  // The expanded body is always mounted (inert when collapsed) so the grid can
  // animate. Render it whenever there's a gallery, body content, or read-more.
  const hasBody = hasImages || content != null || readMoreHref !== undefined;

  const thumbs = imageList.slice(0, MAX_THUMBS);
  const overflow = imageList.length - thumbs.length;

  return (
    <>
      <AriaButton
        className="eidotter-timeline-card__trigger"
        onPress={() => onSelect?.(entry.id)}
        aria-expanded={isExpanded}
      >
        <div className="eidotter-timeline-card__header">
          {entry.type && (
            <span className="eidotter-timeline-card__type">{entry.type.toUpperCase()}</span>
          )}
          {entry.tags && entry.tags.length > 0 && (
            <span className="eidotter-timeline-card__tags">
              {entry.tags.map((t) => `#${t}`).join(' ')}
            </span>
          )}
        </div>

        <p className="eidotter-timeline-card__title">{entry.title}</p>

        {!isExpanded && typeof summary === 'string' && summary.length > 0 && (
          <p className="eidotter-timeline-card__preview">
            {summary.slice(0, 80)}
            {summary.length > 80 ? '...' : ''}
          </p>
        )}

        {children}

        {/* Decorative thumbnail strip — collapsed only. aria-hidden, empty
            alts, no nested interactive elements: the trigger owns the click. */}
        {!isExpanded && hasImages && (
          <div className="eidotter-timeline-card-article__thumbstrip" aria-hidden="true">
            {thumbs.map((img, i) => (
              <span key={i} className="eidotter-timeline-card-article__thumb">
                <img
                  className="eidotter-timeline-card-article__thumb-img"
                  src={img.thumbnail || img.src}
                  alt=""
                  loading="lazy"
                  width={img.width}
                  height={img.height}
                />
              </span>
            ))}
            {overflow > 0 && (
              <span className="eidotter-timeline-card-article__thumb eidotter-timeline-card-article__thumb--more">
                +{overflow}
              </span>
            )}
          </div>
        )}
      </AriaButton>

      {hasBody && (
        <div className="eidotter-timeline-card__body">
          <div
            className="eidotter-timeline-card__body-inner"
            inert={!isExpanded ? true : undefined}
          >
            {hasImages && <GalleryGrid images={imageList} isExpanded={isExpanded} />}

            {content != null && (
              <div className="eidotter-timeline-card-article__content">{content}</div>
            )}

            {readMoreHref && (
              <div className="eidotter-timeline-card-article__footer">
                <a
                  className="eidotter-timeline-card-article__readmore"
                  href={readMoreHref}
                  rel="noopener noreferrer"
                >
                  {hrefLabel ?? 'READ MORE'} →
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
