export interface CacheProvider {
  init(): void;
  clear(): void;
  set(key: string, value: any): void;
  get<T>(key: string): T | undefined;
}
