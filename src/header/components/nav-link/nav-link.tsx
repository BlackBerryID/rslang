import React from 'react';
import { Link } from 'react-router-dom';

import './nav-link.scss';

type NavLinkProps = {
  path: string;
  text: string;
  additionalClass?: string;
};

const NavLink = ({ path, text, additionalClass }: NavLinkProps) => {
  const classList = additionalClass
    ? `nav-link ${additionalClass}`
    : 'nav-link';
  return (
    <Link to={path} className={classList}>
      {text}
    </Link>
  );
};

export default NavLink;
