import {
  HTTP_METHOD_POST,
  CONTENT_TYPE_URLENCODED
} from '../Constants';

const HEADERS = {
  'content-type': CONTENT_TYPE_URLENCODED
};

export class Request {

  private entity: string;
  private method: string;
  private headers: string;
  private path: string;

  constructor(
    entity: string, path: string, headers: any = HEADERS, method: string = HTTP_METHOD_POST) {
    this.entity = entity;
    this.path = path;
    this.method = method;
    this.headers = headers;
  }
}
