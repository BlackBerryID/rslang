import { useState, useEffect, useCallback } from 'react';
import { Container, Box, Pagination } from '@mui/material';

import './textbook.scss';
import { TextbookHeader } from './components/textbook-header';
import { TextbookLevels } from './components/textbook-levels';
import { TextbookWords } from './containers/textbook-words';
import { TextbookCard } from './components/textbook-card';
import { TextbookGames } from './components/textbook-games';
import { GetWords } from '../../api';

export const Textbook = () => {
  const [currentColor, setCurrentColor] = useState('#fdd835');
  const [group, setGroup] = useState(
    localStorage.getItem('group')
      ? JSON.parse(localStorage.getItem('group') as string)
      : 0
  );
  const [page, setPage] = useState(
    localStorage.getItem('page')
      ? JSON.parse(localStorage.getItem('page') as string)
      : 0
  );
  const [words, setWords] = useState(null);

  const getWords = useCallback(async () => {
    let response = await GetWords(group, page);
    setWords(response);
  }, [group, page]);

  useEffect(() => {
    getWords();
  }, [getWords]);

  const changePage = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  return (
    <Container className="textbook_container">
      <TextbookHeader color={currentColor} />
      <TextbookLevels color={currentColor} setColor={setCurrentColor} />
      <div className="textbook_words__title">Слова</div>
      <Box className="textbook_main" sx={{ pt: '20px' }}>
        <Box className="textbook_main__left">
          <TextbookWords color={currentColor} words={words} />
          <Pagination
            count={30}
            color="primary"
            sx={{ mt: '30px' }}
            onChange={changePage}
          />
          <TextbookGames color={currentColor} />
        </Box>
        <TextbookCard />
      </Box>
    </Container>
  );
};
