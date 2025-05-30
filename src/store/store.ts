import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

// reducers
import settings from './reducer/settings';
import user from './reducer/user';

// config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['settings', 'user'],
};

const rootReducer = combineReducers({
  settings: settings,
  user: user,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

//  root reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export const persistor = persistStore(store);
