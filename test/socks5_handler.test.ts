import { describe, expect, it } from 'vitest';
import { socks5ReplyError } from '../src/index.js';
describe('SOCKS5 helpers', () => { it('maps errors', () => { expect(socks5ReplyError(0x05)).toContain('refused'); expect(socks5ReplyError(0x99)).toContain('unknown'); }); });
