import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { MGSprintTimer } from './timer';
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

export const MGSprintRound = ({
  attempt,
  time,
}: {
  attempt: GameRound;
  time: number;
}) => {
  const [isTrueSelected, selectTrueBtn] = useState<boolean>(false);
  const [isFalseSelected, selectFalseBtn] = useState<boolean>(false);

  let settedTimeOut: undefined | ReturnType<typeof setTimeout>;

  const btnActivator = (
    action: React.Dispatch<React.SetStateAction<boolean>>,
    param: boolean
  ) => {
    action(true);
    settedTimeOut = setTimeout(() => {
      action(false);
    }, 70);
    attempt.giveAnswer(param);
  };

  const keyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case 'ArrowLeft':
        btnActivator(selectTrueBtn, true);
        break;
      case 'ArrowRight':
        btnActivator(selectFalseBtn, false);
        break;
    }
  };

  useEffect(() => {
    return () => {
      if (settedTimeOut) {
        clearTimeout(settedTimeOut);
      }
    };
  }, []);

  return (
    <>
      <Card sx={{ minWidth: 300, padding: '1em' }}>
        <CardContent
          sx={{ display: 'flex', rowGap: '1em', flexDirection: 'column' }}
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
        <CardActions
          onKeyDown={keyDownHandler}
          sx={{ justifyContent: 'center' }}
          tabIndex={10}
        >
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
    </>
  );
};
