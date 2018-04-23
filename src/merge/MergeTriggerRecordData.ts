import { MergeTriggerEmailRecordData } from './MergeTriggerEmailRecordData';
import { FIELD_NAMES } from './../Constants';

export class MergeTriggerRecordData  {

  mergeTriggerRecords;
  fieldNames;

  constructor(mergeTriggerEmailRecordData: Set<MergeTriggerEmailRecordData>) {
    this.mergeTriggerRecords = Array.from(mergeTriggerEmailRecordData);
    this.fieldNames = FIELD_NAMES;
  }
}
