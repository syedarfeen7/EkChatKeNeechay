// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

function wp(percentage: number) {
  const value = (percentage * Metrics.screenWidth) / 100;
  return Math.round(value);
}

const entryBorderRadius = 8;

const slideHeight = Metrics.screenHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = Metrics.screenWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
const boxWith = Metrics.screenWidth * 0.87;
const boxHeight = Metrics.screenHeight * 0.275;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
  },
  Heading1: {
    marginTop: Metrics.ratio(30),
  },
  serviceImages1: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    marginTop: Metrics.ratio(-30),
    borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
  },
  serviceBox: {
    width: Metrics.image.onefourzero,
    height: Metrics.image.oneonenine,
    borderTopRightRadius: Metrics.ratio(5),
    borderTopLeftRadius: Metrics.ratio(5),
    borderTopWidth: Metrics.ratio(1),
  },
  serviceImages2: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    borderRadius: Metrics.ratio(5),
    borderColor: Colors.platinum,
    borderWidth: Metrics.ratio(1),
    margin: Metrics.ratio(5),
  },
  imageContainer1: {
    width: Metrics.screenWidth / 2.5,
    height: Metrics.screenWidth / 3,
  },
  imageContainer2: {
    width: Metrics.screenWidth - Metrics.ratio(50),
    height: Metrics.screenWidth - Metrics.ratio(120),
  },
  parallaxParent1: {
    shadowColor: Colors.platinum,
    elevation: 2,
    borderColor: Colors.platinum,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parallaxParent2: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  serviceImages3: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
  },
  imageContainer3: {
    width: Metrics.screenWidth / 2.5,
    height: Metrics.screenWidth / 3,
  },
  parallaxParent3: {
    shadowColor: Colors.platinum,
    elevation: 2,
    borderColor: Colors.platinum,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainerEven: {
    backgroundColor: Colors.black,
  },
  title: {
    color: Colors.darkStaleBlue,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  headScrollTitle: {
    height: Metrics.ratio(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headScrollTitleDemand: {
    color: Colors.white,
    height: Metrics.ratio(50),
    justifyContent: 'center',
  },

  titleEven: {
    color: 'white',
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  serviceImages: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
  },
  imageContainer: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth - Metrics.ratio(240),
  },
  parallaxParent: {
    minHeight: 130,
    shadowColor: Colors.platinum,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  lottieParentView: {
    flex: 1,
    height:
      Metrics.screenHeight -
      Metrics.tabBarHeight -
      Metrics.navBarHeight -
      Metrics.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  view2lastItem: {},
  view2IstItem: {},
  view2tems: {
    marginHorizontal: Metrics.ratio(5),
  },
  serviceTitles: {
    alignItems: 'center',
    height: Metrics.ratio(39),
    backgroundColor: Colors.darkStaleBlue,
    color: Colors.primary,
  },
  servicetitledemandBox: {
    position: 'absolute',
    bottom: '10%',
    marginLeft: Metrics.ratio(10),
    paddingRight: Metrics.ratio(10),
  },
  exploreBox: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),

    borderRadius: Metrics.ratio(25),
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullScreenBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: Metrics.ratio(44),
    height: Metrics.ratio(44),
    backgroundColor: '#fff',
    borderWidth: Metrics.ratio(0),
    borderRadius: Metrics.ratio(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenBtnImg: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
  },
  automobileImageBox: {
    width: Metrics.image.threeonefive,
    height: Metrics.image.onesevensix,
    borderColor: Colors.platinum,
    borderRadius: Metrics.ratio(5),
    borderWidth: Metrics.ratio(1),
    overflow: 'hidden',
  },
  videoPlayer: {
    width: boxWith,
    height: boxHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: boxWith,
    height: boxHeight,
  },
  servicedemandBox: {
    width: Metrics.image.onesevenzero,
    height: Metrics.image.onesevenzero,
    // borderRadius: Metrics.ratio(5),
    // borderWidth: Metrics.ratio(1),
    // borderColor: Colors.white,
    // borderRadius: Metrics.ratio(5),
    // overflow: "hidden"
  },
  viewDemand2lastItem: {
    marginRight: Metrics.ratio(20),
  },
  exploreView: {
    width: boxWith,
    height: boxHeight,
    // marginVertical: Metrics.ratio(20),
    marginHorizontal: Metrics.ratio(14),
    borderColor: Colors.platinum,
    borderRadius: Metrics.ratio(5),
    borderWidth: Metrics.ratio(1),
    overflow: 'hidden',
    marginTop: Metrics.ratio(10),
    marginBottom: Metrics.ratio(20),
  },

  exploreViewIstItem: {
    marginLeft: Metrics.ratio(17),
  },
  exploreViewLastItem: {
    marginRight: Metrics.ratio(17),
  },
  separatorView: {
    height: Metrics.ratio(30),
    justifyContent: 'center',
  },
  nodemandServiceView: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: Metrics.ratio(20),
  },
  servicingImage: {
    resizeMode: 'contain',
    flex: 1,
  },

  serviceImagePlaceholder: {
    flex: 1,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  viewDemand2: {
    // height: Metrics.ratio(230),
    marginBottom: Metrics.ratio(20),
    marginLeft: Metrics.ratio(20),
  },
  viewDemand1: {
    // height: Metrics.image.onesevenzero,
    marginBottom: Metrics.ratio(20),
    marginLeft: Metrics.ratio(20),
    marginRight: Metrics.ratio(20),
  },
  about: {
    // marginLeft: Metrics.ratio(20),
    // paddingRight: Metrics.ratio(20),
    marginTop: Metrics.ratio(5),
    flex: 1,
  },
  aboutUsText: {
    color: Colors.text.sec,
    fontFamily: Fonts.type.CircularStdBook,
    fontSize: Metrics.ratio(14),
    lineHeight: Metrics.ratio(14),
  },
  headingStyle: {
    marginTop: Metrics.ratio(20),
    // backgroundColor: "red"
  },
});
