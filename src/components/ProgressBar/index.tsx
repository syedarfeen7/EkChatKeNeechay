import React from 'react';
import {View, Image, ViewStyle} from 'react-native';
import {Text} from '../../components';
import {Images, Colors, Metrics, Fonts} from '../../theme';
import styles from './style';

interface ProgressBarProps {
  progress?: number;
  controlWidth?: number;
  containerStyle?: ViewStyle;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  controlWidth = Metrics.screenWidth,
  containerStyle = {},
}) => {
  const progressInPercent = progress * 100;
  const calculatedWidth = progress * controlWidth;

  return (
    <View style={[{flex: 1, alignItems: 'center'}, containerStyle]}>
      <View style={[styles.container, {width: controlWidth}]}>
        {/* Progress Bar Background */}
        <View style={styles.progressBarWrapper}>
          <View
            style={[styles.progressBarInnerView, {width: calculatedWidth}]}
          />
        </View>

        {/* Progress Label */}
        <View
          style={[
            styles.progressBarTextWrapper,
            {
              width: calculatedWidth + Metrics.ratio(10),
              minWidth: Metrics.ratio(20),
            },
          ]}>
          {progress > 0 && (
            <Text
              numberOfLines={1}
              style={{
                color: Colors.quaternary,
                fontSize: Metrics.ratio(12),
                fontFamily: Fonts.type.AvenirNextMedium,
              }}>
              {`${progressInPercent.toFixed(0)}%`}
            </Text>
          )}
        </View>

        {/* Progress Star */}
        <Image
          source={Images.progressStarLarge}
          style={styles.progressStartImage}
          resizeMode="contain"
          resizeMethod="auto"
        />
      </View>
    </View>
  );
};

export default ProgressBar;
