import { useState, useEffect, useCallback } from 'react';
import { Container, Box, Pagination } from '@mui/material';

import './textbook.scss';
import { TextbookHeader } from './components/textbook-header';
import { TextbookLevels } from './components/textbook-levels';
import { TextbookWords } from './containers/textbook-words';
import { TextbookCard } from './components/textbook-card';
import { TextbookGames } from './components/textbook-games';
import { GetWords } from '../../api';
import { GetUserAgrWords } from '../../api/get-user_words';

export const Textbook = () => {
  const [currentColor, setCurrentColor] = useState('#fdd835');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
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

  const changeGroup = (group: number) => {
    setGroup(group);
    setPage(0);
  };

  const changePage = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  useEffect(() => {
    setPage(0);
  }, [group]);

  // const getUserWords = useCallback(async () => {
  //   const user = JSON.parse(localStorage.getItem('user')!);
  //   const userToken = user.token;
  //   const userId = user.userId;
  //   const response = await GetUserAgrWords({
  //     group: 3,
  //     page: 3,
  //     userId,
  //     userToken,
  //     wpp: 20,
  //   });
  //   console.log('RESPONSE', response);
  // }, []);

  // useEffect(() => {
  //   getUserWords();
  // }, [getUserWords]);

  return (
    <Container className="textbook_container">
      <TextbookHeader color={currentColor} />
      <TextbookLevels
        color={currentColor}
        setColor={setCurrentColor}
        group={group}
        changeGroup={changeGroup}
      />
      <div className="textbook_words__title">Слова</div>
      <Box className="textbook_main" sx={{ pt: '20px' }}>
        <Box className="textbook_main__left">
          <TextbookWords
            color={currentColor}
            words={words}
            activeCardIndex={activeCardIndex}
            setActiveCardIndex={setActiveCardIndex}
          />
          <Pagination
            count={30}
            page={page + 1}
            color="primary"
            sx={{ mt: '30px' }}
            onChange={changePage}
          />
          <TextbookGames color={currentColor} />
        </Box>
        <TextbookCard words={words} activeCardIndex={activeCardIndex} />
      </Box>
    </Container>
  );
};
