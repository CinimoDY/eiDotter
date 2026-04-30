import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import type { TimelineEntryData, TimelineImage } from '../types';
import './TimelineEntryCardGallery.css';

type GalleryEntry = Extract<TimelineEntryData, { kind: 'gallery' }>;

export interface TimelineEntryCardGalleryProps {
  entry: GalleryEntry;
  isExpanded: boolean;
  onSelect?: (id: string) => void;
}

/**
 * Gallery variant of TimelineEntryCard. Tasks 7–8:
 *  - Task 7 (this task): renders the title and a thumbnail grid. `link`
 *    images are anchors. No focus/lightbox states yet.
 *  - Task 8: adds focused (grow-in-place) and lightbox states + reset on
 *    parent collapse.
 */
export const TimelineEntryCardGallery: React.FC<TimelineEntryCardGalleryProps> = ({
  entry,
  isExpanded,
  onSelect,
}) => {
  if (entry.images.length === 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[eidotter] TimelineEntryCard kind="gallery" entry "${entry.id}" has no images.`);
    }
    return (
      <>
        <p className="eidotter-timeline-card__title">{entry.title}</p>
        <p className="eidotter-timeline-card-gallery__empty">No images.</p>
      </>
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

      <div className="eidotter-timeline-card-gallery__grid" role="list">
        {entry.images.map((img, i) => (
          <GalleryThumb key={i} image={img} />
        ))}
      </div>
    </>
  );
};

const GalleryThumb: React.FC<{ image: TimelineImage }> = ({ image }) => {
  const src = image.thumbnail || image.src;

  if (image.link) {
    return (
      <a
        className="eidotter-timeline-card-gallery__cell eidotter-timeline-card-gallery__cell--link"
        href={image.link}
      >
        <img className="eidotter-timeline-card-gallery__img" src={src} alt={image.alt}
             width={image.width} height={image.height} />
      </a>
    );
  }

  return (
    <div role="listitem" className="eidotter-timeline-card-gallery__cell">
      <img className="eidotter-timeline-card-gallery__img" src={src} alt={image.alt}
           width={image.width} height={image.height} />
    </div>
  );
};
