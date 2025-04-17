import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: Metrics.baseMargin,
    backgroundColor: Colors.primary,
  },
  languageBtnDeactive: {
    flexDirection: 'row',
    width: Metrics.screenWidth * 0.15,
    height: Metrics.ratio(28),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageBtnActive: {
    flexDirection: 'row',
    width: Metrics.screenWidth * 0.15,
    height: Metrics.ratio(28),
    backgroundColor: Colors.darkStaleBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.ratio(5),
    elevation: 4,
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Metrics.ratio(10),
    fontFamily: Fonts.type.AvenirNextDemiBold,
    textAlign: 'center',
  },
  deActiveText: {
    color: Colors.darkStaleBlue,
    fontWeight: 'bold',
    fontSize: Metrics.ratio(10),
    fontFamily: Fonts.type.AvenirNextDemiBold,
    textAlign: 'center',
  },
  langOption: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
