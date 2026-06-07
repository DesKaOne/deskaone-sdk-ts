declare type BufferEncoding = 'utf8' | 'utf-8' | 'latin1' | 'base64' | 'hex' | 'ascii' | 'binary' | 'ucs2' | 'ucs-2' | 'utf16le' | 'utf-16le';
declare namespace NodeJS { interface Timeout {} }
declare const process: { env: Record<string, string | undefined>; once(event: string, handler: (...args: unknown[]) => void): void };
declare const console: { log(...args: unknown[]): void; warn(...args: unknown[]): void; error(...args: unknown[]): void };
declare function setTimeout(handler: (...args: unknown[]) => void, timeout?: number, ...args: unknown[]): NodeJS.Timeout;
declare function clearTimeout(timeout: NodeJS.Timeout): void;
declare function setInterval(handler: (...args: unknown[]) => void, timeout?: number, ...args: unknown[]): NodeJS.Timeout;
declare function clearInterval(timeout: NodeJS.Timeout): void;

declare class Buffer extends Uint8Array {
  static alloc(size: number): Buffer; static from(data: string | ArrayLike<number> | ArrayBuffer | Uint8Array, encoding?: BufferEncoding): Buffer; static concat(list: readonly Uint8Array[], totalLength?: number): Buffer; static isBuffer(value: unknown): value is Buffer;
  toString(encoding?: BufferEncoding): string; subarray(start?: number, end?: number): Buffer; slice(start?: number, end?: number): Buffer; indexOf(searchElement: number, fromIndex?: number): number; indexOf(value: string | Uint8Array, byteOffset?: number): number; writeUInt16BE(value: number, offset: number): number; readUInt16BE(offset: number): number; readBigUInt64BE(offset: number): bigint; copy(target: Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
}

declare module 'node:buffer' { export { Buffer }; }
declare module 'node:crypto' { export function randomBytes(size: number): Buffer; export function createHash(algorithm: string): { update(data: string | Uint8Array): { digest(encoding: 'base64' | 'hex'): string } }; }
declare module 'node:net' { export interface Socket { destroyed: boolean; remoteAddress?: string; remotePort?: number; localAddress?: string; localPort?: number; setNoDelay(noDelay?: boolean): this; write(data: Uint8Array | string, cb?: () => void): boolean; end(cb?: () => void): this; destroy(error?: Error): this; on(event: 'data', listener: (data: Buffer) => void): this; on(event: 'error', listener: (error: Error) => void): this; on(event: 'close', listener: (hadError: boolean) => void): this; once(event: 'data', listener: (data: Buffer) => void): this; once(event: 'error', listener: (error: Error) => void): this; once(event: 'close', listener: (hadError: boolean) => void): this; once(event: 'connect', listener: () => void): this; off(event: string, listener: (...args: any[]) => void): this; }
  export function connect(options: { host: string; port: number; localAddress?: string; localPort?: number }): Socket; export function isIPv4(input: string): boolean; const net: { connect: typeof connect; isIPv4: typeof isIPv4 }; export default net; }
declare module 'node:tls' { import type { Socket } from 'node:net'; export interface TLSSocket extends Socket {} export function connect(options: { socket: Socket; servername?: string; rejectUnauthorized?: boolean; ca?: string | Buffer | Array<string | Buffer>; cert?: string | Buffer; key?: string | Buffer; ALPNProtocols?: string[] }, cb: () => void): TLSSocket; const tls: { connect: typeof connect }; export default tls; }
declare module 'node:timers/promises' { export function setTimeout(ms: number, value?: unknown, options?: { signal?: AbortSignal }): Promise<void>; }
