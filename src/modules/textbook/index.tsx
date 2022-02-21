import { useState, useEffect, useCallback } from 'react';
import { Container, Box, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import './textbook.scss';
import { TextbookHeader } from './components/textbook-header';
import { TextbookLevels } from './components/textbook-levels';
import { TextbookWords } from './containers/textbook-words';
import { TextbookCard } from './containers/textbook-card';
import { TextbookGames } from './components/textbook-games';
import { GetWords } from '../../api';
import { GetUserAgrWords } from '../../api/get-user_words';
import { DIFFICULTY } from './constants';

import type { RootState, AppDispatch } from '../../store';
import { setStatus } from '../../store/reducers/watch-status';

import type { AgregatedReq } from '../../api/get-user_words';

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
  const [words, setWords] = useState<Array<GetWord> | null>(null);
  const [isVocabularyActive, setIsVocabularyActive] = useState(false);
  const [vocabularyGroup, setVocabularyGroup] = useState(0);
  const [vocabularyWords, setVocabularyWords] = useState([]);

  const reducer: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // we use this method only to avoid calling 'GetUserAgrWords' after each 'word difficulty' update. Instead we work with local state variable 'words'.
  const updateWords = (wordName: string, difficultyLevel: string) => {
    if (!words) return;
    setWords((words) => {
      if (words) {
        return words?.map((wordItem) => {
          if (wordItem.word !== wordName) return wordItem;
          return {
            ...wordItem,
            userWord: wordItem.userWord
              ? {
                  ...wordItem.userWord,
                  difficulty: difficultyLevel,
                }
              : {
                  difficulty: difficultyLevel,
                  optional: {
                    audioStreak: ' ',
                    sprintStreak: ' ',
                  },
                },
          };
        });
      }
      return null;
    });
  };

  const getWords = useCallback(
    async (isDataToWrite = false, pageNumber = page) => {
      let response = await GetWords(group, pageNumber);
      if (isDataToWrite) return response;
      setWords(response);
    },
    [group, page]
  );

  const getUserWords = useCallback(
    async (
      isDataToWrite: boolean = false,
      pageNumber: number = page,
      isWordsForVocabulary: boolean = false
    ) => {
      let body: AgregatedReq = {
        group,
        page: pageNumber,
        userId: user.userId,
        userToken: user.token,
        wpp: 20,
      };
      if (group === 6) {
        body = {
          userId: user.userId,
          userToken: user.token,
          wpp: 3600,
          filter: {
            $and: [{ 'userWord.difficulty': DIFFICULTY.difficult }],
          },
        };
      }

      function bodyConstructor(filterDifficulty: string): AgregatedReq {
        return {
          group,
          userId: user.userId,
          userToken: user.token,
          wpp: 600,
          filter: {
            $and: [{ 'userWord.difficulty': filterDifficulty }],
          },
        };
      }
      if (isWordsForVocabulary) {
        const learning = await GetUserAgrWords(
          bodyConstructor(DIFFICULTY.learning)
        );
        const difficult = await GetUserAgrWords(
          bodyConstructor(DIFFICULTY.difficult)
        );
        const learned = await GetUserAgrWords(
          bodyConstructor(DIFFICULTY.learned)
        );
        setVocabularyWords([
          learning[0]?.paginatedResults as never,
          difficult[0]?.paginatedResults as never,
          learned[0]?.paginatedResults as never,
        ]);
        return;
      }

      const response = await GetUserAgrWords(body);
      if (isDataToWrite) return response[0]?.paginatedResults;
      setWords(response[0]?.paginatedResults);
    },
    [group, page, user]
  );

  useEffect(() => {
    if (user.userId) {
      getUserWords();
    } else {
      getWords();
    }
  }, [getWords, getUserWords, user]);

  const changeGroup = (group: number) => {
    localStorage.setItem('group', group.toString());
    localStorage.setItem('page', (0).toString());
    setGroup(group);
    setPage(0);
  };

  const changePage = (e: React.ChangeEvent<unknown>, page: number) => {
    localStorage.setItem('page', (page - 1).toString());
    setPage(page - 1);
  };

  const prepareGameData = async () => {
    if (group === 6) {
      reducer(
        setStatus({ mode: 'textbook', deck: words || [], langLevel: group })
      );
      return;
    }
    if (isVocabularyActive) {
      reducer(
        setStatus({
          mode: 'textbook',
          deck: vocabularyWords[vocabularyGroup] || [],
          langLevel: group,
        })
      );
      return;
    }
    let gameWords: Array<GetWord> = [];
    let isLoop = false;
    let currentSearchPage = page;
    let isFirstIteration = true;

    while (gameWords.length < 20) {
      if (isLoop && currentSearchPage === page) break;
      if (currentSearchPage < 0) {
        currentSearchPage = 29;
        isLoop = true;
      }
      currentSearchPage -= 1;
      let wordsArray = words;
      if (!isFirstIteration) {
        user.userId
          ? await getUserWords(true, currentSearchPage).then(
              (data) => (wordsArray = data)
            )
          : await getWords(true, currentSearchPage).then(
              (data) => (wordsArray = data)
            );
      }
      const tempArray =
        wordsArray?.filter(
          (wordItem) =>
            wordItem.userWord === undefined ||
            wordItem.userWord.difficulty !== DIFFICULTY.learned
        ) || [];
      gameWords = gameWords.concat(tempArray);
      isFirstIteration = false;
    }
    gameWords = gameWords.slice(0, 20);
    reducer(setStatus({ mode: 'textbook', deck: gameWords, langLevel: group }));
  };

  const changeVocabularyGroup = (index: number) => {
    setVocabularyGroup(index);
  };

  useEffect(() => {
    if (isVocabularyActive) {
      getUserWords(false, 0, true);
      setActiveCardIndex(0);
    }
  }, [isVocabularyActive, getUserWords, group]);

  return (
    <Container className="textbook_container" sx={{ mt: '20px' }}>
      <TextbookHeader
        group={group}
        isVocabularyActive={isVocabularyActive}
        setIsVocabularyActive={setIsVocabularyActive}
      />
      <TextbookLevels
        group={group}
        changeGroup={changeGroup}
        vocabularyGroup={vocabularyGroup}
        changeVocabularyGroup={changeVocabularyGroup}
        isVocabularyActive={isVocabularyActive}
        vocabularyWords={vocabularyWords}
      />
      <div className="textbook_words__title">Слова</div>
      <Box className="textbook_main" sx={{ pt: '20px' }}>
        <Box className="textbook_main__left">
          <TextbookWords
            group={group}
            words={words}
            activeCardIndex={activeCardIndex}
            setActiveCardIndex={setActiveCardIndex}
            vocabularyWords={vocabularyWords}
            vocabularyGroup={vocabularyGroup}
            isVocabularyActive={isVocabularyActive}
          />
          {group !== 6 && !isVocabularyActive && (
            <Pagination
              count={30}
              page={page + 1}
              color="primary"
              sx={{ mt: '30px' }}
              onChange={changePage}
            />
          )}
          <TextbookGames
            group={group}
            words={words}
            prepareGameData={prepareGameData}
            vocabularyWords={vocabularyWords}
            vocabularyGroup={vocabularyGroup}
            isVocabularyActive={isVocabularyActive}
          />
        </Box>
        <TextbookCard
          words={words}
          activeCardIndex={activeCardIndex}
          updateWords={updateWords}
          page={page}
          group={group}
          getUserWords={getUserWords}
          setActiveCardIndex={setActiveCardIndex}
          vocabularyWords={vocabularyWords}
          vocabularyGroup={vocabularyGroup}
          isVocabularyActive={isVocabularyActive}
        />
      </Box>
    </Container>
  );
};
