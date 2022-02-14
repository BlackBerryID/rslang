import React, { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { ShuffleArray } from "../../../../utils/shuffle-array";
import { checkIsLearned } from "../../../../utils/check-is-learned";

import './answers.scss';
import { UpdateUserWord } from "../../../../api/update-user_word";
import { AddUserWord } from "../../../../api/add-user_word";

const answerStats = {
  userId: '',
  userToken: '',
  wordId: '',
  updateReq: {
    difficulty: '',
    optional: {
      audioStreak: '',
    },
  },
}

const Answers = ({ options, setNextQuestion, setAnsweredWords, isAnswered, setIsAnswered }: {
  options: Word[],
  setNextQuestion: () => void,
  setAnsweredWords: (word: { word: Word, flag: boolean }) => void,
  isAnswered: boolean,
  setIsAnswered: (flag: boolean) => void,
}) => {
  const [words, setWords] = useState<Word[]>([]);
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
        setAnsweredWords({ word: (correctAnswer as Word), flag: true });
        saveAnswer('1');
      } else {
        setAnswer(word);
        setAnsweredWords({ word: (correctAnswer as Word), flag: false });
        saveAnswer('0');
      }
    }
  };

  const saveAnswer = (flag: string) => {
    answerStats.wordId = correctAnswer?._id as string;
    answerStats.updateReq.optional.audioStreak = flag;
    if ((correctAnswer as Word).userWord) {
      if ((correctAnswer as Word).userWord?.optional?.audioStreak) {
        const answers = (correctAnswer as Word).userWord?.optional?.audioStreak + flag;
        answerStats.updateReq.optional.audioStreak = answers;
        if (checkIsLearned(answers)) {
          answerStats.updateReq.difficulty = 'learned';
        } else {
          answerStats.updateReq.difficulty = 'learning';
        }
      }
      UpdateUserWord(answerStats);
    } else {
      AddUserWord(answerStats);
    }
  }

  const skipQuestion = (): void => {
    setIsAnswered(true);
    saveAnswer('0');
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
            key={word._id}
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
