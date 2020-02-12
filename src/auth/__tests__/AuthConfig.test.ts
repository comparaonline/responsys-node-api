import * as config from 'config';
import { AuthConfig } from '../AuthConfig';
import { expect } from 'chai';
import * as fs from 'fs';

const PATH_TEST = `${__dirname}/../../../config/test.json`;

describe('AuthConfig', () => {

  afterEach(() => {
    process.env.NODE_ENV = 'test';
    AuthConfig.init();
  });

  it('should contain username, password and endpoint attributes', () => {
    AuthConfig.init();

    expect(AuthConfig).to.have.property('username');
    expect(AuthConfig).to.have.property('password');
    expect(AuthConfig).to.have.property('endpoint');
  });

  it('should get authentication settings from config file when testing', () => {
    const username = AuthConfig.username;
    const password = AuthConfig.password;
    const endpoint = AuthConfig.endpoint;

    const testConfig = JSON.parse(fs.readFileSync(PATH_TEST, 'utf8'));

    expect(username).to.equal(testConfig.auth.username);
    expect(password).to.equal(testConfig.auth.password);
    expect(endpoint).to.equal(testConfig.auth.endPoint);
  });

  it('should get authentication settings from envvars in production', () => {
    const PRODUCTION = 'production';
    process.env.NODE_ENV = PRODUCTION;

    AuthConfig.init();

    expect(process.env.NODE_ENV).to.equal(PRODUCTION);
    expect(AuthConfig.endpoint).to.equal(config.get('auth.endPoint'));
    expect(AuthConfig.username).to.equal(config.get('auth.username'));
    expect(AuthConfig.password).to.equal(config.get('auth.password'));
  });

  it('should allow to override configuration with params in production', () => {
    const endpoint = 'test-endpoint';
    const username = 'test-username';
    const password = 'test-password';

    delete process.env.NODE_ENV;

    AuthConfig.init(endpoint, username, password);

    expect(AuthConfig.endpoint).to.equal(endpoint);
    expect(AuthConfig.username).to.equal(username);
    expect(AuthConfig.password).to.equal(password);
  });

});
