import {
  CLIENT_OPTIONS_RETRY,
  CLIENT_OPTIONS_TIME_OUT,
  CLIENT_OPTIONS_ERROR
} from '../Constants';

export class Options {
  public retryOptions = CLIENT_OPTIONS_RETRY;
  public timeoutOptions = { timeout: CLIENT_OPTIONS_TIME_OUT };
  public errorOptions = CLIENT_OPTIONS_ERROR;

}
