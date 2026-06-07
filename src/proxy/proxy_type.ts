export enum ProxyType { http = 'http', socks4 = 'socks4', socks5 = 'socks5' }
export function proxyTypeFromString(input: string): ProxyType {
  const value = input.trim().toLowerCase().replace(/:$/, '');
  if (value === 'http' || value === 'https') return ProxyType.http;
  if (value === 's4' || value === 'sock4' || value === 'socks4') return ProxyType.socks4;
  if (value === 's5' || value === 'sock5' || value === 'socks5') return ProxyType.socks5;
  throw new TypeError(`Invalid proxy type: ${input}`);
}
