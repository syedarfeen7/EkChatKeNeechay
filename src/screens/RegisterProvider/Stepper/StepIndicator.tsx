import React from 'react';
import {View, Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {Colors, Fonts, Metrics} from '../../../theme';
import {strings} from '../../../i18n';

interface Props {
  currentPosition: number;
  onStepsPress: (position: number) => void;
}

const CustomStepIndicator: React.FC<Props> = ({
  currentPosition,
  onStepsPress,
}) => {
  const labels = [
    strings('registerProvider.serviceProviderDetail'),
    strings('registerProvider.contactDetail'),
    strings('registerProvider.otherDetail'),
  ];

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: Metrics.ratio(4),
    currentStepStrokeWidth: Metrics.ratio(4),
    stepStrokeCurrentColor: Colors.darkStaleBlue,
    stepStrokeWidth: Metrics.ratio(4),
    stepStrokeFinishedColor: Colors.darkStaleBlue,
    stepStrokeUnFinishedColor: Colors.punch,
    separatorFinishedColor: Colors.darkStaleBlue,
    separatorUnFinishedColor: Colors.punch,
    stepIndicatorFinishedColor: Colors.darkStaleBlue,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: Colors.darkStaleBlue,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: Colors.punch,
    labelColor: '#ffffff',
    labelSize: Metrics.ratio(12),
    currentStepLabelColor: Colors.darkStaleBlue,
  };

  return (
    <View style={{marginBottom: Metrics.ratio(20)}}>
      <StepIndicator
        stepCount={3}
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        onPress={onStepsPress}
        renderLabel={({stepStatus, label}) => (
          <Text
            style={{
              color:
                stepStatus === 'current' ? Colors.darkStaleBlue : Colors.white,
              fontSize: Metrics.ratio(12),
              width: Metrics.ratio(80),
              textAlign: 'center',
              fontFamily: Fonts.type.AvenirNextDemiBold,
            }}>
            {label}
          </Text>
        )}
      />
    </View>
  );
};

export default CustomStepIndicator;
