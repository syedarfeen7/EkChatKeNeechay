import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './src/navigator';
import {store, persistor} from './src/app/store'; // ✅ Ensure single correct import
// import {loadInitialLanguage} from './src/i18n';
// import Loader from './src/components/Loader';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/i18n';
// import {clearError} from './src/features/register/registerSlice';

const App = () => {
  return (
    <View style={styles.appContainer}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <I18nextProvider i18n={i18n}>
            <AppContent />
          </I18nextProvider>
        </PersistGate>
      </Provider>
      {/* <MessageBar />
      <AppStateComponent
        handleAppState={nextState => {
          this.state.store.dispatch(onAppStateChanged(nextState));
        }}
      />
      <RootedDeviceAlertModal
        doShowModal={Utils.isDeviceRooted() && Utils.isReleaseMode()}
      />
      <VersionUpdateModal
        data={this.state.appConfigData}
        doShowModal={this.state.showVerUpdateModal}
      /> */}
    </View>
  );
};

const AppContent = () => {
  return (
    <>
      {/* <Loader visible={loading} /> */}
      <SafeAreaView style={styles.container}>
        {/* <InternetMsgBar /> */}
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
        {/* <TermsAndConditionModal /> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  appContainer: {
    flex: 1,
  },
});

export default App;
