import * as rest from 'rest';
import { SecureClientInterceptor } from '../auth/SecureClientInterceptor';
import * as retry from 'rest/interceptor/retry';
import * as errorCode from 'rest/interceptor/errorCode';
import * as timeout from 'rest/interceptor/timeout';

export class Client {

  private interceptor = new SecureClientInterceptor().get();
  public retryOptions = { initial: 100, multiplier: 2 };
  public timeoutOptions = { timeout: 40000 };
  
  protected call(request: any): rest.ResponsePromise {
    const client = rest
      .wrap(this.interceptor)
      .wrap(errorCode)
      .wrap(retry, this.retryOptions)
      .wrap(timeout, this.timeoutOptions);

    return client(request);
  }
} 
