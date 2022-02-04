import React from 'react';

import './header.scss';
import NavLink from './components/nav-link';
import Logo from './components/logo';
import RegistrationButton from './components/registration-button';
import NavGames from './components/nav-games';

const Header = () => {
  return (
    <div className="header">
      <div className="container header__container">
        <Logo />
        <div className="header_right">
          <NavLink path={'/'} text={'Главная'} />
          <NavLink path={'/textbook'} text={'Учебник'} />
          <NavGames />
          <NavLink path={'/statistic'} text={'Статистика'} />
          <NavLink path={'/team'} text={'О команде'} />
          <RegistrationButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
