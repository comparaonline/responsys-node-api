const HTTP_METHOD = 'POST';
const HEADERS = {
  'content-type': 'application/x-www-form-urlencoded'
};

export class Request {

  private entity: string;
  private method: string;
  private headers: string;
  private path: string;

  constructor(entity: string, path: string, headers: any = HEADERS, method: string = HTTP_METHOD) {
    this.entity = entity;
    this.path = path;
    this.method = method;
    this.headers = headers;
  }
}
