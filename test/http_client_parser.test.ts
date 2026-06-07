import { describe, expect, it } from 'vitest';
import { parseHeaders, parseStatusLine, readChunkedBody } from '../src/index.js';
describe('HTTP parser helpers', () => {
  it('parses status line and headers', () => { expect(parseStatusLine('HTTP/1.1 200 OK')).toEqual({ version: '1.1', statusCode: 200, reasonPhrase: 'OK' }); const h = parseHeaders(['Content-Length: 5', 'X-A: one', 'X-A: two']); expect(h.get('x-a')).toEqual(['one', 'two']); });
  it('decodes chunked bodies', async () => { let data = Buffer.from('4\r\nWiki\r\n5\r\npedia\r\n0\r\n\r\n'); const conn = { async readUntil(delim: Buffer) { const i = data.indexOf(delim); const out = data.subarray(0, i + delim.length); data = data.subarray(i + delim.length); return { data: out, leftover: Buffer.alloc(0) }; }, async readExact(n: number) { const out = data.subarray(0, n); data = data.subarray(n); return out; } }; await expect(readChunkedBody(conn as any, 100)).resolves.toEqual(Buffer.from('Wikipedia')); });
});
