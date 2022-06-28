import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import userReducer from './user/userSlice';
import messageReducer from './message/message';
import stripeReducer from './stripe/stripeSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      message: messageReducer,
      stripe: stripeReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
