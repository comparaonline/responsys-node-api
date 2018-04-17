import * as queryString from 'querystring';
import { Request } from '../commons/Request';
import { AuthConfig } from './AuthConfig';
import { TYPE_PASSWORD } from './../Constants';


export class AuthenticationRequest extends Request {

  constructor() {
    const endpoint = AuthConfig.endpoint;

    const body = {
      user_name: AuthConfig.username,
      password: AuthConfig.password,
      auth_type: TYPE_PASSWORD
    };

    const entity = queryString.stringify(body);

    super(entity, endpoint);
  }
}
