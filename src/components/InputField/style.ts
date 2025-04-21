// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    marginLeft: Metrics.ratio(15),
    paddingLeft: Metrics.ratio(15),
    color: Colors.white,
    fontSize: Metrics.ratio(16),
    fontFamily: Fonts.type.AvenirNextMedium,
    height: Metrics.ratio(50),
  },
  label: {
    paddingLeft: Metrics.ratio(11),
    color: Colors.text.sec,
    fontFamily: Fonts.type.AvenirNextRegular,
    fontSize: Metrics.ratio(12),
    marginTop: Metrics.ratio(-10),
  },
  requiredSign: {
    paddingLeft: Metrics.ratio(3),
    color: Colors.secondary,
    fontFamily: Fonts.type.AvenirNextRegular,
    fontSize: Metrics.ratio(16),
    marginTop: Metrics.ratio(-13),
  },
  inputIcon: {
    marginRight: Metrics.ratio(25),
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.ratio(44),
    height: Metrics.ratio(44),
    alignSelf: 'center',
  },
  inputBox: {
    flexDirection: 'row',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Metrics.ratio(10),
  },
  seperator: {
    flex: 1,
    height: Metrics.horizontalLineHeight - 1,
    backgroundColor: Colors.text.sec,
    marginHorizontal: Metrics.ratio(15),
    opacity: 0.7,
    marginTop: Metrics.ratio(15),
  },
  inputIconImage: {
    width: Metrics.ratio(16),
    height: Metrics.ratio(16),
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: Metrics.ratio(15),
  },
  errorText: {
    color: 'red',
    fontSize: Metrics.ratio(10),
    fontFamily: Fonts.type.AvenirNextMedium,
    marginHorizontal: Metrics.ratio(20),
    marginTop: Metrics.ratio(4),
  },
});
