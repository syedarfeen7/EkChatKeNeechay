import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Images, Metrics} from '../../../theme';
import {InputField, ImagePicker} from '../../../components';
import {strings} from '../../../i18n';

interface StepOneFormProps {
  formikProps: any;
}

const StepOneForm: React.FC<StepOneFormProps> = ({formikProps}) => {
  const {
    values,
    handleChange,
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
  } = formikProps;

  return (
    <View>
      <View style={styles.editProfileHeaderInfo}>
        <ImagePicker
          onImagePicked={(image: string) => setFieldValue('image', image)}
          source={values?.image ? {uri: values?.image} : Images.logo}
          containerStyle={styles.editImageContainer}
          imageStyle={styles.imageHeader}
          isCropping
          iconStyle={styles.icon}
          smallIcon={Images.cameraWhite}
        />
      </View>
      <InputField
        isRequired
        label={strings('registerProvider.name')}
        value={values.englishName}
        onChangeText={handleChange('englishName')}
        onBlur={() => setFieldTouched('englishName')}
        placeholder={strings('registerProvider.name')}
        editImageIcon={Images.editIcon}
        onEditPress={() => {}}
      />
      {touched.englishName && errors.englishName && (
        <Text style={styles.errorText}>{errors.englishName}</Text>
      )}

      <InputField
        label={strings('registerProvider.arabicName')}
        value={values.arabicName}
        onChangeText={handleChange('arabicName')}
        onBlur={() => setFieldTouched('arabicName')}
        placeholder={strings('registerProvider.arabicName')}
        editImageIcon={Images.editIcon}
        onEditPress={() => {}}
      />

      <InputField
        label={strings('registerProvider.englishDescription')}
        value={values.englishDescription}
        onChangeText={handleChange('englishDescription')}
        onBlur={() => setFieldTouched('englishDescription')}
        placeholder={strings('registerProvider.englishDescription')}
        editImageIcon={Images.editIcon}
        onEditPress={() => {}}
      />

      <InputField
        label={strings('registerProvider.arabicDescription')}
        value={values.arabicDescription}
        onChangeText={handleChange('arabicDescription')}
        onBlur={() => setFieldTouched('arabicDescription')}
        placeholder={strings('registerProvider.arabicDescription')}
        editImageIcon={Images.editIcon}
        onEditPress={() => {}}
      />
    </View>
  );
};

export default StepOneForm;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginHorizontal: 20,
  },
  editProfileHeaderInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.ratio(10),
  },
  editImageContainer: {
    width: Metrics.screenWidth * 0.35,
    height: Metrics.screenWidth * 0.35,
    backgroundColor: Colors.text.sec,
    borderRadius: (Metrics.screenWidth * 0.35) / 2,
    padding: Metrics.ratio(1),
  },
  imageHeader: {
    width: Metrics.screenWidth * 0.35 - Metrics.ratio(2),
    height: Metrics.screenWidth * 0.35 - Metrics.ratio(2),
    backgroundColor: Colors.punch,
    borderRadius: (Metrics.screenWidth * 0.35) / 2,
    overflow: 'hidden',
  },
  icon: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
