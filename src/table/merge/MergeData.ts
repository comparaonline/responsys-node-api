

export class MergeData  {
  fieldNames: string[];
  records: string[][];
  mapTemplateName: string|null;

  constructor(fieldNames: string[], records: Set<string[]>) {
    this.fieldNames = fieldNames.map(x => x.toUpperCase());
    this.mapTemplateName = null;
    if (records) this.records = Array.from(records);
  }
}
