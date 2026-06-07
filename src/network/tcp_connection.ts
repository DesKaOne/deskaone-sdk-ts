import type { Socket } from 'node:net';
import type { TLSSocket } from 'node:tls';

export type NetSocket = Socket | TLSSocket;
export type DataHandler = (data: Buffer) => void;
export type ErrorHandler = (error: Error) => void;
export type CloseHandler = (hadError: boolean) => void;

export class TcpConnection {
  private leftover = Buffer.alloc(0);
  constructor(public socket: NetSocket, public isSecure = false) {}
  get remoteAddress(): string | undefined { return this.socket.remoteAddress; }
  get remotePort(): number | undefined { return this.socket.remotePort; }
  get localAddress(): string | undefined { return this.socket.localAddress; }
  get localPort(): number | undefined { return this.socket.localPort; }
  write(data: Buffer | Uint8Array | string): Promise<void> { return new Promise((resolve, reject) => { const onError = (e: Error) => { cleanup(); reject(e); }; const cleanup = () => this.socket.off('error', onError); this.socket.once('error', onError); this.socket.write(data, () => { cleanup(); resolve(); }); }); }
  end(): Promise<void> { return new Promise((resolve) => { if (this.socket.destroyed) { resolve(); return; } this.socket.end(() => resolve()); }); }
  destroy(error?: Error): void { this.socket.destroy(error); }
  pushLeftover(data: Buffer): void { if (data.length) this.leftover = Buffer.concat([data, this.leftover]); }
  onData(handler: DataHandler): void { this.socket.on('data', handler); }
  onError(handler: ErrorHandler): void { this.socket.on('error', handler); }
  onClose(handler: CloseHandler): void { this.socket.on('close', handler); }
  async onceData(timeoutMs?: number): Promise<Buffer> { if (this.leftover.length) { const data = this.leftover; this.leftover = Buffer.alloc(0); return data; } return this.waitForData(timeoutMs); }
  async readExact(length: number, timeoutMs?: number): Promise<Buffer> { if (!Number.isInteger(length) || length < 0) throw new TypeError('length must be non-negative'); const chunks: Buffer[] = []; let needed = length; if (this.leftover.length) { const take = this.leftover.subarray(0, needed); chunks.push(take); needed -= take.length; this.leftover = this.leftover.subarray(take.length); } while (needed > 0) { const data = await this.waitForData(timeoutMs); const take = data.subarray(0, needed); chunks.push(take); needed -= take.length; if (data.length > take.length) this.leftover = Buffer.concat([data.subarray(take.length), this.leftover]); } return Buffer.concat(chunks, length); }
  async readUntil(delimiter: Buffer, maxSize: number, timeoutMs?: number): Promise<{ data: Buffer; leftover: Buffer }> { if (!delimiter.length) throw new TypeError('delimiter must not be empty'); let buf = this.leftover; this.leftover = Buffer.alloc(0); for (;;) { const idx = buf.indexOf(delimiter); if (idx >= 0) { const end = idx + delimiter.length; const data = buf.subarray(0, end); const leftover = buf.subarray(end); this.leftover = Buffer.concat([leftover, this.leftover]); return { data, leftover }; } if (buf.length > maxSize) throw new Error(`Read exceeded maximum size of ${maxSize} bytes`); const next = await this.waitForData(timeoutMs); buf = Buffer.concat([buf, next]); }
  }
  private waitForData(timeoutMs?: number): Promise<Buffer> { return new Promise((resolve, reject) => { let timer: NodeJS.Timeout | undefined; const cleanup = () => { if (timer) clearTimeout(timer); this.socket.off('data', onData); this.socket.off('error', onError); this.socket.off('close', onClose); }; const onData = (data: Buffer) => { cleanup(); resolve(Buffer.from(data)); }; const onError = (error: Error) => { cleanup(); reject(error); }; const onClose = () => { cleanup(); reject(new Error('Socket closed before data was received')); }; this.socket.once('data', onData); this.socket.once('error', onError); this.socket.once('close', onClose); if (timeoutMs !== undefined) timer = setTimeout(() => { cleanup(); reject(new Error(`Timed out after ${timeoutMs}ms`)); }, timeoutMs); }); }
}
