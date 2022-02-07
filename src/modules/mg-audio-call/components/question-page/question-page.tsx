import { useEffect, useState } from 'react';
import { CircularProgress, IconButton } from '@mui/material';
import { GetWords } from '../../../../api/get-words';
import { GetRandomNum } from '../../../../utils/get-random-num';

import './question-page.scss';
import Answers from '../question/answers';
import { VolumeUp } from '@mui/icons-material';

const QuestionPage = ({ difficulty }: { difficulty: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [words, setWords] = useState<Array<Word>>([]);

  useEffect(() => {
    setIsLoading(true);
    try {
      GetWords(difficulty, GetRandomNum(0, 29)).then(
        (words: Array<Word>): void => {
          setWords(words);
        }
      );
    } catch (error) {
      // TODO: add Error Boundary (@saratovkin)
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [difficulty]);

  // TODO: get 5 random unique words (@saratovkin)
  const displayedWords: Array<AnswerProp> = words
    .slice(0, 5)
    .map((item: Word) => {
      return {
        id: item.id,
        wordTranslate: item.wordTranslate,
      };
    });

  if (isLoading) {
    return <CircularProgress />;
  } else {
    return (
      <div className="question-page">
        <IconButton aria-label="volume">
          <VolumeUp sx={{ fontSize: 80 }} />
        </IconButton>
        <span>Правильный ответ - {displayedWords[0].wordTranslate}</span>
        <Answers w={displayedWords} />
      </div>
    );
  }
};

export default QuestionPage;
