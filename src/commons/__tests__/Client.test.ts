import * as rest from 'rest';
import * as express from 'express';
import { Client } from '../Client';
import { Request } from '../Request';
import { expect } from 'chai';
import { error } from 'util';

const TEST_URL = 'http://127.0.0.1:3000';
const TEST_RESULT = 'result_ok';
const TEST_HEADER = {
  'content-type': 'application/json'
};

let request;
let server;
let client;
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
  call(request: any) {
    return super.call(request);
  }
}

describe('Client', () => {

  beforeEach(() => {
    errorCount = 0;
    client = new TestClient();
    request = new Request('', TEST_URL, TEST_HEADER, 'GET');
  });
  
  afterEach(() => {
    server.close();
  });

  it('should stop retrying requests and timeout after 3 seconds', async () => {
    server = startServer(10);
    
    try {
      const result = await client.call(request);
    } catch (error) {
      expect(error.error).to.equal('timeout');
    }
  });

  it('should retry requests when failed', async () => {
    server = startServer(2);
    const result = await client.call(request);
    
    expect(result.status.code).to.equal(200);
    expect(result.entity).to.equal(TEST_RESULT);
  });

});
