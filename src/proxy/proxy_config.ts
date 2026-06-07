import { ProxyType, proxyTypeFromString } from './proxy_type.js';
export interface ProxyConfigInit { type: ProxyType; host: string; port: number; username?: string; password?: string }
export type ProxyConfigPartial = Partial<ProxyConfigInit>;
export class ProxyConfig {
  type: ProxyType; host: string; port: number; username?: string; password?: string;
  constructor(init: ProxyConfigInit) { this.type = init.type; this.host = init.host.trim(); this.port = init.port; this.username = init.username; this.password = init.password; this.validate(); }
  private validate(): void { if (!this.host) throw new TypeError('Proxy host must not be empty'); if (!Number.isInteger(this.port) || this.port < 1 || this.port > 65535) throw new TypeError('Proxy port must be between 1 and 65535'); }
  static fromUrl(url: URL): ProxyConfig { const type = proxyTypeFromString(url.protocol.replace(':', '')); const port = url.port ? Number(url.port) : undefined; if (!port) throw new TypeError('Proxy URL must include a port'); return new ProxyConfig({ type, host: url.hostname, port, username: url.username ? decodeURIComponent(url.username) : undefined, password: url.password ? decodeURIComponent(url.password) : undefined }); }
  static fromUrlString(input: string, defaultType: ProxyType = ProxyType.http): ProxyConfig { const trimmed = input.trim(); if (!trimmed) throw new TypeError('Proxy URL must not be empty'); if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return ProxyConfig.fromUrl(new URL(trimmed)); return ProxyConfig.fromUrl(new URL(`${defaultType}://${trimmed}`)); }
  toUrl(): URL { const url = new URL(`${this.type}://${this.host}:${this.port}`); if (this.username !== undefined) url.username = this.username; if (this.password !== undefined) url.password = this.password; return url; }
  toString(): string { return this.toUrl().toString(); }
  cloneWith(partial: ProxyConfigPartial): ProxyConfig { return new ProxyConfig({ type: partial.type ?? this.type, host: partial.host ?? this.host, port: partial.port ?? this.port, username: partial.username ?? this.username, password: partial.password ?? this.password }); }
}
