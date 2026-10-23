import { readFileSync } from 'fs';
import { join } from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { LogoGeometry } from './LogoGeometry';

/**
 * Reduce an SVG to its drawn shapes: root viewBox, ordered path d/fill/opacity plus gradient
 * stops. Ids differ between the static file and the useId-namespaced render, so each
 * `url(#id)` fill is rewritten to `url(#gradient[N])` where N is that gradient's index in
 * document order -- swapping two gradient fills therefore changes the signature.
 */
function signature(svg: string) {
  const norm = (s: string) => s.replace(/\s+/g, ' ');
  const attr = (tag: string, name: string) =>
    new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1] ?? null;
  const viewBox = attr(/<svg\b[^>]*>/.exec(svg)?.[0] ?? '', 'viewBox');
  const gradientTags = [...svg.matchAll(/<radialGradient\b([^>]*)>([\s\S]*?)<\/radialGradient>/g)];
  const gradientIds = gradientTags.map((m) => attr(m[1], 'id'));
  const paths = [...svg.matchAll(/<path\b[^>]*>/g)].map((m) => ({
    d: norm(attr(m[0], 'd') ?? ''),
    fill: (attr(m[0], 'fill') ?? '').replace(/url\(#([^)]*)\)/, (_all, id: string) => {
      const index = gradientIds.indexOf(id);
      if (index < 0) throw new Error(`fill references unknown gradient id "${id}"`);
      return `url(#gradient[${index}])`;
    }),
    opacity: attr(m[0], 'opacity'),
  }));
  const gradients = gradientTags.map((m) => ({
    transform: attr(m[1], 'gradientTransform'),
    stops: [...m[2].matchAll(/<stop\b[^>]*>/g)].map((s) => ({
      offset: attr(s[0], 'offset'),
      color: (attr(s[0], 'stop-color') ?? '').toUpperCase(),
      opacity: attr(s[0], 'stop-opacity'),
    })),
  }));
  return { viewBox, paths, gradients };
}

describe('public/favicon.svg', () => {
  it('matches LogoGeometry (viewBox, paths, fills incl. gradient index, opacities, gradient stops)', () => {
    const favicon = readFileSync(join(__dirname, '../../../../public/favicon.svg'), 'utf8');
    const rendered = renderToStaticMarkup(React.createElement(LogoGeometry, { title: '' }));
    const a = signature(favicon);
    const b = signature(rendered);
    expect(a.viewBox).toBe('8 7 22 22');
    expect(a.viewBox).toBe(b.viewBox);
    expect(a.paths.length).toBeGreaterThan(30);
    expect(a.paths.some((p) => p.fill.includes('gradient[2]'))).toBe(true);
    expect(a.gradients).toHaveLength(3);
    expect(a.paths).toEqual(b.paths);
    expect(a.gradients).toEqual(b.gradients);
  });
});
