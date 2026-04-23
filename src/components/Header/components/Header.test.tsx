import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

describe('Header', () => {
  const items = [
    { label: 'OVERVIEW', href: '/' },
    { label: 'FILES',    href: '/files' },
    { label: 'HELP',     href: '/help' },
  ];

  it('renders the brand name with default icon', () => {
    render(<Header brandName="eiDotter" />);
    expect(screen.getByLabelText('eiDotter')).toBeInTheDocument();
    expect(screen.getByText('eiDotter')).toBeInTheDocument();
    // Default diamond lozenge
    expect(screen.getByText('❖')).toBeInTheDocument();
  });

  it('renders nav items when provided', () => {
    render(<Header brandName="eiDotter" items={items} />);
    // Nav renders both desktop and mobile lists, so labels appear twice
    expect(screen.getAllByText('OVERVIEW').length).toBeGreaterThan(0);
    expect(screen.getAllByText('FILES').length).toBeGreaterThan(0);
    expect(screen.getAllByText('HELP').length).toBeGreaterThan(0);
  });

  it('passes activeHref to the inner nav', () => {
    render(<Header brandName="eiDotter" items={items} activeHref="/files" />);
    const activeLinks = screen.getAllByText('FILES').map(node => node.closest('a'));
    expect(activeLinks.some(el => el?.className.includes('eidotter-nav__link--active'))).toBe(true);
  });

  it('uses custom brand icon when provided', () => {
    render(<Header brandName="eiDotter" brandIcon={<span data-testid="custom-icon">*</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders user label + clock when user is a string', () => {
    render(<Header brandName="eiDotter" user="OP" />);
    expect(screen.getByText('USER: OP')).toBeInTheDocument();
    // Clock rendered as <time>
    const time = document.querySelector('time');
    expect(time).not.toBeNull();
    expect(time?.textContent).toMatch(/^\d{2}:\d{2}$/);
  });

  it('renders ReactNode user content directly', () => {
    render(
      <Header brandName="eiDotter" user={<span data-testid="avatar">AV</span>} />,
    );
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.queryByText(/USER:/)).toBeNull();
  });

  it('children override the user slot', () => {
    render(
      <Header brandName="eiDotter" user="OP">
        <button data-testid="override">Menu</button>
      </Header>,
    );
    expect(screen.getByTestId('override')).toBeInTheDocument();
    expect(screen.queryByText('USER: OP')).toBeNull();
  });

  it('applies sticky class by default', () => {
    const { container } = render(<Header brandName="eiDotter" />);
    expect(container.firstChild).toHaveClass('eidotter-header--sticky');
  });

  it('drops sticky class when sticky={false}', () => {
    const { container } = render(<Header brandName="eiDotter" sticky={false} />);
    expect(container.firstChild).not.toHaveClass('eidotter-header--sticky');
  });

  it('applies the modern variant class', () => {
    const { container } = render(<Header brandName="eiDotter" variant="modern" />);
    expect(container.firstChild).toHaveClass('eidotter-header--modern');
    expect(container.firstChild).not.toHaveClass('eidotter-header--retro');
  });

  it('merges custom className onto the header root', () => {
    const { container } = render(<Header brandName="eiDotter" className="my-header" />);
    expect(container.firstChild).toHaveClass('my-header');
  });

  it('forwards ref to the underlying header element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Header brandName="eiDotter" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('HEADER');
  });

  describe('Keyboard navigation', () => {
    it('brand link is reachable by keyboard and focusable', async () => {
      const user = userEvent.setup();
      render(<Header brandName="eiDotter" items={items} />);
      await user.tab();
      // Focus lands on first focusable element — the brand link
      const brand = screen.getByLabelText('eiDotter');
      expect(brand).toHaveFocus();
    });
  });
});
