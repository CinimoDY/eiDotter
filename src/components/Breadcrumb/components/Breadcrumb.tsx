import React from 'react';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  /**
   * URL/path for the breadcrumb link
   */
  href?: string;
  /**
   * Display label for the breadcrumb
   */
  label: string;
  /**
   * Click handler — when provided, renders as a button instead of a link
   */
  onClick?: () => void;
}

export interface BreadcrumbProps {
  /**
   * Array of breadcrumb items forming the trail
   */
  trail?: BreadcrumbItem[];
  /**
   * Current page label (not a link)
   */
  currentLabel: string;
  /**
   * Show back arrow on the last trail item
   */
  showBackArrow?: boolean;
  /**
   * Custom separator character
   */
  separator?: string;
  /**
   * Custom link component (e.g., Next.js Link)
   * If not provided, uses regular anchor tags
   */
  linkComponent?: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }>;
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * DOS-styled Breadcrumb navigation component
 *
 * Features:
 * - Configurable trail items
 * - Optional back arrow on last trail item
 * - Custom separator support
 * - Framework-agnostic (works with any router)
 * - WCAG 2.1 AA compliant
 * - DOS-authentic styling with CGA colors
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  trail = [],
  currentLabel,
  showBackArrow = true,
  separator = '/',
  linkComponent: LinkComponent,
  className = '',
}) => {
  const breadcrumbClasses = [
    'breadcrumb',
    className
  ].filter(Boolean).join(' ');

  const renderLink = (item: BreadcrumbItem, isBackTarget: boolean) => {
    const linkContent = (
      <>
        {showBackArrow && isBackTarget && (
          <span className="breadcrumb__back-arrow" aria-hidden="true">
            &lt;
          </span>
        )}
        <span>{item.label}</span>
      </>
    );

    if (item.onClick) {
      return (
        <button type="button" className="breadcrumb__link" onClick={item.onClick}>
          {linkContent}
        </button>
      );
    }

    if (item.href) {
      if (LinkComponent) {
        return (
          <LinkComponent href={item.href} className="breadcrumb__link">
            {linkContent}
          </LinkComponent>
        );
      }

      return (
        <a href={item.href} className="breadcrumb__link">
          {linkContent}
        </a>
      );
    }

    // Neither onClick nor href — render as non-interactive text
    return <span className="breadcrumb__link">{linkContent}</span>;
  };

  return (
    <nav aria-label="Breadcrumb" className={breadcrumbClasses}>
      <ol className="breadcrumb__list">
        {trail.map((item, index) => {
          const isBackTarget = index === trail.length - 1;
          const showSeparator = index < trail.length - 1;

          return (
            <li key={`${item.href ?? item.label}-${index}`} className="breadcrumb__item">
              {renderLink(item, isBackTarget)}
              {showSeparator && (
                <span className="breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
        {trail.length > 0 && (
          <li className="breadcrumb__item">
            <span className="breadcrumb__separator" aria-hidden="true">
              {separator}
            </span>
          </li>
        )}
        <li className="breadcrumb__item breadcrumb__item--current" aria-current="page">
          <span className="breadcrumb__current">{currentLabel}</span>
        </li>
      </ol>
    </nav>
  );
};
