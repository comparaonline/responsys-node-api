import { expect } from 'chai';
import { AuthCache } from '../AuthCache';

const RESPONSE = {
  authToken: 'E9WpDeXSHY5cXKinEHSZUUqclZMbbOutxEBf1b23ieyRpEzltg',
  issuedAt: 1510880256844,
  endPoint: 'https://api5-009.responsys.net'
};

describe('AuthCache', () => {
  it('should set an authentication response', (done) => {
    const authCache = new AuthCache();

    authCache.set(RESPONSE);
    done();
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
});
