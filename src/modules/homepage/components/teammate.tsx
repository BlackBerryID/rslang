import { Box, Chip, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import s from '../homepage.module.scss';

export const TeamMate = ({
  name,
  badge,
  description,
  avatar,
  github,
}: TeamMateProps) => {
  return (
    <Box className={s['team__cards__mate']}>
      <div
        className={s['team__cards__mate__layout']}
        style={{ backgroundImage: `url(${avatar})` }}
      ></div>
      <div className={s['team__cards__mate__content']}>
        <Typography gutterBottom variant="h5" component="h3">
          {name}
        </Typography>
        <Box className={s['team__cards__mate__content_badge']}>
          <Chip label={badge} color="success" variant="outlined" size="small" />
          <a
            rel="noreferrer"
            href={github}
            target="_blank"
            style={{ display: 'block' }}
            className={s['team__cards__mate__content_link']}
          >
            <GitHubIcon />
          </a>
        </Box>
        <Typography variant="body2" color="text.secondary" mt=".5em">
          {description}
        </Typography>
      </div>
    </Box>
  );
};
