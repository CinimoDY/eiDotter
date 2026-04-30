import React from 'react';
import { TimelineEntryCard } from './TimelineEntryCard';
import { render, screen, fireEvent } from '@testing-library/react';

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

  it('renders a thumbnail when kind is image and not expanded', () => {
    render(
      <TimelineEntryCard
        entry={{
          id: 'i1', date: '2024-01-01', title: 'Image title', kind: 'image',
          image: { src: '/full.png', alt: 'A photo', thumbnail: '/thumb.png' },
        }}
        isSelected={false}
      />,
    );
    const img = screen.getByRole('img', { name: 'A photo' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/thumb.png');
  });

  it('falls back to src when no thumbnail is provided', () => {
    render(
      <TimelineEntryCard
        entry={{
          id: 'i2', date: '2024-01-01', title: 'No thumb', kind: 'image',
          image: { src: '/full.png', alt: 'A photo' },
        }}
        isSelected={false}
      />,
    );
    expect(screen.getByRole('img', { name: 'A photo' })).toHaveAttribute('src', '/full.png');
  });

  it('renders a link when image.link is set, instead of opening lightbox', () => {
    render(
      <TimelineEntryCard
        entry={{
          id: 'i3', date: '2024-01-01', title: 'Linked', kind: 'image',
          image: { src: '/x.png', alt: 'X', link: 'https://example.com' },
        }}
        isSelected={false}
      />,
    );
    const link = screen.getByRole('link', { name: /linked/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
    // No dialog (lightbox) renders without interaction.
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens the lightbox when the image is clicked (no link)', () => {
    render(
      <TimelineEntryCard
        entry={{
          id: 'i4', date: '2024-01-01', title: 'Clickable', kind: 'image',
          image: { src: '/full.png', alt: 'A photo' },
        }}
        isSelected={false}
        isExpanded
      />,
    );
    fireEvent.click(screen.getByRole('img', { name: 'A photo' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
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
