'use client';

import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  /** URL/path for the breadcrumb link */
  href?: string;
  /** Display label for the breadcrumb */
  label: string;
  /** Click handler — when provided, renders as a button instead of a link */
  onClick?: () => void;
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items forming the trail */
  trail?: BreadcrumbItem[];
  /** Current page label (not a link) */
  currentLabel: string;
  /** Show back arrow on the last trail item */
  showBackArrow?: boolean;
  /** Custom separator character */
  separator?: string;
  /** Custom link component (e.g., Next.js Link) */
  linkComponent?: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }>;
  /** Additional CSS class name */
  className?: string;
}

const linkClasses = 'eidotter-breadcrumb__link inline-flex items-center gap-1 text-dos-text-accent opacity-70 no-underline';

/**
 * DOS-styled Breadcrumb navigation component.
 * Pure presentational — uses semantic HTML (nav > ol > li).
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  trail = [],
  currentLabel,
  showBackArrow = true,
  separator = '/',
  linkComponent: LinkComponent,
  className,
}) => {
  const renderLink = (item: BreadcrumbItem, isBackTarget: boolean) => {
    const linkContent = (
      <>
        {showBackArrow && isBackTarget && (
          <span className="text-[1em] leading-none" aria-hidden="true">
            &lt;
          </span>
        )}
        <span>{item.label}</span>
      </>
    );

    if (item.onClick) {
      return (
        <AriaButton
          className={cn(linkClasses, 'bg-transparent border-0 cursor-pointer font-[inherit] p-0')}
          onPress={item.onClick}
        >
          {linkContent}
        </AriaButton>
      );
    }

    if (item.href) {
      if (LinkComponent) {
        return (
          <LinkComponent href={item.href} className={linkClasses}>
            {linkContent}
          </LinkComponent>
        );
      }

      return (
        <a href={item.href} className={linkClasses}>
          {linkContent}
        </a>
      );
    }

    return <span className={linkClasses}>{linkContent}</span>;
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'font-dos text-xs uppercase tracking-[0.35em]',
        'eidotter-breadcrumb',
        className,
      )}
    >
      <ol className="flex flex-wrap items-center gap-2 list-none m-0 p-0">
        {trail.map((item, index) => {
          const isBackTarget = index === trail.length - 1;
          const showSep = index < trail.length - 1;

          return (
            <li key={`${item.href ?? item.label}-${index}`} className="flex items-center gap-2">
              {renderLink(item, isBackTarget)}
              {showSep && (
                <span className="text-dos-text-accent opacity-40 select-none" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
        {trail.length > 0 && (
          <li className="flex items-center gap-2">
            <span className="text-dos-text-accent opacity-40 select-none" aria-hidden="true">
              {separator}
            </span>
          </li>
        )}
        <li className="flex items-center gap-2" aria-current="page">
          <span className="text-dos-text-brand">{currentLabel}</span>
        </li>
      </ol>
    </nav>
  );
};
