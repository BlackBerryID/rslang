import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import ResultsInfo from "../results-info";
import ResultsList from "../results-list";
import './results-page.scss';

const ResultsPage = ({ answeredWords }: { answeredWords: { word: Word, flag: boolean }[] }) => {

  const [resultsView, setResultsView] = useState('info');

  console.log(answeredWords);
  return (
    <div className="results-page">
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={() => setResultsView('info')}>Результаты</Button>
        <Button onClick={() => setResultsView('stats')}>Статистика</Button>
      </ButtonGroup>
      {
        resultsView === 'info' ?
          <ResultsInfo answersCount={answeredWords.filter((word) => word.flag).length} /> :
          <ResultsList answeredWords={answeredWords} />
      }
    </div>
  )
};

export default ResultsPage;