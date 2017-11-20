import * as interceptor from 'rest/interceptor';
import * as rest from 'rest';
import { AuthCache } from '../auth/AuthCache';
import { Authentication } from '../auth/Authentication';
import { RefreshRequest } from '../auth/RefreshRequest';
import { request } from 'https';
import { AuthenticationRequest } from './AuthenticationRequest';

/** 
 * TODO 
 * Move hardcoded path to configuration.
 */
const URL = 'https://login5.responsys.net/rest/api/v1.3/auth/token';
export class SecureClientInterceptor {

  private interceptor;
  private authCache = new AuthCache();
  private authentication = new Authentication();

  get() {
    return interceptor({
      init: (config) => {
        return config;
      },
      request: (request, config, meta) => {
        return request;
      },
      response: (response, config, meta) => {
        return response;
      },
      success: async (response, config, meta) => {
        if (response.status.code === 401) {
          const entity = JSON.parse(response.entity);
          const request = response.request;
          
          if (entity.errorCode === 'TOKEN_EXPIRED') {
            const result = await this.authentication.signin(new AuthenticationRequest(URL));
            request.headers.Authorization = this.authCache.getToken();
            return meta.client(request);

          } else if (entity.errorCode === 'INVALID_TOKEN') {
            this.authCache.clear();
            return meta.client(request);
          }
        } 
        return response;
      },
      error: (response, config, meta) => {
        return response;
      }
    });
  }

}
