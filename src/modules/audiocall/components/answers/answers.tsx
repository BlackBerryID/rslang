import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ShuffleArray } from "../../../../utils/shuffle-array";

import './answers.scss';

// TODO: remove 'any' type on setAnsweredWords prop
const Answers = ({ w, setNextQuestion, setAnsweredWords, }: { w: { wordTranslate: string, id: string }[], setNextQuestion: () => void, setAnsweredWords: any }) => {
  const [answer, setAnswer] = useState('');
  const [words, setWords] = useState<{ wordTranslate: string, id: string }[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    function showWords() {
      if (words.length === 0 && w.length !== 0) {
        setAnswer(w[0].wordTranslate);
        setWords(ShuffleArray(w));
      }
    }
    showWords();
  }, [words, w]);

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
        {words.map((item) => {
          return <Button
            variant="outlined"
            key={item.id}
            onClick={checkAnswer}
            color={isAnswered ? 'success' : 'primary'}
            disabled={isAnswered && !(item.wordTranslate === answer)}
          >{item.wordTranslate}</Button>
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