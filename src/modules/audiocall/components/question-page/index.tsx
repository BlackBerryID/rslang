import React, { useEffect, useState } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import { GetWords } from "../../../../api/get-words";
import { GetRandomNum } from "../../../../utils/get-random-num";
import { base } from "../../../../api";
import { VolumeUp } from "@mui/icons-material";
import AudioCallConst from "../../constants";
import { ResultsPage } from "../results-page";
import { WordInfo } from "../word-info";

import './question-page.scss';
import { ShuffleArray } from "../../../../utils/shuffle-array";
import { Answers } from "../answers";

const QuestionPage = ({ difficulty }: { difficulty: number }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [answeredWords, setAnsweredWords] = useState<{ word: Word, flag: boolean }[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isAnswered, setIsAnswered] = useState(false);

  const [questionNum, setQuestionNum] = useState<number>(0);
  const [currentAnswer, setCurrentAnswer] = useState<Word>();
  const [answerOptions, setAnswerOptions] = useState<Word[]>([]);

  useEffect(() => {
    setIsLoading(true);
    try {
      GetWords(difficulty, GetRandomNum(0, AudioCallConst.pagesPerDifficulty)).then((words: Word[]) => {
        setWords(ShuffleArray(words));
        setIsLoading(false);
      });
    } catch (error) {
      // TODO: add Error Boundary (@saratovkin)
      console.log(error);
    }
  }, [difficulty]);

  useEffect(() => {
    if (words.length) {
      setCurrentAnswer(words[0]);
      const options: Word[] = [];
      let option: Word;
      while (options.length !== 4) {
        option = words[GetRandomNum(1, words.length - 1)];
        if (options.indexOf(option) === -1) {
          options.push(option);
        }
      }
      setAnswerOptions(options);
    }
  }, [words]);

  useEffect(() => {
    if (words.length) {
      setWords(words.filter((item, index) => index !== 0));
    }
  }, [questionNum]);

  useEffect(() => {
    const playAudio = () => {
      if (currentAnswer && questionNum !== AudioCallConst.questionsPerGame) {
        const audio = new Audio(`${base}/${currentAnswer.audio}`);
        audio.play();
      }
    };
    playAudio();
  }, [currentAnswer]);

  if (isLoading) {
    return (
      <CircularProgress />
    );
  } else {
    if (questionNum === AudioCallConst.questionsPerGame) {
      return (
        <ResultsPage answeredWords={answeredWords} />
      )
    } else {
      return (
        <div className="question-page">
          {isAnswered ?
            <WordInfo word={currentAnswer as Word} /> :
            <IconButton
              className="play-icon"
              aria-label="volume"
              onClick={() => (new Audio(`${base}/${(currentAnswer as Word).audio}`).play())}
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
        </div>
      );
    }
  }
};

export { QuestionPage };
