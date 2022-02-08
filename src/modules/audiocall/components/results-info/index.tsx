import React from "react";

import './results-info.scss';

const ResultsInfo = ({ answersCount }: { answersCount: number }) => {
  return (
    <div className="results-info">
      <p>Правильных ответов:</p>
      <h2>{`${answersCount}/10`}</h2>
    </div>
  );
}

export {ResultsInfo};
