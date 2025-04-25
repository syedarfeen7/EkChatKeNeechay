import {strings} from '../i18n';

class ErrorsObjectsHelper {
  ERROR_CHAIN_DISABLE() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.chainDisable'),
    };
  }
  ERROR_SERVER_CONNECTION() {
    return {
      error: 1,
      title: strings('serviceMessages.connectError'),
      message: strings('serviceMessages.badDNS'),
    };
  }

  ERROR_REQUEST_CANCEL() {
    return {
      error: 1,
      title: strings('serviceMessages.reqcancel'),
      message: strings('serviceMessages.requestCanceled'),
    };
  }

  ERROR_NETWORK_NOT_AVAILABLE() {
    return {
      error: 1,
      title: strings('serviceMessages.NaNet'),
      message: strings('serviceMessages.networkNA'),
    };
  }

  ERROR_SOMETHING_WENT_WRONG() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.somethingWrong1'),
    };
  }

  ERROR_CLIENT() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.somethingWrong2'),
    };
  }

  ERROR_REQUEST_TIMEOUT() {
    return {
      error: 1,
      title: strings('serviceMessages.reqDelay'),
      message: strings('serviceMessages.somethingWrong3'),
    };
  }

  ERROR_CLIENT_CREDENTIALS() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.invalidCreds'),
    };
  }

  ERROR_USER_PASS_CREDENTIALS() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('changePassword.invpass'),
    };
  }

  ERROR_WRONG_PHONE_NUMBER() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.invalidNumber'),
    };
  }

  ERROR_ACCESS_DENIED() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.accessDenied'),
    };
  }

  ERROR_ROLE_NOT_MATCH() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.roleNotMatch'),
    };
  }

  ERROR_ORDER_NOT_ASSIGNED(orderId: string) {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.orderUnAssigned'),
      orderId,
    };
  }

  ERROR_ORDER_NOT_FOUND(orderId: string) {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.orderNotFound'),
      orderId,
    };
  }

  ERROR_ORDER_ALREADY_COMPLETED(orderId: string) {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.orderAlreadyCompleted'),
      orderId,
    };
  }

  ERROR_ORDER_HASBEEN_PLACED_ONSPOT(orderId: string) {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.orderHasbeenPlacedOnSpot'),
      orderId,
    };
  }

  ERROR_ORDER_HASBEEN_PLACED_ONSITE(orderId: string) {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.orderHasbeenPlacedOnSite'),
      orderId,
    };
  }

  ERROR_ORDER_CHAIN_AND_OPERATOR_CHAIN_DIFF(orderId: string) {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.orderHasbeenPlacedonDiffSupplier'),
      orderId,
    };
  }

  ERROR_ORDER_ALREADY_ASSIGNED(orderId: string) {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.orderAssigned'),
      orderId,
    };
  }

  ERROR_ORDER_NOT_PAID(orderId: string) {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.orderNotPaid'),
      orderId,
    };
  }

  ERROR_PAYMENT_METHOD_NOT_EXIST() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.paymentMethodNotExist'),
    };
  }

  ERROR_OPERATOR_NOT_ACTIVE() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.operatorNotActive'),
    };
  }

  ERROR_USER_NOT_FOUND() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.userNotFound'),
    };
  }

  ERROR_MOBILE_ALREADY_EXIST() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.mobileAlreadyExist'),
    };
  }

  ERROR_TOO_MANY_REQUESTS() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.tooManyRequests'),
    };
  }

  ERROR_OTP_EXPIRED() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.otpExpired'),
    };
  }

  ERROR_QRCODE_EXPIRED(orderId: string) {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.qrCodeExpired'),
      orderId,
    };
  }

  ERROR_ON_DEMAND_SERVICE_NOT_EXIST() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.onDemandServiceNotExist'),
    };
  }

  SESSION_EXPIRED() {
    return {
      error: 1,
      title: strings('serviceMessages.whoops'),
      message: strings('serviceMessages.sessionExpired'),
    };
  }
}

export default new ErrorsObjectsHelper();
