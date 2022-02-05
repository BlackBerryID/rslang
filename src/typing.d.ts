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
