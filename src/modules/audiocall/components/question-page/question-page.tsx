import React, { useEffect, useState } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import { GetWords } from "../../../../api/get-words";
import { GetRandomNum } from "../../../../utils/get-random-num";
import { base } from "../../../../api";
import { VolumeUp } from "@mui/icons-material";
import AudioCallConst from "../../constants";
import Answers from "../answers/answers";
import ResultsPage from "../results-page";
import WordInfo from "../word-info";

import './question-page.scss';

const QuestionPage = ({ difficulty }: { difficulty: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [words, setWords] = useState<{ wordTranslate: string, id: string }[]>([]);
  const [questionNum, setQuestionNum] = useState(0);
  const [answeredWords, setAnsweredWords] = useState<{ word: string, flag: boolean }[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<Word>();
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      GetWords(difficulty, GetRandomNum(0, AudioCallConst.wordsPerPage)).then((respWords: Word[]) => {
        const startIdx = GetRandomNum(0, respWords.length - AudioCallConst.amountOfAnswers);
        const questionWords = respWords.slice(startIdx, startIdx + AudioCallConst.amountOfAnswers);
        setWords(questionWords.map((word) => { return { wordTranslate: word.wordTranslate, id: word.id } }));
        setIsLoading(false);
        setCurrentAnswer(questionWords[0]);
      });
    } catch (error) {
      // TODO: add Error Boundary (@saratovkin)
      console.log(error);
      setIsLoading(false);
    }
  }, [difficulty, questionNum]);

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
            w={words}
            setNextQuestion={() => setQuestionNum((num) => num + 1)}
            setAnsweredWords={(newWord: { word: string, flag: boolean }) => setAnsweredWords((words) => [...words, newWord])}
            isAnswered={isAnswered}
            setIsAnswered={setIsAnswered}
          />
        </div>
      );
    }
  }
};

export default QuestionPage;
