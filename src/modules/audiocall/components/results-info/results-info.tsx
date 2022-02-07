import React from "react";

import './results-info.scss';

const ResultsInfo = ({ answersCount }: { answersCount: number }) => {
  return (
    <div className="results-info">
      <p>{`${answersCount}/10`}</p>
    </div>
  );
}

export default ResultsInfo;
