import { expect } from 'chai';
import * as config from 'config';
import { AuthCache } from '../AuthCache';

const DEFAULT = {
  authToken: config.get('refresh.authToken'),
  issuedAt: config.get('refresh.issuedAt'),
  endPoint: config.get('refresh.endPoint')
};

const TEST = {
  authToken: 'auth-token',
  issuedAt: 1234567890,
  endPoint: 'endpoint'
};

describe('AuthCache', () => {

  const authCache = new AuthCache();

  beforeEach(() => {
    authCache.clear();
    authCache.set(DEFAULT);
  });

  it('should set an authentication response', () => {
    authCache.set(TEST);

    expect(authCache.getToken()).to.equal(TEST.authToken);
    expect(authCache.getEndpoint()).to.equal(TEST.endPoint);
    expect(authCache.getIssued()).to.equal(TEST.issuedAt);
  });

  it('should restore an authentication response from cache', () => {
    const token = authCache.getToken();
    expect(token).to.equal(DEFAULT.authToken);
  });

  it('should restore a previously persisted endpoint', () => {
    const endpoint = authCache.getEndpoint();
    expect(endpoint).to.equal(DEFAULT.endPoint);
  });

  it('should restore a previously persisted issued date', () => {
    const issued = authCache.getIssued();
    expect(issued).to.equal(DEFAULT.issuedAt);
  });

  it('should remove all values from authentication cache', () => {
    authCache.clear();

    expect(authCache.getToken()).to.be.undefined;
    expect(authCache.getEndpoint()).to.be.undefined;
    expect(authCache.getIssued()).to.be.undefined;
  });

  it('should return true or false if cache is loaded', () => {
    expect(authCache.isLoaded()).to.be.true;
    authCache.clear();
    expect(authCache.isLoaded()).to.be.false;
  });
});
