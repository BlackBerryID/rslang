import { Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../../app/constants';

import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import s from '../homepage.module.scss';

export const Greetings = ({ title, subtitle, button }: GreetingsProps) => {
  return (
    <section className={`${s['section-container']} ${s['greetings']}`}>
      <div className={s['greetings__content']}>
        <Typography variant="h3" component="h1" textAlign="left" mb="1em">
          {title}
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          textAlign="left"
          color="text.secondary"
        >
          {subtitle}
        </Typography>
        <NavLink to={Paths.textBook}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<RocketLaunchIcon />}
            sx={{ width: '10em', mt: '2em' }}
          >
            {button}
          </Button>
        </NavLink>
      </div>
      <div className={s['greetings__layout']}></div>
    </section>
  );
};
