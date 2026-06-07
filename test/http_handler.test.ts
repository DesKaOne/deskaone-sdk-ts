import { describe, expect, it } from 'vitest';
import { findHeader, parseStatusCode, sanitizeHeaderForError } from '../src/index.js';
describe('HTTP proxy helpers', () => {
  const headers = Buffer.from('HTTP/1.1 407 Proxy Authentication Required\r\nProxy-Authorization: Basic secret\r\nX-Test: ok\r\n\r\n');
  it('parses status and headers', () => { expect(parseStatusCode(headers)).toBe(407); expect(findHeader(headers, 'x-test')).toBe('ok'); });
  it('sanitizes sensitive headers', () => { expect(sanitizeHeaderForError(headers)).not.toContain('secret'); expect(sanitizeHeaderForError(headers)).toContain('X-Test'); });
});
