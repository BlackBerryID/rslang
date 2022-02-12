import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const WatchDeck = createSlice({
  name: 'auth',
  initialState: <Array<Word>>[],
  reducers: {
    addDeck: (
      state: Array<Word>,
      action: PayloadAction<{ deck: Array<Word> }>
    ) => {
      state = action.payload.deck;
    },
  },
});

export const { addDeck } = WatchDeck.actions;
export default WatchDeck.reducer;
