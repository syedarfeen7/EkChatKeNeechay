// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: Metrics.ratio(42),
    backgroundColor: Colors.darkStaleBlue,
    borderRadius: Metrics.ratio(5),
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  borderedButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: Metrics.ratio(42),
    backgroundColor: Colors.primary,
    borderRadius: Metrics.ratio(5),
    borderWidth: Metrics.ratio(2),
    borderColor: Colors.darkStaleBlue,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
