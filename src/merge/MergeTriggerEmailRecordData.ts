import { OptionalData } from '../send/OptionalData';

export class MergeTriggerEmailRecordData  {

  fieldValues: string[];
  optionalData;

  constructor(fieldValues: string[], optionalData?: Set<OptionalData>) {
    this.fieldValues = fieldValues;
    if (optionalData) this.optionalData = Array.from(optionalData);
  }
}
