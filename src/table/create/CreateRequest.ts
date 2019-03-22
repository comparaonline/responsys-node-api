import { Request } from '../../commons/Request';
import { TableData } from './TableData';
import { CONTENT_TYPE_JSON, BASE_URL } from '../../Constants';

export class TableCreateRequest extends Request {

  constructor(tableData: TableData, folderName: string) {
    const service = `${BASE_URL}/folders/${folderName}/suppData`;

    const header = {
      'content-type': CONTENT_TYPE_JSON
    };

    const table = JSON.stringify(tableData);

    super(table, service, header);
  }
}
