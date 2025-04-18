import React, {useEffect} from 'react';
import {View, Keyboard, StyleSheet} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import {Metrics} from '../../theme';
import {strings} from '../../i18n';
import {RootStackParamList} from '../../types/navigation';

type SelectCountryCodeRouteProp = RouteProp<
  RootStackParamList,
  'SelectCountryCode'
>;
type SelectCountryCodeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SelectCountryCode'
>;

const SelectCountryCode: React.FC = () => {
  const navigation = useNavigation<SelectCountryCodeNavigationProp>();
  const route = useRoute<SelectCountryCodeRouteProp>();

  const {onSubmit} = route.params;

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const handleCountrySelect = (item: {dial_code: string}) => {
    if (onSubmit) {
      onSubmit(item.dial_code);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CountryPicker
        show={true}
        style={{
          modal: styles.modal,
          textInput: styles.searchInput,
        }}
        pickerButtonOnPress={handleCountrySelect}
        inputPlaceholder={strings('selectCountry.search')}
        lang="en"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    height: '100%',
    paddingHorizontal: Metrics.ratio(10),
  },
  searchInput: {
    marginLeft: Metrics.ratio(3),
  },
});

export default SelectCountryCode;
