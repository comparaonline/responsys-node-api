import * as queryString from 'querystring';
import { Request } from '../commons/Request';

const DEFAULT_TYPE = 'password';

export class AuthenticationRequest extends Request {

  constructor(endpoint: string) {
    
    const body = {
      user_name: process.env.RESPONSYS_USERNAME,
      password: process.env.RESPONSYS_PASSWORD,
      auth_type: DEFAULT_TYPE
    };

    const entity = queryString.stringify(body);

    super(entity, endpoint);
  }
}
