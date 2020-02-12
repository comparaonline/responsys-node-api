import { expect } from 'chai';
import { HttpRecorder } from 'nock-utils';
import * as queryString from 'querystring';
import { AuthCache } from '../../auth/AuthCache';
import { Field } from '../create/FieldTypes';
import { TableData } from '../create/TableData';
import { TableCreateRequest } from '../create/CreateRequest';
import { TableCreateMessage } from '../create/CreateMessage';

const TABLE_NAME_VALID = 'test_api_responsys';
const TABLE_NAME_INVALID = 'test_api_responsys';
const FOLDER_NAME =  queryString.escape('test_api');
const CASSETTE_PATH = `${__dirname}/cassettes/createTable.json`;

const recorder = new HttpRecorder(CASSETTE_PATH);

describe('Create Table', () => {

  const authCache = new AuthCache();

  before(() => {
    authCache.clear();
    recorder.start();
  });

  after(() => {
    authCache.clear();
    recorder.stop();
  });

  it('should create a table', async () => {
    const fields = new Set<Field>();
    const primaryKeys = ['offerId'];

    const idFeld = new Field();
    idFeld.fieldName = 'offerId';
    idFeld.fieldType = 'INTEGER';
    idFeld.dataExtractionKey = false;
    fields.add(idFeld);

    const nameField = new Field();
    nameField.fieldName = 'offerName';
    nameField.fieldType = 'STR100';
    nameField.dataExtractionKey = false;
    fields.add(nameField);

    const emailField = new Field();
    emailField.fieldName = 'offerEmail';
    emailField.fieldType = 'STR500';
    emailField.dataExtractionKey = false;
    fields.add(emailField);

    const dateField = new Field();
    dateField.fieldName = 'offerDate';
    dateField.fieldType = 'TIMESTAMP';
    dateField.dataExtractionKey = false;
    fields.add(dateField);

    const table = new TableData(TABLE_NAME_VALID, fields, primaryKeys);

    const message = new TableCreateRequest(table, FOLDER_NAME);

    const trigger = new TableCreateMessage();

    const result = await trigger.send(message);

    expect(result.status.code).to.equal(200);
  });

  it('should not create a table because the primaryKeys', async () => {
    const fields = new Set<Field>();
    const primaryKeys = ['otherPrimary'];

    const idFeld = new Field();
    idFeld.fieldName = 'offerId';
    idFeld.fieldType = 'INTEGER';
    idFeld.dataExtractionKey = false;
    fields.add(idFeld);

    const nameField = new Field();
    nameField.fieldName = 'offerName';
    nameField.fieldType = 'STR100';
    nameField.dataExtractionKey = false;
    fields.add(nameField);

    const emailField = new Field();
    emailField.fieldName = 'offerEmail';
    emailField.fieldType = 'STR5000';
    emailField.dataExtractionKey = false;
    fields.add(emailField);

    const dateField = new Field();
    dateField.fieldName = 'offerDate';
    dateField.fieldType = 'TIMESTAMP';
    dateField.dataExtractionKey = false;
    fields.add(dateField);

    const table = new TableData(TABLE_NAME_INVALID, fields, primaryKeys);
    const message = new TableCreateRequest(table, FOLDER_NAME);

    const trigger = new TableCreateMessage();

    const result = await trigger.send(message);
    const resultResponse = JSON.parse(result.entity);
    expect(result.status.code).to.equal(400);

    expect(resultResponse.errorCode).to.not.null;
    expect(resultResponse.detail).to.not.null;
  });

});
