import { randomBytes as nodeRandomBytes } from 'node:crypto';

export interface HexToBytesOptions { allowPrefix?: boolean }
export function bytesToHex(bytes: Uint8Array, lowerCase = true): string { const hex = Buffer.from(bytes).toString('hex'); return lowerCase ? hex : hex.toUpperCase(); }
export function hexToBytes(hex: string, options: HexToBytesOptions = {}): Buffer { let input = hex.trim(); if (options.allowPrefix && input.startsWith('0x')) input = input.slice(2); if (input.length % 2 !== 0) throw new TypeError('Hex string must have an even length'); if (!/^[0-9a-fA-F]*$/.test(input)) throw new TypeError('Invalid hex string'); return Buffer.from(input, 'hex'); }
export function tryHexToBytes(hex: string): Buffer | undefined { try { return hexToBytes(hex, { allowPrefix: true }); } catch { return undefined; } }
export function bytesToBase64(bytes: Uint8Array): string { return Buffer.from(bytes).toString('base64'); }
export function base64ToBytes(input: string): Buffer { return Buffer.from(input, 'base64'); }
export function utf8ToBytes(input: string): Buffer { return Buffer.from(input, 'utf8'); }
export function bytesToUtf8(bytes: Uint8Array): string { return Buffer.from(bytes).toString('utf8'); }
export function concatBytes(...items: Array<Uint8Array | string>): Buffer { return Buffer.concat(items.map((item) => typeof item === 'string' ? Buffer.from(item) : Buffer.from(item))); }
export function randomBytes(length: number): Buffer { if (!Number.isInteger(length) || length < 0) throw new TypeError('length must be a non-negative integer'); return nodeRandomBytes(length); }
