import { Request } from '../commons/Request';
import { RecipientData } from './RecipientData';

export class TriggerEmailMessageRequest extends Request {

  constructor(recipients: Set<RecipientData>, campaign: string) {
    const service = `/rest/api/v1.3/campaigns/${campaign}/email`;

    const header = {
      'content-type': 'application/json'
    };

    const entity = JSON.stringify({
      recipientData: Array.from(recipients)
    });

    super(entity, service, header);
  }
}
