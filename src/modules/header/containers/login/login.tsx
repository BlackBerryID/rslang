import React, { useState } from 'react';

import Button from '@mui/material/Button';
import LoginPopup from '../login-popup';

export default function Login() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        sx={{ height: '40px' }}
        onClick={handleClickOpen}
      >
        Войти
      </Button>
      <LoginPopup open={open} onClose={handleClose} />
    </div>
  );
}
