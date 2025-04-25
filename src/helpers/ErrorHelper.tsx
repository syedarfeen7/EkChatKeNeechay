import utils from '../utils';
import {strings} from '../i18n';

interface AppError {
  message?: string;
  name?: string;
  title?: string;
  error?: any;
  doHideAlert?: boolean;
}

class ErrorHelper {
  handleErrors(
    err: AppError | string,
    doAlert: boolean,
    doToast: boolean = false,
  ): void {
    if ((doAlert || doToast) && !(err as AppError)?.doHideAlert) {
      const errObj =
        typeof err === 'string'
          ? {message: err}
          : err && 'message' in err
          ? err
          : (err as AppError)?.error;

      const errName =
        errObj?.name || errObj?.title || strings('alertMessages.error');

      const errMsg =
        typeof errObj === 'string' ? errObj : errObj?.message ?? '';

      if (errMsg && doAlert) {
        utils.showAlertWithDelay(errName, errMsg, 1000);
      }

      if (errMsg && doToast) {
        utils.showToast(errMsg);
      }
    }
  }
}

export default new ErrorHelper();
