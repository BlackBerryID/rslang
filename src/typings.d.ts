type Word = {
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

type NavLinkProps = {
  path: string;
  text: string;
  size: MUIVariant;
};

type SideMenuItemProps = {
  path: string;
  text: string;
  toggleSideMenu: ToggleSideMenuFunc;
};

type SideMenuProps = {
  isMenuOpen: boolean;
  toggleSideMenu: ToggleSideMenuFunc;
};

type ToggleSideMenuFunc = (
  open: boolean
) => (event: React.KeyboardEvent | React.MouseEvent) => void;

type NavGamesProps = {
  toggleSideMenu: ToggleSideMenuFunc;
};

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

type SideMenuProps = {
  isMenuOpen: boolean;
  toggleSideMenu: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

interface LoginPopupProps {
  open: boolean;
  onClose: () => void;
  setIsOnline: (param: boolean) => void;
}

type ErrorMessage = string | null;

type TextbookHeaderProps = {
  color: string;
};
