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
  giveAnswer: (val: boolean) => void;
};

type Game = {
  langLevel: number;
  bookPage: number;
  deck: Array<Word>;
  score: Array<GameResult>;
  timer: Timer | undefined;
  currentRound: GameRound;
};
