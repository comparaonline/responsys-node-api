import { expect } from 'chai';
import { Recipient } from '../Recipient';
import * as queryString from 'querystring';
import { RecipientData } from '../RecipientData';
import { AuthCache } from '../../auth/AuthCache';
import { HttpRecorder } from 'nock-utils';
import { OptionalData } from '../OptionalData';
import { ListName } from '../ListName';
import { TriggerEventMessageRequest } from '../TriggerEventMessageRequest';
import { TriggerEventMessage } from '../TriggerEventMessage';

const EVENT_NAME = 'test';
const CASSETTE_PATH = `${__dirname}/cassettes/triggerEventMessageCassette.json`;

const recorder = new HttpRecorder(CASSETTE_PATH);

describe('TriggerEventMessage', () => {

  const EVENT_NAME = 'test';
  const authCache = new AuthCache();

  before(() => {
    authCache.clear();
    recorder.start();
  });

  after(() => {
    authCache.clear();
    recorder.stop();
  });

  it('should not send an email with list name', async () => {
    const recipients = new Set<RecipientData>();

    const recipient1 = new Recipient();
    recipient1.emailAddress = 'tsuarez@comparaonline.com';
    recipient1.emailFormat = 'HTML_FORMAT';
    recipient1.mobileNumber = '951349394';

    const optionalData1 = new OptionalData('FIST_NAME', 'name');
    const optionalData2 = new OptionalData('LAST_NAME', 'last name');

    const optionalData = new Set<OptionalData>();
    optionalData.add(optionalData1);
    optionalData.add(optionalData2);

    const data = new RecipientData(recipient1, optionalData);
    recipients.add(data);

    const eventName = queryString.escape(EVENT_NAME);
    const message = new TriggerEventMessageRequest(
      recipients,
      {
        eventNumberDataMapping: '',
        eventDateDataMapping: '',
        eventStringDataMapping: ''
      },
      eventName);

    const trigger = new TriggerEventMessage();

    const result = await trigger.send(message);
    const resultArray = JSON.parse(result.entity);
    expect(result.status.code).to.equal(200);

    resultArray.forEach((element) => {
      expect(element.success).to.be.false;
      expect(element.recipientId).to.eql(-1);
    });
  });

  it('should send an email with listName', async () => {
    const recipients = new Set<RecipientData>();

    const recipient1 = new Recipient();
    recipient1.emailAddress = 'tsuarez@comparaonline.com';
    recipient1.emailFormat = 'HTML_FORMAT';
    recipient1.mobileNumber = '951349394';

    const listName = new ListName();
    listName.objectName = 'CONTACTS_LIST';
    listName.folderName = 'CONTACTS_LIST';
    recipient1.listName = listName;

    const optionalData1 = new OptionalData('FIST_NAME', 'name');
    const optionalData2 = new OptionalData('LAST_NAME', 'last name');

    const optionalData = new Set<OptionalData>();
    optionalData.add(optionalData1);
    optionalData.add(optionalData2);

    const data = new RecipientData(recipient1, optionalData);
    recipients.add(data);

    const eventName = queryString.escape(EVENT_NAME);
    const message = new TriggerEventMessageRequest(
      recipients,
      {
        eventNumberDataMapping: '',
        eventDateDataMapping: '',
        eventStringDataMapping: ''
      },
      eventName);

    const trigger = new TriggerEventMessage();

    const result = await trigger.send(message);
    const resultArray = JSON.parse(result.entity);

    expect(result.status.code).to.equal(200);

    resultArray.forEach((element) => {
      expect(element.errorMessage).to.be.null;
      expect(element.success).to.be.true;
      expect(element.recipientId).to.be.gt(0);
    });
  });
});
