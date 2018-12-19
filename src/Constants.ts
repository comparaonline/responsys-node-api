export const TYPE_PASSWORD = 'password';

export const ERROR = 'Missing configuration parameters for Responsys connection. ';
export const KEY_TOKEN = 'last_token';
export  const KEY_ENDPOINT = 'last_endpoint';
export const KEY_ISSUED_AT = 'last_issued_at';
export const DEFAULT_STORE = 'ResponsysAuthCache.db';

export const CONTENT_TYPE_URLENCODED = 'application/x-www-form-urlencoded';
export const CONTENT_TYPE_JSON = 'application/json';
export const TYPE_TOKEN = 'token';

export const CLIENT_OPTIONS_RETRY = { initial: 100, multiplier: 2 };
export const CLIENT_OPTIONS_TIME_OUT = 60000;
export const CLIENT_OPTIONS_ERROR = { code: 404 };

export const HTTP_METHOD_POST = 'POST';

export const INVALID_REQUEST_PARAMETERS = 'Invalid request parameters';

export const INVALID_PARAMETER = 'INVALID_PARAMETER';

export const BASE_URL = '/rest/api/v1.3';

export const MERGER_RULE = {
  htmlValue: 'H',
  matchColumnName1: 'EMAIL_ADDRESS_',
  matchColumnName2: null,
  optoutValue: 'O',
  insertOnNoMatch: true,
  defaultPermissionStatus: 'OPTIN',
  rejectRecordIfChannelEmpty: 'E',
  optinValue: 'I',
  textValue: 'T',
  matchOperator: 'NONE'
};

export const FIELD_NAMES = [
  'EMAIL_ADDRESS_',
  ''
];
