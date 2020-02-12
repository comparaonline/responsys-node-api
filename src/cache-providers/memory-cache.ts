import { CacheProvider } from '.';

export class MemoryCache implements CacheProvider {
  private static instance: MemoryCache;
  static getInstance(): MemoryCache {
    return this.instance || (this.instance = new MemoryCache());
  }
  private store = new Map();
  private constructor() { }

  init(): void {}

  clear(): void {
    this.store.clear();
  }

  set(key: string, value: any): void {
    this.store.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.store.has(key) ? this.store.get(key) : undefined;
  }

}
