import React from 'react';
import {
  View,
  Image,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {Text} from '../../components';
import styles from './style';

type ServiceItem = {
  service: ImageSourcePropType;
  title: string;
};

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  data: ServiceItem;
  index: number;
  onPress?: () => void;
  isMerchant?: boolean;
};

const MainServiceItemsCell: React.FC<Props> = ({
  containerStyle,
  data,
  index,
  onPress,
  isMerchant = false,
}) => {
  return (
    <TouchableOpacity
      key={index}
      style={[
        isMerchant ? styles.mainCardWrapperMerchant : styles.mainCardWrapper,
        containerStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Image
        source={data.service}
        resizeMethod="resize"
        resizeMode="contain"
        style={isMerchant ? styles.cardImageMerchant : styles.cardImage}
      />

      <View
        style={
          isMerchant
            ? styles.cardImageMerchantTextWrapper
            : styles.cardImageTextWrapper
        }>
        <Text
          type="AvenirNextDemiBold"
          color="primary"
          size={isMerchant ? 'sixteen' : 'fourteen'}
          numberOfLines={1}>
          {data.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MainServiceItemsCell;
