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

describe('TimelineEntryCard article kind', () => {
  const baseArticle = {
    id: 'a1',
    date: '2024-05-01',
    title: 'Devlog #1',
    kind: 'article' as const,
    type: 'project' as const,
    tags: ['dos', 'retro'],
    summary: 'A short devlog summary.',
    content: 'The full devlog body.',
    images: [
      { src: '/1.png', alt: 'One', thumbnail: '/1-thumb.png' },
      { src: '/2.png', alt: 'Two' },
      { src: '/3.png', alt: 'Three' },
      { src: '/4.png', alt: 'Four' },
      { src: '/5.png', alt: 'Five' },
      { src: '/6.png', alt: 'Six' },
    ],
    href: 'https://dmnc.tech/log/devlog-1',
  };

  it('collapsed: shows a summary preview + decorative thumb strip with +N overflow', () => {
    const { container } = render(<TimelineEntryCard entry={baseArticle} isSelected={false} />);
    expect(screen.getByText('Devlog #1')).toBeInTheDocument();
    expect(screen.getByText('A short devlog summary.')).toBeInTheDocument();

    const strip = container.querySelector('.eidotter-timeline-card-article__thumbstrip');
    expect(strip).not.toBeNull();
    expect(strip).toHaveAttribute('aria-hidden', 'true');
    // 4 decorative thumbs shown; the remaining 2 collapse into a +N cell.
    expect(container.querySelectorAll('.eidotter-timeline-card-article__thumb-img')).toHaveLength(4);
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('collapsed thumb strip is decorative — no interactive elements; the trigger owns selection', () => {
    const onSelect = jest.fn();
    const { container } = render(
      <TimelineEntryCard entry={baseArticle} isSelected={false} onSelect={onSelect} />,
    );
    const strip = container.querySelector('.eidotter-timeline-card-article__thumbstrip');
    expect(strip).not.toBeNull();
    // No nested interactive elements inside the strip — a click anywhere on the
    // trigger must toggle expand, never a nested control.
    expect(strip!.querySelector('a, button')).toBeNull();
    // The single trigger button owns selection.
    fireEvent.click(screen.getByRole('button', { name: /Devlog #1/ }));
    expect(onSelect).toHaveBeenCalledWith('a1');
  });

  it('collapsed: the expandable body is inert (gallery + read-more unreachable)', () => {
    const { container } = render(<TimelineEntryCard entry={baseArticle} isSelected={false} />);
    const bodyInner = container.querySelector('.eidotter-timeline-card__body-inner');
    expect(bodyInner).not.toBeNull();
    expect(bodyInner).toHaveAttribute('inert');
  });

  it('expanded: shows the interactive gallery, content, and a sanitized read-more link', () => {
    const { container } = render(<TimelineEntryCard entry={baseArticle} isSelected={false} isExpanded />);
    // Decorative strip is collapsed-only; the interactive gallery takes over.
    expect(container.querySelector('.eidotter-timeline-card-article__thumbstrip')).toBeNull();
    expect(screen.getByRole('img', { name: 'One' })).toHaveAttribute('src', '/1-thumb.png');
    expect(screen.getByText('The full devlog body.')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /read more/i });
    expect(link).toHaveAttribute('href', 'https://dmnc.tech/log/devlog-1');

    expect(container.querySelector('.eidotter-timeline-card__body-inner')).not.toHaveAttribute('inert');
  });

  it('uses a custom hrefLabel when provided', () => {
    render(
      <TimelineEntryCard
        entry={{ ...baseArticle, hrefLabel: 'CONTINUE READING' }}
        isSelected={false}
        isExpanded
      />,
    );
    expect(screen.getByRole('link', { name: /continue reading/i })).toBeInTheDocument();
  });

  it('drops the read-more link for an unsafe href scheme', () => {
    render(
      <TimelineEntryCard
        entry={{ ...baseArticle, href: 'javascript:alert(1)' }}
        isSelected={false}
        isExpanded
      />,
    );
    expect(screen.queryByRole('link', { name: /read more/i })).toBeNull();
  });

  it('opens the lightbox from the expanded gallery', () => {
    render(<TimelineEntryCard entry={baseArticle} isSelected={false} isExpanded />);
    const thumb = screen.getByRole('img', { name: 'Two' });
    fireEvent.click(thumb);
    fireEvent.click(thumb);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders children inside the trigger (HourView parity)', () => {
    render(
      <TimelineEntryCard entry={baseArticle} isSelected={false}>
        <time dateTime="2024-05-01">May 1</time>
      </TimelineEntryCard>,
    );
    expect(screen.getByText('May 1')).toBeInTheDocument();
  });

  it('renders a summary-only article (no images or href)', () => {
    const { container } = render(
      <TimelineEntryCard
        entry={{ id: 'a2', date: '2024-05-02', title: 'Text-only devlog', kind: 'article', summary: 'Just a summary.' }}
        isSelected={false}
      />,
    );
    expect(screen.getByText('Text-only devlog')).toBeInTheDocument();
    expect(screen.getByText('Just a summary.')).toBeInTheDocument();
    expect(container.querySelector('.eidotter-timeline-card-article__thumbstrip')).toBeNull();
  });
});
