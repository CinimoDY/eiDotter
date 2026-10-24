import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import './PageShell.css';

export interface PageSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Section heading, in the display face and accent colour, with no rule under
   * it. Omit for an untitled section.
   */
  title?: React.ReactNode;
  /** Heading level. Default `2` (sections directly under the page `<h1>`). */
  headingLevel?: 2 | 3 | 4;
  /**
   * Anchor id (TOC target). When set with a `title`, the heading gets
   * `${id}-heading` and the section is labelled by it, so it becomes a named
   * region.
   */
  id?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * PageSection: one block of a `PageShell` page (0.43). A `<section>` whose
 * heading and children stack with a 16px gap. No divider above or below.
 *
 * Server-safe. Ref forwards to the `<section>`.
 */
export const PageSection = forwardRef<HTMLElement, PageSectionProps>(({
  title,
  headingLevel = 2,
  id,
  children,
  className,
  ...rest
}, ref) => {
  const hasTitle = title != null && title !== false && title !== '';
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
  const headingId = hasTitle && id ? `${id}-heading` : undefined;

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={headingId}
      className={cn('eidotter-page-section', className)}
      {...rest}
    >
      {hasTitle && (
        <Heading id={headingId} className="eidotter-page-section__title">{title}</Heading>
      )}
      {children}
    </section>
  );
});

PageSection.displayName = 'PageSection';
