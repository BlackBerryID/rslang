import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const localData = localStorage.user ? JSON.parse(localStorage.user) : undefined;

export const WatchAuth = createSlice({
  name: 'auth',
  initialState: localData || {
    userId: '',
    token: '',
    refreshToken: '',
    name: '',
  },
  reducers: {
    putUser: (state, action: PayloadAction<User>) => {
      return (state = action.payload);
    },
    removeUser: (state) => {
      return (state = {
        userId: '',
        token: '',
        refreshToken: '',
        name: '',
      });
    },
  },
});

export const { putUser, removeUser } = WatchAuth.actions;
export default WatchAuth.reducer;
