import { Button } from '@mui/material';
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
    <>
      <h1>Спринт</h1>
      <p>
        Спринт — тренировка на скорость. Попробуй угадать как можно больше слов
        за 30 секунд.
      </p>
      <LangLevelSelector action={lvlSelectorAction} />
      <Button variant="contained" onClick={onStartAction} disabled={btnStart}>
        Начать
      </Button>
    </>
  );
};
