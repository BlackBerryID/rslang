import { KeyboardEvent, useEffect, useState } from 'react';
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

  const keyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (time < 1) return;
    switch (event.code) {
      case 'ArrowLeft':
        selectTrueBtn(true);
        settedTimeOut = setTimeout(() => {
          selectTrueBtn(false);
        }, 100);
        attempt.giveAnswer(true);
        break;
      case 'ArrowRight':
        selectFalseBtn(true);
        settedTimeOut = setTimeout(() => {
          selectFalseBtn(false);
        }, 100);
        attempt.giveAnswer(false);
        break;
    }
  };

  useEffect(() => {
    if (time === 0) {
      if (!settedTimeOut) clearTimeout(settedTimeOut);
    }
  }, [isTrueSelected, isFalseSelected]);

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
