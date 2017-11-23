import * as datastore from 'node-persist';

const DEFAULT_STORE = 'ResponsysAuthCache.db';

const KEY_TOKEN = 'last_token';
const KEY_ENDPOINT = 'last_endpoint';
const KEY_ISSUED_AT = 'last_issued_at';

export class AuthCache {

  constructor (dbPath: string = DEFAULT_STORE) {
    datastore.initSync();
  }

  set(authResponse) {
    datastore.setItemSync(KEY_TOKEN, authResponse.authToken);
    datastore.setItemSync(KEY_ENDPOINT, authResponse.endPoint);
    datastore.setItemSync(KEY_ISSUED_AT, authResponse.issuedAt);
  }

  getToken(): string {
    return datastore.getItemSync(KEY_TOKEN);
  }

  getEndpoint(): string {
    return datastore.getItemSync(KEY_ENDPOINT);
  }

  getIssued(): string {
    return datastore.getItemSync(KEY_ISSUED_AT);
  }

  isLoaded(): boolean {
    return this.getToken() != null;
  }

  clear(): void {
    datastore.clearSync();
  }

}
