import { expect } from 'chai';
import { HttpRecorder } from 'nock-utils';
import * as queryString from 'querystring';
import { AuthCache } from '../../auth/AuthCache';
import { MergeData } from '../merge/MergeData';
import { TableMergeRequest } from '../merge/MergeRequest';
import { TableMergeMessage } from '../merge/MergeMessage';

const TABLE_NAME = 'test_api_responsys';
const TABLE_NAME_INVALID = 'test_api_responsys_invalid';
const FOLDER_NAME =  queryString.escape('test_api');
const CASSETTE_PATH = `${__dirname}/cassettes/mergeTable.json`;
const currentDate = '2019-03-22T11:54:40.531Z';
const recorder = new HttpRecorder(CASSETTE_PATH);

describe('Merge Table', () => {

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
    const fieldNames = ['offerId', 'offerName', 'offerEmail', 'offerDate'];
    const records = new Set<string[]>();

    const record1 = ['1', 'test3', 'prueba@comparaonline.com', currentDate];
    const record2 = ['2', 'test4', 'prueba2@comparaonline.com', currentDate];
    records.add(record1);
    records.add(record2);

    const mergeData = new MergeData(fieldNames, records);

    const message = new TableMergeRequest(mergeData, FOLDER_NAME, TABLE_NAME);
    const trigger = new TableMergeMessage();

    const result = await trigger.send(message);
    const resultResponse = JSON.parse(result.entity);
    expect(result.status.code).to.equal(200);
  });

  it('should not merge a table', async () => {
    const fieldNames = ['offerId', 'offerName', 'offerEmail', 'offerDate'];
    const records = new Set<string[]>();

    const record1 = ['1w', 'test1', 'prueba@comparaonline.com', currentDate];
    records.add(record1);

    const mergeData = new MergeData(fieldNames, records);

    const message = new TableMergeRequest(mergeData, FOLDER_NAME, TABLE_NAME);
    const trigger = new TableMergeMessage();

    const result = await trigger.send(message);
    const resultResponse = JSON.parse(result.entity);
    expect(result.status.code).to.equal(200);

    resultResponse.recordData.records.some((element) => {
      expect(element).to.not.equal('');
    });

  });

  it('should not merge a table with PK and marchColumnNames', async () => {
    const fieldNames = ['offerId', 'offerName', 'offerEmail', 'offerDate'];
    const records = new Set<string[]>();

    const record1 = ['1', 'test1', 'prueba@comparaonline.com', currentDate];
    records.add(record1);

    const mergeData = new MergeData(fieldNames, records);

    const message = new TableMergeRequest(mergeData, FOLDER_NAME, TABLE_NAME, ['offerId']);
    const trigger = new TableMergeMessage();

    const result = await trigger.send(message);
    const resultResponse = JSON.parse(result.entity);

    expect(result.status.code).to.equal(400);

    expect(resultResponse.errorCode).to.not.null;
    expect(resultResponse.detail).to.not.null;

  });


});
