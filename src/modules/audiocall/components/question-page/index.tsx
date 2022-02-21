import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AudioCallConst from "../../constants";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { GetWords } from "../../../../api/get-words";
import { GetRandomNum } from "../../../../utils/get-random-num";
import { VolumeUp } from "@mui/icons-material";
import { ErrorAlert } from "../error-alert";
import { ResultsPage } from "../results-page";
import { WordInfo } from "../word-info";
import { ShuffleArray } from "../../../../utils/shuffle-array";
import { Answers } from "../answers";
import { AudioPlayer } from "../../../../utils/audio-player";
import { RootState } from "../../../../store";

import './question-page.scss';

const QuestionPage = ({ difficulty, setIsGameStarted }: {
  difficulty: number,
  setIsGameStarted: (flag: boolean) => void,
}) => {

  const { mode, deck } = useSelector((state: RootState) => state.appStatus);

  const [words, setWords] = useState<Word[]>([]);
  const [extraWords, setExtraWords] = useState<Word[]>([]);
  const [answeredWords, setAnsweredWords] = useState<{ word: Word, flag: boolean }[]>([]);

  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const [questionNum, setQuestionNum] = useState<number>(0);
  const [currentAnswer, setCurrentAnswer] = useState<Word>();
  const [answerOptions, setAnswerOptions] = useState<Word[]>([]);

  useEffect(() => {
    setIsLoading(true);
    try {
      if (mode === 'textbook') {
        if (deck?.length) {
          if (deck.length < AudioCallConst.ANSWERS_AMOUNT) {
            GetWords(GetRandomNum(0, 5), GetRandomNum(0, AudioCallConst.MAX_PAGES_INDEX)).then((words: Word[]) => {
              setExtraWords(ShuffleArray(words.map(word => { word._id = word.id; return word })));
            }).catch(() => {
              setIsError(true);
              setIsLoading(false);
            });
          }
          setWords(ShuffleArray(deck.map(word => {
            return {
              ...word,
              _id: word._id || word.id
            }
          })));
          setIsLoading(false);
        } else {
          throw new Error();
        }
      }
      if (mode === 'anon') {
        setIsLoading(true);
        GetWords(difficulty, GetRandomNum(0, AudioCallConst.MAX_PAGES_INDEX)).then((words: Word[]) => {
          setWords(ShuffleArray(words.map(word => { word._id = word.id; return word })));
          setIsLoading(false);
        }).catch(() => {
          setIsError(true);
          setIsLoading(false);
        });
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [difficulty, deck, mode]);

  useEffect(() => {
    const amount = Math.min(AudioCallConst.QUESTIONS_AMOUNT, words.length);
    if (words.length && answeredWords.length !== amount) {
      const options: Word[] = [];
      let answer = words[GetRandomNum(0, words.length - 1)];
      let option: Word;
      while (answeredWords.map(item => item.word).indexOf(answer) !== -1) {
        answer = words[GetRandomNum(0, words.length - 1)];
      }
      if (amount >= AudioCallConst.ANSWERS_AMOUNT) {
        while (options.length !== AudioCallConst.ANSWERS_AMOUNT - 1) {
          option = words[GetRandomNum(0, words.length - 1)];
          if (options.indexOf(option) === -1 && option.word !== answer.word) {
            options.push(option);
          }
        }
      } else if (extraWords.length) {
        while (options.length !== AudioCallConst.ANSWERS_AMOUNT - 1) {
          option = extraWords[GetRandomNum(0, extraWords.length - 1)];
          if (options.indexOf(option) === -1 && option.word !== answer.word) {
            options.push(option);
          }
        }
      }
      if (options.length) {
        setCurrentAnswer(answer);
        setAnswerOptions(options);
      }
    }
  }, [words, extraWords, questionNum]);

  useEffect(() => {
    if (currentAnswer && !isGameEnded) {
      AudioPlayer.playEffect(`${currentAnswer.audio}`);
    }
  }, [currentAnswer, isGameEnded]);

  useEffect(() => {
    if (words.length) {
      const amount = AudioCallConst.QUESTIONS_AMOUNT > words.length ?
        words.length :
        AudioCallConst.QUESTIONS_AMOUNT;
      if (questionNum === amount) {
        setIsGameEnded(true);
      }
    }
  }, [questionNum, words])

  if (isLoading) {
    return (
      <CircularProgress />
    );
  }

  if (isError) {
    return (
      <ErrorAlert />
    );
  }

  if (isGameEnded) {
    return (
      <ResultsPage answeredWords={answeredWords} setIsGameStarted={setIsGameStarted} />
    )
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      rowGap="2em"
    >
      {isAnswered ?
        <WordInfo word={currentAnswer as Word} /> :
        <IconButton
          className="play-icon"
          aria-label="volume"
          onClick={() => { AudioPlayer.playEffect(`${(currentAnswer as Word).audio}`) }}
        >
          <VolumeUp sx={{ fontSize: 80 }} />
        </IconButton>
      }
      <Answers
        options={currentAnswer ? [currentAnswer, ...answerOptions] : []}
        setNextQuestion={() => setQuestionNum((num) => num + 1)}
        setAnsweredWords={(newWord: { word: Word, flag: boolean }) => setAnsweredWords((words) => [...words, newWord])}
        isAnswered={isAnswered}
        setIsAnswered={setIsAnswered}
      />
    </Box >
  );
};

export { QuestionPage };
