import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GameStatus = {
  mode?: 'anon' | 'textbook';
  deck: Array<Word> | undefined;
  langLevel: number;
  deckPage: number;
};

export const WatchStatus = createSlice({
  name: 'app-status',
  initialState: {
    mode: 'textbook',
    deck: undefined,
    langLevel: 0,
    deckPage: 0,
  } as GameStatus,
  reducers: {
    setDeck: (state, action: PayloadAction<{ deck: Array<Word> }>) => {
      state.deck = action.payload.deck;
    },
  },
});

export const { setDeck } = WatchStatus.actions;
export default WatchStatus.reducer;
