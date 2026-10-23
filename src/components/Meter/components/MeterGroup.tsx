import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { EmptyState } from '../../EmptyState';
import { resolveLabels } from '../../../utils/health';
import type { HealthLabels } from '../../../utils/health';
import { Meter } from './Meter';
import type { MeterProps } from './Meter';
import './Meter.css';

export interface MeterGroupProps {
  /** Row wraps under the medium container width; grid uses `columns`. */
  layout?: 'row' | 'grid';
  /** Fixed column count for `layout="grid"`. Omit to auto-fit. */
  columns?: number;
  /** Scale every bar to the largest `max` in `items`. */
  sharedMax?: boolean;
  /** Meters to render. Takes precedence over `children`. */
  items?: MeterProps[];
  /** Meter elements, used when `items` is not given. */
  children?: React.ReactNode;
  /** Overrides for built-in text (the empty state uses `unknown`). */
  labels?: Partial<HealthLabels>;
  /** Additional CSS class name. */
  className?: string;
  /** Accessible name for the group. */
  'aria-label'?: string;
}

const layoutClasses: Record<string, string> = {
  row: 'eidotter-meter-group--row',
  grid: 'eidotter-meter-group--grid',
};

/**
 * Lays Meters out as a row or grid, optionally on one shared scale.
 * Renders EmptyState when there is nothing to show. Hook-free.
 */
export const MeterGroup = forwardRef<HTMLDivElement, MeterGroupProps>(
  (
    {
      layout = 'row',
      columns,
      sharedMax = false,
      items,
      children,
      labels: labelOverrides,
      className,
      ...props
    },
    ref,
  ) => {
    const hasChildren = React.Children.count(children) > 0;
    if ((!items || items.length === 0) && !hasChildren) {
      return <EmptyState title={resolveLabels(labelOverrides).unknown} className={className} />;
    }

    const scale = sharedMax && items ? Math.max(...items.map((i) => i.max ?? 100)) : undefined;
    const fixedColumns = layout === 'grid' && columns !== undefined;

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'eidotter-meter-group',
          layoutClasses[layout] ?? layoutClasses.row,
          fixedColumns && 'eidotter-meter-group--columns',
          className,
        )}
        style={
          fixedColumns
            ? ({ '--eidotter-meter-columns': String(columns) } as React.CSSProperties)
            : undefined
        }
        {...props}
      >
        {/* The outer div is the size container; the layout is on this inner
            div so the narrow-group container query can reach it. */}
        <div className="eidotter-meter-group__layout">
          {items
            ? items.map((item, i) => (
                <Meter key={`${item.label}-${i}`} {...item} {...(scale !== undefined && { max: scale })} />
              ))
            : children}
        </div>
      </div>
    );
  },
);

MeterGroup.displayName = 'MeterGroup';
