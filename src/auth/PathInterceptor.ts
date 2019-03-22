import * as interceptor from 'rest/interceptor';
import { AuthCache } from './AuthCache';

export class PathInterceptor {
  private authCache = new AuthCache();

  get() {
    return interceptor({
      request: (request, config, meta) => {
        return this.addPath(request);
      }
    });
  }

  private addPath(request) {
    if (!this.authCache.isLoaded()) {
      return Promise.reject('Authentication Missing: Cannot add endpoint to path.');
    }

    const endpoint = this.authCache.getEndpoint();
    const path = request.path;

    if (!path.includes(endpoint)) {
      request.path = endpoint + path;
    }

    return request;
  }

}
