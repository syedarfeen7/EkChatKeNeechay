import React, {useEffect, useState, useCallback} from 'react';
import {BackHandler, SafeAreaView, View} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';

import styles from './style';
// import { AnalyticsHelper } from '../../helpers';

type RouteParams = {
  VideoPlayerScreen: {
    source: number;
    lockOrientation: () => void;
    onBack?: () => void;
  };
};

const VideoPlayerScreen: React.FC = () => {
  const [displayVideo, setDisplayVideo] = useState(true);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'VideoPlayerScreen'>>();

  const {source, lockOrientation, onBack} = route.params;

  useEffect(() => {
    // AnalyticsHelper.setCurrentScreen('VideoPlayer');
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackPress = useCallback(() => {
    setDisplayVideo(false);
    lockOrientation();
    if (onBack) onBack();
    navigation.goBack();
    return true;
  }, [lockOrientation, onBack, navigation]);

  const resetPlayer = () => {
    setDisplayVideo(false);
    lockOrientation();
    if (onBack) onBack();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={styles.container}>
        {displayVideo && (
          <VideoPlayer
            disableFullscreen
            source={source}
            onBack={() => {
              resetPlayer();
              navigation.goBack();
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default VideoPlayerScreen;
