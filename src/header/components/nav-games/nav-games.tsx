import React from 'react';

import './nav-games.scss';
import NavLink from '../nav-link';

const NavGames = () => {
  return (
    <div className="nav-games">
      Игры
      <ul className="game-list">
        <li>
          <NavLink
            path={'/audiocall'}
            text={'Аудиовызов'}
            additionalClass={'nav-game'}
          />
        </li>
        <li>
          <NavLink
            path={'/sprint'}
            text={'Спринт'}
            additionalClass={'nav-game'}
          />
        </li>
      </ul>
    </div>
  );
};

export default NavGames;
