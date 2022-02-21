import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GameStatus = {
  mode?: 'anon' | 'textbook';
  deck?: Array<Word> | undefined;
  langLevel?: number;
  deckPage?: number;
};

export const WatchStatus = createSlice({
  name: 'app-status',
  initialState: {
    mode: 'anon',
    deck: undefined,
    langLevel: 0,
    deckPage: 0,
  } as GameStatus,
  reducers: {
    setStatus: (state, action: PayloadAction<GameStatus>) => {
      return (state = { ...action.payload });
    },
  },
});

export const { setStatus } = WatchStatus.actions;
export default WatchStatus.reducer;
