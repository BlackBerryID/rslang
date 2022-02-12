import { useState } from 'react';
import { Container, Box } from '@mui/material';

import './textbook.scss';
import { TextbookHeader } from './components/textbook-header';
import { TextbookLevels } from './components/textbook-levels';
import { TextbookWords } from './containers/textbook-words';

export const Textbook = () => {
  const [currentColor, setCurrentColor] = useState('#fdd835');

  return (
    <Container className="textbook_container">
      <TextbookHeader color={currentColor} />
      <TextbookLevels color={currentColor} setColor={setCurrentColor} />
      <div className="textbook_words__title">Слова</div>
      <Box sx={{ pt: '20px' }}>
        <Box>
          <TextbookWords color={currentColor} />
        </Box>
      </Box>
    </Container>
  );
};
