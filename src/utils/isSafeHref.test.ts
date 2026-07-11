import { isSafeHref } from './isSafeHref';

describe('isSafeHref', () => {
  describe('relative URLs (no scheme) are safe', () => {
    it('allows absolute-path routes', () => {
      expect(isSafeHref('/path')).toBe(true);
    });

    it('allows hash fragments', () => {
      expect(isSafeHref('#hash')).toBe(true);
    });

    it('allows query strings', () => {
      expect(isSafeHref('?query')).toBe(true);
    });

    it('allows relative ./ paths', () => {
      expect(isSafeHref('./rel')).toBe(true);
    });

    it('allows bare filenames (no scheme, the dot is not a scheme separator)', () => {
      expect(isSafeHref('page.html')).toBe(true);
    });
  });

  describe('allowed schemes', () => {
    it('allows http URLs', () => {
      expect(isSafeHref('http://example.com')).toBe(true);
    });

    it('allows https URLs', () => {
      expect(isSafeHref('https://example.com')).toBe(true);
    });

    it('allows mailto URLs', () => {
      expect(isSafeHref('mailto:user@example.com')).toBe(true);
    });
  });

  describe('blocked schemes', () => {
    it('blocks javascript:', () => {
      expect(isSafeHref('javascript:alert(1)')).toBe(false);
    });

    it('blocks data:', () => {
      expect(isSafeHref('data:text/html,<script>alert(1)</script>')).toBe(false);
    });

    it('blocks vbscript:', () => {
      expect(isSafeHref('vbscript:MsgBox("XSS")')).toBe(false);
    });

    it('blocks blob:', () => {
      expect(isSafeHref('blob:https://example.com/uuid')).toBe(false);
    });

    it('blocks file:', () => {
      expect(isSafeHref('file:///etc/passwd')).toBe(false);
    });
  });

  describe('case-insensitivity and whitespace', () => {
    it('blocks uppercase JAVASCRIPT:', () => {
      expect(isSafeHref('JAVASCRIPT:alert(1)')).toBe(false);
    });

    it('blocks javascript: wrapped in leading/trailing whitespace', () => {
      expect(isSafeHref('  \tjavascript:alert(1)\n  ')).toBe(false);
    });
  });

  describe('empty input', () => {
    it('rejects the empty string', () => {
      expect(isSafeHref('')).toBe(false);
    });

    it('rejects a whitespace-only string', () => {
      expect(isSafeHref('   \t\n')).toBe(false);
    });
  });

  describe('extraSchemes option', () => {
    it('blocks tel: by default', () => {
      expect(isSafeHref('tel:+491234')).toBe(false);
    });

    it('allows tel: when passed via extraSchemes', () => {
      expect(isSafeHref('tel:+491234', { extraSchemes: ['tel'] })).toBe(true);
    });

    it('matches extraSchemes case-insensitively', () => {
      expect(isSafeHref('TEL:+491234', { extraSchemes: ['tel'] })).toBe(true);
    });

    it('still blocks schemes not in the extra list', () => {
      expect(isSafeHref('javascript:alert(1)', { extraSchemes: ['tel', 'sms', 'ftp'] })).toBe(
        false,
      );
    });

    it('reproduces the InlineLink allowlist (tel/ftp/sms)', () => {
      const opts = { extraSchemes: ['tel', 'ftp', 'sms'] };
      expect(isSafeHref('tel:+491234', opts)).toBe(true);
      expect(isSafeHref('ftp://host/file', opts)).toBe(true);
      expect(isSafeHref('sms:+491234', opts)).toBe(true);
      expect(isSafeHref('data:text/html,x', opts)).toBe(false);
    });
  });
});
