import React, { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { ShuffleArray } from "../../../../utils/shuffle-array";

import './answers.scss';

const Answers = ({ options, setNextQuestion, setAnsweredWords, isAnswered, setIsAnswered }: {
  options: Word[],
  setNextQuestion: () => void,
  setAnsweredWords: (word: { word: Word, flag: boolean }) => void,
  isAnswered: boolean,
  setIsAnswered: (flag: boolean) => void,
}) => {
  const [words, setWords] = useState<{ wordTranslate: string, id: string }[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<Word>();
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (!isAnswered && options.length !== 0) {
      setCorrectAnswer(options[0]);
      setWords(ShuffleArray(options));
    }
  }, [isAnswered, options]);

  useEffect(() => {
    setAnswer('');
  }, [correctAnswer]);

  const checkAnswer = (word: string) => {
    if (!isAnswered) {
      setIsAnswered(true);
      if (word === (correctAnswer as Word).wordTranslate) {
        // TODO: add request which will save answer @saratovkin
        setAnsweredWords({ word: (correctAnswer as Word), flag: true });
      } else {
        setAnswer(word);
        setAnsweredWords({ word: (correctAnswer as Word), flag: false });
      }
    }
  };

  const skipQuestion = (): void => {
    setIsAnswered(true);
    setAnsweredWords({ word: (correctAnswer as Word), flag: false });
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
    <div>
      <Stack direction="row" spacing={2}>
        {words.map((word) => {
          return <Button
            variant="outlined"
            key={word.id}
            onClick={() => checkAnswer(word.wordTranslate)}
            color={getButtonStyle(word.wordTranslate)}
          >
            {word.wordTranslate}
          </Button>
        })}
      </Stack>
      <Box
        sx={{ p: 4, textAlign: "center" }}
      >
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
              onClick={skipQuestion}
            >
              {'не знаю'}
            </Button>
        }
      </Box>
    </div >
  );
};

export { Answers };
