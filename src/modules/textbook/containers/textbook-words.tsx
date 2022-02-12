import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

export const TextbookWords = ({ color }: TextbookColorProp) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    setActiveCardIndex(0);
  }, [color]);

  const findCardIndex = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    let result = null;
    if (target.parentElement) {
      if (target.parentElement.classList.contains('textbook_words__item'))
        result = target.parentElement.id;
      if (
        target.parentElement.parentElement?.classList.contains(
          'textbook_words__item'
        )
      )
        result = target.parentElement.parentElement.id;
    }
    if (result) setActiveCardIndex(Number(result));
  };

  return (
    <Grid
      container
      spacing={{ xs: 1, md: 1.5 }}
      sx={{ maxWidth: '70%' }}
      onClick={findCardIndex}
    >
      {Array.from(Array(20)).map((_, index) => {
        const addActiveClass = index === activeCardIndex ? ' active' : '';
        return (
          <Grid
            id={String(index)}
            className="textbook_words__item"
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
          >
            <Typography
              component="button"
              className={`textbook_words__button${addActiveClass}`}
              sx={{
                '&:hover': { backgroundColor: color },
                '&.active': { backgroundColor: color },
              }}
            >
              <h4>biodegradeble</h4>
              <p>биоразлагаемый</p>
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};
