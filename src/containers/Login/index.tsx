import React, {useEffect, useRef, useState} from 'react';

import RNRestart from 'react-native-restart';
import {
  View,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import {useTranslation} from 'react-i18next';
import Utils from '../../utils';
import CommonUtils from '../../utils/commonUtils';
import ActionSheet from 'react-native-actionsheet';
import {Colors, Images, ApplicationStyles, Metrics} from '../../theme';
import {Text, ButtonView} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage} from '../../features/locale/localeSlice';
import LangChangeButton from '../../controls/LangChangeButton';
import {useNavigation} from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/navigation';
import {
  betaServerURL,
  defaultServer,
  devServerURL,
  liveServerURL,
  stagingServerURL,
} from '../../api/urls';
import {changeServer} from '../../features/appConfig/appConfigSlice';
import {logout} from '../../features/register/registerSlice';
import AppConfig from '../../config/AppConfig';
import {registerUserAPI} from '../../features/register/registerAPI';
import {AppDispatch, RootState} from '../../app/store';
import PasswordInputDialog from '../../components/PasswordInputDialog';
import {i18nChangeLanguage, isRTL} from '../../i18n';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'SelectCountryCode'
>;

const Login: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp>();
  const appConfig = useSelector((state: RootState) => state.appConfig);
  const language = useSelector((state: RootState) => state.language);

  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentCountryCode, setCurrentCountryCode] = useState('966');
  const [isInputFieldVisible, setInputFieldVisible] = useState(false);
  const [showPassDialog, setShowPassDialog] = useState(false);
  const [isDisableLanChangeBtn, setDisableLanChangeBtn] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(
    language?.selectedLanguage,
  );
  const phoneInputRef = useRef<any>(null);
  const actionSheetRef = useRef<any>(null);

  useEffect(() => {
    // AnalyticsHelper.setCurrentScreen('Login');
  }, []);

  // useEffect(() => {
  //   changeLanguage(currentLocale);
  // }, [currentLocale]);

  const onURLChanged = (newUrl: string) => {
    dispatch(changeServer(newUrl));
    logout();

    setTimeout(() => {
      RNRestart.Restart();
    }, 500);
  };

  const onFocus = () => {
    const newErrors = {...errors};

    for (const name in newErrors) {
      const ref = inputRefs[name];
      if (ref?.isFocused()) {
        delete newErrors[name];
      }
    }

    setErrors(newErrors);
  };
  const inputRefs: {[key: string]: any} = {
    phone: phoneInputRef.current,
  };

  const onSubmitPhone = () => {
    register();
  };

  const onChangeText = (extracted: string) => {
    setPhone(extracted);
  };

  const onPasswordEnter = (textInput: string) => {
    if (textInput === '') {
      Utils.showToast('Please Enter Password');
    } else if (textInput === AppConfig.serverChangePass) {
      setShowPassDialog(false);
      setTimeout(() => actionSheetRef?.current.show(), 500);
    } else {
      Utils.showToast('Invalid Password');
    }
  };

  const register = () => {
    const parsedPhone = CommonUtils.parseArabicToEnglishNum(phone);

    let phoneNumber;

    if (parsedPhone.length === 10) {
      //remove leading zeros
      phoneNumber = parsedPhone.replace(/^0+/, '');
    } else {
      phoneNumber = parsedPhone;
    }

    if (phoneNumber.length === 0) {
      Utils.showCommonMessage(
        'alert',
        'pleaseEnterNumber',
        // strings('alertMessages.alert'),
        // strings('serviceMessages.pleaseEnterNumber'),
      );
      return;
    }

    if (phoneNumber.length < 9) {
      Utils.showCommonMessage(
        'alert',
        'invalidNumber',
        // strings('alertMessages.alert'),
        // strings('serviceMessages.invalidNumber'),
      );
      return;
    }

    let payload = {
      phoneNumber:
        CommonUtils.getCountryCodePadding(currentCountryCode) + phoneNumber,
      userType: 'operator',
    };
    // AnalyticsHelper.logEvent('login');
    dispatch(registerUserAPI({payload, navigation}));
  };

  const renderLanguageChangeButton = () => {
    return (
      <LangChangeButton
        isDisable={isDisableLanChangeBtn}
        onPress={(lang: string) => {
          // AnalyticsHelper.logEvent('languageChange', {
          //   event: 'languageChange',
          //   from: 'loginPage',
          //   languageChangedTo: lang,
          // });
          dispatch(changeLanguage(lang));
          i18nChangeLanguage(lang);
          setCurrentLocale(lang);

          setDisableLanChangeBtn(true);
        }}
        containerStyle={styles.languageBtnContainer}
      />
    );
  };

  const renderPhoneInput = () => {
    let textInputExtraStyle = {};

    if (Utils.isPlatformAndroid()) {
      textInputExtraStyle = {
        marginTop: Metrics.ratio(2),
      };
    } else {
      textInputExtraStyle = {marginBottom: Metrics.ratio(0)};
    }

    return (
      <View style={[styles.field]}>
        <View style={[styles.accessoryPhoneView]}>
          <Image style={styles.accessory} source={Images.call} />
        </View>
        <View
          style={[
            styles.fieldPhoneWrapper,
            {
              flexDirection: isRTL() ? 'row-reverse' : 'row',
            },
          ]}>
          <ButtonView
            onPress={() =>
              navigation.navigate('SelectCountryCode', {
                title: 'Select Country code',
                onSubmit: (selectedCode: string) => {
                  setCurrentCountryCode(selectedCode.substring(1));
                },
              })
            }
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: Metrics.ratio(40),
              paddingHorizontal: Metrics.ratio(6),
            }}>
            <Text
              type="CircularStdBook"
              size="sixteen"
              color={Colors.primary}
              style={{
                marginBottom: Metrics.ratio(2),
              }}>
              +{currentCountryCode}
            </Text>
          </ButtonView>
          <TextInput
            keyboardType={'phone-pad'}
            selectionColor="#e89225"
            underlineColorAndroid="transparent"
            onChangeText={text => onChangeText(text)}
            value={phone}
            style={[styles.input, textInputExtraStyle]}
            placeholder={'(___) ___ ____'}
            placeholderTextColor={Colors.placeholder}
            returnKeyType="done"
            onSubmitEditing={onSubmitPhone}
            onFocus={onFocus}
            enablesReturnKeyAutomatically
            maxLength={10}
          />
          {errors.phone && (
            <Text color="red" size="twelve">
              {errors.phone}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderDebugActionSheet = () => {
    return (
      <ActionSheet
        ref={actionSheetRef}
        title="Select Server for Testing"
        options={[
          'Custom Server',
          'Beta',
          'Staging',
          'Development',
          'Live',
          'Cancel',
        ]}
        styles={{
          fontSize: 12,
        }}
        cancelButtonIndex={5}
        onPress={buttonIndex => {
          let url = defaultServer;
          let isSwitched = false;

          if (buttonIndex === 0) {
            setInputFieldVisible(true);
          } else if (buttonIndex === 1) {
            url = betaServerURL;
            isSwitched = true;
            Utils.showToast('BETA');
          } else if (buttonIndex === 2) {
            url = stagingServerURL;
            isSwitched = true;
            Utils.showToast('STAGING');
          } else if (buttonIndex === 3) {
            url = devServerURL;
            isSwitched = true;
            Utils.showToast('DEVELOPMENT');
          } else if (buttonIndex === 4) {
            url = liveServerURL;
            isSwitched = true;
            Utils.showToast('LIVE');
          }

          if (isSwitched) {
            onURLChanged(url);
          }
        }}
      />
    );
  };

  const renderServerChangeButton = () => {
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: Metrics.ratio(44),
          height: Metrics.ratio(44),
        }}
        onLongPress={() => setShowPassDialog(true)}
        underlayColor={Colors.transparent}>
        <View style={{backgroundColor: 'red'}} />
      </TouchableOpacity>
    );
  };

  console.log(language);

  return (
    <View style={[ApplicationStyles.flex, styles.bg]}>
      <ScrollView
        style={[ApplicationStyles.flex, styles.bg]}
        keyboardShouldPersistTaps="never">
        <StatusBar backgroundColor={Colors._orange} barStyle="light-content" />
        <View style={[styles.maincontainer]}>
          {renderLanguageChangeButton()}
          <View style={styles.loginLogo}>
            <Image style={styles.logo} source={Images.logo} />
          </View>
          <View style={styles.loginText}>
            <Text color="white" type="AvenirNextMedium" size="xLarge">
              {/* {strings('LoginPage.login')} */}
              {t('LoginPage.login')}
            </Text>
          </View>
          {renderPhoneInput()}
          <View style={styles.usingMobileNumber}>
            <Text color="white" type="AvenirNextMedium" size="thirteen">
              {/* {strings('LoginPage.login_with_number')} */}
              Login using Mobile Number
            </Text>
          </View>
          <ButtonView
            onPress={() =>
              // Actions.registerProvider({
              //   title: strings('registerProvider.title'),
              // })
              navigation.navigate('registerProvider')
            }>
            <View style={styles.becomeAServiceProvider}>
              <Text
                color="white"
                type="AvenirNextMedium"
                size="thirteen"
                style={styles.becomeAServiceProviderText}>
                {/* {strings('LoginPage.register_as_provider')} */}
                Become a Service Provider
              </Text>
            </View>
          </ButtonView>
        </View>
        {renderDebugActionSheet()}
        {/* {this.props.register.isFetching && (
          <Loading
            loading={
              this.props.register.isFetching || this.props.user.isFetching
            }
          />
        )} */}
      </ScrollView>
      <ButtonView onPress={register} style={styles.login}>
        <Text color="white" type="AvenirNextDemiBold" size="fourteen">
          {/* {strings('LoginPage.login')} */}
          login
        </Text>
      </ButtonView>
      {appConfig?.serverUrl && appConfig?.serverUrl !== liveServerURL ? (
        <View style={styles.serverURLParent}>
          <Text color="white" type="AvenirNextRegular" size="ten">
            {appConfig?.serverUrl}
          </Text>
        </View>
      ) : null}
      {renderServerChangeButton()}
      {appConfig?.serverUrl && appConfig?.serverUrl !== liveServerURL && (
        <View style={styles.serverUrlBox} />
      )}
      <PasswordInputDialog
        {...{
          visible: showPassDialog,
          title: 'Enter Password',
          placeholder: 'Password',
          onSubmit: onPasswordEnter,
          onDismiss: () => setShowPassDialog(false),
        }}
      />
      <PasswordInputDialog
        {...{
          visible: isInputFieldVisible,
          title: 'Enter Server URL',
          placeholder: 'https://',
          onSubmit: value => {
            setInputFieldVisible(false);
            onURLChanged(value);
            setInputFieldVisible(false);
          },
          onDismiss: () => setInputFieldVisible(false),
          secureTextEntry: false,
        }}
      />
    </View>
  );
};

export default Login;
