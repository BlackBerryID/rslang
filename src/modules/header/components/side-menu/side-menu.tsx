import React from 'react';

import { Drawer, List } from '@mui/material';
import SideMenuItem from '../side-menu-item';
import NavGames from '../nav-games';

const SideMenu = ({ isMenuOpen, toggleSideMenu }: SideMenuProps) => {
  return (
    <Drawer anchor="left" open={isMenuOpen} onClose={toggleSideMenu(false)}>
      <List sx={{ width: '310px', mt: '60px', padding: '10px' }}>
        <SideMenuItem path="/" text="Главная" toggleSideMenu={toggleSideMenu} />
        <SideMenuItem
          path="/textbook"
          text="Учебник"
          toggleSideMenu={toggleSideMenu}
        />
        <NavGames toggleSideMenu={toggleSideMenu} />
        <SideMenuItem
          path="/statistic"
          text="Статистика"
          toggleSideMenu={toggleSideMenu}
        />
        <SideMenuItem
          path="/team"
          text="О команде"
          toggleSideMenu={toggleSideMenu}
        />
      </List>
    </Drawer>
  );
};

export default SideMenu;
