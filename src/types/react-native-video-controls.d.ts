declare module 'react-native-video-controls' {
  import {Component} from 'react';
  import {StyleProp, ViewStyle} from 'react-native';
  import {VideoProperties} from 'react-native-video';

  interface VideoPlayerProps extends VideoProperties {
    onBack?: () => void;
    onEnd?: () => void;
    onEnterFullscreen?: () => void;
    onExitFullscreen?: () => void;
    toggleResizeModeOnFullscreen?: boolean;
    controlTimeout?: number;
    showOnStart?: boolean;
    tapAnywhereToPause?: boolean;
    disableFullscreen?: boolean;
    disableBack?: boolean;
    disableVolume?: boolean;
    disableTimer?: boolean;
    seekColor?: string;
    toolbar?: React.ReactNode;
    controlAnimationTiming?: number;
    scrubbing?: number;
    style?: StyleProp<ViewStyle>;
  }

  export default class VideoPlayer extends Component<VideoPlayerProps> {}
}
