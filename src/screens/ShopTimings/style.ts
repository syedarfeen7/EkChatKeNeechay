import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingTop: Metrics.ratio(10),
  },
  switchWrapper: {
    height: Metrics.ratio(40),
  },
  dateContainer: {
    flex: 1,
    width: Metrics.screenWidth / 4 - 20,
    // marginHorizontal: Metrics.ratio(10),
    borderRadius: Metrics.ratio(5),
    borderColor: Colors.darkStaleBlue,
    borderWidth: Metrics.ratio(1),
    height: Metrics.ratio(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: Colors.text.dis,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: Fonts.type.AvenirNextMedium,
    fontSize: Metrics.ratio(10),
  },
  dateText: {
    color: Colors.white,
    fontSize: Metrics.ratio(12),
    fontFamily: Fonts.type.AvenirNextMedium,
  },
  dateTouchBody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateInput: {
    borderColor: Colors.transparent,
    borderWidth: 0,
    justifyContent: 'center',
  },
  dateIcon: {
    width: Metrics.ratio(12),
    height: Metrics.ratio(12),
    resizeMode: 'contain',
    marginRight: Metrics.ratio(8),
  },
  btnTextConfirm: {
    color: 'black',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.ratio(15),
  },
  headingText: {
    fontSize: Metrics.ratio(10),
    fontFamily: Fonts.type.AvenirNextMedium,
    color: Colors.text.sec3,
    // marginHorizontal: Metrics.ratio(15),
    width: Metrics.screenWidth / 4 - 20,
  },
  timePickerContainer: {
    flexDirection: 'row',
    marginTop: Metrics.ratio(8),
    justifyContent: 'space-between',
    marginHorizontal: Metrics.ratio(15),
  },
  dayName: {
    fontSize: Metrics.ratio(14),
    fontFamily: Fonts.type.AvenirNextDemiBold,
    color: Colors.white,
  },
  checkBoxContainer: {
    backgroundColor: Colors.transparent,
    borderWidth: 0,
    marginBottom: 0,
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
  },
  checkText: {
    width: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  dayNameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.ratio(15),
  },
  buttonContainer: {
    height: Metrics.ratio(40),
    marginHorizontal: Metrics.ratio(15),
    marginVertical: Metrics.ratio(20),
  },
  closedText: {
    fontFamily: Fonts.type.AvenirNextRegular,
    fontWeight: 'normal',
    marginHorizontal: Metrics.ratio(5),
  },
});
