import React from 'react';

import { ListItemButton } from '@mui/material';
import NavLink from '../nav-link';

const SideMenuItem = ({ path, text, toggleSideMenu }: SideMenuItemProps) => {
  return (
    <ListItemButton
      sx={{
        padding: '15px 0 15px 60px',
      }}
      onClick={toggleSideMenu(false)}
      onKeyDown={(e) => toggleSideMenu(false)}
    >
      <NavLink path={path} text={text} size="h5" />
    </ListItemButton>
  );
};

export default SideMenuItem;
