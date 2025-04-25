import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Colors, Fonts, Images, Metrics} from '../../../theme';
import {ButtonView, InputField, Text} from '../../../components';
import {RootStackParamList} from '../../../types/navigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {strings} from '../../../i18n';

interface StepTwoFormProps {
  formikProps: any;
  officeCountryCode: string;
  mobileCountryCode: string;
  mapCoordinates: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  setMobileCountryCode: (code: string) => void;
  setOfficeCountryCode: (code: string) => void;
  setLocation: (coords: number[]) => void;
}

type NavigationProp = StackNavigationProp<RootStackParamList>;

const StepTwoForm: React.FC<StepTwoFormProps> = ({
  formikProps,
  mapCoordinates,
  officeCountryCode,
  mobileCountryCode,
  setMobileCountryCode,
  setOfficeCountryCode,
  setLocation,
}) => {
  const {
    setFieldValue,
    values,
    handleChange,
    setFieldTouched,
    errors,
    touched,
  } = formikProps;
  const navigation = useNavigation<NavigationProp>();

  const [toggleViewMap, setToggleViewMap] = useState(true);

  console.log('values', values);

  const handleMapData = (mapData: {
    detailAddress: string;
    coordinates: {longitude: number; latitude: number};
  }) => {
    setFieldValue('headOfficeAddress', mapData?.detailAddress);

    let location = [];
    location.push(mapData.coordinates.longitude, mapData.coordinates.latitude);

    setLocation(location);

    setToggleViewMap(false);
  };

  return (
    <View>
      <View style={styles.switchWrapper}>
        <ButtonView
          onPress={() => {
            navigation.navigate('SelectCountryCode', {
              title: 'Select Country code',
              onSubmit: (selectedCode: string) => {
                setOfficeCountryCode(
                  selectedCode.substr(1, selectedCode.length - 1),
                );
              },
            });
          }}
          style={styles.buttonView}>
          <Text
            type="AvenirNextMedium"
            size="fourteen"
            color={Colors.white}
            style={styles.btnText}>
            +{officeCountryCode}
          </Text>
        </ButtonView>
        <View style={styles.fieldContainer}>
          <InputField
            isRequired={false}
            label={strings('registerProvider.officePhone')}
            value={values.officePhone}
            onChangeText={handleChange('officePhone')}
            onBlur={() => setFieldTouched('officePhone')}
            placeholder={strings('registerProvider.officePhone')}
            notShowSeparator={true}
            isNumber={true}
            // onSubmitEditing={() => this.onSubmitEditing(nextFieldKey)}
            maxLength={10}
            keyboardType={'number-pad'}
            textContentType={'telephoneNumber'}
            editImageIcon={Images.editIcon}
            onEditPress={() => {}}
            // onEditPress={() => onEditPress('officePhone', 'editNumber')}
          />
        </View>
      </View>
      <View style={styles.seperator} />
      <View style={styles.switchWrapper}>
        <ButtonView
          onPress={() => {
            navigation.navigate('SelectCountryCode', {
              title: 'Select Country code',
              onSubmit: (selectedCode: string) => {
                setMobileCountryCode(
                  selectedCode.substr(1, selectedCode.length - 1),
                );
              },
            });
          }}
          style={styles.buttonView}>
          <Text
            type="AvenirNextMedium"
            size="fourteen"
            color={Colors.white}
            style={styles.btnText}>
            +{mobileCountryCode}
          </Text>
        </ButtonView>
        <View style={styles.fieldContainer}>
          <InputField
            isRequired={true}
            label={strings('registerProvider.mobilePhone')}
            value={values.mobilePhone}
            onChangeText={handleChange('mobilePhone')}
            onBlur={() => setFieldTouched('mobilePhone')}
            placeholder={strings('registerProvider.mobilePhone')}
            notShowSeparator={true}
            isNumber={true}
            // onSubmitEditing={() => this.onSubmitEditing(nextFieldKey)}
            maxLength={10}
            keyboardType={'number-pad'}
            textContentType={'telephoneNumber'}
            editImageIcon={Images.editIcon}
            onEditPress={() => {}}
            // onEditPress={() => onEditPress('officePhone', 'editNumber')}
          />
          {touched.mobilePhone && errors.mobilePhone && (
            <Text style={styles.errorText}>{errors.mobilePhone}</Text>
          )}
        </View>
      </View>
      <View style={styles.seperator} />

      <InputField
        isRequired={true}
        value={values?.adminEmail}
        label={strings('registerProvider.email')}
        // ref={ch => (this.adminEmail = ch)}
        // onSubmitEditing={() => this.onSubmitEditing("datePickerRefopen")}
        keyboardType={'email-address'}
        textContentType={'emailAddress'}
        placeholder={strings('registerProvider.email')}
        onChangeText={handleChange('adminEmail')}
        editImageIcon={Images.editIcon}
        onEditPress={() => {}}
      />
      {touched.adminEmail && errors.adminEmail && (
        <Text style={styles.errorText}>{errors.adminEmail}</Text>
      )}

      <View>
        <View style={styles.addressView}>
          <ButtonView
            style={[
              styles.switchWrapper,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                justifyContent: 'flex-start',
                marginLeft: Metrics.ratio(25),
                flex: 3,
                height:
                  values?.headOfficeAddress &&
                  values?.headOfficeAddress.length > 50
                    ? Metrics.ratio(100)
                    : Metrics.ratio(60),
              },
            ]}
            onPress={() => {
              navigation.navigate('CreateAddress', {
                addressText: values?.headOfficeAddress,
                addressCoords: mapCoordinates,
                onDone: mapData => handleMapData(mapData),
                isReadonly: false,
                searchPlaceHolderText: 'Search',
              });
            }}>
            <Text
              style={{
                fontFamily: Fonts.type.AvenirNextMedium,
                color: values?.headOfficeAddress
                  ? Colors.white
                  : Colors.text.dis,
              }}
              size="sixteen">
              {values?.headOfficeAddress ||
                strings('registerProvider.officeAddress')}
            </Text>
          </ButtonView>

          <ButtonView
            onPress={() => {
              navigation.navigate('CreateAddress', {
                addressText: values?.headOfficeAddress,
                addressCoords: mapCoordinates,
                onDone: mapData => handleMapData(mapData),
                isReadonly: false,
                searchPlaceHolderText: 'Search',
              });
            }}
            style={styles.buttonViewMap}>
            <Image
              style={{
                width: Metrics.ratio(16),
                height: Metrics.ratio(16),
              }}
              resizeMode="contain"
              source={Images.editIcon}
            />
          </ButtonView>
        </View>
        <View
          style={{
            marginTop: Metrics.ratio(5),
          }}>
          <Text style={styles.label}>
            {strings('registerProvider.officeAddress')}
          </Text>
        </View>

        {/* {toggleViewMap && (
          <MapDisplayField
            onMapTap={() => {
              navigation.navigate('CreateAddress', {
                addressText: values?.headOfficeAddress,
                addressCoords: values?.mapCoordinates,
                onDone: mapData => handleMapData(setFieldValue, mapData),
                isReadonly: false,
                searchPlaceHolderText: 'Search',
              });
            }}
            roundedBottom={false}
            isReadonly={true}
            containerStyle={{
              marginTop: Metrics.ratio(2),
              borderRadius: Metrics.ratio(5),
              height: Metrics.ratio(200),
              marginHorizontal: Metrics.ratio(15),
            }}
            mapStyle={{
              borderRadius: Metrics.ratio(5),
            }}
            locationCoords={values?.mapCoordinates}
            markerTitle={''}
            // markerDesc={displayAddress || ''}
          />
        )} */}
      </View>
    </View>
  );
};

