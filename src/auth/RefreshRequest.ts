import * as queryString from 'querystring';
import { Request } from '../commons/Request';
import { AuthCache } from './AuthCache';

const DEFAULT_TYPE = 'token';

/** 
 * TODO 
 * Move hardcoded path to configuration.
 */
const URL = 'https://login5.responsys.net/rest/api/v1.3/auth/token';

export class RefreshRequest extends Request {

  constructor(previousToken?: string) {
    const authCache = new AuthCache();
    const token = previousToken ? previousToken : authCache.getToken();

    const header = {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: token
    };

    const entity = queryString.stringify({
      auth_type: DEFAULT_TYPE
    });
    
    super(entity, URL, header);
  }
}
