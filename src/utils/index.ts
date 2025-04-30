import {Alert, NativeModules, Platform, ToastAndroid} from 'react-native';
import {isRTL, strings} from '../i18n';
import {FormValues} from '../screens/RegisterProvider/types';
import Toast from 'react-native-toast-message';
const {RNNativeIOSToast} = NativeModules;

type ShowYesNoMessage = (
  title: string,
  message: string,
  onYes: () => void,
  onNo: () => void,
) => void;

class Util {
  showCommonMessage(title: string, message: string): void {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Ok',
          onPress: () => this.consoleLog('OK Pressed'),
        },
      ],
      {cancelable: false},
    );
  }

  consoleLog = (data: any): void => {
    if (!this.isReleaseMode()) {
      console.log(data);
    }
  };

  isReleaseMode = (): boolean => {
    return !(__DEV__ || this.isJSDebugMode());
  };

  isJSDebugMode = (): boolean => {
    return __DEV__;
  };

  isPlatformAndroid = () => Platform.OS === 'android';

  showToast(message: string) {
    if (this.isPlatformAndroid()) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      RNNativeIOSToast.showToast(message);
    }
  }
  getObjectId(obj: Record<string, any>): string | undefined {
    if (obj?.id) {
      return obj.id;
    } else if (obj?._id) {
      return obj._id;
    }

    return undefined;
  }
  showAlertWithDelay(title: string, message: string, delay = 150) {
    setTimeout(() => {
      this.showCommonMessage(title, message);
    }, delay);
  }

  showYesNoMessage: ShowYesNoMessage = (title, message, onYes, onNo) => {
    setTimeout(() => {
      Alert.alert(
        title,
        message,
        [
          {
            // text: strings('alertMessages.yes'),
            text: 'Yes',
            onPress: onYes,
          },
          {
            // text: strings('alertMessages.no'),
            text: 'No',
            onPress: onNo,
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }, 150);
  };
  showAlert = (message: string, type: string) => {
    Toast.show({
      type,
      text1: strings('alertMessages.error'),
      text2: message,
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
    });
  };
  isEmailValid(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  textInputRtlStyling = () => {
    if (isRTL()) {
      return {textAlign: 'right'};
    } else {
      return {textAlign: 'left'};
    }
  };
  toEnglishDigits = (str: string) => {
    // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
    str = str.toString();
    const e = '٠'.charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function (t) {
      return t.charCodeAt(0) - e;
    });
    return str;
  };
  calculateProgress = (values: FormValues) => {
    const totalFields = 14;
    let filledFields = 0;

    Object.entries(values).forEach(([key, value]) => {
      if (
        (typeof value === 'string' && value.trim() !== '') ||
        (typeof value === 'object' &&
          value !== null &&
          Object.keys(value).length > 0)
      ) {
        filledFields += 1;
      }
    });

    return filledFields / totalFields;
  };
}

export default new Util();
