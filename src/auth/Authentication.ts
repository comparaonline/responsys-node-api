import * as rest from 'rest';
import { AuthenticationRequest } from './AuthenticationRequest';
import { RefreshRequest } from './RefreshRequest';
import { AuthInterceptor } from './AuthenticationInterceptor';
import * as errorCode from 'rest/interceptor/errorCode';

export class Authentication {

  private authInterceptor = new AuthInterceptor().get();

  /**
   * Signin takes all necessary parameters to handle authentication. 
   * The endpoint will be the one assigned to the company by Responsis,
   * likely one of https://login[2,5].responsys.net/rest/api/v1.3/auth/token
   *
   * Will eventually return an object with the following information:
   * {
   *   "authToken" : <AUTH_TOKEN>,
   *   "issuedAt" :  <TIMESTAMP> ,
   *   "endPoint" : <ENDPOINT_URI>
   * }
   * The authToken must be used for future requests to the API using the endPoint
   * URL provided. This token expires after at most 2 hours.
   * 
   * @param authRequest Encapsulates username, password and endpoint.
   */
  public signin(authRequest: AuthenticationRequest): rest.ResponsePromise {
    const client = rest.wrap(this.authInterceptor);

    return client(authRequest);
  }

  /**
   * Refreshes the token by passing a previously valid token.
   * Tokens expire every 2 hours.
   * Will eventually return the same values as @method signin
   * @param authRefresh Encapsulates token and endpoint.
   */
  public refresh(authRefresh: RefreshRequest): rest.ResponsePromise {
    const client = rest
      .wrap(errorCode)
      .wrap(this.authInterceptor);
      
    return client(authRefresh);
  }
}
