// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    // maxWidth: 300,
    width: Metrics.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Metrics.ratio(15),
  },
  bg: {backgroundColor: Colors.primary},

  emptyFlex: {
    flex: 4,
  },
  font: {
    fontFamily: Fonts.type.AvenirNextMedium,
  },
  passField: {
    marginTop: Metrics.ratio(18),
  },
  progressBarWrapper: {
    marginVertical: 30,
    height: 15,
    borderRadius: 50,
    backgroundColor: Colors.quaternary,
    marginHorizontal: Metrics.ratio(15),
  },
  progressBarInnerView: {
    height: 15,
    minWidth: 0,
    maxWidth: Metrics.screenWidth - 50,
    backgroundColor: Colors.secondary,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
  },
  progressBarTextWrapper: {
    maxWidth: Metrics.screenWidth - 50,
    flexDirection: 'row',
  },
  progressStartImage: {
    position: 'absolute',
    top: -16,
    right: -40,
    alignSelf: 'flex-end',
    // width: Metrics.ratio(35),
    height: Metrics.ratio(40),
  },
  switchWrapper: {
    flexDirection: 'row',
    marginHorizontal: Metrics.ratio(15),
    marginVertical: Metrics.ratio(10),
    height: Metrics.ratio(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.ratio(5),
    paddingHorizontal: Metrics.ratio(8),
  },
  checkBoxView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: Metrics.ratio(15),
  },
  editProfileHeaderInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: Metrics.ratio(16)
    marginBottom: Metrics.ratio(10),
  },
  editImageContainer: {
    width: Metrics.screenWidth * 0.35,
    height: Metrics.screenWidth * 0.35,
    backgroundColor: Colors.text.sec,
    borderRadius: (Metrics.screenWidth * 0.35) / 2,
    padding: Metrics.ratio(1),
  },
  imageHeader: {
    width: Metrics.screenWidth * 0.35 - Metrics.ratio(2),
    height: Metrics.screenWidth * 0.35 - Metrics.ratio(2),
    backgroundColor: Colors.punch,
    borderRadius: (Metrics.screenWidth * 0.35) / 2,
    overflow: 'hidden',
  },
  errorText: {
    color: '#fa2600',
    marginLeft: Metrics.ratio(15),
    fontSize: Metrics.ratio(12),
    fontFamily: Fonts.type.AvenirNextRegular,
  },
  numberField: {
    marginLeft: 0,
  },
  seperator: {
    // flex: 1,
    height: Metrics.horizontalLineHeight - 1,
    backgroundColor: Colors.text.sec,
    width: Metrics.screenWidth - Metrics.ratio(20 * 2),
    marginLeft: Metrics.ratio(15),
    opacity: 0.7,
    marginTop: Metrics.ratio(10),
  },
  inputIcon: {
    resizeMode: 'contain',
    width: Metrics.ratio(16),
    height: Metrics.ratio(16),
  },
  label: {
    paddingLeft: Metrics.ratio(15),
    color: Colors.text.sec,
    fontFamily: Fonts.type.AvenirNextRegular,
    fontSize: Metrics.ratio(12),
    marginTop: Metrics.ratio(-30),
    marginLeft: Metrics.ratio(20),
    alignSelf: 'flex-start',
  },
  checkBoxContainer: {
    backgroundColor: Colors.transparent,
    borderWidth: 0,
    marginBottom: Metrics.ratio(-5),
  },
  checkBoxViewCon: {
    width: Metrics.screenWidth / 2 - Metrics.ratio(15),
    height: Metrics.ratio(50),
  },
  btnWrapper: {
    marginVertical: Metrics.ratio(10),
    marginBottom: 20,
    flexDirection: 'row',
  },
});
