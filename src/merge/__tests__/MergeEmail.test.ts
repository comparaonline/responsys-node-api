import * as config from 'config';
import { expect } from 'chai';
import { MergeEmail } from '../MergeEmail';
import { MergeTriggerRecordData } from '../MergeTriggerRecordData';
import { MergeTriggerEmailRequest } from '../MergeTriggerEmailRequest';
import * as queryString from 'querystring';
import { MergeTriggerEmailRecordData } from '../MergeTriggerEmailRecordData';
import { AuthCache } from '../../auth/AuthCache';
import { HttpRecorder } from 'nock-utils';
import { OptionalData } from '../../send/OptionalData';
import { INVALID_REQUEST_PARAMETERS, INVALID_PARAMETER } from '../../Constants';

const CAMPAIGN = config.get('campaign') as string;
const CASSETTE_PATH = `${__dirname}/cassettes/mergeEmailCassette.json`;

const recorder = new HttpRecorder(CASSETTE_PATH);

describe('MergeEmail', () => {
  const authCache = new AuthCache();

  before(() => {
    authCache.clear();
    recorder.start();
  });

  after(() => {
    authCache.clear();
    recorder.stop();
  });

  it('should add an email to campaign', async () => {
    const recordDatas = new Set<MergeTriggerEmailRecordData>();

    const fieldValues = ['suarezcumare@gmail.com', 'suarezcumare'];

    const optionalData1 = new OptionalData('FIRST_NAME', 'Alexander');
    const optionalData2 = new OptionalData('LAST_NAME', 'Cumare');

    const optionalData = new Set<OptionalData>();
    optionalData.add(optionalData1);
    optionalData.add(optionalData2);

    const data = new MergeTriggerEmailRecordData(fieldValues, optionalData);
    recordDatas.add(data);

    const mergeTriggerRecordData = new MergeTriggerRecordData(recordDatas);

    const campaign = queryString.escape(CAMPAIGN);
    const emails = new MergeTriggerEmailRequest(mergeTriggerRecordData, campaign);

    const merge = new MergeEmail();
    const result = await merge.send(emails);
    const resultArray = JSON.parse(result.entity);

    expect(result.status.code).to.equal(200);

    resultArray.forEach((element) => {
      expect(element.errorMessage).to.be.null;
      expect(element.success).to.be.true;
      expect(element.recipientId).to.be.gt(0);
    });
  });

  it('should return error for a invalid email address', async () => {
    const recordDatas = new Set<MergeTriggerEmailRecordData>();

    const fieldValues = ['email@.com', 'email'];

    const optionalData1 = new OptionalData('FIST_NAME', 'first');
    const optionalData2 = new OptionalData('LAST_NAME', 'name');

    const optionalData = new Set<OptionalData>();
    optionalData.add(optionalData1);
    optionalData.add(optionalData2);

    const data = new MergeTriggerEmailRecordData(fieldValues, optionalData);
    recordDatas.add(data);

    const mergeTriggerRecordData = new MergeTriggerRecordData(recordDatas);

    const campaign = queryString.escape(CAMPAIGN);
    const emails = new MergeTriggerEmailRequest(mergeTriggerRecordData, campaign);

    const merge = new MergeEmail();
    const result = await merge.send(emails);
    const resultArray = JSON.parse(result.entity);

    expect(resultArray.errorCode).to.contain(INVALID_PARAMETER);
    expect(resultArray.title).to.contain(INVALID_REQUEST_PARAMETERS);

  });
});
