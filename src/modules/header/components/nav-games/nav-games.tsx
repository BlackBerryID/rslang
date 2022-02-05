import React from 'react';

import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import SideMenuItem from '../side-menu-item';

const NavGames = ({ toggleSideMenu }: NavGamesProps) => {
  return (
    <TreeView
      defaultExpanded={['1', '2']}
      defaultCollapseIcon={<ArrowDropDownRoundedIcon />}
      defaultExpandIcon={<ArrowRightRoundedIcon />}
      sx={{ width: '100%', padding: '5px 0 5px 30px' }}
    >
      <TreeItem
        nodeId="1"
        label="Игры"
        sx={{
          color: '#fff',
          width: '100%',
          pl: '-10px',
        }}
      >
        <SideMenuItem
          path="/sprint"
          text="Спринт"
          toggleSideMenu={toggleSideMenu}
        />
        <SideMenuItem
          path="/audiocall"
          text="Аудиовызов"
          toggleSideMenu={toggleSideMenu}
        />
      </TreeItem>
    </TreeView>
  );
};

export default NavGames;
