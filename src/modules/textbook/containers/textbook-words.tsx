import { useEffect, useState } from 'react';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';

import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import SchoolIcon from '@mui/icons-material/School';

export const TextbookWords = ({
  color,
  words,
  activeCardIndex,
  setActiveCardIndex,
}: TextbookWordsProps) => {
  useEffect(() => {
    setActiveCardIndex(0);
  }, [color]);

  if (!words) {
    return <CircularProgress />;
  } else {
    return (
      <Grid container spacing={{ xs: 1, md: 1.5 }}>
        {words.map((wordItem, index) => {
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
              onClick={() => setActiveCardIndex(index)}
            >
              <Typography
                component="button"
                className={`textbook_words__button${addActiveClass}`}
                sx={{
                  '&:hover': { backgroundColor: color },
                  '&.active': { backgroundColor: color },
                }}
              >
                <h4>{wordItem.word}</h4>
                <p>{wordItem.wordTranslate}</p>
                <Box className="textbook_words__icon">
                  {/* <FlashOnOutlinedIcon color="action"/> */}
                  <SchoolIcon color="action" />
                </Box>
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    );
  }
};
