import * as rest from 'rest';
import * as express from 'express';
import { Client } from '../Client';
import { Options } from './../Options';
import { Request } from '../Request';
import { expect } from 'chai';
import { error } from 'util';
import { AuthCache } from '../../auth/AuthCache';

const TEST_URL = 'http://127.0.0.1:3000';
const TEST_RESULT = 'result_ok';
const TEST_HEADER = {
  'content-type': 'application/json'
};

const RESPONSE = {
  authToken: 'E9WpDeXSHY5cXKinEHSZUUqclZMbbOutxEBf1b23ieyRpEzltg',
  issuedAt: 1510880256844,
  endPoint: 'http://127.0.0.1:3000'
};

let request;
let server;
let errorCount;

function startServer(fails: number) {
  const app = express();
  app.get('/', (req, res) => {
    if (errorCount >= fails) {
      errorCount = 0;
      return res.send(TEST_RESULT);
    }
    errorCount += 1;
    return res.status(500).send('error');
  });

  return app.listen(3000, () => { });
}

class TestClient extends Client {
  constructor (options?: Options) {
    super(options);
  }

  call(request: any, options?: Options) {
    return super.call(request);
  }
}

describe('Client', () => {
  const authCache = new AuthCache();

  after(() => {
    authCache.clear();
  });

  beforeEach(() => {
    authCache.clear();
    authCache.set(RESPONSE);
    errorCount = 0;
    request = new Request('', TEST_URL, TEST_HEADER, 'GET');
  });

  afterEach((done) => {
    server.close(done);
  });

  it('should retry requests when failed', (done) => {
    server = startServer(2);
    const client = new TestClient();
    client.call(request).then((result) => {
      expect(result.status.code).to.equal(200);
      expect(result.entity).to.equal(TEST_RESULT);
      done();
    });
  });

  it('should stop retrying requests after timeout', (done) => {
    server = startServer(10);

    const requestOptions = new Options();
    requestOptions.timeoutOptions.timeout = 100;

    const client = new TestClient(requestOptions);

    client.call(request).then(
      (result) => {
        expect(result.error).to.equal('timeout');
        expect(result.request.canceled).to.be.true;
        done();
      });
  });
});
