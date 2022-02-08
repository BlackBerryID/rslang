import { useState } from 'react';

import {
  Button,
  ButtonGroup,
  Dialog,
  CssBaseline,
  TextField,
  Box,
  Container,
  Typography,
} from '@mui/material';
import { loginUser, createUser } from '../../../../api';

export const LoginPopup = (props: LoginPopupProps) => {
  const { onClose, open, setIsOnline } = props;

  const [registration, setRegistration] = useState(false);
  const [validation, setValidation] = useState({
    email: true,
    password: true,
    name: true,
    isAlreadySubmit: false,
  });
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(null);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [email, password, name] = [
      String(data.get('email')),
      String(data.get('password')),
      String(data.get('name')),
    ];
    const isValid = {
      email: validateEmail(email),
      password: validatePassword(password),
      name: validateName(name),
    };
    setValidation({
      ...validation,
      isAlreadySubmit: true,
    });
    // prettier-ignore
    const isInputInfoCorrect = registration
      ? isValid.email && isValid.password && isValid.name
      : isValid.email && isValid.password

    if (isInputInfoCorrect) {
      registration ? signup(name, email, password) : login(email, password);
    }
  };

  const validateEmail = (email: string): boolean => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const validatePassword = (password: string): boolean => password.length >= 8;

  const validateName = (name: string): boolean => name.trim().length >= 2;

  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password);
    if (response === 404) {
      setErrorMessage('Неверный электронный адрес');
      return;
    } else if (response === 403) {
      setErrorMessage('Неверный пароль');
      return;
    }
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: response.name,
        token: response.token,
        refreshToken: response.refreshToken,
        userId: response.userId,
      })
    );
    setIsOnline(true);
    handleClose();
  };

  const signup = async (name: string, email: string, password: string) => {
    await createUser(name, email, password);
    await login(email, password);
  };

  const message = errorMessage ? (
    <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
      {errorMessage}
    </Typography>
  ) : null;

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
              onClick={() => {
                setRegistration(true);
                setErrorMessage(null);
              }}
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
                error={!validation.name && validation.isAlreadySubmit}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Ваше имя"
                name="name"
                autoComplete="off"
                autoFocus
                onInput={(e) =>
                  setValidation({
                    ...validation,
                    name: validateName((e.target as HTMLInputElement).value),
                  })
                }
              />
            )}
            <TextField
              error={!validation.email && validation.isAlreadySubmit}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Электронная почта"
              name="email"
              autoComplete="email"
              autoFocus
              onInput={(e) =>
                setValidation({
                  ...validation,
                  email: validateEmail((e.target as HTMLInputElement).value),
                })
              }
            />
            <TextField
              error={!validation.password && validation.isAlreadySubmit}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              onInput={(e) =>
                setValidation({
                  ...validation,
                  password: validatePassword(
                    (e.target as HTMLInputElement).value
                  ),
                })
              }
            />
            <Box sx={{ height: '25px' }}>{message}</Box>
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
