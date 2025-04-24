import React from 'react';
import {Image, View} from 'react-native';
import Text from '../Text';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import ButtonView from '../ButtonView';
import styles from './style';

type UploadFieldProps = {
  label: string;
  value: any;
  onPick: () => void;
  onRemove: () => void;
};

const UploadField = ({label, value, onPick, onRemove}: UploadFieldProps) => (
  <View style={{height: Metrics.ratio(90)}}>
    <View style={styles.uploadLabel}>
      <View>
        <Text
          numberOfLines={2}
          style={{
            color: Colors.text.sec,
            fontFamily: Fonts.type.AvenirNextDemiBold,
            fontSize: Metrics.ratio(14),
            width: Metrics.screenWidth * 0.65,
          }}>
          {value?.name ? value.name : label}
        </Text>

        <Text numberOfLines={2} style={styles.uploadText}>
          {label}
        </Text>
      </View>
      <View style={styles.removeBtn}>
        {value?.name && (
          <ButtonView onPress={onRemove}>
            <Image
              style={{width: Metrics.ratio(20), height: Metrics.ratio(20)}}
              source={Images.dustbin}
              resizeMode="contain"
            />
          </ButtonView>
        )}

        <ButtonView onPress={onPick}>
          <Image source={Images.uploadBtn} />
        </ButtonView>
      </View>
    </View>
  </View>
);
export default UploadField;
