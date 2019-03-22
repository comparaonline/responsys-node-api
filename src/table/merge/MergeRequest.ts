import { Request } from '../../commons/Request';
import { MergeData } from './MergeData';
import { CONTENT_TYPE_JSON, BASE_URL } from '../../Constants';

export class TableMergeRequest extends Request {

  constructor(
    data: MergeData,
    folderName: string,
    tableName: string,
    dataWithoutPk: string[] = [] // when the data or table is not primaryKey
  ) {
    const service = `${BASE_URL}/folders/${folderName}/suppData/${tableName}/members`;
    const header = {
      'content-type': CONTENT_TYPE_JSON
    };

    const merge = {
      recordData: data,
      insertOnNoMatch: true,
      updateOnMatch: 'REPLACE_ALL'
    };

    const dataJson = JSON.stringify(
      (dataWithoutPk.length > 0) ?
        { ...merge, ...{ matchColumnNames : dataWithoutPk } } : merge
    );

    super(dataJson, service, header);
  }
}
