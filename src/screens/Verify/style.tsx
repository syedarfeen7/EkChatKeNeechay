import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  text: {
    color: Colors.secondary,
    fontSize: Fonts.size.xSmall,
  },
  matchDesignWithRegister: {
    width: Metrics.ratio(200),
  },
  card: {
    width: Metrics.ratio(200),
    height: Metrics.ratio(56),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.charcoal,
  },
  input: {
    flex: 1,
    width: Metrics.ratio(200),
    textAlign: 'center',
    color: Colors.darkStaleBlue,
    fontFamily: Fonts.type.CircularStdBook,
    fontSize: 30,
  },
  button: {
    marginTop: 5,
  },
  error: {
    width: '86%',
  },
  errorText: {
    textAlign: 'left',
    color: Colors.danger,
  },
  container: {flex: 1, backgroundColor: Colors.primary},
  childContainer: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
  },
  description: {
    marginTop: Metrics.ratio(40),
  },

  descriptionBase20: {
    textAlign: 'center',
    marginHorizontal: Metrics.ratio(40),
    marginBottom: Metrics.ratio(15),
  },
  goBack: {
    paddingVertical: Metrics.ratio(6),
  },
  submitButton: {
    height: Metrics.ratio(42),
    borderColor: Colors.darkStaleBlue,
    backgroundColor: Colors.primary,
    borderWidth: Metrics.ratio(2),
    alignItems: 'center',
    justifyContent: 'center',
    bottom: Metrics.nSmallMargin,
    left: Metrics.ratio(19),
    right: Metrics.ratio(19),
    position: 'absolute',
    borderRadius: Metrics.ratio(5),
  },
  resendLink: {
    textDecorationLine: 'underline',
  },
  wrongNumber: {
    textAlign: 'center',
  },
});
