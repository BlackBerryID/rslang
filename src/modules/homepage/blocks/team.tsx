import { Typography } from '@mui/material';
import { TeamMate } from '../components/teammate';
import s from '../homepage.module.scss';

export const Team = ({ title, data }: TeamProps) => {
  return (
    <section className={`${s['section-container']} ${s['team']}`}>
      <Typography variant="h4" component="h2" textAlign="center" mb="1em">
        {title}
      </Typography>
      <div className={s['team__cards']}>
        {data.map((mate) => (
          <TeamMate
            key={mate.id}
            name={mate.name}
            badge={mate.badge}
            description={mate.description}
            github={mate.github}
            avatar={mate.avatar}
          />
        ))}
      </div>
    </section>
  );
};
