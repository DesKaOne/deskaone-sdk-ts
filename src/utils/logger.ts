import * as color from './term_color.js';
export type LoggerLevel = 'info' | 'warn' | 'error' | 'success';
export interface LoggerOptions { colors?: boolean; now?: () => Date }
export class Logger {
  constructor(private readonly name = 'DesKaOne', private readonly options: LoggerOptions = {}) {}
  info(message: string): void { console.log(this.format('info', message)); }
  warn(message: string): void { console.warn(this.format('warn', message)); }
  error(message: string): void { console.error(this.format('error', message)); }
  success(message: string): void { console.log(this.format('success', message)); }
  format(level: LoggerLevel, message: string, date = this.options.now?.() ?? new Date()): string {
    const label = `[${date.toISOString()}] [${this.name}] [${level.toUpperCase()}]`;
    if (this.options.colors === false) return `${label} ${message}`;
    const paint = level === 'error' ? color.red : level === 'warn' ? color.yellow : level === 'success' ? color.green : color.cyan;
    return `${paint(label)} ${message}`;
  }
}
