// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrics.ratio(20),
  },
  timingText: {
    color: Colors.white,
    fontFamily: Fonts.type.AvenirNextDemiBold,
    fontSize: Metrics.ratio(16),
    marginTop: Metrics.ratio(10),
  },
  timingText2: {
    marginTop: Metrics.ratio(5),
    color: Colors.text.sec3,
    fontFamily: Fonts.type.AvenirNextBold,
    fontSize: Metrics.ratio(12),
  },
  outerCircle: {
    borderRadius: Metrics.ratio(8),
    width: Metrics.ratio(16),
    height: Metrics.ratio(16),
    marginHorizontal: Metrics.ratio(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    backgroundColor: Colors.primary,
    borderRadius: Metrics.ratio(4),
    width: Metrics.ratio(8),
    height: Metrics.ratio(8),
  },
  isOpenView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: Metrics.ratio(15)
  },
});
