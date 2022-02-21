import { useState } from 'react';

import { Button, Avatar, Menu, MenuItem } from '@mui/material';
import { LoginPopup } from '../login-popup';
import { deepOrange } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { Paths } from '../../../../app/constants';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../../../store/reducers/watch-auth';

export function Login() {
  const [open, setOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(
    Boolean(localStorage.getItem('user'))
  );

  const reduce = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExitPanelClose = (exit: boolean) => {
    if (exit) {
      reduce(removeUser());
      localStorage.clear();
      setIsOnline(false);
    }
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUserName = () => {
    return JSON.parse(
      localStorage.getItem('user') || JSON.stringify({ name: 'unauthorized' })
    ).name;
  };

  const button = isOnline ? (
    <>
      <Button
        id="basic-button"
        aria-controls={isMenuOpen ? 'basic-menu' : undefined}
        aria-expanded={isMenuOpen ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        variant="text"
        color="secondary"
        sx={{ height: '40px', fontSize: '18px' }}
      >
        <Avatar sx={{ bgcolor: deepOrange['A100'], mr: '10px' }}>
          {getUserName()[0]}
        </Avatar>
        {getUserName()}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={() => handleExitPanelClose(false)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => handleExitPanelClose(true)}
          sx={{ fontSize: '14px' }}
        >
          <Link to={Paths.home} className="exit-link">
            Выйти из профиля
          </Link>
        </MenuItem>
      </Menu>
    </>
  ) : (
    <Button
      variant="contained"
      color="secondary"
      sx={{ height: '40px' }}
      onClick={handleClickOpen}
    >
      Войти
    </Button>
  );

  return (
    <>
      {button}
      <LoginPopup open={open} onClose={handleClose} setIsOnline={setIsOnline} />
    </>
  );
}
