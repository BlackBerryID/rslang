import { useState } from 'react';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import { colors } from '../../app/constants';

import './textbook.scss';
import { TextbookHeader } from './components/textbook-header';
import { TextbookLevels } from './components/textbook-levels';

export const Textbook = () => {
  const [currentColor, setCurrentColor] = useState(colors[0]);

  return (
    <Container className="textbook_container">
      <TextbookHeader color={currentColor} />
      <TextbookLevels />
      <div className="textbook_words__title">Слова</div>
      <Box sx={{ pt: '20px' }}>
        <Grid
          container
          spacing={{ xs: 1, md: 1.5 }}
          sx={{ maxWidth: '70%' }}
          onClick={(e) => console.log(e.target)}
        >
          {Array.from(Array(20)).map((_, index) => (
            <Grid
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
                className="textbook_words__button active"
                sx={{
                  '&:hover': { backgroundColor: currentColor },
                  '&.active': { backgroundColor: currentColor },
                }}
              >
                <h4>biodegradeble</h4>
                <p>биоразлагаемый</p>
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
