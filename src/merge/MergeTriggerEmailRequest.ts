import { Request } from '../commons/Request';
import { MergeTriggerRecordData } from './MergeTriggerRecordData';
import {
  CONTENT_TYPE_JSON,
  MERGER_RULE
} from '../Constants';

export class MergeTriggerEmailRequest extends Request {

  constructor(mergeTriggerRecordData: MergeTriggerRecordData, campaign: string) {
    const service = `/rest/api/v1.3/campaigns/${campaign}/email`;

    const header = {
      'content-type': CONTENT_TYPE_JSON
    };

    const entity = JSON.stringify({
      mergeTriggerRecordData,
      mergeRule: MERGER_RULE
    });

    super(entity, service, header);
  }
}
