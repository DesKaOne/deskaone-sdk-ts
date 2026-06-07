export class Debouncer {
  private timer?: NodeJS.Timeout;
  constructor(private readonly delayMs: number, private readonly action: () => void) { if (delayMs < 0) throw new TypeError('delayMs must be non-negative'); }
  call(): void { this.cancel(); this.timer = setTimeout(() => { this.timer = undefined; this.action(); }, this.delayMs); }
  cancel(): void { if (this.timer) clearTimeout(this.timer); this.timer = undefined; }
  dispose(): void { this.cancel(); }
}
