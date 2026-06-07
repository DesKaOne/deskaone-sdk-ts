import { ProxyConfig, ReconnectWebSocketClient } from '../src/index.js';

const proxyConfig = process.env.PROXY_URL ? ProxyConfig.fromUrlString(process.env.PROXY_URL) : undefined;
const client = new ReconnectWebSocketClient({
  uri: 'wss://ws.postman-echo.com/raw',
  websocket: { proxyConfig, timeoutMs: 15_000 },
  reconnectDelayMs: 2_000,
  maxReconnects: -1,
  onConnect: async (ws) => {
    console.log('connected');
    await ws.sendText('halo dari reconnect client');
  },
  onMessage: (message) => console.log('message:', message.text ?? message.data.toString('hex')),
  onDisconnect: (code, reason) => console.log('disconnected:', code, reason),
  onError: (error) => console.error('error:', error.message)
});

process.once('SIGINT', () => void client.stop());
await client.run();
