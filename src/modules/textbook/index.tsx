import { useState } from 'react';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import { colors } from '../../app/constants';

import './textbook.scss';
import { TextbookHeader } from './components/textbook-header';
import { TextbookLevels } from './components/textbook-levels';
import { TextbookWords } from './containers/textbook-words';

export const Textbook = () => {
  const [currentColor, setCurrentColor] = useState(colors[0]);

  return (
    <Container className="textbook_container">
      <TextbookHeader color={currentColor} />
      <TextbookLevels />
      <div className="textbook_words__title">Слова</div>
      <Box sx={{ pt: '20px' }}>
        <Box>
          <TextbookWords color={currentColor} />
        </Box>
      </Box>
    </Container>
  );
};
