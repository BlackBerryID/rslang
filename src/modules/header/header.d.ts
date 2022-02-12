type NavGamesProps = {
  toggleSideMenu: ToggleSideMenuFunc;
};

type NavLinkProps = {
  path: string;
  text: string;
  size: MUIVariant;
};

type SideMenuProps = {
  isMenuOpen: boolean;
  toggleSideMenu: ToggleSideMenuFunc;
};

type SideMenuItemProps = {
  path: string;
  text: string;
  toggleSideMenu: ToggleSideMenuFunc;
};

interface LoginPopupProps {
  open: boolean;
  onClose: () => void;
  setIsOnline: (param: boolean) => void;
}

type ErrorMessage = string | null;
