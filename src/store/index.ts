import { configureStore } from '@reduxjs/toolkit';
import WatchAuth from './reducers/watch-auth';
import WatchStatus from './reducers/watch-status';

export const store = configureStore({
  reducer: {
    user: WatchAuth,
    appStatus: WatchStatus,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
