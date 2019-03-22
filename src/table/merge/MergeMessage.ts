import * as rest from 'rest';
import { TableMergeRequest } from './MergeRequest';
import { Client } from '../../commons/Client';

export class TableMergeMessage extends Client {

  send(tableMergeMessageRequest: TableMergeRequest): rest.ResponsePromise {
    return super.call(tableMergeMessageRequest);
  }
}
