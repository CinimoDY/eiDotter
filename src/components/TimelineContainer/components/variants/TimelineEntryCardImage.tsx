import React, { useState } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import type { TimelineEntryData } from '../types';
import { Lightbox } from '../../../Lightbox';
import './TimelineEntryCardImage.css';

type ImageEntry = Extract<TimelineEntryData, { kind: 'image' }>;

export interface TimelineEntryCardImageProps {
  entry: ImageEntry;
  isExpanded: boolean;
  onSelect?: (id: string) => void;
}

/**
 * Image variant of TimelineEntryCard.
 *
 * Collapsed: title + thumbnail. Expanded: title + full-width image. Click on
 * the expanded image opens a Lightbox. If `entry.image.link` is set, the
 * thumbnail is wrapped in a plain anchor and clicks navigate out — no
 * expansion, no lightbox.
 */
export const TimelineEntryCardImage: React.FC<TimelineEntryCardImageProps> = ({
  entry,
  isExpanded,
  onSelect,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { image } = entry;
  const thumbSrc = image.thumbnail || image.src;

  // link mode — render as a plain anchor and exit early.
  if (image.link) {
    return (
      <a className="eidotter-timeline-card-image eidotter-timeline-card-image--link" href={image.link}>
        <p className="eidotter-timeline-card__title">{entry.title}</p>
        <img
          className="eidotter-timeline-card-image__media"
          src={thumbSrc}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      </a>
    );
  }

  return (
    <>
      <AriaButton
        className="eidotter-timeline-card__trigger"
        onPress={() => onSelect?.(entry.id)}
        aria-expanded={isExpanded}
      >
        <p className="eidotter-timeline-card__title">{entry.title}</p>
      </AriaButton>

      <div className="eidotter-timeline-card-image">
        <img
          className={
            'eidotter-timeline-card-image__media ' +
            (isExpanded ? 'eidotter-timeline-card-image__media--expanded' : 'eidotter-timeline-card-image__media--thumb')
          }
          src={isExpanded ? image.src : thumbSrc}
          alt={image.alt}
          width={image.width}
          height={image.height}
          onClick={() => { if (isExpanded) setLightboxOpen(true); }}
        />
      </div>

      <Lightbox
        images={[image]}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};
