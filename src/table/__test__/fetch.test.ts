import { expect } from 'chai';
import { HttpRecorder } from 'nock-utils';
import * as queryString from 'querystring';
import { AuthCache } from '../../auth/AuthCache';
import { TableFetchRequest } from '../fetch/Request';
import { TableFetchMessage } from '../fetch/Message';

const TABLE_NAME = 'test_api_responsys';
const FOLDER_NAME =  queryString.escape('test_api');
const CASSETTE_PATH = `${__dirname}/cassettes/fetchTable.json`;

const recorder = new HttpRecorder(CASSETTE_PATH);

describe('Fetch Table', () => {

  const authCache = new AuthCache();

  before(() => {
    authCache.clear();
    recorder.start();
  });

  after(() => {
    authCache.clear();
    recorder.stop();
  });

  it('should fetch a table', async () => {

    const message = new TableFetchRequest(TABLE_NAME, FOLDER_NAME);
    const trigger = new TableFetchMessage();

    const result = await trigger.send(message);
    expect(result.status.code).to.equal(200);
  });

});
