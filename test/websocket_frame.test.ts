import { describe, expect, it } from 'vitest';
import { decodeClosePayload, decodeWebSocketFrame, encodeClosePayload, encodeWebSocketFrame, WebSocketOpcode } from '../src/index.js';
describe('WebSocket frames', () => {
  it('encodes masked client frames', () => { const frame = encodeWebSocketFrame(WebSocketOpcode.text, 'hi', true); expect((frame[1]! & 0x80) !== 0).toBe(true); expect(decodeWebSocketFrame(frame, true).payload.toString()).toBe('hi'); });
  it('decodes unmasked server frames', () => { const frame = encodeWebSocketFrame(WebSocketOpcode.binary, Buffer.from([1,2]), false); const decoded = decodeWebSocketFrame(frame, false); expect(decoded.opcode).toBe(WebSocketOpcode.binary); expect([...decoded.payload]).toEqual([1,2]); });
  it('encodes and decodes close payload', () => { expect(decodeClosePayload(encodeClosePayload(1000, 'ok'))).toEqual({ code: 1000, reason: 'ok' }); });
});
