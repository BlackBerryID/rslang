import React, { useState } from 'react';

import Button from '@mui/material/Button';
import LoginPopup from '../login-popup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Login() {
  const [open, setOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(
    Boolean(localStorage.getItem('user'))
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExitPanelClose = (exit: boolean) => {
    if (exit) {
      localStorage.removeItem('user');
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
        sx={{ height: '40px' }}
      >
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
          Выйти из профиля
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
