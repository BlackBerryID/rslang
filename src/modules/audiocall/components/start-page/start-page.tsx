import React, { BaseSyntheticEvent, useState } from "react";
import { Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import QuestionPage from "../question-page";

import './start-page.scss';

const StartPage = () => {

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(-1);
  if (isGameStarted) {
    return (
      <QuestionPage difficulty={difficulty} />
    )
  } else {
    return (
      <div className="start-page">
        <h2>Аудиовызов</h2>
        <p>Вам необходимо выбрать правильный перевод слова основываясь на услышанном аудио</p>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Сложность</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(d: BaseSyntheticEvent) => setDifficulty(+d.target.value - 1)}
          >
            {[...Array(5)].map((x, idx) =>
              <FormControlLabel value={idx + 1} key={idx} control={<Radio />} label={idx + 1} />
            )}
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          onClick={() => { setIsGameStarted(true) }}
          disabled={difficulty === -1}
        >Начать</Button>
      </div>
    )
  }
};

export default StartPage;
