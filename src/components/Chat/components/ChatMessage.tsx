import React from 'react';
import { cn } from '../../../utils/cn';
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

const roleClasses: Record<string, string> = {
  user: 'eidotter-chat-message--user',
  assistant: 'eidotter-chat-message--assistant',
  system: 'eidotter-chat-message--system',
};

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
  className,
  ...props
}) => {
  const prefix = role === 'user' ? userPrefix : role === 'assistant' ? assistantPrefix : '';

  return (
    <div
      className={cn(
        'flex gap-2 font-dos text-dos-base leading-[1.4] py-1 whitespace-pre-wrap break-words',
        roleClasses[role],
        isStreaming && 'eidotter-chat-message--streaming',
        className,
      )}
      {...props}
    >
      {prefix && (
        <span className="shrink-0 select-none" aria-hidden="true">{prefix}</span>
      )}
      <span className="min-w-0">{content}</span>
      {isStreaming && (
        <span className="eidotter-chat-message__cursor" aria-hidden="true">█</span>
      )}
    </div>
  );
};
