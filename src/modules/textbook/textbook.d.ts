type TextbookColorProp = {
  color: string;
};

type TextbookLevelsProps = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

declare module '*.jpg';

type TextbookWordsProps = {
  color: string;
  words: Array<GetWord> | null;
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
