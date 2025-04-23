import React, {useState} from 'react';
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
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import StepTwoForm from './Stepper/StepTwo';
import {FormValues} from './types';
import utils from '../../utils';
import {Location} from '../../helpers';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const initialValues: FormValues = {
  englishName: '',
  arabicName: '',
  englishDescription: '',
  arabicDescription: '',
  image: '',
  officePhone: '',
  mobilePhone: '',
  adminEmail: '',
  officeAddress: '',

  headOfficeAddress: '',
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
            }}
          />
        );
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
      // this.onSubmit();
    }
  };

  const calculateProgress = (values: FormValues) => {
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

  return (
    <View style={[ApplicationStyles.flex, styles.bg]}>
      <NavBar
        title={strings('registerProvider.title')}
        titleStyle={{color: Colors.darkStaleBlue}}
        onLeftTapped={() => navigation.goBack()}
        leftImage={Images.back}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues, actions: FormikHelpers<any>) => {
          console.log('Form Submit:', values);
        }}>
        {formikProps => {
          const {values, handleSubmit} = formikProps;

          console.log('values', values);

          return (
            <ScrollView
              style={[ApplicationStyles.flex, styles.bg]}
              keyboardShouldPersistTaps="always">
              <ProgressBar
                progress={calculateProgress(values)}
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
