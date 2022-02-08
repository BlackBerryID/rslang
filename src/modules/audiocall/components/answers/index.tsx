import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ShuffleArray } from "../../../../utils/shuffle-array";

import './answers.scss';

// TODO: remove 'any' type on setAnsweredWords prop
const Answers = ({ options, setNextQuestion, setAnsweredWords, isAnswered, setIsAnswered }: {
  options: Word[],
  setNextQuestion: () => void,
  setAnsweredWords: any,
  isAnswered: boolean,
  setIsAnswered: (flag: boolean) => void
}) => {
  const [words, setWords] = useState<{ wordTranslate: string, id: string }[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<Word>();
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    function showWords() {
      if (!isAnswered && options.length !== 0) {
        setCorrectAnswer(options[0]);
        setWords(ShuffleArray(options));
      }
    }
    showWords();
  }, [isAnswered, options]);

  const checkAnswer = (e: BaseSyntheticEvent) => {
    if (!isAnswered) {
      setIsAnswered(true);
      if ((e.target as HTMLElement).textContent?.trim() === (correctAnswer as Word).wordTranslate) {
        // TODO: add request which will save answer @saratovkin
        setAnsweredWords({ word: correctAnswer, flag: true });
      } else {
        setAnswer(e.target.textContent.trim());
        setAnsweredWords({ word: correctAnswer, flag: false });
      }
    }
  };

  const getButtonStyle = (word: string) => {
    if (isAnswered && (word === (correctAnswer as Word).wordTranslate)) {
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

export {Answers};