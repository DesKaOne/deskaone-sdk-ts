import { describe, expect, it } from 'vitest';
import { computeWebSocketAccept } from '../src/index.js';
describe('WebSocket accept', () => { it('matches RFC example', () => { expect(computeWebSocketAccept('dGhlIHNhbXBsZSBub25jZQ==')).toBe('s3pPLMBiTxaQ9kYGzzhZRbK+xOo='); }); });
