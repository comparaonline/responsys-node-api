import * as config from 'config';

const ERROR = 'Missing configuration parameters for Responsys connection. ';

export class AuthConfig {
  static endpoint;
  static username;
  static password;

  static init(endpoint?: string, username?: string, password?: string) {
    if (process.env.NODE_ENV === 'test') {
      this.endpoint = config.get('RESPONSYS_AUTH_ENDPOINT');
      this.username = config.get('RESPONSYS_USERNAME');
      this.password = config.get('RESPONSYS_PASSWORD');
    } else {
      this.endpoint = endpoint || process.env.RESPONSYS_AUTH_ENDPOINT;
      this.username = username || process.env.RESPONSYS_USERNAME;
      this.password = password || process.env.RESPONSYS_PASSWORD;
    }

    if (!this.password || !this.username || !this.endpoint) {
      throw new Error(ERROR + 
        `Endpoint: ${this.endpoint} Username: ${this.username} No Password: ${!this.password}`);
    }
  }
}

AuthConfig.init();
