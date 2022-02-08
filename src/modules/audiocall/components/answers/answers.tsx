import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ShuffleArray } from "../../../../utils/shuffle-array";

import './answers.scss';

// TODO: remove 'any' type on setAnsweredWords prop
const Answers = ({ w, setNextQuestion, setAnsweredWords, isAnswered, setIsAnswered }: {
  w: { wordTranslate: string, id: string }[],
  setNextQuestion: () => void,
  setAnsweredWords: any,
  isAnswered: boolean,
  setIsAnswered: (flag: boolean) => void
}) => {
  const [words, setWords] = useState<{ wordTranslate: string, id: string }[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    function showWords() {
      if (words.length === 0 && w.length !== 0) {
        setCorrectAnswer(w[0].wordTranslate);
        setWords(ShuffleArray(w));
      }
    }
    showWords();
  }, [words, w]);

  const checkAnswer = (e: BaseSyntheticEvent) => {
    if (!isAnswered) {
      setIsAnswered(true);
      if ((e.target as HTMLElement).textContent?.trim() === correctAnswer) {
        // TODO: add request which will save answer @saratovkin
        setAnsweredWords({ word: correctAnswer, flag: true });
      } else {
        setAnswer(e.target.textContent.trim());
        setAnsweredWords({ word: correctAnswer, flag: false });
      }
    }
  };

  const getButtonStyle = (word: string) => {
    if (isAnswered && (word === correctAnswer)) {
      return 'success';
    }
    if (isAnswered && (word === answer)) {
      return 'error';
    }
    return 'primary'
  };

  return (
    <div className="answers-container">
      <div className="answers">
        {words.map((word) => {
          return <Button
            variant="outlined"
            key={word.id}
            onClick={checkAnswer}
            color={getButtonStyle(word.wordTranslate)}
          > {word.wordTranslate}</Button>
        })}
      </div>
      {
        isAnswered ?
          <Button
            variant="contained"
            onClick={() => { setIsAnswered(false); setNextQuestion(); }}
          >
            {'дальше'}
          </Button> :
          <Button
            variant="contained"
            onClick={() => { setIsAnswered(true); setAnsweredWords({ word: correctAnswer, flag: false }); }}
          >
            {'не знаю'}
          </Button>
      }
    </div >
  );
};

export default Answers;