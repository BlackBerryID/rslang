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

export const TextbookCard = ({
  words,
  activeCardIndex,
  updateWords,
}: TextbookCardProps) => {
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
    const body = (difficultyLevel: string) => {
      return {
        userId: user.userId,
        userToken: user.token,
        wordId: wordItem._id,
        updateReq: {
          difficulty: difficultyLevel,
        },
      };
    };
    let difficultyLevel = 'learning';
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
    await UpdateUserWord(body(difficultyLevel));
    updateWords(wordItem.word, difficultyLevel);
  };

  if (!words) {
    return <CircularProgress />;
  } else {
    const wordItem = words[activeCardIndex];
    const difficulty = wordItem?.userWord?.difficulty;
    const optional = wordItem?.userWord?.optional;
    const gameSprint = optional?.sprintStreak?.trim();
    const gameAudioCall = optional?.audioStreak?.trim();
    const gamesInfoTemplate = wordItem.userWord ? (
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
          >
            <VolumeUpIcon />
          </IconButton>
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
                {difficulty === undefined || difficulty === DIFFICULTY.learning
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
