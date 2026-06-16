import React, { useState, useRef, useEffect } from 'react';
import '../../../styles/keyframes.css';
import './CommandPrompt.css';

export interface CommandPromptProps {
  /**
   * The prompt string displayed before cursor
   * @default "C:\>"
   */
  prompt?: string;
  /**
   * Called when user presses Enter with command text
   */
  onCommand: (command: string) => void;
  /**
   * Auto-focus the input on mount
   */
  autoFocus?: boolean;
  /**
   * Optional class name
   */
  className?: string;
  /**
   * Placeholder text when input is empty
   */
  placeholder?: string;
  /**
   * Whether the command prompt is disabled
   */
  disabled?: boolean;
}

/**
 * DOS-styled CommandPrompt component with authentic terminal aesthetics
 *
 * Features:
 * - Configurable prompt string (e.g., "C:\>", "$")
 * - Enter key triggers onCommand callback
 * - Blinking cursor for DOS feel
 * - Auto-focus support
 * - WCAG 2.1 AA compliant
 */
export const CommandPrompt: React.FC<CommandPromptProps> = ({
  prompt = 'C:\\>',
  onCommand,
  autoFocus = false,
  className = '',
  placeholder,
  disabled = false,
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() && !disabled) {
      onCommand(value.trim());
      setValue('');
    }
  };

  const handleContainerClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={`command-prompt ${disabled ? 'command-prompt--disabled' : ''} ${className}`.trim()}
      onClick={handleContainerClick}
    >
      <span className="command-prompt__prompt" aria-hidden="true">{prompt}</span>
      <div className="command-prompt__input-wrapper">
        <input
          ref={inputRef}
          className="command-prompt__input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          placeholder={placeholder}
          disabled={disabled}
          aria-label="Command input"
          size={value.length || 1}
        />
        <span className="command-prompt__cursor" aria-hidden="true">█</span>
      </div>
    </div>
  );
};
