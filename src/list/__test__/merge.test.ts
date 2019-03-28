import { expect } from 'chai';
import { HttpRecorder } from 'nock-utils';
import * as queryString from 'querystring';
import { AuthCache } from '../../auth/AuthCache';
import { ListMergeRequest } from '../merge/MergeRequest';
import { ListMergeMessage } from '../merge/MergeMessage';
import { MergeData } from '../../table/merge/MergeData';

const LIST_NAME = 'api_list_example';
const CASSETTE_PATH = `${__dirname}/cassettes/mergeList.json`;
const currentDate = '2019-03-22T11:54:40.531Z';
const recorder = new HttpRecorder(CASSETTE_PATH);

describe('Merge List', () => {

  const authCache = new AuthCache();

  before(() => {
    authCache.clear();
    recorder.start();
  });

  after(() => {
    authCache.clear();
    recorder.stop();
  });

  it('should merge a table', async () => {
    const fieldNames = ['EMAIL_ADDRESS_', 'BIRTHDATE'];
    const records = new Set<string[]>();

    const record1 = ['prueba@comparaonline.com', currentDate];
    const record2 = ['prueba2@comparaonline.com', currentDate];
    records.add(record1);
    records.add(record2);

    const mergeData = new MergeData(fieldNames, records);

    const message = new ListMergeRequest(mergeData, LIST_NAME);
    const trigger = new ListMergeMessage();

    const result = await trigger.send(message);
    const resultResponse = JSON.parse(result.entity);
    expect(result.status.code).to.equal(200);
  });

  it('merge table with matchColumn', async () => {
    const fieldNames = ['EMAIL_ADDRESS_', 'BIRTHDATE'];
    const records = new Set<string[]>();
    const matchColumn = 'EMAIL_ADDRESS_';

    const record1 = ['prueba@comparaonline.com', currentDate];
    records.add(record1);

    const mergeData = new MergeData(fieldNames, records);

    const message = new ListMergeRequest(mergeData, LIST_NAME, matchColumn);
    const trigger = new ListMergeMessage();

    const result = await trigger.send(message);
    const resultResponse = JSON.parse(result.entity);
    expect(result.status.code).to.equal(200);

  });

});
