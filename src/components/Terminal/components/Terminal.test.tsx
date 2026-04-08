import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Terminal } from './Terminal';
import '@testing-library/jest-dom';

// Mock the Icon component
jest.mock('../../Icon/components/Icon', () => ({
    Icon: ({ name }: { name: string }) => <div data-testid={`icon-${name}`} />
}));


describe('Terminal', () => {
  it('renders with default props', () => {
    render(<Terminal />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('MS-DOS Terminal')).toBeInTheDocument();
    expect(screen.getByText('C:\\', { exact: false })).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<Terminal title="Custom Terminal" />);
    
    expect(screen.getByText('Custom Terminal')).toBeInTheDocument();
  });

  it('handles minimize action', async () => {
    const onMinimize = jest.fn();
    render(<Terminal minimizable onMinimize={onMinimize} />);

    const minimizeButton = screen.getByLabelText('Minimize window');
    await userEvent.click(minimizeButton);

    expect(onMinimize).toHaveBeenCalledTimes(1);
  });

  it('handles maximize action', async () => {
    const onMaximize = jest.fn();
    render(<Terminal maximizable onMaximize={onMaximize} />);

    const maximizeButton = screen.getByLabelText('Maximize window');
    await userEvent.click(maximizeButton);

    expect(onMaximize).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText('Restore window')).toBeInTheDocument();
  });

  it('handles close action', async () => {
    const onClose = jest.fn();
    render(<Terminal closeable onClose={onClose} />);

    const closeButton = screen.getByLabelText('Close window');
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('handles Alt+F4 keyboard shortcut', async () => {
    const onClose = jest.fn();
    render(<Terminal closeable onClose={onClose} />);

    const terminal = screen.getByRole('dialog');
    terminal.focus();

    await userEvent.keyboard('{Alt>}{F4}{/Alt}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('hides controls by default', () => {
    render(<Terminal />);

    expect(screen.queryByLabelText('Minimize window')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Maximize window|Restore window/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Close window')).not.toBeInTheDocument();
    expect(document.querySelector('.terminal__controls')).not.toBeInTheDocument();
  });

  it('renders minimized state correctly', () => {
    render(<Terminal state="minimized" title="Test Terminal" />);
    
    expect(screen.getByLabelText('Restore Test Terminal window')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Terminal size="small" />);
    expect(screen.getByRole('dialog')).toHaveClass('terminal--small');

    rerender(<Terminal size="large" />);
    expect(screen.getByRole('dialog')).toHaveClass('terminal--large');
  });

  it('supports sm size alias', () => {
    render(<Terminal title="Test" size="sm">content</Terminal>);
    const terminal = document.querySelector('.terminal');
    expect(terminal).toHaveClass('terminal--small');
  });

  it('supports md size alias', () => {
    render(<Terminal title="Test" size="md">content</Terminal>);
    const terminal = document.querySelector('.terminal');
    expect(terminal).toHaveClass('terminal--medium');
  });

  it('supports lg size alias', () => {
    render(<Terminal title="Test" size="lg">content</Terminal>);
    const terminal = document.querySelector('.terminal');
    expect(terminal).toHaveClass('terminal--large');
  });

  it('handles custom children content', () => {
    const customContent = <div data-testid="custom-content">Custom terminal content</div>;
    render(<Terminal>{customContent}</Terminal>);
    
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(screen.queryByText('C:\\', { exact: false })).not.toBeInTheDocument();
  });

  it('disables controls when props are false', () => {
    render(
      <Terminal
        minimizable={false}
        maximizable={false}
        closeable={false}
      />
    );

    expect(screen.queryByLabelText('Minimize window')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Maximize window|Restore window/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Close window')).not.toBeInTheDocument();
  });

  it('hides controls container when all control props are false', () => {
    render(
      <Terminal
        minimizable={false}
        maximizable={false}
        closeable={false}
      />
    );

    const controlsContainer = document.querySelector('.terminal__controls');
    expect(controlsContainer).not.toBeInTheDocument();
  });

  it('auto-focuses when autoFocus is true', () => {
    render(<Terminal autoFocus />);
    
    const terminal = screen.getByRole('dialog');
    expect(terminal).toHaveFocus();
  });

  it('handles focus events and changes state', async () => {
    const onFocus = jest.fn();
    render(<Terminal state="inactive" onFocus={onFocus} />);
    
    const terminal = screen.getByRole('dialog');
    expect(terminal).toHaveClass('terminal--inactive');

    await userEvent.click(terminal);
    
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(terminal).toHaveClass('terminal--active');
  });
}); 