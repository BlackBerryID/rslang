import { useState } from 'react';

import { AppBar, Toolbar, Container, IconButton } from '@mui/material';

import { NavLink } from './components/nav-link';
import MenuIcon from '@mui/icons-material/Menu';
import { SideMenu } from './components/side-menu';
import { Login } from './containers/login';

import './header.scss';
import { useDispatch } from 'react-redux';
import { setStatus } from '../../store/reducers/watch-status';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const reducer = useDispatch();

  const toggleSideMenu =
    (open: boolean, isGameDirection: boolean = false) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setIsMenuOpen(open);
      if (isGameDirection) {
        reducer(setStatus({ mode: 'anon' }));
      }
    };

  return (
    <AppBar sx={{ position: 'relative', top: '0' }}>
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
        <Login />
      </Container>
      <SideMenu isMenuOpen={isMenuOpen} toggleSideMenu={toggleSideMenu} />
    </AppBar>
  );
};
