import React, { useState } from 'react';

import { AppBar, Toolbar, Container, Button, IconButton } from '@mui/material';

import NavLink from './components/nav-link';
import MenuIcon from '@mui/icons-material/Menu';
import SideMenu from './components/side-menu';
import LoginForm from './containers/login';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSideMenu =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setIsMenuOpen(open);
    };

  return (
    <AppBar>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <Toolbar>
          <div onClick={toggleSideMenu(true)}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <NavLink path="/" text="RSLang" size="h4" />
        </Toolbar>
        <LoginForm />
      </Container>
      <SideMenu isMenuOpen={isMenuOpen} toggleSideMenu={toggleSideMenu} />
    </AppBar>
  );
};

export default Header;
