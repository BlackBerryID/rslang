import React, { useState } from 'react';

import { Button, ButtonGroup } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const LoginPopup = (props: LoginPopupProps) => {
  const { onClose, open } = props;

  const [registration, setRegistration] = useState(false);
  const [validation, setValidation] = useState({
    email: true,
    password: true,
    name: true,
  });

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [email, password, name] = [
      data.get('email'),
      data.get('password'),
      data.get('name'),
    ];
    // eslint-disable-next-line no-console
    console.log({
      email: email,
      password: password,
      name: name,
    });
    setValidation({
      ...validation,
      email: validateEmail(String(email)),
      password: validatePassword(String(password)),
    });
  };

  const validateEmail = (email: string): boolean => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const validatePassword = (password: string): boolean => password.length >= 8;

  return (
    <Dialog onClose={handleClose} open={open}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            marginBottom: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ButtonGroup
            sx={{
              display: 'flex',
              width: '100%',
            }}
          >
            <Button
              fullWidth
              variant={registration ? 'outlined' : 'contained'}
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setRegistration(false)}
            >
              Вход
            </Button>
            <Button
              fullWidth
              variant={registration ? 'contained' : 'outlined'}
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setRegistration(true)}
            >
              Регистрация
            </Button>
          </ButtonGroup>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {registration && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Ваше имя"
                name="name"
                autoFocus
              />
            )}
            <TextField
              error={!validation.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Электронная почта"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={!validation.password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {registration ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
};

export default LoginPopup;