export default StepTwoForm;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginHorizontal: 20,
  },
  icon: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonView: {
    justifyContent: 'center',
    width: Metrics.ratio(44),
    height: Metrics.ratio(44),
  },
  btnText: {
    marginBottom: Metrics.ratio(7),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  switchWrapper: {
    flexDirection: 'row',
    marginHorizontal: Metrics.ratio(15),
    marginVertical: Metrics.ratio(10),
    height: Metrics.ratio(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.ratio(5),
    paddingHorizontal: Metrics.ratio(8),
  },
  fieldContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  seperator: {
    height: Metrics.horizontalLineHeight - 1,
    backgroundColor: Colors.text.sec,
    width: Metrics.screenWidth - Metrics.ratio(20 * 2),
    marginLeft: Metrics.ratio(15),
    opacity: 0.7,
    marginTop: Metrics.ratio(10),
  },
  label: {
    paddingLeft: Metrics.ratio(15),
    color: Colors.text.sec,
    fontFamily: Fonts.type.AvenirNextRegular,
    fontSize: Metrics.ratio(12),
    marginTop: Metrics.ratio(-30),
    marginLeft: Metrics.ratio(20),
    alignSelf: 'flex-start',
  },
  buttonViewMap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressView: {flexDirection: 'row'},
});
