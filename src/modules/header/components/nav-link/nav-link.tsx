import React from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NavLink = ({ path, text, size }: NavLinkProps) => {
  return (
    <Link
      component={RouterLink}
      variant={size}
      color="#fff"
      to={path}
      sx={{ textDecoration: 'none', width: '100%' }}
    >
      {text}
    </Link>
  );
};

export default NavLink;
