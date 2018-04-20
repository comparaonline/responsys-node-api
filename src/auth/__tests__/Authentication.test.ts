import { expect } from 'chai';
import * as config from 'config';
import { Authentication } from '../Authentication';
import { AuthenticationRequest } from '../AuthenticationRequest';
import { RefreshRequest } from '../RefreshRequest';
import { AuthCache } from '../AuthCache';
import { TriggerEmailMessage } from '../../send/TriggerEmailMessage';
import { TriggerEmailMessageRequest } from '../../send/TriggerEmailMessageRequest';
import { Recipient } from '../../send/Recipient';
import * as queryString from 'querystring';
import { RecipientData } from '../../send/RecipientData';
import { AuthConfig } from '../AuthConfig';
import { HttpRecorder } from 'nock-utils';

/**
 * In order to re-generate the cassette, just delete the
 * @constant CASSETTE_PATH file and set real username and passwords.
 */
const CASSETTE_PATH = `${__dirname}/cassettes/responsysAuth.json`;
const CAMPAIGN = config.get('campaign') as string;

const WRONG_PASSWORD = 'wrong_password';

const ERROR_WRONG_PASSWORD = 'INVALID_USER_NAME_PASSWORD';

const recorder = new HttpRecorder(CASSETTE_PATH);

describe('Authentication', () => {

  const authCache = new AuthCache();

  before(() => {
    authCache.clear();
    recorder.start();
  });

  after(() => {
    authCache.clear();
    recorder.stop();
  });

  it('should automatically refresh an expired token', (done) => {
    authCache.set({
      authToken: config.get('refresh.authToken'),
      issuedAt: config.get('refresh.issuedAt'),
      endPoint: config.get('refresh.endPoint')
    });

    const recipient1 = new Recipient();
    recipient1.emailAddress = 'dev@comparaonline.com';
    recipient1.emailFormat = 'HTML_FORMAT';
    recipient1.mobileNumber = '951349394';

    const campaignUnescaped = queryString.escape(CAMPAIGN);

    const recipients = new Set<RecipientData>();
    recipients.add(new RecipientData(recipient1));

    const triggerEmailRequest = new TriggerEmailMessageRequest(recipients, campaignUnescaped);

    const triggerEmailClient = new TriggerEmailMessage();

    triggerEmailClient.send(triggerEmailRequest).then((result) => {
      expect(result.status.code).to.equal(200);
      done();
    });
  });

  it('should authenticate a user and return token and endpoint', (done) => {
    const auth = new Authentication();
    const authRequest = new AuthenticationRequest();

    auth.signin(authRequest).then((result) => {
      expect(result.status.code).to.equal(200);

      const entity = JSON.parse(result.entity);

      expect(entity.authToken).to.be.a('string');
      expect(entity.issuedAt).to.be.a('number');
      expect(entity.endPoint).to.be.a('string');

      done();
    });
  });

  it('should through an error with incorrect credentials', (done) => {
    AuthConfig.password = WRONG_PASSWORD;

    const auth = new Authentication();
    const authRequest = new AuthenticationRequest();

    auth.signin(authRequest).then((result) => {
      expect(result.status.code).to.equal(400);

      const errorResult = JSON.parse(result.entity);

      expect(errorResult.errorCode).to.equal(ERROR_WRONG_PASSWORD);

      AuthConfig.init();
      done();
    });
  });

  it('should take a valid token and refresh it', (done) => {
    const auth = new Authentication();
    const authRequest = new AuthenticationRequest();

    auth.signin(authRequest).then((result) => {
      const signinResult = JSON.parse(result.entity);
      const refreshRequest = new RefreshRequest();

      auth.refresh(refreshRequest).then((result) => {
        const refreshResult = JSON.parse(result.entity);

        expect(refreshResult.authToken).to.be.a('string');
        expect(refreshResult.issuedAt).to.be.a('number');
        expect(refreshResult.endPoint).to.be.a('string');

        done();
      });
    });
  });

  it('should not invalidate the previous token after refreshing', async () => {
    const auth = new Authentication();
    const authRequest = new AuthenticationRequest();

    const authResult = await auth.signin(authRequest);
    const signinResult = JSON.parse(authResult.entity);
    const originalToken = signinResult.authToken;

    const firstRefresh = new RefreshRequest(originalToken);

    const firstRefreshResult = await auth.refresh(firstRefresh);
    const secondRefresh = new RefreshRequest(originalToken);

    const secondRefreshResult = await auth.refresh(secondRefresh);
    const secondRefreshEntity = JSON.parse(secondRefreshResult.entity);

    expect(secondRefreshEntity.authToken).to.be.a('string');
    expect(secondRefreshEntity.issuedAt).to.be.a('number');
    expect(secondRefreshEntity.endPoint).to.be.a('string');
  });
});


