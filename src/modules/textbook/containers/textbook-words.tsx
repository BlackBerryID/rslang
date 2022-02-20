import { useEffect } from 'react';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import { colors } from '../../../app/constants';
import { DIFFICULTY } from '../constants';

import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import SchoolIcon from '@mui/icons-material/School';

export const TextbookWords = ({
  group,
  words,
  activeCardIndex,
  setActiveCardIndex,
}: TextbookWordsProps) => {
  useEffect(() => {
    setActiveCardIndex(0);
  }, [group, setActiveCardIndex]);

  if (!words) {
    return <CircularProgress />;
  } else if (group === 6 && words.length === 0) {
    return (
      <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
        Здесь нет слов. Вы не добавили ни одного слова <br /> в категорию
        "сложные".
      </Typography>
    );
  } else {
    return (
      <Grid container spacing={{ xs: 1, md: 1.5 }}>
        {words.map((wordItem, index) => {
          const wordItemUserInfo = wordItem.userWord;
          const addActiveClass = index === activeCardIndex ? ' active' : '';
          const style =
            wordItemUserInfo?.difficulty === 'learned'
              ? { opacity: '0.3' }
              : null;
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
              sx={style}
            >
              <Typography
                component="button"
                className={`textbook_words__button${addActiveClass}`}
                sx={{
                  '&:hover': { backgroundColor: colors[group] },
                  '&.active': { backgroundColor: colors[group] },
                }}
              >
                <h4>{wordItem.word}</h4>
                <p>{wordItem.wordTranslate}</p>
                <Box className="textbook_words__icon">
                  {wordItemUserInfo?.difficulty === DIFFICULTY.difficult && (
                    <FlashOnOutlinedIcon color="action" />
                  )}
                  {wordItemUserInfo?.difficulty === DIFFICULTY.learned && (
                    <SchoolIcon color="action" />
                  )}
                </Box>
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    );
  }
};
