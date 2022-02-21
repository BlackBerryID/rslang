import { Container, ThemeProvider } from '@mui/material';
import { theme } from '../../app/material-ui-theme';
import { Outlet } from 'react-router-dom';
import { Header } from '../header';
import { Footer } from '../footer';

export const BaseTemplate = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <main
          style={{ display: 'flex', alignItems: 'center', flex: '1 0 auto' }}
        >
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Outlet />
          </Container>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
};
