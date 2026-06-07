import { describe, expect, it } from 'vitest';
import { socks4ReplyError } from '../src/index.js';
describe('SOCKS4 helpers', () => { it('maps errors', () => { expect(socks4ReplyError(0x5a)).toContain('granted'); expect(socks4ReplyError(0x99)).toContain('unknown'); }); });
