import { Box, Button, Typography } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useState } from 'react';
import { LangLevelSelector } from './level-select';

export const MGSprintStart = ({
  onStartAction,
  selectLangAction,
}: {
  onStartAction: () => void;
  selectLangAction: (val: number) => void;
}) => {
  const [btnStart, activeBtnStart] = useState<boolean>(true);
  const lvlSelectorAction = (val: number) => {
    selectLangAction(val);
    activeBtnStart(false);
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center" rowGap="2em">
      <Typography variant="h1" component="h1" textAlign="center">
        Спринт
      </Typography>
      <Typography variant="h5" gutterBottom component="p" textAlign="center">
        Спринт — тренировка на скорость. Попробуйте угадать как можно больше
        слов за 30 секунд.
      </Typography>
      <LangLevelSelector action={lvlSelectorAction} />
      <Button
        variant="outlined"
        onClick={onStartAction}
        disabled={btnStart}
        size="large"
        endIcon={<DirectionsRunIcon />}
      >
        Начать
      </Button>
    </Box>
  );
};
