import React, { useState, useRef, useLayoutEffect } from 'react';
import { cn } from '../../../utils/cn';
import '../../../styles/keyframes.css';
import './ChatInput.css';

export interface ChatInputProps {
  /** Called when the user sends a message */
  onSend: (message: string) => void;
  /** Prompt character displayed before the input */
  prompt?: string;
  /** Placeholder text when input is empty */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
}

/**
 * DOS-styled multiline chat input with Enter-to-send and Shift+Enter for newlines.
 *
 * Auto-grows as the user types, up to a max height. Shows a blinking cursor
 * when not focused.
 */
export const ChatInput: React.FC<ChatInputProps & React.HTMLAttributes<HTMLDivElement>> = ({
  onSend,
  prompt = '>',
  placeholder,
  disabled = false,
  className,
  ...props
}) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed) {
        onSend(trimmed);
        setValue('');
      }
    }
  };

  const handleContainerClick = () => {
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div
      className={cn(
        'flex items-start font-dos text-dos-base p-2 cursor-text',
        'bg-dos-bg-primary text-cga-amber',
        'eidotter-chat-input',
        disabled && 'eidotter-chat-input--disabled',
        className,
      )}
      onClick={handleContainerClick}
      {...props}
    >
      <span className="text-cga-amber mr-2 mt-0.5 whitespace-nowrap select-none" aria-hidden="true">{prompt}</span>
      <div className="flex items-start flex-1 min-w-0">
        <textarea
          ref={textareaRef}
          className="eidotter-chat-input__textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          aria-label="Chat input"
        />
        <span className="eidotter-chat-input__cursor" aria-hidden="true">█</span>
      </div>
    </div>
  );
};
