import { Request } from '../commons/Request';
import { RecipientData } from './RecipientData';
import { CONTENT_TYPE_JSON, BASE_URL } from '../Constants';

export class TriggerEmailMessageRequest extends Request {

  constructor(recipients: Set<RecipientData>, campaign: string) {
    const service = `${BASE_URL}/campaigns/${campaign}/email`;

    const header = {
      'content-type': CONTENT_TYPE_JSON
    };

    const entity = JSON.stringify({
      recipientData: Array.from(recipients)
    });

    super(entity, service, header);
  }
}
