'use client';

import React from 'react';
import { cn } from '../../../utils/cn';
import { ChatHistory, ChatMessageEntry } from './ChatHistory';
import { ChatInput } from './ChatInput';

export interface ChatContainerProps {
  /** Array of messages to display */
  messages: ChatMessageEntry[];
  /** Called when the user sends a message */
  onSend: (message: string) => void;
  /** Whether the last assistant message is still streaming */
  isStreaming?: boolean;
  /** Prompt character for the input field */
  inputPrompt?: string;
  /** Prefix shown before user messages */
  userPrefix?: string;
  /** Prefix shown before assistant messages */
  assistantPrefix?: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Complete DOS-themed chat interface composing ChatHistory and ChatInput.
 *
 * Designed to be placed inside a Terminal component for the full DOS window
 * experience, but works standalone too.
 *
 * ```tsx
 * <Terminal title="ADOS Chat">
 *   <ChatContainer messages={messages} onSend={send} isStreaming={loading} />
 * </Terminal>
 * ```
 */
export const ChatContainer: React.FC<ChatContainerProps & React.HTMLAttributes<HTMLDivElement>> = ({
  messages,
  onSend,
  isStreaming = false,
  inputPrompt,
  userPrefix,
  assistantPrefix,
  placeholder,
  disabled = false,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col h-full min-h-0',
        className,
      )}
      {...props}
    >
      <ChatHistory
        className="flex-1 min-h-0"
        messages={messages}
        isStreaming={isStreaming}
        userPrefix={userPrefix}
        assistantPrefix={assistantPrefix}
      />
      <ChatInput
        className="shrink-0"
        onSend={onSend}
        prompt={inputPrompt}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};
