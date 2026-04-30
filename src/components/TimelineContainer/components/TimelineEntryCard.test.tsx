import React from 'react';
import { TimelineEntryCard } from './TimelineEntryCard';
import { render, screen } from '@testing-library/react';

describe('TimelineEntryCard dispatcher', () => {
  it('renders the text branch when kind is text', () => {
    render(
      <TimelineEntryCard
        entry={{ id: 't1', date: '2024-01-01', title: 'Text title', kind: 'text', content: 'Body' }}
        isSelected={false}
        isExpanded
      />,
    );
    expect(screen.getByText('Text title')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('renders the image branch placeholder when kind is image', () => {
    render(
      <TimelineEntryCard
        entry={{
          id: 'i1', date: '2024-01-01', title: 'Image title', kind: 'image',
          image: { src: '/a.png', alt: 'a' },
        }}
        isSelected={false}
      />,
    );
    expect(screen.getByText('Image title')).toBeInTheDocument();
    // placeholder renders a marker for now; see TimelineEntryCard.tsx
    expect(screen.getByTestId('timeline-card-image-placeholder')).toBeInTheDocument();
  });

  it('renders the gallery branch placeholder when kind is gallery', () => {
    render(
      <TimelineEntryCard
        entry={{
          id: 'g1', date: '2024-01-01', title: 'Gallery title', kind: 'gallery',
          images: [{ src: '/a.png', alt: 'a' }, { src: '/b.png', alt: 'b' }],
        }}
        isSelected={false}
      />,
    );
    expect(screen.getByText('Gallery title')).toBeInTheDocument();
    expect(screen.getByTestId('timeline-card-gallery-placeholder')).toBeInTheDocument();
  });
});
