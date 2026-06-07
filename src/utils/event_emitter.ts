export type EventHandler<Args extends unknown[] = unknown[]> = (...args: Args) => void | Promise<void>;

type Listener = { id: number; handler: EventHandler; once: boolean };

export class EventEmitter<Events extends Record<string, unknown[]> = Record<string, unknown[]>> {
  private listeners = new Map<keyof Events, Listener[]>();
  private nextId = 1;
  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): number { return this.add(event, handler, false); }
  once<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): number { return this.add(event, handler, true); }
  off<K extends keyof Events>(event: K, id: number): void { this.listeners.set(event, (this.listeners.get(event) ?? []).filter((l) => l.id !== id)); }
  emit<K extends keyof Events>(event: K, ...args: Events[K]): void { for (const l of [...(this.listeners.get(event) ?? [])]) { void l.handler(...args); if (l.once) this.off(event, l.id); } }
  async emitAsync<K extends keyof Events>(event: K, ...args: Events[K]): Promise<void> { for (const l of [...(this.listeners.get(event) ?? [])]) { await l.handler(...args); if (l.once) this.off(event, l.id); } }
  clear<K extends keyof Events>(event?: K): void { if (event === undefined) this.listeners.clear(); else this.listeners.delete(event); }
  listenerCount<K extends keyof Events>(event: K): number { return this.listeners.get(event)?.length ?? 0; }
  private add<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>, once: boolean): number { const id = this.nextId++; const list = this.listeners.get(event) ?? []; list.push({ id, handler: handler as EventHandler, once }); this.listeners.set(event, list); return id; }
}
