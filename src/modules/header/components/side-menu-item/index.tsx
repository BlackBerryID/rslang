import { ListItemButton } from '@mui/material';
import { NavLink } from '../nav-link';

export const SideMenuItem = ({
  path,
  text,
  toggleSideMenu,
  isGameLink,
}: SideMenuItemProps) => {
  return (
    <ListItemButton
      sx={{ p: '0' }}
      onClick={isGameLink ? toggleSideMenu(false, true) : toggleSideMenu(false)}
      onKeyDown={(e) => toggleSideMenu(false)}
    >
      <NavLink path={path} text={text} size="h5" />
    </ListItemButton>
  );
};
