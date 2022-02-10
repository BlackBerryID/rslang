import { configureStore } from '@reduxjs/toolkit';
import WatchAuth from './reducers/watch-auth';
import WatchDeck from './reducers/watch-deck';

export default configureStore({
  reducer: {
    userWarden: WatchAuth,
    userActiveDeck: WatchDeck,
  },
});
