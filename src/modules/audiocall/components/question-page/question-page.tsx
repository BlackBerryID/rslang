import React, { useEffect, useState } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import { GetWords } from "../../../../api/get-words";
import { GetRandomNum } from "../../../../utils/get-random-num";

import './question-page.scss';
import Answers from "../question/answers";
import { VolumeUp } from "@mui/icons-material";
import ResultsPage from "../results-page";

const QuestionPage = ({ difficulty }: { difficulty: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [words, setWords] = useState([]);
  const [audioLink, setAudioLink] = useState('');
  const [questionNum, setQuestionNum] = useState(0);
  const [answeredWords, setAnsweredWords] = useState<{ word: string, flag: boolean }[]>([]);

  const playAudio = () => {
    if (audioLink) {
      const audio = new Audio(audioLink);
      audio.play();
    }
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      GetWords(difficulty, GetRandomNum(0, 29)).then((words) => {
        setWords(words);
        setIsLoading(false);
        setAudioLink(`https://rslang-react.herokuapp.com/${words[0].audio}`);
      });
    } catch (error) {
      // TODO: add Error Boundary (@saratovkin)
      console.log(error);
      setIsLoading(false);
    }
  }, [difficulty, questionNum]);

  useEffect(() => {
    playAudio();
  }, [audioLink]);

  // TODO: get 5 random unique words (@saratovkin) 
  const displayedWords = words.slice(0, 5).map((item: Word) => item.wordTranslate);
  if (isLoading) {
    return (
      <CircularProgress />
    );
  } else {
    if (questionNum === 10) {
      return (
        <ResultsPage answeredWords={answeredWords} />
      )
    } else {
      return (
        <div className="question-page">
          <IconButton
            aria-label="volume"
            onClick={playAudio}
          >
            <VolumeUp sx={{ fontSize: 80 }} />
          </IconButton>
          <Answers
            w={displayedWords}
            setNextQuestion={() => setQuestionNum((num) => num + 1)}
            setAnsweredWords={(newWord: { word: string, flag: boolean }) => setAnsweredWords((words) => [...words, newWord])}
          />
        </div>
      );
    }
  }
};

export default QuestionPage;
