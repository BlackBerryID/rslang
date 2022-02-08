import { Container, ThemeProvider } from '@mui/material';
import { theme } from '../../app/material-ui-theme';
import { Outlet } from 'react-router-dom';
import { Header } from '../header';

export const BaseTemplate = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <main style={{ minHeight: '100%' }}>
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              minHeight: '80vh', // Until we haven't footer, after fluid its height between header and footer.
              marginTop: '5em',
            }}
          >
            <Outlet />
          </Container>
        </main>
        {/* TO DO Footer @BlackBerryID */}
        {/* <Footer /> */}
      </ThemeProvider>
    </>
  );
};
