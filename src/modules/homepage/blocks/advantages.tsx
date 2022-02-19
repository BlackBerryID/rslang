import { Typography } from '@mui/material';
import { AdvCard } from '../components/card';

import s from '../homepage.module.scss';

export const Advantages = ({ title, data }: AdvantagesProps) => {
  return (
    <section className={`${s['section-container']} ${s['advantages']}`}>
      <Typography variant="h4" component="h2" textAlign="center" mb="1em">
        {title}
      </Typography>
      <div className={s['advantages__cards']}>
        {data.map((card) => (
          <AdvCard
            key={card.id}
            img={card.img}
            title={card.title}
            text={card.text}
          />
        ))}
      </div>
    </section>
  );
};
