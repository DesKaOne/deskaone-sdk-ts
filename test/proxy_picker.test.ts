import { describe, expect, it } from 'vitest';
import { NoProxyAvailableError, ProxyConfig, ProxyType, RandomProxyPicker, RoundRobinProxyPicker, SingleProxyPicker } from '../src/index.js';
const p = (port: number) => new ProxyConfig({ type: ProxyType.http, host: 'h', port });
describe('proxy pickers', () => {
  it('single returns clone', () => { const picked = new SingleProxyPicker(p(1)).pick(); picked.port = 2; expect(new SingleProxyPicker(p(1)).pick().port).toBe(1); });
  it('round robin rotates', () => { const rr = new RoundRobinProxyPicker([p(1), p(2)]); expect(rr.pick().port).toBe(1); expect(rr.pick().port).toBe(2); expect(rr.pick().port).toBe(1); });
  it('random picks deterministic', () => { expect(new RandomProxyPicker([p(1), p(2)], () => 0.9).pick().port).toBe(2); });
  it('throws on empty', () => { expect(() => new RoundRobinProxyPicker([])).toThrow(NoProxyAvailableError); });
});
