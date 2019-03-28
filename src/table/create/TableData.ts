import { Field } from './FieldTypes';

export class TableData  {
  table: {};
  fields: any;
  primaryKeys: string[];

  constructor(objectName: string, fields: Set<Field>, primaryKeys: string[]) {
    this.table = { objectName };
    this.primaryKeys = primaryKeys;
    if (fields) this.fields = Array.from(fields);
  }
}
