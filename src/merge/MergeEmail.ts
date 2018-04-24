import * as rest from 'rest';
import { MergeTriggerEmailRequest } from './MergeTriggerEmailRequest';
import { Client } from '../commons/Client';

export class MergeEmail extends Client {
  send(mergeTriggerEmailRequest: MergeTriggerEmailRequest): rest.ResponsePromise {
    return super.call(mergeTriggerEmailRequest);
  }
}
