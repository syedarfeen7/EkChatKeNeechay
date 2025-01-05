import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';

interface LoaderProps {
  visible: boolean;
}

const Loader: React.FC<LoaderProps> = ({visible}) => {
  if (!visible) {
    return null;
  }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#05c3de" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.67)',
  },
});

export default Loader;
