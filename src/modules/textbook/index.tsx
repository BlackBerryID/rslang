import { useState } from 'react';
import { Container, Box, Pagination } from '@mui/material';

import './textbook.scss';
import { TextbookHeader } from './components/textbook-header';
import { TextbookLevels } from './components/textbook-levels';
import { TextbookWords } from './containers/textbook-words';
import { TextbookCard } from './components/textbook-card';
import { TextbookGames } from './components/textbook-games';

export const Textbook = () => {
  const [currentColor, setCurrentColor] = useState('#fdd835');

  return (
    <Container className="textbook_container">
      <TextbookHeader color={currentColor} />
      <TextbookLevels color={currentColor} setColor={setCurrentColor} />
      <div className="textbook_words__title">Слова</div>
      <Box className="textbook_main" sx={{ pt: '20px' }}>
        <Box className="textbook_main__left">
          <TextbookWords color={currentColor} />
          <Pagination count={10} color="primary" sx={{ mt: '30px' }} />
          <TextbookGames color={currentColor} />
        </Box>
        <TextbookCard />
      </Box>
    </Container>
  );
};
