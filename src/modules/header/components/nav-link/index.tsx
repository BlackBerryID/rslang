import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const NavLink = ({ path, text, size }: NavLinkProps) => {
  return (
    <Link
      component={RouterLink}
      variant={size}
      color="#fff"
      to={path}
      sx={{
        textDecoration: 'none',
        width: '100%',
        padding: '15px 0 15px 60px',
      }}
    >
      {text}
    </Link>
  );
};
