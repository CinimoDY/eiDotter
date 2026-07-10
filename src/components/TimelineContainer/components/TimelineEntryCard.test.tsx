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

  it('renders a thumbnail per image when kind is gallery', () => {
    render(
      <TimelineEntryCard
        entry={{
          id: 'g1', date: '2024-01-01', title: 'Gallery title', kind: 'gallery',
          images: [
            { src: '/a.png', alt: 'A', thumbnail: '/a-thumb.png' },
            { src: '/b.png', alt: 'B' },
            { src: '/c.png', alt: 'C' },
          ],
        }}
        isSelected={false}
      />,
    );
    expect(screen.getByText('Gallery title')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'A' })).toHaveAttribute('src', '/a-thumb.png');
    expect(screen.getByRole('img', { name: 'B' })).toHaveAttribute('src', '/b.png');
    expect(screen.getByRole('img', { name: 'C' })).toHaveAttribute('src', '/c.png');
  });

  it('renders an empty-state when gallery images array is empty', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <TimelineEntryCard
        entry={{ id: 'g0', date: '2024-01-01', title: 'Empty', kind: 'gallery', images: [] }}
        isSelected={false}
      />,
    );
    expect(screen.getByText('Empty')).toBeInTheDocument();
    expect(screen.getByText(/no images/i)).toBeInTheDocument();
    errorSpy.mockRestore();
  });

  it('renders gallery thumbs with link as anchors', () => {
    render(
      <TimelineEntryCard
        entry={{
          id: 'g2', date: '2024-01-01', title: 'Link gallery', kind: 'gallery',
          images: [
            { src: '/a.png', alt: 'A', link: 'https://a.example' },
            { src: '/b.png', alt: 'B' },
          ],
        }}
        isSelected={false}
      />,
    );
    expect(screen.getByRole('link', { name: /A/ })).toHaveAttribute('href', 'https://a.example');
    // B is not a link
    expect(screen.queryByRole('link', { name: /B/ })).toBeNull();
  });
});

describe('TimelineEntryCard gallery state machine', () => {
  const galleryEntry = {
    id: 'g', date: '2024-01-01', title: 'G', kind: 'gallery' as const,
    images: [
      { src: '/a.png', alt: 'A' },
      { src: '/b.png', alt: 'B' },
      { src: '/c.png', alt: 'C' },
    ],
  };

  it('focuses a thumb on first click (no lightbox yet)', () => {
    render(<TimelineEntryCard entry={galleryEntry} isSelected={false} isExpanded />);
    fireEvent.click(screen.getByRole('img', { name: 'A' }));
    expect(screen.getByRole('img', { name: 'A' }).closest('[role="listitem"]'))
      .toHaveClass('eidotter-timeline-card-gallery__cell--focused');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens the lightbox on second click of the focused thumb', () => {
    render(<TimelineEntryCard entry={galleryEntry} isSelected={false} isExpanded />);
    const thumb = screen.getByRole('img', { name: 'B' });
    fireEvent.click(thumb);
    fireEvent.click(thumb);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'B' })).toBeInTheDocument();
  });

  it('swaps focus when a different thumb is clicked', () => {
    render(<TimelineEntryCard entry={galleryEntry} isSelected={false} isExpanded />);
    fireEvent.click(screen.getByRole('img', { name: 'A' }));
    fireEvent.click(screen.getByRole('img', { name: 'C' }));
    expect(screen.getByRole('img', { name: 'A' }).closest('[role="listitem"]'))
      .not.toHaveClass('eidotter-timeline-card-gallery__cell--focused');
    expect(screen.getByRole('img', { name: 'C' }).closest('[role="listitem"]'))
      .toHaveClass('eidotter-timeline-card-gallery__cell--focused');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('resets to grid state when the parent card collapses', () => {
    const { rerender } = render(
      <TimelineEntryCard entry={galleryEntry} isSelected={false} isExpanded />,
    );
    fireEvent.click(screen.getByRole('img', { name: 'A' }));
    expect(screen.getByRole('img', { name: 'A' }).closest('[role="listitem"]'))
      .toHaveClass('eidotter-timeline-card-gallery__cell--focused');
    rerender(<TimelineEntryCard entry={galleryEntry} isSelected={false} isExpanded={false} />);
    expect(screen.getByRole('img', { name: 'A' }).closest('[role="listitem"]'))
      .not.toHaveClass('eidotter-timeline-card-gallery__cell--focused');
  });
});

// ---------------------------------------------------------------------------
// Article kind
// ---------------------------------------------------------------------------

