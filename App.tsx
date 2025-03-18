import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import AppNavigator from './src/navigation/AppNavigator';
import {store, persistor} from './src/app/store'; // ✅ Ensure single correct import
import Loader from './src/components/Loader';
import SplashScreen from './src/screens/SplashScreen';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/i18n/index';
import {clearError} from './src/features/auth/authSlice';

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const loading = useSelector((state: any) => state.loader.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <>
      <Loader visible={loading} />
      <SafeAreaView style={styles.container}>
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : (
          <AppNavigator />
        )}
      </SafeAreaView>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <I18nextProvider i18n={i18n}>
          <AppContent />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
