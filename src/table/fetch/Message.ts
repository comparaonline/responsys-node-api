import * as rest from 'rest';
import { TableFetchRequest } from './Request';
import { Client } from '../../commons/Client';

export class TableFetchMessage extends Client {

  send(fetchMessageRequest: TableFetchRequest): rest.ResponsePromise {
    return super.call(fetchMessageRequest);
  }
}