describe('TimelineEntryCard article — collapsed', () => {
  const articleEntry = {
    id: 'a1',
    date: '2024-06-01',
    title: 'Devlog #1',
    kind: 'article' as const,
    summary: 'A short summary of the devlog entry.',
    images: [
      { src: '/hero.png', alt: 'Hero', thumbnail: '/hero-thumb.png' },
      { src: '/b.png', alt: 'B' },
      { src: '/c.png', alt: 'C' },
    ],
    content: <p>Full body text</p>,
    href: 'https://example.com/log/1',
  };

  it('renders title and summary while collapsed', () => {
    render(<TimelineEntryCard entry={articleEntry} isSelected={false} isExpanded={false} />);
    expect(screen.getByText('Devlog #1')).toBeInTheDocument();
    expect(screen.getByText('A short summary of the devlog entry.')).toBeInTheDocument();
  });

  it('renders decorative thumbnail strip while collapsed', () => {
    render(<TimelineEntryCard entry={articleEntry} isSelected={false} isExpanded={false} />);
    // Thumbs are aria-hidden — query by container, not role
    const strip = document.querySelector('.eidotter-timeline-card-article__thumb-strip');
    expect(strip).toBeInTheDocument();
    expect(strip).toHaveAttribute('aria-hidden', 'true');
    // Three images in strip (all within MAX_THUMB_STRIP=4)
    const thumbs = strip!.querySelectorAll('img');
    expect(thumbs).toHaveLength(3);
    // Uses thumbnail src when available
    expect(thumbs[0]).toHaveAttribute('src', '/hero-thumb.png');
  });

  it('shows +N overflow cell when images exceed 4', () => {
    const manyImages = Array.from({ length: 6 }, (_, i) => ({
      src: `/img${i}.png`, alt: `img${i}`,
    }));
    render(
      <TimelineEntryCard
        entry={{ ...articleEntry, images: manyImages }}
        isSelected={false}
        isExpanded={false}
      />,
    );
    const strip = document.querySelector('.eidotter-timeline-card-article__thumb-strip');
    const thumbs = strip!.querySelectorAll('img');
    expect(thumbs).toHaveLength(4);
    expect(document.querySelector('.eidotter-timeline-card-article__thumb-overflow')).toHaveTextContent('+2');
  });

  it('gallery grid is in the inert collapsed body (not yet interactive)', () => {
    render(<TimelineEntryCard entry={articleEntry} isSelected={false} isExpanded={false} />);
    // GalleryGrid is always in DOM (always-in-DOM + inert pattern).
    // The body-inner has inert, making all its children non-interactive.
    const bodyInner = document.querySelector('.eidotter-timeline-card__body-inner');
    expect(bodyInner).toHaveAttribute('inert');
    // The gallery list is inside the inert subtree
    const galleryList = bodyInner!.querySelector('[role="list"]');
    expect(galleryList).toBeInTheDocument();
  });

  it('renders children inside the trigger', () => {
    render(
      <TimelineEntryCard entry={articleEntry} isSelected={false} isExpanded={false}>
        <span data-testid="child">timestamp</span>
      </TimelineEntryCard>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});

describe('TimelineEntryCard article — expanded', () => {
  const articleEntry = {
    id: 'a2',
    date: '2024-06-01',
    title: 'Devlog #2',
    kind: 'article' as const,
    summary: 'Summary text',
    images: [
      { src: '/x.png', alt: 'X' },
      { src: '/y.png', alt: 'Y' },
    ],
    content: <p>Rich body</p>,
    href: 'https://example.com/log/2',
    hrefLabel: 'VIEW POST',
  };

  it('renders gallery grid when expanded', () => {
    render(<TimelineEntryCard entry={articleEntry} isSelected={false} isExpanded />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'X' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Y' })).toBeInTheDocument();
  });

  it('renders body content when expanded', () => {
    render(<TimelineEntryCard entry={articleEntry} isSelected={false} isExpanded />);
    expect(screen.getByText('Rich body')).toBeInTheDocument();
  });

  it('renders read-more anchor with correct href and custom label', () => {
    render(<TimelineEntryCard entry={articleEntry} isSelected={false} isExpanded />);
    const link = screen.getByRole('link', { name: /VIEW POST/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com/log/2');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('uses "READ MORE" as default read-more label', () => {
    const { href: _href, hrefLabel: _hl, ...rest } = articleEntry;
    render(
      <TimelineEntryCard
        entry={{ ...rest, href: 'https://example.com' }}
        isSelected={false}
        isExpanded
      />,
    );
    expect(screen.getByRole('link', { name: /READ MORE/i })).toBeInTheDocument();
  });

  it('does not render read-more anchor for unsafe href', () => {
    render(
      <TimelineEntryCard
        entry={{ ...articleEntry, href: 'javascript:alert(1)' }}
        isSelected={false}
        isExpanded
      />,
    );
    expect(screen.queryByRole('link', { name: /VIEW POST|READ MORE/i })).toBeNull();
  });

  it('thumbnail strip is absent when expanded', () => {
    render(<TimelineEntryCard entry={articleEntry} isSelected={false} isExpanded />);
    expect(document.querySelector('.eidotter-timeline-card-article__thumb-strip')).toBeNull();
  });

  it('opens lightbox when expanded gallery thumb is double-clicked', () => {
    render(<TimelineEntryCard entry={articleEntry} isSelected={false} isExpanded />);
    const imgX = screen.getByRole('img', { name: 'X' });
    fireEvent.click(imgX);
    fireEvent.click(imgX);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

describe('TimelineEntryCard article — read-more is unreachable while collapsed (inert body)', () => {
  it('body-inner has inert attribute when collapsed', () => {
    render(
      <TimelineEntryCard
        entry={{
          id: 'a3', date: '2024-06-01', title: 'T', kind: 'article',
          href: 'https://example.com', content: <p>body</p>,
        }}
        isSelected={false}
        isExpanded={false}
      />,
    );
    const bodyInner = document.querySelector('.eidotter-timeline-card__body-inner');
    expect(bodyInner).toHaveAttribute('inert');
  });

  it('body-inner does not have inert attribute when expanded', () => {
    render(
      <TimelineEntryCard
        entry={{
          id: 'a3', date: '2024-06-01', title: 'T', kind: 'article',
          href: 'https://example.com', content: <p>body</p>,
        }}
        isSelected={false}
        isExpanded
      />,
    );
    const bodyInner = document.querySelector('.eidotter-timeline-card__body-inner');
    expect(bodyInner).not.toHaveAttribute('inert');
  });
});
