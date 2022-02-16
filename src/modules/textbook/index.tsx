import { useState, useEffect, useCallback } from 'react';
import { Container, Box, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import './textbook.scss';
import { TextbookHeader } from './components/textbook-header';
import { TextbookLevels } from './components/textbook-levels';
import { TextbookWords } from './containers/textbook-words';
import { TextbookCard } from './components/textbook-card';
import { TextbookGames } from './components/textbook-games';
import { GetWords } from '../../api';
import { GetUserAgrWords } from '../../api/get-user_words';

import type { RootState, AppDispatch } from '../../store';

export const Textbook = () => {
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

  const reducer = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const getWords = useCallback(async () => {
    let response = await GetWords(group, page);
    setWords(response);
  }, [group, page]);

  const getUserWords = useCallback(async () => {
    const userToken = user.token;
    const userId = user.userId;
    const wpp = 20;
    const response = await GetUserAgrWords({
      group,
      page,
      userId,
      userToken,
      wpp,
    });
    setWords(response[0].paginatedResults);
  }, [group, page, user]);

  useEffect(() => {
    if (user.userId) {
      getUserWords();
    } else {
      getWords();
    }
  }, [getWords, getUserWords, user]);

  const changeGroup = (group: number) => {
    localStorage.setItem('group', JSON.stringify(group));
    localStorage.setItem('page', JSON.stringify(0));
    setGroup(group);
    setPage(0);
  };

  const changePage = (e: React.ChangeEvent<unknown>, page: number) => {
    localStorage.setItem('page', JSON.stringify(page - 1));
    setPage(page - 1);
  };

  return (
    <Container className="textbook_container">
      <TextbookHeader group={group} />
      <TextbookLevels group={group} changeGroup={changeGroup} />
      <div className="textbook_words__title">Слова</div>
      <Box className="textbook_main" sx={{ pt: '20px' }}>
        <Box className="textbook_main__left">
          <TextbookWords
            group={group}
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
          <TextbookGames group={group} />
        </Box>
        <TextbookCard words={words} activeCardIndex={activeCardIndex} />
      </Box>
    </Container>
  );
};
