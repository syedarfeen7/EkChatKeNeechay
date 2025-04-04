import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Modal, Animated, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface LoaderProps {
  visible: boolean;
}

const IconComponent = Icon as unknown as React.FC<{
  name: string;
  style?: object;
}>;

const Loader: React.FC<LoaderProps> = ({visible = true}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [visible, scaleAnim]);

  if (!visible) {
    return null;
  }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.container}>
        <Animated.View style={{transform: [{scale: scaleAnim}]}}>
          <IconComponent name="opencart" style={styles.loaderIcon} />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  loaderIcon: {
    color: '#FFFFFF',
    fontSize: 45,
  },
});

export default Loader;
