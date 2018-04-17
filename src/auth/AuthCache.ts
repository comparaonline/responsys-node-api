import * as datastore from 'node-persist';
import {
  KEY_ENDPOINT,
  KEY_TOKEN,
  KEY_ISSUED_AT,
  DEFAULT_STORE
} from '../Constants';

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
