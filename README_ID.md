# DesKaOne SDK TypeScript

[English](README.md) | Bahasa Indonesia

DesKaOne SDK TypeScript adalah fondasi Phase 1 untuk fitur jaringan yang di-port dari keluarga DesKaOne SDK. Paket ini menyediakan TCP, proxy, HTTP/1.1, dan WebSocket manual dengan built-in Node.js saja.

## Fitur

- Node.js >= 20, ESM, TypeScript strict.
- Konfigurasi proxy dan pemilih proxy single, round-robin, atau random.
- Koneksi TCP langsung, TCP via proxy, dan TLS melalui tunnel.
- Handler proxy HTTP CONNECT, SOCKS4/SOCKS4a, dan SOCKS5.
- Client HTTP/1.1 manual dengan redirect, content-length, chunked, dan body sampai koneksi ditutup.
- Client WebSocket manual dengan masking, ping/pong, close handshake, dan helper reconnect.
- Utilitas bytes, debouncer, event ringan, warna terminal, dan logger.

Phase 1 belum menyertakan fitur storage atau database.

## Instal

```bash
npm install deskaone-sdk-ts
```

## Import

```ts
import { HttpClient, ProxyConfig, WebSocketClient, ReconnectWebSocketClient } from 'deskaone-sdk-ts';
```

## Contoh HTTP langsung

```ts
const client = new HttpClient();
const res = await client.get('http://example.com/');
console.log(res.statusCode, res.text());
```

## Contoh HTTP lewat proxy

```ts
const proxyConfig = ProxyConfig.fromUrlString(process.env.PROXY_URL ?? 'http://proxy.example:8080');
const client = new HttpClient({ proxyConfig });
const res = await client.get('http://example.com/');
```

## Contoh HTTPS lewat proxy

```ts
const proxyConfig = ProxyConfig.fromUrlString(process.env.PROXY_URL!);
const client = new HttpClient({ proxyConfig });
const res = await client.get('https://api.ipify.org/');
console.log(res.text());
```

## Contoh WebSocket wss

```ts
const ws = await WebSocketClient.connect('wss://ws.postman-echo.com/raw');
ws.on('text', console.log);
await ws.sendText('halo dari DesKaOne SDK TypeScript');
await ws.close(1000, 'selesai');
```

## Contoh WebSocket wss lewat proxy

```ts
const proxyConfig = ProxyConfig.fromUrlString(process.env.PROXY_URL!);
const ws = await WebSocketClient.connect('wss://ws.postman-echo.com/raw', { proxyConfig });
await ws.sendText('hello via proxy');
```

## Contoh Reconnect WebSocket

```ts
const reconnect = new ReconnectWebSocketClient({
  uri: 'wss://ws.postman-echo.com/raw',
  reconnectDelayMs: 2000,
  maxReconnects: -1,
  onConnect: (ws) => ws.sendText('connected'),
  onMessage: (msg) => console.log(msg.text)
});
await reconnect.run();
```

## Contoh env PROXY_URL

```bash
export PROXY_URL='socks5://username:password@proxy.example:1080'
npm run example:http
```

## Peringatan keamanan

Jangan pernah hardcode kredensial proxy, API key, token, atau password. Gunakan environment variable atau secret manager yang aman, dan jangan commit file `.env` ke git.
