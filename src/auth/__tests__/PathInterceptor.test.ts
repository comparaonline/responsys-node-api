import { expect } from 'chai';
import * as express from 'express';
import { AuthCache } from '../AuthCache';
import { PathInterceptor } from '../PathInterceptor';
import * as rest from 'rest';

describe('PathInterceptor', () => {

  const AUTH_DATA = {
    authToken: 'TEST',
    issuedAt: 1510880256844,
    endPoint: 'http://test_endpoint'
  };
  const PATH = '/test_path';
  const COMPLETE_PATH = AUTH_DATA.endPoint + PATH;
  
  const interceptor = new PathInterceptor().get();
  const client = rest.wrap(interceptor);
  const authCache = new AuthCache();

  before(() => {
    authCache.clear();
  });

  afterEach(() => {
    authCache.clear();
  });

  it('should add the path from AuthConfig when missing', (done) => {
    authCache.set(AUTH_DATA);
    expect(authCache.getEndpoint()).to.equal(AUTH_DATA.endPoint);
    
    client(PATH).then(
      (result) => { },
      (error) => {
        expect(error.request.path).to.equal(COMPLETE_PATH);
        done();
      });
  });

  it('should leave unchanged when endpoint already contained in path', (done) => {
    authCache.set(AUTH_DATA);
    expect(authCache.getEndpoint()).to.equal(AUTH_DATA.endPoint);
    
    client(COMPLETE_PATH).then(
      (result) => { },
      (error) => {
        expect(error.request.path).to.equal(COMPLETE_PATH);
        done();
      });
  });

  it('should through an error if authentication not loaded.', (done) => {
    expect(authCache.isLoaded()).to.be.false;

    client(PATH).then(null, (error) => {
      expect(error.error).to.equal('Authentication Missing: Cannot add endpoint to path.');
      done();
    });
  });
});