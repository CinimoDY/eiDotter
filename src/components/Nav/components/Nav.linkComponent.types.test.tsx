/** @jest-environment node */
// Type-level contract for `linkComponent` (DMNC-1612). ts-jest type-checks this
// file, so an assignment that stops compiling fails the suite. The Link-like
// signature mirrors next/link's shape: a forwardRef exotic component whose
// `href` is wider than eidotter's (`string | UrlObject`), with anchor
// attributes and a mouse-event `onClick`, plus a `propTypes` map typed for the
// wide href (the member @types/react 18 compares, and rejected).
import React from 'react';
import type { NavProps, NavLinkComponent, NavLinkProps } from '../../../index';
import type { HeaderProps } from '../../../index';

interface UrlObject {
  pathname?: string | null;
  query?: string | null | Record<string, unknown>;
  hash?: string | null;
}
type Url = string | UrlObject;

// Stand-in for @types/react 18's nominal `Validator<T>`: a validator for `Url`
// is not assignable to one for `string`.
declare const nominal: unique symbol;
interface ValidatorLike<T> {
  (props: Record<string, unknown>, propName: string): Error | null;
  [nominal]?: { type: T };
}

type InternalLinkProps = {
  href: Url;
  as?: Url;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean | 'auto' | null;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};
type LinkLikeProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof InternalLinkProps> &
  InternalLinkProps & { children?: React.ReactNode } & React.RefAttributes<HTMLAnchorElement>;
type LinkLike = React.ForwardRefExoticComponent<LinkLikeProps> & {
  propTypes?: { href?: ValidatorLike<Url> };
};

const LinkLikeImpl = React.forwardRef<HTMLAnchorElement, LinkLikeProps>(function LinkLike(
  { href, children, ...rest },
  ref,
) {
  return (
    <a ref={ref} href={typeof href === 'string' ? href : href.pathname ?? '#'} {...rest}>
      {children}
    </a>
  );
});
const Link = LinkLikeImpl as LinkLike;

const Memoised = React.memo(function MemoLink(props: NavLinkProps) {
  return <a {...props} />;
});

class ClassLink extends React.Component<NavLinkProps> {
  render() {
    return <a {...this.props} />;
  }
}

describe('NavProps.linkComponent accepts router links without a wrapper', () => {
  it('accepts a next/link-shaped forwardRef component (wide href, propTypes typed for it)', () => {
    const nav: NavProps['linkComponent'] = Link;
    const header: HeaderProps['linkComponent'] = Link;
    const direct: NavLinkComponent = Link;
    expect([nav, header, direct].every((c) => c === Link)).toBe(true);
  });

  it('accepts function, memo and class components that take NavLinkProps', () => {
    const fn: NavLinkComponent = (props: NavLinkProps) => <a {...props} />;
    const fnNarrow: NavLinkComponent = ({ href, children }: { href: string; children: React.ReactNode }) => (
      <a href={href}>{children}</a>
    );
    const memo: NavLinkComponent = Memoised;
    const cls: NavLinkComponent = ClassLink;
    expect([fn, fnNarrow, memo, cls]).toHaveLength(4);
  });

  it('still rejects components that cannot take a string href', () => {
    // @ts-expect-error href must accept a string
    const numeric: NavLinkComponent = (props: { href: number; children: React.ReactNode }) => <a>{props.children}</a>;
    // @ts-expect-error a required prop eidotter never passes
    const needsTo: NavLinkComponent = (props: NavLinkProps & { to: string }) => <a href={props.to}>{props.children}</a>;
    expect([numeric, needsTo]).toHaveLength(2);
  });
});
