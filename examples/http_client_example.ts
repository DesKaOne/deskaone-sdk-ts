import { HttpClient, ProxyConfig } from '../src/index.js';

const proxyConfig = process.env.PROXY_URL ? ProxyConfig.fromUrlString(process.env.PROXY_URL) : undefined;
const client = new HttpClient({ proxyConfig, timeoutMs: 15_000 });
const response = await client.get('https://api.ipify.org/');
console.log('status:', response.statusCode);
console.log('headers:', Object.fromEntries(response.headers));
console.log('body:', response.text());
