type TextbookHeaderProp = {
  group: number;
};

type TextbookLevelsProps = {
  group: number;
  changeGroup: (number) => void;
};

declare module '*.jpg';

type TextbookWordsProps = {
  group: number;
  words: Array<GetWord> | null;
  activeCardIndex: number;
  setActiveCardIndex: React.Dispatch<React.SetStateAction<number>>;
};

type GetWord = {
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
};

type TextbookCardProps = {
  words: Array<GetWord> | null;
  activeCardIndex: number;
};
