import * as interceptor from 'rest/interceptor';
import { AuthCache } from './AuthCache';
import { Authentication } from './Authentication';
import { AuthenticationRequest } from './AuthenticationRequest';

export class SecureClientInterceptor {
  private authCache = new AuthCache();
  private authentication = new Authentication();

  get() {
    return interceptor({
      request: async (request) => {
        if (!this.authCache.isLoaded()) {
          await this.authentication.signin(new AuthenticationRequest());
          request.headers.Authorization = this.authCache.getToken();

          return request;
        }

        return request;
      },
      success: async (response, _, meta) => {
        const status = response.status || { code: 408 };
        if (status.code === 401 || status.code === 403) {
          const request = response.request;
          await this.authentication.signin(new AuthenticationRequest());
          request.headers.Authorization = this.authCache.getToken();

          return meta.client(request);
        }

        return response;
      },
      error: response => response
    });
  }
}
