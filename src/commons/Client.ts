import * as rest from 'rest';
import { SecureClientInterceptor } from '../auth/SecureClientInterceptor';
import * as retry from 'rest/interceptor/retry';
import * as errorCode from 'rest/interceptor/errorCode';
import * as timeout from 'rest/interceptor/timeout';

export class Client {

  private interceptor = new SecureClientInterceptor().get();
  
  protected call(request: any): rest.ResponsePromise {
    const client = rest
      .wrap(this.interceptor)
      .wrap(errorCode)
      .wrap(retry, this.getRetryOptions())
      .wrap(timeout, { timeout: 3000 });

    return client(request);
  }

  protected getRetryOptions() {
    return {
      initial: 100,
      multiplier: 2
    };
  }



}
