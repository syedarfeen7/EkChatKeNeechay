import {Alert, NativeModules, Platform, ToastAndroid} from 'react-native';

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
}

export default new Util();
