import { describe, expect, it, vi } from 'vitest';
import { Debouncer } from '../src/index.js';
describe('Debouncer', () => { it('debounces calls', () => { vi.useFakeTimers(); let count = 0; const d = new Debouncer(10, () => count++); d.call(); d.call(); vi.advanceTimersByTime(10); expect(count).toBe(1); d.dispose(); vi.useRealTimers(); }); });
