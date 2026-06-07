import { describe, expect, it } from 'vitest';
import { EventEmitter } from '../src/index.js';
type Events = { add: [number] };
describe('EventEmitter', () => { it('handles on once off async', async () => { const e = new EventEmitter<Events>(); let total = 0; const id = e.on('add', (n) => { total += n; }); e.once('add', (n) => { total += n * 10; }); e.emit('add', 1); e.off('add', id); await e.emitAsync('add', 1); expect(total).toBe(11); expect(e.listenerCount('add')).toBe(0); }); });
