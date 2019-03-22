import * as rest from 'rest';
import { TableCreateRequest } from './CreateRequest';
import { Client } from '../../commons/Client';

export class TableCreateMessage extends Client {

  send(createMessageRequest: TableCreateRequest): rest.ResponsePromise {
    return super.call(createMessageRequest);
  }
}
