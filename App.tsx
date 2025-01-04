import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/i18n/index'; // Path to your i18n setup
import SplashScreen from './src/screens/SplashScreen';
import {Provider} from 'react-redux';
import {store} from './src/app/store';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SafeAreaView style={styles.container}>
          {showSplash ? (
            <SplashScreen onComplete={() => setShowSplash(false)} />
          ) : (
            <AppNavigator />
          )}
        </SafeAreaView>
      </I18nextProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
