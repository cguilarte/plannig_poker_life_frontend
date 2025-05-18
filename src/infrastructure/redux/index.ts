import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from "redux-logger";

import planning from '@/app/plannings/core/infrastructure/redux';
import user from '@/app/login/core/infrastructure/redux';
import planningLive from '@/app/planning/core/infrastructure/redux';

import storage from './customStorage';

// REDUCERS
const rootReducer = combineReducers({
	user,
	planning,
	planningLive
});


const VERSION = '0.96';

const persistConfig = {
	key: `planning-poker-${VERSION}`,
	storage: storage,
	whitelist: ['user', 'planningLive'], // Lista de store que van a persistir.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false
		}).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
