import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ButtonView, Text, Loading, NavBar} from '../../components';
import {Colors, Images} from '../../theme';
// import {deleteAccount} from '../../actions/deleteAccount';
// import {API_DEACTIVATE_ACCOUNT} from '../../config/WebService';
import {strings} from '../../i18n';
import commonUtils from '../../utils/commonUtils';
import Util from '../../utils';
import styles from './style';
// import {AnalyticsHelper} from '../../helpers';
import {AppDispatch, RootState} from '../../app/store';
import {loginUser} from '../../features/user/userAPI';
import {registerUserAPI} from '../../features/register/registerAPI';
import CountdownTimer from '../../components/CountDown';

const VERIFY_TIMEOUT = 30000;

const Verify: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const inputRef = useRef<TextInput>(null);

  const [verifyCode, setVerifyCode] = useState('');
  const [showResend, setShowResend] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const localeSettings = useSelector((state: RootState) => state.language);

  const phoneNumber = route.params?.phoneNumber || '';
  const containerMode = route.params?.containerMode;

  useEffect(() => {
    // AnalyticsHelper.setCurrentScreen('Verify');

    const timeout = setTimeout(() => {
      setShowResend(true);
    }, VERIFY_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const onLogin = () => {
    const parsedVerifyCode = commonUtils.parseArabic(verifyCode);

    if (parsedVerifyCode.length < 5) {
      //   Util.showAlert(strings('alertMessages.invalidVerifCode'));
      Util.showAlert('Error', 'Invalid Verification Code');
      return;
    }

    const payload = {
      username: phoneNumber,
      password: parsedVerifyCode,
      userType: 'operator',
    };

    if (containerMode === 'deleteAccount') {
      // dispatch(deleteAccount(API_DEACTIVATE_ACCOUNT, {otp: verifyCode}));
    } else {
      dispatch(loginUser({payload}));
    }
  };

  const resendOTP = () => {
    const payload = {
      phoneNumber,
      userType: 'operator',
      resendOTP: true,
    };

    setTimeout(() => {
      if (containerMode === 'deleteAccount') {
        // dispatch(
        //   deleteAccount(API_DEACTIVATE_ACCOUNT, {
        //     otp: verifyCode,
        //     resendOTP: true,
        //   }),
        // );
      } else {
        dispatch(registerUserAPI({payload, navigation}));
      }
      setShowResend(false);
      setTimeout(() => setShowResend(true), VERIFY_TIMEOUT);
    }, 1200);
  };

  const handleSubmit = () => {
    inputRef.current?.blur();
    onLogin();
  };

  const phoneNumberUpdated =
    localeSettings.selectedLanguage === 'ar'
      ? `${phoneNumber}+`
      : `${phoneNumber}`;

  return (
    <View style={styles.container}>
      <NavBar
        title={strings('navtitles.otp')}
        titleStyle={{color: Colors.darkStaleBlue}}
        onLeftTapped={() => navigation.goBack()}
        leftImage={Images.back}
      />

      <View style={[styles.childContainer]}>
        <Text
          style={styles.description}
          type="AvenirNextMedium"
          color="white"
          size="eighteen">
          {strings('verify.verficationCode')}
        </Text>

        <Text
          textAlign="center"
          style={[
            styles.description,
            styles.descriptionBase20,
            styles.matchDesignWithRegister,
          ]}
          type="CircularStdBook"
          color="white"
          size="thirteen">
          {`${strings(
            'verify.pleaseEnterVerificationCode',
          )} ${phoneNumberUpdated}`}
        </Text>

        {containerMode ? null : (
          <ButtonView onPress={() => navigation.goBack()} style={styles.goBack}>
            <Text
              style={styles.wrongNumber}
              type="CircularStdBook"
              color={Colors.darkStaleBlue}
              size="thirteen">
              {strings('verify.wrongNumber')}
            </Text>
            <Text
              type="CircularStdBook"
              color={Colors.darkStaleBlue}
              size="thirteen">
              {strings('verify.reEnter')}{' '}
              <Text
                type="CircularStdBook"
                color={Colors.darkStaleBlue}
                size="thirteen"
                style={styles.resendLink}>
                {strings('verify.here')}
              </Text>
            </Text>
          </ButtonView>
        )}

        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
          <View style={styles.card}>
            <TextInput
              ref={inputRef}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setVerifyCode}
              placeholder="_ _ _ _ _"
              value={verifyCode}
              keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
              style={styles.input}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              placeholderTextColor={Colors.darkStaleBlue}
              selectionColor={Colors.darkStaleBlue}
              maxLength={5}
            />
          </View>
        </TouchableWithoutFeedback>

        {showResend ? (
          <Text
            style={{color: Colors.darkStaleBlue}}
            type="CircularStdBook"
            size="thirteen"
            onPress={resendOTP}>
            {strings('verify.resendCode')}
          </Text>
        ) : (
          <View>
            <Text
              type="CircularStdBook"
              style={{color: Colors.darkStaleBlue}}
              size="thirteen">
              {strings('verify.resendSmsCodein')}
            </Text>

            <CountdownTimer
              totalSeconds={30}
              showHours={false}
              showMinutes={false}
              onFinish={() => {
                console.log('Countdown ended!');
              }}
              textStyle={{color: Colors.darkStaleBlue, fontSize: 20}}
            />
          </View>
        )}

        <ButtonView style={styles.submitButton} onPress={onLogin}>
          <Text
            style={{color: Colors.darkStaleBlue}}
            type="CircularStdBook"
            size="thirteen">
            {strings('verify.submit')}
          </Text>
        </ButtonView>
      </View>

      {user.isFetching && (
        <Loading isBlockingLoader={false} loading={user.isFetching} />
      )}
    </View>
  );
};

export default Verify;
