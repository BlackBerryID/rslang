import { useEffect, useState, useRef } from 'react';
import { MGSprintTimer } from './timer';
import { MGSprintMultiplier } from './multiplier';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  ButtonGroup,
  Button,
} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { GAME_SCORE_BASE } from '../constants';

export const MGSprintRound = ({
  attempt,
  time,
}: {
  attempt: GameRound;
  time: number;
}) => {
  const [isTrueSelected, selectTrueBtn] = useState<boolean>(false);
  const [isFalseSelected, selectFalseBtn] = useState<boolean>(false);
  const timer = useRef<undefined | number>();

  const btnActivator = (
    action: React.Dispatch<React.SetStateAction<boolean>>,
    param: boolean
  ) => {
    action(true);
    attempt.giveAnswer(param);
  };

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      switch (ev.code) {
        case 'ArrowLeft':
          btnActivator(selectTrueBtn, true);
          break;
        case 'ArrowRight':
          btnActivator(selectFalseBtn, false);
          break;
      }
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  });

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      if (isTrueSelected) {
        selectTrueBtn(false);
      } else {
        selectFalseBtn(false);
      }
    }, 100);

    return () => {
      clearTimeout(timer.current);
    };
  }, [isTrueSelected, isFalseSelected]);

  return (
    <Card sx={{ minWidth: 300, padding: '1em' }}>
      <CardContent
        sx={{ display: 'flex', rowGap: '1em', flexDirection: 'column' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItmes: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '.5em',
              fontSize: 16,
            }}
            color="text.secondary"
            component="div"
          >
            <TimerIcon />
            <MGSprintTimer time={time} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '.5em',
              fontSize: 16,
            }}
            color="text.secondary"
            component="div"
          >
            <DoneAllIcon />
            <MGSprintMultiplier
              base={GAME_SCORE_BASE}
              coef={attempt.currentMultiplier}
              score={attempt.currentScore}
            />
          </Box>
        </Box>
        <Typography
          variant="h3"
          component="div"
          textAlign="center"
          textTransform="capitalize"
        >
          {attempt.activeWord}
        </Typography>
        <Typography color="text.secondary" textAlign="center" component="div">
          это
        </Typography>
        <Typography variant="h5" component="div" textAlign="center">
          {attempt.translation}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }} tabIndex={10}>
        <ButtonGroup size="large" variant="outlined">
          <Button
            onClick={() => attempt.giveAnswer(true)}
            color="success"
            variant={isTrueSelected ? 'contained' : undefined}
          >
            Верно
          </Button>
          <Button
            onClick={() => attempt.giveAnswer(false)}
            color="error"
            variant={isFalseSelected ? 'contained' : undefined}
          >
            Неверно
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};
