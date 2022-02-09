import { Typography } from "@mui/material";
import React from "react";

import './results-info.scss';

const ResultsInfo = ({ answersCount, correctAnswers }: { answersCount: number, correctAnswers: number }) => {
  return (
    <div className="results-info">
      <Typography variant="h1" component="h1" textAlign="center">
        {`${correctAnswers}/${answersCount}`}
      </Typography>
    </div>
  );
};

export { ResultsInfo };
