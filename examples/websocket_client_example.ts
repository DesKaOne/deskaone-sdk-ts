import { ProxyConfig, WebSocketClient } from '../src/index.js';

const proxyConfig = process.env.PROXY_URL ? ProxyConfig.fromUrlString(process.env.PROXY_URL) : undefined;
const ws = await WebSocketClient.connect('wss://ws.postman-echo.com/raw', { proxyConfig, timeoutMs: 15_000 });
ws.on('text', (text) => console.log('text:', text));
ws.on('binary', (data) => console.log('binary:', data.toString('hex')));
ws.on('ping', (data) => console.log('ping:', data.toString('hex')));
ws.on('pong', (data) => console.log('pong:', data.toString('hex')));
ws.on('close', (code, reason) => console.log('close:', code, reason));
await ws.sendText('halo dari DesKaOne SDK TypeScript');
setTimeout(() => void ws.close(1000, 'done'), 1000);
await ws.done;
