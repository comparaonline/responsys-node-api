import * as interceptor from 'rest/interceptor';
import { AuthCache } from './AuthCache';

export class AuthInterceptor {

  private authCache = new AuthCache();

  public get() {
    return interceptor({
      success: (response, config, meta) => {
        this.authCache.set(JSON.parse(response.entity));
        return response;
      }
    });
  }

}
