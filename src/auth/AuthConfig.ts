import * as config from 'config';
import { ERROR } from '../Constants';


export class AuthConfig {
  static endpoint;
  static username;
  static password;

  static init(endpoint?: string, username?: string, password?: string) {

    this.setEndpoint(endpoint);
    this.setPassword(password);
    this.setUsername(username);

    if (this.isDataValid()) {
      throw new Error(ERROR +
        `Endpoint: ${this.endpoint} Username: ${this.username} No Password: ${!this.password}`);
    }
  }

  static setEndpoint(endpoint): void {
    this.endpoint =
      endpoint || config.get('auth.endPoint') || process.env.RESPONSYS_AUTH_ENDPOINT;
  }

  static setUsername(username): void {
    this.username =
      username || config.get('auth.username') || process.env.RESPONSYS_USERNAME;
  }

  static setPassword(password): void {
    this.password =
      password || config.get('auth.password') || process.env.RESPONSYS_PASSWORD;
  }

  static isDataValid() : boolean {
    return (!this.password || !this.username || !this.endpoint);
  }
}
