import { Recipient } from './Recipient';
import * as queryString from 'querystring';

export class RecipientData  {

  recipient: Recipient;
  optionalData;

  constructor(recipient: Recipient) {
    this.recipient = recipient;
  }

}
