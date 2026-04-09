import React, { useRef, useEffect } from 'react';
import { cn } from '../../../utils/cn';
import './ChatHistory.css';
import { ChatMessage } from './ChatMessage';

/** Data shape for a single chat message */
export interface ChatMessageEntry {
  /** Unique message identifier */
  id: string;
  /** The sender role */
  role: 'user' | 'assistant' | 'system';
  /** Plain text content */
  content: string;
  /** When the message was created */
  createdAt?: Date | string | number;
}

export interface ChatHistoryProps {
  /** Array of messages to display */
  messages: ChatMessageEntry[];
  /** Whether the last assistant message is still streaming */
  isStreaming?: boolean;
  /** Prefix shown before user messages */
  userPrefix?: string;
  /** Prefix shown before assistant messages */
  assistantPrefix?: string;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Scrollable chat message history with auto-scroll and screen reader support.
 *
 * Uses `role="log"` for accessible announcement of new messages.
 * Follows the data-driven list pattern (TimelineList precedent).
 */
export const ChatHistory: React.FC<ChatHistoryProps & React.HTMLAttributes<HTMLDivElement>> = ({
  messages,
  isStreaming = false,
  userPrefix,
  assistantPrefix,
  className,
  ...props
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [messages.length, isStreaming]);

  const classes = cn(
    'flex-1 overflow-y-auto font-dos p-2 min-h-0',
    'eidotter-chat-history',
    className,
  );

  if (messages.length === 0) {
    return (
      <div className={classes} role="log" aria-live="polite" {...props}>
        <div className="flex items-center justify-center h-full min-h-16">
          <span className="text-cga-brown font-dos text-dos-text-md">Awaiting input...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={classes} role="log" aria-live="polite" {...props}>
      <div className="flex flex-col">
        {messages.map((msg, index) => {
          const isLastAssistant =
            isStreaming &&
            msg.role === 'assistant' &&
            index === messages.length - 1;

          return (
            <ChatMessage
              key={msg.id}
              role={msg.role}
              content={msg.content}
              isStreaming={isLastAssistant}
              userPrefix={userPrefix}
              assistantPrefix={assistantPrefix}
            />
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
