import { Alert, Box } from '@mui/material';
import React from 'react';

const GuestAlert = () => {
  return (
    <Box sx={{ mt: 10, textAlign: 'center' }}>
      <Alert severity="warning">
        Войдите, чтобы сохранять и просматривать статистику обучения.
      </Alert>
    </Box>
  );
};

export { GuestAlert };
