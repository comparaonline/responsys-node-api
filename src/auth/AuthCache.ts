import {
  KEY_ENDPOINT,
  KEY_TOKEN,
  KEY_ISSUED_AT
} from '../Constants';
import { MemoryCache } from '../cache-providers/memory-cache';
import { CacheProvider } from '../cache-providers';

export class AuthCache {
  private static provider: CacheProvider = MemoryCache.getInstance();
  static setProvider(provider: CacheProvider) {
    this.provider = provider;
    this.provider.init();
  }

  constructor () {
    AuthCache.provider.init();
  }

  set(authResponse) {
    AuthCache.provider.set(KEY_TOKEN, authResponse.authToken);
    AuthCache.provider.set(KEY_ENDPOINT, authResponse.endPoint);
    AuthCache.provider.set(KEY_ISSUED_AT, authResponse.issuedAt);
  }

  getToken(): string | undefined {
    return AuthCache.provider.get(KEY_TOKEN);
  }

  getEndpoint(): string | undefined {
    return AuthCache.provider.get(KEY_ENDPOINT);
  }

  getIssued(): string | undefined {
    return AuthCache.provider.get(KEY_ISSUED_AT);
  }

  isLoaded(): boolean {
    return this.getToken() !== undefined;
  }

  clear(): void {
    AuthCache.provider.clear();
  }

}
