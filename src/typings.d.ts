// ===== 1. WORDS ===== //

type Word = {
  id: string;
  _id?: string;
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
  userWord?: WordOptional;
};

type WordOptional = {
  difficulty?: string;
  optional?: {
    audioStreak?: string;
    sprintStreak?: string;
    learnedInfo?: {
      date: string;
      game: string;
    };
  };
};

type AdditionUserWord = {
  userId: string;
  userToken: string;
  wordId: string;
  updateReq: WordOptionalType;
};

// ===== ===== ===== //

type User = {
  message?: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

type NavLinkProps = {
  path: string;
  text: string;
  size: MUIVariant;
};

type SideMenuItemProps = {
  path: string;
  text: string;
  toggleSideMenu: ToggleSideMenuFunc;
  isGameLink?: boolean;
};

type SideMenuProps = {
  isMenuOpen: boolean;
  toggleSideMenu: ToggleSideMenuFunc;
};

type ToggleSideMenuFunc = (
  open: boolean,
  isGameDirection?: boolean
) => (event: React.KeyboardEvent | React.MouseEvent) => void;

type MUIVariant =
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'inherit'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'overline'
  | undefined;
