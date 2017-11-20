import { Request } from '../commons/Request';
import { Recipient } from './Recipient';
import { RecipientData } from './RecipientData';
import { AuthCache } from '../auth/AuthCache';

export class TriggerEmailMessageRequest extends Request {

  constructor(recipients: Set<RecipientData>, campaign: string) {
    const service = `/rest/api/v1.3/campaigns/${campaign}/email`;
    
    const authCache = new AuthCache();
    const token = authCache.getToken();
    const endpoint = authCache.getEndpoint() + service;

    const header = {
      'content-type': 'application/json',
      Authorization: token
    };

    const entity = JSON.stringify({
      recipientData: Array.from(recipients)
    });

    super(entity, endpoint, header);
  }

}
