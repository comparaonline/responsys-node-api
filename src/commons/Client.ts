import * as rest from 'rest';
import { SecureClientInterceptor } from '../auth/SecureClientInterceptor';
import * as retry from 'rest/interceptor/retry';
import * as errorCode from 'rest/interceptor/errorCode';
import * as timeout from 'rest/interceptor/timeout';
import { PathInterceptor } from '../auth/PathInterceptor';

export class Client {

  private secureInterceptor = new SecureClientInterceptor().get();
  private pathInterceptor = new PathInterceptor().get();
  private options;

  constructor (options?: Options) {
    this.options = options || new Options();
  }

  /**
   * Wraps http client with all necessary interceptors. Interceptor order is important.
   * 
   * errorCode catches status other than 200 to be treated as errors.
   * retry executes requests again until timeout.
   * secureClientInterceptor handles authentication to responsys.
   * timeout canceles a request after the time set. 
   * @param request 
   */
  protected call(request: any): rest.ResponsePromise {
    const client = rest
    .wrap(errorCode, this.options.errorOptions)
    .wrap(retry, this.options.retryOptions)
    .wrap(timeout, this.options.timeoutOptions)
    .wrap(this.pathInterceptor)
    .wrap(this.secureInterceptor);
    
    return client(request);
  }
} 

export class Options {
  
  public retryOptions = { initial: 100, multiplier: 2 };
  public timeoutOptions = { timeout: 60000 };
  public errorOptions = { code: 404 };

}
