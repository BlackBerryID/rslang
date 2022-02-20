type TextbookHeaderProp = {
  group: number;
  isVocabularyActive: boolean;
  setIsVocabularyActive: React.Dispatch<React.SetStateAction<boolean>>;
};

type TextbookGamesProp = {
  group: number;
  words: Array<GetWord> | null;
  prepareGameData: () => void;
};

type TextbookLevelsProps = {
  group: number;
  changeGroup: (number) => void;
  vocabularyGroup: number;
  changeVocabularyGroup: (number) => void;
  isVocabularyActive: boolean;
  vocabularyWords: never[];
};

declare module '*.jpg';

type TextbookWordsProps = {
  group: number;
  words: Array<GetWord> | null;
  activeCardIndex: number;
  setActiveCardIndex: React.Dispatch<React.SetStateAction<number>>;
  vocabularyWords: never[];
  vocabularyGroup: number;
  isVocabularyActive: boolean;
};

type GetWord = {
  [key: string];
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: {
    difficulty: string;
    optional: {
      audioStreak: string;
      sprintStreak: string;
    };
  };
  _id: string;
};

type TextbookCardProps = {
  words: Array<GetWord> | null;
  activeCardIndex: number;
  updateWords: (wordName: string, difficultyLevel: string) => void;
  page: number;
  group: number;
  getUserWords: (isDataToWrite?: boolean, pageNumber?: number) => Promise<any>;
  setActiveCardIndex: React.Dispatch<React.SetStateAction<number>>;
};
