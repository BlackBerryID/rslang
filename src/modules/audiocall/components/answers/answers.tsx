import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ShuffleArray } from "../../../../utils/shuffle-array";

import './answers.scss';

// TODO: remove 'any' type on setAnsweredWords prop
const Answers = ({ w, setNextQuestion, setAnsweredWords, }: { w: string[], setNextQuestion: () => void, setAnsweredWords: any }) => {
  const [answer] = useState(w[0]);
  const [words, setWords] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    function showWords() {
      if (words.length === 0) {
        setWords(ShuffleArray(w));
      }
    }
    showWords();
  }, [w]);

  const checkAnswer = (e: BaseSyntheticEvent) => {
    if (!isAnswered) {
      setIsAnswered(true);
      if ((e.target as HTMLElement).textContent === answer) {
        setAnsweredWords({ word: answer, flag: true });
      } else {
        setAnsweredWords({ word: answer, flag: false });
      }
    }
  }

  // TODO: highlight wrong answer (@saratovkin)
  return (
    <div className="answers-container">
      <div className="answers">
        {words.map((item, index) => {
          return <Button
            variant="outlined"
            key={index}
            onClick={checkAnswer}
            color={isAnswered ? 'success' : 'primary'}
            disabled={isAnswered && !(item === answer)}
          >{item}</Button>
        })}
      </div>
      {isAnswered ?
        <Button
          variant="contained"
          onClick={() => { setIsAnswered(true); setNextQuestion(); }}
        >
          {'дальше'}
        </Button> :
        <Button
          variant="contained"
          onClick={() => { setIsAnswered(true); setAnsweredWords({ word: answer, flag: false }); }}
        >
          {'не знаю'}
        </Button>
      }
    </div>
  );
};

export default Answers;