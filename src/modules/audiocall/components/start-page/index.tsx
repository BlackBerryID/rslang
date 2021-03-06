import React, { BaseSyntheticEvent, useState } from "react";
import { Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Box } from "@mui/material";
import { QuestionPage } from "../question-page";
import CallIcon from '@mui/icons-material/Call';
import { RootState } from "../../../../store";
import { getLevel } from "../../helpers/get-english-level";
import { useSelector } from "react-redux";
import {
  deepOrange,
  indigo,
  lightBlue,
  lime,
  purple,
  yellow,
} from '@mui/material/colors';
import './start-page.scss';


const colors = [
  yellow['600'],
  lightBlue['400'],
  lime['A400'],
  deepOrange['400'],
  indigo['500'],
  purple['500'],
];

const StartPage = () => {
  const { mode } = useSelector((state: RootState) => state.appStatus);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(-1);

  if (isGameStarted) {
    return (
      <QuestionPage
        difficulty={difficulty}
        setIsGameStarted={setIsGameStarted}
      />
    );
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      rowGap="2em">
      <Typography variant="h1" component="h1" textAlign="center">
        Аудиовызов
      </Typography>
      <Typography variant="h5" gutterBottom component="p" textAlign="center">
        Вам необходимо выбрать правильный перевод слова основываясь на услышанном аудио
      </Typography>
      {mode === 'anon' ?
        <FormControl>
          <FormLabel>Выберите уровень языка:</FormLabel>
          <RadioGroup
            row
            onChange={(d: BaseSyntheticEvent) => setDifficulty(+d.target.value - 1)}
          >
            {[...Array(6)].map((item, index) =>
              <FormControlLabel
                key={index}
                value={index + 1}
                checked={index === difficulty}
                label={getLevel(index)}
                labelPlacement="bottom"
                sx={{ color: colors[index] }}
                control={<Radio sx={{
                  color: colors[index],
                  '&.Mui-checked': { color: colors[index] },
                }} />} />
            )}
          </RadioGroup>
        </FormControl> :
        <Typography variant="h5" gutterBottom component="p" textAlign="center">
          Игра начнется со словами из учебника
        </Typography>}
      <Button
        variant="outlined"
        disabled={difficulty === -1 && mode === 'anon'}
        size="large"
        endIcon={<CallIcon />}
        onClick={() => setIsGameStarted(true)}
      >
        Начать
      </Button>
    </Box >
  );
};

export { StartPage };
