import * as rest from 'rest';
import { Recipient } from './Recipient';
import * as queryString from 'querystring';
import { Request } from '../commons/Request';
import { RecipientData } from './RecipientData';
import { TriggerEmailMessageRequest } from './TriggerEmailMessageRequest';
import { SecureClientInterceptor } from '../auth/SecureClientInterceptor';

export class TriggerEmailMessage {

  private interceptor;

  constructor() {
    this.interceptor = new SecureClientInterceptor().get();
  }

  /**
   * TODO Implement retry interceptor.
   * @param emailMessageRequest
   */
  send(emailMessageRequest: TriggerEmailMessageRequest): rest.ResponsePromise {
    const client = rest.wrap(this.interceptor);
    return client(emailMessageRequest);
  }
}
