import { expect } from 'chai';
import { TriggerEmailMessage } from '../TriggerEmailMessage';
import { Recipient } from '../Recipient';
import { TriggerEmailMessageRequest } from '../TriggerEmailMessageRequest';
import * as queryString from 'querystring';
import { RecipientData } from '../RecipientData';
import { AuthCache } from '../../auth/AuthCache';
import { HttpRecorder } from 'nock-utils';
import { OptionalData } from '../OptionalData';
import { ListName } from '../ListName';

const CAMPAIGN = 'test';
const CASSETTE_PATH = `${__dirname}/cassettes/triggerEmailMessageCassette.json`;

const recorder = new HttpRecorder(CASSETTE_PATH);

describe('TriggerEmailMessage', () => {

  const campaign = queryString.escape(CAMPAIGN);
  const authCache = new AuthCache();

  before(() => {
    authCache.clear();
    recorder.start();
  });

  after(() => {
    authCache.clear();
    recorder.stop();
  });

  it('should send an email', async () => {
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

    const campaign = queryString.escape(CAMPAIGN);
    const message = new TriggerEmailMessageRequest(recipients, campaign);

    const trigger = new TriggerEmailMessage();

    const result = await trigger.send(message);
    const resultArray = JSON.parse(result.entity);
    expect(result.status.code).to.equal(200);

    resultArray.forEach((element) => {
      expect(element.errorMessage).to.be.null;
      expect(element.success).to.be.true;
      expect(element.recipientId).to.be.gt(0);
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

    const campaign = queryString.escape(CAMPAIGN);
    const message = new TriggerEmailMessageRequest(recipients, campaign);

    const trigger = new TriggerEmailMessage();

    const result = await trigger.send(message);
    const resultArray = JSON.parse(result.entity);

    expect(result.status.code).to.equal(200);

    resultArray.forEach((element) => {
      expect(element.errorMessage).to.be.null;
      expect(element.success).to.be.true;
      expect(element.recipientId).to.be.gt(0);
    });
  });

  it('should return NO_RECIPIENT_FOUND error for a non existing email address', async () => {
    const recipients = new Set<RecipientData>();

    const recipient1 = new Recipient();
    recipient1.emailAddress = 'emailtest@comparaonline.com';

    const data = new RecipientData(recipient1);
    recipients.add(data);

    const trigger = new TriggerEmailMessage();
    const message = new TriggerEmailMessageRequest(recipients, campaign);

    const result = await trigger.send(message);
    const results = JSON.parse(result.entity);

    expect(results).to.have.lengthOf(1);

    const error = results[0];
    expect(error.success).to.be.false;
    expect(error.recipientId).to.equal(-1);
    expect(error.errorMessage).to.contain('NO_RECIPIENT_FOUND');

  });

  it('should return RECIPIENT_STATUS_UNDELIVERABLE error for wrong email address', async () => {
    const recipients = new Set<RecipientData>();

    const recipient = new Recipient();
    recipient.customerId = '5634169';
    recipient.emailAddress = 'hola@comparaonline.com';

    const data = new RecipientData(recipient);
    recipients.add(data);

    const trigger = new TriggerEmailMessage();
    const message = new TriggerEmailMessageRequest(recipients, campaign);

    const result = await trigger.send(message);
    const results = JSON.parse(result.entity);

    expect(results).to.have.lengthOf(1);

    const error = results[0];
    expect(error.success).to.be.false;
    expect(error.recipientId).to.equal(-1);
    expect(error.errorMessage).to.contain('RECIPIENT_STATUS_UNDELIVERABLE');

  });
});
