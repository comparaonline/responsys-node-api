import { Request } from '../commons/Request';
import { RecipientData } from './RecipientData';
import { CustomEvent } from './CustomEvent';
import { CONTENT_TYPE_JSON, BASE_URL } from '../Constants';

export class TriggerEventMessageRequest extends Request {

  constructor(recipients: Set<RecipientData>, customEvent: CustomEvent, eventName: string) {
    const service = `${BASE_URL}/events/${eventName}`;

    const header = {
      'content-type': CONTENT_TYPE_JSON
    };

    const entity = JSON.stringify({
      customEvent,
      recipientData: Array.from(recipients)
    });

    super(entity, service, header);
  }
}
