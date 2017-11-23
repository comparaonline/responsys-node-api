import { expect } from 'chai';
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
const CAMPAIGN = '[TEST]_Masivo_Cyber_Nov17_test';

const WRONG_PASSWORD = 'wrong_password';

const ERROR_WRONG_PASSWORD = 'INVALID_USER_NAME_PASSWORD';

const recorder = new HttpRecorder(CASSETTE_PATH);

describe('Authentication', () => {

  before(() => {
    recorder.start();
  });

  after(() => {
    recorder.stop();
  });

  it('should automatically refresh an expired token', (done) => {
    const authCache = new AuthCache();
    authCache.clear();

    authCache.set({
      authToken: 'E0ixlPgbClnEoWQbkWL7o0p20i3OosJN0Kkrkrl1ZJVd8tFLYw',
      issuedAt: 1511008009879,
      endPoint: 'https://api5-009.responsys.net'
    });

    const recipient1 = new Recipient();
    recipient1.customerId = '5634169';
    recipient1.emailAddress = 'lpavetti@comparaonline.com';
    recipient1.emailFormat = 'HTML_FORMAT';
    recipient1.mobileNumber = '951349394';
    
    const campaignUnescaped = queryString.escape(CAMPAIGN);

    const recipients = new Set<RecipientData>();

    recipients.add(new RecipientData(recipient1));

    const triggerEmailClient = new TriggerEmailMessage();
    const triggerEmailRequest = new TriggerEmailMessageRequest(recipients, campaignUnescaped);

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
    }).catch((error) => {
      console.error(error);
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
    }).catch((error) => {
      console.log(error);
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
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.error(error);
    });
  });

  it('should not invalidate the previous token after refreshing', (done) => {
    const auth = new Authentication();
    const authRequest = new AuthenticationRequest();

    auth.signin(authRequest).then((result) => {
      const signinResult = JSON.parse(result.entity);
      const originalToken = signinResult.authToken;

      const firstRefresh = new RefreshRequest(originalToken);

      auth.refresh(firstRefresh).then((result) => {
        const secondRefresh = new RefreshRequest(originalToken);

        auth.refresh(secondRefresh).then((result) => {
          const secondRefreshResult = JSON.parse(result.entity);

          expect(secondRefreshResult.authToken).to.be.a('string');
          expect(secondRefreshResult.issuedAt).to.be.a('number');
          expect(secondRefreshResult.endPoint).to.be.a('string');

          done();
        });
      });
    });
  });
});


