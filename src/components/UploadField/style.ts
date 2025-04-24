import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  uploadLabel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Metrics.nBaseMargin,
  },
  uploadText: {
    width: Metrics.screenWidth * 0.65,
    alignSelf: 'flex-start',
    color: Colors.text.sec,
    fontFamily: Fonts.type.AvenirNextRegular,
    fontSize: Metrics.ratio(12),
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Metrics.ratio(-10),
  },
});
