import React, { useState } from 'react';

import Button from '@mui/material/Button';
import LoginPopup from '../login-popup';

export default function Login() {
  const [open, setOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

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
    <Button variant="text" color="secondary" sx={{ height: '40px' }}>
      {getUserName()}
    </Button>
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
