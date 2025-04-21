// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    // marginVertical: Metrics.ratio(30),
    marginTop: Metrics.ratio(30),
    marginBottom: Metrics.ratio(15),
    marginHorizontal: Metrics.ratio(15),
  },
  progressBarWrapper: {
    height: Metrics.ratio(10),
    borderRadius: Metrics.ratio(50),
    backgroundColor: Colors.quaternary,
    justifyContent: 'flex-start',
    marginBottom: Metrics.ratio(10),
  },
  progressBarInnerView: {
    height: Metrics.ratio(10),
    minWidth: 0,
    backgroundColor: Colors.secondary,
    borderBottomLeftRadius: Metrics.ratio(50),
    borderTopLeftRadius: Metrics.ratio(50),
  },
  progressBarTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressStartImage: {
    position: 'absolute',
    top: Metrics.ratio(-12.5),
    right: Metrics.ratio(-11),
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
  },
});
