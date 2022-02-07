import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { ShuffleArray } from '../../../../utils/shuffle-array';

import './answers.scss';

const Answers = ({ w }: { w: Array<AnswerProp> }) => {
  const [answer] = useState<string>(w[0].wordTranslate);
  const [words, setWords] = useState<Array<AnswerProp>>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    function showWords() {
      setWords(ShuffleArray(w));
    }
    showWords();
  }, [w]);

  const checkAnswer = (e: BaseSyntheticEvent) => {
    if (!isAnswered) {
      setIsAnswered(true);
      if ((e.target as HTMLElement).textContent === answer) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    }
  };
  // TODO: highlight wrong answer (@saratovkin)
  return (
    <div className="answers">
      {words.map((item) => {
        return (
          <Button
            variant="outlined"
            key={item.id}
            onClick={checkAnswer}
            color={isAnswered ? 'success' : 'primary'}
            disabled={isAnswered && !(item.wordTranslate === answer)}
          >
            {item}
          </Button>
        );
      })}
      <p>{isCorrect}</p>
    </div>
  );
};

export default Answers;
