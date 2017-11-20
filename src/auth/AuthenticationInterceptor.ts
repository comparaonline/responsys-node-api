import * as interceptor from 'rest/interceptor';
import * as rest from 'rest';
import { AuthCache } from '../auth/AuthCache';
import { Authentication } from '../auth/Authentication';
import { RefreshRequest } from '../auth/RefreshRequest';

export class AuthInterceptor {

  private interceptor;
  private authCache = new AuthCache();
  private authentication = new Authentication();

  constructor() {
    this.interceptor = this.build();
  }

  get() {
    return this.interceptor;
  }

  private build() {
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
      success: (response, config, meta) => {
        this.authCache.set(JSON.parse(response.entity));
        return response;
      },
      error: (response, config, meta) => {
        return response;
      }
    });
  }

}
