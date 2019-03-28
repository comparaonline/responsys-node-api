export enum TypeFields {
  CHAR = 'CHAR',
  SHORT_STRING = 'STR25',
  SMALL_STRING = 'STR100',
  MEDIA_STRING = 'STR500',
  LARGE_STRING = 'STR4000',
  NUMBER =  'NUMBER',
  INTEGER =  'INTEGER',
  TIMESTAMP = 'TIMESTAMP'
}

export class Field {
  fieldName: string;
  fieldType: string;
  dataExtractionKey: boolean;
}
