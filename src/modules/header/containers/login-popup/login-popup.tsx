import { useEffect, useState } from 'react';

import {
  Button,
  ButtonGroup,
  Dialog,
  CssBaseline,
  TextField,
  Box,
  Container,
} from '@mui/material';
import loginUser from '../../../../api/login';
import createUser from '../../../../api/signup';

const LoginPopup = (props: LoginPopupProps) => {
  const { onClose, open, setIsOnline } = props;

  const [registration, setRegistration] = useState(false);
  const [validation, setValidation] = useState({
    email: true,
    password: true,
    name: true,
    isAlreadySubmit: false,
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    name: '',
  });

  useEffect(() => {
    // prettier-ignore
    const isInputInfoCorrect = registration
      ? validation.email && validation.password && validation.name && validation.isAlreadySubmit
      : validation.email && validation.password && validation.isAlreadySubmit;

    if (isInputInfoCorrect) {
      registration
        ? signup(loginData.name, loginData.email, loginData.password)
        : login(loginData.email, loginData.password);
    }
  }, [loginData]);

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
    setLoginData({
      email: email,
      password: password,
      name: name,
    });
    setValidation({
      email: validateEmail(email),
      password: validatePassword(password),
      name: validateName(name),
      isAlreadySubmit: true,
    });
  };

  const validateEmail = (email: string): boolean => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const validatePassword = (password: string): boolean => password.length >= 8;

  const validateName = (name: string): boolean => name.trim().length >= 2;

  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password);
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: response.name,
        token: response.token,
        refreshToken: response.refreshToken,
      })
    );
    setIsOnline(true);
    handleClose();
  };

  const signup = async (name: string, email: string, password: string) => {
    await createUser(name, email, password);
    await login(email, password);
  };

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
                error={!validation.name}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Ваше имя"
                name="name"
                autoComplete="off"
                autoFocus
                onInput={() =>
                  setValidation({
                    ...validation,
                    name: true,
                  })
                }
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
              onInput={() =>
                setValidation({
                  ...validation,
                  email: true,
                })
              }
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
              onInput={() =>
                setValidation({
                  ...validation,
                  password: true,
                })
              }
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
