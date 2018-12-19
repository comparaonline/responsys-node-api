import * as rest from 'rest';
import { TriggerEventMessageRequest } from './TriggerEventMessageRequest';
import { Client } from '../commons/Client';

export class TriggerEventMessage extends Client {

  send(eventMessageRequest: TriggerEventMessageRequest): rest.ResponsePromise {
    return super.call(eventMessageRequest);
  }
}
