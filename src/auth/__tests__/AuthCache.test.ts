import { expect } from 'chai';
import { AuthCache } from '../AuthCache';

const RESPONSE = {
  authToken: 'E9WpDeXSHY5cXKinEHSZUUqclZMbbOutxEBf1b23ieyRpEzltg',
  issuedAt: 1510880256844,
  endPoint: 'https://api5-009.responsys.net'
};

const TEST_RESPONSE = {
  authToken: 'auth-token',
  issuedAt: 1234567890,
  endPoint: 'endpoint'
};

beforeEach(() => {
  new AuthCache().set(RESPONSE);
});

afterEach(() => {
  new AuthCache().set(RESPONSE);
});

describe('AuthCache', () => {
  it('should set an authentication response', () => {
    const authCache = new AuthCache();
    authCache.set(TEST_RESPONSE);

    expect(authCache.getToken()).to.equal(TEST_RESPONSE.authToken);
    expect(authCache.getEndpoint()).to.equal(TEST_RESPONSE.endPoint);
    expect(authCache.getIssued()).to.equal(TEST_RESPONSE.issuedAt);
  });

  it('should restore an authentication response from cache', () => {
    const authCache = new AuthCache();
    const token = authCache.getToken();
    expect(token).to.equal(RESPONSE.authToken);
  });

  it('should restore a previously persisted endpoint', () => {
    const authCache = new AuthCache();
    const endpoint = authCache.getEndpoint();
    expect(endpoint).to.equal(RESPONSE.endPoint);
  });

  it('should restore a previously persisted issued date', () => {
    const authCache = new AuthCache();
    const issued = authCache.getIssued();
    expect(issued).to.equal(RESPONSE.issuedAt);
  });

  it('should remove all values from authentication cache', () => {
    const authCache = new AuthCache();
    authCache.clear();

    expect(authCache.getToken()).to.be.undefined;
    expect(authCache.getEndpoint()).to.be.undefined;
    expect(authCache.getIssued()).to.be.undefined;
  });

  it('should return true or false if cache is loaded', () => {
    const authCache = new AuthCache();
    expect(authCache.isLoaded()).to.be.true;
    authCache.clear();
    expect(authCache.isLoaded()).to.be.false;
  });
});
