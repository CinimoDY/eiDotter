'use client';

import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import type { TimelineEntryData } from '../types';
import { GalleryGrid } from './GalleryGrid';
import { isSafeHref } from '../../../../utils/isSafeHref';
import './TimelineEntryCardArticle.css';

type ArticleEntry = Extract<TimelineEntryData, { kind: 'article' }>;

export interface TimelineEntryCardArticleProps {
  entry: ArticleEntry;
  isExpanded: boolean;
  onSelect?: (id: string) => void;
  children?: React.ReactNode;
}

const MAX_THUMB_STRIP = 4;

/**
 * Article variant of TimelineEntryCard.
 *
 * Collapsed: type/tags header + title + summary preview + decorative thumbnail
 * strip (up to 4 images, +N overflow, aria-hidden). Expanded: interactive
 * gallery grid (→ Lightbox) + rich body content + sanitized "READ MORE →" link.
 *
 * The trigger AriaButton is the sole expand/collapse control. The read-more
 * anchor lives in the inert collapsed body — it is unreachable while collapsed,
 * giving correct a11y for free.
 */
export const TimelineEntryCardArticle: React.FC<TimelineEntryCardArticleProps> = ({
  entry,
  isExpanded,
  onSelect,
  children,
}) => {
  const images = entry.images ?? [];
  const hasContent = entry.content != null;
  const hasImages = images.length > 0;
  const hasBody = hasContent || hasImages || (entry.href && isSafeHref(entry.href));

  const thumbCount = Math.min(images.length, MAX_THUMB_STRIP);
  const overflow = images.length - MAX_THUMB_STRIP;
  const readMoreHref = entry.href && isSafeHref(entry.href) ? entry.href : undefined;

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
              {entry.tags.map(t => `#${t}`).join(' ')}
            </span>
          )}
        </div>
        <p className="eidotter-timeline-card__title">{entry.title}</p>
        {entry.summary && (
          <p className="eidotter-timeline-card__preview">
            {entry.summary.slice(0, 80)}
            {entry.summary.length > 80 ? '...' : ''}
          </p>
        )}
        {children}
        {/* Decorative thumbnail strip — only visible while collapsed */}
        {!isExpanded && hasImages && (
          <div className="eidotter-timeline-card-article__thumb-strip" aria-hidden="true">
            {images.slice(0, thumbCount).map((img, i) => (
              <img
                key={i}
                className="eidotter-timeline-card-article__thumb"
                src={img.thumbnail || img.src}
                alt=""
                width={img.width}
                height={img.height}
                loading="lazy"
              />
            ))}
            {overflow > 0 && (
              <div className="eidotter-timeline-card-article__thumb-overflow">
                +{overflow}
              </div>
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
            {/* Interactive gallery at the top of the expanded body */}
            {hasImages && (
              <div className="eidotter-timeline-card-article__gallery">
                <GalleryGrid images={images} isExpanded={isExpanded} />
              </div>
            )}

            {/* Rich body content */}
            {entry.content}

            {/* Read-more anchor — only when href passes isSafeHref */}
            {readMoreHref && (
              <div className="eidotter-timeline-card-article__read-more">
                <a
                  className="eidotter-timeline-card-article__read-more-link"
                  href={readMoreHref}
                  rel="noopener noreferrer"
                >
                  {entry.hrefLabel ?? 'READ MORE'} →
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
