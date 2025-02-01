import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer'; // Ensure correct import

// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Persist only 'auth'
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create persistor
const persistor = persistStore(store);

export {store, persistor}; // ✅ Export correctly
