import * as rest from 'rest';
import { TriggerEmailMessageRequest } from './TriggerEmailMessageRequest';
import { Client } from '../commons/Client';

export class TriggerEmailMessage extends Client {

  send(emailMessageRequest: TriggerEmailMessageRequest): rest.ResponsePromise {
    return super.call(emailMessageRequest);
  }
}
