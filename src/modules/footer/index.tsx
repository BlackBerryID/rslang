import { AppBar, Container, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Paths } from '../../app/constants';

export const Footer = () => {
  const [isFooterHidden, setIsFooterHidden] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === Paths.mgAudioCall || path === Paths.mgSprint) {
      setIsFooterHidden(true);
      return;
    }
    setIsFooterHidden(false);
  }, [location, setIsFooterHidden]);

  const footerTemplate = !isFooterHidden && (
    <AppBar sx={{ position: 'relative', bottom: '0' }}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <Toolbar>
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );

  if (footerTemplate) {
    return footerTemplate;
  }
  return null;
};
