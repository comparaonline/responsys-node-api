import { Request } from '../../commons/Request';
import { CONTENT_TYPE_JSON, BASE_URL } from '../../Constants';
import { MergeData } from '../../table/merge/MergeData';

export class ListMergeRequest extends Request {

  constructor(
    data: MergeData,
    listName: string,
    matchColumn: string = 'EMAIL_ADDRESS_'
  ) {
    const service = `${BASE_URL}/lists/${listName}/members`;
    const header = {
      'content-type': CONTENT_TYPE_JSON
    };

    const merge = {
      recordData: data,
      mergeRule: {
        htmlValue : 'H',
        optinValue : 'I',
        textValue : 'T',
        insertOnNoMatch : true,
        updateOnMatch : 'REPLACE_ALL',
        matchColumnName1 : matchColumn,
        optoutValue : 'O',
        rejectRecordIfChannelEmpty : null,
        defaultPermissionStatus : 'OPTIN'
      }
    };

    const dataJson = JSON.stringify(merge);

    super(dataJson, service, header);
  }
}
