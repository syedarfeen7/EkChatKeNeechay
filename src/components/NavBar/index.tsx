import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
  TextStyle,
} from 'react-native';
import {Text, ButtonView} from '../';
import {Metrics} from '../../theme';
import {isRTL} from '../../i18n';

type NavBarProps = {
  onLeftTapped?: () => void;
  onRightTapped?: () => void;
  leftImage?: ImageSourcePropType;
  rightImage?: ImageSourcePropType;
  title?: string;
  title2?: string;
  titleStyle?: TextStyle;
};

const NavBar: React.FC<NavBarProps> = ({
  onLeftTapped = () => {},
  onRightTapped = () => {},
  leftImage,
  rightImage,
  title = '',
  title2,
  titleStyle = {},
}) => {
  return (
    <View style={styles.container}>
      {onLeftTapped && leftImage && (
        <ButtonView onPress={onLeftTapped} style={styles.leftButton}>
          <Image
            source={leftImage}
            style={[
              styles.icon,
              isRTL() ? {transform: [{rotate: '180deg'}]} : {},
            ]}
          />
        </ButtonView>
      )}

      <View style={styles.centerContainer}>
        <Text
          type="AvenirNextDemiBold"
          color="white"
          size="sixteen"
          numberOfLines={1}
          style={titleStyle}>
          {title}
        </Text>
        {!!title2 && (
          <Text
            type="AvenirNextDemiBold"
            color="white"
            size="sixteen"
            numberOfLines={1}>
            {title2}
          </Text>
        )}
      </View>

      {onRightTapped && rightImage && (
        <ButtonView onPress={onRightTapped} style={styles.rightButton}>
          <Image source={rightImage} style={styles.icon} />
        </ButtonView>
      )}
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Metrics.ratio(76),
    width: Metrics.screenWidth,
  },
  leftButton: {
    width: Metrics.ratio(44),
    height: Metrics.ratio(44),
    position: 'absolute',
    top: Metrics.ratio(16),
    left: Metrics.ratio(16),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightButton: {
    width: Metrics.ratio(44),
    height: Metrics.ratio(44),
    position: 'absolute',
    top: Metrics.ratio(16),
    right: Metrics.ratio(16),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: Metrics.ratio(65),
  },
  icon: {
    width: Metrics.image.twozero,
    height: Metrics.image.twozero,
    resizeMode: 'contain',
  },
});
