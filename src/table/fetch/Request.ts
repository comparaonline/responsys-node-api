import { Request } from '../../commons/Request';
import { CONTENT_TYPE_JSON, BASE_URL, HTTP_METHOD_GET } from '../../Constants';

export class TableFetchRequest extends Request {

  constructor(tableName: string, folderName: string) {
    const service = `${BASE_URL}/folder/${folderName}/suppData/${tableName}?ft=PK`;


    const header = {
      'content-type': CONTENT_TYPE_JSON
    };
    const notEntity = '';
    super(notEntity, service, header, HTTP_METHOD_GET);
  }
}
