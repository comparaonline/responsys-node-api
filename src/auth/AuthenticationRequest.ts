import * as queryString from 'querystring';
import { Request } from '../commons/Request';
import { AuthConfig } from './AuthConfig';

const DEFAULT_TYPE = 'password';

export class AuthenticationRequest extends Request {

  constructor() {
    const endpoint = AuthConfig.endpoint;
    
    const body = {
      user_name: AuthConfig.username,
      password: AuthConfig.password,
      auth_type: DEFAULT_TYPE
    };

    const entity = queryString.stringify(body);

    super(entity, endpoint);
  }
}
