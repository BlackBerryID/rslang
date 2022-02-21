import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Button,
  Chip,
  CircularProgress,
} from '@mui/material';
import { base } from '../../../api';
import { DIFFICULTY } from '../constants';
import { UpdateUserWord } from '../../../api/update-user_word';
import { AddUserWord } from '../../../api/add-user_word';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CallIcon from '@mui/icons-material/Call';
import { useEffect, useState } from 'react';

export const TextbookCard = ({
  words,
  activeCardIndex,
  updateWords,
  page,
  group,
  getUserWords,
  setActiveCardIndex,
  isVocabularyActive,
  vocabularyWords,
  vocabularyGroup,
}: TextbookCardProps) => {
  const [audio] = useState(new Audio());

  const prepareGameResults = (result: string) => {
    // prettier-ignore
    return `${result.split('').filter((item) => item === '1').length} / ${result.length}`;
  };

  const user = useSelector((state: RootState) => state.user);

  const changeWordDifficulty = async (
    wordItem: GetWord,
    difficulty: string | undefined,
    action: string
  ) => {
    const body = (difficultyLevel: string, tempOptional: object) => {
      return {
        userId: user.userId,
        userToken: user.token,
        wordId: wordItem._id,
        updateReq: {
          difficulty: difficultyLevel,
          optional: tempOptional,
        },
      };
    };
    let difficultyLevel = 'learning';
    let tempOptional =
      action === 'changeIsLearned'
        ? {
            audioStreak: ' ',
            sprintStreak: ' ',
          }
        : {};
    if (action === 'changeDifficultyLevel') {
      difficultyLevel =
        difficulty === DIFFICULTY.difficult
          ? DIFFICULTY.learning
          : DIFFICULTY.difficult;
    } else if (action === 'changeIsLearned') {
      difficultyLevel =
        difficulty === DIFFICULTY.learned
          ? DIFFICULTY.learning
          : DIFFICULTY.learned;
    }
    if (wordItem.userWord) {
      await UpdateUserWord(body(difficultyLevel, tempOptional));
      if (group === 6) {
        getUserWords();
        setActiveCardIndex(0);
        return;
      } else if (isVocabularyActive) {
        getUserWords(false, 0, true);
        setActiveCardIndex(0);
        return;
      }
    } else {
      await AddUserWord(body(difficultyLevel, tempOptional));
    }
    updateWords(wordItem.word, difficultyLevel);
  };

  const runAudio = (wordItem: GetWord) => {
    const strings = 'audio audioMeaning audioExample'.split(' ');
    let index = 1;

    audio.src = `${base}/${wordItem[strings[0]]}`;
    audio.play();

    audio.onended = function () {
      if (index < strings.length) {
        audio.src = `${base}/${wordItem[strings[index]]}`;
        audio.play();
        index++;
      }
    };
  };

  useEffect(() => {
    audio.pause();
    audio.currentTime = 0;
  }, [activeCardIndex, page, group, audio]);

  const localWords = isVocabularyActive
    ? vocabularyWords[vocabularyGroup]
    : words;

  if (!localWords) {
    return <CircularProgress />;
  } else if (localWords.length === 0) {
    return null;
  } else {
    const wordItem = localWords[activeCardIndex];
    const difficulty = wordItem?.userWord?.difficulty;
    const optional = wordItem?.userWord?.optional;
    const gameSprint = optional?.sprintStreak?.trim();
    const gameAudioCall = optional?.audioStreak?.trim();
    const gamesInfoTemplate =
      (wordItem?.userWord?.optional?.audioStreak?.trim() ||
        wordItem?.userWord?.optional?.sprintStreak?.trim()) &&
      user.userId ? (
        <>
          <Typography
            variant="h6"
            component="h3"
            sx={{ m: '15px 0 10px', fontSize: '18px' }}
          >
            Правильные ответы в играх
          </Typography>
          <Box className="card_games">
            {gameSprint && (
              <Chip
                icon={<DirectionsRunIcon />}
                label={prepareGameResults(gameSprint)}
                variant="outlined"
              />
            )}
            {gameAudioCall && (
              <Chip
                icon={<CallIcon />}
                label={prepareGameResults(gameAudioCall)}
                variant="outlined"
              />
            )}
          </Box>
        </>
      ) : null;
    return (
      <Card className="textbook_card" sx={{ ml: '10px' }}>
        <CardMedia
          component="img"
          image={`${base}/${wordItem?.image}`}
          alt="image of active card"
        />
        <CardContent>
          <Typography variant="h5" component="h2" sx={{ fontWeight: '700' }}>
            {wordItem?.word}
          </Typography>
          <Typography variant="h6" component="h3">
            {wordItem?.wordTranslate}
          </Typography>
          <Typography variant="h6" component="span" sx={{ fontWeight: '400' }}>
            {wordItem?.transcription}
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, mt: -1, opacity: '0.5', ml: '5px' }}
            onClick={() => runAudio(wordItem)}
          >
            <VolumeUpIcon />
          </IconButton>
          {user.userId && (
            <Stack spacing={1} direction="row" sx={{ display: 'flex' }}>
              {difficulty !== DIFFICULTY.learned && (
                <Button
                  variant="contained"
                  sx={{ fontSize: '11px', p: '5px', flex: '1 0 50%' }}
                  onClick={() =>
                    changeWordDifficulty(
                      wordItem,
                      difficulty,
                      'changeDifficultyLevel'
                    )
                  }
                >
                  {difficulty === undefined ||
                  difficulty === DIFFICULTY.learning
                    ? 'Добавить в сложные'
                    : 'Удалить из сложных'}
                </Button>
              )}
              <Button
                variant="contained"
                sx={{ fontSize: '11px', p: '5px', flex: '1 0 50%' }}
                onClick={() =>
                  changeWordDifficulty(wordItem, difficulty, 'changeIsLearned')
                }
              >
                {difficulty === DIFFICULTY.learned
                  ? 'Удалить из изученных'
                  : 'Добавить в изученные'}
              </Button>
            </Stack>
          )}
          <Stack>
            <Typography
              variant="h6"
              component="h3"
              sx={{ m: '15px 0 10px', fontSize: '18px' }}
            >
              Значение
            </Typography>
            <Typography
              variant="body2"
              component="p"
              dangerouslySetInnerHTML={{ __html: `${wordItem?.textMeaning}` }}
            />
            <Typography variant="body2" component="p" sx={{ mt: '5px' }}>
              {wordItem?.textMeaningTranslate}
            </Typography>
            <Typography
              variant="h6"
              component="h3"
              sx={{ m: '10px 0', fontSize: '18px' }}
            >
              Пример
            </Typography>
            <Typography
              variant="body2"
              component="p"
              dangerouslySetInnerHTML={{ __html: `${wordItem?.textExample}` }}
            />
            <Typography variant="body2" component="p" sx={{ mt: '5px' }}>
              {wordItem?.textExampleTranslate}
            </Typography>
          </Stack>
          {gamesInfoTemplate}
        </CardContent>
      </Card>
    );
  }
};
