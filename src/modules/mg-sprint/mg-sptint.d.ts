type GameResult = {
  id: string;
  audio: string;
  word: string;
  translate: string;
  result: boolean;
};

type GameRound = {
  activeWord: string;
  translation: string;
  currentStreak: number;
  currentMultiplier: number;
  currentScore: number;
  giveAnswer: (val: boolean) => void;
};

type Game = {
  langLevel: number;
  bookPage: number;
  deck: Array<Word>;
  decksSeq: Set<number>;
  wordsSeq: Set<string>;
  score: Array<GameResult>;
  streaks: Array<number>;
  timer: Timer | undefined;
  fromBook: bookean;
  endGame: () => void;
};

type GameAuth = {
  userId: string;
  userToken: string;
};

declare module '*.scss';
