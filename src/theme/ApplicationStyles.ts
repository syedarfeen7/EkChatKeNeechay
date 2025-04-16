// // @flow
import Metrics from './Metrics';
import Colors from './Colors';

export default {
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  marginHorizontal: {
    marginHorizontal: Metrics.ratio(21),
  },
  marginVertical: {
    marginVertical: Metrics.ratio(24),
  },
  marginTop: {
    marginTop: Metrics.ratio(15),
  },
  doubleMarginTop: {
    marginTop: Metrics.ratio(20),
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  navTitlesWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cross: {
    width: Metrics.image.twozero,
    height: Metrics.image.twozero,
    resizeMode: 'contain',
    position: 'absolute',
    top: 25,
    right: 20,
    bottom: 0,
  },
  navWrapper: {
    flexDirection: 'row',
    height: Metrics.ratio(76),
    width: Metrics.screenWidth,
  },

  orderDetailHeadRow: {
    flexDirection: 'row',
    width: Metrics.screenWidth - Metrics.ratio(19),
    marginLeft: Metrics.ratio(21),
  },
};
