import React from 'react';

import { Drawer, List } from '@mui/material';
import SideMenuItem from '../side-menu-item';
import NavGames from '../nav-games';
import { Pages, Paths } from '../../../../app/constants';

const SideMenu = ({ isMenuOpen, toggleSideMenu }: SideMenuProps) => {
  return (
    <Drawer anchor="left" open={isMenuOpen} onClose={toggleSideMenu(false)}>
      <List sx={{ width: '310px', mt: '60px', padding: '10px' }}>
        <SideMenuItem
          path={Paths.home}
          text={Pages.home}
          toggleSideMenu={toggleSideMenu}
        />
        <SideMenuItem
          path={Paths.textBook}
          text={Pages.textBook}
          toggleSideMenu={toggleSideMenu}
        />
        <NavGames toggleSideMenu={toggleSideMenu} />
        <SideMenuItem
          path={Paths.statistic}
          text={Pages.statistic}
          toggleSideMenu={toggleSideMenu}
        />
        <SideMenuItem
          path={Paths.team}
          text={Pages.team}
          toggleSideMenu={toggleSideMenu}
        />
      </List>
    </Drawer>
  );
};

export default SideMenu;
