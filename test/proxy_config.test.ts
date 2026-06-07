import { describe, expect, it } from 'vitest';
import { ProxyConfig, ProxyType, proxyTypeFromString } from '../src/index.js';
describe('ProxyConfig', () => {
  it('parses aliases and URLs', () => { expect(proxyTypeFromString('https')).toBe(ProxyType.http); expect(proxyTypeFromString('s5')).toBe(ProxyType.socks5); const p = ProxyConfig.fromUrlString('socks5://user:p%40ss@example.com:1080'); expect(p.type).toBe(ProxyType.socks5); expect(p.username).toBe('user'); expect(p.password).toBe('p@ss'); });
  it('parses host:port with default type', () => { const p = ProxyConfig.fromUrlString('proxy.local:8080', ProxyType.socks4); expect(p.type).toBe(ProxyType.socks4); expect(p.host).toBe('proxy.local'); expect(p.port).toBe(8080); });
  it('validates input and clones', () => { expect(() => new ProxyConfig({ type: ProxyType.http, host: '', port: 1 })).toThrow(TypeError); const p = ProxyConfig.fromUrlString('user:pass@host:99'); expect(p.cloneWith({ port: 100 }).port).toBe(100); expect(p.toString()).toContain('user:pass@host:99'); });
});
