import * as queryString from 'querystring';
import * as config from 'config';
import { Request } from '../commons/Request';
import { AuthCache } from './AuthCache';
import {
  CONTENT_TYPE_URLENCODED,
  TYPE_TOKEN
} from '../Constants';

const URL = config.get('auth.endPoint') as string;

export class RefreshRequest extends Request {

  constructor(previousToken?: string) {
    const authCache = new AuthCache();
    const token = previousToken ? previousToken : authCache.getToken();

    const header = {
      'content-type': CONTENT_TYPE_URLENCODED,
      Authorization: token
    };

    const entity = queryString.stringify({
      auth_type: TYPE_TOKEN
    });

    super(entity, URL, header);
  }
}
