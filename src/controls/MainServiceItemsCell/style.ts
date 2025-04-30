import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  serviceTitles: {
    alignItems: 'center',
    height: Metrics.ratio(39),
    backgroundColor: Colors.darkStaleBlue,
    color: Colors.primary,
  },
  mainCardWrapper: {
    width: Metrics.image.oneonenine,
    height: Metrics.image.oneonenine,
    borderRadius: Metrics.ratio(5),
    borderWidth: Metrics.ratio(1),
    borderColor: Colors.platinum,
    backgroundColor: Colors.darkStaleBlue,
    marginHorizontal: Metrics.ratio(5),
  },
  mainCardWrapperMerchant: {
    width: Metrics.screenWidth * 0.5 - Metrics.ratio(15),
    height: Metrics.screenWidth * 0.5 - Metrics.ratio(15),
    borderRadius: Metrics.ratio(5),
    backgroundColor: Colors.darkStaleBlue,
    margin: Metrics.ratio(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: Metrics.image.oneonenine,
    height: Metrics.ratio(80),
  },
  cardImageMerchant: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),
  },
  cardImageMerchantTextWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: Metrics.ratio(39),
    color: Colors.primary,
  },
  cardImageTextWrapper: {
    alignItems: 'center',
    height: Metrics.ratio(39),
    color: Colors.primary,
    marginTop: Metrics.ratio(-8),
  },
});
