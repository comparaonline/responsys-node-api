import { Recipient } from './Recipient';
import { OptionalData } from './OptionalData';

export class RecipientData  {

  recipient: Recipient;
  optionalData;

  constructor(recipient: Recipient, optionalData?: Set<OptionalData>) {
    this.recipient = recipient;
    if (optionalData) this.optionalData = Array.from(optionalData);
  }
}
