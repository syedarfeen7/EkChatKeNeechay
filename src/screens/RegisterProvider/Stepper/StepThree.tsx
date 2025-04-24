import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Colors, Fonts, Metrics} from '../../../theme';
import {strings} from '../../../i18n';
import WeekDaysTimings, {Weekdays} from '../../../controls/WeekDaysTimings';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types/navigation';
import {useNavigation} from '@react-navigation/native';
import {CheckBox} from 'react-native-elements';
import {Text, UploadField} from '../../../components';
import {pick} from '@react-native-documents/picker';

interface StepThreeFormProps {
  formikProps: any;
}

type NavigationProp = StackNavigationProp<RootStackParamList>;

const StepThreeForm: React.FC<StepThreeFormProps> = ({formikProps}) => {
  const navigation = useNavigation<NavigationProp>();
  const {setFieldValue, values} = formikProps;

  const onDocumentPick = async (key: string) => {
    try {
      const res = await pick({
        allowMultiSelection: false,
        type: [
          'application/pdf',
          'image/*',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
      });

      if (res?.length) {
        setFieldValue(key, res[0]); // Set picked file to Formik
      }
    } catch (err: any) {
      if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
        console.log('User cancelled picker');
      } else {
        console.error('Document picker error:', err);
      }
    }
  };

  const removeDocument = (key: string) => {
    setFieldValue(key, null);
  };

  return (
    <ScrollView>
      <View
        style={{
          marginHorizontal: Metrics.ratio(30),
          marginVertical: Metrics.ratio(15),
        }}>
        <WeekDaysTimings
          heading={strings('registerProvider.shopTimings')}
          weekdays={values?.weekdays}
          onArrowPress={() => {
            navigation.navigate('ShopTimings', {
              weekdays: values?.weekdays,
              onSet: (weekdays: Weekdays) => {
                setFieldValue('weekdays', weekdays);

                navigation.goBack();
              },
            });
          }}
        />
      </View>
      <View style={styles.seperator} />
      <View
        style={{
          marginHorizontal: Metrics.ratio(15),
          marginVertical: Metrics.ratio(10),
          paddingHorizontal: Metrics.ratio(15),
        }}>
        <Text color={Colors.text.dis} size="sixteen" type="AvenirNextMedium">
          {strings('registerProvider.selectedPaymentMethod')}
        </Text>
      </View>
      <View style={styles.checkBoxView}>
        <View style={styles.checkBoxViewCon}>
          <CheckBox
            title={strings('registerProvider.onlineAccept')}
            textStyle={{
              color: values?.paymentMethods.includes('creditCard')
                ? Colors.secondary
                : Colors.text.dis,
              fontFamily: Fonts.type.AvenirNextRegular,
              fontWeight: 'normal',
            }}
            containerStyle={styles.checkBoxContainer}
            checkedColor={Colors.secondary}
            uncheckedColor={Colors.text.dis}
            checkedIcon="check-square-o"
            uncheckedIcon="square-o"
            checked={values?.paymentMethods.includes('creditCard')}
            onPress={() => {
              const paymentMethods = values.paymentMethods;
              const isSelected = paymentMethods.includes('creditCard');

              const updatedMethods = isSelected
                ? paymentMethods.filter(
                    (method: string) => method !== 'creditCard',
                  )
                : [...paymentMethods, 'creditCard'];
              setFieldValue('paymentMethods', updatedMethods);
            }}
          />
        </View>
        <View style={styles.checkBoxViewCon}>
          <CheckBox
            title={strings('registerProvider.stcAccept')}
            textStyle={{
              color: values?.paymentMethods.includes('stc')
                ? Colors.secondary
                : Colors.text.dis,
              fontFamily: Fonts.type.AvenirNextRegular,
              fontWeight: 'normal',
            }}
            containerStyle={styles.checkBoxContainer}
            checkedColor={Colors.secondary}
            uncheckedColor={Colors.text.dis}
            checkedIcon="check-square-o"
            uncheckedIcon="square-o"
            checked={values?.paymentMethods.includes('stc')}
            onPress={() => {
              const paymentMethods = values.paymentMethods;
              const isSelected = paymentMethods.includes('stc');

              const updatedMethods = isSelected
                ? paymentMethods.filter((method: string) => method !== 'stc')
                : [...paymentMethods, 'stc'];
              setFieldValue('paymentMethods', updatedMethods);
            }}
          />
        </View>
      </View>
      <View style={styles.seperator} />

      <UploadField
        label={strings('registerProvider.uploadLegalAgreement')}
        value={values.legalAgreement}
        onPick={() => onDocumentPick('legalAgreement')}
        onRemove={() => removeDocument('legalAgreement')}
      />

      <UploadField
        label={strings('registerProvider.uploadBusinessAgreement')}
        value={values.businessAgreement}
        onPick={() => onDocumentPick('businessAgreement')}
        onRemove={() => removeDocument('businessAgreement')}
      />

      <UploadField
        label={strings('registerProvider.uploadIqama')}
        value={values.iqama}
        onPick={() => onDocumentPick('iqama')}
        onRemove={() => removeDocument('iqama')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  seperator: {
    height: Metrics.horizontalLineHeight - 1,
    backgroundColor: Colors.text.sec,
    width: Metrics.screenWidth - Metrics.ratio(20 * 2),
    marginLeft: Metrics.ratio(15),
    opacity: 0.7,
    marginTop: Metrics.ratio(10),
  },
  checkBoxView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: Metrics.ratio(15),
  },
  checkBoxViewCon: {
    width: Metrics.screenWidth / 2 - Metrics.ratio(15),
    height: Metrics.ratio(50),
  },
  checkBoxContainer: {
    backgroundColor: Colors.transparent,
    borderWidth: 0,
    marginBottom: Metrics.ratio(-5),
  },
});
export default StepThreeForm;
