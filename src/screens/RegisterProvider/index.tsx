import React, {useRef, useState} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {ApplicationStyles, Colors, Images, Metrics} from '../../theme';
import styles from './style';
import {CarhubButton, NavBar, ProgressBar} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {isRTL, strings} from '../../i18n';
import CustomStepIndicator from './Stepper/StepIndicator';
import StepOneForm from './Stepper/StepOne';
import {Formik, FormikProps} from 'formik';
import * as Yup from 'yup';
import StepTwoForm from './Stepper/StepTwo';
import {FormValues} from './types';
import utils from '../../utils';
import {Location} from '../../helpers';
import StepThreeForm from './Stepper/StepThree';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../app/store';
import {registerProviderAPI} from '../../features/auth/authAPI';
import {RegisterProvider as RegisterProviderState} from '../../features/auth/authTypes';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const initialValues: FormValues = {
  englishName: '',
  arabicName: '',
  englishDescription: '',
  arabicDescription: '',
  image: null,
  officePhone: '',
  mobilePhone: '',
  adminEmail: '',
  headOfficeAddress: '',
  weekdays: {},
  paymentMethods: [],
  legalAgreement: null,
  businessAgreement: null,
  iqama: null,
};
const mapCoordinates = Location?.getLocation();

const validationSchema = Yup.object().shape({
  englishName: Yup.string().required(strings('errors.englishNameRequired')),
  arabicName: Yup.string(),
  englishDescription: Yup.string(),
  arabicDescription: Yup.string(),
});

const RegisterProvider: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [officeCountryCode, setOfficeCountryCode] = useState('966');
  const [mobileCountryCode, setMobileCountryCode] = useState('966');
  const [location, setLocation] = useState<number[]>([]);
  const formikRef = useRef<FormikProps<FormValues>>(null);
  const dispatch = useDispatch<AppDispatch>();

  const onStepsPress = (position: number, values: FormValues) => {
    if (position === 1 && values.englishName) {
      setCurrentPosition(position);
    } else if (position === 0) {
      setCurrentPosition(0);
    }
  };

  const renderStepScreen = (formikProps: any) => {
    switch (currentPosition) {
      case 0:
        return <StepOneForm formikProps={formikProps} />;
      case 1:
        return (
          <StepTwoForm
            {...{
              formikProps,
              mapCoordinates,
              officeCountryCode,
              mobileCountryCode,
              setOfficeCountryCode,
              setMobileCountryCode,
              setLocation,
            }}
          />
        );
      case 2:
        return <StepThreeForm {...{formikProps}} />;
      default:
        return null;
    }
  };

  const onNext = (values: FormValues) => {
    const {englishName, mobilePhone, adminEmail} = values;

    if (currentPosition === 0 && englishName) {
      setCurrentPosition(currentPosition + 1);
    } else if (currentPosition === 1 && mobilePhone && adminEmail) {
      setCurrentPosition(currentPosition + 1);
    } else if (currentPosition === 2) {
      formikRef.current?.handleSubmit();
    }
  };

  const submitRegistration = (values: FormValues) => {
    const payload: RegisterProviderState = {
      isMerchantApp: true,
      englishName: values.englishName,
      arabicName: values.arabicName,
      englishDescription: values.englishDescription,
      arabicDescription: values.arabicDescription,
      adminEmail: values.adminEmail,
      headOfficeAddress:
        values.headOfficeAddress ||
        'JABA3197، 3197 ابراهيم بن احمد الرقي، 7391، حي البغدادية الغربية، جدة 22231, Saudi Arabia',
      weekdays: values.weekdays,
      paymentMethods: values.paymentMethods,
      documents: {
        iqamaDoc: values?.iqama || null,
        legalAgreementDoc: values?.legalAgreement || null,
        businessAgreementDoc: values?.businessAgreement || null,
      },
      location: [39.169999938458204, 21.4999997281514],
    };
    if (values?.officePhone) {
      payload.officePhone = '+' + officeCountryCode + values?.officePhone;
    }
    if (values?.mobilePhone) {
      payload.mobilePhone = '+' + mobileCountryCode + values?.mobilePhone;
    }
    // if (location) {
    //   payload.location = location;
    // }

    dispatch(registerProviderAPI({payload, navigation, image: values?.image}));
  };

  return (
    <View style={[ApplicationStyles.flex, styles.bg]}>
      <NavBar
        title={strings('registerProvider.title')}
        titleStyle={{color: Colors.darkStaleBlue}}
        onLeftTapped={() => navigation.goBack()}
        leftImage={Images.back}
      />
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues) => {
          submitRegistration(values);
        }}>
        {formikProps => {
          const {values} = formikProps;

          return (
            <ScrollView
              style={[ApplicationStyles.flex, styles.bg]}
              keyboardShouldPersistTaps="always">
              <ProgressBar
                progress={utils.calculateProgress(values)}
                controlWidth={Metrics.screenWidth * 0.6}
              />
              <CustomStepIndicator
                currentPosition={currentPosition}
                onStepsPress={position => onStepsPress(position, values)}
              />
              {renderStepScreen(formikProps)}

              <View style={styles.btnWrapper}>
                <CarhubButton
                  renderLeft={() => (
                    <Image
                      style={[
                        {
                          width: Metrics.ratio(15),
                          height: Metrics.ratio(15),
                          marginRight: Metrics.ratio(20),
                          transform: isRTL() ? [{rotate: '180deg'}] : [],
                        },
                      ]}
                      source={
                        currentPosition === 0
                          ? Images.preArrowIcon
                          : Images.preArrowIconOrange
                      }
                    />
                  )}
                  isDisable={currentPosition === 0}
                  bordered
                  text={strings('registerProvider.previous')}
                  onPress={() =>
                    setCurrentPosition(prev => Math.max(0, prev - 1))
                  }
                  // eslint-disable-next-line react-native/no-inline-styles
                  containerStyle={{
                    flexDirection: 'row',
                    marginHorizontal: Metrics.ratio(15),
                    height: Metrics.ratio(42),
                    borderColor:
                      currentPosition === 0
                        ? Colors.text.dis
                        : Colors.darkStaleBlue,
                  }}
                />

                <CarhubButton
                  renderRight={() =>
                    currentPosition < 2 ? (
                      <Image
                        style={[
                          {
                            width: Metrics.ratio(15),
                            height: Metrics.ratio(15),
                            marginLeft: Metrics.ratio(20),
                            transform: isRTL() ? [{rotate: '180deg'}] : [],
                          },
                        ]}
                        source={Images.nextArrowIcon}
                      />
                    ) : null
                  }
                  isDisable={
                    currentPosition === 0
                      ? values?.englishName === undefined
                      : currentPosition === 1
                      ? !values?.mobilePhone ||
                        values?.mobilePhone.length < 9 ||
                        !values?.adminEmail ||
                        (values?.mobilePhone &&
                          !utils.isEmailValid(values?.adminEmail))
                      : false
                  }
                  bordered={false}
                  text={
                    currentPosition < 2
                      ? strings('registerProvider.next')
                      : strings('registerProvider.submit')
                  }
                  onPress={() => {
                    onNext(values);
                  }}
                  // eslint-disable-next-line react-native/no-inline-styles
                  containerStyle={{
                    flexDirection: 'row',
                    marginHorizontal: Metrics.ratio(15),
                    height: Metrics.ratio(42),
                  }}
                />
              </View>
            </ScrollView>
          );
        }}
      </Formik>
    </View>
  );
};

export default RegisterProvider;
