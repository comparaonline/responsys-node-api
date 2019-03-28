import * as rest from 'rest';
import { ListMergeRequest } from './MergeRequest';
import { Client } from '../../commons/Client';

export class ListMergeMessage extends Client {

  send(listMergeMessageRequest: ListMergeRequest): rest.ResponsePromise {
    return super.call(listMergeMessageRequest);
  }
}
