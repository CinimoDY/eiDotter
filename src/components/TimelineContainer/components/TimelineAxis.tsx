import React from 'react';
import './TimelineAxis.css';

export interface TimelineAxisProps {
  children: React.ReactNode;
}

/**
 * Vertical spine connecting timeline nodes.
 * Wraps content with a continuous vertical line on the left side.
 */
export const TimelineAxis: React.FC<TimelineAxisProps> = ({ children }) => {
  return (
    <div className="timeline-axis">
      <div className="timeline-axis__line" aria-hidden="true" />
      <div className="timeline-axis__content">
        {children}
      </div>
    </div>
  );
};
