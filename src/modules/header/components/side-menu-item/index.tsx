import { ListItemButton } from '@mui/material';
import { NavLink } from '../nav-link';

export const SideMenuItem = ({
  path,
  text,
  toggleSideMenu,
}: SideMenuItemProps) => {
  return (
    <ListItemButton
      sx={{ p: '0' }}
      onClick={toggleSideMenu(false)}
      onKeyDown={(e) => toggleSideMenu(false)}
    >
      <NavLink path={path} text={text} size="h5" />
    </ListItemButton>
  );
};
