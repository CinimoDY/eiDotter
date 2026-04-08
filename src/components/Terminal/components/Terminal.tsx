import React, { useState, useRef, useEffect } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import '../../../styles/keyframes.css';
import './Terminal.css';
import { Icon } from '../../Icon/components/Icon';

export interface TerminalProps {
  /** Size variant. Use sm/md/lg — small/medium/large are @deprecated aliases. */
  size?: 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';
  /**
   * The title displayed in the terminal title bar
   */
  title?: string;
  /**
   * The initial state of the terminal window
   */
  state?: 'active' | 'inactive' | 'minimized';
  /**
   * Whether the terminal window can be resized
   */
  resizable?: boolean;
  /**
   * Whether the terminal window can be minimized
   * @default false
   */
  minimizable?: boolean;
  /**
   * Whether the terminal window can be maximized
   * @default false
   */
  maximizable?: boolean;
  /**
   * Whether the terminal window can be closed
   * @default false
   */
  closeable?: boolean;
  /**
   * The content to display inside the terminal
   */
  children?: React.ReactNode;
  /**
   * Callback when the terminal is minimized
   */
  onMinimize?: () => void;
  /**
   * Callback when the terminal is maximized
   */
  onMaximize?: () => void;
  /**
   * Callback when the terminal is closed
   */
  onClose?: () => void;
  /**
   * Callback when the terminal gains focus
   */
  onFocus?: () => void;
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * Whether the terminal should auto-focus on mount
   */
  autoFocus?: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({
  size = 'md',
  title = 'MS-DOS Terminal',
  state = 'active',
  resizable = true,
  minimizable = false,
  maximizable = false,
  closeable = false,
  children,
  onMinimize,
  onMaximize,
  onClose,
  onFocus,
  className = '',
  autoFocus = false,
}) => {
  const sizeMap: Partial<Record<string, string>> = { sm: 'small', md: 'medium', lg: 'large' };
  const normalizedSize = sizeMap[size] ?? size;
  const [windowState, setWindowState] = useState(state);
  const [isMaximized, setIsMaximized] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && terminalRef.current) {
      terminalRef.current.focus();
    }
  }, [autoFocus]);

  const handleMinimize = () => {
    setWindowState('minimized');
    onMinimize?.();
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    onMaximize?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  const handleFocus = () => {
    setWindowState('active');
    onFocus?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Handle Alt+F4 for closing (DOS convention)
    if (event.altKey && event.key === 'F4' && closeable) {
      event.preventDefault();
      handleClose();
    }
  };

  if (windowState === 'minimized') {
    return (
      <div 
        className={`terminal terminal--minimized ${className}`.trim()}
        onClick={handleFocus}
        role="button"
        tabIndex={0}
        aria-label={`Restore ${title} window`}
        onKeyDown={(e) => e.key === 'Enter' && handleFocus()}
      >
        <div className="terminal__taskbar-item">
          <Icon name="App" size="S" />
          <span className="terminal__taskbar-title">{title}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={terminalRef}
      className={`terminal terminal--${normalizedSize} terminal--${windowState} ${isMaximized ? 'terminal--maximized' : ''} ${className}`.trim()}
      tabIndex={0}
      role="dialog"
      aria-label={`${title} terminal window`}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
    >
      <div className="terminal__title-bar">
        <div className="terminal__title">
          <Icon name="App" size="S" aria-hidden="true" />
          <span className="terminal__title-text">{title}</span>
        </div>
        {(minimizable || maximizable || closeable) && (
          <div className="terminal__controls">
            {minimizable && (
              <AriaButton
                className="terminal__control terminal__control--minimize"
                onPress={handleMinimize}
                aria-label="Minimize window"
              >
                <Icon name="Cancel" size="S" />
              </AriaButton>
            )}
            {maximizable && (
              <AriaButton
                className="terminal__control terminal__control--maximize"
                onPress={handleMaximize}
                aria-label={isMaximized ? "Restore window" : "Maximize window"}
              >
                <Icon name={isMaximized ? "Fullscreen" : "Add"} size="S" />
              </AriaButton>
            )}
            {closeable && (
              <AriaButton
                className="terminal__control terminal__control--close"
                onPress={handleClose}
                aria-label="Close window"
              >
                <Icon name="Close" size="S" />
              </AriaButton>
            )}
          </div>
        )}
      </div>
      <div className="terminal__content" role="main">
        {children || (
          <div className="terminal__default-content">
            <div className="terminal__prompt">
              <span className="terminal__path">C:\\&gt;</span>
              <span className="terminal__cursor">█</span>
            </div>
          </div>
        )}
      </div>
      {resizable && (
        <div className="terminal__resize-handle" aria-hidden="true" />
      )}
    </div>
  );
}; 