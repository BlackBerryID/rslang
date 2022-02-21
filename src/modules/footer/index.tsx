import { AppBar, Container, Toolbar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Paths } from '../../app/constants';
import data from '../homepage/content/sections.json';
import RsLogo from './assets/rs.svg';

import './footer.scss';

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
    <AppBar
      component="footer"
      sx={{ position: 'relative', bottom: '0', padding: '1em' }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <Toolbar className="school-logo">
          <a href="https://rs.school/js/" className="school-logo_link">
            <img
              src={RsLogo}
              alt="rs school logo"
              className="school-logo_img"
            />
          </a>
          <span className="school-logo_year">2022</span>
        </Toolbar>
        <Toolbar className="footer_githubs">
          <a href={data.sections.team.data[0].github} className="footer_github">
            BlackBerryID
          </a>
          <a href={data.sections.team.data[1].github} className="footer_github">
            saratovkin
          </a>
          <a href={data.sections.team.data[2].github} className="footer_github">
            shadowinhaze
          </a>
        </Toolbar>
      </Container>
    </AppBar>
  );

  if (footerTemplate) {
    return footerTemplate;
  }
  return null;
};
