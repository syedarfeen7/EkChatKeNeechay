import React from 'react';
import {View, StatusBar, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from '../../theme';
import styles from './styles';

interface LoadingProps {
  loading?: boolean;
  isBlockingLoader?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  loading = false,
  isBlockingLoader = true,
}) => {
  const renderBlockingLoader = () => {
    return (
      <View>
        <StatusBar networkActivityIndicatorVisible={loading} />
        <Modal
          style={styles.modal}
          backdropOpacity={0.1}
          animationIn="fadeIn"
          isVisible={loading}>
          <View style={styles.container}>
            <ActivityIndicator animating color={Colors._orange} size="large" />
          </View>
        </Modal>
      </View>
    );
  };

  const renderNonBlockingLoader = () => {
    if (loading) {
      return (
        <View
          pointerEvents="none"
          style={styles.renderNonBlockingContainerStyle}>
          <ActivityIndicator
            animating
            color={Colors.darkStaleBlue}
            size="large"
          />
        </View>
      );
    }
    return null;
  };

  return isBlockingLoader ? renderBlockingLoader() : renderNonBlockingLoader();
};

export default Loading;
