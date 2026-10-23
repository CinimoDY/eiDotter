import { readFileSync } from 'fs';
import { join } from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { LogoGeometry } from './LogoGeometry';

/** Reduce an SVG to its drawn shapes: ordered path d/fill/opacity plus gradient stops, ids stripped. */
function signature(svg: string) {
  const norm = (s: string) => s.replace(/\s+/g, ' ');
  const attr = (tag: string, name: string) =>
    new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1] ?? null;
  const paths = [...svg.matchAll(/<path\b[^>]*>/g)].map((m) => ({
    d: norm(attr(m[0], 'd') ?? ''),
    // Gradient fills reference ids; compare only that it is a gradient fill.
    fill: (attr(m[0], 'fill') ?? '').replace(/url\(#[^)]*\)/, 'url(#)'),
    opacity: attr(m[0], 'opacity'),
  }));
  const gradients = [...svg.matchAll(/<radialGradient\b([^>]*)>([\s\S]*?)<\/radialGradient>/g)].map((m) => ({
    transform: attr(m[1], 'gradientTransform'),
    stops: [...m[2].matchAll(/<stop\b[^>]*>/g)].map((s) => ({
      offset: attr(s[0], 'offset'),
      color: (attr(s[0], 'stop-color') ?? '').toUpperCase(),
      opacity: attr(s[0], 'stop-opacity'),
    })),
  }));
  return { paths, gradients };
}

describe('public/favicon.svg', () => {
  it('matches LogoGeometry (paths, fills, opacities, gradient stops)', () => {
    const favicon = readFileSync(join(__dirname, '../../../../public/favicon.svg'), 'utf8');
    const rendered = renderToStaticMarkup(React.createElement(LogoGeometry, { title: '' }));
    const a = signature(favicon);
    const b = signature(rendered);
    expect(a.paths.length).toBeGreaterThan(30);
    expect(a.gradients).toHaveLength(3);
    expect(a.paths).toEqual(b.paths);
    expect(a.gradients).toEqual(b.gradients);
  });
});
