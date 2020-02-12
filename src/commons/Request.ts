import {
  HTTP_METHOD_POST,
  CONTENT_TYPE_URLENCODED
} from '../Constants';

const HEADERS = {
  'content-type': CONTENT_TYPE_URLENCODED
};

export class Request {
  constructor(
    public readonly entity: string,
    public readonly path: string,
    public readonly headers: any = HEADERS,
    public readonly method: string = HTTP_METHOD_POST
  ) {}
}
