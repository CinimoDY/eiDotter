import React from 'react';
import '../../../styles/keyframes.css';
import './ChatMessage.css';

export interface ChatMessageProps {
  /** The role of the message sender */
  role: 'user' | 'assistant' | 'system';
  /** The text content of the message */
  content: string;
  /** Whether this message is currently being streamed */
  isStreaming?: boolean;
  /** Prefix shown before user messages */
  userPrefix?: string;
  /** Prefix shown before assistant messages */
  assistantPrefix?: string;
  /** Additional CSS class name */
  className?: string;
}

/**
 * A single chat message rendered in DOS terminal style.
 *
 * User messages display with a `>` prefix, assistant messages with `C:\>`,
 * and system messages appear dimmed. When `isStreaming` is true, a blinking
 * block cursor appears after the content.
 */
export const ChatMessage: React.FC<ChatMessageProps & React.HTMLAttributes<HTMLDivElement>> = ({
  role,
  content,
  isStreaming = false,
  userPrefix = '>',
  assistantPrefix = 'C:\\>',
  className = '',
  ...props
}) => {
  const prefix = role === 'user' ? userPrefix : role === 'assistant' ? assistantPrefix : '';

  const classes = [
    'chat-message',
    `chat-message--${role}`,
    isStreaming && 'chat-message--streaming',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {prefix && (
        <span className="chat-message__prefix" aria-hidden="true">{prefix}</span>
      )}
      <span className="chat-message__content">{content}</span>
      {isStreaming && (
        <span className="chat-message__cursor" aria-hidden="true">█</span>
      )}
    </div>
  );
};
