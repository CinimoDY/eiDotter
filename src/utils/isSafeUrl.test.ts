import { isSafeUrl } from './isSafeUrl';

describe('isSafeUrl', () => {
  describe('allowed protocols', () => {
    it('allows http URLs', () => {
      expect(isSafeUrl('http://example.com')).toBe(true);
    });

    it('allows https URLs', () => {
      expect(isSafeUrl('https://example.com')).toBe(true);
    });

    it('allows mailto URLs', () => {
      expect(isSafeUrl('mailto:user@example.com')).toBe(true);
    });
  });

  describe('blocked protocols', () => {
    it('blocks javascript: URLs', () => {
      expect(isSafeUrl('javascript:alert(1)')).toBe(false);
    });

    it('blocks data: URLs', () => {
      expect(isSafeUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
    });

    it('blocks vbscript: URLs', () => {
      expect(isSafeUrl('vbscript:MsgBox("XSS")')).toBe(false);
    });

    it('blocks blob: URLs', () => {
      expect(isSafeUrl('blob:https://example.com/uuid')).toBe(false);
    });
  });

  describe('case sensitivity', () => {
    it('blocks uppercase JAVASCRIPT:', () => {
      expect(isSafeUrl('JAVASCRIPT:alert(1)')).toBe(false);
    });

    it('blocks mixed case JavaScript:', () => {
      expect(isSafeUrl('JavaScript:alert(1)')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('returns false for undefined', () => {
      expect(isSafeUrl(undefined)).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(isSafeUrl('')).toBe(false);
    });

    it('returns false for malformed URLs', () => {
      expect(isSafeUrl('not-a-url')).toBe(false);
    });

    it('returns false for whitespace-padded javascript:', () => {
      expect(isSafeUrl('  javascript:alert(1)  ')).toBe(false);
    });

    it('handles URLs with credentials', () => {
      expect(isSafeUrl('https://admin:password@evil.com')).toBe(true);
    });
  });
});
