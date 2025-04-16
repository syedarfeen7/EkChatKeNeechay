// @flow
// Android
// title 20
// Heading 16
// desc 14

// ios
// title 20
// Heading 20
// desc 17

import Metrics from './Metrics';

const type = {
  CircularStdBook: 'CircularStd-Book',
  AvenirNext: 'Avenir Next',
  AvenirNextBold: 'AvenirNext-Bold',
  AvenirNextDemiBold: 'AvenirNext-DemiBold',
  AvenirNextHeavy: 'AvenirNext-Heavy',
  AvenirNextMedium: 'AvenirNext-Medium',
  AvenirNextRegular: 'AvenirNext-Regular',
};

// Metrics.generatedFontSize(ios, android)

const size = {
  ten: Metrics.generatedFontSize(10),
  xxxSmall: Metrics.generatedFontSize(11),
  xxSmall: Metrics.generatedFontSize(12),
  twelve: Metrics.generatedFontSize(12),
  thirteen: Metrics.generatedFontSize(13),
  fourteen: Metrics.generatedFontSize(14),
  xSmall: Metrics.generatedFontSize(14),
  small: Metrics.generatedFontSize(15),
  sixteen: Metrics.generatedFontSize(16),
  medium: Metrics.generatedFontSize(16),
  normal: Metrics.generatedFontSize(17),
  eighteen: Metrics.generatedFontSize(18),
  large: Metrics.generatedFontSize(20),
  xLarge: Metrics.generatedFontSize(24),
  twoeight: Metrics.generatedFontSize(28),
  xxxLarge: Metrics.generatedFontSize(36),
  xxxxLarge: Metrics.generatedFontSize(50),
};

export default {
  type,
  size,
};
