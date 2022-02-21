import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { SideMenuItem } from '../side-menu-item';
import { Pages, Paths } from '../../../../app/constants';

export const NavGames = ({ toggleSideMenu }: NavGamesProps) => {
  return (
    <TreeView
      defaultExpanded={['1', '2']}
      defaultCollapseIcon={<ArrowDropDownRoundedIcon />}
      defaultExpandIcon={<ArrowRightRoundedIcon />}
      sx={{ width: '100%', padding: '5px 0 5px 30px' }}
    >
      <TreeItem
        nodeId="1"
        label={Pages.games}
        sx={{
          color: '#fff',
          width: '100%',
          pl: '-10px',
        }}
      >
        <SideMenuItem
          path={Paths.mgSprint}
          text={Pages.mgSprint}
          toggleSideMenu={toggleSideMenu}
          isGameLink={true}
        />
        <SideMenuItem
          path={Paths.mgAudioCall}
          text={Pages.mgAudioCall}
          toggleSideMenu={toggleSideMenu}
          isGameLink={true}
        />
      </TreeItem>
    </TreeView>
  );
};
