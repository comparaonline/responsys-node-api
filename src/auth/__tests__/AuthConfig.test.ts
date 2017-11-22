import { AuthConfig } from '../AuthConfig';
import { expect } from 'chai';
import * as fs from 'fs';
import { AuthCache } from '../AuthCache';

const PATH_TEST = `${__dirname}/../../../config/test.json`;

describe('AuthConfig', () => {

  afterEach(() => {
    process.env.NODE_ENV = 'test';
    AuthConfig.init();
  });

  it('should contain username, password and endpoint attributes', () => {
    expect(AuthConfig).to.have.property('username');
    expect(AuthConfig).to.have.property('password');
    expect(AuthConfig).to.have.property('endpoint');
  });

  it('should get authentication settings from config file when testing', () => {
    const username = AuthConfig.username;
    const password = AuthConfig.password;
    const endpoint = AuthConfig.endpoint;

    const testConfig = JSON.parse(fs.readFileSync(PATH_TEST, 'utf8'));

    expect(username).to.equal(testConfig.RESPONSYS_USERNAME);
    expect(password).to.equal(testConfig.RESPONSYS_PASSWORD);
    expect(endpoint).to.equal(testConfig.RESPONSYS_AUTH_ENDPOINT);
  });

  it('should get authentication settings from envvars in production', () => {
    const endpoint = 'test-endpoint';
    const username = 'test-username';
    const password = 'test-password';
    
    delete process.env.NODE_ENV;

    process.env.RESPONSYS_AUTH_ENDPOINT = endpoint;
    process.env.RESPONSYS_USERNAME = username;
    process.env.RESPONSYS_PASSWORD = password;

    AuthConfig.init();

    expect(AuthConfig.endpoint).to.equal(endpoint);
    expect(AuthConfig.username).to.equal(username);
    expect(AuthConfig.password).to.equal(password);

    delete process.env.RESPONSYS_AUTH_ENDPOINT;
    delete process.env.RESPONSYS_USERNAME;
    delete process.env.RESPONSYS_PASSWORD;
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

  it('should throw exception when missing settings in production', () => {
    const endpoint = 'test-endpoint';
    const username = 'test-username';
    const password = 'test-password';
    
    delete process.env.NODE_ENV;

    expect(() => AuthConfig.init()).to.throw(Error);
  });
});
