import React, {useRef, useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {ButtonView, Text} from '../../components';
import styles from './style';
import {Images, Metrics, Videos} from '../../theme';
import {strings} from '../../i18n';
import {SessionHelper} from '../../helpers';
import {useDataHelper} from '../../hooks';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import MainServiceItemsCell from '../../controls/MainServiceItemsCell';
import Video, {VideoRef} from 'react-native-video';
import {Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/navigation';
import {useNavigation} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import {drawerMenuSwitched} from '../../features/navigation/navigationSlice';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Landing = () => {
  const {getUserName, getUser} = useDataHelper();
  const {selectedLanguage} = useSelector((state: RootState) => state.language);
  const {newView, appState} = useSelector(
    (state: RootState) => state.navigation,
  );

  const playerRef = useRef<VideoRef>(null);
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const [currentVideo, setCurrentVideo] = useState<number | undefined>(
    undefined,
  );
  const [currentScreen, setCureentScreen] = useState(undefined);
  const displayName = getUserName(selectedLanguage);
  const user = getUser();

  const serviceImages = [
    {
      key: 'scan',
      title: strings('landingPage.scan'),
      service: Images.scanImage,
    },
    {
      key: 'orderHistory',
      title: strings('landingPage.orderHistory'),
      service: Images.cartImage,
    },
  ];

  const playVideo = (vidToPlay: number) => {
    if (currentVideo === vidToPlay) {
      setCurrentVideo(undefined);
    } else {
      setCurrentVideo(vidToPlay);
    }
  };

  const doShowPlayer = (source: number) => {
    const isShow =
      currentVideo &&
      currentVideo === source &&
      (currentScreen === undefined ||
        currentScreen === 'landingPage' ||
        newView === 'landingPage') &&
      (appState === undefined || appState !== 'background') &&
      newView !== 'videoPlayer';

    return isShow;
  };

  const resetVideo = () => {
    setCurrentVideo(undefined);
    if (playerRef?.current && typeof playerRef?.current.seek === 'function') {
      playerRef?.current.seek(0);
    }
  };

  const lockOrientation = () => {
    Orientation.lockToPortrait();
  };
  const openVideoPlayer = (source: number) => {
    navigation.navigate('VideoPlayer', {
      lockOrientation,
      source,
      onBack: () => {
        resetVideo();
        dispatch(drawerMenuSwitched({oldView: '', newView: 'landingPage'}));
      },
    });

    dispatch(drawerMenuSwitched({oldView: '', newView: 'videoPlayer'}));
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} style={styles.container}>
      <View>
        <View
          style={[
            styles.Heading1,
            {
              marginHorizontal: Metrics.ratio(20),
            },
          ]}>
          <Text
            style={{
              lineHeight: Metrics.ratio(30),
            }}
            color="white"
            type="AvenirNextDemiBold"
            size="eighteen">
            {SessionHelper.isUserAuthenticated(user)
              ? strings('landingPage.heading1') + ' ' + displayName
              : strings('landingPage.heading_disabled')}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
          }}>
          <FlatList
            data={serviceImages}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginTop: Metrics.ratio(15)}}
            renderItem={({item, index}) => (
              <MainServiceItemsCell
                data={item}
                index={index}
                onPress={() => {
                  if (item.key === 'scan') {
                    // AnalyticsHelper.logEvent('lndingPgeOprtToQrScreen', {
                    //   from: 'landingPageOperator + ScanButton',
                    //   to: 'qrCodeScreen',
                    // });
                    // RedirectionHelper.pushOnce('showqr', {
                    //   onBack: () => {
                    //     this.resetVid();
                    //     this.props.navigationChanged('', 'landingPage');
                    //   },
                    //   title: strings('landingPage.scan'),
                    // });
                    // this.props.navigationChanged('', 'showqr');
                  } else if (item.key === 'orderHistory') {
                    // AnalyticsHelper.logEvent('lndingPgeOprtToOrdrHstry', {
                    //   from: 'landingPageOperator + OrderHistoryButton',
                    //   to: 'orderHistory',
                    // });
                    // RedirectionHelper.pushOnce('orders', {
                    //   onBack: () => {
                    //     this.resetVid();
                    //     this.props.navigationChanged('', 'landingPage');
                    //   },
                    //   title: strings('landingPage.orderHistory'),
                    // });
                    // this.props.navigationChanged('', 'orderHistory');
                  }
                }}
              />
            )}
            ListHeaderComponent={() => (
              <View style={{width: Metrics.ratio(15)}} />
            )}
            ListFooterComponent={() => (
              <View style={{width: Metrics.ratio(15)}} />
            )}
          />
        </View>
      </View>

      <View
        style={[
          {
            marginLeft: Metrics.ratio(23),
            paddingRight: Metrics.ratio(23),
          },
        ]}>
        <View style={styles.headingStyle}>
          <Text color="white" type="AvenirNextDemiBold" size="eighteen">
            {strings('landingPage.aboutTitle')}
          </Text>
        </View>

        <View style={styles.about}>
          <Text style={styles.aboutUsText}>
            {strings('landingPage.aboutDescription')}
          </Text>
        </View>

        <View style={styles.headingStyle}>
          <Text color="white" type="AvenirNextDemiBold" size="eighteen">
            {strings('landingPage.videoTitle')}
          </Text>
        </View>

        <View style={styles.about}>
          <Text style={styles.aboutUsText}>
            {strings('landingPage.videoDescription')}
          </Text>
        </View>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.container}
        horizontal={true}>
        <View style={{width: Metrics.ratio(6)}} />
        <ButtonView
          style={[styles.exploreView]}
          onPress={() => {
            // AnalyticsHelper.logEvent('vdeoPlayerLndngPgeOprt');
            playVideo(Videos.vid1);
          }}>
          <View style={styles.videoPlayer}>
            {!doShowPlayer(Images.vid1snap) ? (
              <Video
                source={Videos.vid1}
                ref={playerRef}
                style={styles.backgroundVideo}
                muted={false}
                repeat={true}
                paused={currentVideo !== Videos.vid1}
                onEnd={resetVideo}
              />
            ) : (
              <Image
                source={Images.vid1snap}
                style={styles.backgroundVideo}
                resizeMode={'cover'}
                resizeMethod={'auto'}
              />
            )}

            {currentVideo !== Videos.vid1 && (
              <TouchableOpacity
                style={styles.exploreBox}
                onPress={() => playVideo(Videos.vid1)}>
                <Image source={Images.videoPlayBtn} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.fullScreenBtn}
              onPress={() => openVideoPlayer(Videos.vid1)}>
              <Image
                source={Images.fullScreenVidPlay}
                style={styles.fullScreenBtnImg}
              />
            </TouchableOpacity>
          </View>
        </ButtonView>

        <View style={{width: Metrics.ratio(6)}} />
      </ScrollView>
    </ScrollView>
  );
};
export default Landing;
